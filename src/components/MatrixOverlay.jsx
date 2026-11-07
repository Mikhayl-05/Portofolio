import React, { useEffect, useRef, useState } from 'react';

export default function MatrixOverlay({ active, onClose }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    if (!active) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF'.split('');
    const FS = 14;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const drops = Array(Math.floor(canvas.width / FS)).fill(0).map(() => Math.random() * canvas.height / FS | 0);

    let running = true;
    function frame() {
      if (!running) return;
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FS}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        ctx.fillStyle = drops[i] * FS < canvas.height * .1 ? '#fff' : `rgba(57,255,20,${Math.random() * .4 + .6})`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, drops[i] * FS);
        if (drops[i] * FS > canvas.height && Math.random() > .975) drops[i] = 0;
        drops[i]++;
      }
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => { running = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape' && active) onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, onClose]);

  return (
    <div id="matrix-overlay" className={active ? 'active' : ''}
      onClick={e => { if (e.target === e.currentTarget || e.target === canvasRef.current) onClose(); }}>
      <canvas id="matrix-canvas" ref={canvasRef}></canvas>
      <button className="matrix-close-hint" id="close-matrix" onClick={onClose}>
        [ ESC / TAP TO EXIT MATRIX ]
      </button>
    </div>
  );
}

