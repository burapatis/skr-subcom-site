/* คณะอนุกรรมาธิการการส่งเสริมการเรียนรู้ฯ — interaction layer
   Vanilla JS, no dependencies. Fails gracefully. */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---- storage helpers (never throw) ---- */
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* ---- Accessibility: text size ---- */
  var SIZES = ["normal", "large", "xlarge"];
  function applyTextSize(size) {
    if (size === "normal") root.removeAttribute("data-textsize");
    else root.setAttribute("data-textsize", size);
    document.querySelectorAll("[data-a11y-size]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-a11y-size") === size));
    });
    store("pref-textsize", size);
  }
  document.querySelectorAll("[data-a11y-size]").forEach(function (btn) {
    btn.addEventListener("click", function () { applyTextSize(btn.getAttribute("data-a11y-size")); });
  });

  /* ---- Accessibility: high contrast ---- */
  function applyContrast(on) {
    if (on) root.setAttribute("data-contrast", "high");
    else root.removeAttribute("data-contrast");
    document.querySelectorAll("[data-a11y-contrast]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(!!on));
    });
    store("pref-contrast", on ? "high" : "normal");
  }
  document.querySelectorAll("[data-a11y-contrast]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyContrast(root.getAttribute("data-contrast") !== "high");
    });
  });

  /* restore prefs */
  var savedSize = read("pref-textsize");
  if (savedSize && SIZES.indexOf(savedSize) !== -1) applyTextSize(savedSize); else applyTextSize("normal");
  if (read("pref-contrast") === "high") applyContrast(true);

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("primary-nav");
  var scrim = document.querySelector(".nav-scrim");
  function setNav(open) {
    if (!toggle || !links) return;
    toggle.setAttribute("aria-expanded", String(open));
    links.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    if (scrim) scrim.classList.toggle("show", open);
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
  }
  if (scrim) scrim.addEventListener("click", function () { setNav(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });
  if (links) links.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });

  /* ---- Scroll reveal ---- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Back to top ---- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    var onScroll = function () { toTop.classList.toggle("show", window.scrollY > 600); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = String(new Date().getFullYear() + 543); // Buddhist Era
})();
