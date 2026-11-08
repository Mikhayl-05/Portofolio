/* ============================================================
   supabaseLeaderboard.js — Snake Leaderboard via Supabase
   ============================================================ */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://jciabdkvifmkkzinwxlz.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_TaICcDbyP_xJDhYSXzbdLg_GecxKtRU';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Fetch top N scores from leaderboard
 * @param {number} limit - how many entries to return (default 10)
 */
export async function fetchLeaderboard(limit = 10) {
  const { data, error } = await supabase
    .from('snake_leaderboard')
    .select('id, player_name, score, created_at')
    .order('score', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}

/**
 * Post a new score to the leaderboard
 * @param {string} playerName
 * @param {number} score
 */
export async function postScore(playerName, score) {
  const name = (playerName || 'Anonymous').trim().slice(0, 24);
  if (!name || score <= 0) return;
  const { error } = await supabase
    .from('snake_leaderboard')
    .insert([{ player_name: name, score }]);
  if (error) throw error;
}

