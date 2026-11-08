/* ============================================================
   useAchievements.js — Hidden Achievements System
   Tracks visitor events & stores badges in localStorage
   ============================================================ */
import { useState, useCallback, useRef, useEffect } from 'react';

export const ACHIEVEMENTS = [
  {
    id: 'audiophile',
    icon: '🎧',
    title: 'Audiophile',
    desc: 'Mendengarkan musik lebih dari 1 menit',
    secret: false,
  },
  {
    id: 'card_flipper',
    icon: '🎴',
    title: 'Card Flipper',
    desc: 'Membalik semua 3D Flip Card',
    secret: false,
  },
  {
    id: 'command_pro',
    icon: '⌨️',
    title: 'Command Pro',
    desc: 'Mengetik 10 perintah berbeda di Linux Terminal',
    secret: false,
  },
  {
    id: 'snake_charmer',
    icon: '🐍',
    title: 'Snake Charmer',
    desc: 'Mencapai skor 50 di game Snake',
    secret: false,
  },
  {
    id: 'guestbook_signer',
    icon: '💬',
    title: 'Pemberi Jejak',
    desc: 'Meninggalkan jejak pesan di Guestbook',
    secret: false,
  },
  {
    id: 'matrix_runner',
    icon: '🕶️',
    title: 'Matrix Runner',
    desc: 'Menjalankan efek hujan kode digital Matrix',
    secret: true,
  },
  {
    id: 'retro_gamer',
    icon: '🕹️',
    title: 'Retro Gamer',
    desc: 'Memasukkan Konami Code ↑↑↓↓←→←→BA',
    secret: true,
  },
  {
    id: 'deep_diver',
    icon: '🌊',
    title: 'Deep Diver',
    desc: 'Scroll sampai ke bawah halaman',
    secret: false,
  },
  {
    id: 'night_owl',
    icon: '🦉',
    title: 'Night Owl',
    desc: 'Mengunjungi portfolio tengah malam (00:00–05:00)',
    secret: true,
  },
  {
    id: 'easter_hunter',
    icon: '🥚',
    title: 'Easter Hunter',
    desc: 'Menemukan tombol rahasia mobile 🥚',
    secret: true,
  },
];

const LS_KEY = 'mikhayl_achievements';

function loadUnlocked() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUnlocked(arr) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
  } catch {}
}

export function useAchievements() {
  const [unlocked, setUnlocked] = useState(() => loadUnlocked());
  const [toast, setToast] = useState(null); // { id, icon, title, desc }
  const toastTimerRef = useRef(null);
  const flipCountRef = useRef({ about: false, personality: false, daily: false });
  const termCmdsRef = useRef(new Set());

  const unlock = useCallback((id) => {
    setUnlocked((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveUnlocked(next);
      const ach = ACHIEVEMENTS.find((a) => a.id === id);
      if (ach) {
        // Show toast
        setToast(ach);
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = setTimeout(() => setToast(null), 4500);
      }
      return next;
    });
  }, []);

  const dismissToast = useCallback(() => {
    clearTimeout(toastTimerRef.current);
    setToast(null);
  }, []);

  // Watchers
  const onMusicTick = useCallback((seconds) => {
    if (seconds >= 60) unlock('audiophile');
  }, [unlock]);

  const onCardFlip = useCallback((cardId) => {
    if (!['about', 'personality', 'daily'].includes(cardId)) return;
    flipCountRef.current[cardId] = true;
    const all = Object.values(flipCountRef.current).every(Boolean);
    if (all) unlock('card_flipper');
  }, [unlock]);

  const onTerminalCommand = useCallback((cmd) => {
    termCmdsRef.current.add(cmd);
    if (termCmdsRef.current.size >= 10) unlock('command_pro');
  }, [unlock]);

  const onSnakeScore = useCallback((score) => {
    if (score >= 50) unlock('snake_charmer');
  }, [unlock]);

  const onGuestbookSigned = useCallback(() => unlock('guestbook_signer'), [unlock]);

  const onMatrixRun = useCallback(() => unlock('matrix_runner'), [unlock]);

  const onKonami = useCallback(() => unlock('retro_gamer'), [unlock]);

  const onEasterHunter = useCallback(() => unlock('easter_hunter'), [unlock]);

  // Deep diver — when user scrolls to >90% of page
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.body.scrollHeight;
      if (scrolled / total > 0.92) unlock('deep_diver');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [unlock]);

  // Night owl
  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 0 && h < 5) unlock('night_owl');
  }, [unlock]);

  return {
    unlocked,
    toast,
    dismissToast,
    unlock,
    // event callbacks
    onMusicTick,
    onCardFlip,
    onTerminalCommand,
    onSnakeScore,
    onGuestbookSigned,
    onMatrixRun,
    onKonami,
    onEasterHunter,
  };
}

