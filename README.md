# Component Library (Pure Grayscale Design System)

A living UI component library and showcase based on the design system documentation in `$WIKI/gui/design-system/`.

Built strictly using **pure grayscales** (zero chromatic tinting, $R = G = B$).

## Live Showcase

**[repo-37.github.io/gh-pages-demo](https://repo-37.github.io/gh-pages-demo/)**

## Design System Tokens & Rules

- **Zero-Tint Grayscale Scale**: Uses an absolute neutral 13-step scale from `--gray-0` (`#000000`) through `--gray-100` (`#ffffff`). No slate, blue, or zinc color bleed.
- **Fixed Shell + Scroll-Spy**: Two-column layout with a fixed viewport sidebar on desktop, scrollable content pane, and native `IntersectionObserver` scroll-spy navigation.
- **Components Included**:
  - **Foundations**: Grayscale Token Scale, Typographic Hierarchy
  - **Primitives**: Buttons (Primary, Secondary, Outline, Disabled), Badges & Status Indicators, Callouts & Alerts
  - **Structures**: Cards & Metric Surfaces, Tabular Data Tables, Form Controls & Inputs

## Repository Structure

```
gh-pages-demo/
├── index.html   — Component library interactive showcase
├── style.css    — Pure grayscale CSS tokens, layout shell, and component primitives
├── app.js       — Native IntersectionObserver scroll-spy and mobile navigation
├── README.md    — Component system guide
└── .nojekyll    — Direct GitHub Pages static deployment
```

## Adding New Components

1. Open `style.css` and declare classes referencing pure grayscale variables (`var(--gray-*)` or semantic `--color-surface-*`, `--color-border-*`, `--color-text-*`).
2. Add a showcase `<section class="page" id="your-component">` block to `index.html`.
3. Add a `<a class="nav-link" href="#your-component" data-target="your-component">` link to the sidebar.
4. Changes automatically integrate into the scroll-spy observer without extra JavaScript.

## License

MIT
