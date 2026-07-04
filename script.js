const revealElements = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Gallery slider
const track = document.querySelector('.slider-track');
const dotsContainer = document.querySelector('.slider-dots');

if (track && dotsContainer) {
  const slides = Array.from(track.children);
  let current = 0;
  let timer;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', String(i === current));
    });
  }

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-selected', String(i === 0));
    dot.addEventListener('click', () => { goTo(i); reset(); });
    dotsContainer.appendChild(dot);
  });

  document.querySelector('.slider-prev').addEventListener('click', () => { goTo(current - 1); reset(); });
  document.querySelector('.slider-next').addEventListener('click', () => { goTo(current + 1); reset(); });

  function start() { timer = setInterval(() => goTo(current + 1), 4000); }
  function reset() { clearInterval(timer); start(); }

  const slider = document.querySelector('.gallery-slider');
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', () => clearInterval(timer));
  slider.addEventListener('focusout', start);

  start();
}

// Floating grass particles
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const field = document.createElement('div');
  field.className = 'particle-field';
  document.body.prepend(field);

  function spawnParticle() {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = 2 + Math.random() * 3;
    p.style.cssText = `
      left: ${Math.random() * 100}vw;
      width: ${size}px;
      height: ${size}px;
      opacity: ${0.2 + Math.random() * 0.4};
      animation-duration: ${7 + Math.random() * 9}s;
    `;
    field.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }

  setInterval(spawnParticle, 500);
}

