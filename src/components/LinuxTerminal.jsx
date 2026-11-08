import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ALL_COMMANDS, QUICK_COMMANDS, NEOFETCH_ART, COMMAND_HANDLERS } from '../utils/terminalData';

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
    { type: 'ok', text: 'Welcome to Mikhayl Terminal Shell v3.0 (x86_64-pc-linux-gnu / win-cross)' },
    { type: 'info', text: '⚡ 300+ Linux, Windows & Easter Egg commands ready! Type "help" or tap shortcuts below.' },
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
      const arg = parts.slice(1).join(' ');

      onCommand?.(cmd);

      // 1. Direct interactive UI actions
      if (cmd === 'clear' || cmd === 'cls') {
        setLines([]);
        return;
      }

      if (cmd === 'exit' || cmd === 'quit') {
        onClose?.();
        return;
      }

      if (cmd === 'history') {
        newLines.push({
          type: 'out',
          text: history.length
            ? history.map((h, i) => `  ${i + 1}  ${h}`).join('\n')
            : 'Belum ada riwayat perintah.',
        });
        setLines(newLines);
        return;
      }

      if (cmd === 'echo') {
        newLines.push({ type: 'out', text: arg || '' });
        setLines(newLines);
        return;
      }

      if (cmd === 'snake' || cmd === 'play_snake.sh' || cmd === 'arcade') {
        newLines.push({ type: 'ok', text: '🐍 Membuka Retro Cyber Snake Arcade...' });
        playSuccess?.();
        setTimeout(() => {
          onOpenSnake?.();
        }, 350);
        setLines(newLines);
        return;
      }

      if (cmd === 'matrix' || cmd === 'matrix2' || cmd === 'cmatrix') {
        newLines.push({ type: 'ok', text: '🕶️ Memulai Matrix Digital Rain Stream...' });
        playSuccess?.();
        setTimeout(() => {
          onOpenMatrix?.();
        }, 350);
        setLines(newLines);
        return;
      }

      if (cmd === 'theme') {
        const t = arg.toLowerCase();
        if (t === 'dark') {
          if (!isDark) onThemeToggle?.();
          newLines.push({ type: 'ok', text: '🌙 Tema diubah ke Dark Mode.' });
        } else if (t === 'light') {
          if (isDark) onThemeToggle?.();
          newLines.push({ type: 'ok', text: '☀️ Tema diubah ke Light Mode.' });
        } else {
          onThemeToggle?.();
          newLines.push({
            type: 'ok',
            text: `🌓 Tema di-toggle (sekarang: ${!isDark ? 'Dark Mode' : 'Light Mode'}).`,
          });
        }
        setLines(newLines);
        return;
      }

      if (cmd === 'music') {
        const m = arg.toLowerCase();
        if (m === 'play') {
          musicControls?.play?.();
          newLines.push({ type: 'ok', text: '▶️ Memutar musik latar: The 1975 - About You' });
        } else if (m === 'pause') {
          musicControls?.pause?.();
          newLines.push({ type: 'info', text: '⏸️ Musik di-pause.' });
        } else if (m === 'next') {
          musicControls?.next?.();
          newLines.push({ type: 'ok', text: '⏭️ Skip ke trek berikutnya.' });
        } else if (m === 'prev') {
          musicControls?.prev?.();
          newLines.push({ type: 'ok', text: '⏮️ Kembali ke trek sebelumnya.' });
        } else if (m === 'loop') {
          musicControls?.toggleLoop?.();
          newLines.push({ type: 'info', text: '🔁 Mode loop lagu diubah.' });
        } else {
          newLines.push({
            type: 'info',
            text: 'Penggunaan: music <play | pause | next | prev | loop>',
          });
        }
        setLines(newLines);
        return;
      }

      // 2. Lookup in Command Handlers
      if (COMMAND_HANDLERS[cmd]) {
        const res = COMMAND_HANDLERS[cmd](arg);
        if (res) newLines.push(res);
        setLines(newLines);
        return;
      }

      // 3. Recognized command from 300+ command registry
      if (ALL_COMMANDS.includes(cmd)) {
        newLines.push({
          type: 'out',
          text: `[${cmd.toUpperCase()}] Utility executed in virtual shell environment.\nStatus: Ready (exit code 0)`,
        });
        setLines(newLines);
        return;
      }

      // 4. Command not found
      newLines.push({
        type: 'error',
        text: `bash: command not found: "${trimmed}". Ketik "help" untuk melihat 300+ perintah.`,
      });
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
          <span className="term-title-text">mikhayl@portfolio:~ (bash - 300+ commands)</span>
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
              placeholder="Ketik perintah (contoh: help, neofetch, snake, matrix, git status)..."
            />
          </div>
        </div>

        {/* Terminal Footer Info */}
        <div className="term-statusbar">
          <div className="term-status-left">
            <span className="term-status-dot"></span>
            <span>BASH 5.2 • 391 COMMANDS LOADED • UTF-8</span>
          </div>
          <div className="term-status-right">
            <span>Tab = Autocomplete • ↑↓ = History</span>
          </div>
        </div>
      </div>
    </div>
  );
}
