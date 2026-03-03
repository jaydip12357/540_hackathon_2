---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

---

## ThriftySpark Design System (Project-Specific Rules)

These rules are binding for all ThriftySpark frontend work. They override any conflicting general guidance above.

### Aesthetic Direction
**Industrial editorial** — "We are tech (clean shapes)" meets "We understand clothing (texture/tone)." The vibe is reliable, expensive, serious, polished. Think premium SaaS for a physical-goods industry.

### Typography
- **Single font family**: `DM Sans` (geometric sans-serif) for everything — headings, body, labels. Clean, Apple-like uniformity.
- **Headings**: `DM Sans` bold/semibold. Tight tracking (`-0.03em` on h1, `-0.02em` on h2, `-0.01em` on h3). Color: `stone-900`.
- **Body**: `DM Sans` weight 400 for body, 500 for emphasis. Color: `stone-700` (softer than headings — creates visual hierarchy).
- **Brand name**: `font-bold tracking-tight` — always sans-serif, never serif.
- **No serif fonts**. Fraunces has been removed. Do not reintroduce any serif font.
- **NEVER use**: Inter, Roboto, Arial, Space Grotesk, Fraunces, or system-ui as visible text. These are banned.
- **Labels/badges**: Uppercase, `text-xs`, `tracking-widest` for industrial signage feel.

### Color Palette
- **Primary brand**: Deep Forest Green `#064e3b` (`thrift-forest`) — logo, theme color, primary CTAs.
- **Accent**: Burnt Orange `#c2410c` (`thrift-terracotta`) — used sparingly on 1-2 CTAs per page max. Scarcity = expensive.
- **Backgrounds**: Off-white `#F9F9F7` (`cream`), warm gray `#F4F3F0` (`parchment`). No pure white backgrounds. No gradients.
- **Text**: `stone-900` for headings, `stone-700` for body, `stone-500` for captions/muted.
- **Industrial neutrals**: `charcoal` (`#1c1c1c`), `graphite` (`#2d2d2d`) for dark UI surfaces.
- **NEVER use**: Blue (bg-blue-*, text-blue-*), purple, indigo, pink, cyan, violet, or any rainbow color. Status colors (yellow, red, green, amber) are exceptions for semantic meaning only.

### Visual Rules
- **No gradients**. Solid backgrounds only.
- **No emojis**. Use Lucide React icons (monochrome, 1px stroke) exclusively.
- **No grain/noise texture overlays** on body. Clean, editorial paper feel.
- **Border radius**: `rounded-sm` (2px) for sharp technical look. Never `rounded-lg` or `rounded-full` (except avatars/status dots).
- **Shadows**: Brutalist hard shadows (`shadow-brutal`) on interactive elements. No soft diffused shadows.
- **Spacing**: Generous whitespace between sections. Asymmetric layouts (2/3 + 1/3 splits). No symmetrical 1:1:1 grids.

### Motion
- Subtle, eased transitions (no bouncy springs). Apple-like restraint.
- Staggered reveals on page load via Framer Motion.
- Hover states: translate + shadow shift (brutalist lift), not scale/glow.
