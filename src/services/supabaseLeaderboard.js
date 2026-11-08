/* ============================================================
   supabaseLeaderboard.js — Snake Leaderboard via Supabase REST API
   Menggunakan standard fetch API tanpa dependency eksternal.
   ============================================================ */
import { SUPABASE_CONFIG } from '../data/supabaseConfig.js';

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

/**
 * Fetch top N scores from leaderboard
 * @param {number} limit - how many entries to return (default 10)
 */
export async function fetchLeaderboard(limit = 10) {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const url = `${SUPABASE_CONFIG.url.replace(/\/+$/, '')}/rest/v1/snake_leaderboard?select=id,player_name,score,created_at&order=score.desc&limit=${limit}`;

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
      console.warn('Leaderboard fetch status:', res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Leaderboard fetch error:', err);
    return [];
  }
}

/**
 * Post a new score to the leaderboard
 * @param {string} playerName
 * @param {number} score
 */
export async function postScore(playerName, score) {
  if (!isSupabaseConfigured()) return;
  const name = (playerName || 'Anonymous').trim().slice(0, 24);
  if (!name || score <= 0) return;

  const url = `${SUPABASE_CONFIG.url.replace(/\/+$/, '')}/rest/v1/snake_leaderboard`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_CONFIG.anonKey,
        Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        player_name: name,
        score: score,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.warn('Leaderboard post error:', err);
    }
  } catch (err) {
    console.error('Leaderboard post error:', err);
  }
}
