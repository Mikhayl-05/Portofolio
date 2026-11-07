import React, { useState, useEffect, useRef, useCallback } from 'react';

const ALL_COMMANDS = [
  'help',
  'whoami',
  'uname',
  'neofetch',
  'ls',
  'dir',
  'cat',
  'cat about.txt',
  'cat contact.json',
  'cat secret.txt',
  'snake',
  'matrix',
  'theme',
  'music',
  'date',
  'ping',
  'sudo',
  'echo',
  'history',
  'clear',
  'cls',
  'exit',
];

const QUICK_COMMANDS = [
  'help',
  'neofetch',
  'whoami',
  'ls',
  'cat about.txt',
  'snake',
  'matrix',
  'clear',
  'exit',
];

const NEOFETCH_ART = `
      /\\_/\\       OS: Arch Linux x86_64
     ( o.o )      Host: Portfolio Hyperdrive 2026
      > ^ <       Kernel: 6.6.0-zen-portfolio
                  Shell: interactive-bash v3.0
                  Uptime: 24/7 (Coding & Exploring)
                  Audio: The 1975 - About You
                  Stack: React + CSS + Web Audio + Canvas
                  Vibe: ⚡ Cyberpunk Nocturnal 🌙
`;

export default function LinuxTerminal({
  active,
  onClose,
  onOpenSnake,
  onOpenMatrix,
  onThemeToggle,
  isDark,
  musicControls,
  playSuccess,
  playClick,
  triggerHaptic,
  onCommand,
}) {
  const [lines, setLines] = useState([
    { type: 'ok', text: 'Welcome to Mikhayl Terminal Shell v3.0 (x86_64-pc-linux-gnu)' },
    { type: 'info', text: 'Type "help" to see available commands or tap quick commands below.' },
    { type: 'ascii', text: NEOFETCH_ART.trim() },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef(null);
  const termBodyRef = useRef(null);

  // Auto focus input when modal opened
  useEffect(() => {
    if (active) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [active]);

  // Auto scroll to bottom
  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [lines, inputVal]);

  // Execute a command string
  const executeCommand = useCallback(
    (rawCmd) => {
      const trimmed = rawCmd.trim();
      playClick?.(1.1);
      triggerHaptic?.('light');

      // Append prompt line
      const newLines = [...lines, { type: 'prompt', text: trimmed, cmd: trimmed }];

      if (!trimmed) {
        setLines(newLines);
        return;
      }

      // Add to history
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIdx(-1);

      const parts = trimmed.split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ').toLowerCase();

      onCommand?.(cmd);

      switch (cmd) {
        case 'help':
        case '?':
          newLines.push({
            type: 'info',
            text: [
              'MIKHAYL TERMINAL HELP - AVAILABLE COMMANDS:',
              '  help, ?              : Tampilkan daftar bantuan ini',
              '  whoami, uname        : Info user dan sistem OS',
              '  neofetch             : Tampilkan sistem spec dan logo ASCII',
              '  ls, dir              : List direktori file virtual',
              '  cat <file>           : Baca file (contoh: cat about.txt)',
              '  snake                : Mainkan Game Arcade Snake Klasik 🐍',
              '  matrix               : Aktifkan efek Matrix Code Rain 🕶️',
              '  theme <dark|light>   : Ganti tema website (dark / light)',
              '  music <play|pause|next|prev|loop> : Kontrol pemutar musik',
              '  date                 : Waktu & kalender sistem saat ini',
              '  ping <host>          : Ping host server',
              '  echo <text>          : Cetak teks ke terminal',
              '  sudo <cmd>           : Hak akses superuser',
              '  history              : Riwayat perintah yang pernah diketik',
              '  clear, cls           : Bersihkan layar terminal',
              '  exit                 : Tutup terminal shell',
            ].join('\n'),
          });
          break;

        case 'whoami':
          newLines.push({ type: 'out', text: 'mikhayl (root developer & nocturnal coder)' });
          break;

        case 'uname':
        case 'uname -a':
          newLines.push({
            type: 'out',
            text: 'Linux mikhayl-laptop 6.6.0-zen #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
          });
          break;

        case 'neofetch':
          newLines.push({ type: 'ascii', text: NEOFETCH_ART.trim() });
          break;

        case 'ls':
        case 'dir':
          newLines.push({
            type: 'out',
            text: 'skills/    projects/    about.txt    contact.json    secret_vault.gpg',
          });
          break;

        case 'cat': {
          if (!arg) {
            newLines.push({ type: 'warn', text: 'Penggunaan: cat <nama_file> (contoh: cat about.txt)' });
          } else if (arg === 'about.txt') {
            newLines.push({
              type: 'info',
              text: [
                '--- ABOUT MIKHAYL ---',
                '• Pelajar yang suka ngulik hal random dan teknologi kreatif.',
                '• Hobi: Komputer, Linux, Desain Grafis, Kamera & Cinematography.',
                '• Kota: Jakarta -> Surabaya -> Gorontalo.',
                '• Motto: "Belajar komputer bikin elu keliatan keren" 🚀',
              ].join('\n'),
            });
          } else if (arg === 'contact.json') {
            newLines.push({
              type: 'out',
              text: JSON.stringify(
                {
                  creator: 'Mikhayl',
                  instagram: '@mhmyl_',
                  github: 'Mikhayl-05',
                  portfolio: 'Active v3.0',
                  status: 'Exploring Teyvat & Linux Shells',
                },
                null,
                2
              ),
            });
          } else if (arg === 'secret_vault.gpg' || arg === 'secret.txt') {
            newLines.push({
              type: 'warn',
              text: '🔒 [ENCRYPTED GPG DATA]\n-----BEGIN PGP MESSAGE-----\nhQGMA4Z8f8K79Q3zAQv/Wj4...\nHint: Coba ketik "snake" atau "matrix" untuk membuka rahasia!',
            });
          } else {
            newLines.push({
              type: 'error',
              text: `cat: ${arg}: File atau direktori tidak ditemukan.`,
            });
          }
          break;
        }

        case 'snake':
          newLines.push({ type: 'ok', text: '🐍 Membuka Retro Cyber Snake Arcade...' });
          playSuccess?.();
          setTimeout(() => {
            onOpenSnake?.();
          }, 350);
          break;

        case 'matrix':
          newLines.push({ type: 'ok', text: '🕶️ Memulai Matrix Digital Rain Stream...' });
          playSuccess?.();
          setTimeout(() => {
            onOpenMatrix?.();
          }, 350);
          break;

        case 'theme': {
          if (arg === 'dark') {
            if (!isDark) onThemeToggle?.();
            newLines.push({ type: 'ok', text: '🌙 Tema diubah ke Dark Mode.' });
          } else if (arg === 'light') {
            if (isDark) onThemeToggle?.();
            newLines.push({ type: 'ok', text: '☀️ Tema diubah ke Light Mode.' });
          } else {
            onThemeToggle?.();
            newLines.push({
              type: 'ok',
              text: `🌓 Tema di-toggle (sekarang: ${!isDark ? 'Dark Mode' : 'Light Mode'}).`,
            });
          }
          break;
        }

        case 'music': {
          if (arg === 'play') {
            musicControls?.play?.();
            newLines.push({ type: 'ok', text: '▶️ Memutar musik: About You (The 1975)' });
          } else if (arg === 'pause') {
            musicControls?.pause?.();
            newLines.push({ type: 'info', text: '⏸️ Musik di-pause.' });
          } else if (arg === 'next') {
            musicControls?.next?.();
            newLines.push({ type: 'ok', text: '⏭️ Skip ke lagu berikutnya.' });
          } else if (arg === 'prev') {
            musicControls?.prev?.();
            newLines.push({ type: 'ok', text: '⏮️ Kembali ke lagu sebelumnya.' });
          } else if (arg === 'loop') {
            musicControls?.toggleLoop?.();
            newLines.push({ type: 'info', text: '🔁 Mode loop lagu diubah.' });
          } else {
            newLines.push({
              type: 'info',
              text: 'Penggunaan: music <play | pause | next | prev | loop>',
            });
          }
          break;
        }

        case 'date':
          newLines.push({
            type: 'out',
            text: new Date().toLocaleString('id-ID', {
              dateStyle: 'full',
              timeStyle: 'long',
            }),
          });
          break;

        case 'ping': {
          const host = arg || 'portfolio.mikhayl.dev';
          newLines.push({
            type: 'ok',
            text: [
              `PING ${host} (127.0.0.1) 56(84) bytes of data.`,
              '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms',
              '64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms',
              '64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.035 ms',
              `--- ${host} ping statistics ---`,
              '3 packets transmitted, 3 received, 0% packet loss, time 2002ms',
            ].join('\n'),
          });
          break;
        }

        case 'sudo':
          if (arg.includes('rm') && arg.includes('-rf')) {
            newLines.push({
              type: 'warn',
              text: '🚨 PERMISSION DENIED: Nice try, hacker! System files are immutable and protected by Mikhayl\'s firewall. 😎',
            });
          } else {
            newLines.push({
              type: 'out',
              text: `[sudo] password for mikhayl: ••••••••\nExecuting root task: ${arg || 'done'} ✓`,
            });
          }
          break;

        case 'echo':
          newLines.push({ type: 'out', text: arg || '' });
          break;

        case 'history':
          newLines.push({
            type: 'out',
            text: history.length
              ? history.map((h, i) => `  ${i + 1}  ${h}`).join('\n')
              : 'Belum ada riwayat perintah.',
          });
          break;

        case 'clear':
        case 'cls':
          setLines([]);
          return;

        case 'exit':
        case 'quit':
          onClose?.();
          return;

        default:
          newLines.push({
            type: 'error',
            text: `bash: command not found: "${trimmed}". Ketik "help" untuk melihat daftar perintah.`,
          });
          break;
      }

      setLines(newLines);
    },
    [
      lines,
      history,
      isDark,
      onClose,
      onOpenSnake,
      onOpenMatrix,
      onThemeToggle,
      musicControls,
      playClick,
      playSuccess,
      triggerHaptic,
      onCommand,
    ]
  );

  // Handle Enter, Arrow keys, Tab
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0 || historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.toLowerCase().trim();
      if (!current) return;
      const match = ALL_COMMANDS.find((cmd) => cmd.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    } else if (e.key === 'Escape') {
      onClose?.();
    }
  };

  // Keyboard escape listener
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && active) onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, onClose]);

  return (
    <div
      id="linux-overlay"
      className={active ? 'active' : ''}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="term-window" onClick={() => inputRef.current?.focus()}>
        {/* Titlebar */}
        <div className="term-titlebar">
          <div className="term-dots">
            <div
              className="term-dot red"
              id="term-close-dot"
              title="Close"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
            ></div>
            <div className="term-dot yellow" title="Minimize"></div>
            <div className="term-dot green" title="Maximize"></div>
          </div>
          <span className="term-title-text">mikhayl@portfolio:~ (bash)</span>
          <button
            className="term-close-x-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            title="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Quick Command Pills */}
        <div className="term-quick-bar" onClick={(e) => e.stopPropagation()}>
          <span className="term-quick-label">⚡ Shortcuts:</span>
          <div className="term-quick-list">
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                className="term-quick-chip"
                onClick={() => {
                  executeCommand(cmd);
                  inputRef.current?.focus();
                }}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Body */}
        <div className="term-body" id="term-body" ref={termBodyRef}>
          {lines.map((line, idx) => {
            if (line.type === 'prompt') {
              return (
                <div key={idx} className="term-line">
                  <span className="term-prompt">mikhayl@portfolio:~$ </span>
                  <span className="term-cmd">{line.cmd}</span>
                </div>
              );
            }
            if (line.type === 'ascii') {
              return (
                <pre key={idx} className="term-ascii-art">
                  {line.text}
                </pre>
              );
            }
            return (
              <div key={idx} className={`term-line term-${line.type}`}>
                <pre className="term-text-pre">{line.text}</pre>
              </div>
            );
          })}

          {/* Interactive Input Row */}
          <div className="term-input-row">
            <span className="term-prompt">mikhayl@portfolio:~$ </span>
            <input
              ref={inputRef}
              type="text"
              className="term-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Ketik perintah (contoh: help, neofetch, snake, matrix)..."
            />
          </div>
        </div>

        {/* Terminal Footer Info */}
        <div className="term-statusbar">
          <div className="term-status-left">
            <span className="term-status-dot"></span>
            <span>BASH 5.2 • UTF-8</span>
          </div>
          <div className="term-status-right">
            <span>Tab = Autocomplete • ↑↓ = History</span>
          </div>
        </div>
      </div>
    </div>
  );
}
