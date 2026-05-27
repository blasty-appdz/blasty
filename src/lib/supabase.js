import { createClient } from "@supabase/supabase-js";

// Clé publique Supabase (anon key) — destinée à être exposée côté client avec RLS activé
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "https://dkpirfevdhvgxrkdqojn.supabase.co";
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || "sb_publishable_rtt-dfO0qA5DQVsqe86hAQ_zM529u_K";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// URL du serveur OTP — configurable via variable d'environnement
export const SERVER = process.env.REACT_APP_SERVER_URL || "https://blasty-production.up.railway.app";
