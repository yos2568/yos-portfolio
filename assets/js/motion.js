/**
 * Progressive motion: reveal on scroll, optional hero spotlight.
 * Honors prefers-reduced-motion.
 */
(function () {
  function prefersReduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initReveals() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (prefersReduced() || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    nodes.forEach((n) => observer.observe(n));
  }

  function initSpotlight() {
    if (prefersReduced()) {
      document.body.classList.add("reduce-motion");
      return;
    }

    const surfaces = document.querySelectorAll(".spotlight-surface");
    surfaces.forEach((el) => {
      el.addEventListener(
        "pointermove",
        (e) => {
          const rect = el.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          el.style.setProperty("--spot-x", `${x}%`);
          el.style.setProperty("--spot-y", `${y}%`);
        },
        { passive: true }
      );
    });
  }

  function initHeroVideo() {
    const media = document.querySelector(".hero__media");
    const video = document.querySelector(".hero__video");
    if (!media || !video) return;

    if (prefersReduced()) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    const markReady = () => media.classList.add("has-video");

    video.addEventListener("loadeddata", markReady, { once: true });
    video.addEventListener("playing", markReady, { once: true });

    // Ensure autoplay after user gesture / browser policy edge cases
    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* keep poster if autoplay blocked */
        });
      }
    };

    if (video.readyState >= 2) {
      markReady();
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }
  }

  function init() {
    document.documentElement.classList.add("js-enabled");
    initReveals();
    initSpotlight();
    initHeroVideo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
