const menuBtn = document.querySelector('[data-menu-btn]');
const menu = document.querySelector('[data-mobile-menu]');

if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
  threshold: 0.12
};
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));
const currentPath = location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('[data-link]');
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});
const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `
      perspective(900px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateY(-8px)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});