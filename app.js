/* app.js — scroll-spy + mobile nav
   ─────────────────────────────────────────────────────────────
   No dependencies. Works in every modern browser.
   IntersectionObserver root is .content (the scroll container),
   not window, because the page body does not scroll on desktop.
*/

(function () {
  'use strict';

  const content  = document.getElementById('content');
  const sidebar  = document.getElementById('sidebar');
  const menuBtn  = document.getElementById('menuBtn');
  const overlay  = document.getElementById('overlay');
  const navLinks = document.querySelectorAll('.nav-link[data-target]');
  const pages    = document.querySelectorAll('.page[id]');

  // ── Active nav link ─────────────────────────────────────────
  function setActive(id) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.target === id);
    });
  }

  // ── Scroll-spy via IntersectionObserver ─────────────────────
  // root is the .content element so the observer fires against
  // the inner scroll viewport, not the window.
  const isMobile = () => window.innerWidth <= 768;

  function makeObserver() {
    return new IntersectionObserver(
      entries => {
        // Pick the entry with the greatest intersection ratio
        // among those that are currently intersecting.
        let best = null;
        entries.forEach(entry => {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.intersectionRatio)
          ) {
            best = entry;
          }
        });
        if (best) setActive(best.target.id);
      },
      {
        root: isMobile() ? null : content,
        rootMargin: '0px',
        threshold: [0.1, 0.3, 0.5],
      }
    );
  }

  let observer = makeObserver();
  pages.forEach(p => observer.observe(p));

  // Re-initialise the observer if the viewport crosses the
  // mobile breakpoint (root must change from .content → null).
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

  // ── Nav click: smooth scroll + immediate active state ───────
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.dataset.target;
      const target   = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      setActive(targetId);

      if (isMobile()) {
        // On mobile, body scrolls; use standard scrollIntoView.
        closeSidebar();
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        // On desktop, scroll the .content container.
        content.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth',
        });
      }

      // Update the URL hash without triggering a jump.
      history.replaceState(null, '', `#${targetId}`);
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

  menuBtn.addEventListener('click', () => {
    sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener('click', closeSidebar);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
  });

  // ── Restore scroll position from hash on load ───────────────
  window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        setActive(hash);
        // Defer so the layout has settled.
        requestAnimationFrame(() => {
          if (isMobile()) {
            target.scrollIntoView();
          } else {
            content.scrollTop = target.offsetTop;
          }
        });
      }
    } else {
      // Default to first section.
      const first = pages[0];
      if (first) setActive(first.id);
    }
  });
})();
