import React, { useState, useEffect, useRef } from 'react';

const SURPRISE_QUOTES = [
  '✨ Hoki hari ini: +100% ide kreatif & zero compile error!',
  '🎮 Fun Quote: "Belajar komputer bikin elu keliatan keren!" 🚀',
  '☕ Keren! Lo nemuin fitur rahasia Pull-to-Surprise!',
  '🐧 Tip Linux: "sudo apt update && sudo apt install happiness" 🚀',
  '🎵 Vibes Hari Ini: "About You — The 1975" on repeat! 🎧',
  '🌟 Semangat! Selalu ada hal seru yang menunggu untuk dioprek hari ini.'
];

export default function PullToSurprise({ onSurprise, playSuccess, triggerHaptic }) {
  const [pullProgress, setPullProgress] = useState(0); // 0 to 1
  const [active, setActive] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const touchStartRef = useRef(0);
  const isPullingRef = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (window.pageYOffset <= 3) {
        touchStartRef.current = e.touches[0].clientY;
        isPullingRef.current = true;
      } else {
        isPullingRef.current = false;
      }
    };

    const handleTouchMove = (e) => {
      if (!isPullingRef.current) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartRef.current;

      if (diff > 10 && window.pageYOffset <= 3) {
        setActive(true);
        const progress = Math.min(1.2, diff / 85);
        setPullProgress(progress);
        setTriggered(progress >= 1);
      } else {
        setActive(false);
        setPullProgress(0);
        setTriggered(false);
      }
    };

    const handleTouchEnd = () => {
      if (isPullingRef.current && triggered) {
        // Trigger surprise!
        triggerHaptic?.('surprise');
        playSuccess?.();

        if (window.confetti) {
          window.confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.18 }
          });
        }

        const randomQuote = SURPRISE_QUOTES[Math.floor(Math.random() * SURPRISE_QUOTES.length)];
        setToastMsg(randomQuote);
        onSurprise?.(randomQuote);

        setTimeout(() => {
          setToastMsg(null);
        }, 4500);
      }

      isPullingRef.current = false;
      setActive(false);
      setPullProgress(0);
      setTriggered(false);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [triggered, triggerHaptic, playSuccess, onSurprise]);

  return (
    <>
      {/* Pull down indicator pill */}
      <div
        id="pull-indicator"
        className={`${active ? 'active' : ''} ${triggered ? 'triggered' : ''}`}
        style={{
          transform: `translateX(-50%) translateY(${active ? pullProgress * 25 : -25}px)`
        }}
      >
        <span>{triggered ? '✨' : '↓'}</span>
        <span>{triggered ? 'Lepaskan sekarang!' : 'Tarik untuk kejutan'}</span>
      </div>

      {/* Surprise popup toast */}
      {toastMsg && (
        <div className="surprise-toast" onClick={() => setToastMsg(null)}>
          <div style={{ fontSize: '1.2rem', marginBottom: '6px' }}>🎉 SURPRISE!</div>
          <div style={{ fontFamily: 'var(--font-m)', fontSize: '0.78rem', color: 'var(--green)', lineHeight: 1.6 }}>
            {toastMsg}
          </div>
          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            [ tap untuk tutup ]
          </div>
        </div>
      )}
    </>
  );
}

