/** Wind Pedagogy static hub for yos.in.th/pedagogy/ */

const BASE = new URL(".", import.meta.url); // assets/
const ROOT = new URL("..", BASE); // pedagogy/

async function loadCourseData() {
  const res = await fetch(new URL("course-data.json", BASE));
  if (!res.ok) throw new Error("Cannot load course-data.json");
  return res.json();
}

function weekMarkdownUrl(week) {
  return new URL(
    `weekly-content/Week ${week} - teaching content.md`,
    ROOT,
  ).href;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function resolveAssetUrl(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("./images/") || trimmed.startsWith("images/")) {
    const path = trimmed.replace(/^\.\//, "");
    return new URL(`weekly-content/${path}`, ROOT).href;
  }
  return trimmed;
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) =>
    `<img class="lesson-inline-image" src="${escapeHtml(resolveAssetUrl(url))}" alt="${escapeHtml(alt)}" loading="lazy" />`,
  );
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) =>
    `<a href="${escapeHtml(resolveAssetUrl(url))}">${label}</a>`,
  );
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return html;
}

function tableCells(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

function renderMarkdown(source) {
  const content = source.replace(/^---[\s\S]*?---\s*/, "");
  const lines = content.split(/\r?\n/);
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const [, alt, url] = imageMatch;
      blocks.push(
        `<figure class="lesson-figure"><img src="${escapeHtml(resolveAssetUrl(url))}" alt="${escapeHtml(alt)}" loading="lazy" /><figcaption>${escapeHtml(alt)}</figcaption></figure>`,
      );
      index += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
      blocks.push("<hr />");
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = Math.min(headingMatch[1].length + 1, 6);
      blocks.push(`<h${level}>${inlineMarkdown(headingMatch[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines = [];
      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quoteLines.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(`<blockquote>${inlineMarkdown(quoteLines.join(" "))}</blockquote>`);
      continue;
    }

    if (line.startsWith("|") && index + 1 < lines.length && /^\|?\s*:?-{3,}/.test(lines[index + 1].trim())) {
      const header = tableCells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      blocks.push(
        `<div class="lesson-table-wrap"><table><thead><tr>${header.map((c) => `<th>${inlineMarkdown(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((c) => `<td>${inlineMarkdown(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`,
      );
      continue;
    }

    const ordered = /^\d+\.\s+/.test(line);
    const unordered = /^[-*]\s+/.test(line);
    if (ordered || unordered) {
      const items = [];
      while (index < lines.length) {
        const current = lines[index].trim();
        const match = current.match(ordered ? /^\d+\.\s+(.+)$/ : /^[-*]\s+(.+)$/);
        if (!match) break;
        items.push(`<li>${inlineMarkdown(match[1])}</li>`);
        index += 1;
      }
      blocks.push(`<${ordered ? "ol" : "ul"}>${items.join("")}</${ordered ? "ol" : "ul"}>`);
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trim();
      if (
        !next ||
        /^(#{1,6})\s+/.test(next) ||
        next.startsWith("|") ||
        next.startsWith("> ") ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next) ||
        /^!\[/.test(next)
      ) {
        break;
      }
      paragraphLines.push(next);
      index += 1;
    }
    blocks.push(`<p>${inlineMarkdown(paragraphLines.join(" "))}</p>`);
  }

  return blocks.join("\n");
}

const thaiWeekdays = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

function formatDate(date) {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return `${thaiWeekdays[weekday]} ${day} ${thaiMonths[month - 1]} ${year + 543}`;
}

function categoryLabel(category) {
  if (category === "foundation") return "Foundation";
  if (category === "selected") return "Specialist";
  return "Capstone";
}

const WEEK_ONE_RESOURCES = [
  { label: "Wind Pedagogy สัปดาห์ที่ 1", href: "https://notebook.google.com/notebook/c3e570a3-8e7c-4be2-a70b-153605f75ef3/artifact/b1c556fe-33b1-4158-85b0-cdfaefb4b52e?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_" },
  { label: "การฟังอย่างเป็นระบบ", href: "https://notebook.google.com/notebook/c3e570a3-8e7c-4be2-a70b-153605f75ef3/artifact/5d5feb7f-b296-4457-9479-c772391de4df?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_" },
];

function renderWeekResourceLinks(weekNumber) {
  if (weekNumber !== 1) return "";
  return `
    <div class="lesson-resource-links" aria-label="แหล่งเรียนรู้สำหรับสัปดาห์ที่ 1">
      <p class="lesson-resource-label">แหล่งเรียนรู้สำหรับสัปดาห์ที่ 1</p>
      <div class="lesson-resource-actions">
        ${WEEK_ONE_RESOURCES.map((resource) => `
          <a class="button lesson-resource-link" href="${escapeHtml(resource.href)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(resource.label)} <span aria-hidden="true">↗</span>
          </a>`).join("")}
      </div>
    </div>`;
}

/* ——— Cursor ——— */
function initCursor() {
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;
  document.documentElement.classList.add("has-cursor-glow");
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let rx = x;
  let ry = y;
  let hovering = false;
  window.addEventListener(
    "pointermove",
    (e) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target;
      hovering = Boolean(
        t?.closest?.("a, button, .work-row, .module-card, .filter-pill, .button, .discover, .nav-link"),
      );
      document.documentElement.classList.toggle("cursor-hovering", hovering);
    },
    { passive: true },
  );
  const loop = () => {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${hovering ? 1.55 : 1})`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ——— Hero cooling canvas ——— */
function initHeroCooling() {
  const canvas = document.getElementById("hero-cooling");
  if (!canvas) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let w = 0;
  let h = 0;
  let dpr = 1;
  const mouse = { x: 0.55, y: 0.4, tx: 0.55, ty: 0.4 };
  const particles = [];

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = parent.clientWidth;
    h = parent.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = reduceMotion ? 18 : Math.floor(Math.min(90, (w * h) / 14000));
    particles.length = 0;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.12 - Math.random() * 0.35,
        a: 0.15 + Math.random() * 0.45,
        hue: Math.random() > 0.55 ? 85 : 188,
      });
    }
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      mouse.ty = (e.clientY - rect.top) / Math.max(rect.height, 1);
    },
    { passive: true },
  );
  window.addEventListener("resize", resize);

  const draw = () => {
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;
    ctx.clearRect(0, 0, w, h);
    const gx = mouse.x * w;
    const gy = mouse.y * h;
    const wash = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.55);
    wash.addColorStop(0, "rgba(198, 221, 120, 0.14)");
    wash.addColorStop(0.35, "rgba(80, 160, 170, 0.08)");
    wash.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, w, h);
    for (const p of particles) {
      if (!reduceMotion) {
        p.x += p.vx + (mouse.x - 0.5) * 0.15;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
      }
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      if (p.hue > 120) {
        g.addColorStop(0, `rgba(140, 210, 215, ${p.a})`);
        g.addColorStop(1, "rgba(140, 210, 215, 0)");
      } else {
        g.addColorStop(0, `rgba(220, 200, 110, ${p.a})`);
        g.addColorStop(1, "rgba(220, 200, 110, 0)");
      }
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  resize();
  draw();
}

/* ——— App ——— */
async function main() {
  const { courseMeta, weeks, modules } = await loadCourseData();

  document.getElementById("hero-eyebrow").textContent = `${courseMeta.name} · ${courseMeta.section}`;
  document.getElementById("hero-lede").textContent = courseMeta.subtitle;
  document.getElementById("chip-span").textContent = courseMeta.span;
  document.getElementById("chip-thread").textContent = courseMeta.thread;
  document.getElementById("chip-faculty").textContent = courseMeta.faculty;
  document.getElementById("nav-term").textContent = courseMeta.term;
  document.getElementById("cta-eyebrow").textContent = `${courseMeta.code} · ${courseMeta.term}`;
  document.getElementById("cta-meta").innerHTML = `${escapeHtml(courseMeta.name)}<br />${escapeHtml(courseMeta.section)}<br />${escapeHtml(courseMeta.faculty)}`;
  document.title = `${courseMeta.name} · ${courseMeta.code} · Yos Vaneesorn`;

  // Modules
  const moduleGrid = document.getElementById("module-grid");
  moduleGrid.innerHTML = modules
    .map((mod) => {
      const isCapstone = mod.href.includes("/15") || mod.id === "03";
      return `<button type="button" class="module-card" data-module="${mod.id}" data-capstone="${isCapstone ? "1" : "0"}">
        <span class="num">${mod.id}</span>
        <h3>${escapeHtml(mod.title)}</h3>
        <p>${escapeHtml(mod.body)}</p>
        <span class="discover">${isCapstone ? "เปิดบทเรียน" : "discover more"} <span aria-hidden="true">→</span></span>
      </button>`;
    })
    .join("");

  moduleGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".module-card");
    if (!btn) return;
    if (btn.dataset.capstone === "1") openWeek(15);
    else document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
  });

  // Filters
  const filters = [
    { id: "all", label: "ทั้งหมด" },
    { id: "foundation", label: "Foundation · 1–8" },
    { id: "selected", label: "Specialist · 9–14" },
    { id: "summary", label: "Capstone · 15" },
  ];
  let filter = "all";
  let query = "";
  const filtersEl = document.getElementById("filters");
  const workList = document.getElementById("work-list");
  const empty = document.getElementById("empty");

  function renderFilters() {
    filtersEl.innerHTML = filters
      .map(
        (f) =>
          `<button type="button" class="filter-pill${filter === f.id ? " is-active" : ""}" data-filter="${f.id}" aria-pressed="${filter === f.id}">${f.label}</button>`,
      )
      .join("");
  }

  function renderWeeks() {
    const q = query.trim().toLowerCase();
    const visible = weeks.filter((week) => {
      const matchesFilter = filter === "all" || week.category === filter;
      const hay = [week.topic, week.title, week.description, week.activity, week.expertise, ...(week.reading || []), ...(week.cards || [])]
        .join(" ")
        .toLowerCase();
      return matchesFilter && (!q || hay.includes(q));
    });
    empty.hidden = visible.length > 0;
    workList.innerHTML = visible
      .map(
        (week) => `<li>
        <button type="button" class="work-row" data-open-week="${week.week}" aria-label="เปิดบทเรียนสัปดาห์ที่ ${week.week}: ${escapeHtml(week.title)}">
          <span class="work-index">${String(week.week).padStart(2, "0")}</span>
          <div class="work-body">
            <div class="work-meta">
              <span class="tag">${categoryLabel(week.category)}</span>
              <span>${escapeHtml(week.expertise)}</span>
              <span>${escapeHtml((week.cards || []).join(" · "))}</span>
            </div>
            <h3>${escapeHtml(week.title)}</h3>
            <p>${escapeHtml(week.description)}</p>
          </div>
          <div class="work-side">
            <span class="work-date">${formatDate(week.date)}</span>
            <span class="discover">เปิดบทเรียน <span aria-hidden="true">→</span></span>
          </div>
        </button>
      </li>`,
      )
      .join("");
  }

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filter = btn.dataset.filter;
    renderFilters();
    renderWeeks();
  });
  document.getElementById("search").addEventListener("input", (e) => {
    query = e.target.value;
    renderWeeks();
  });

  renderFilters();
  renderWeeks();

  // Nav scroll + menu
  const topbar = document.getElementById("topbar");
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");
  window.addEventListener(
    "scroll",
    () => topbar.classList.toggle("topbar-scrolled", window.scrollY > 24),
    { passive: true },
  );
  navToggle.addEventListener("click", () => {
    const open = !primaryNav.classList.contains("is-open");
    primaryNav.classList.toggle("is-open", open);
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Lesson viewer
  const lessonRoot = document.getElementById("lesson-root");
  let activeWeek = null;

  async function openWeek(n) {
    const week = weeks.find((w) => w.week === n);
    if (!week) return;
    activeWeek = n;
    primaryNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    lessonRoot.innerHTML = `
      <div class="lesson-viewer" role="dialog" aria-modal="true" aria-labelledby="lesson-viewer-title">
        <div class="lesson-viewer-backdrop" data-close></div>
        <div class="lesson-viewer-panel">
          <header class="lesson-viewer-bar">
            <button type="button" class="lesson-viewer-close" data-close>← กลับกำหนดการ</button>
            <div class="lesson-viewer-bar-meta">
              <span>WEEK ${String(week.week).padStart(2, "0")} · ${escapeHtml(week.displayDate || formatDate(week.date))}</span>
            </div>
          </header>
          <div class="lesson-viewer-hero">
            <p class="eyebrow">${escapeHtml(week.expertise)}</p>
            <h1 id="lesson-viewer-title">${escapeHtml(week.title)}</h1>
            <p>${escapeHtml(week.description)}</p>
            <div class="lesson-viewer-chips">
              <span>${escapeHtml((week.cards || []).join(" · "))}</span>
              <span>${escapeHtml((week.clo || []).join(" · "))}</span>
              <span>${escapeHtml(week.activity)}</span>
            </div>
            ${renderWeekResourceLinks(week.week)}
          </div>
          <div class="lesson-viewer-body">
            <p class="lesson-viewer-status">กำลังโหลดบทเรียน…</p>
          </div>
          <footer class="lesson-viewer-footer">
            <button type="button" class="button button-ghost" data-nav="${week.week - 1}" ${week.week <= 1 ? "disabled" : ""}>← สัปดาห์ก่อน</button>
            <span>${week.week} / 15</span>
            <button type="button" class="button button-primary" data-nav="${week.week + 1}" ${week.week >= 15 ? "disabled" : ""}>สัปดาห์ถัดไป →</button>
          </footer>
        </div>
      </div>`;
    document.body.style.overflow = "hidden";
    const url = new URL(window.location.href);
    url.searchParams.set("week", String(week.week));
    history.pushState({ week: week.week }, "", url);

    const body = lessonRoot.querySelector(".lesson-viewer-body");
    try {
      const res = await fetch(weekMarkdownUrl(week.week));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const md = await res.text();
      body.innerHTML = `<article class="lesson-markdown">${renderMarkdown(md)}</article>`;
    } catch (err) {
      body.innerHTML = `<div class="lesson-viewer-status lesson-viewer-error"><p>เปิดบทเรียนไม่สำเร็จ</p><p>${escapeHtml(err.message)}</p></div>`;
    }
  }

  function closeWeek() {
    activeWeek = null;
    lessonRoot.innerHTML = "";
    document.body.style.overflow = "";
    const url = new URL(window.location.href);
    url.searchParams.delete("week");
    history.pushState({}, "", url.pathname + url.search + url.hash);
  }

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-week]");
    if (openBtn) {
      e.preventDefault();
      openWeek(Number(openBtn.dataset.openWeek));
      return;
    }
    if (e.target.closest("[data-close]")) {
      closeWeek();
      return;
    }
    const nav = e.target.closest("[data-nav]");
    if (nav && !nav.disabled) {
      const n = Number(nav.dataset.nav);
      if (n >= 1 && n <= 15) openWeek(n);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (!activeWeek) return;
    if (e.key === "Escape") closeWeek();
    if (e.key === "ArrowRight" && activeWeek < 15) openWeek(activeWeek + 1);
    if (e.key === "ArrowLeft" && activeWeek > 1) openWeek(activeWeek - 1);
  });

  window.addEventListener("popstate", () => {
    const n = Number(new URLSearchParams(location.search).get("week"));
    if (n >= 1 && n <= 15) openWeek(n);
    else closeWeek();
  });

  const initial = Number(new URLSearchParams(location.search).get("week"));
  if (initial >= 1 && initial <= 15) openWeek(initial);

  initCursor();
  initHeroCooling();
}

main().catch((err) => {
  console.error(err);
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<p style="padding:2rem;color:#c44;font-family:sans-serif">Failed to load Wind Pedagogy: ${escapeHtml(err.message)}</p>`,
  );
});
