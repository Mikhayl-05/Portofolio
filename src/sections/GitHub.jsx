import React, { useState, useEffect, useMemo } from 'react';
import { CONFIG_PROFIL } from '../data/config.js';
import { initSpotlightCards } from '../effects/premiumEffects.js';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  TypeScript: '#2b7489',
  Shell: '#89e051',
  PHP: '#4F5D95',
  Java: '#b07219',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  Vue: '#41b883',
  default: '#7a8599'
};

function timeAgoGH(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'baru saja';
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} hari lalu`;
  return `${Math.floor(days / 7)} minggu lalu`;
}

function getEventLabel(ev) {
  switch (ev.type) {
    case 'PushEvent': {
      const commits = ev.payload?.commits || [];
      const msg = commits[0]?.message?.split('\n')[0] || 'push commit';
      return { icon: '⚡', action: 'Push', repo: ev.repo?.name?.split('/')[1] || ev.repo?.name, detail: `"${msg.slice(0, 60)}${msg.length > 60 ? '…' : ''}"` };
    }
    case 'CreateEvent':
      return { icon: '🌱', action: 'Buat', repo: ev.repo?.name?.split('/')[1] || ev.repo?.name, detail: ev.payload?.ref ? `branch ${ev.payload.ref}` : 'repo baru' };
    case 'WatchEvent':
      return { icon: '⭐', action: 'Star', repo: ev.repo?.name?.split('/')[1] || ev.repo?.name, detail: 'repo' };
    case 'ForkEvent':
      return { icon: '🍴', action: 'Fork', repo: ev.repo?.name?.split('/')[1] || ev.repo?.name, detail: '' };
    case 'PullRequestEvent':
      return { icon: '🔀', action: ev.payload?.action === 'opened' ? 'Buka PR' : 'Update PR', repo: ev.repo?.name?.split('/')[1] || ev.repo?.name, detail: `"${ev.payload?.pull_request?.title?.slice(0, 50) || ''}"` };
    case 'IssuesEvent':
      return { icon: '🐛', action: ev.payload?.action === 'opened' ? 'Buka Issue' : 'Update Issue', repo: ev.repo?.name?.split('/')[1] || ev.repo?.name, detail: '' };
    default:
      return { icon: '📌', action: ev.type?.replace('Event', ''), repo: ev.repo?.name?.split('/')[1] || ev.repo?.name, detail: '' };
  }
}

export default function GitHub() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [events, setEvents] = useState([]);
  const [evLoading, setEvLoading] = useState(true);

  const UNAME = CONFIG_PROFIL.username_gh;
  const MAX = 2;

  useEffect(() => {
    let active = true;
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${UNAME}/repos?sort=updated&per_page=9`);
        if (!res.ok) throw new Error('fail');
        const data = await res.json();
        const filtered = (Array.isArray(data) ? data : []).filter(r => !r.fork).slice(0, 9);
        if (!filtered.length) throw new Error('empty');
        if (active) {
          setRepos(filtered);
          setLoading(false);
          setTimeout(() => initSpotlightCards(), 150);
        }
      } catch (err) {
        if (active) {
          setError(true);
          setLoading(false);
        }
      }
    }
    fetchRepos();
    return () => { active = false; };
  }, [UNAME]);

  // Live Activity Events
  useEffect(() => {
    let active = true;
    async function fetchEvents() {
      try {
        const res = await fetch(`https://api.github.com/users/${UNAME}/events/public?per_page=10`);
        if (!res.ok) throw new Error('fail');
        const data = await res.json();
        if (active) {
          setEvents(Array.isArray(data) ? data.slice(0, 6) : []);
          setEvLoading(false);
        }
      } catch {
        if (active) setEvLoading(false);
      }
    }
    fetchEvents();
    return () => { active = false; };
  }, [UNAME]);

  // Contribution graph matrix: 52 weeks x 7 days
  const contribMatrix = useMemo(() => {
    const weeks = [];
    for (let w = 0; w < 52; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const r = Math.random();
        const level = r > 0.88 ? 'l4' : r > 0.68 ? 'l3' : r > 0.48 ? 'l2' : r > 0.28 ? 'l1' : '';
        days.push(level);
      }
      weeks.push(days);
    }
    return weeks;
  }, []);

  const toShow = showAll ? repos : repos.slice(0, MAX);

  return (
    <section id="github" className="section-wrap">
      <div className="reveal">
        <div className="section-label">/ 05 — OPEN SOURCE</div>
        <h2 className="section-title">GitHub Projects</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '-28px', marginBottom: '32px' }}>
          Project & eksperimen yang gw build dan share
        </p>
      </div>

      {/* GitHub Profile Strip */}
      <div className="glass gh-profile-strip reveal card-hover-bright" style={{ borderRadius: '16px', marginBottom: '24px' }}>
        <img
          loading="lazy"
          src="/img/profil/profil.jpg"
          alt="GitHub"
          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--green-dim)', flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1rem' }}>{UNAME}</div>
          <div style={{ fontFamily: 'var(--font-m)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '2px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            github.com/{UNAME}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}></div>
        <a
          href={`https://github.com/${UNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="sup-btn"
          style={{ fontSize: '0.72rem', padding: '9px 18px', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          View Profile
        </a>
      </div>

      {/* Repos Grid */}
      <div className="gh-repos reveal" id="github-repos">
        {loading && (
          <>
            <div className="gh-skeleton"></div>
            <div className="gh-skeleton"></div>
            <div className="gh-skeleton"></div>
          </>
        )}

        {error && (
          <div className="glass" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '36px 20px', borderRadius: '16px' }}>
            <div style={{ fontFamily: 'var(--font-m)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '2px', lineHeight: 2 }}>
              📡 Lihat project GitHub gw di sini:<br />
              <a href={`https://github.com/${UNAME}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>
                github.com/{UNAME}
              </a>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {toShow.map(r => (
              <a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-card glass card-hover-green"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.name}
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {r.description || 'No description'}
                    </p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  {r.language && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span className="lang-dot" style={{ background: LANG_COLORS[r.language] || LANG_COLORS.default }}></span>
                      <span className="gh-stat">{r.language}</span>
                    </div>
                  )}
                  <div className="gh-stat">⭐ {r.stargazers_count}</div>
                  <div className="gh-stat">🍴 {r.forks_count}</div>
                  {r.topics && r.topics.length > 0 && (
                    <span className="chip" style={{ fontSize: '0.5rem', padding: '2px 7px' }}>
                      {r.topics[0]}
                    </span>
                  )}
                </div>
              </a>
            ))}

            {/* "Tampilkan lebih banyak" button inside card */}
            {!showAll && repos.length > MAX && (
              <div
                id="gh-more-card"
                className="github-card glass card-hover-green"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px', textAlign: 'center' }}
                onClick={() => setShowAll(true)}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📂</div>
                <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--green)', marginBottom: '4px' }}>
                  Tampilkan lebih banyak
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                  {repos.length - MAX} repo lainnya
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* "Tampilkan lebih sedikit" toggle */}
      {showAll && (
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <button
            className="toggle-btn"
            onClick={() => {
              setShowAll(false);
              const el = document.getElementById('github');
              if (el) {
                window.scrollTo({
                  top: el.getBoundingClientRect().top + window.pageYOffset - 90,
                  behavior: 'smooth'
                });
              }
            }}
          >
            ↑ Tampilkan lebih sedikit
          </button>
        </div>
      )}

      {/* Contribution Activity Graph */}
      <div className="glass reveal card-hover-bright" style={{ borderRadius: '16px', padding: '24px', marginTop: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-m)', fontSize: '0.62rem', letterSpacing: '2px', color: 'var(--text-muted)' }}>
            CONTRIBUTION ACTIVITY
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-m)', fontSize: '0.58rem', color: 'var(--text-muted)' }}>
            Less
            <div className="contrib-cell"></div>
            <div className="contrib-cell l1"></div>
            <div className="contrib-cell l2"></div>
            <div className="contrib-cell l3"></div>
            <div className="contrib-cell l4"></div>
            More
          </div>
        </div>
        <div id="contrib-graph" style={{ overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
          <div style={{ display: 'flex', gap: '3px', minWidth: 'max-content' }}>
            {contribMatrix.map((week, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {week.map((level, di) => (
                  <div key={di} className={`contrib-cell ${level}`} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live GitHub Activity Feed */}
      <div className="glass reveal card-hover-bright gh-live-feed" style={{ borderRadius: '16px', padding: '24px', marginTop: '24px' }}>
        <div className="gh-live-header">
          <div className="gh-live-dot" />
          <span style={{ fontFamily: 'var(--font-m)', fontSize: '0.62rem', letterSpacing: '2px', color: 'var(--text-muted)' }}>
            LIVE ACTIVITY FEED
          </span>
          <span className="gh-live-badge">REAL-TIME</span>
        </div>

        {evLoading && (
          <div className="gh-live-skeleton-wrap">
            {[1,2,3].map(i => <div key={i} className="gh-live-skeleton" />)}
          </div>
        )}

        {!evLoading && events.length === 0 && (
          <div className="gh-live-empty">
            📡 Tidak ada aktivitas publik terbaru ditemukan.<br />
            <a href={`https://github.com/${UNAME}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>
              Lihat langsung di GitHub →
            </a>
          </div>
        )}

        {!evLoading && events.length > 0 && (
          <div className="gh-live-list">
            {events.map((ev, i) => {
              const { icon, action, repo, detail } = getEventLabel(ev);
              const repoUrl = `https://github.com/${ev.repo?.name}`;
              return (
                <a
                  key={ev.id || i}
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gh-live-item"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="gh-live-icon">{icon}</span>
                  <div className="gh-live-body">
                    <span className="gh-live-action">{action}</span>
                    {' '}ke{' '}
                    <span className="gh-live-repo">{repo}</span>
                    {detail && <span className="gh-live-detail"> — {detail}</span>}
                  </div>
                  <span className="gh-live-time">{timeAgoGH(ev.created_at)}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

