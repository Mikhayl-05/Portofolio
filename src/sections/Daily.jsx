import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { CONFIG_FLIPCARD } from '../data/config.js';

export default function Daily({ onFlipCard }) {
  const typewriterText = useTypewriter("Sangat membosankan 🎈", 6, 95, 1400);
  const cfg = CONFIG_FLIPCARD.daily;

  const handleFlip = (el) => {
    el.classList.toggle('flipped');
    onFlipCard?.();
  };

  return (
    <section id="daily" className="section-wrap">
      <span className="float-deco" style={{ '--fd-top': '9%', '--fd-left': '93%', '--fd-size': '2rem', '--fd-dur': '7s', '--fd-delay': '-2.3s', '--fd-op': '0.17' }}>🎈</span>
      <span className="float-deco" style={{ '--fd-top': '75%', '--fd-left': '1%', '--fd-size': '1.5rem', '--fd-dur': '5.8s', '--fd-delay': '-4s', '--fd-op': '0.12' }}>🌙</span>
      <span className="float-deco" style={{ '--fd-top': '38%', '--fd-left': '96%', '--fd-size': '1.3rem', '--fd-dur': '6.5s', '--fd-delay': '-1s', '--fd-op': '0.10' }}>📱</span>

      <div className="reveal">
        <div className="section-label">/ 03 — EVERYDAY</div>
        <h2 className="section-title">Daily Life</h2>
      </div>
      <div className="two-col">
        <div className="col-img reveal-left">
          <div
            className="flip-card"
            id="flip-daily"
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
                <img loading="lazy" src="/img/profil/profil3.jpg" alt="Mikhayl" className="about-photo" />
                <div className="flip-hint">klik / tap untuk flip ✦</div>
              </div>
              <div className="flip-card-back">
                <div className="flip-num">03</div>
                <div className="flip-emoji">{cfg.emoji || '🎈'}</div>
                <div className="flip-title">{cfg.judul || 'Keseharian Gw'}</div>
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
        <div className="col-txt reveal-right">
          <div className="glass about-card card-hover-bright spotlight-card">
            <div className="about-num">03</div>
            <h3
              id="daily-typewriter"
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
              Mungkin banyak yang ngira gue wibu.. tapi seriusan, gue cuma sekedar <em>Interest</em> aja sama gayanya dan bahkan jarang nonton anime
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '12px', fontSize: '0.9rem' }}>
              Keseharian gw biasa aja soalnya kebanyakan di Pesantren, kalau di rumah ngebosenin banget. Gak bisa keluar dan hangout <em>ya karena gak ada temen</em>
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.9rem' }}>
              Intinya hidup di gua kayak kanvas, tinggal coret aja–asal jangan keluar dari batasan kanvas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

