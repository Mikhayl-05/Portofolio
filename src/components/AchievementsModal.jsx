import React, { useState } from 'react';
import { ACHIEVEMENTS } from '../hooks/useAchievements.js';

/* ============================================================
   AchievementsModal — Hub Lencana Tersembunyi
   Muncul setelah achievement pertama / klik logo 5×
   ============================================================ */
export default function AchievementsModal({ isOpen, onClose, unlocked }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'unlocked' | 'locked'

  if (!isOpen) return null;

  const total = ACHIEVEMENTS.length;
  const unlockedCount = unlocked.length;
  const pct = Math.round((unlockedCount / total) * 100);

  const filtered = ACHIEVEMENTS.filter((a) => {
    if (filter === 'unlocked') return unlocked.includes(a.id);
    if (filter === 'locked') return !unlocked.includes(a.id);
    return true;
  });

  return (
    <div className="ach-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ach-modal">
        {/* Header */}
        <div className="ach-header">
          <div className="ach-header__icon">🏆</div>
          <div>
            <div className="ach-header__title">Achievement Hub</div>
            <div className="ach-header__sub">Jejak eksplorasi kamu di portofolio ini</div>
          </div>
          <button className="ach-close-btn" onClick={onClose} aria-label="close">×</button>
        </div>

        {/* Progress bar */}
        <div className="ach-progress-wrap">
          <div className="ach-progress-label">
            <span>{unlockedCount} / {total} Unlocked</span>
            <span className="ach-pct">{pct}%</span>
          </div>
          <div className="ach-progress-bar">
            <div className="ach-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="ach-tabs">
          {['all', 'unlocked', 'locked'].map((f) => (
            <button
              key={f}
              className={`ach-tab ${filter === f ? 'ach-tab--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '🗂 Semua' : f === 'unlocked' ? '✅ Unlocked' : '🔒 Locked'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="ach-grid">
          {filtered.map((a) => {
            const isUnlocked = unlocked.includes(a.id);
            return (
              <div
                key={a.id}
                className={`ach-card ${isUnlocked ? 'ach-card--unlocked' : 'ach-card--locked'}`}
              >
                <div className="ach-card__icon">
                  {isUnlocked ? a.icon : (a.secret ? '❓' : '🔒')}
                </div>
                <div className="ach-card__title">
                  {isUnlocked ? a.title : (a.secret ? '???' : a.title)}
                </div>
                <div className="ach-card__desc">
                  {isUnlocked ? a.desc : (a.secret ? 'Temukan sendiri...' : a.desc)}
                </div>
                {isUnlocked && <div className="ach-card__badge">✓</div>}
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="ach-footer-tip">
          💡 Eksplorasi seluruh portofolio untuk unlock semua achievement!
        </div>
      </div>
    </div>
  );
}

