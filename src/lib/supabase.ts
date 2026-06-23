import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null
let _initError: string | null = null

function createSupabaseClient(): SupabaseClient {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

  if (!url || !key) {
    _initError = 'Supabase credentials not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel Environment Variables.'
    // Return a client anyway so the app doesn't crash — API calls will fail gracefully
    return createClient(url || 'http://localhost:54321', key || 'missing-key', {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
    })
  }

  _initError = null
  return createClient(url, key, {
    auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
  })
}

export function getSupabase(): SupabaseClient {
  if (!_client) {
    _client = createSupabaseClient()
  }
  return _client
}

export function getSupabaseInitError(): string | null {
  // Trigger lazy init to populate error
  if (!_client) _client = createSupabaseClient()
  return _initError
}
