document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("siteHeader");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");

  if (!header || !hamburger || !nav) return;

  // ── NAV LINKS ─────────────────────────────────────────────
  // Edit this array to add, remove, or rename nav buttons.
  const navLinks = [
    { label: "Home",     href: "index.html" },
    { label: "Projects", href: "projects.html" },
    { label: "About",    href: "about.html" },
    { label: "Contact",  href: "contact.html" },
  ];

  // Build the <ul> inside the desktop nav
  const ul = document.createElement("ul");
  navLinks.forEach(function (link) {
    const li = document.createElement("li");
    const a  = document.createElement("a");
    a.href        = link.href;
    a.textContent = link.label;
    if (window.location.pathname.endsWith(link.href)) {
      a.classList.add("active");
    }
    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.appendChild(ul);

  // ============================
  // BUILD MOBILE OVERLAY
  // Clone links from the desktop nav and inject a separate overlay into <body>
  // so position:fixed covers the entire viewport with no clipping
  // ============================
  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';

  const mobileUl = ul.cloneNode(true);
  overlay.appendChild(mobileUl);

  document.body.appendChild(overlay);

  // ============================
  // OPEN / CLOSE
  // ============================
  function openMenu() {
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  function closeMenu() {
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    overlay.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when a link is tapped
  overlay.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when tapping the overlay background (not a link)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeMenu();
  });

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

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(() => updateHeader(scrollY));
      ticking = true;
    }
  }, { passive: true });

  updateHeader(lastScrollY);
});