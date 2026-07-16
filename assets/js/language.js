/**
 * English / Thai language switching via data-i18n keys
 * and data-en / data-th attributes on elements.
 */
(function () {
  const STORAGE_KEY = "yos-lang";
  const DEFAULT = "en";

  function getPreferred() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "th") return saved;
    } catch (_) {
      /* ignore */
    }
    return DEFAULT;
  }

  function setDocumentLang(lang) {
    document.documentElement.lang = lang === "th" ? "th" : "en";
    document.documentElement.dataset.lang = lang;
  }

  function applyLanguage(lang) {
    const nodes = document.querySelectorAll("[data-en][data-th]");
    nodes.forEach((el) => {
      const value = lang === "th" ? el.getAttribute("data-th") : el.getAttribute("data-en");
      if (value == null) return;
      // Allow simple emphasis markup
      if (value.includes("<") && /<\/?[a-z][\s\S]*>/i.test(value)) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      const pressed = btn.getAttribute("data-lang-btn") === lang;
      btn.setAttribute("aria-pressed", pressed ? "true" : "false");
    });

    setDocumentLang(lang);

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      /* ignore */
    }

    document.dispatchEvent(new CustomEvent("yos:langchange", { detail: { lang } }));
  }

  function init() {
    const initial = getPreferred();
    applyLanguage(initial);

    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang-btn");
        if (lang === "en" || lang === "th") applyLanguage(lang);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.YosLang = { applyLanguage, getPreferred };
})();
