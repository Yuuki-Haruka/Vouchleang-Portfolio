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
const birthday = new Date("2003-05-20T00:00:00"); // change this

const formats = ["years", "months", "days", "hours", "minutes", "seconds"];
let currentFormatIndex = 0;

const ageDisplay = document.getElementById("ageDisplay");
const ageBox = document.querySelector(".age-counter");

function updateAge() {
  const now = new Date();
  const diff = now - birthday;
  const format = formats[currentFormatIndex];

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.4375);
  const years = Math.floor(days / 365.2425);

  const values = {
    years,
    months,
    days,
    hours,
    minutes,
    seconds
  };

  ageDisplay.textContent = `${values[format].toLocaleString()} ${format}`;
}

// click to switch
ageBox.addEventListener("click", () => {
  currentFormatIndex = (currentFormatIndex + 1) % formats.length;
  updateAge();
});

// run
updateAge();
setInterval(updateAge, 1000);