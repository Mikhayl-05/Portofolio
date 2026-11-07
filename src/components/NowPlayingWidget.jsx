import React, { useEffect, useRef, useState } from 'react';
import { CONFIG_MUSIK } from '../data/config.js';

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

const IconList = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="3.5" cy="6" r="1.5" fill="currentColor" />
    <circle cx="3.5" cy="12" r="1.5" fill="currentColor" />
    <circle cx="3.5" cy="18" r="1.5" fill="currentColor" />
  </svg>
);

export default function NowPlayingWidget({
  audioRef,
  playing,
  currentTrack,
  loopMode = 'all',
  nextTrack,
  prevTrack,
  toggleLoopMode,
  onOpenPlaylist,
}) {
  const vinylRef = useRef(null);
  const eqRef = useRef(null);
  const dotRef = useRef(null);
  const statusRef = useRef(null);
  const progressRef = useRef(null);
  const curRef = useRef(null);
  const durRef = useRef(null);

  const [toastMsg, setToastMsg] = useState(null);
  const toastTimerRef = useRef(null);

  const fmt = (s) =>
    !s || isNaN(s)
      ? '0:00'
      : `${Math.floor(s / 60)}:${Math.floor(s % 60)
          .toString()
          .padStart(2, '0')}`;

  // Direct reactive sync with playing prop
  useEffect(() => {
    const isNowPlaying = Boolean(playing);

    if (vinylRef.current) {
      vinylRef.current.classList.toggle('playing', isNowPlaying);
    }
    if (eqRef.current) {
      eqRef.current.classList.toggle('playing', isNowPlaying);
    }
    if (dotRef.current) {
      dotRef.current.classList.toggle('paused', !isNowPlaying);
    }
    if (statusRef.current) {
      statusRef.current.textContent = isNowPlaying ? 'NOW PLAYING' : 'PAUSED';
    }
  }, [playing]);

  // Audio progress and time tracking
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const pct = (audio.currentTime / audio.duration) * 100;
        if (progressRef.current) progressRef.current.style.width = pct + '%';
        if (curRef.current) curRef.current.textContent = fmt(audio.currentTime);
        if (durRef.current) durRef.current.textContent = fmt(audio.duration);
      } else if (audio.currentTime) {
        if (curRef.current) curRef.current.textContent = fmt(audio.currentTime);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);

    let timer;
    if (playing) {
      timer = setInterval(updateProgress, 300);
    }

    updateProgress();

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      if (timer) clearInterval(timer);
    };
  }, [audioRef, playing, currentTrack]);

  // Seek audio
  const handleProgressClick = (e) => {
    e.stopPropagation();
    const audio = audioRef?.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    audio.currentTime = pct * audio.duration;
  };

  // Loop toggle with brief toast notification
  const handleLoopClick = (e) => {
    e.stopPropagation();
    toggleLoopMode?.();
    const nextMode = loopMode === 'single' ? 'all' : 'single';
    const msg = nextMode === 'single' ? 'Loop: 1 Lagu Saja' : 'Loop: Putar Semua Lagu';
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMsg(null), 2000);
  };

  const songTitle = currentTrack?.judul || CONFIG_MUSIK.judul;
  const songArtist = currentTrack?.artis || CONFIG_MUSIK.artis;
  const songDuration =
    currentTrack?.durasi && currentTrack.durasi !== '--:--'
      ? currentTrack.durasi
      : CONFIG_MUSIK.durasi;

  return (
    <div id="now-playing-card">
      {/* Toast Notification for Loop Mode Confirmation */}
      {toastMsg && <div className="np-toast-pill">{toastMsg}</div>}

      {/* Left Column: Vinyl Artwork & Spotify Branding */}
      <div className="np-art-wrap">
        <div className="np-vinyl" ref={vinylRef} id="np-vinyl">
          <div className="np-vinyl-inner">
            <div className="np-vinyl-groove g1"></div>
            <div className="np-vinyl-groove g2"></div>
            <div className="np-vinyl-groove g3"></div>
            <div className="np-vinyl-center"></div>
          </div>
        </div>
        <div className="np-spotify-brand">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#1DB954">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span>Spotify</span>
        </div>
      </div>

      {/* Right Column: Track Details, Progress & Controls */}
      <div className="np-info">
        {/* Top Header: Status & Playlist Trigger */}
        <div className="np-top-row">
          <div className="np-badge" id="np-badge">
            <span className="np-dot" ref={dotRef} id="np-dot"></span>
            <span ref={statusRef} id="np-status-txt">
              {playing ? 'NOW PLAYING' : 'PAUSED'}
            </span>
          </div>

          {onOpenPlaylist && (
            <button
              className="np-playlist-trigger"
              onClick={(e) => {
                e.stopPropagation();
                onOpenPlaylist();
              }}
              title="Buka Daftar Putar / Playlist Lengkap"
            >
              <IconList />
              <span>Playlist</span>
            </button>
          )}
        </div>

        {/* Song Info */}
        <div className="np-song" title={songTitle}>
          {songTitle}
        </div>
        <div className="np-artist" title={songArtist}>
          {songArtist}
        </div>

        {/* Equalizer animation */}
        <div className="np-eq" ref={eqRef} id="np-eq">
          <span className="np-bar"></span>
          <span className="np-bar"></span>
          <span className="np-bar"></span>
          <span className="np-bar"></span>
          <span className="np-bar"></span>
        </div>

        {/* Progress Bar */}
        <div
          className="np-progress-wrap"
          onClick={handleProgressClick}
          style={{ cursor: 'pointer' }}
          title="Klik untuk loncat durasi"
        >
          <div className="np-progress-bar" ref={progressRef} id="np-progress"></div>
        </div>

        <div className="np-times">
          <span ref={curRef} id="np-cur">
            0:00
          </span>
          <span ref={durRef} id="np-dur">
            {songDuration}
          </span>
        </div>

        {/* Controls Row: Prev, Loop Pill with Clear Status, Next */}
        <div className="np-controls-row">
          <button
            className="np-ctrl-btn"
            onClick={(e) => {
              e.stopPropagation();
              prevTrack?.();
            }}
            title="Lagu Sebelumnya"
            aria-label="Lagu Sebelumnya"
          >
            <IconPrev />
          </button>

          {/* Loop Mode Pill Button: Clear SVG icon + Text Label */}
          <button
            className={`np-ctrl-btn np-loop-btn ${loopMode === 'single' ? 'mode-single' : 'mode-all'}`}
            onClick={handleLoopClick}
            title={
              loopMode === 'single'
                ? 'Mode saat ini: Loop 1 Lagu (Klik untuk Loop Semua)'
                : 'Mode saat ini: Loop Semua (Klik untuk Loop 1 Lagu)'
            }
            aria-label="Toggle Loop Mode"
          >
            {loopMode === 'single' ? <IconRepeatOne /> : <IconRepeatAll />}
            <span className="np-loop-label">
              {loopMode === 'single' ? '1 Lagu' : 'Semua'}
            </span>
          </button>

          <button
            className="np-ctrl-btn"
            onClick={(e) => {
              e.stopPropagation();
              nextTrack?.();
            }}
            title="Lagu Selanjutnya"
            aria-label="Lagu Selanjutnya"
          >
            <IconNext />
          </button>
        </div>
      </div>
    </div>
  );
}
