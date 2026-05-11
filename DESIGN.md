# Tropic Forest Venture - Design Document

## Project Overview
A high-end tropical rainforest adventure brand website. Magazine-style layout, restrained animations, deep green + earth tones.

## Design Direction
- **Style**: STUDIO ANÓNIMO × Aesop × Kinfolk
- **Mood**: Serene, mysterious, breathing, premium
- **Layout**: Left-aligned, asymmetric, generous whitespace

## Color Palette

### Primary (Deep Green)
- `#1a2e1a` - Forest Deep (darkest, near black-green)
- `#2d3d2b` - Ancient Moss (headings/emphasis)
- `#3d5a3a` - Vine Green (hover/active)
- `#4a6b47` - Fern Accent (sparingly)

### Earth Tones
- `#8b7355` - Bark Brown (text emphasis)
- `#a69279` - Soil Warm (secondary text)
- `#c4b49a` - Fallen Leaf (borders/dividers)
- `#e8dcc8` - Morning Mist (card backgrounds)

### Fog/Atmosphere
- `#f5f2ed` - Fog White (main background)
- `#eae5dc` - Light Mist (secondary background)
- `#d4cec3` - Stone Gray (borders)
- `#8a8478` - Shadow Gray (placeholders)

### Text
- `#1c1c1a` - Near Black (primary text)
- `#3d3d38` - Dark Gray (body text)
- `#6b6b63` - Medium Gray (secondary)

## Typography
- **Headings**: Playfair Display (serif, large, elegant)
- **Body**: DM Sans (clean, modern)

## Special Effects (Rainforest Theme)

### 1. Fog/Mist Layer
- Animated gradient fog that slowly drifts across sections
- CSS animation, very slow (20-30s loop)
- Low opacity, creates depth and mystery

### 2. Light Rays (God Rays)
- Subtle diagonal light beams on hero section
- CSS pseudo-elements with gradient
- Animates opacity to simulate light filtering through canopy

### 3. Leaf Parallax
- Floating leaf silhouettes on scroll
- Very slow movement, different speeds per leaf
- Creates depth without being distracting

### 4. Text Mask Effect
- Hero title with rainforest image as texture
- CSS `background-clip: text`

### 5. Reveal on Scroll
- Content fades in from bottom on scroll
- Very subtle (20px translate, 0.8s duration)
- Staggered for lists

### 6. Hover Micro-interactions
- Images scale 1.02 on hover (smooth, 0.6s)
- Links get subtle underline animation
- Buttons have leaf-like cursor trail (optional)

## Sections

### 1. Hero (100vh)
- Full-screen rainforest image/video
- Left-aligned large serif title
- Minimal navigation top-right
- Fog layer overlay
- Light ray effect

### 2. Philosophy
- Split layout (text left, image right)
- Generous whitespace
- Subtle scroll reveal

### 3. Expeditions/Work
- Asymmetric grid
- Hover effects on cards
- Staggered reveal

### 4. Journal/Stories
- Magazine-style layout
- Large images with text overlay
- Horizontal scroll section (optional)

### 5. Contact/Footer
- Minimal, elegant
- Earth tone background

## Technical Stack
- Next.js (App Router)
- Tailwind CSS v4
- Framer Motion (restrained)
- TypeScript

## Image Placeholders
- Use picsum.photos with forest-like seeds
- Or CSS gradients as fallbacks

---
Created by: 咕咕嘎嘎
Date: 2026-05-10
