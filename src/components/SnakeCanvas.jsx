import React, { useEffect, useRef } from 'react';

export default function SnakeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sc = canvasRef.current;
    if (!sc) return;
    const ctx = sc.getContext('2d');
    const SZ = 18;
    let W, H, cols, rows;

    function resize() {
      W = sc.width  = sc.parentElement?.offsetWidth  || window.innerWidth;
      H = sc.height = sc.parentElement?.offsetHeight || window.innerHeight;
      cols = Math.floor(W / SZ);
      rows = Math.floor(H / SZ);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function mkSnake() {
      const cx = Math.floor(cols / 2), cy = Math.floor(rows / 2);
      return [{ x: cx, y: cy }, { x: cx - 1, y: cy }, { x: cx - 2, y: cy }];
    }
    function rf() { return { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }; }

    let snake = mkSnake(), dx = 1, dy = 0, food = rf(), growPending = 0;

    function step() {
      if (Math.random() < 0.06) {
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]].filter(([nx,ny]) => !(nx === -dx && ny === -dy));
        [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
      }
      const nx = ((snake[0].x + dx) + cols) % cols;
      const ny = ((snake[0].y + dy) + rows) % rows;
      if (snake.some(s => s.x === nx && s.y === ny)) { snake = mkSnake(); dx = 1; dy = 0; growPending = 0; food = rf(); return; }
      snake.unshift({ x: nx, y: ny });
      if (nx === food.x && ny === food.y) { growPending += 4; food = rf(); }
      if (growPending > 0) growPending--; else snake.pop();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.shadowColor = '#39FF14'; ctx.shadowBlur = 10; ctx.fillStyle = '#39FF14';
      ctx.fillRect(food.x * SZ + SZ * .25, food.y * SZ + SZ * .25, SZ * .5, SZ * .5);
      ctx.shadowBlur = 0;
      snake.forEach((seg, i) => {
        const r = 1 - i / snake.length;
        ctx.globalAlpha = r * .8;
        ctx.fillStyle = i === 0 ? '#39FF14' : `rgba(57,255,20,${.3 + r * .5})`;
        ctx.beginPath();
        const pad = i === 0 ? 1 : 2, s = SZ - pad * 2;
        ctx.roundRect(seg.x * SZ + pad, seg.y * SZ + pad, s, s, 3);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    let lastT = 0, rafId;
    function loop(ts) {
      if (ts - lastT >= 150) { step(); draw(); lastT = ts; }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="snake-canvas" ref={canvasRef}></canvas>;
}

