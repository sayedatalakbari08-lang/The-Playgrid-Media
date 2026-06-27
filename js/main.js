/* ===================================================================
   PlayGrid Media, Talent Management
   Shared interactions: nav, reveals, counters, marquee, parallax, forms
   No dependencies, vanilla JS.
   =================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Set current year in footers ---------- */
  function setYear() {
    var y = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = y; });
  }

  /* ---------- Sticky nav background on scroll ---------- */
  function initNavScroll() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var nav = document.getElementById("nav");
    var toggle = document.getElementById("navToggle");
    if (!nav || !toggle) return;

    var close = function () {
      nav.classList.remove("nav--open");
      document.body.classList.remove("no-scroll");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };
    var open = function () {
      nav.classList.add("nav--open");
      document.body.classList.add("no-scroll");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    };

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("nav--open")) close(); else open();
    });
    nav.querySelectorAll(".nav__link, .nav__cta").forEach(function (link) {
      link.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Highlight active nav link ---------- */
  function initActiveLink() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__link").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === path) link.classList.add("active");
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveals() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-target"));
    var dur = 1600;
    var start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  }
  function initCounters() {
    var nums = document.querySelectorAll("[data-target]");
    if (!nums.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach(function (el) { el.textContent = parseFloat(el.getAttribute("data-target")).toLocaleString(); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Seamless marquee (duplicate group) ---------- */
  function initMarquee() {
    document.querySelectorAll(".marquee__track").forEach(function (track) {
      var group = track.querySelector(".marquee__group");
      if (!group) return;
      var clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }

  /* ---------- Subtle parallax on decor ---------- */
  function initParallax() {
    if (reduceMotion || window.innerWidth < 760) return;
    var els = document.querySelectorAll("[data-parallax]");
    if (!els.length) return;
    var ticking = false;
    var update = function () {
      var y = window.scrollY;
      els.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
        el.style.transform = "translate3d(0," + (y * speed).toFixed(1) + "px,0)";
      });
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* ---------- Forms: validate + submit ----------
     Default behaviour with no backend: opens a prefilled email to
     contact@playgridmedia.com so the site works on Hostinger immediately.
     To use a real endpoint (Formspree, Web3Forms), add the attribute
     data-endpoint="https://..." to the <form> and it will POST instead.
  ------------------------------------------------------------------- */
  function showError(field, on) {
    if (on) field.classList.add("invalid");
    else field.classList.remove("invalid");
  }
  function validateForm(form) {
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (input) {
      var field = input.closest(".field");
      var val = (input.value || "").trim();
      var bad = !val;
      if (input.type === "email" && val) {
        bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      }
      if (field) showError(field, bad);
      if (bad) ok = false;
    });
    return ok;
  }
  function buildMailto(form) {
    var to = form.getAttribute("data-mailto") || "contact@playgridmedia.com";
    var subject = form.getAttribute("data-subject") || "New enquiry from playgridmedia.com";
    var lines = [];
    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      if (!input.name) return;
      var labelEl = form.querySelector('label[for="' + input.id + '"]');
      var label = labelEl ? labelEl.textContent.replace("*", "").trim() : input.name;
      lines.push(label + ": " + (input.value || ""));
    });
    return "mailto:" + to +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }
  function initForms() {
    document.querySelectorAll("form[data-form]").forEach(function (form) {
      var status = form.querySelector(".form__status");
      // clear invalid state as the user types
      form.querySelectorAll("input, select, textarea").forEach(function (input) {
        input.addEventListener("input", function () {
          var field = input.closest(".field");
          if (field) field.classList.remove("invalid");
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateForm(form)) {
          var firstBad = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
          if (firstBad) firstBad.focus();
          return;
        }
        var endpoint = form.getAttribute("data-endpoint");
        var success = function (msg) {
          if (status) {
            status.textContent = msg;
            status.classList.add("show", "ok");
          }
          form.reset();
        };

        if (endpoint) {
          var btn = form.querySelector('[type="submit"]');
          if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending..."; }
          fetch(endpoint, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: new FormData(form)
          }).then(function (r) {
            if (r.ok) success("Thank you. Your message has been sent, we will be in touch shortly.");
            else throw new Error("bad response");
          }).catch(function () {
            window.location.href = buildMailto(form);
          }).finally(function () {
            if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || "Send"; }
          });
        } else {
          // No endpoint configured: fall back to email client
          window.location.href = buildMailto(form);
          success("Opening your email app to send this securely. If nothing happens, email contact@playgridmedia.com directly.");
        }
      });
    });
  }

  /* ---------- Smooth scroll to in-page form ---------- */
  function initScrollButtons() {
    document.querySelectorAll("[data-scroll-to]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var sel = btn.getAttribute("data-scroll-to");
        var target = document.querySelector(sel);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
          var firstInput = target.querySelector("input, select, textarea");
          if (firstInput) setTimeout(function () { firstInput.focus(); }, 600);
        }
      });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    setYear();
    initNavScroll();
    initMobileMenu();
    initActiveLink();
    initMarquee();
    initReveals();
    initCounters();
    initParallax();
    initForms();
    initScrollButtons();
  });
})();
