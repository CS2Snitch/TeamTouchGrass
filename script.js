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
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
const sliderWrapper = document.querySelector('.gallery-slider');

if (track && dotsContainer && sliderPrev && sliderNext && sliderWrapper) {
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

  sliderPrev.addEventListener('click', () => { goTo(current - 1); reset(); });
  sliderNext.addEventListener('click', () => { goTo(current + 1); reset(); });

  function start() { timer = setInterval(() => goTo(current + 1), 4000); }
  function reset() { clearInterval(timer); start(); }

  sliderWrapper.addEventListener('mouseenter', () => clearInterval(timer));
  sliderWrapper.addEventListener('mouseleave', start);
  sliderWrapper.addEventListener('focusin', () => clearInterval(timer));
  sliderWrapper.addEventListener('focusout', start);

  start();
}

// Weighted Twitch channel selection (refreshed each page load)
(function () {
  const twitchChannels = [
    { url: 'https://www.twitch.tv/cs2snitch', weight: 60 },
    { url: 'https://www.twitch.tv/sleepybalkan', weight: 10 },
    { url: 'https://www.twitch.tv/gr0v_plays_games', weight: 10 },
    { url: 'https://www.twitch.tv/los13nto', weight: 10 },
    { url: 'https://www.twitch.tv/', weight: 10 },
  ];
  const totalWeight = twitchChannels.reduce((sum, c) => sum + c.weight, 0);
  let rand = Math.random() * totalWeight;
  let chosen = twitchChannels[twitchChannels.length - 1].url;
  for (const channel of twitchChannels) {
    rand -= channel.weight;
    if (rand <= 0) { chosen = channel.url; break; }
  }
  document.querySelectorAll('a.twitch-link').forEach((el) => { el.href = chosen; });
}());


const MAX_PARTICLES = 80;
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const field = document.createElement('div');
  field.className = 'particle-field';
  document.body.prepend(field);

  function spawnParticle() {
    if (field.children.length >= MAX_PARTICLES) return;
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

  setInterval(spawnParticle, 250);
}

