import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { CONFIG_FLIPCARD } from '../data/config.js';

export default function Personality({ onFlipCard }) {
  const typewriterText = useTypewriter("Kebiasannya apanih!? 🎭", 6, 95, 700);
  const cfg = CONFIG_FLIPCARD.personality;

  const handleFlip = (el) => {
    el.classList.toggle('flipped');
    onFlipCard?.();
  };

  return (
    <section id="person" className="section-wrap">
      <span className="float-deco" style={{ '--fd-top': '6%', '--fd-left': '4%', '--fd-size': '2rem', '--fd-dur': '6s', '--fd-delay': '-0.8s', '--fd-op': '0.16' }}>🎭</span>
      <span className="float-deco" style={{ '--fd-top': '82%', '--fd-left': '93%', '--fd-size': '1.6rem', '--fd-dur': '7.5s', '--fd-delay': '-3s', '--fd-op': '0.13' }}>🖥️</span>
      <span className="float-deco" style={{ '--fd-top': '48%', '--fd-left': '1%', '--fd-size': '1.3rem', '--fd-dur': '5s', '--fd-delay': '-1.8s', '--fd-op': '0.11' }}>🔍</span>

      <div className="reveal" style={{ textAlign: 'right' }}>
        <div className="section-label">/ 02 — MY VIBE</div>
        <h2 className="section-title">Personality</h2>
      </div>
      <div className="two-col two-col-rev">
        <div className="col-txt reveal-left">
          <div className="glass about-card card-hover-bright spotlight-card">
            <div className="about-num">02</div>
            <h3
              id="personality-typewriter"
              className="tw-cursor"
              style={{
                fontFamily: 'var(--font-d)',
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '14px',
                color: 'var(--green)',
                height: '2rem',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                display: 'block'
              }}
            >
              {typewriterText}
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '12px', fontSize: '0.9rem' }}>
              Gue demen banget ngulik teknologi, desain sama editing.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '12px', fontSize: '0.9rem' }}>
              Di luar desain, hobi gue biasa aja — mainin komputer, buka instagram, ngulik hal random kayak belajar linux, hacking, dll. Bosen parah! <em>temen aja cuma dikit</em>
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.9rem' }}>
              Yahh.. walaupun sering natap layar, gue tetap waras yah.
            </p>
          </div>
        </div>
        <div className="col-img reveal-right">
          <div
            className="flip-card"
            id="flip-person"
            onClick={(e) => handleFlip(e.currentTarget)}
            onTouchStart={(e) => {
              e.currentTarget._tx = e.touches[0].clientX;
              e.currentTarget._ty = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - (e.currentTarget._tx || 0);
              const dy = e.changedTouches[0].clientY - (e.currentTarget._ty || 0);
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                e.currentTarget.classList.toggle('flipped', dx < 0);
                onFlipCard?.();
              }
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img loading="lazy" src="/img/profil/profil2.jpg" alt="Mikhayl" className="about-photo" />
                <div className="flip-hint">klik / tap untuk flip ✦</div>
              </div>
              <div className="flip-card-back">
                <div className="flip-num">02</div>
                <div className="flip-emoji">{cfg.emoji || '🎭'}</div>
                <div className="flip-title">{cfg.judul || 'Vibes Gw'}</div>
                <p className="flip-body">{cfg.isi}</p>
                <div className="flip-chips">
                  {(cfg.chips || []).map((c, i) => (
                    <span key={i} className="chip">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

