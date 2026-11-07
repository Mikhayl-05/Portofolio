import React, { useRef } from 'react';
import { CONFIG_PROFIL } from '../data/config.js';

export default function Contact({ onUnlockMobileEgg, onShowEasterEgg, onSpawnFireworks, onOpenGuestbook, playClick, triggerHaptic }) {
  const tapCountRef = useRef(0);
  const pressTimerRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    tapCountRef.current += 1;

    if (tapCountRef.current === 10) {
      onUnlockMobileEgg();
      onShowEasterEgg({
        text: '🥚 SECRET UNLOCKED!\nLo nemu hidden easter egg button!\nTombol 🥚 sekarang aktif di pojok kanan bawah.\n\nGw tau lo penasaran banget.. 👀'
      });
      if (window.confetti) {
        window.confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
      }
      tapCountRef.current = 0;
      return;
    }

    const rc = e.currentTarget.getBoundingClientRect();
    const cx = rc.left + rc.width / 2;
    const cy = rc.top + rc.height / 2;

    if (onSpawnFireworks) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          onSpawnFireworks(cx + (Math.random() - 0.5) * 120, cy + (Math.random() - 0.5) * 80);
        }, i * 200);
      }
    }

    if (window.confetti) {
      window.confetti({
        particleCount: 60,
        spread: 80,
        origin: { x: cx / window.innerWidth, y: cy / window.innerHeight }
      });
    }

    setTimeout(() => {
      window.open(CONFIG_PROFIL.sosial.trakteer, '_blank', 'noopener,noreferrer');
    }, 1200);
  };

  const startPress = () => {
    pressTimerRef.current = setTimeout(() => {
      onShowEasterEgg({
        text: '☕ LONG PRESS DETECTED!\nWahh makasih udah niat banget mau support!\nBeneran deh, itu berarti banget buat gw 🙏'
      });
    }, 1500);
  };

  const endPress = () => {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
  };

  return (
    <section id="contact" style={{ padding: '100px 20px', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
      <div className="reveal">
        <div className="section-label">/ 07 — SUPPORT</div>
        <h2 className="section-title">Support Me!</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '36px', fontSize: '0.88rem' }}>
          Suka sama karya atau project gue? Lo bisa dukung gue lewat <em>trakteer</em> biar tetap semangat bikin hal-hal baru! ☕✨
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            id="message-btn"
            href={CONFIG_PROFIL.sosial.trakteer}
            className="sup-btn"
            onClick={handleClick}
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={endPress}
          >
            ☕ &nbsp;Support via Trakteer
          </a>
          <button
            type="button"
            className="guestbook-btn"
            onClick={() => {
              playClick?.(1.1);
              triggerHaptic?.('light');
              onOpenGuestbook?.();
            }}
          >
            💬 &nbsp;Tinggalkan Jejak
          </button>
        </div>
      </div>
    </section>
  );
}

