import React, { useState, useEffect, useRef } from 'react';

const SEC_MAP = {
  hero: '#about', about: '#about', person: '#person', daily: '#daily',
  projects: '#projects', 'pameran-page': '#projects',
  github: '#github', otherskills: '#otherskills', contact: '#contact',
};

export default function Navbar({
  playing,
  onMusicToggle,
  isDark,
  onThemeToggle,
  sfxMuted,
  onSfxToggle,
  onNavClickWithSound,
  achievementsUnlockedCount = 0,
  onOpenAchievements,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#about');
  const lastScrollY = useRef(0);
  const logoClicksRef = useRef([]);

  const handleLogoClick = () => {
    const now = Date.now();
    const recent = [...logoClicksRef.current.filter((t) => now - t < 1600), now];
    logoClicksRef.current = recent;
    if (recent.length >= 5) {
      logoClicksRef.current = [];
      onOpenAchievements?.();
    }
  };

  // Active nav tracking
  useEffect(() => {
    const update = () => {
      const secs = Array.from(document.querySelectorAll('#hero,#about,#person,#daily,#projects,#github,#otherskills,#contact'));
      const scrollY = window.pageYOffset;
      const navH = document.getElementById('navbar')?.offsetHeight || 72;
      const atBottom = (window.innerHeight + scrollY) >= document.body.scrollHeight - 10;
      let cur = secs[0]?.id || 'hero';
      if (atBottom) cur = 'contact';
      else secs.forEach(s => { if (scrollY >= s.getBoundingClientRect().top + scrollY - navH - 40) cur = s.id; });
      setActiveLink(SEC_MAP[cur] || '#' + cur);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    setTimeout(update, 400);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  // Navbar hide on scroll down (mobile)
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
      const cur = window.pageYOffset;
      if (navbar && window.innerWidth <= 768) {
        navbar.classList.toggle('nav-hidden', cur > lastScrollY.current && cur > 80);
      } else if (navbar) {
        navbar.classList.remove('nav-hidden');
      }
      lastScrollY.current = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    let target = document.querySelector(href);
    if (href === '#projects' && (!target || target.offsetParent === null)) {
      target = document.querySelector('#pameran-page');
    }
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
    }
    onNavClickWithSound?.();
    setIsOpen(false);
  };

  const links = [
    { href: '#about',       label: 'About' },
    { href: '#person',      label: 'Personality' },
    { href: '#daily',       label: 'Daily' },
    { href: '#projects',    label: 'Display' },
    { href: '#github',      label: 'GitHub' },
    { href: '#otherskills', label: 'Skills' },
    { href: '#contact',     label: 'Contact' },
  ];

  return (
    <>
      <nav id="navbar">
        <div className="nav-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }} title="Mikhayl">
          <div className="nav-logo-ring">
            <img src="/img/profil/profil.jpg" alt="Mikhayl" />
          </div>
          <span className="nav-name">Mikhayl</span>
        </div>
        <div className="nav-links" id="nav-links-desk">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className={`nav-link${activeLink === l.href ? ' active' : ''}`}
              onClick={e => handleNavClick(e, l.href)}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <button id="music-toggle" className={`music-btn${playing ? ' playing' : ''}`}
            title="Play / Pause Musik" onClick={onMusicToggle}>
            {playing ? '⏸' : '▶'}
          </button>
          <button className="theme-toggle" id="theme-toggle-desk"
            title="Ganti Tema Dark/Light" aria-label="Toggle theme"
            onClick={onThemeToggle}></button>
          <button id="ham-btn" className={`ham-btn${isOpen ? ' open' : ''}`}
            aria-label="Menu" onClick={() => setIsOpen(v => !v)}>
            <span className="ham-line"></span>
            <span className="ham-line"></span>
            <span className="ham-line"></span>
          </button>
        </div>
      </nav>
      <div style={{ height: '60px' }}></div>

      {/* Drawer Overlay */}
      <div id="drawer-overlay"
        className={isOpen ? 'open' : ''}
        onClick={() => setIsOpen(false)} />

      {/* Mobile Menu */}
      <div id="mobile-menu" className={isOpen ? 'open' : ''}>
        {links.map(l => (
          <a key={l.href} href={l.href}
            className={`nav-link${activeLink === l.href ? ' active' : ''}`}
            onClick={e => handleNavClick(e, l.href)}>
            {l.label}
          </a>
        ))}
        <div id="drawer-bottom" style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
          {/* Theme Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="theme-icon" id="drawer-theme-icon">{isDark ? '🌙' : '☀️'}</span>
            <button className="theme-toggle" id="theme-toggle-mob"
              aria-label="Toggle theme" onClick={onThemeToggle}></button>
            <span style={{ fontFamily:'var(--font-m)', fontSize:'0.6rem', color:'var(--text-muted)', letterSpacing:'1px' }}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>

          {/* SFX Mute Switch inside Mobile Sidebar Drawer Only */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '4px', borderTop: '1px solid var(--border)', width: '100%' }}>
            <button
              id="sfx-toggle-mob"
              onClick={onSfxToggle}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: sfxMuted ? 'var(--text-muted)' : 'var(--green)',
                fontSize: '0.8rem',
              }}
            >
              {sfxMuted ? '🔇' : '🔊'}
            </button>
            <span style={{ fontFamily:'var(--font-m)', fontSize:'0.6rem', color:'var(--text-muted)', letterSpacing:'1px' }}>
              {sfxMuted ? 'SFX Dimatikan' : 'SFX Aktif'}
            </span>
          </div>

          {/* Achievement Hub Mobile Button */}
          {achievementsUnlockedCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '4px', borderTop: '1px solid var(--border)', width: '100%' }}>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAchievements?.();
                }}
                style={{
                  background: 'rgba(250, 204, 21, 0.1)',
                  border: '1px solid rgba(250, 204, 21, 0.3)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#facc15',
                  width: '100%',
                }}
              >
                <span>🏆</span>
                <span style={{ fontFamily:'var(--font-m)', fontSize:'0.65rem', fontWeight: 600 }}>
                  Achievement Hub ({achievementsUnlockedCount})
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
