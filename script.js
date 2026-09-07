'use strict';

// Navigation stays usable without JavaScript; small screens get a toggle when enhanced.
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
if (header && menuToggle && primaryNav) {
  header.classList.add('menu-ready');
  menuToggle.hidden = false;
  const closeMenu = () => {
    header.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  menuToggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  primaryNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) closeMenu();
  });
  window.matchMedia('(max-width: 900px)').addEventListener('change', closeMenu);
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
}

// Keep the main navigation aligned with the section being read.
if (primaryNav && 'IntersectionObserver' in window) {
  const sectionLinks = Array.from(primaryNav.querySelectorAll('a[href^="#"]'));
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting);
    if (!visible.length) return;
    const active = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id;
    sectionLinks.forEach((link) => {
      if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin: '-15% 0px -65% 0px', threshold: 0});
  document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section));
}

let toastTimer;
function notify(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 5000);
}
document.querySelectorAll('[data-copy]').forEach((button) => {
  button.hidden = false;
  const idleLabel = button.textContent;
  let resetLabel;
  button.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(button.dataset.copy);
      clearTimeout(resetLabel);
      button.textContent = 'Copied!';
      resetLabel = setTimeout(() => { button.textContent = idleLabel; }, 2500);
      notify('Server address copied. Paste it in Palworld.');
    } catch {
      const code = button.parentElement.querySelector('code');
      const selection = window.getSelection();
      if (code && selection) {
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      notify('Select and copy the highlighted address, then paste it in Palworld.');
    }
  });
});

// Original artwork is unchanged. Native scrolling also works without JavaScript.
const gallery = document.querySelector('.gallery-track');
if (gallery) {
  const slides = Array.from(gallery.querySelectorAll('.gallery-slide'));
  const controls = document.querySelector('.gallery-controls');
  const dots = document.querySelector('.gallery-dots');
  const count = document.querySelector('.gallery-count');
  const playButton = document.querySelector('.autoplay-button');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer;
  let playing = false;
  let pointerInside = false;
  let focusInside = false;
  const spacer = document.createElement('div');
  spacer.setAttribute('aria-hidden', 'true');
  gallery.appendChild(spacer);
  function sizeSpacer() {
    const gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
    spacer.style.flex = `0 0 ${Math.max(0, gallery.clientWidth - slides[0].getBoundingClientRect().width - gap)}px`;
  }
  sizeSpacer();
  function maxScroll() { return Math.max(0, gallery.scrollWidth - gallery.clientWidth); }
  function slideOffset(index) { return Math.min(slides[index].offsetLeft - slides[0].offsetLeft, maxScroll()); }
  function update() {
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    dots.querySelectorAll('button').forEach((button, index) => {
      button.setAttribute('aria-current', String(index === current));
    });
  }
  function goTo(index) {
    current = (index + slides.length) % slides.length;
    gallery.scrollTo({left: slideOffset(current), behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    update();
  }
  function syncTimer() {
    clearInterval(timer);
    count.setAttribute('aria-live', playing ? 'off' : 'polite');
    if (playing && !pointerInside && !focusInside && !document.hidden && !reducedMotion.matches) {
      timer = setInterval(() => goTo(current + 1), 5000);
    }
  }
  slides.forEach((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-dot';
    button.setAttribute('aria-label', `Show ${slide.querySelector('h3').textContent}`);
    button.addEventListener('click', () => { goTo(index); syncTimer(); });
    dots.appendChild(button);
  });
  document.querySelector('.gallery-prev').addEventListener('click', () => { goTo(current - 1); syncTimer(); });
  document.querySelector('.gallery-next').addEventListener('click', () => { goTo(current + 1); syncTimer(); });
  playButton.addEventListener('click', () => {
    if (reducedMotion.matches) {
      notify('Slideshow motion is off because your device prefers reduced motion. Use the arrows to browse.');
      return;
    }
    playing = !playing;
    playButton.textContent = playing ? 'Pause slideshow' : 'Play slideshow';
    playButton.setAttribute('aria-pressed', String(playing));
    syncTimer();
  });
  gallery.addEventListener('keydown', (event) => {
    if (event.target !== gallery) return;
    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const target = event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1);
      goTo(target);
      syncTimer();
    }
  });
  let scrollTimer;
  gallery.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      // Several cards can share the final scroll position. Keep the chosen card then.
      if (Math.abs(gallery.scrollLeft - slideOffset(current)) < 5) return;
      current = slides.reduce((nearest, _, index) => Math.abs(slideOffset(index) - gallery.scrollLeft) < Math.abs(slideOffset(nearest) - gallery.scrollLeft) ? index : nearest, 0);
      update();
    }, 140);
  }, {passive: true});
  // Pausing applies to the artwork, so focusing Play does not block playback.
  gallery.addEventListener('pointerenter', () => { pointerInside = true; syncTimer(); });
  gallery.addEventListener('pointerleave', () => { pointerInside = false; syncTimer(); });
  gallery.addEventListener('focusin', () => { focusInside = true; syncTimer(); });
  gallery.addEventListener('focusout', (event) => { focusInside = gallery.contains(event.relatedTarget); syncTimer(); });
  document.addEventListener('visibilitychange', syncTimer);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      playing = false;
      playButton.textContent = 'Play slideshow';
      playButton.setAttribute('aria-pressed', 'false');
    }
    syncTimer();
  });
  window.addEventListener('resize', () => { sizeSpacer(); gallery.scrollTo({left: slideOffset(current), behavior: 'instant'}); });
  controls.hidden = false;
  dots.hidden = false;
  update();
}
