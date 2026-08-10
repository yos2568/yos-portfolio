/**
 * Inject shared header/footer so every page stays consistent.
 * data-base="" or "." for site root · data-base=".." for /weeks/
 * data-page: home | weeks | projects | tools | ethics | resources | about
 */
(function () {
  function inject() {
    const base = document.body.getAttribute("data-base") || ".";
    const prefix = base === "." || base === "" ? "" : base + "/";
    const m = (window.COURSE && COURSE.meta) || {};
    const code = m.code || "3500230";
    const instructor = m.instructor || "";

    const header = document.querySelector("[data-site-header]");
    if (header) {
      header.innerHTML = `
        <div class="header-inner">
          <a class="brand" href="${prefix}index.html">
            <strong>${code} · ศิลปะและเทคโนโลยี</strong>
            <span>Art and Technology · 15 สัปดาห์</span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" id="nav-toggle">เมนู</button>
          <nav class="nav" id="site-nav" aria-label="หลัก">
            <a href="${prefix}index.html" data-nav="home">หน้าแรก</a>
            <a href="${prefix}weeks/index.html" data-nav="weeks">15 สัปดาห์</a>
            <a href="${prefix}projects.html" data-nav="projects">โครงงาน</a>
            <a href="${prefix}tools.html" data-nav="tools">เครื่องมือ</a>
            <a href="${prefix}ethics.html" data-nav="ethics">จริยธรรม</a>
            <a href="${prefix}resources.html" data-nav="resources">แหล่งเรียนรู้</a>
            <a href="${prefix}about.html" data-nav="about">เกี่ยวกับรายวิชา</a>
          </nav>
        </div>`;
      header.classList.add("site-header");
    }

    const footer = document.querySelector("[data-site-footer]");
    if (footer) {
      const instructorLine = instructor
        ? `<p>อาจารย์ผู้สอน: ${instructor}</p>`
        : "";
      footer.innerHTML = `
        <p>${code} · ศิลปะและเทคโนโลยี (Art and Technology) · คณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</p>
        ${instructorLine}
        <p>ใช้ AI ฟรี (free tier เท่านั้น) ในฐานะผู้ร่วมงาน · สาระทางดนตรีมาก่อน · เนื้อหาบนไซต์นี้สำหรับผู้เรียนในรายวิชา</p>
        <p class="footer-note">ไซต์นี้ไม่เก็บงานหรือคะแนน · ความคืบหน้าสัปดาห์เก็บบนเบราว์เซอร์ของคุณเท่านั้น</p>
      `;
      footer.classList.add("site-footer");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
