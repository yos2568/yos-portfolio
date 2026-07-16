/**
 * Mobile menu, sticky header state, active section links.
 */
(function () {
  function init() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".menu-toggle");
    const panel = document.querySelector(".nav-panel");
    const navLinks = document.querySelectorAll('[data-nav-link]');

    if (toggle && panel) {
      const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        panel.classList.toggle("is-open", open);
        panel.setAttribute("aria-hidden", open ? "false" : "true");
        document.body.classList.toggle("nav-open", open);
        if (open) {
          const first = panel.querySelector("a");
          if (first) first.focus({ preventScroll: true });
        }
      };

      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "true";
        setOpen(open);
      });

      panel.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => setOpen(false));
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
          setOpen(false);
          toggle.focus();
        }
      });
    }

    if (header) {
      const onScroll = () => {
        const y = window.scrollY || document.documentElement.scrollTop;
        header.classList.toggle("is-scrolled", y > 24);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Active section observation
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    if (sections.length && "IntersectionObserver" in window) {
      const map = new Map();
      navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        if (href.startsWith("#")) map.set(href.slice(1), link);
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach((link) => link.removeAttribute("aria-current"));
            const active = map.get(id);
            if (active) active.setAttribute("aria-current", "true");
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
      );

      sections.forEach((s) => observer.observe(s));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
