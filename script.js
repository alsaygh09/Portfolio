// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach((el) => observer.observe(el));

// Stagger grid children
document.querySelectorAll('.skills-grid, .projects-grid, .contact-grid, .about-stats').forEach((grid) => {
  grid.querySelectorAll(':scope > *').forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

// Mobile navigation
const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#primary-navigation');
const navToggleLabel = navToggle?.querySelector('.sr-only');
const navLinks = document.querySelectorAll('.nav-links a');

const setMenuState = (isOpen) => {
  navToggle?.setAttribute('aria-expanded', String(isOpen));
  navMenu?.classList.toggle('is-open', isOpen);
  if (navToggleLabel) {
    navToggleLabel.textContent = isOpen ? 'Close navigation menu' : 'Open navigation menu';
  }
};

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  setMenuState(!isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('click', (event) => {
  if (!nav?.contains(event.target)) {
    setMenuState(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuState(false);
    navToggle?.focus();
  }
});

// Nav active state
const sections = document.querySelectorAll('section[id]');

const updateActiveNav = () => {
  let current = '';

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('nav-active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
