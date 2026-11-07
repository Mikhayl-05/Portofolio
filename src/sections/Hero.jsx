import React, { useMemo } from 'react';
import SnakeCanvas from '../components/SnakeCanvas.jsx';
import { CONFIG_PROFIL } from '../data/config.js';

export default function Hero({ onHeroNameDblClick, onAvatarClick }) {
  // Dynamic Time-Based Greeting without emojis
  const greeting = useMemo(() => {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 11) return 'Selamat Pagi · Exploring & Building';
    if (hr >= 11 && hr < 15) return 'Selamat Siang · In The Flow';
    if (hr >= 15 && hr < 18) return 'Sore Senja Surabaya · Creative Hours';
    return 'Begadang Mode · Nocturnal Coding';
  }, []);

  return (
    <section id="hero">
      <div className="hero-aurora"></div>
      <div className="hero-spotlight" id="hero-spotlight"></div>
      <div className="hero-beam"></div>
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="hero-grad"></div>
      <SnakeCanvas />
      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          className="avatar-ring"
          onClick={onAvatarClick}
          style={{ cursor: 'pointer' }}
          title="Klik foto profil!"
        >
          <img src={CONFIG_PROFIL.foto_hero} alt="Mikhayl" />
        </div>
        <div className="hero-badge">{greeting}</div>
        <h1
          className="hero-name"
          data-text="MIKHAYL"
          onDoubleClick={onHeroNameDblClick}
          style={{ cursor: 'pointer' }}
          title="Double-click me!"
        >
          MIKHAYL
        </h1>
        <p className="hero-sub">{CONFIG_PROFIL.sub_title}</p>
        <div className="social-row">
          <a
            href={CONFIG_PROFIL.sosial.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title="Instagram"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </a>
          <a
            href={CONFIG_PROFIL.sosial.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title="WhatsApp"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48A11.946 11.946 0 0012 0C5.373 0 0 5.373 0 12c0 2.109.554 4.082 1.516 5.844L0 24l6.408-1.513A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12 0-3.195-1.25-6.186-3.48-8.52zm-2.27 13.49c-.193.54-1.129 1.027-1.588 1.086-.425.053-.956.074-2.414-.68-3.284-1.454-5.406-5.107-5.556-5.354-.15-.248-1.268-1.842-1.268-3.515 0-1.673.879-2.494 1.19-2.833.31-.339.677-.423.902-.423.226 0 .447.003.642.007.21.005.492-.08.77.588.277.668.944 2.315 1.028 2.488.083.174.138.38.003.614-.135.233-.203.38-.405.59-.202.21-.426.468-.608.63-.202.181-.417.381-.298.646.119.264.527 1.072 1.13 1.736.78.842 1.446 1.126 1.667 1.255.22.129.347.108.475-.065.128-.174.548-.64.693-.857.145-.218.294-.18.507-.107.212.073 1.336.63 1.562.743.226.114.377.17.433.266.057.096.057.554-.136 1.093z" />
            </svg>
          </a>
          <a
            href={`https://github.com/${CONFIG_PROFIL.username_gh}`}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title="GitHub"
            id="hero-github-link"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="scroll-hint">
        <span>scroll</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 12L2 6h12z" />
        </svg>
      </div>
    </section>
  );
}
