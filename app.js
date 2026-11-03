/* app.js — robust scroll-spy + layout nav + light/dark theme toggle + accent picker
   ─────────────────────────────────────────────────────────────
   Supports:
   - Light mode (off-white #f0f0f0 canvas, pure white #ffffff cards & sidebar)
   - Dark mode (pure black #000000 canvas, dark #121212 cards & sidebar)
   - Accent color selection (Neutral, Cyan, Emerald, Amber, Rose, Violet)
   - Container-relative offset calculation for fail-safe section scrolling
   - Wide-screen one-page app synchronization
*/

(function () {
  'use strict';

  const content     = document.getElementById('content');
  const sidebar     = document.getElementById('sidebar');
  const menuBtn     = document.getElementById('menuBtn');
  const overlay     = document.getElementById('overlay');
  const navLinks    = document.querySelectorAll('.nav-link[data-target]');
  const pages       = document.querySelectorAll('.page[id]');
  const themeBtns   = document.querySelectorAll('[data-action="toggle-theme"]');
  const accentDots  = document.querySelectorAll('.accent-dot[data-accent]');

  // ── Theme Management ─────────────────────────────────────────
  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeBtns.forEach(btn => {
      const label = btn.querySelector('.theme-btn-label');
      if (label) {
        label.textContent = theme === 'light' ? 'DARK' : 'LIGHT';
      }
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  themeBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Apply initial theme immediately
  applyTheme(getPreferredTheme());

  // Listen for OS theme changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

  // ── Dynamic Accent Color Picker ──────────────────────────────
  function setAccent(accent) {
    if (accent === 'neutral') {
      document.documentElement.removeAttribute('data-accent');
      localStorage.removeItem('accent');
    } else {
      document.documentElement.setAttribute('data-accent', accent);
      localStorage.setItem('accent', accent);
    }
    accentDots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.accent === accent);
    });
  }

  const savedAccent = localStorage.getItem('accent') || 'neutral';
  setAccent(savedAccent);

  accentDots.forEach(dot => {
    dot.addEventListener('click', () => {
      setAccent(dot.dataset.accent);
    });
  });

  // ── Active nav link ─────────────────────────────────────────
  function setActive(id) {
    navLinks.forEach(link => {
      const match = link.dataset.target === id;
      link.classList.toggle('active', match);
    });
  }

  // ── Accurate Container-Relative Scroll Calculation ───────────
  function scrollToSection(targetId, smooth = true) {
    const target = document.getElementById(targetId);
    if (!target) return;

    setActive(targetId);

    if (window.innerWidth <= 768) {
      closeSidebar();
      target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    } else {
      const contentRect = content.getBoundingClientRect();
      const targetRect  = target.getBoundingClientRect();
      const targetScrollTop = content.scrollTop + (targetRect.top - contentRect.top);

      content.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: smooth ? 'smooth' : 'auto',
      });
    }

    history.replaceState(null, '', `#${targetId}`);
  }

  // ── Scroll-spy via IntersectionObserver ─────────────────────
  const isMobile = () => window.innerWidth <= 768;

  function makeObserver() {
    return new IntersectionObserver(
      entries => {
        let best = null;
        entries.forEach(entry => {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.intersectionRatio)
          ) {
            best = entry;
          }
        });
        if (best && best.target.id) {
          setActive(best.target.id);
        }
      },
      {
        root: isMobile() ? null : content,
        rootMargin: '-5% 0px -40% 0px',
        threshold: [0.05, 0.2, 0.4],
      }
    );
  }

  let observer = makeObserver();
  pages.forEach(p => observer.observe(p));

  // Re-initialise the observer if the viewport crosses the mobile breakpoint
  let wasDesktop = !isMobile();
  window.addEventListener('resize', () => {
    const isDesktop = !isMobile();
    if (isDesktop !== wasDesktop) {
      observer.disconnect();
      observer = makeObserver();
      pages.forEach(p => observer.observe(p));
      wasDesktop = isDesktop;
    }
  });

  // ── Nav click listener ──────────────────────────────────────
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.dataset.target;
      scrollToSection(targetId, true);
    });
  });

  // ── Mobile sidebar ──────────────────────────────────────────
  function openSidebar() {
    sidebar.classList.add('is-open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
  });

  // ── Restore scroll position on load ─────────────────────────
  window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
      setTimeout(() => scrollToSection(hash, false), 50);
    } else if (pages.length > 0) {
      setActive(pages[0].id);
    }
  });
})();
