// ============================================
// Shared behaviour: theme, mobile nav, reveal-on-scroll,
// active-link highlighting, partial includes.
// ============================================

(function () {
  // ---- Theme ----
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));

  function toggleTheme() {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const label = document.querySelector("[data-theme-label]");
    if (!label) return;
    label.textContent = root.getAttribute("data-theme") === "dark" ? "Modo claro" : "Modo oscuro";
  }

  function closeSidebar() {
    document.querySelector("[data-sidebar]")?.classList.remove("open");
    document.querySelector(".sidebar-backdrop")?.classList.remove("open");
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-theme-toggle]")) toggleTheme();
    if (e.target.closest("[data-nav-toggle]")) {
      document.querySelector("[data-sidebar]")?.classList.toggle("open");
      document.querySelector(".sidebar-backdrop")?.classList.toggle("open");
    } else if (e.target.closest(".side-nav a")) {
      closeSidebar();
    }
  });

  // ---- Reveal on scroll (with a short stagger for siblings in the same grid) ----
  function initStagger() {
    document.querySelectorAll(".grid").forEach((grid) => {
      Array.from(grid.children).forEach((child, i) => {
        if (child.classList.contains("reveal")) {
          child.style.transitionDelay = Math.min(i * 70, 280) + "ms";
        }
      });
    });
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => io.observe(el));
  }

  // ---- Count-up numbers ----
  // Animates the big number in .stat/.stat-block/.metric-strip .m from 0 to its
  // real value when it scrolls into view. Only touches values that are cleanly
  // numeric ("26.000+", "-75%", "1,8", "23") — anything else ("Agile", "ALIA",
  // "C2C → B2B", "9.5/10") is left exactly as written, never guessed at.
  const COUNT_UP_RE = /^(-?)([\d][\d.,]*)(\+|%)?$/;

  function parseLocaleNumber(numStr) {
    if (numStr.includes(",")) {
      return parseFloat(numStr.replace(/\./g, "").replace(",", "."));
    }
    return parseFloat(numStr.replace(/\./g, ""));
  }

  function formatLocaleNumber(value, hadDecimal) {
    if (hadDecimal) {
      return value.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }
    return Math.round(value).toLocaleString("es-ES");
  }

  function animateCountUp(el, sign, target, hadDecimal, suffix) {
    const duration = 1100;
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      el.textContent = sign + formatLocaleNumber(value, hadDecimal) + suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = sign + formatLocaleNumber(target, hadDecimal) + suffix;
    }
    requestAnimationFrame(frame);
  }

  function initCountUp() {
    const candidates = document.querySelectorAll(".stat b, .stat-block b, .metric-strip .m b");
    const targets = [];
    candidates.forEach((el) => {
      const text = el.textContent.trim();
      const m = text.match(COUNT_UP_RE);
      if (!m) return;
      const sign = m[1] || "";
      const numStr = m[2];
      const suffix = m[3] || "";
      const target = parseLocaleNumber(numStr);
      if (isNaN(target)) return;
      targets.push({ el, sign, target, hadDecimal: numStr.includes(","), suffix });
    });
    if (!targets.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = targets.find((t) => t.el === entry.target);
          if (match) animateCountUp(match.el, match.sign, match.target, match.hadDecimal, match.suffix);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    targets.forEach((t) => io.observe(t.el));
  }

  // ---- Scroll progress bar ----
  function initScrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      bar.style.width = pct + "%";
    }
    update();
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  // ---- Typewriter role cycler ----
  // Cycles the text of any [data-roles] element (pipe-separated list) with a
  // type/pause/delete loop. Skipped entirely for prefers-reduced-motion — the
  // first role is shown as plain static text instead.
  function initTypewriter() {
    document.querySelectorAll("[data-roles]").forEach((el) => {
      const roles = el.dataset.roles.split("|").map((s) => s.trim()).filter(Boolean);
      if (!roles.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = roles[0];
        return;
      }
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;
      function tick() {
        const word = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        el.textContent = word.slice(0, charIndex);
        let delay = deleting ? 40 : 70;
        if (!deleting && charIndex === word.length) {
          delay = 1600;
          deleting = true;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 300;
        }
        setTimeout(tick, delay);
      }
      tick();
    });
  }

  // ---- Active nav link ----
  // Compares each link's own resolved `.pathname` (the browser resolves relative
  // hrefs like "../about.html" into an absolute path automatically) against the
  // current page's pathname — instead of the old data-path attribute, which was
  // relative and could never match location.pathname (always absolute), so only
  // the home link (data-path="") ever matched, on every page.
  function normalizePath(p) {
    const trimmed = p.replace(/index\.html$/, "").replace(/\/+$/, "");
    return trimmed === "" ? "/" : trimmed;
  }

  function markActiveLink() {
    const current = normalizePath(window.location.pathname);
    document.querySelectorAll(".side-nav a[href]").forEach((a) => {
      const linkPath = normalizePath(a.pathname);
      const isActive =
        linkPath === current ||
        (linkPath !== "/" && current.startsWith(linkPath + "/"));
      a.classList.toggle("active", isActive);
    });
  }

  // ---- Gantt "today" marker ----
  // Draws a vertical line at today's date (the day the page is loaded) across
  // any .gantt chart that declares data-axis-start/data-axis-end. Positioned
  // in JS (not pure CSS) because it must line up with .gantt-track, whose own
  // position shifts responsively (the label column narrows/hides on mobile).
  function placeGanttNowLine(gantt) {
    const start = new Date(gantt.dataset.axisStart);
    const end = new Date(gantt.dataset.axisEnd);
    const track = gantt.querySelector(".gantt-track");
    if (!track || isNaN(start) || isNaN(end)) return;
    const now = new Date();
    const frac = Math.min(1, Math.max(0, (now - start) / (end - start)));
    const gRect = gantt.getBoundingClientRect();
    const tRect = track.getBoundingClientRect();
    let line = gantt.querySelector(".gantt-now");
    if (!line) {
      line = document.createElement("div");
      line.className = "gantt-now";
      gantt.appendChild(line);
    }
    line.title = "Hoy · " + now.toLocaleDateString("es-ES");
    line.style.left = tRect.left - gRect.left + tRect.width * frac + "px";
  }

  function initGanttNowLines() {
    const charts = document.querySelectorAll(".gantt[data-axis-start]");
    if (!charts.length) return;
    const placeAll = () => charts.forEach(placeGanttNowLine);
    placeAll();
    window.addEventListener("resize", placeAll);
  }

  // ---- Load remaining partials (footer). The header/sidebar is inlined directly
  // in every page (not fetched) so navigation always works, even over file:// or
  // if this script fails to load. ----
  async function includePartials() {
    const nodes = document.querySelectorAll("[data-include]");
    const base = document.body.getAttribute("data-root") || "";
    await Promise.all(
      Array.from(nodes).map(async (node) => {
        const file = node.getAttribute("data-include");
        try {
          const res = await fetch(base + "partials/" + file + ".html");
          const html = await res.text();
          node.innerHTML = html.split("{{ROOT}}").join(base);
        } catch (e) {
          console.error("No se pudo cargar el partial:", file, e);
        }
      })
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateThemeIcon();
    markActiveLink();
    initStagger();
    initReveal();
    initCountUp();
    initScrollProgress();
    initTypewriter();
    initGanttNowLines();
    includePartials();
  });
})();
