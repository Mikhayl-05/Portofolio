import React, { useState, useEffect, useRef } from 'react';
import { EE_MOBILE_MENU } from '../data/config.js';

export default function MobileEggMenu({ onTrigger, unlocked }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  function openMenu() { setMenuOpen(true); requestAnimationFrame(() => setVisible(true)); }
  function closeMenu() { setVisible(false); setTimeout(() => setMenuOpen(false), 250); }

  useEffect(() => {
    const handler = e => {
      if (menuOpen && !e.target.closest('#mobile-ee-menu') && e.target.id !== 'mobile-ee-btn') closeMenu();
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [menuOpen]);

  if (!unlocked) return null;

  return (
    <>
      <button id="mobile-ee-btn" className="unlocked"
        style={{ display: 'flex' }}
        onClick={e => { e.stopPropagation(); menuOpen ? closeMenu() : openMenu(); }}>
        {menuOpen ? '✕' : '🥚'}
      </button>
      {menuOpen && (
        <div id="mobile-ee-menu" className={`open${visible ? ' visible' : ''}`}>
          {EE_MOBILE_MENU.map(item => (
            <button key={item.keyword} className="mob-ee-item" data-ee={item.keyword}
              onClick={() => { closeMenu(); onTrigger(item.keyword); }}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

