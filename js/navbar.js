document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("siteHeader");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");
  if (!header || !hamburger || !nav) return;

  // ── NAV LINKS ─────────────────────────────────────────────
  // Edit this array to add, remove, or rename nav buttons.
  // "active" marks the current page — update per-page (see below).
  const navLinks = [
    { label: "Home",     href: "index.html" },
    { label: "Projects", href: "projects.html" },
    { label: "About",    href: "about.html" },
    { label: "Contact",  href: "contact.html" },
  ];

  // Build the <ul> dynamically
  const ul = document.createElement("ul");
  navLinks.forEach(link => {
    const li = document.createElement("li");
    const a  = document.createElement("a");
    a.href        = link.href;
    a.textContent = link.label;
    // Mark active if this link's href matches the current page
    if (window.location.pathname.endsWith(link.href)) {
      a.classList.add("active");
    }
    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.appendChild(ul);

  // ── SCROLL BEHAVIOUR ──────────────────────────────────────
  let lastScrollY = window.scrollY || window.pageYOffset;
  let ticking = false;

  function updateHeader(scrollY) {
    if (scrollY <= 0) {
      header.classList.remove("shrink");
    } else if (scrollY > lastScrollY) {
      header.classList.add("shrink");
    } else if (scrollY < lastScrollY) {
      header.classList.remove("shrink");
    }
    lastScrollY = scrollY;
    ticking = false;
  }

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(() => updateHeader(scrollY));
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateHeader(lastScrollY);

  // ── HAMBURGER TOGGLE ──────────────────────────────────────
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    nav.classList.toggle("show");
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !expanded);
  });

  document.addEventListener("click", function (e) {
    if (
      nav.classList.contains("show") &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      nav.classList.remove("show");
      hamburger.setAttribute("aria-expanded", false);
    }
  });
});