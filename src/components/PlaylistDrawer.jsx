import React, { useEffect, useState } from 'react';

// Clean Minimalist SVG Icons
const IconPrev = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const IconNext = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const IconPlay = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const IconPause = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

const IconRepeatAll = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const IconRepeatOne = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    <path d="M11 11.5l1.5-1v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PlaylistDrawer({
  isOpen,
  onClose,
  playlist = [],
  currentIndex = 0,
  playing = false,
  loopMode = 'all',
  onSelectTrack,
  onTogglePlay,
  onNext,
  onPrev,
  onToggleLoop,
  playClick,
}) {
  const [toastMsg, setToastMsg] = useState(null);
  const [detectedDurations, setDetectedDurations] = useState({});

  // Auto-detect duration for any tracks that don't have one specified
  useEffect(() => {
    playlist.forEach((track, idx) => {
      if (!track.durasi || track.durasi === '--:--') {
        const audio = new Audio(track.file);
        audio.preload = 'metadata';
        audio.onloadedmetadata = () => {
          if (audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity) {
            const m = Math.floor(audio.duration / 60);
            const s = Math.floor(audio.duration % 60).toString().padStart(2, '0');
            setDetectedDurations((prev) => ({ ...prev, [idx]: `${m}:${s}` }));
          }
        };
        audio.onerror = () => {
          // File might be added later by user
        };
      }
    });
  }, [playlist]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentTrack = playlist[currentIndex] || {};

  const handleLoopToggle = () => {
    playClick?.(1.2);
    onToggleLoop?.();
    const nextMode = loopMode === 'single' ? 'all' : 'single';
    setToastMsg(nextMode === 'single' ? 'Loop: 1 Lagu Saja' : 'Loop: Putar Semua Lagu');
    setTimeout(() => setToastMsg(null), 2000);
  };

  return (
    <div className="playlist-backdrop" onClick={onClose}>
      <div
        className="playlist-drawer glass spotlight-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Confirmation Toast inside Drawer */}
        {toastMsg && <div className="pld-toast-pill">{toastMsg}</div>}

        {/* Top Handle for Mobile Pull down */}
        <div className="playlist-handle-bar" onClick={onClose} title="Tutup">
          <div className="playlist-handle"></div>
        </div>

        {/* Header */}
        <div className="playlist-header">
          <div className="playlist-header-left">
            <div className="playlist-brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            <div>
              <h3 className="playlist-title">Daftar Putar Musik</h3>
              <p className="playlist-subtitle">
                {playlist.length} Lagu Tersedia
              </p>
            </div>
          </div>

          <div className="playlist-header-right">
            {/* Clear Loop Mode Button Indicator in Header */}
            <button
              className={`pld-loop-badge ${loopMode === 'single' ? 'active-single' : 'active-all'}`}
              onClick={handleLoopToggle}
              title={
                loopMode === 'single'
                  ? 'Mode saat ini: Loop 1 Lagu (Klik untuk Loop Semua)'
                  : 'Mode saat ini: Loop Semua (Klik untuk Loop 1 Lagu)'
              }
            >
              {loopMode === 'single' ? <IconRepeatOne /> : <IconRepeatAll />}
              <span>{loopMode === 'single' ? 'Loop 1x' : 'Loop Semua'}</span>
            </button>

            <button
              className="playlist-close-btn"
              onClick={() => {
                playClick?.(0.9);
                onClose?.();
              }}
              aria-label="Tutup"
              title="Tutup (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Mini Player Sticky Control Bar inside Drawer */}
        <div className="playlist-now-playing-banner">
          <div className="pnp-info">
            <div className={`pnp-disc ${playing ? 'playing' : ''}`}>
              <span className="pnp-disc-center"></span>
            </div>
            <div className="pnp-meta">
              <span className="pnp-tag">{playing ? 'SEDANG DIPUTAR' : 'TERPAUSE'}</span>
              <span className="pnp-song">{currentTrack.judul || 'Pilih Lagu'}</span>
              <span className="pnp-artist">{currentTrack.artis || 'Mikhayl'}</span>
            </div>
          </div>

          <div className="pnp-controls">
            <button
              className="pnp-btn"
              onClick={() => {
                playClick?.(1.1);
                onPrev?.();
              }}
              title="Lagu Sebelumnya"
              aria-label="Lagu Sebelumnya"
            >
              <IconPrev />
            </button>
            <button
              className="pnp-btn pnp-btn-play"
              onClick={() => {
                playClick?.(1.2);
                onTogglePlay?.();
              }}
              title={playing ? 'Pause' : 'Play'}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <IconPause /> : <IconPlay />}
            </button>
            <button
              className="pnp-btn"
              onClick={() => {
                playClick?.(1.1);
                onNext?.();
              }}
              title="Lagu Selanjutnya"
              aria-label="Lagu Selanjutnya"
            >
              <IconNext />
            </button>
          </div>
        </div>

        {/* Scrollable Track List */}
        <div className="playlist-track-list">
          {playlist.map((track, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <div
                key={track.id || idx}
                className={`playlist-item ${isCurrent ? 'active' : ''}`}
                onClick={() => {
                  playClick?.(1.05);
                  onSelectTrack?.(idx);
                }}
              >
                <div className="pl-item-left">
                  <div className="pl-item-num">
                    {isCurrent && playing ? (
                      <div className="pl-sound-wave">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                    )}
                  </div>
                  <div className="pl-item-detail">
                    <span className="pl-item-title">
                      {track.judul}
                      {isCurrent && <span className="pl-current-badge">ACTIVE</span>}
                    </span>
                    <span className="pl-item-artist">{track.artis}</span>
                  </div>
                </div>

                <div className="pl-item-right">
                  <span className="pl-item-duration">
                    {detectedDurations[idx] || (track.durasi && track.durasi !== '--:--' ? track.durasi : '0:00')}
                  </span>
                  <div className="pl-item-play-icon">
                    {isCurrent && playing ? <IconPause /> : <IconPlay />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer Footer Bar */}
        <div className="playlist-footer-note"></div>
      </div>
    </div>
  );
}
