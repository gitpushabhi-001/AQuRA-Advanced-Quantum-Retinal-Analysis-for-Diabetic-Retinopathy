---
name: Quantum Precision Clinical EHR
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3d4947'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
  data-metric:
    fontFamily: JetBrains Mono
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.5rem
    letterSpacing: -0.02em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.05em
  label-ui:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-desktop: 1rem
  margin: 0.75rem
  margin-desktop: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system establishes a high-acuity, surgical-grade interface tailored for multidisciplinary clinical workflows, quantum diagnostics, and critical care decision support. It bridges futuristic telemetry with enterprise clinical pragmatism. The visual aesthetic fuses high-density functional minimalism with subtle technical structure: crisp boundary planes, ultra-legible data hierarchy, and intentional color accents engineered to minimize cognitive strain during prolonged 12-hour shifts.

The emotional signature is authoritative, calm, and unmistakably precise. Every interface node communicates diagnostic confidence, sterile order, and instantaneous latency.

## Colors

The palette is engineered around high clinical contrast and strict chromatic utility.

- **Canvas & Surface Tier:** Root application surfaces use clinical slate white (`#f8fafc` / `bg-slate-50`), structured cards and panels use pure clinical white (`#ffffff`), and inset telemetry panels or table headers leverage light structural slate (`#f1f5f9` / `slate-100`).
- **Primary & Interactive (Surgical Teal):** Active controls, telemetry anchors, and primary workflow triggers utilize Surgical Teal (`#0d9488` / `teal-600`), darkening to `#0f766e` (`teal-700`) on active or hover states. High-acuity focus rings leverage an alpha variant (`rgba(13, 148, 136, 0.2)`).
- **Secondary Accent:** Deep telemetry accents and nested category indicators utilize deep teal (`#115e59` / `teal-800`).
- **Clinical Status Metrics:** 
  - **Normal / Nominal:** Subtle Emerald (`#10b981` / `emerald-500`) with soft emerald tint fills (`#ecfdf5`).
  - **Critical / Acute:** High-contrast Crimson (`#e11d48` / `rose-600`) with high-legibility red tint fills (`#fff1f2`).
  - **Warning / Pending Lab:** Calibrated Amber (`#d97706` / `amber-600`) with amber tint fills (`#fffbeb`).
  - **Diagnostic / Quantum Processing:** Clinical Violet (`#6366f1` / `indigo-500`).
- **Typography & Structural Contrast:** Dominant typography uses deep slate (`#0f172a` / `slate-900`), secondary labels and timestamps rely on muted slate (`#475569` / `slate-600`), and grid borders require crisp slate edges (`#e2e8f0` / `slate-200`).

## Typography

The type system pairs **Inter** for high-density, fatigue-free clinical scanning with **JetBrains Mono** for numerical values, genomic sequences, dosage readouts, vital signs, and HL7/FHIR telemetry codes. 

Tabular figures (`font-variant-numeric: tabular-nums`) are globally enforced across all numeric components and data tables to preserve alignment during real-time telemetry streaming. All uppercase monospaced labels require an expanded tracking (`+0.05em`) to optimize immediate parsing in high-stress clinical situations.

## Layout & Spacing

The layout operates on an enterprise-grade multi-pane data workspace designed for maximum screen utilization.

- **Grid Architecture:** A dense 12-column layout on standard viewport monitors (1024px–1440px) expanding to a fluid 16-column layout on high-resolution clinical diagnostic displays (1920px+). 
- **Workspace Partitioning:** Tri-panel clinical configuration:
  - Fixed Collapsible Navigation/Context Rail (64px to 220px width).
  - Main Patient Timeline/Encounter Stream (fluid 8-column center).
  - Dynamic Quantum Diagnostic & Vitals Inspector Rail (fixed 360px to 420px width).
- **Responsive Adaptations:** 
  - On tablet displays (768px–1023px), the dynamic diagnostic rail collapses into a slide-over sheet triggered by vital status pills, preserving core charting flow.
  - On mobile displays (<768px), views reflow to a single-column layout prioritizing patient identifier bars, alert notifications, and quick encounter recording.

## Elevation & Depth

This system avoids heavy, atmospheric drop shadows in favor of surgical boundary lines and structural planar containment. Depth reflects acute urgency and layer modality rather than decorative styling:

- **Surface Planar (Base Layer):** Outlined with 1px structural borders (`#e2e8f0`) over `#f8fafc`. Zero shadow.
- **Card / Tile Elevation (Level 1):** Solid white surface (`#ffffff`), 1px continuous border (`#e2e8f0`), paired with a crisp clinical micro-shadow: `0 1px 2px 0 rgba(15, 23, 42, 0.04)`.
- **Active Telemetry & Floating Panels (Level 2):** Subtle surgical lift using `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)` combined with a crisp border (`#cbd5e1`).
- **Critical Alert Modals & Diagnostic Drawers (Level 3):** Clean clinical backdrop scrim (`rgba(15, 23, 42, 0.4)`) with panel elevation of `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)` bounded by a 1px border.

## Shapes

The interface utilizes a soft, calibrated corner radius (`0.25rem` / `rounded`) across interactive elements, inputs, and container panels. This keeps visual anchors sharp and structural, optimizing screen real estate for dense patient records while eliminating brutalist sharp edges.

Status badges, telemetry pulse dots, and vital chips employ a subtle pill variant (`9999px`) to immediately differentiate categorical attributes and transient states from actionable input containers.

## Components

- **Buttons:**
  - *Primary:* Surgical Teal background (`#0d9488`), white text, font-weight 500, height 32px (compact) or 36px (default), 1px border (`#0f766e`). Active state switches to `#0f766e`.
  - *Secondary / Clinical Outline:* Pure white background, slate-800 text, 1px border (`#cbd5e1`), hover background `#f8fafc`.
  - *Critical Action:* Crimson background (`#e11d48`), white text, 1px border (`#be123c`).
- **Telemetry Chips & Status Pills:**
  - Height 22px, padding 0 8px, monospaced font sizing (`label-mono`), inline status dot (6px) with an emerald, amber, or rose indicator. Background colors use 10% saturation tint fills with 1px borders matching the status hue at 30% opacity.
- **Data Tables & Patient Lists:**
  - Row height strictly bounded to 36px (dense) or 44px (standard). Alternating row background on hover (`#f8fafc`). Bottom border 1px (`#f1f5f9`). Column headers styled in uppercase `label-mono` with slate-500 coloring, resting on `#f8fafc`.
- **Form Controls & Diagnostic Inputs:**
  - Height 34px, 1px border (`#cbd5e1`), background white. Focus state emits a sharp Surgical Teal border (`#0d9488`) paired with a 2px outer outline in `rgba(13, 148, 136, 0.15)`. Labels sit directly above the input at `label-ui` in slate-700.
- **Checkboxes & Radios:**
  - 16px × 16px, 1px border (`#94a3b8`), selected state `#0d9488` with white checkmark. Focus ring matches input states.
- **Diagnostic Timeline Cards:**
  - White container with a 1px left accent bar denoting priority (e.g., 3px solid `#0d9488` for standard, `#e11d48` for STAT orders). Header displays patient identifier, age, and encounter timestamps formatted via `label-mono`.