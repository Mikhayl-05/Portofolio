import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  isSupabaseConfigured,
  fetchGuestbookMessages,
  postGuestbookMessage,
} from '../services/supabaseGuestbook.js';

/* ============================================================
   GuestbookModal — Real Supabase Guestbook Online
   Setiap orang bisa meninggalkan pesan nyata yang tersimpan di cloud!
   ============================================================ */

const EMOJI_LIST = ['🌟', '🔥', '💫', '🎉', '🚀', '💚', '🎨', '👾', '🌙', '⚡', '🎵', '✨', '🦋', '🌊', '💎'];

function timeAgo(dateInput) {
  if (!dateInput) return 'baru saja';
  const ts = typeof dateInput === 'number' ? dateInput : new Date(dateInput).getTime();
  const diff = Math.max(0, Date.now() - ts);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'baru saja';
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} hari lalu`;
  return `${Math.floor(days / 30)} bulan lalu`;
}

export default function GuestbookModal({ isOpen, onClose, playClick, triggerHaptic, onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('✨');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const listRef = useRef(null);
  const nameRef = useRef(null);
  const emojiWrapRef = useRef(null);
  const configured = isSupabaseConfigured();

  // Close emoji picker on outside click
  useEffect(() => {
    if (!emojiPickerOpen) return;
    const handleOutside = (e) => {
      if (emojiWrapRef.current && !emojiWrapRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    };
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [emojiPickerOpen]);

  // Load real messages from Supabase
  const loadLiveMessages = useCallback(async () => {
    if (!configured) return;
    setLoading(true);
    setError('');
    const { data, error: err } = await fetchGuestbookMessages();
    setLoading(false);
    if (err) {
      setError(`Gagal memuat pesan: ${err}`);
    } else {
      setMessages(data || []);
    }
  }, [configured]);

  useEffect(() => {
    if (isOpen) {
      if (configured) {
        loadLiveMessages();
      }
      setTimeout(() => nameRef.current?.focus(), 300);
    }
  }, [isOpen, configured, loadLiveMessages]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanMsg = msg.trim();

    if (!cleanName) { setError('Siapa nama / alias kamu?'); return; }
    if (!cleanMsg) { setError('Pesan tidak boleh kosong!'); return; }
    if (cleanMsg.length < 3) { setError('Pesan terlalu pendek (min 3 karakter)!'); return; }
    if (cleanMsg.length > 280) { setError('Pesan maksimal 280 karakter!'); return; }

    setError('');
    setSubmitting(true);
    playClick?.(1.1);
    triggerHaptic?.('light');

    if (!configured) {
      // Offline fallback: save locally temporarily with visual warning
      setTimeout(() => {
        const localMsg = {
          id: Date.now(),
          name: cleanName.slice(0, 40),
          emoji: selectedEmoji,
          message: cleanMsg,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [localMsg, ...prev]);
        setName('');
        setMsg('');
        setSubmitting(false);
        setSubmitted(true);
        onMessageSent?.();
        triggerHaptic?.('success');
        setTimeout(() => setSubmitted(false), 3000);
      }, 500);
      return;
    }

    const { data: newMsg, error: postErr } = await postGuestbookMessage({
      name: cleanName,
      emoji: selectedEmoji,
      message: cleanMsg,
    });

    setSubmitting(false);

    if (postErr) {
      setError(`Gagal mengirim ke Supabase: ${postErr}`);
      triggerHaptic?.('warning');
    } else {
      if (newMsg) {
        setMessages((prev) => [newMsg, ...prev]);
      } else {
        loadLiveMessages();
      }
      setName('');
      setMsg('');
      setSubmitted(true);
      triggerHaptic?.('success');
      onMessageSent?.();
      setTimeout(() => setSubmitted(false), 3500);
      // Scroll to top of messages list
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [name, msg, selectedEmoji, configured, playClick, triggerHaptic, onMessageSent, loadLiveMessages]);

  if (!isOpen) return null;

  const charLeft = 280 - msg.length;

  return (
    <div className="gb-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="gb-modal">
        {/* Header */}
        <div className="gb-header">
          <div className="gb-header__icon">💬</div>
          <div>
            <div className="gb-header__title">Tinggalkan Jejak</div>
            <div className="gb-header__sub">
              {configured
                ? `${messages.length} pesan live di Supabase`
                : 'Supabase Cloud Guestbook'}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {configured && (
              <button
                type="button"
                className="gb-refresh-btn"
                title="Muat Ulang Pesan Terbaru"
                onClick={() => { playClick?.(1.0); loadLiveMessages(); }}
              >
                🔄
              </button>
            )}
            <button className="gb-close-btn" onClick={onClose} aria-label="close">×</button>
          </div>
        </div>

        {/* Not Configured Banner / Helper */}
        {!configured && (
          <div className="gb-setup-banner">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, color: '#facc15' }}>
                ⚡ Sambungkan ke Supabase (Penyimpanan Nyata)
              </span>
              <button
                type="button"
                className="gb-setup-toggle-btn"
                onClick={() => setShowSetupGuide((v) => !v)}
              >
                {showSetupGuide ? 'Sembunyikan Panduan ▲' : 'Buka Panduan Setup ▼'}
              </button>
            </div>
            {showSetupGuide && (
              <div className="gb-setup-steps">
                <ol style={{ paddingLeft: '18px', margin: '8px 0', lineHeight: 1.7 }}>
                  <li>Buka project Supabase kamu di <code>supabase.com</code>.</li>
                  <li>Buka <strong>SQL Editor</strong>, jalankan query dari berkas <code>supabase_guestbook_setup.sql</code>.</li>
                  <li>Copy <strong>Project URL</strong> & <strong>anon public API key</strong> ke berkas <code>.env</code> atau <code>src/data/supabaseConfig.js</code>.</li>
                </ol>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontStyle: 'italic' }}>
                  *File <code>supabase_guestbook_setup.sql</code> dan <code>.env.example</code> sudah disiapkan di root proyek!
                </div>
              </div>
            )}
          </div>
        )}

        {/* Message list */}
        <div className="gb-list" ref={listRef}>
          {loading && (
            <div className="gb-loading">
              <span className="gb-spinner" />
              <span>Memuat pesan dari Supabase...</span>
            </div>
          )}

          {!loading && messages.map((m) => (
            <div key={m.id} className="gb-msg">
              <div className="gb-msg__avatar">{m.emoji || '✨'}</div>
              <div className="gb-msg__body">
                <div className="gb-msg__meta">
                  <span className="gb-msg__name">{m.name}</span>
                  <span className="gb-msg__time">{timeAgo(m.created_at)}</span>
                </div>
                <div className="gb-msg__text">{m.message}</div>
              </div>
            </div>
          ))}

          {!loading && messages.length === 0 && (
            <div className="gb-empty">
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌟</div>
              <div>Belum ada pesan. Jadilah yang pertama meninggalkan jejak!</div>
            </div>
          )}
        </div>

        {/* Form */}
        <form className="gb-form" onSubmit={handleSubmit} noValidate>
          <div className="gb-form__row">
            {/* Emoji picker */}
            <div className="gb-emoji-wrap" ref={emojiWrapRef}>
              <div
                className="gb-emoji-selected"
                title="Pilih Avatar Emoji"
                onClick={() => setEmojiPickerOpen((prev) => !prev)}
              >
                {selectedEmoji}
              </div>
              <div className={`gb-emoji-picker ${emojiPickerOpen ? 'gb-emoji-picker--open' : ''}`}>
                {EMOJI_LIST.map((em) => (
                  <button
                    key={em}
                    type="button"
                    className={`gb-emoji-btn ${selectedEmoji === em ? 'gb-emoji-btn--active' : ''}`}
                    onClick={() => {
                      setSelectedEmoji(em);
                      setEmojiPickerOpen(false);
                      playClick?.(1.0);
                    }}
                    aria-label={em}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            {/* Name field */}
            <input
              ref={nameRef}
              className="gb-input"
              type="text"
              placeholder="Nama kamu / alias..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              autoComplete="off"
            />
          </div>

          {/* Message textarea */}
          <div className="gb-textarea-wrap">
            <textarea
              className="gb-textarea"
              placeholder="Tinggalkan pesan nyata, kesan, atau saran buat Mikhayl... 💬"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              maxLength={280}
              rows={3}
            />
            <span className={`gb-charleft ${charLeft < 30 ? 'gb-charleft--warn' : ''}`}>
              {charLeft}
            </span>
          </div>

          {error && <div className="gb-error">⚠️ {error}</div>}

          <button
            type="submit"
            className={`gb-submit-btn ${submitting ? 'gb-submit-btn--loading' : ''} ${submitted ? 'gb-submit-btn--done' : ''}`}
            disabled={submitting || submitted}
          >
            {submitting ? (
              <span className="gb-spinner" />
            ) : submitted ? (
              '✅ Pesan nyata terkirim!'
            ) : (
              '🚀 Kirim ke Guestbook'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
