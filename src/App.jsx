import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from './hooks/useTheme.js';
import { useMusic } from './hooks/useMusic.js';
import { useSoundFX } from './hooks/useSoundFX.js';
import { useHaptic } from './hooks/useHaptic.js';
import { useAchievements } from './hooks/useAchievements.js';
import { useScrollReveal, useSectionInView } from './hooks/useScrollReveal.js';
import { initAllEffects } from './effects/premiumEffects.js';
import { EE_LIST } from './data/config.js';

// Components
import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import MusicPopup from './components/MusicPopup.jsx';
import FxCanvas from './components/FxCanvas.jsx';
import ImageModal from './components/ImageModal.jsx';
import SkillModal from './components/SkillModal.jsx';
import EasterEggPopup from './components/EasterEggPopup.jsx';
import MatrixOverlay from './components/MatrixOverlay.jsx';
import LinuxTerminal from './components/LinuxTerminal.jsx';
import KonamiFlash from './components/KonamiFlash.jsx';
import MobileEggMenu from './components/MobileEggMenu.jsx';
import PullToSurprise from './components/PullToSurprise.jsx';
import PlaylistDrawer from './components/PlaylistDrawer.jsx';
import SnakeGameModal from './components/SnakeGameModal.jsx';
import AchievementsModal from './components/AchievementsModal.jsx';
import AchievementToast from './components/AchievementToast.jsx';
import GuestbookModal from './components/GuestbookModal.jsx';

