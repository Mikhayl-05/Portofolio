import { useState, useRef, useCallback, useEffect } from 'react';
import { PLAYLIST } from '../data/config.js';

/**
 * useMusic — Multi-track playlist hook
 * Supports: play/pause, next/prev, setTrack by index, loop modes ('single' | 'all')
 */
export function useMusic() {
  const audioRef     = useRef(null);
  const eeAudioRef   = useRef(null);
  const [playing, setPlaying]               = useState(false);
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [loopMode, setLoopMode]             = useState('all'); // 'single' | 'all'
  const loopModeRef  = useRef('all');
  const currentIndexRef = useRef(0);

  // Keep refs in sync with state for use inside event callbacks
  useEffect(() => { loopModeRef.current = loopMode; }, [loopMode]);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

  /* ---- Init Audio Element ---- */
  useEffect(() => {
    if (!audioRef.current && typeof window !== 'undefined') {
      const audio = new Audio(PLAYLIST[0].file);
      audio.loop    = false; // we manage looping ourselves
      audio.preload = 'auto';
      audioRef.current = audio;
    }
  }, []);

  /* ---- stopAllEasterEgg ---- */
  const stopAllAudio = useCallback(() => {
    if (eeAudioRef.current && !eeAudioRef.current.paused) {
      eeAudioRef.current.pause();
      eeAudioRef.current.currentTime = 0;
    }
  }, []);

  /* ---- Load a specific track by index ---- */
  const loadTrack = useCallback((index, autoplay = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = PLAYLIST[index];
    if (!track) return;
    audio.pause();
    audio.src = track.file;
    audio.load();
    if (autoplay) {
      audio.play().catch(() => {});
    }
    setCurrentIndex(index);
  }, []);

  /* ---- Native event sync ---- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay  = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => {
      const mode  = loopModeRef.current;
      const idx   = currentIndexRef.current;
      if (mode === 'single') {
        // replay same track
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        // mode === 'all': next track, wrap around
        const nextIdx = (idx + 1) % PLAYLIST.length;
        loadTrack(nextIdx, true);
      }
    };

    audio.addEventListener('play',  handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play',  handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [loadTrack]);

  /* ---- Controls ---- */
  const play = useCallback(() => {
    stopAllAudio();
    if (audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [stopAllAudio]);

  const pause = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (!playing) play(); else pause();
  }, [playing, play, pause]);

  const nextTrack = useCallback(() => {
    const next = (currentIndexRef.current + 1) % PLAYLIST.length;
    loadTrack(next, playing);
  }, [loadTrack, playing]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    // If more than 3s into song — restart it; else go to previous
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      const prev = (currentIndexRef.current - 1 + PLAYLIST.length) % PLAYLIST.length;
      loadTrack(prev, playing);
    }
  }, [loadTrack, playing]);

  const setTrack = useCallback((index) => {
    loadTrack(index, true); // always autoplay on explicit selection
  }, [loadTrack]);

  const toggleLoopMode = useCallback(() => {
    setLoopMode(prev => prev === 'single' ? 'all' : 'single');
  }, []);

  /* ---- Easter Egg Audio ---- */
  const playEasterEgg = useCallback((src) => {
    stopAllAudio();
    const a = new Audio(src);
    a.play().catch(() => {});
    eeAudioRef.current = a;
  }, [stopAllAudio]);

  const stopEasterEggAudio = useCallback(() => {
    if (eeAudioRef.current) {
      eeAudioRef.current.pause();
      eeAudioRef.current.currentTime = 0;
    }
  }, []);

  return {
    audioRef,
    eeAudioRef,
    playing,
    setPlaying,
    play,
    pause,
    toggle,
    stopAllAudio,
    playEasterEgg,
    stopEasterEggAudio,
    currentIndex,
    currentTrack: PLAYLIST[currentIndex],
    loopMode,
    nextTrack,
    prevTrack,
    setTrack,
    toggleLoopMode,
    playlist: PLAYLIST,
  };
}
