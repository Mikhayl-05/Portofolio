import React from 'react';

export default function SkillModal({ title, desc, onClose }) {
  if (!title) return null;

  return (
    <div id="skill-modal" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div id="modal-content">
        <button id="close-modal" className="modal-close" onClick={onClose}>&times;</button>
        <div className="section-label" style={{ marginBottom: '4px' }}>Skill Detail</div>
        <h3 id="modal-title" style={{ fontFamily:'var(--font-d)', fontSize:'1.15rem', fontWeight:700, marginBottom:'10px' }}>
          {title}
        </h3>
        <p id="modal-desc" style={{ color:'var(--text-muted)', lineHeight:1.75, fontSize:'0.85rem' }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