// Sections
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Personality from './sections/Personality.jsx';
import Daily from './sections/Daily.jsx';
import Pameran from './sections/Pameran.jsx';
import GitHub from './sections/GitHub.jsx';
import Skills from './sections/Skills.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  const { isDark, toggle: toggleTheme } = useTheme();
  const {
    audioRef,
    playing,
    play: playMusic,
    pause: pauseMusic,
    toggle: toggleMusic,
    stopAllAudio,
    playEasterEgg,
    stopEasterEggAudio,
    currentIndex,
    currentTrack,
    loopMode,
    nextTrack,
    prevTrack,
    setTrack,
    toggleLoopMode,
    playlist,
  } = useMusic();

  const {
    muted: sfxMuted,
    toggleMute: toggleSfxMute,
    playClick,
    playFlip,
    playSuccess,
  } = useSoundFX();

  const { triggerHaptic } = useHaptic();

  const {
    unlocked: achievementsUnlocked,
    toast: achievementToast,
    dismissToast: dismissAchievementToast,
    onMusicTick,
    onCardFlip,
    onTerminalCommand,
    onSnakeScore,
    onGuestbookSigned,
    onMatrixRun,
    onKonami,
    onEasterHunter,
  } = useAchievements();

  useScrollReveal();
  useSectionInView();

  // Modals & Overlays State
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [activeEasterEgg, setActiveEasterEgg] = useState(null);
  const [matrixActive, setMatrixActive] = useState(false);
  const [linuxActive, setLinuxActive] = useState(false);
  const [konamiFlash, setKonamiFlash] = useState(false);
  const [mobileEggUnlocked, setMobileEggUnlocked] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [snakeOpen, setSnakeOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [guestbookOpen, setGuestbookOpen] = useState(false);

  const fxCanvasRef = useRef(null);
  const secretBarRef = useRef(null);
  const keyBufferRef = useRef('');
  const konamiSeqRef = useRef([]);
  const avatarClicksRef = useRef([]);

  // Audio track playing tick for audiophile achievement
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      const sec = audioRef.current?.currentTime || 0;
      onMusicTick(sec);
    }, 1000);
    return () => clearInterval(interval);
  }, [playing, audioRef, onMusicTick]);

  // Preloader finish
  const handlePreloaderDone = useCallback(() => {
    setShowMusicModal(true);
    initAllEffects();
  }, []);

  // Theme toggle with sound & haptic
  const handleThemeToggle = useCallback(() => {
    playClick(1.15);
    triggerHaptic('light');
    toggleTheme();
  }, [toggleTheme, playClick, triggerHaptic]);

  // SFX toggle handler
  const handleSfxToggle = useCallback(() => {
    playClick(1.3);
    triggerHaptic('light');
    toggleSfxMute();
  }, [toggleSfxMute, playClick, triggerHaptic]);

  // Flip card handler with achievement tracker
  const handleFlipCard = useCallback((cardId) => {
    playFlip();
    triggerHaptic('light');
    if (cardId) onCardFlip(cardId);
  }, [playFlip, triggerHaptic, onCardFlip]);

  // Avatar 3-Click Detection -> Open Snake Game Arcade
  const handleAvatarClick = useCallback(() => {
    const now = Date.now();
    const recent = [...avatarClicksRef.current.filter((t) => now - t < 1200), now];
    avatarClicksRef.current = recent;
    if (recent.length >= 3) {
      avatarClicksRef.current = [];
      playSuccess();
      triggerHaptic('surprise');
      setSnakeOpen(true);
    }
  }, [playSuccess, triggerHaptic]);

  // Trigger an easter egg
  const triggerEasterEgg = useCallback(
    (key) => {
      playSuccess();
      triggerHaptic('success');

      if (key === 'matrix') {
        onMatrixRun();
        setMatrixActive(true);
        return;
      }
      if (key === 'linux') {
        setLinuxActive(true);
        return;
      }
      if (key === 'snake') {
        setSnakeOpen(true);
        return;
      }
      if (key === 'konami') {
        onKonami();
        setKonamiFlash(true);
        setTimeout(() => setKonamiFlash(false), 200);
        setActiveEasterEgg({
          text:
            '🕹️ KONAMI CODE ACTIVATED!\n+30 lives granted!\nGw tau lo penasaran banget 👀\n\nMasih ada easter egg lain nih...',
        });
        if (window.confetti) {
          window.confetti({ particleCount: 180, spread: 140, origin: { y: 0.5 } });
        }
        return;
      }

      const item = EE_LIST.find((e) => e.keyword === key);
      if (!item) return;

      if (item.audio) {
        playEasterEgg(item.audio);
      }

      setActiveEasterEgg(item);
    },
    [playEasterEgg, playSuccess, triggerHaptic]
  );

  // Close Easter Egg
  const handleCloseEasterEgg = useCallback(() => {
    playClick(0.9);
    setActiveEasterEgg(null);
    stopEasterEggAudio();
  }, [stopEasterEggAudio, playClick]);

  // Global listeners: scroll bar, click ripple, context menu, keyboard & shake
  useEffect(() => {
    // Console Easter Egg
    console.log(
      '%c🕵️ Secret Unlocked!',
      'color:#39FF14;font-size:18px;font-weight:bold;font-family:monospace'
    );
    console.log(
      '%cHalo dev! Lo nemuin easter egg console 😎',
      'color:#22c55e;font-size:13px'
    );
    console.log(
      '%cKeyword: ' + EE_LIST.map((e) => e.keyword).join(' · '),
      'color:#22c55e;font-size:11px'
    );
    console.log(
      '%cKonami: ↑↑↓↓←→←→BA  |  Double-click MIKHAYL  |  3x Avatar (Snake Game)  |  Shake HP  |  10x Support  |  Klik "rasa" 5x',
      'color:#39FF14;font-size:11px;font-family:monospace'
    );

    // Secret scroll bar
    const handleScroll = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0 && secretBarRef.current) {
        const pct = (window.pageYOffset / scrollHeight) * 100;
        secretBarRef.current.style.width = pct + '%';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Click ripple
    const handleClick = (e) => {
      const d = document.createElement('div');
      d.className = 'ripple-dot';
      d.style.left = e.clientX + 'px';
      d.style.top = e.clientY + 'px';
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 650);
    };
    document.addEventListener('click', handleClick);

    // Prevent context menu on images
    const handleContextMenu = (e) => {
      if (e.target.tagName === 'IMG') e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // Keyboard buffer & Konami Code
    const KONAMI_SEQ = [
      'arrowup',
      'arrowup',
      'arrowdown',
      'arrowdown',
      'arrowleft',
      'arrowright',
      'arrowleft',
      'arrowright',
      'b',
      'a',
    ];
    const handleKeyDown = (e) => {
      // Don't capture when typing in an input/textarea
      if (['input', 'textarea'].includes(e.target.tagName.toLowerCase())) return;

      const key = e.key.toLowerCase();

      // Konami
      konamiSeqRef.current.push(key);
      if (konamiSeqRef.current.length > 10) konamiSeqRef.current.shift();
      if (konamiSeqRef.current.join(',') === KONAMI_SEQ.join(',')) {
        konamiSeqRef.current = [];
        triggerEasterEgg('konami');
        return;
      }

      // Keyword buffer
      keyBufferRef.current += key;
      if (keyBufferRef.current.length > 20) {
        keyBufferRef.current = keyBufferRef.current.slice(-20);
      }

      for (const ee of EE_LIST) {
        if (keyBufferRef.current.includes(ee.keyword)) {
          triggerEasterEgg(ee.keyword);
          keyBufferRef.current = '';
          break;
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Shake HP detection
    let lastShake = 0;
    const handleMotion = (e) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const force = Math.abs(a.x || 0) + Math.abs(a.y || 0) + Math.abs(a.z || 0);
      const now = Date.now();
      if (force > 40 && now - lastShake > 3000) {
        lastShake = now;
        triggerHaptic('surprise');
        playSuccess();
        setActiveEasterEgg({
          text: '📱 SHAKE DETECTED!\nWahhh HP-nya dikocok? 😂\n\nCoba juga: Konami Code ↑↑↓↓←→←→BA',
        });
        if (window.confetti) {
          window.confetti({ particleCount: 60, spread: 100, origin: { y: 0.5 } });
        }
      }
    };
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion);
      }
    };
  }, [triggerEasterEgg, playSuccess, triggerHaptic]);

  return (
    <>
      {/* Edge Fade Overlays */}
      <div id="edge-fade-top"></div>
      <div id="edge-fade-bottom"></div>

      {/* Secret Progress Bar */}
      <div id="secret-bar" ref={secretBarRef}></div>

      {/* Konami Flash */}
      <KonamiFlash active={konamiFlash} />

      {/* FX Canvas */}
      <FxCanvas ref={fxCanvasRef} />

      {/* Pull To Surprise on Mobile */}
      <PullToSurprise
        playSuccess={playSuccess}
        triggerHaptic={triggerHaptic}
      />

      {/* Preloader */}
      <Preloader onDone={handlePreloaderDone} />

      {/* Navbar */}
      <Navbar
        playing={playing}
        onMusicToggle={() => {
          playClick(1.1);
          triggerHaptic('light');
          toggleMusic();
        }}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        sfxMuted={sfxMuted}
        onSfxToggle={handleSfxToggle}
        onNavClickWithSound={() => {
          playClick(1.0);
          triggerHaptic('light');
        }}
        achievementsUnlockedCount={achievementsUnlocked.length}
        onOpenAchievements={() => {
          playClick(1.1);
          triggerHaptic('light');
          setAchievementsOpen(true);
        }}
      />

      {/* Music Initial Popup */}
      {showMusicModal && (
        <MusicPopup
          onPlay={() => {
            playClick(1.2);
            playMusic();
            setShowMusicModal(false);
          }}
          onClose={() => {
            playClick(0.9);
            setShowMusicModal(false);
          }}
        />
      )}

      {/* Main Page Sections */}
      <main>
        <Hero
          onAvatarClick={handleAvatarClick}
          onHeroNameDblClick={() => {
            playSuccess();
            triggerHaptic('medium');
            triggerEasterEgg('mikhayl');
            if (window.confetti) {
              window.confetti({ particleCount: 80, spread: 90, origin: { y: 0.3 } });
            }
          }}
        />

        <About
          audioRef={audioRef}
          playing={playing}
          onFlipCard={() => handleFlipCard('about')}
          currentTrack={currentTrack}
          loopMode={loopMode}
          nextTrack={nextTrack}
          prevTrack={prevTrack}
          toggleLoopMode={toggleLoopMode}
          onOpenPlaylist={() => {
            playClick(1.1);
            setPlaylistOpen(true);
          }}
        />

        <Personality onFlipCard={() => handleFlipCard('personality')} />

        <Daily onFlipCard={() => handleFlipCard('daily')} />

        <Pameran />

        <GitHub />

        <Skills
          onSelectSkill={(title, desc) => {
            playClick(1.05);
            triggerHaptic('light');
            setSelectedSkill({ title, desc });
          }}
        />

        <Contact
          onUnlockMobileEgg={() => {
            onEasterHunter();
            playSuccess();
            triggerHaptic('success');
            setMobileEggUnlocked(true);
          }}
          onShowEasterEgg={(cmd) => {
            playSuccess();
            triggerHaptic('medium');
            setActiveEasterEgg(cmd);
          }}
          onSpawnFireworks={(x, y) => {
            triggerHaptic('light');
            fxCanvasRef.current?.spawnFW(x, y);
          }}
          onOpenGuestbook={() => {
            playClick(1.1);
            triggerHaptic('light');
            setGuestbookOpen(true);
          }}
          playClick={playClick}
          triggerHaptic={triggerHaptic}
        />
      </main>

      <Footer />

      {/* Playlist Drawer */}
      <PlaylistDrawer
        isOpen={playlistOpen}
        onClose={() => setPlaylistOpen(false)}
        playlist={playlist}
        currentIndex={currentIndex}
        playing={playing}
        loopMode={loopMode}
        onSelectTrack={(idx) => {
          setTrack(idx);
          triggerHaptic('light');
        }}
        onTogglePlay={toggleMusic}
        onNext={nextTrack}
        onPrev={prevTrack}
        onToggleLoop={toggleLoopMode}
        playClick={playClick}
      />

      {/* Snake Game Arcade Modal */}
      <SnakeGameModal
        isOpen={snakeOpen}
        onClose={() => setSnakeOpen(false)}
        playSuccess={playSuccess}
        playClick={playClick}
        triggerHaptic={triggerHaptic}
        onScoreUpdate={onSnakeScore}
      />

      {/* Modals & Easter Eggs Overlays */}
      <MobileEggMenu
        unlocked={mobileEggUnlocked}
        onTrigger={(key) => triggerEasterEgg(key)}
      />

      <EasterEggPopup
        cmd={activeEasterEgg}
        onClose={handleCloseEasterEgg}
      />

      <MatrixOverlay
        active={matrixActive}
        onClose={() => {
          playClick(0.9);
          setMatrixActive(false);
        }}
      />

      <LinuxTerminal
        active={linuxActive}
        onClose={() => {
          playClick(0.9);
          setLinuxActive(false);
        }}
        onOpenSnake={() => {
          setLinuxActive(false);
          setSnakeOpen(true);
        }}
        onOpenMatrix={() => {
          setLinuxActive(false);
          onMatrixRun();
          setMatrixActive(true);
        }}
        onThemeToggle={handleThemeToggle}
        isDark={isDark}
        musicControls={{
          play: playMusic,
          pause: pauseMusic,
          next: nextTrack,
          prev: prevTrack,
          toggleLoop: toggleLoopMode,
          playing,
          currentTrack,
        }}
        playSuccess={playSuccess}
        playClick={playClick}
        triggerHaptic={triggerHaptic}
        onCommand={onTerminalCommand}
      />

      {/* Hidden Achievements Hub */}
      <AchievementsModal
        isOpen={achievementsOpen}
        onClose={() => setAchievementsOpen(false)}
        unlocked={achievementsUnlocked}
      />

      {/* Achievement Toast */}
      <AchievementToast
        toast={achievementToast}
        onDismiss={dismissAchievementToast}
      />

      {/* Interactive Real Supabase Guestbook Modal */}
      <GuestbookModal
        isOpen={guestbookOpen}
        onClose={() => setGuestbookOpen(false)}
        playClick={playClick}
        triggerHaptic={triggerHaptic}
        onMessageSent={onGuestbookSigned}
      />

      <SkillModal
        title={selectedSkill?.title}
        desc={selectedSkill?.desc}
        onClose={() => {
          playClick(0.9);
          setSelectedSkill(null);
        }}
      />

      <ImageModal />
    </>
  );
}
