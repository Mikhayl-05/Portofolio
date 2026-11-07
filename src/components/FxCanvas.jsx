import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const FxCanvas = forwardRef(function FxCanvas(_, ref) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ fxParts: [], fxFW: [], fxAnimate: false, W: 0, H: 0 });

  useImperativeHandle(ref, () => ({
    spawnFW(x, y) {
      const s = stateRef.current;
      const h = Math.random() * 360;
      s.fxAnimate = true;
      for (let i = 0; i < 65; i++) {
        s.fxFW.push({ x, y, r: Math.random() * 2.5 + 1, c: `hsl(${h},100%,60%)`, vx: (Math.random() - .5) * 13, vy: (Math.random() - .5) * 13, a: 1, d: Math.random() * .025 + .01 });
      }
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    function resize() { s.W = canvas.width = window.innerWidth; s.H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function spawnStar() {
      if (s.fxParts.length < 3)
        s.fxParts.push({ x: Math.random() * s.W, y: -8, r: Math.random() * 1.5 + .5, spd: Math.random() * 1.5 + .4, a: Math.random() * .5 + .3 });
    }

    let rafId;
    function loop() {
      ctx.clearRect(0, 0, s.W, s.H);
      if (!s.fxAnimate) spawnStar();
      s.fxParts = s.fxParts.filter(p => {
        p.y += p.spd; p.a -= .0015;
        if (p.a <= 0 || p.y > s.H) return false;
        ctx.globalAlpha = p.a; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
        return true;
      });
      s.fxFW = s.fxFW.filter(f => {
        f.x += f.vx; f.y += f.vy; f.a -= f.d;
        if (f.a <= 0) return false;
        ctx.globalAlpha = f.a; ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fillStyle = f.c; ctx.fill();
        return true;
      });
      if (!s.fxFW.length) s.fxAnimate = false;
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas id="fx-canvas" ref={canvasRef}></canvas>;
});

export default FxCanvas;

