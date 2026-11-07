import React, { useRef, useEffect } from 'react';

export default function EasterEggPopup({ cmd, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Cleanup video on close
    return () => {
      if (videoRef.current) { videoRef.current.pause(); }
    };
  }, [cmd]);

  if (!cmd) return null;

  return (
    <div id="easter-egg" onClick={e => { if (e.target === e.currentTarget || e.target.id === 'ee-backdrop') onClose(); }}>
      <div id="ee-backdrop" onClick={onClose}></div>
      <div className="ee-box" id="ee-box">
        <div className="ee-label">🎉 Easter Egg Found!</div>
        <p id="ee-text" style={{ color:'var(--text-muted)', marginBottom:'16px', lineHeight:1.75, fontSize:'0.85rem', whiteSpace:'pre-line' }}>
          {cmd.text || ''}
        </p>
        {cmd.img && (
          <img src={cmd.img} style={{ display:'block', maxHeight:'210px', width:'100%', objectFit:'cover', borderRadius:'10px', marginBottom:'16px' }} alt="" />
        )}
        {cmd.video && (
          <video ref={videoRef} src={cmd.video} controls autoPlay
            style={{ maxWidth:'100%', borderRadius:'10px', marginBottom:'12px', display:'block' }} />
        )}
        <button id="close-ee" className="sup-btn" style={{ fontSize:'0.78rem', padding:'10px 22px' }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

