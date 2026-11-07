import { SUPABASE_CONFIG } from '../data/supabaseConfig.js';

/**
 * Service untuk interaksi langsung ke Supabase PostgREST API
 * Menggunakan standard fetch API tanpa dependency eksternal berat.
 */

export function isSupabaseConfigured() {
  const url = SUPABASE_CONFIG.url?.trim();
  const key = SUPABASE_CONFIG.anonKey?.trim();
  return Boolean(
    url &&
    key &&
    !url.includes('your-project-id') &&
    url.startsWith('https://')
  );
}

export async function fetchGuestbookMessages() {
  if (!isSupabaseConfigured()) {
    return { data: [], error: 'NOT_CONFIGURED' };
  }

  const url = `${SUPABASE_CONFIG.url.replace(/\/+$/, '')}/rest/v1/guestbook?select=*&order=created_at.desc&limit=100`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_CONFIG.anonKey,
        Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      return { data: [], error: errText || `HTTP ${res.status}` };
    }

    const data = await res.json();
    return { data: Array.isArray(data) ? data : [], error: null };
  } catch (err) {
    return { data: [], error: err.message || 'Koneksi gagal' };
  }
}

export async function postGuestbookMessage({ name, emoji, message }) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: 'NOT_CONFIGURED' };
  }

  const url = `${SUPABASE_CONFIG.url.replace(/\/+$/, '')}/rest/v1/guestbook`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_CONFIG.anonKey,
        Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        name: name.trim(),
        emoji: emoji || '✨',
        message: message.trim(),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { data: null, error: errText || `HTTP ${res.status}` };
    }

    const inserted = await res.json();
    return { data: inserted?.[0] || null, error: null };
  } catch (err) {
    return { data: null, error: err.message || 'Gagal mengirim pesan' };
  }
}

