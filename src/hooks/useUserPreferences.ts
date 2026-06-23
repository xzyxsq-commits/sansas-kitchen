import { useState, useEffect, useCallback } from 'react'
import { getSupabase } from '@/lib/supabase'

export interface UserPreferences {
  theme: 'light' | 'dark'
  notificationsEnabled: boolean
  onboardingCompleted: boolean
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  notificationsEnabled: false,
  onboardingCompleted: false,
}

export function useUserPreferences(userId: string | undefined) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setPreferences(defaultPreferences)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    getSupabase()
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single()
      .then(({ data, error }) => {
        if (cancelled) return
        if (!error && data) {
          setPreferences({
            theme: data.theme || 'light',
            notificationsEnabled: data.notifications_enabled ?? false,
            onboardingCompleted: data.onboarding_completed ?? false,
          })
        }
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [userId])

  const updatePreference = useCallback(
    async <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
      if (!userId) return

      const dbKey = key === 'notificationsEnabled' ? 'notifications_enabled'
        : key === 'onboardingCompleted' ? 'onboarding_completed'
        : key

      setPreferences(prev => ({ ...prev, [key]: value }))

      const { error } = await getSupabase()
        .from('user_settings')
        .update({ [dbKey]: value, updated_at: new Date().toISOString() })
        .eq('user_id', userId)

      if (error) {
        // Revert on error
        setPreferences(prev => ({ ...prev, [key]: !value }))
      }
    },
    [userId]
  )

  const completeOnboarding = useCallback(async () => {
    if (!userId) return
    setPreferences(prev => ({ ...prev, onboardingCompleted: true }))
    await getSupabase()
      .from('user_settings')
      .update({ onboarding_completed: true, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
  }, [userId])

  return { preferences, updatePreference, completeOnboarding, isLoading: loading }
}
