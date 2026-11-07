/* ============================================================
   premiumEffects.js — Premium Visual Effects Module
   React-friendly port of effects.js
   Call initEffects(root?) after mounting sections.
   ============================================================ */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function onMouseMoveRAF(target, callback) {
  let rafPending = false;
  let lastX = 0, lastY = 0;
  const handler = (e) => {
    lastX = e.clientX; lastY = e.clientY;
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => { callback(lastX, lastY); rafPending = false; });
    }
  };
  target.addEventListener('mousemove', handler, { passive: true });
  return () => target.removeEventListener('mousemove', handler);
}

export function initNavbarPill() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let ticking = false;
  const update = () => {
    navbar.classList.toggle('nav-pill', window.pageYOffset > 80);
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
  return () => window.removeEventListener('scroll', onScroll);
}

export function initHeroSpotlight() {
  if (REDUCED) return;
  const hero = document.getElementById('hero');
  const spotlight = hero?.querySelector('.hero-spotlight');
  if (!hero || !spotlight) return;
  const cleanup = onMouseMoveRAF(hero, (cx, cy) => {
    const rect = hero.getBoundingClientRect();
    spotlight.style.setProperty('--sx', (cx - rect.left) + 'px');
    spotlight.style.setProperty('--sy', (cy - rect.top) + 'px');
    spotlight.style.opacity = '1';
  });
  const onLeave = () => { spotlight.style.opacity = '0'; };
  hero.addEventListener('mouseleave', onLeave, { passive: true });
  return () => { cleanup(); hero.removeEventListener('mouseleave', onLeave); };
}

export function initHeroParallax() {
  if (REDUCED) return;
  const hero = document.getElementById('hero');
  if (!hero) return;
  const avatar = hero.querySelector('.avatar-ring');
  const badge  = hero.querySelector('.hero-badge');
  const name   = hero.querySelector('.hero-name');
  const sub    = hero.querySelector('.hero-sub');
  const social = hero.querySelector('.social-row');
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.pageYOffset, heroH = hero.offsetHeight;
        if (y > heroH) { ticking = false; return; }
        const t = y / heroH;
        if (avatar) avatar.style.transform = `translateY(${t * -30}px) scale(${1 - t * 0.05})`;
        if (badge)  badge.style.transform  = `translateY(${t * -15}px)`;
        if (name)   name.style.transform   = `translateY(${t * -20}px)`;
        if (sub)    sub.style.transform    = `translateY(${t * -10}px)`;
        if (social) social.style.transform = `translateY(${t * -8}px)`;
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener('scroll', onScroll);
}

export function initHeroReveal(delay = 150) {
  if (REDUCED) return;
  const name   = document.querySelector('.hero-name');
  const sub    = document.querySelector('.hero-sub');
  const badge  = document.querySelector('.hero-badge');
  const social = document.querySelector('.social-row');
  if (name) {
    name.style.clipPath   = 'inset(0 100% 0 0)';
    name.style.transition = 'none';
    setTimeout(() => {
      name.style.transition = 'clip-path 0.9s cubic-bezier(0.77,0,0.175,1)';
      name.style.clipPath   = 'inset(0 0% 0 0)';
    }, delay);
  }
  [badge, sub, social].forEach((el, i) => {
    if (!el) return;
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(16px)';
    el.style.transition = 'none';
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, delay + 200 + i * 100);
  });
}

export function initSpotlightCards() {
  if (REDUCED) return;
  const cards = document.querySelectorAll('.about-card, .glass.gh-profile-strip, .skill-item, .github-card');
  const cleanups = [];
  cards.forEach(card => {
    card.classList.add('spotlight-card');
    const cleanup = onMouseMoveRAF(card, (cx, cy) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--cx', (cx - rect.left) + 'px');
      card.style.setProperty('--cy', (cy - rect.top) + 'px');
      card.classList.add('spotlight-active');
    });
    const onLeave = () => card.classList.remove('spotlight-active');
    card.addEventListener('mouseleave', onLeave, { passive: true });
    cleanups.push(() => { cleanup(); card.removeEventListener('mouseleave', onLeave); });
  });
  return () => cleanups.forEach(fn => fn());
}

