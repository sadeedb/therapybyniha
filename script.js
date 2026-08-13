// Mobile nav toggle — called from the hamburger button's inline onclick
function toggleNav(btn) {
  const menu = document.getElementById('nav-menu');
  const isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
  btn.textContent = isOpen ? '✕' : '☰';
}

function closeNav() {
  const menu = document.getElementById('nav-menu');
  const btn = document.querySelector('.nav-toggle');
  if (!menu || !btn || !menu.classList.contains('open')) return;
  menu.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.textContent = '☰';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    if (nav && !nav.contains(e.target)) closeNav();
  });

  // Scroll-triggered reveal for marketing content — fires once per element.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
});
