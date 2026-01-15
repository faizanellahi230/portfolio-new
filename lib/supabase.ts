import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail gracefully if environment variables are missing to avoid white screen
const isValidUrl = (url: string) => {
    try { return !!new URL(url); } catch { return false; }
};

export const supabase = (supabaseUrl && isValidUrl(supabaseUrl))
    ? createClient(supabaseUrl, supabaseAnonKey || '')
    : createClient('https://placeholder.supabase.co', 'placeholder');
