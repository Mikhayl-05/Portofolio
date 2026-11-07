import React, { useState, useRef } from 'react';

export default function FlipCard({ id, frontImage, frontHint = 'klik / tap untuk flip ✦', backContent, className = '' }) {
  const [flipped, setFlipped] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleClick = (e) => {
    // If clicking on an interactive element inside the back (e.g. Spotify play button), don't flip unless intended
    setFlipped(prev => !prev);
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      setFlipped(dx < 0);
    }
  };

  return (
    <div
      id={id}
      className={`flip-card ${flipped ? 'flipped' : ''} ${className}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img loading="lazy" src={frontImage} alt="Mikhayl" className="about-photo" />
          <div className="flip-hint">{frontHint}</div>
        </div>
        <div className="flip-card-back">
          {backContent}
        </div>
      </div>
    </div>
  );
}

