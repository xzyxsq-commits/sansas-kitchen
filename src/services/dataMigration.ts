/**
 * Data migration: localStorage → Supabase.
 * Runs once on first login — moves old pantry/diary/preferences
 * into the Supabase database, then cleans up localStorage.
 */
import { getSupabase } from '@/lib/supabase'
import type { Ingredient, DiaryEntry } from '@/types'

interface MigrationResult {
  migrated: { pantry: number; diary: number; preferences: boolean }
  skipped: boolean
  errors: string[]
}

export async function migrateLocalData(userId: string): Promise<MigrationResult> {
  const result: MigrationResult = {
    migrated: { pantry: 0, diary: 0, preferences: false },
    skipped: false,
    errors: [],
  }

  // 1. Check if already migrated (any pantry item exists)
  try {
    const { count, error: checkErr } = await getSupabase()
      .from('pantry_items')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (checkErr) {
      result.errors.push(`Migration check failed: ${checkErr.message}`)
      return result
    }

    if (count && count > 0) {
      result.skipped = true
      cleanupLocalStorage(userId)
      return result
    }
  } catch (e: unknown) {
    result.errors.push(`Migration check error: ${e instanceof Error ? e.message : String(e)}`)
    return result
  }

  // 2. Migrate pantry
  try {
    const raw = localStorage.getItem(`sansa-pantry-${userId}`)
    if (raw) {
      const items: Ingredient[] = JSON.parse(raw)
      if (items.length > 0) {
        const rows = items.map(({ id, addedAt, ...rest }) => ({
          ...rest,
          user_id: userId,
          added_at: addedAt || new Date().toISOString().split('T')[0],
        }))
        const { error } = await getSupabase().from('pantry_items').insert(rows)
        if (error) throw error
        result.migrated.pantry = rows.length
      }
    }
  } catch (e: unknown) {
    result.errors.push(`Pantry: ${e instanceof Error ? e.message : String(e)}`)
  }

  // 3. Migrate diary
  try {
    const raw = localStorage.getItem(`sansa-diary-${userId}`)
    if (raw) {
      const entries: DiaryEntry[] = JSON.parse(raw)
      if (entries.length > 0) {
        const rows = entries.map(({ id, ...rest }) => ({ ...rest, user_id: userId }))
        const { error } = await getSupabase().from('diary_entries').insert(rows)
        if (error) throw error
        result.migrated.diary = rows.length
      }
    }
  } catch (e: unknown) {
    result.errors.push(`Diary: ${e instanceof Error ? e.message : String(e)}`)
  }

  // 4. Migrate preferences → user_settings
  try {
    const raw = localStorage.getItem(`sansa-prefs-${userId}`)
    if (raw) {
      const prefs = JSON.parse(raw)
      const { error } = await getSupabase()
        .from('user_settings')
        .upsert({
          user_id: userId,
          theme: prefs.theme || 'light',
          notifications_enabled: prefs.notificationsEnabled ?? false,
          onboarding_completed: prefs.onboardingCompleted ?? false,
          updated_at: new Date().toISOString(),
        })
      if (error) throw error
      result.migrated.preferences = true
    }
  } catch (e: unknown) {
    result.errors.push(`Preferences: ${e instanceof Error ? e.message : String(e)}`)
  }

  // 5. Cleanup old localStorage
  if (result.errors.length === 0) {
    cleanupLocalStorage(userId)
  }

  return result
}

function cleanupLocalStorage(userId: string): void {
  const keys = [
    `sansa-pantry-${userId}`,
    `sansa-diary-${userId}`,
    `sansa-prefs-${userId}`,
    'sansa-users',
    'sansa-verification-codes',
    'sansa-current-user',
    'sansa-access-token',
    'sansa-refresh-token',
  ]
  for (const k of keys) {
    try { localStorage.removeItem(k) } catch { /* ignore */ }
  }
}
