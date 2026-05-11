# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tropic Forest Venture — a high-end tropical rainforest adventure brand website. Magazine-style layout with restrained animations, deep green + earth tones. Design direction: STUDIO ANÓNIMO × Aesop × Kinfolk aesthetic.

## Tech Stack

- Next.js (App Router)
- Tailwind CSS v4 (using `@import "tailwindcss"` — no tailwind.config, uses CSS custom properties)
- Framer Motion for animations
- TypeScript

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint

## Architecture

Single-page site with sections composed in `src/app/page.tsx`:

- **Nav** — minimal top-right navigation
- **Hero** — full-screen video background with fog overlay, god rays, and centered serif title
- **Philosophy** — split text/image layout
- **Expeditions** — asymmetric card grid
- **Journal** — magazine-style layout
- **Contact / Footer** — minimal earth-tone section

### Atmospheric Effects (global, fixed-position)

- **FogLayer** — three radial-gradient layers with slow Framer Motion drift (20-30s loops)
- **FloatingLeaves** — leaf silhouettes with parallax scroll
- **GodRays** — diagonal light beams on hero section

### Design System

Colors are defined as CSS custom properties in `globals.css` and mirrored as JS constants in `src/lib/constants.ts`. Use these — do not hardcode arbitrary colors.

Key color groups:
- Deep Green: `--color-forest-deep` through `--color-fern-accent`
- Earth Tones: `--color-bark-brown` through `--color-morning-mist`
- Fog/Atmosphere: `--color-fog-white` through `--color-shadow-gray`
- Text: `--color-text-primary`, `--color-text-body`, `--color-text-secondary`

Typography: Playfair Display (headings, serif) + DM Sans (body). Fonts loaded via Google Fonts in `layout.tsx`.

### Animation Patterns

- Use the shared easing curve `EASE` from `@/lib/constants`
- Animations should be restrained: subtle opacity fades (0.8s), small translate (20px), gentle hover scales (1.02)
- Scroll-triggered reveals use Framer Motion's `whileInView`

### Component Conventions

- Components are `'use client'` when they use Framer Motion or browser APIs
- Tailwind utility classes handle all styling — no CSS modules
- Color values in Tailwind classes use literal hex (e.g., `text-[#c4b49a]`) matching the design system

## Images

- Hero uses `/public/images/hero-video.mp4` with `/public/images/hero-bg.png` as poster fallback
- Other sections use picsum.photos placeholders or CSS gradients
