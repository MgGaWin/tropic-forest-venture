import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory rate limiter (best-effort on serverless; use Vercel Firewall for production rate limiting)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  for (const [key, val] of rateLimit) {
    if (now > val.resetAt) rateLimit.delete(key);
  }

  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface ContactBody {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  token?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Validate body is a parseable object
    let body: ContactBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { name, email, message, token } = body;

    // Verify Turnstile captcha (if configured)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!token || typeof token !== "string") {
        return NextResponse.json(
          { error: "Captcha verification required" },
          { status: 400 }
        );
      }

      // Turnstile requires application/x-www-form-urlencoded
      const captchaRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: token,
            remoteip: ip,
          }),
        }
      );

      const captchaData = await captchaRes.json();
      if (!captchaData.success) {
        return NextResponse.json(
          { error: "Captcha verification failed" },
          { status: 400 }
        );
      }
    }

    // Presence check
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid field types" },
        { status: 400 }
      );
    }

    // Length validation
    if (name.length > 200 || email.length > 320 || message.length > 5000) {
      return NextResponse.json(
        { error: "Input too long" },
        { status: 400 }
      );
    }

    // Email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "hello@tropicforestventure.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await resend.emails.send({
      from: `Tropic Forest Venture <${fromEmail}>`,
      to: notificationEmail,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; padding: 40px; background: #f5f2ed;">
          <h2 style="color: #1a2e1a; font-weight: 400; margin-bottom: 30px;">New Expedition Inquiry</h2>
          <div style="margin-bottom: 20px;">
            <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #8a8478; margin-bottom: 4px;">Name</p>
            <p style="font-size: 14px; color: #1a2e1a;">${safeName}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #8a8478; margin-bottom: 4px;">Email</p>
            <p style="font-size: 14px; color: #1a2e1a;">${safeEmail}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #8a8478; margin-bottom: 4px;">Message</p>
            <p style="font-size: 14px; color: #1a2e1a; line-height: 1.6;">${safeMessage}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #d4cec3; margin: 30px 0;">
          <p style="font-size: 11px; color: #8a8478;">Sent from tropicforestventure.com contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
