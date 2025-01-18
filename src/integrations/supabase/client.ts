import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hjjtsbkxxvygpurfhlub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqanRzYmt4eHZ5Z3B1cmZobHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTI1NzgsImV4cCI6MjAyNTIyODU3OH0.Ry-nKt0dQHOC6hru7yfZPGXtxNNQNbq6q1pwz4qxK3U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
    storage: window.localStorage
  }
});