import React from 'react';

const SKILLS = [
  {
    id: 1,
    title: 'Videografi / Fotografi',
    desc: 'Menguasai fotografi & videografi, pencahayaan, komposisi, dan pengambilan gambar dan video yang cukup profesional.',
    icon: 'https://img.icons8.com/color/96/camera.png',
    label: 'Videografi / Foto',
    sub: 'Fotografi, videografi, pencahayaan & komposisi',
    featured: true,
    delay: 'd1'
  },
  {
    id: 2,
    title: 'Editing',
    desc: 'Kemampuan editing desain, video & foto menggunakan software seperti Alight Motion.',
    icon: 'https://img.icons8.com/color/96/video.png',
    label: 'Editing',
    featured: false,
    delay: 'd2'
  },
  {
    id: 3,
    title: 'Graphic Design',
    desc: 'Desain grafis kreatif, ilustrasi, branding, dan pembuatan konten visual menarik.',
    icon: 'https://img.icons8.com/color/96/paint-palette.png',
    label: 'Graphic Design',
    featured: false,
    delay: 'd3'
  },
  {
    id: 4,
    title: 'Computer & Tech',
    desc: 'Kemampuan menggunakan komputer, software, internet, dan dasar teknologi seperti Linux untuk kebutuhan kerja & produktivitas.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png',
    label: 'Computer',
    featured: false,
    delay: 'd4'
  }
];

export default function Skills({ onSelectSkill }) {
  return (
    <section id="otherskills" className="section-wrap">
      <div className="reveal">
        <div className="section-label">/ 06 — EXPERTISE</div>
        <h2 className="section-title">Main Skills</h2>
      </div>
      <div className="bento-grid">
        {SKILLS.map(skill => (
          <div
            key={skill.id}
            className={`skill-item bento-card ${skill.featured ? 'bento-card--featured ' : ''}reveal ${skill.delay}`}
            onClick={() => onSelectSkill(skill.title, skill.desc)}
          >
            <img
              loading="lazy"
              src={skill.icon}
              alt={skill.title}
              style={{
                width: skill.featured ? '52px' : '42px',
                height: skill.featured ? '52px' : '42px',
                margin: skill.featured ? '0 auto 14px' : '0 auto 10px',
                display: 'block'
              }}
            />
            <div
              style={{
                fontFamily: 'var(--font-d)',
                fontWeight: skill.featured ? 700 : 600,
                fontSize: skill.featured ? '1rem' : '0.85rem'
              }}
            >
              {skill.label}
            </div>
            {skill.sub && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.6 }}>
                {skill.sub}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