export function initTiltCards() {
  if (REDUCED) return;
  const cards = document.querySelectorAll('.pameran-card');
  const MAX_TILT = 8, SCALE = 1.03;
  cards.forEach(card => {
    if (card.dataset.tiltInit) return;
    card.dataset.tiltInit = '1';
    card.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.45s ease';
    card.style.willChange = 'transform';
    let rafPending = false, lx = 0, ly = 0;
    card.addEventListener('mousemove', e => {
      lx = e.clientX; ly = e.clientY;
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = (lx - rect.left) / rect.width - 0.5;
          const y = (ly - rect.top) / rect.height - 0.5;
          card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
          card.style.transform = `perspective(800px) rotateX(${-y * MAX_TILT}deg) rotateY(${x * MAX_TILT}deg) scale(${SCALE})`;
          card.style.boxShadow = `${-x * 15}px ${y * 30}px 40px rgba(57,255,20,0.18), ${-x * 30}px ${y * 45}px 80px rgba(0,0,0,0.45)`;
          const glare = card.querySelector('.card-glare');
          if (glare) { glare.style.background = `linear-gradient(${Math.atan2(y,x)*(180/Math.PI)}deg, rgba(255,255,255,0.12) 0%, transparent 60%)`; glare.style.opacity = '1'; }
          rafPending = false;
        });
      }
    }, { passive: true });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.6s ease';
      card.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.boxShadow  = '';
      const glare = card.querySelector('.card-glare');
      if (glare) glare.style.opacity = '0';
    }, { passive: true });
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.style.position = 'relative';
      card.appendChild(glare);
    }
  });
}

export function initGyroscopeTilt() {
  if (REDUCED || typeof window === 'undefined' || window.innerWidth > 768) return;
  if (!window.DeviceOrientationEvent) return;

  let rafPending = false;
  let gamma = 0, beta = 0;

  const handleOrientation = (e) => {
    if (e.gamma === null || e.beta === null) return;
    gamma = e.gamma;
    beta = e.beta;

    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        const normX = Math.max(-1, Math.min(1, gamma / 25));
        const normY = Math.max(-1, Math.min(1, (beta - 45) / 25));
        const MAX_TILT = 6;

        const visibleCards = document.querySelectorAll('.pameran-card, .about-photo');
        visibleCards.forEach(card => {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.transform = `perspective(700px) rotateX(${-normY * MAX_TILT}deg) rotateY(${normX * MAX_TILT}deg)`;
            card.style.transition = 'transform 0.15s ease-out';
          }
        });
        rafPending = false;
      });
    }
  };

  window.addEventListener('deviceorientation', handleOrientation, { passive: true });
  return () => window.removeEventListener('deviceorientation', handleOrientation);
}

export function initBentoHover() {
  if (REDUCED) return;
  const cards = document.querySelectorAll('.bento-card');
  cards.forEach(card => {
    card.classList.add('spotlight-card');
    onMouseMoveRAF(card, (cx, cy) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--cx', (cx - rect.left) + 'px');
      card.style.setProperty('--cy', (cy - rect.top) + 'px');
      card.classList.add('spotlight-active');
    });
    card.addEventListener('mouseleave', () => card.classList.remove('spotlight-active'), { passive: true });
  });
}

export function initSkillItemSpotlight() {
  if (REDUCED) return;
  document.querySelectorAll('.skill-item, .bento-card').forEach(card => {
    if (card.dataset.spotlightInit) return;
    card.dataset.spotlightInit = '1';
    onMouseMoveRAF(card, (cx, cy) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--cx', (cx - rect.left) + 'px');
      card.style.setProperty('--cy', (cy - rect.top) + 'px');
      card.classList.add('spotlight-active');
    });
    card.addEventListener('mouseleave', () => card.classList.remove('spotlight-active'), { passive: true });
  });
}

export function initSectionStagger() {
  if (REDUCED) return;
  document.querySelectorAll('.section-wrap').forEach(sec => {
    const label = sec.querySelector('.section-label');
    const title = sec.querySelector('.section-title');
    if (label) label.classList.add('reveal', 'stagger-0');
    if (title) title.classList.add('stagger-1');
  });
}

export function initAllEffects() {
  initNavbarPill();
  initHeroSpotlight();
  initHeroParallax();
  initHeroReveal();
  initSpotlightCards();
  initTiltCards();
  initGyroscopeTilt();
  initBentoHover();
  initSkillItemSpotlight();

  // Expose for external calls (e.g., after pameran grid re-render)
  window.premiumEffects = { initTiltCards, initSpotlightCards, initSkillItemSpotlight, initGyroscopeTilt };
}

