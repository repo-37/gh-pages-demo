# gh-pages-demo

A minimal, dependency-free scaffold for GitHub Pages sites.

Fixed sidebar navigation, scrollable full-viewport content sections, and a mobile hamburger menu — all in three plain files.

## Live site

**[repo-37.github.io/gh-pages-demo](https://repo-37.github.io/gh-pages-demo/)**

## Structure

```
gh-pages-demo/
├── index.html   — markup and content sections
├── style.css    — CSS grid layout, design tokens, all components
├── app.js       — IntersectionObserver scroll-spy, mobile nav
└── .nojekyll    — skip Jekyll, serve files as-is
```

## Features

- **Fixed sidebar** with grouped navigation and scroll-spy active state
- **Full-viewport sections** — each `<section>` fills the screen before the next begins
- **Smooth scroll** on nav click, hash restore on page load
- **Mobile** — sidebar collapses off-canvas with a hamburger button and overlay dismiss
- **No dependencies** — no framework, no bundler, no build step

## Usage

### Clone and open locally

```bash
git clone https://github.com/repo-37/gh-pages-demo.git
cd gh-pages-demo
open index.html        # macOS
xdg-open index.html    # Linux
```

### Add a section

1. Add a section to `index.html`:

```html
<section class="page" id="your-slug">
  <div class="page-inner">
    <div class="breadcrumb">Group name</div>
    <h1 class="page-title">Your title</h1>
    <p class="page-lead">Lead paragraph.</p>
    <!-- content -->
  </div>
</section>
```

2. Add a matching nav link in the sidebar:

```html
<a class="nav-link" href="#your-slug" data-target="your-slug">
  Your title
</a>
```

The `IntersectionObserver` picks up the new section automatically — no JS changes needed.

### Deploy to GitHub Pages

```bash
# Create a public repo and push
gh repo create my-site --public --source=. --remote=origin --push

# Enable Pages from main /
gh api repos/:owner/my-site/pages \
  --method POST \
  --input - <<'EOF'
{"source":{"branch":"main","path":"/"}}
EOF
```

Live at `https://<owner>.github.io/my-site/` after ~30 seconds.

## Configuration

All visual settings are CSS custom properties at the top of `style.css`:

| Token | Default | Controls |
|---|---|---|
| `--sidebar-w` | `260px` | Sidebar width |
| `--topbar-h` | `52px` | Mobile top bar height |
| `--accent` | `#4f8ef7` | Active link, highlight colour |
| `--bg` | `#0d0f14` | Page background |
| `--surface` | `#13161e` | Sidebar and card background |
| `--border` | `#252a38` | Divider colour |
| `--font-sans` | `system-ui` | Body typeface |
| `--font-mono` | `ui-monospace` | Code typeface |

## How scroll-spy works

The observer `root` is `.content` (the scroll container), not `window`. On desktop the body does not scroll — only `.content` does — so without `root: content` the observer never fires.

```js
new IntersectionObserver(onIntersect, {
  root: content,    // the scrolling element, not window
  threshold: 0.3,   // active once 30% of the section is visible
});
```

## License

MIT
