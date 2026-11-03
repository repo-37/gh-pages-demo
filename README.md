# Component Library (Pure Grayscale Design System)

A living UI component library and showcase based on the design system documentation in `$WIKI/gui/design-system/`.

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

## Components Included

### 1. Foundations
- **Grayscale Token Scale**: Swatches and token definitions for 15 pure neutral steps.
- **Typographic Scale**: Hierarchical sans-serif titles and monospace telemetry labels.

### 2. Primitives
- **Buttons**: Primary Solid, Secondary Surface, Outline Stroke, and Disabled states with adaptive contrast inversion.
- **Badges & Tags**: Status indicators mapped to pure shade contrast hierarchy.
- **Callouts & Alerts**: Info, subtle technical details, and elevated caution notices.

### 3. Visualisations
- **Matplotlib Chart Wrapper (`.viz-frame`)**:
  - Header actions, dark/light adaptive canvas, publication paper canvas (`.paper-surface`), metadata footer.
  - Native Python Matplotlib SVG vector output with pure neutral palettes.
- **Mermaid Diagrams (`.mermaid-frame`)**:
  - Client-side rendered Mermaid.js diagrams using custom grayscale theme variables.
  - Directional flowcharts, state transitions, and node highlights.
- **ASCII Architecture (`.ascii-frame`)**:
  - Monospace UTF-8 Unicode box-drawing diagram wrapper (`.ascii-content`) preserving column alignment with zero reflow.

### 4. Structures
- **Cards & Metric Surfaces**: Quantitative metric cards with monospace units and subtle elevation.
- **Data Tables**: Tabular telemetry displays with clean hover feedback.
- **Form Controls**: Text inputs with adaptive high-contrast focus rings.

## Repository Structure

```
gh-pages-demo/
├── index.html        — Interactive component library showcase
├── style.css         — Pure grayscale CSS tokens, light/dark themes, layout shell, and component primitives
├── app.js            — Theme manager, native IntersectionObserver scroll-spy, and mobile navigation
├── sample-chart.svg  — Pure grayscale vector chart generated via Python/matplotlib
├── README.md         — Component system guide
└── .nojekyll         — Direct GitHub Pages static deployment
```

## Adding New Visualisations

### Matplotlib Plot
```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots()
fig.patch.set_facecolor('#121212')
ax.set_facecolor('#121212')
ax.plot(x, y, color='#ffffff')
fig.savefig('plot.svg', facecolor=fig.get_facecolor())
```
Wrap in:
```html
<div class="viz-frame">
  <div class="viz-header"><div class="viz-title">FIG · Plot Title</div></div>
  <div class="viz-canvas"><img src="plot.svg" /></div>
  <div class="viz-footer"><span>Metadata caption</span></div>
</div>
```

### Mermaid Diagram
```html
<div class="mermaid-frame">
  <div class="viz-header"><div class="viz-title">DIAG · System Pipeline</div></div>
  <div class="mermaid-content">
    <pre class="mermaid">
      graph LR
        A[Input] --> B[Processing]
        B --> C[Output]
    </pre>
  </div>
  <div class="viz-footer"><span>Engine: Mermaid.js</span></div>
</div>
```

### ASCII Architecture Frame
```html
<div class="ascii-frame">
  <div class="viz-header"><div class="viz-title">TOPOLOGY · Architecture</div></div>
  <pre class="ascii-content">
┌─────────────┐     ┌─────────────┐
│  Component  │ ──► │  Service    │
└─────────────┘     └─────────────┘
  </pre>
  <div class="viz-footer"><span>UTF-8 Box Drawing</span></div>
</div>
```

## License

MIT
