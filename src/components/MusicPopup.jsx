import React, { useEffect, useRef } from 'react';

export default function MusicPopup({ onPlay, onClose }) {
  const elRef = useRef(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      if (elRef.current) elRef.current.classList.add('visible');
    });
    return () => cancelAnimationFrame(t);
  }, []);

  const handleAction = (callback) => {
    if (elRef.current) {
      elRef.current.classList.remove('visible');
    }
    setTimeout(() => {
      callback();
    }, 350);
  };

  return (
    <div id="music-popup" ref={elRef}>
      <div id="music-box">
        <button id="music-close" className="modal-close" onClick={() => handleAction(onClose)}>&times;</button>
        <div style={{ fontSize:'2rem', marginBottom:'10px' }}>🎵</div>
        <h2 style={{ fontFamily:'var(--font-d)', fontWeight:700, fontSize:'1.2rem', marginBottom:'8px' }}>
          Play background music?
        </h2>
        <p style={{ color:'var(--text-muted)', fontSize:'0.82rem', marginBottom:'20px', lineHeight:1.6 }}>
          Buat pengalaman terbaik explore portfolio ini
        </p>
        <button id="music-ok" className="sup-btn" style={{ width:'100%' }} onClick={() => handleAction(onPlay)}>
          ▶ &nbsp;Play Music
        </button>
      </div>
    </div>
  );
}

