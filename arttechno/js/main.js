/**
 * Shared UI: nav, progress (localStorage), dashboard, week render, copy helpers
 * Storage key versioned — v2 validates keys 1–15 only
 */
(function () {
  const STORAGE_KEY = "arttechno-week-done-v2";
  const TOTAL_WEEKS = 15;
  const TYPE_LABELS = {
    normal: "คาบปกติ",
    build: "สร้างโครงงาน",
    assessment: "ประเมินผล",
  };
  const STATUS_LABELS = {
    primary: "ชุดหลัก",
    optional: "ทางเลือก",
    uncertain: "โควตาไม่แน่นอน",
  };

  /* ── escape ─────────────────────────────────────────── */
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ── progress storage ────────────────────────────────── */
  function getDone() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const clean = {};
      Object.keys(raw).forEach((k) => {
        const n = Number(k);
        if (Number.isInteger(n) && n >= 1 && n <= TOTAL_WEEKS && raw[k]) {
          clean[n] = true;
        }
      });
      return clean;
    } catch {
      return {};
    }
  }

  function setDone(map) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
      /* quota / private mode */
    }
  }

  function markDone(n, done) {
    const map = getDone();
    if (done) map[n] = true;
    else delete map[n];
    setDone(map);
    updateProgressUI();
  }

  function isDone(n) {
    return !!getDone()[n];
  }

  function doneCount() {
    return Object.keys(getDone()).length;
  }

  function clearProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    updateProgressUI();
  }

  function updateProgressUI() {
    const total = TOTAL_WEEKS;
    const n = doneCount();
    const pct = Math.round((n / total) * 100);
    document.querySelectorAll("[data-progress]").forEach((el) => {
      el.setAttribute("role", "progressbar");
      el.setAttribute("aria-valuemin", "0");
      el.setAttribute("aria-valuemax", String(total));
      el.setAttribute("aria-valuenow", String(n));
      el.setAttribute(
        "aria-label",
        `ความคืบหน้าส่วนตัว ${n} จาก ${total} สัปดาห์ — ไม่ใช่คะแนน`
      );
    });
    document.querySelectorAll("[data-progress-bar]").forEach((el) => {
      el.style.width = pct + "%";
    });
    document.querySelectorAll("[data-progress-label]").forEach((el) => {
      el.textContent = `ความคืบหน้าส่วนตัว: ${n}/${total} สัปดาห์ (${pct}%) — เก็บบนเบราว์เซอร์นี้ ไม่ใช่คะแนน`;
    });
    document.querySelectorAll(".week-card[data-week]").forEach((card) => {
      const w = Number(card.getAttribute("data-week"));
      const done = isDone(w);
      card.classList.toggle("done", done);
      const statusEl = card.querySelector(".week-status");
      if (statusEl) {
        statusEl.textContent = done ? "ทำเครื่องหมายแล้ว" : "ยังไม่ทำเครื่องหมาย";
      }
    });
    document.querySelectorAll("[data-done-toggle]").forEach((cb) => {
      const wn = Number(cb.getAttribute("data-done-toggle") || cb.closest("[data-week-page]")?.getAttribute("data-week-page"));
      if (wn) cb.checked = isDone(wn);
    });
  }

  /* ── nav ─────────────────────────────────────────────── */
  function initNav() {
    const btn = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    let lastFocus = null;

    function closeMenu() {
      if (!nav || !btn) return;
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      if (!nav || !btn) return;
      lastFocus = document.activeElement;
      nav.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }

    if (btn && nav) {
      btn.addEventListener("click", () => {
        const open = !nav.classList.contains("is-open");
        if (open) openMenu();
        else {
          closeMenu();
          if (lastFocus) lastFocus.focus();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
          closeMenu();
          btn.focus();
        }
      });

      nav.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          closeMenu();
        });
      });
    }

    /* Exactly one aria-current from body data-page */
    const page = document.body.getAttribute("data-page") || "";
    document.querySelectorAll(".nav a[data-nav]").forEach((a) => {
      a.removeAttribute("aria-current");
      if (page && a.getAttribute("data-nav") === page) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ── helpers ─────────────────────────────────────────── */
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function weekUrl(n, fromWeeksDir) {
    const file = "week-" + pad(n) + ".html";
    return fromWeeksDir ? file : "weeks/" + file;
  }

  function typeLabel(type) {
    return TYPE_LABELS[type] || TYPE_LABELS.normal;
  }

  function extLinkAttrs(url) {
    if (url && String(url).startsWith("http")) {
      return ' target="_blank" rel="noopener noreferrer"';
    }
    return "";
  }

  function extCue(url) {
    if (url && String(url).startsWith("http")) {
      return ' <span class="ext-cue" aria-hidden="true">↗</span><span class="visually-hidden"> (เปิดแท็บใหม่)</span>';
    }
    return "";
  }

  function toolBadgesHtml(tools) {
    if (!tools || !tools.length) return "";
    return (
      `<span class="tag-row tool-badges">` +
      tools
        .map((t) => `<span class="tag tool-tag">${escapeHtml(t)}</span>`)
        .join("") +
      `</span>`
    );
  }

  /* ── copyText ────────────────────────────────────────── */
  function ensureLiveRegion() {
    let live = document.getElementById("copy-live");
    if (!live) {
      live = document.createElement("div");
      live.id = "copy-live";
      live.className = "visually-hidden";
      live.setAttribute("aria-live", "polite");
      live.setAttribute("aria-atomic", "true");
      document.body.appendChild(live);
    }
    return live;
  }

  function copyText(text, button) {
    const live = ensureLiveRegion();
    const original = button ? button.textContent : "";

    function success() {
      live.textContent = "คัดลอกแล้ว";
      if (button) {
        button.textContent = "คัดลอกแล้ว";
        button.classList.add("copied");
        setTimeout(() => {
          button.textContent = original;
          button.classList.remove("copied");
        }, 2000);
      }
    }

    function fail() {
      live.textContent = "คัดลอกไม่สำเร็จ — ลองเลือกข้อความเอง";
      if (button) {
        button.textContent = "คัดลอกไม่สำเร็จ";
        setTimeout(() => {
          button.textContent = original;
        }, 2000);
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(success).catch(() => {
        fallbackCopy(text, success, fail);
      });
    } else {
      fallbackCopy(text, success, fail);
    }
  }

  function fallbackCopy(text, success, fail) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) success();
      else fail();
    } catch {
      fail();
    }
  }

  /* ── dashboard (home) ────────────────────────────────── */
  function renderDashboard() {
    const root = document.querySelector("[data-dashboard]");
    if (!root || !window.COURSE) return;

    const meta = COURSE.meta;
    const weeks = COURSE.weeks;
    const cw = Number(meta.currentWeek) || 0;
    const fromWeeksDir = false;

    /* Notice */
    const noticeEl = document.querySelector("[data-notice]");
    if (noticeEl) {
      if (meta.notice && String(meta.notice).trim()) {
        noticeEl.hidden = false;
        noticeEl.innerHTML = `<strong>ประกาศ</strong> ${escapeHtml(meta.notice)}`;
      } else {
        noticeEl.hidden = true;
        noticeEl.innerHTML = "";
      }
    }

    const current = weeks.find((w) => w.n === cw);
    const next = weeks.find((w) => w.n === (cw === 0 ? 1 : cw + 1));
    const w8 = weeks.find((w) => w.n === 8);
    const w15 = weeks.find((w) => w.n === 15);

    let nowCard = "";
    if (cw === 0 || !current) {
      nowCard = `
        <article class="dash-card dash-now">
          <p class="kicker">ตอนนี้</p>
          <h2>ก่อนเปิดภาคเรียน</h2>
          <p class="meta">ยังไม่เริ่มสัปดาห์เรียน — เตรียมบัญชี free tier หูฟัง และโฟลเดอร์ Drive ได้ล่วงหน้า</p>
          <p>สัปดาห์แรก (เป้า ${escapeHtml(weeks[0] ? weeks[0].date : "")}): ${escapeHtml(weeks[0] ? weeks[0].title : "")}</p>
          <div class="btn-row">
            <a class="btn btn-primary" href="${weekUrl(1, fromWeeksDir)}">ดูสัปดาห์ที่ 1</a>
            <a class="btn btn-ghost" href="about.html">เกี่ยวกับรายวิชา</a>
          </div>
        </article>`;
    } else {
      nowCard = `
        <article class="dash-card dash-now">
          <p class="kicker">ตอนนี้ · สัปดาห์ ${current.n}</p>
          <h2>${escapeHtml(current.title)}</h2>
          <p class="meta">${escapeHtml(current.date)} · ${escapeHtml(typeLabel(current.type))}</p>
          <p><strong>งานส่ง:</strong> ${escapeHtml(current.deliverable)}</p>
          ${toolBadgesHtml(current.tools)}
          <div class="btn-row">
            <a class="btn btn-primary" href="${weekUrl(current.n, fromWeeksDir)}">เปิดสัปดาห์นี้</a>
          </div>
        </article>`;
    }

    let nextCard = "";
    if (next && next.n <= TOTAL_WEEKS && (cw === 0 || next.n > cw)) {
      nextCard = `
        <article class="dash-card">
          <p class="kicker">ถัดไป</p>
          <h2>สัปดาห์ ${next.n}</h2>
          <p class="meta">${escapeHtml(next.date)}</p>
          <p>${escapeHtml(next.title)}</p>
          <a class="btn btn-ghost" href="${weekUrl(next.n, fromWeeksDir)}">ดูรายละเอียด</a>
        </article>`;
    } else if (cw >= TOTAL_WEEKS) {
      nextCard = `
        <article class="dash-card">
          <p class="kicker">ถัดไป</p>
          <h2>จบภาคเรียน</h2>
          <p>เก็บชุด prompt และเครื่องมือ HTML ที่ใช้ได้จริงไว้หลังเทอม</p>
        </article>`;
    }

    const mid = COURSE.midProject || {};
    const fin = COURSE.finalProject || {};

    const milestones = `
      <article class="dash-card dash-milestone">
        <p class="kicker">หมุดหมายสำคัญ</p>
        <ul class="milestone-list">
          <li>
            <a href="${weekUrl(8, fromWeeksDir)}">
              <strong>สัปดาห์ 8</strong> — ${escapeHtml(w8 ? w8.title : "กลางภาค")}
            </a>
            <span class="meta">${escapeHtml(mid.weight || "25%")} · นำเสนอ ${escapeHtml(mid.presentation || "5–7 นาที")} · ${escapeHtml(w8 ? w8.date : "")}</span>
          </li>
          <li>
            <a href="${weekUrl(15, fromWeeksDir)}">
              <strong>สัปดาห์ 15</strong> — ${escapeHtml(w15 ? w15.title : "ปลายภาค")}
            </a>
            <span class="meta">${escapeHtml(fin.weight || "35%")} · นำเสนอ ${escapeHtml(fin.presentation || "8–10 นาที")} · ${escapeHtml(w15 ? w15.date : "")}</span>
          </li>
        </ul>
        <a class="btn btn-ghost" href="projects.html">ภาพรวมโครงงาน</a>
      </article>`;

    const arc = (COURSE.semesterArc || [])
      .map(
        (a) => `
      <div class="arc-step">
        <span class="arc-label">${escapeHtml(a.label)}</span>
        <span class="arc-weeks">ส.${escapeHtml(a.weeks)}</span>
        <span class="arc-desc">${escapeHtml(a.desc)}</span>
      </div>`
      )
      .join("");

    root.innerHTML = `
      <div class="dash-grid">
        ${nowCard}
        ${nextCard}
        ${milestones}
      </div>
      <section class="semester-arc" aria-label="โครงภาคเรียน">
        <h2>โครงภาคเรียน</h2>
        <div class="arc-track">${arc}</div>
      </section>
      <section class="progress-panel" data-progress>
        <h2>ความคืบหน้าส่วนตัว</h2>
        <p class="meta" data-progress-label>ความคืบหน้าส่วนตัว: 0/15 สัปดาห์</p>
        <div class="progress-bar"><span data-progress-bar></span></div>
        <p class="meta">ทำเครื่องหมายสัปดาห์ที่ผ่านแล้วในเบราว์เซอร์นี้เท่านั้น — <strong>ไม่ใช่การส่งงานหรือคะแนน</strong></p>
        <button type="button" class="btn btn-ghost btn-danger-ghost" data-clear-progress>ล้างความคืบหน้าในเครื่องนี้</button>
      </section>
      <p class="meta date-status">${escapeHtml(meta.dateStatus || "")}</p>
    `;

    const clearBtn = root.querySelector("[data-clear-progress]");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (
          confirm(
            "ล้างเครื่องหมายความคืบหน้าทั้งหมดบนเบราว์เซอร์นี้?\n(ไม่กระทบคะแนนหรืองานที่ส่งจริง)"
          )
        ) {
          clearProgress();
        }
      });
    }
  }

  /* ── week list with filters ──────────────────────────── */
  function renderWeekList(container) {
    if (!container || !window.COURSE) return;

    const filterRoot = document.querySelector("[data-week-filters]");
    let typeFilter = "all";
    let toolFilters = new Set();

    const TOOL_FILTERS = [
      "Gemini",
      "Claude",
      "GPT",
      "Grok",
      "NotebookLM",
      "MuseScore",
      "Suno",
      "IMSLP",
      "HTML tool",
    ];
    const homeworkFormUrl = COURSE.meta && COURSE.meta.homeworkFormUrl;

    function matches(w) {
      if (typeFilter !== "all" && w.type !== typeFilter) return false;
      if (toolFilters.size > 0) {
        const wt = w.tools || [];
        let any = false;
        toolFilters.forEach((t) => {
          if (wt.indexOf(t) !== -1) any = true;
        });
        if (!any) return false;
      }
      return true;
    }

    function renderCards() {
      const filtered = COURSE.weeks.filter(matches);
      const countEl = document.querySelector("[data-filter-count]");
      if (countEl) {
        countEl.textContent = `แสดง ${filtered.length} จาก ${COURSE.weeks.length} สัปดาห์`;
      }

      if (!filtered.length) {
        container.innerHTML = `<p class="meta" role="status">ไม่พบสัปดาห์ที่ตรงตัวกรอง — ลองรีเซ็ตตัวกรอง</p>`;
        return;
      }

      container.innerHTML = filtered
        .map((w) => {
          const cls = ["week-card"];
          if (w.milestone) cls.push("milestone");
          if (w.type) cls.push("type-" + w.type);
          if (isDone(w.n)) cls.push("done");
          const disc =
            w.graded
              ? `<span class="badge badge-disclosure" title="งานที่คิดคะแนนต้องมี disclosure">ต้องเปิดเผย AI</span>`
              : "";
          const typeBadge = `<span class="badge badge-type badge-${escapeHtml(w.type || "normal")}">${escapeHtml(typeLabel(w.type))}</span>`;
          const deliv = escapeHtml(w.deliverable || "");
          const delivShort =
            deliv.length > 90 ? deliv.slice(0, 87) + "…" : deliv;
          return `<div class="week-card-wrap">
          <a class="${cls.join(" ")}" data-week="${w.n}" href="${weekUrl(w.n, true)}">
            <span class="num">สัปดาห์ ${w.n}${w.milestone ? " · สำคัญ" : ""}</span>
            <span class="date">${escapeHtml(w.date)}</span>
            <h3>${escapeHtml(w.title)}</h3>
            <span class="badge-row">${typeBadge}${disc}</span>
            <p class="week-deliv">${delivShort}</p>
            ${toolBadgesHtml(w.tools)}
            <span class="week-status">${isDone(w.n) ? "ทำเครื่องหมายแล้ว" : "ยังไม่ทำเครื่องหมาย"}</span>
          </a>
          ${
            homeworkFormUrl
              ? `<a class="week-submit" href="${escapeHtml(homeworkFormUrl)}"${extLinkAttrs(homeworkFormUrl)} aria-label="ส่งการบ้านสัปดาห์ที่ ${w.n}">ส่งการบ้าน <span aria-hidden="true">↗</span></a>`
              : ""
          }
          </div>`;
        })
        .join("");
    }

    if (filterRoot && !filterRoot.dataset.wired) {
      filterRoot.dataset.wired = "1";
      filterRoot.innerHTML = `
        <div class="filter-group" role="group" aria-label="ประเภทสัปดาห์">
          <span class="filter-label">ประเภท</span>
          <button type="button" class="filter-chip" data-type="all" aria-pressed="true">ทั้งหมด</button>
          <button type="button" class="filter-chip" data-type="normal" aria-pressed="false">คาบปกติ</button>
          <button type="button" class="filter-chip" data-type="build" aria-pressed="false">สร้างโครงงาน</button>
          <button type="button" class="filter-chip" data-type="assessment" aria-pressed="false">ประเมินผล</button>
        </div>
        <div class="filter-group" role="group" aria-label="เครื่องมือ (เลือกได้หลายอัน — ตรงอย่างน้อยหนึ่ง)">
          <span class="filter-label">เครื่องมือ</span>
          ${TOOL_FILTERS.map(
            (t) =>
              `<button type="button" class="filter-chip" data-tool="${escapeHtml(t)}" aria-pressed="false">${escapeHtml(t)}</button>`
          ).join("")}
        </div>
        <div class="filter-actions">
          <p class="meta filter-count" data-filter-count role="status"></p>
          <button type="button" class="btn btn-ghost" data-filter-reset>รีเซ็ตตัวกรอง</button>
        </div>
      `;

      filterRoot.querySelectorAll("[data-type]").forEach((btn) => {
        btn.addEventListener("click", () => {
          typeFilter = btn.getAttribute("data-type");
          filterRoot.querySelectorAll("[data-type]").forEach((b) => {
            b.setAttribute(
              "aria-pressed",
              b === btn ? "true" : "false"
            );
          });
          renderCards();
        });
      });

      filterRoot.querySelectorAll("[data-tool]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const t = btn.getAttribute("data-tool");
          const pressed = btn.getAttribute("aria-pressed") === "true";
          if (pressed) {
            toolFilters.delete(t);
            btn.setAttribute("aria-pressed", "false");
          } else {
            toolFilters.add(t);
            btn.setAttribute("aria-pressed", "true");
          }
          renderCards();
        });
      });

      const reset = filterRoot.querySelector("[data-filter-reset]");
      if (reset) {
        reset.addEventListener("click", () => {
          typeFilter = "all";
          toolFilters = new Set();
          filterRoot.querySelectorAll("[data-type]").forEach((b) => {
            b.setAttribute(
              "aria-pressed",
              b.getAttribute("data-type") === "all" ? "true" : "false"
            );
          });
          filterRoot.querySelectorAll("[data-tool]").forEach((b) => {
            b.setAttribute("aria-pressed", "false");
          });
          renderCards();
          reset.focus();
        });
      }
    }

    renderCards();
  }

  /* ── week detail page ────────────────────────────────── */
  function renderWeekPage() {
    const root = document.querySelector("[data-week-page]");
    if (!root || !window.COURSE) return;
    const n = Number(root.getAttribute("data-week-page"));
    const w = COURSE.weeks.find((x) => x.n === n);
    if (!w) {
      root.innerHTML = "<p>ไม่พบสัปดาห์นี้</p>";
      return;
    }

    const res = (w.resources || [])
      .map((r) => {
        const isHttp = r.url && r.url.startsWith("http");
        const href = isHttp
          ? r.url
          : r.url.startsWith("projects")
            ? "../" + r.url
            : "../" + r.url;
        return `<li><a href="${escapeHtml(href)}"${extLinkAttrs(r.url)}>${escapeHtml(r.title)}${extCue(r.url)}</a></li>`;
      })
      .join("");

    const goals = w.goals.map((g) => `<li>${escapeHtml(g)}</li>`).join("");
    const lab = w.lab.map((g) => `<li>${escapeHtml(g)}</li>`).join("");
    const tips = (w.tips || []).map((g) => `<li>${escapeHtml(g)}</li>`).join("");
    const chapterTemplate =
      n === 1 || n === 2
        ? document.querySelector(`#week-${pad(n)}-chapter-content`)
        : null;
    const chapterContent = chapterTemplate ? chapterTemplate.innerHTML.trim() : "";

    const promptBlock = w.samplePrompt
      ? `<section class="prompt-section">
           <h2>ตัวอย่าง prompt (ภาษาอังกฤษ — นำไปวางได้)</h2>
           <p class="meta">แก้ข้อความในวงเล็บเหลี่ยมให้เป็นของตนเอง แล้ววางใน Gemini / Claude</p>
           <div class="prompt-toolbar">
             <button type="button" class="btn btn-primary" data-copy-prompt>คัดลอก prompt</button>
           </div>
           <pre class="prompt-box" data-prompt-text>${escapeHtml(w.samplePrompt)}</pre>
         </section>`
      : "";

    const prev = n > 1 ? weekUrl(n - 1, true) : null;
    const next = n < COURSE.weeks.length ? weekUrl(n + 1, true) : null;

    const milestoneBox =
      w.milestone
        ? `<div class="callout callout-milestone">
             <strong>หมุดหมาย · ${escapeHtml(w.milestoneLabel || w.title)}</strong>
             ${
               n === 8
                 ? `น้ำหนัก ${escapeHtml((COURSE.midProject && COURSE.midProject.weight) || "25%")} · นำเสนอ ${escapeHtml((COURSE.midProject && COURSE.midProject.presentation) || "5–7 นาที")} · <a href="../projects.html#mid">รายละเอียดโครงงานกลางภาค</a>`
                 : n === 15
                   ? `น้ำหนัก ${escapeHtml((COURSE.finalProject && COURSE.finalProject.weight) || "35%")} · นำเสนอ ${escapeHtml((COURSE.finalProject && COURSE.finalProject.presentation) || "8–10 นาที")} · <a href="../projects.html#final">รายละเอียดโครงงานปลายภาค</a>`
                   : ""
             }
           </div>`
        : "";

    const homeworkTime =
      w.homework && w.homework !== "—"
        ? "ประมาณ 10–15 นาที"
        : "—";
    const homeworkFormUrl = COURSE.meta && COURSE.meta.homeworkFormUrl;
    const homeworkSubmit = homeworkFormUrl
      ? `<div class="homework-submit">
           <a class="btn btn-submit" href="${escapeHtml(homeworkFormUrl)}"${extLinkAttrs(homeworkFormUrl)} aria-label="ส่งการบ้านสัปดาห์ที่ ${w.n}">ส่งการบ้าน · สัปดาห์ ${w.n} <span aria-hidden="true">↗</span></a>
           <p class="meta">ใช้แบบฟอร์มเดียวของรายวิชา แล้วเลือกสัปดาห์ที่ ${w.n} ในฟอร์ม</p>
         </div>`
      : "";

    root.innerHTML = `
      <nav class="breadcrumb" aria-label="เส้นทาง">
        <a href="index.html">15 สัปดาห์</a>
        <span aria-hidden="true">→</span>
        <span>สัปดาห์ ${w.n}</span>
      </nav>

      <p class="kicker">สัปดาห์ที่ ${w.n}${w.milestone ? " · ไมล์สโตน" : ""} · ${escapeHtml(typeLabel(w.type))}</p>
      <h1>${escapeHtml(w.title)}</h1>
      <p class="meta">วันเป้า: ${escapeHtml(w.date)} · ${escapeHtml(COURSE.meta.dateStatus || "")}</p>
      ${toolBadgesHtml(w.tools)}
      ${milestoneBox}

      <section class="action-panel" aria-labelledby="action-panel-title">
        <h2 id="action-panel-title">งานสัปดาห์นี้</h2>
        <dl class="action-dl">
          <div><dt>งานส่ง</dt><dd>${escapeHtml(w.deliverable)}</dd></div>
          <div><dt>เปิดเผย AI</dt><dd>${w.graded ? 'บังคับ — <a href="../ethics.html">แม่แบบ disclosure</a>' : "—"}</dd></div>
          <div><dt>งานบ้านย่อย</dt><dd>${escapeHtml(homeworkTime)}</dd></div>
        </dl>
        <label class="done-toggle">
          <input type="checkbox" data-done-toggle="${w.n}" ${isDone(n) ? "checked" : ""} />
          ทำเครื่องหมายว่าฉันผ่านสัปดาห์นี้แล้ว (บันทึกในเบราว์เซอร์นี้เท่านั้น — ไม่ใช่คะแนน)
        </label>
        ${homeworkSubmit}
      </section>

      ${
        chapterContent
          ? `<section class="chapter-content" aria-label="เอกสารประกอบการเรียนบทที่ ${n}">
               <p class="chapter-kicker">เอกสารอ่านเอง · เนื้อหาประจำสัปดาห์</p>
               ${chapterContent}
             </section>`
          : `
      <h2>เป้าหมาย</h2>
      <ul>${goals}</ul>

      <h2>ในแล็บ</h2>
      <ul class="check-list">${lab}</ul>

      <h2>งานบ้านย่อย (10–15 นาที)</h2>
      <p>${escapeHtml(w.homework)}</p>

      ${promptBlock}

      <h2>ลิงก์และแหล่งที่เกี่ยวข้อง</h2>
      <ul class="link-list">${res || "<li>ดูหน้า แหล่งเรียนรู้</li>"}</ul>

      ${tips ? `<h2>เคล็ดลับ</h2><ul>${tips}</ul>` : ""}
      `
      }

      <div class="week-nav">
        ${prev ? `<a class="btn btn-ghost" href="${prev}">← สัปดาห์ก่อน</a>` : `<span></span>`}
        <a class="btn btn-ghost" href="index.html">รายการทั้ง 15 สัปดาห์</a>
        ${next ? `<a class="btn btn-primary" href="${next}">สัปดาห์ถัดไป →</a>` : `<span></span>`}
      </div>
    `;

    const cb = root.querySelector("[data-done-toggle]");
    if (cb) {
      cb.addEventListener("change", () => markDone(n, cb.checked));
    }

    const copyBtn = root.querySelector("[data-copy-prompt]");
    if (copyBtn && w.samplePrompt) {
      copyBtn.addEventListener("click", () => copyText(w.samplePrompt, copyBtn));
    }

    root.querySelectorAll("[data-copy-card]").forEach((button) => {
      const card = button.closest(".copy-card");
      const source = card && card.querySelector("[data-copy-source]");
      if (!source) return;
      button.addEventListener("click", () => copyText(source.textContent.trim(), button));
    });
  }

  /* ── ethics page ─────────────────────────────────────── */
  function renderEthics() {
    const fieldsEl = document.querySelector("[data-disclosure-fields]");
    if (fieldsEl && window.COURSE) {
      fieldsEl.innerHTML = COURSE.disclosureFields
        .map((f) => `<li>${escapeHtml(f)}</li>`)
        .join("");
    }

    const doEl = document.querySelector("[data-ethics-do]");
    const discEl = document.querySelector("[data-ethics-disclose]");
    const dontEl = document.querySelector("[data-ethics-dont]");
    if (doEl && COURSE.ethicsDo) {
      doEl.innerHTML = COURSE.ethicsDo.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
    }
    if (discEl && COURSE.ethicsDisclose) {
      discEl.innerHTML = COURSE.ethicsDisclose.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
    }
    if (dontEl && COURSE.ethicsDont) {
      dontEl.innerHTML = COURSE.ethicsDont.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
    }

    const templateEl = document.querySelector("[data-disclosure-template]");
    if (templateEl && window.COURSE) {
      const fields = COURSE.disclosureFields || [];
      const lines = [
        "บันทึกเปิดเผยการใช้ AI — ศิลปะและเทคโนโลยี (3500230)",
        "ชื่อ: ____________________  รหัส: ____________________  สัปดาห์/งาน: ____________________",
        "",
        ...fields.map((f, i) => `${i + 1}. ${f}\n   _______________________________________________`),
        "",
        "ลงชื่อ: ____________________  วันที่: ____________________",
      ];
      const text = lines.join("\n");
      templateEl.textContent = text;

      const copyBtn = document.querySelector("[data-copy-disclosure]");
      if (copyBtn) {
        copyBtn.addEventListener("click", () => copyText(text, copyBtn));
      }
    }
  }

  /* ── projects page ───────────────────────────────────── */
  function renderProjects() {
    const root = document.querySelector("[data-projects]");
    if (!root || !window.COURSE) return;

    const mid = COURSE.midProject;
    const fin = COURSE.finalProject;
    const assess = COURSE.assessment || [];

    const assessStrip = assess
      .map(
        (a) =>
          `<div class="assess-item"><span class="assess-weight">${escapeHtml(a.weight)}</span><span class="assess-name">${escapeHtml(a.name)}</span><span class="meta">${escapeHtml(a.when)}</span></div>`
      )
      .join("");

    const midDeliv = (mid.deliverables || [])
      .map((d) => `<li>${escapeHtml(d)}</li>`)
      .join("");
    const midSuccess = (mid.success || [])
      .map((d) => `<li>${escapeHtml(d)}</li>`)
      .join("");

    const tracks = (COURSE.finalTracks || [])
      .map((t) => {
        const must = (t.mustSubmit || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");
        const dont = (t.dontForget || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");
        return `
          <article class="card track-card" id="track-${escapeHtml(t.id)}">
            <h3>${escapeHtml(t.name)}</h3>
            <p class="meta">${escapeHtml(t.focus)}</p>
            <h4>เหมาะกับใคร</h4>
            <p>${escapeHtml(t.forWho || "")}</p>
            <h4>ต้องส่งอะไร</h4>
            <ul class="check-list">${must}</ul>
            <h4>สิ่งที่ห้ามลืม</h4>
            <ul>${dont}</ul>
          </article>`;
      })
      .join("");

    const rubric = (fin.rubric || [])
      .map((r, i) => `<li>${escapeHtml(r)}</li>`)
      .join("");

    root.innerHTML = `
      <section class="assess-strip" aria-label="สัดส่วนคะแนน 100%">
        <h2>ภาพรวมการประเมิน · รวม 100%</h2>
        <div class="assess-grid">${assessStrip}</div>
      </section>

      <section id="mid">
        <h2>โครงงานกลางภาค — สัปดาห์ที่ ${escapeHtml(String(mid.week || 8))}</h2>
        <p><span class="tag gold">${escapeHtml(mid.weight || "25%")}</span>
           <span class="tag">เป้า ${escapeHtml(mid.date || "")}</span>
           <span class="tag">นำเสนอ ${escapeHtml(mid.presentation || "")}</span></p>
        <h3>${escapeHtml(mid.title)} <span class="meta">(${escapeHtml(mid.titleEn || "")})</span></h3>
        <p>${escapeHtml(mid.purpose || "")}</p>
        <h3>ชิ้นงานที่ส่ง</h3>
        <ul class="check-list">${midDeliv}</ul>
        <h3>เกณฑ์ความสำเร็จโดยสรุป</h3>
        <ul>${midSuccess}</ul>
        <p><a class="btn btn-primary" href="weeks/week-08.html">เปิดหน้าสัปดาห์ที่ 8 →</a></p>
      </section>

      <section id="final">
        <h2>โครงงานปลายภาค — สัปดาห์ที่ ${escapeHtml(String(fin.week || 15))}</h2>
        <p><span class="tag gold">${escapeHtml(fin.weight || "35%")}</span>
           <span class="tag">เป้า ${escapeHtml(fin.date || "")}</span>
           <span class="tag">นำเสนอ ${escapeHtml(fin.presentation || "")}</span></p>
        <p>${escapeHtml(fin.format || "")}</p>
        <div class="card-grid cols-1 tracks-grid">${tracks}</div>
        <h3>เสาหลักรูบริกร่วม (ทุกเส้นทาง)</h3>
        <ol>${rubric}</ol>
        <div class="callout callout-warn">
          <strong>เส้นทาง ค</strong>
          โครงโน้ต MuseScore เป็นหลัก — ห้ามมีแต่ไฟล์เสียง AI อย่างเดียว · เสียง AI = ร่าง/เดโม ติดป้ายชัด
        </div>
        <div class="callout callout-info">
          <strong>เปิดเผยการใช้ AI</strong>
          ทุกเส้นทางต้องมี disclosure + บันทึกสะท้อนคิด PDF · ดู <a href="ethics.html">หน้าจริยธรรม</a>
        </div>
        <p><a class="btn btn-primary" href="weeks/week-15.html">เปิดหน้าสัปดาห์ที่ 15 →</a></p>
      </section>
    `;
  }

  /* ── tools page ──────────────────────────────────────── */
  function renderTools() {
    const root = document.querySelector("[data-tools]");
    if (!root || !window.COURSE) return;

    const tools = COURSE.tools || [];
    const categories = [];
    tools.forEach((t) => {
      if (t.category && categories.indexOf(t.category) === -1) {
        categories.push(t.category);
      }
    });

    let catFilter = "all";
    let statusFilter = "all";

    function statusLabel(s) {
      return STATUS_LABELS[s] || s;
    }

    function render() {
      const filtered = tools.filter((t) => {
        if (catFilter !== "all" && t.category !== catFilter) return false;
        if (statusFilter !== "all" && t.status !== statusFilter) return false;
        return true;
      });

      const cards = filtered
        .map((t) => {
          const name = t.url
            ? `<a href="${escapeHtml(t.url)}"${extLinkAttrs(t.url)}><strong>${escapeHtml(t.name)}</strong>${extCue(t.url)}</a>`
            : `<strong>${escapeHtml(t.name)}</strong>`;
          const weeks =
            t.weeks && t.weeks.length
              ? `สัปดาห์: ${t.weeks.join(", ")}`
              : "";
          const fb = t.fallback
            ? `<p class="meta"><strong>ทางเลือกเมื่อใช้ไม่ได้:</strong> ${escapeHtml(t.fallback)}</p>`
            : "";
          return `<article class="card tool-card status-${escapeHtml(t.status || "")}">
            <div class="tool-head">
              ${name}
              <span class="badge badge-status badge-${escapeHtml(t.status || "")}">${escapeHtml(statusLabel(t.status))}</span>
              <span class="tag">${escapeHtml(t.category || "")}</span>
            </div>
            <p>${escapeHtml(t.role)}</p>
            ${weeks ? `<p class="meta">${escapeHtml(weeks)}</p>` : ""}
            ${fb}
            <p class="meta">ตรวจโควตาก่อนคาบ</p>
          </article>`;
        })
        .join("");

      const list = root.querySelector("[data-tools-list]");
      if (list) list.innerHTML = cards || `<p class="meta">ไม่พบเครื่องมือที่ตรงตัวกรอง</p>`;
    }

    root.innerHTML = `
      <div class="filter-group" role="group" aria-label="สถานะ">
        <span class="filter-label">สถานะ</span>
        <button type="button" class="filter-chip" data-status="all" aria-pressed="true">ทั้งหมด</button>
        <button type="button" class="filter-chip" data-status="primary" aria-pressed="false">ชุดหลัก</button>
        <button type="button" class="filter-chip" data-status="optional" aria-pressed="false">ทางเลือก</button>
        <button type="button" class="filter-chip" data-status="uncertain" aria-pressed="false">โควตาไม่แน่นอน</button>
      </div>
      <div class="filter-group" role="group" aria-label="หมวด">
        <span class="filter-label">หมวด</span>
        <button type="button" class="filter-chip" data-cat="all" aria-pressed="true">ทั้งหมด</button>
        ${categories
          .map(
            (c) =>
              `<button type="button" class="filter-chip" data-cat="${escapeHtml(c)}" aria-pressed="false">${escapeHtml(c)}</button>`
          )
          .join("")}
      </div>
      <div data-tools-list class="tools-list"></div>
    `;

    root.querySelectorAll("[data-status]").forEach((btn) => {
      btn.addEventListener("click", () => {
        statusFilter = btn.getAttribute("data-status");
        root.querySelectorAll("[data-status]").forEach((b) => {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        render();
      });
    });
    root.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        catFilter = btn.getAttribute("data-cat");
        root.querySelectorAll("[data-cat]").forEach((b) => {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        render();
      });
    });

    render();

    const pattern = document.querySelector("[data-prompt-pattern]");
    if (pattern) pattern.textContent = COURSE.promptPattern || "";
    const drive = document.querySelector("[data-drive-struct]");
    if (drive) drive.textContent = COURSE.driveStructure || "";
  }

  /* ── about page ──────────────────────────────────────── */
  function renderAbout() {
    const root = document.querySelector("[data-about]");
    if (!root || !window.COURSE) return;
    const m = COURSE.meta;

    const lo = COURSE.outcomes
      .map(
        (o) =>
          `<div class="card" style="margin-bottom:0.65rem"><h3 style="margin:0">${escapeHtml(o.id)} · ${escapeHtml(o.title)}</h3><p class="meta" style="margin:0.4rem 0 0">${escapeHtml(o.desc)}</p></div>`
      )
      .join("");

    const assess = COURSE.assessment
      .map(
        (a) =>
          `<tr><td>${escapeHtml(a.name)}</td><td>${escapeHtml(a.weight)}</td><td>${escapeHtml(a.when)}</td></tr>`
      )
      .join("");

    root.innerHTML = `
      <div class="table-wrap">
        <table>
          <tbody>
            <tr><th>รหัสรายวิชา</th><td>${escapeHtml(m.code)}</td></tr>
            <tr><th>รายวิชา</th><td>${escapeHtml(m.title)} (${escapeHtml(m.titleEn)})</td></tr>
            <tr><th>อาจารย์ผู้สอน</th><td>${escapeHtml(m.instructor)}</td></tr>
            <tr><th>สถาบัน</th><td>${escapeHtml(m.institution)}</td></tr>
            <tr><th>ผู้เรียน</th><td>${escapeHtml(m.audience)}</td></tr>
            <tr><th>ภาคการศึกษา</th><td>${escapeHtml(m.semester)}</td></tr>
            <tr><th>ตาราง</th><td>${escapeHtml(m.schedule)}</td></tr>
            <tr><th>ภาษา</th><td>ไทยเชิงวิชาการเป็นหลัก · ชื่อเครื่องมือและ prompt ที่วางใน AI ใช้ภาษาอังกฤษได้</td></tr>
            <tr><th>อัปเดตล่าสุด</th><td>${escapeHtml(m.lastUpdated)} · เวอร์ชัน ${escapeHtml(m.version)}</td></tr>
          </tbody>
        </table>
      </div>

      <h2>ผลการเรียนรู้ (LO)</h2>
      <div>${lo}</div>

      <h2>การประเมินผล (สัดส่วนเริ่มต้น)</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>องค์ประกอบ</th><th>สัดส่วน</th><th>ช่วง</th></tr></thead>
          <tbody>${assess}</tbody>
        </table>
      </div>
      <p class="meta">ปรับได้ตามแม่แบบคณะ — ยืนยันใน syllabus ฉบับทางการ</p>
    `;
  }

  /* ── resources page ──────────────────────────────────── */
  function renderResources() {
    const root = document.querySelector("[data-resources]");
    if (!root || !window.COURSE) return;
    root.innerHTML = COURSE.resources
      .map(
        (g) => `
      <h2>${escapeHtml(g.group)}</h2>
      <ul class="link-list">
        ${g.items
          .map(
            (i) => `
          <li>
            <a href="${escapeHtml(i.url)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(i.title)}${extCue(i.url)}
              <span class="desc">${escapeHtml(i.desc)}</span>
            </a>
          </li>`
          )
          .join("")}
      </ul>`
      )
      .join("");
  }

  /* ── hero identity (home) ────────────────────────────── */
  function renderHeroMeta() {
    const el = document.querySelector("[data-hero-meta]");
    if (!el || !window.COURSE) return;
    const m = COURSE.meta;
    const scheduleParts = String(m.schedule || "")
      .split(" · ")
      .filter(Boolean);
    const facts = [
      m.semester,
      scheduleParts.slice(0, 2).join(" · "),
      "AI free tier · ดนตรีมาก่อน",
    ].filter(Boolean);
    el.innerHTML = `
      <div class="hero-meta">
        <p class="hero-code mono">${escapeHtml(m.code)}</p>
        <ul class="hero-facts" aria-label="ข้อมูลสั้นของรายวิชา">
          ${facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}
        </ul>
      </div>
      <p class="meta">อาจารย์ผู้สอน: ${escapeHtml(m.instructor)} · ${escapeHtml(m.schedule)}</p>
    `;

    const institutionEl = document.querySelector("[data-hero-institution]");
    if (institutionEl) {
      institutionEl.textContent = [m.institution, m.audience].filter(Boolean).join(" · ");
    }

    const cta = document.querySelector("[data-hero-cta]");
    if (cta) {
      const cw = Number(m.currentWeek) || 0;
      if (cw >= 1 && cw <= TOTAL_WEEKS) {
        cta.href = weekUrl(cw, false);
        cta.textContent = "เปิดสัปดาห์ปัจจุบัน (สัปดาห์ " + cw + ")";
      } else {
        cta.href = weekUrl(1, false);
        cta.textContent = "เตรียมตัว · ดูสัปดาห์ที่ 1";
      }
    }
  }

  function initHeroVideo() {
    const video = document.querySelector(".hero-media video");
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
      video.removeAttribute("autoplay");
      video.setAttribute("hidden", "");
    } else {
      const play = video.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    }
  }

  /* ── boot ────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initHeroVideo();
    renderHeroMeta();
    renderDashboard();
    renderWeekList(document.querySelector("[data-week-grid]"));
    renderWeekPage();
    renderEthics();
    renderProjects();
    renderTools();
    renderAbout();
    renderResources();
    updateProgressUI();
  });

  window.ArtTechno = {
    getDone,
    markDone,
    isDone,
    doneCount,
    clearProgress,
    weekUrl,
    pad,
    escapeHtml,
    copyText,
    updateProgressUI,
  };
})();
