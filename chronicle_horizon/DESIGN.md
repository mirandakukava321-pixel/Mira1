---
name: Chronicle & Horizon
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#cdc5bb'
  on-secondary: '#343029'
  secondary-container: '#4a463e'
  on-secondary-container: '#bbb4aa'
  tertiary: '#fff3f9'
  on-tertiary: '#5b005b'
  tertiary-container: '#ffc9f4'
  on-tertiary-container: '#a900a9'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e9e1d7'
  secondary-fixed-dim: '#cdc5bb'
  on-secondary-fixed: '#1e1b15'
  on-secondary-fixed-variant: '#4a463e'
  tertiary-fixed: '#ffd7f5'
  tertiary-fixed-dim: '#ffabf3'
  on-tertiary-fixed: '#380038'
  on-tertiary-fixed-variant: '#810081'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display-past:
    fontFamily: ebGaramond
    fontSize: 64px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-present:
    fontFamily: workSans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  display-future:
    fontFamily: jetbrainsMono
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  headline-lg:
    fontFamily: ebGaramond
    fontSize: 40px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: ebGaramond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  body-md:
    fontFamily: workSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-tech:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 128px
---

## Brand & Style
The design system is built on the concept of "The Living Archive." It bridges the gap between historical reverence and speculative evolution. The personality is authoritative yet wonder-filled, functioning like a high-end digital museum.

The style is a sophisticated blend of **Minimalism** and **Glassmorphism**, utilized to create a "portal" effect. Content is treated as "artifacts" suspended in a fluid timeline. The UI remains unobtrusive to allow high-fidelity cinematic imagery to drive the emotional narrative. Smooth, eased transitions (long durations, ~600ms) are essential to simulate the feeling of drifting through time.

## Colors
The palette is divided into "Temporal Zones" to provide instant orientation:

- **Global UI:** Deep Indigo and Charcoal (#0F1115) form the base, acting as the "void" of time.
- **The Past:** Uses Sepia and Parchment for backgrounds, with Mahogany for text. This zone feels organic and tactile.
- **The Present:** Uses high-contrast Crisp Whites and Slate for a grounded, journalistic feel.
- **The Future:** Driven by Neon Cyan and Magenta accents against deep Indigo. These colors should be used for interactive "data-streams" and UI highlights.

## Typography
This design system employs a "Tri-Epochal" typographic strategy:

- **Past (ebGaramond):** Used for storytelling, long-form narratives, and section headers. It conveys wisdom and history.
- **Present (workSans):** Used for navigation, functional data, and primary body copy. It provides a neutral, reliable anchor.
- **Future (jetbrainsMono):** Used for metadata, coordinates, dates, and technical readouts. It implies a systematic, computed reality.

Always use wide tracking for Monospace labels to enhance the "HUD" (Heads-Up Display) aesthetic.

## Layout & Spacing
The layout follows a **Fixed Grid** model (12 columns) for data-heavy sections, but transitions into a **Fluid/Editorial** flow for storytelling. 

Generous whitespace (the "Section Gap") is used to separate time periods, preventing visual bleed between the Past and the Future. Elements should often "break the grid" with overlapping cinematic images to create depth. On mobile, the 12-column grid collapses to a 4-column layout with increased vertical margins to maintain the "exhibit" feel.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Tonal Layering**. 

- **Level 1 (The Void):** Solid background color (#0F1115).
- **Level 2 (The Artifact):** Semi-transparent surfaces (20% opacity) with a 20px backdrop blur and a 1px inner "light leak" stroke at the top.
- **Level 3 (Interactive):** Elements that float above the timeline use subtle, tinted outer glows (Cyan for Future, Gold for Past) rather than traditional black shadows.

This creates the illusion of looking through a glass display case at historical or futuristic data.

## Shapes
The design system utilizes **Soft (0.25rem)** roundedness to maintain a sense of precision and architectural structure. 

- **Buttons & Chips:** Use very slight rounding or sharp corners for the Future/Present, while Past-themed elements may use larger radii to feel more organic.
- **Frames:** Images should be framed in strict rectangular shapes to mimic museum photography prints or cinema screens.
- **Timeline Sliders:** Use "Pill-shaped" (3) handles for tactile ease of use.

## Components

- **Cinematic Cards:** Large-format cards with a 16:9 aspect ratio. They use a gradient overlay (bottom-to-top) to ensure "Past" or "Future" display typography remains legible over the imagery.
- **Glassmorphic Timeline Sliders:** A horizontal track that uses a backdrop-blur effect. Marks on the timeline use Monospaced labels. The handle glows with the primary color of the active "Epoch."
- **Interactive Globe:** A wireframe-style SVG or 3D element used for geographic "Time Jumps," rendered in Future-cyan with technical labels.
- **Storytelling Typography Blocks:** Specially styled paragraphs that use a "Drop Cap" for Past-narratives, and "Data-bits" (small monospaced tags) for Future-narratives.
- **Buttons:**
  - *Past:* Text-link with a sophisticated serif underline.
  - *Present:* Solid slate-gray buttons with white text.
  - *Future:* Ghost buttons with a neon-cyan stroke and subtle outer glow on hover.
- **Input Fields:** Minimalist underlines with monospaced floating labels, mimicking a terminal or a ledger.