/**
 * Motion layer — progressive enhancement only.
 * Loaded in <head> (synchronous) so the reveal state is set before first paint.
 * Nothing here is required for the site to work: with JS off, or with
 * prefers-reduced-motion, every element stays in its normal static state.
 */
(function () {
  var root = document.documentElement;
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) return; // no class → no hidden states, no transforms
  root.classList.add("motion");

  var REVEAL = [
    ".card",
    ".dash-card",
    ".week-card",
    ".arc-step",
    ".assess-item",
    ".ethics-col",
    ".callout",
    ".table-wrap",
    ".progress-panel",
    ".action-panel",
      ".prompt-section",
      ".chapter-content",
      ".disclosure-print",
    ".link-list li",
    ".milestone-list li",
    ".filter-group",
    ".semester-arc > h2",
    ".main > h2",
    ".main > h3",
    ".main > p",
    ".main > ul",
    ".main > ol",
    ".main > section > h2",
    ".main > .week-nav",
  ].join(",");

  var io = null;

  function ensureObserver() {
    if (io || !("IntersectionObserver" in window)) return io;
    io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("rv-in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
    );
    return io;
  }

  function prepare(scope) {
    var nodes = (scope || document).querySelectorAll(REVEAL);
    var groups = new Map();

    Array.prototype.forEach.call(nodes, function (el) {
      if (el.dataset.rv) return;
      if (el.closest(".hero")) return; // hero has its own choreography
      var parent = el.parentElement;
      if (parent && parent.closest("[data-rv-child]") ) return;
      if (parent && parent.parentElement && parent.closest(".rv") && !el.matches("li")) return;

      el.dataset.rv = "1";
      el.classList.add("rv");

      var key = parent || document.body;
      var i = groups.get(key) || 0;
      groups.set(key, i + 1);
      el.style.setProperty("--rvi", String(Math.min(i, 7)));

      var obs = ensureObserver();
      if (obs) {
        var box = el.getBoundingClientRect();
        // already on screen at prepare time → reveal on the entrance timeline
        if (box.top < window.innerHeight * 0.96) el.classList.add("rv-in");
        else obs.observe(el);
      } else {
        el.classList.add("rv-in");
      }
    });
  }

  function safety() {
    document.querySelectorAll(".rv:not(.rv-in)").forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight) el.classList.add("rv-in");
    });
  }

  /* ── header state on scroll ─────────────────────────── */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }
    update();
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );
  }

  /* ── hero parallax + entrance ───────────────────────── */
  function initHero() {
    var hero = document.querySelector(".hero-video");
    if (!hero) return;
    hero.classList.add("hero-lit");
    var media = hero.querySelector(".hero-media");
    if (!media) return;
    var ticking = false;
    function update() {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        media.style.transform = "translate3d(0," + (y * 0.14).toFixed(1) + "px,0)";
      }
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );
  }

  /* ── progress figure count-up ───────────────────────── */
  function initProgress(scope) {
    var bar = (scope || document).querySelector("[data-progress-bar]");
    if (!bar || bar.dataset.motion) return;
    bar.dataset.motion = "1";
    var target = bar.style.width || "0%";
    bar.style.width = "0%";
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bar.style.width = target;
      });
    });
  }

  /* ── press feedback on chips + buttons ──────────────── */
  function initPress() {
    document.addEventListener(
      "pointerdown",
      function (e) {
        var t = e.target.closest(".btn, .filter-chip, .week-card, a.card.card-link");
        if (!t) return;
        t.classList.add("is-pressed");
      },
      { passive: true }
    );
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
      document.addEventListener(
        ev,
        function (e) {
          var t = e.target && e.target.closest
            ? e.target.closest(".is-pressed")
            : null;
          if (t) t.classList.remove("is-pressed");
          document.querySelectorAll(".is-pressed").forEach(function (el) {
            el.classList.remove("is-pressed");
          });
        },
        { passive: true }
      );
    });
  }

  /* ── boot ───────────────────────────────────────────── */
  function boot() {
    document.body.classList.add("motion-boot");
    prepare(document);
    initHeader();
    initHero();
    initProgress(document);
    initPress();

    // Content is injected by main.js/layout.js after DOMContentLoaded.
    var pending = null;
    var mo = new MutationObserver(function () {
      if (pending) return;
      pending = requestAnimationFrame(function () {
        pending = null;
        prepare(document);
        initHeader();
        initProgress(document);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    setTimeout(safety, 1200);
    window.addEventListener("load", safety);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
