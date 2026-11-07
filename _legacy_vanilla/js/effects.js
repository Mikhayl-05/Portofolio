/* ============================================================
   EFFECTS.JS — Premium Visual Effects Module
   Portfolio Mikhayl

   All animations use only transform + opacity.
   requestAnimationFrame used for all JS-driven motion.
   Passive event listeners throughout.
   prefers-reduced-motion is respected globally.
   ============================================================ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     REDUCED MOTION GLOBAL CHECK
  ───────────────────────────────────────── */
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────
     UTILITY: RAF-throttled mousemove handler
  ───────────────────────────────────────── */
  function onMouseMoveRAF(target, callback) {
    let rafPending = false;
    let lastX = 0, lastY = 0;
    target.addEventListener('mousemove', (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          callback(lastX, lastY);
          rafPending = false;
        });
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────
     1. NAVBAR PILL MORPH
     Morphs navbar into a floating pill after 80px scroll.
  ───────────────────────────────────────── */
  function initNavbarPill() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let rafPending = false;
    let ticking = false;
    let lastScrollY = 0;

    function update() {
      const y = window.pageYOffset;
      if (y > 80) {
        navbar.classList.add('nav-pill');
      } else {
        navbar.classList.remove('nav-pill');
      }
      lastScrollY = y;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ─────────────────────────────────────────
     2. HERO SPOTLIGHT
     Radial spotlight that follows mouse over hero.
  ───────────────────────────────────────── */
  function initHeroSpotlight() {
    if (REDUCED) return;
    const hero = document.getElementById('hero');
    const spotlight = hero?.querySelector('.hero-spotlight');
    if (!hero || !spotlight) return;

    onMouseMoveRAF(hero, (cx, cy) => {
      const rect = hero.getBoundingClientRect();
      const x = cx - rect.left;
      const y = cy - rect.top;
      spotlight.style.setProperty('--sx', x + 'px');
      spotlight.style.setProperty('--sy', y + 'px');
      spotlight.style.opacity = '1';
    });

    hero.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    }, { passive: true });
  }

  /* ─────────────────────────────────────────
     3. HERO PARALLAX
     Parallax depth on avatar, badge, name, social on scroll.
  ───────────────────────────────────────── */
  function initHeroParallax() {
    if (REDUCED) return;
    const hero = document.getElementById('hero');
    if (!hero) return;

    const avatar = hero.querySelector('.avatar-ring');
    const badge  = hero.querySelector('.hero-badge');
    const name   = hero.querySelector('.hero-name');
    const sub    = hero.querySelector('.hero-sub');
    const social = hero.querySelector('.social-row');

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.pageYOffset;
          const heroH = hero.offsetHeight;
          if (y > heroH) { ticking = false; return; }
          const t = y / heroH; // 0 → 1 as hero scrolls out

          if (avatar) avatar.style.transform = `translateY(${t * -30}px) scale(${1 - t * 0.05})`;
          if (badge)  badge.style.transform  = `translateY(${t * -15}px)`;
          if (name)   name.style.transform   = `translateY(${t * -20}px)`;
          if (sub)    sub.style.transform    = `translateY(${t * -10}px)`;
          if (social) social.style.transform = `translateY(${t * -8}px)`;

          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────────────────────────────────────
     4. HERO TEXT REVEAL
     Clip-path reveal animation on MIKHAYL name after preloader.
  ───────────────────────────────────────── */
  function initHeroReveal() {
    if (REDUCED) return;
    const name = document.querySelector('.hero-name');
    const sub  = document.querySelector('.hero-sub');
    const badge = document.querySelector('.hero-badge');
    const social = document.querySelector('.social-row');

    // Hero content starts invisible via CSS, reveals on load
    // Wait for preloader to hide (≈2.4s) then animate
    const delay = 2600;

    if (name) {
      name.style.clipPath = 'inset(0 100% 0 0)';
      name.style.transition = 'none';
      setTimeout(() => {
        name.style.transition = 'clip-path 0.9s cubic-bezier(0.77,0,0.175,1)';
        name.style.clipPath = 'inset(0 0% 0 0)';
      }, delay);
    }

    [badge, sub, social].forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'none';
      setTimeout(() => {
        el.style.transition = `opacity 0.7s ease, transform 0.7s ease`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay + 300 + i * 120);
    });
  }

  /* ─────────────────────────────────────────
     5. SPOTLIGHT CARDS (Glass Cards)
     A radial gradient spotlight inside cards follows mouse.
  ───────────────────────────────────────── */
  function initSpotlightCards() {
    if (REDUCED) return;

    const cards = document.querySelectorAll(
      '.about-card, .glass.gh-profile-strip, .skill-item, .github-card'
    );

    cards.forEach((card) => {
      card.classList.add('spotlight-card');

      onMouseMoveRAF(card, (cx, cy) => {
        const rect = card.getBoundingClientRect();
        const x = cx - rect.left;
        const y = cy - rect.top;
        card.style.setProperty('--cx', x + 'px');
        card.style.setProperty('--cy', y + 'px');
        card.classList.add('spotlight-active');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('spotlight-active');
      }, { passive: true });
    });
  }

  /* ─────────────────────────────────────────
     6. TILT CARDS (Pameran 3D Tilt)
     3D perspective tilt on mouse move. Max 8°, scale 1.03.
     Called once on init + after pameran grid re-renders.
  ───────────────────────────────────────── */
  function initTiltCards() {
    if (REDUCED) return;

    const cards = document.querySelectorAll('.pameran-card');
    const MAX_TILT = 8;
    const SCALE    = 1.03;

    cards.forEach((card) => {
      if (card.dataset.tiltInit) return; // skip already inited
      card.dataset.tiltInit = '1';

      // Wrap in perspective container
      card.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.45s ease';
      card.style.willChange = 'transform';

      let rafPending = false;
      let lx = 0, ly = 0;

      card.addEventListener('mousemove', (e) => {
        lx = e.clientX;
        ly = e.clientY;
        if (!rafPending) {
          rafPending = true;
          requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = (lx - rect.left) / rect.width  - 0.5; // -0.5 → 0.5
            const y = (ly - rect.top)  / rect.height - 0.5;
            const rotX = -y * MAX_TILT;
            const rotY =  x * MAX_TILT;
            const dX = x * 15;
            const dY = y * 15;

            card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${SCALE})`;
            card.style.boxShadow = `
              ${-dX}px ${dY * 2}px 40px rgba(57,255,20,0.18),
              ${-dX * 2}px ${dY * 3}px 80px rgba(0,0,0,0.45)
            `;

            // Glare
            const glare = card.querySelector('.card-glare');
            if (glare) {
              const angle = Math.atan2(y, x) * (180 / Math.PI);
              glare.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.12) 0%, transparent 60%)`;
              glare.style.opacity = '1';
            }

            rafPending = false;
          });
        }
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.6s ease';
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.boxShadow = '';

        const glare = card.querySelector('.card-glare');
        if (glare) glare.style.opacity = '0';
        rafPending = false;
      }, { passive: true });

      // Inject glare overlay if not present
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.style.position = 'relative';
        card.appendChild(glare);
      }
    });
  }

  /* ─────────────────────────────────────────
     7. BENTO GRID HOVER
     Subtle spotlight + lift per bento card.
  ───────────────────────────────────────── */
  function initBentoHover() {
    if (REDUCED) return;
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach((card) => {
      card.classList.add('spotlight-card');

      onMouseMoveRAF(card, (cx, cy) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--cx', (cx - rect.left) + 'px');
        card.style.setProperty('--cy', (cy - rect.top) + 'px');
        card.classList.add('spotlight-active');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('spotlight-active');
      }, { passive: true });
    });
  }

  /* ─────────────────────────────────────────
     8. AURORA ANIMATION INIT
     Just ensures the aurora div is in the DOM.
  ───────────────────────────────────────── */
  function initAurora() {
    if (REDUCED) {
      const aurora = document.querySelector('.hero-aurora');
      if (aurora) aurora.style.animation = 'none';
    }
  }

  /* ─────────────────────────────────────────
     9. OBSERVE PAMERAN GRID for dynamic cards
     Re-runs initTiltCards when grid content changes.
  ───────────────────────────────────────── */
  function observePameranGrid() {
    const grid = document.getElementById('pameran-grid');
    if (!grid || REDUCED) return;

    const obs = new MutationObserver(() => {
      // small delay to let DOM settle
      setTimeout(initTiltCards, 120);
    });
    obs.observe(grid, { childList: true });
  }

  /* ─────────────────────────────────────────
     10. STAGGERED SECTION LABELS
     Adds subtle stagger to section label + title.
  ───────────────────────────────────────── */
  function initSectionStagger() {
    if (REDUCED) return;
    document.querySelectorAll('.section-wrap').forEach((sec) => {
      const label = sec.querySelector('.section-label');
      const title = sec.querySelector('.section-title');
      if (label) label.classList.add('reveal', 'stagger-0');
      if (title) {
        // title already has reveal in HTML, just add stagger
        title.classList.add('stagger-1');
      }
    });
  }

  /* ─────────────────────────────────────────
     11. SKILL ITEMS — observe for re-spotlight
     after DOM fully loads
  ───────────────────────────────────────── */
  function initSkillItemSpotlight() {
    if (REDUCED) return;
    const items = document.querySelectorAll('.skill-item, .bento-card');
    items.forEach((card) => {
      if (card.dataset.spotlightInit) return;
      card.dataset.spotlightInit = '1';

      onMouseMoveRAF(card, (cx, cy) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--cx', (cx - rect.left) + 'px');
        card.style.setProperty('--cy', (cy - rect.top) + 'px');
        card.classList.add('spotlight-active');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('spotlight-active');
      }, { passive: true });
    });
  }

  /* ─────────────────────────────────────────
     INIT — run after DOM ready
  ───────────────────────────────────────── */
  function init() {
    initNavbarPill();
    initHeroSpotlight();
    initHeroParallax();
    initHeroReveal();
    initSpotlightCards();
    initTiltCards();
    initBentoHover();
    initAurora();
    observePameranGrid();
    initSkillItemSpotlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ─────────────────────────────────────────
     PUBLIC API — for external callers
  ───────────────────────────────────────── */
  window.premiumEffects = {
    initTiltCards,
    initSpotlightCards,
    initSkillItemSpotlight,
  };

})();
