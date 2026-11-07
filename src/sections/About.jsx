import React, { useRef, useEffect, useState } from 'react';
import NowPlayingWidget from '../components/NowPlayingWidget.jsx';
import { useTypewriter } from '../hooks/useTypewriter.js';

export default function About({
  audioRef,
  playing,
  onFlipCard,
  currentTrack,
  loopMode,
  nextTrack,
  prevTrack,
  toggleLoopMode,
  onOpenPlaylist,
}) {
  const typewriterText = useTypewriter("Hi, I'm Mikhayl 👋", 2, 95, 0);
  const cardRef = useRef(null);
  const scrollRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Sync card height with Personality section card
  useEffect(() => {
    const syncHeight = () => {
      const personCard = document.querySelector('#person .about-card');
      if (personCard && cardRef.current) {
        const h = personCard.offsetHeight;
        if (h > 0) {
          cardRef.current.style.height = `${h}px`;
        }
      }
    };

    syncHeight();

    const t1 = setTimeout(syncHeight, 150);
    const t2 = setTimeout(syncHeight, 600);
    const t3 = setTimeout(syncHeight, 1500);

    let ro;
    const personCard = document.querySelector('#person .about-card');
    if (personCard && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => syncHeight());
      ro.observe(personCard);
    }

    window.addEventListener('resize', syncHeight);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', syncHeight);
    };
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const reachedBottom = scrollTop + clientHeight >= scrollHeight - 12;
    setIsAtBottom(reachedBottom);
  };

  const handleFlip = (el, e) => {
    // If user clicked inside an interactive button or control, do not flip card
    if (
      e?.target?.closest('button') ||
      e?.target?.closest('.np-progress-wrap') ||
      e?.target?.closest('.np-playlist-trigger') ||
      e?.target?.closest('.np-ctrl-btn')
    ) {
      return;
    }
    el.classList.toggle('flipped');
    onFlipCard?.();
  };

  return (
    <section id="about" className="section-wrap">
      <span className="float-deco" style={{ '--fd-top': '7%', '--fd-left': '91%', '--fd-size': '2.2rem', '--fd-dur': '6.5s', '--fd-delay': '0s', '--fd-op': '0.18' }}>💻</span>
      <span className="float-deco" style={{ '--fd-top': '78%', '--fd-left': '2%', '--fd-size': '1.7rem', '--fd-dur': '7.2s', '--fd-delay': '-2.1s', '--fd-op': '0.14' }}>🎨</span>
      <span className="float-deco" style={{ '--fd-top': '40%', '--fd-left': '95%', '--fd-size': '1.4rem', '--fd-dur': '5.3s', '--fd-delay': '-3.7s', '--fd-op': '0.12' }}>📸</span>
      <span className="float-deco" style={{ '--fd-top': '22%', '--fd-left': '4%', '--fd-size': '1.2rem', '--fd-dur': '8s', '--fd-delay': '-1.5s', '--fd-op': '0.10' }}>⚙️</span>

      <div className="reveal">
        <div className="section-label">/ 01 — WHO AM I</div>
        <h2 className="section-title">About Me</h2>
      </div>
      <div className="two-col">
        <div className="col-img reveal-left">
          <div
            className="flip-card"
            id="flip-about"
            onClick={(e) => handleFlip(e.currentTarget, e)}
            onTouchStart={(e) => {
              e.currentTarget._tx = e.touches[0].clientX;
              e.currentTarget._ty = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              if (
                e.target.closest('button') ||
                e.target.closest('.np-progress-wrap') ||
                e.target.closest('.np-playlist-trigger') ||
                e.target.closest('.np-ctrl-btn')
              ) {
                return;
              }
              const dx = e.changedTouches[0].clientX - (e.currentTarget._tx || 0);
              const dy = e.changedTouches[0].clientY - (e.currentTarget._ty || 0);
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                const willFlip = dx < 0;
                e.currentTarget.classList.toggle('flipped', willFlip);
                onFlipCard?.();
              }
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img loading="lazy" src="/img/profil/profil1.jpg" alt="Mikhayl" className="about-photo" />
                <div className="flip-hint">klik / tap untuk flip ✦</div>
              </div>
              <div className="flip-card-back" style={{ padding: 0, background: 'var(--bg2)' }}>
                <NowPlayingWidget
                  audioRef={audioRef}
                  playing={playing}
                  currentTrack={currentTrack}
                  loopMode={loopMode}
                  nextTrack={nextTrack}
                  prevTrack={prevTrack}
                  toggleLoopMode={toggleLoopMode}
                  onOpenPlaylist={onOpenPlaylist}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-txt reveal-right">
          <div
            ref={cardRef}
            className="glass about-card card-hover-bright spotlight-card about-card-sync"
          >
            <div className="about-num">01</div>
            <h3
              id="about-typewriter"
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
                display: 'block',
                flexShrink: 0,
              }}
            >
              {typewriterText}
            </h3>

            <div
              ref={scrollRef}
              className="about-card-scroll"
              onScroll={handleScroll}
            >
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '12px', fontSize: '0.9rem' }}>
                Aku adalah salah satu keturunan jauh Atlas, sang Titan yang ditakdirkan menopang langit. Sayangnya, aku tidak mewarisi kekuatan untuk memikul langit, melainkan kebiasaan memikul terlalu banyak rasa penasaran.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '12px', fontSize: '0.9rem' }}>
                Lahir di Jakarta dan saat ini masih berstatus sebagai pelajar. Aku senang mengeksplorasi berbagai hal, terutama teknologi, komputer, Linux, desain grafis, fotografi, videografi, dan berbagai bidang lain yang terkadang membuatku lupa waktu.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '12px', fontSize: '0.9rem' }}>
                Saat ini, aku sedang berusaha mengembangkan kemampuan yang kumiliki. Barangkali, tidak semua keturunan Titan harus menopang langit. Sebagian cukup membantu membangun dunia kecilnya sendiri.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.9rem' }}>
                Oh iya, Mikhayl itu nama samaran. Atlas tidak pernah mengakui silsilah keluarga kami. Hehe :)
              </p>
              <div className="chips-row" style={{ marginTop: '12px', paddingBottom: '6px' }}>
                <span className="chip">Jakarta 🗺️</span>
                <span className="chip">Student 📚</span>
                <span className="chip">Creator ✨</span>
              </div>
            </div>

            {/* Gradient Fade Indicator at bottom showing text is clipped/scrollable */}
            <div className={`about-card-fade ${isAtBottom ? 'hidden' : ''}`}>
              <span className="about-scroll-hint">scroll ↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
