# Component Library (Pure Grayscale Design System)

A living UI component library, visualizer suite, and wireframe catalog based on the design system documentation in `$WIKI/gui/design-system/`.

Built strictly using **pure grayscales** (zero chromatic tinting, $R = G = B$).

## Live Showcase

**[repo-37.github.io/gh-pages-demo](https://repo-37.github.io/gh-pages-demo/)**

## Theme Architecture & Spatial Rules

- **Strict Pure Grayscale Scale**: 15-step scale (`--gray-0` `#000000` to `--gray-100` `#ffffff`, $R=G=B$). Absolutely zero chromatic undertones (no blue, zinc, or slate).
- **Light Mode Hierarchy**:
  - Overall Page Canvas (`--color-surface-page`): **Off-white** `#f0f0f0` (`var(--gray-95)`) — not pure white.
  - Sidebar & Cards (`--color-surface-card`): **Pure white** `#ffffff` (`var(--gray-100)`).
  - Spatial containers and elevated surfaces lift visually off the canvas without artificial color drop-shadows.
- **Dark Mode Hierarchy**:
  - Overall Page Canvas: **Pure black** `#000000` (`var(--gray-0)`).
  - Sidebar & Cards: **Dark gray** `#121212` (`var(--gray-10)`).
- **Theme Toggle**: In-header and in-sidebar toggle button syncing with `localStorage` and OS preference (`prefers-color-scheme`).

## Component Variety & Categories (3x Expanded)

### 1. Foundations
- **Overview & Tokens**: Consolidated cards displaying the full 15-step swatches and live typography scale directly in the foundations view.
- **Typography Scale**: Display (2.0rem), Heading 1 (1.5rem), Subheading (1.15rem), Body (0.95rem), and Monospace Telemetry (0.78rem).

### 2. Primitives
- **Buttons & Groups**: Primary solid, secondary surface, outline stroke, ghost text, disabled, sizes (`.btn-sm`, default, `.btn-lg`), icon buttons, joined button groups (`.btn-group`), and segmented tab controls (`.segmented-control`).
- **Badges & Tags**: Solid active, default pill, subtle outline, high-contrast bordered, rounded pills, category markers, and live pulsating state dots.
- **Callouts & Alerts**: Standard notice (`callout-info`), subtle implementation detail (`callout-subtle`), elevated caution boundary (`callout-warn`), blocked gate refusal (`callout-error`), and minimal inline directive (`callout-minimal`).

### 3. Structures
- **Cards & Metric Tiles**: High-density 3-column KPI tiles, interactive clickable cards with hover elevation (`.card-interactive`), and heavy 2px bordered boundary cards (`.card-bordered .card-elevated`).
- **Inputs, Toggles & Controls**: Text fields, dropdown selects, multiline textareas, accessible custom checkboxes, radio groups, binary toggle switches (`.switch-track`), and capacity progress meters (`.progress-bar`).
- **Data Tables**: Standard responsive table, compact dense table (`.table-dense`), and alternating striped table (`.table-striped`).

### 4. Visualisations
- **Matplotlib Chart Wrapper (`.viz-frame`)**: Dark adaptive telemetry curves alongside publication-ready pure white paper canvases (`.paper-surface`).
- **Expanded Mermaid Diagrams (`.mermaid-frame`)**: Full-scale rendered flowcharts (`min-height: 380px`, `max-width: 860px`) preventing tiny clipped nodes and ensuring clear text readability.
- **ASCII Box Architecture (`.ascii-frame`)**: Monospace UTF-8 Unicode box-drawing diagram wrapper preserving column alignment with zero reflow.

### 5. Layout Archetypes (9 Wireframe Page Setups)
1. **01 · Master-Detail Split**: Left record index with right inspection reader.
2. **02 · Holy Grail 3-Column**: Header, navigation tree, center editorial, right TOC outline, footer.
3. **03 · Executive KPI Dashboard**: Top 3-metric strip + asymmetric timeseries and distribution telemetry.
4. **04 · Central Editorial Column**: High-whitespace single reading column for research whitepapers.
5. **05 · Multi-Stage Kanban Board**: Horizontal lanes tracking deliverables across sequential phases.
6. **06 · Canvas & Inspector Tool**: Full-viewport graphical workspace backed by a right-hand property pane.
7. **07 · Chronological Event Stream**: Vertical timeline stream with commit node connectors.
8. **08 · Modular Quad Matrix**: 4 equal-weight operational quadrants for real-time monitoring.
9. **09 · Focused Command Terminal**: Monospace buffer window with prompt execution seam.

## Repository Structure

```
gh-pages-demo/
├── index.html        — Interactive component library showcase & layout catalog
├── style.css         — Pure grayscale CSS tokens, 9 wireframe layouts, and expanded primitives
├── app.js            — Theme manager, native IntersectionObserver scroll-spy, and mobile navigation
├── sample-chart.svg  — Pure grayscale vector chart generated via Python/matplotlib
├── README.md         — Complete component and layout documentation
└── .nojekyll         — Direct GitHub Pages static deployment
```

## License

MIT
