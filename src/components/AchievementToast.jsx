import React, { useEffect, useRef, useState } from 'react';

/* ============================================================
   AchievementToast — Pop-up kecil saat trofi didapat
   ============================================================ */
export default function AchievementToast({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (toast) {
      setExiting(false);
      setVisible(true);
    } else {
      if (visible) {
        setExiting(true);
        const t = setTimeout(() => setVisible(false), 500);
        return () => clearTimeout(t);
      }
    }
  }, [toast]);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 450);
  };

  if (!visible || !toast) return null;

  return (
    <div
      className={`ach-toast ${exiting ? 'ach-toast--exit' : 'ach-toast--enter'}`}
      onClick={handleDismiss}
      role="alert"
      aria-live="polite"
    >
      <div className="ach-toast__glow" />
      <div className="ach-toast__icon">{toast.icon}</div>
      <div className="ach-toast__body">
        <div className="ach-toast__label">🏆 Achievement Unlocked!</div>
        <div className="ach-toast__title">{toast.title}</div>
        <div className="ach-toast__desc">{toast.desc}</div>
      </div>
      <button className="ach-toast__close" onClick={handleDismiss} aria-label="close">×</button>
    </div>
  );
}

