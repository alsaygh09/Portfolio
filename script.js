// Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // Stagger grid children
  document.querySelectorAll('.skills-grid, .projects-grid, .contact-grid, .about-stats').forEach(grid => {
    grid.querySelectorAll(':scope > *').forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

  // Nav active state
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--blue-light)' : '';
    });
  });
