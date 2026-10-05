const nav = document.querySelector("nav");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#primary-navigation");
const navToggleLabel = navToggle?.querySelector(".sr-only");
const navLinks = document.querySelectorAll(".nav-links a");
const mobileViewport = window.matchMedia("(max-width: 800px)");

const setMenuState = (isOpen, restoreFocus = false) => {
  navToggle?.setAttribute("aria-expanded", String(isOpen));
  navMenu?.classList.toggle("is-open", isOpen);
  if (navToggleLabel) {
    navToggleLabel.textContent = isOpen
      ? "Close navigation menu"
      : "Open navigation menu";
  }
  if (restoreFocus) navToggle?.focus();
};

navToggle?.addEventListener("click", () => {
  setMenuState(navToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
    // Keep keyboard focus with the destination when its menu link is hidden.
    if (mobileViewport.matches) {
      const destination = document.querySelector(link.getAttribute("href"));
      if (destination) {
        destination.setAttribute("tabindex", "-1");
        destination.focus({ preventScroll: true });
        destination.addEventListener(
          "blur",
          () => destination.removeAttribute("tabindex"),
          { once: true },
        );
      }
    }
  });
});

document.addEventListener("click", (event) => {
  if (!nav?.contains(event.target)) setMenuState(false);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    navToggle?.getAttribute("aria-expanded") === "true"
  ) {
    setMenuState(false, true);
  }
});

nav?.addEventListener("focusout", (event) => {
  if (!nav.contains(event.relatedTarget)) setMenuState(false);
});

mobileViewport.addEventListener("change", () => setMenuState(false));
document.documentElement.classList.add("nav-ready");

// Content remains visible without JavaScript; only navigation is enhanced.
const sections = [...document.querySelectorAll("main section[id]")];
let scrollPending = false;

const updateActiveNav = () => {
  const offset =
    (document.querySelector(".site-header")?.offsetHeight || 88) + 48;
  let current = sections[0]?.id;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= offset) current = section.id;
  });

  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("nav-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollPending = false;
};

window.addEventListener(
  "scroll",
  () => {
    if (!scrollPending) {
      scrollPending = true;
      window.requestAnimationFrame(updateActiveNav);
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateActiveNav);
window.addEventListener("load", updateActiveNav);
updateActiveNav();
