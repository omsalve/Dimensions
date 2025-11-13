# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for the Dimensions Festival website, featuring advanced visual effects and animations. The project showcases a 30th Pearl Jubilee celebration with immersive WebGL effects, smooth scrolling, and interactive components.

## Core Commands

### Development
```powershell
npm run dev     # Start dev server on http://localhost:3000
npm run build   # Create production build (includes linting and type checking)
npm run start   # Start production server
npm run lint    # Run ESLint
```

### Notes
- `npm run build` automatically runs linting and type checking
- Dev server includes hot reload and auto-updates on file changes
- No test suite is currently configured

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.3 with App Router (`src/app/`)
- **React**: v19.1.0 (client-side rendering)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Animations**: 
  - GSAP with ScrollTrigger for scroll-based animations
  - Framer Motion for component animations
  - Lenis for smooth scrolling
- **3D/WebGL**: 
  - Three.js for 3D rendering
  - OGL for custom WebGL shaders
  - Custom shader components (Galaxy, LiquidEther)

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with SmoothScroll and SideMenu
│   ├── page.tsx           # Main page with GSAP scroll animations
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # React components
│   ├── SmoothScroll.tsx   # Lenis smooth scroll wrapper (provides LenisContext)
│   ├── Galaxy.tsx         # WebGL star field with custom shaders (OGL)
│   ├── LiquidEther.tsx    # Fluid simulation with Three.js
│   ├── LaserFlow.jsx      # Particle/laser effects
│   └── [other sections]   # Page sections (AboutSection, EventsSection, etc.)
└── lib/
    └── utils.ts           # Tailwind utility helpers (cn function)
```

### Key Patterns

#### Client Components
All components use `"use client"` directive. This is a CSR-heavy application with no server components.

#### Smooth Scrolling Architecture
- `SmoothScroll.tsx` wraps the entire app in `layout.tsx`
- Provides `LenisContext` for accessing the Lenis instance
- Use `useLenis()` hook to access smooth scroll instance in child components

#### Scroll-Based Animations (GSAP)
- Main page uses `gsap.matchMedia()` for responsive animations
- Desktop: pinned scroll with scale/opacity transitions
- Mobile: simple fade-in animations on scroll
- Always register ScrollTrigger: `gsap.registerPlugin(ScrollTrigger)`

#### WebGL Components
- **Galaxy**: Uses OGL library with custom vertex/fragment shaders
  - Mouse interaction with smooth lerping
  - Configurable props: `focal`, `rotation`, `starSpeed`, `density`, `hueShift`, etc.
  - Transparent background support
  
- **LiquidEther**: Three.js fluid simulation
  - Implements Navier-Stokes equations with multiple shader passes
  - Auto-demo mode with configurable parameters
  - Responsive and viewport-aware (pauses when not visible)

#### Image Configuration
Next.js Image component configured for these remote domains:
- `picsum.photos`
- `placehold.co`
- `i.scdn.co`

Add new domains to `next.config.ts` under `images.remotePatterns`.

### Path Aliases
- `@/*` maps to `src/*` (configured in `tsconfig.json`)
- Use for all imports: `import Component from "@/components/Component"`

### Styling Conventions
- Tailwind CSS v4 (new syntax)
- shadcn/ui configured with "new-york" style
- Component path: `@/components/ui`
- Utilities path: `@/lib/utils`
- Use `cn()` utility for conditional class merging

### TypeScript Configuration
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler
- Path alias `@/*` configured

## Common Issues

### WebGL Performance
- Galaxy and LiquidEther components can be resource-intensive
- Both implement visibility detection to pause when off-screen
- Consider adding `disableAnimation` prop to Galaxy for static views

### GSAP ScrollTrigger
- Must use `gsap.matchMedia()` for responsive animations
- Always call `mm.revert()` in cleanup functions
- Desktop animations use pinning; mobile uses simple scroll triggers

### Lenis Smooth Scroll
- Initialized in layout, runs in RAF loop
- Access via `useLenis()` hook from `@/components/SmoothScroll`
- Properly disposed on unmount

## Development Workflow

1. Run `npm run dev` to start development server
2. Edit files in `src/` - changes auto-reload
3. Main page is `src/app/page.tsx`
4. Components go in `src/components/`
5. Before committing, run `npm run build` to verify build and type checking

## Component Development

### Adding New Sections
Follow existing section patterns (e.g., `AboutSection.tsx`, `EventsSection.tsx`):
- Use `"use client"` directive
- Import and use animations (GSAP/Framer Motion) as needed
- Reference via `@/components/ComponentName`

### Adding shadcn/ui Components
Components are configured to install to `@/components/ui` with "new-york" style.

### WebGL Components
When creating new WebGL effects:
- Clean up contexts and event listeners in useEffect cleanup
- Use visibility observers to pause when off-screen
- Handle window resize events
- Consider mobile performance (use Half Float on iOS)
