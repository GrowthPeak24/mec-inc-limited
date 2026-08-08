import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/** Publishable anon client for the browser or anonymous server calls.
 *  Only holds INSERT rights on quote_requests when consent = true. */
let _client: SupabaseClient | null = null;

export function supabaseAnon(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars',
    );
  }
  _client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}
