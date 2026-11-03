# Component Library (Pure Grayscale Design System)

A living UI component library and showcase based on the design system documentation in `$WIKI/gui/design-system/`.

Built strictly using **pure grayscales** (zero chromatic tinting, $R = G = B$).

## Live Showcase

**[repo-37.github.io/gh-pages-demo](https://repo-37.github.io/gh-pages-demo/)**

## Design System Tokens & Rules

- **Zero-Tint Grayscale Scale**: Uses an absolute neutral 13-step scale from `--gray-0` (`#000000`) through `--gray-100` (`#ffffff`). No slate, blue, or zinc color bleed.
- **Fixed Shell + Scroll-Spy**: Two-column layout with a fixed viewport sidebar on desktop, scrollable content pane, and native `IntersectionObserver` scroll-spy navigation.

## Components Included

### 1. Foundations
- **Grayscale Token Scale**: Swatches and token definitions for 13 pure neutral steps.
- **Typographic Scale**: Hierarchical sans-serif titles and monospace telemetry labels.

### 2. Primitives
- **Buttons**: Primary Solid, Secondary Surface, Outline Stroke, and Disabled states.
- **Badges & Tags**: Status pills and active category indicators mapped to shade contrast.
- **Callouts & Alerts**: Info, subtle technical details, and elevated caution notices.

### 3. Visualisations
- **Matplotlib Chart Wrapper (`.viz-frame`)**:
  - Header actions, dark-mode canvas, publication paper canvas (`.paper-surface`), metadata footer.
  - Native Python Matplotlib SVG vector output with pure neutral palettes.
- **Mermaid Diagrams (`.mermaid-frame`)**:
  - Client-side rendered Mermaid.js diagrams using custom grayscale themes.
  - Directional flowcharts, state transitions, and node highlights.
- **ASCII Architecture (`.ascii-frame`)**:
  - Monospace UTF-8 Unicode box-drawing diagram wrapper (`.ascii-content`) preserving column alignment with zero reflow.

### 4. Structures
- **Cards & Metric Surfaces**: Quantitative metric cards with monospace units.
- **Data Tables**: Tabular telemetry displays with clean hover feedback.
- **Form Controls**: Text inputs with high-contrast pure white focus indicators.

## Repository Structure

```
gh-pages-demo/
├── index.html        — Interactive component library showcase
├── style.css         — Pure grayscale CSS tokens, layout shell, and component primitives
├── app.js            — Native IntersectionObserver scroll-spy and mobile navigation
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
