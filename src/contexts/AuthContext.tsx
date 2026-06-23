import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import type { UserPublic, RegisterData, UpdateProfileData } from '@/types'
import { getSupabase } from '@/lib/supabase'
import { migrateLocalData } from '@/services/dataMigration'
import { isValidEmail } from '@/utils/auth'

// ─── Context shape ─────────────────────────────────────────────

interface AuthContextValue {
  user: UserPublic | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean

  signUp: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  signInWithPassword: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  sendOtp: (email: string, shouldCreateUser?: boolean) => Promise<{ success: boolean; error?: string }>
  verifyOtp: (email: string, token: string) => Promise<{ success: boolean; error?: string }>
  resetPasswordForEmail: (email: string) => Promise<{ success: boolean; error?: string }>
  updateUserPassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>
  updateProfile: (data: UpdateProfileData) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

// ─── Helpers ───────────────────────────────────────────────────

async function fetchProfile(userId: string): Promise<UserPublic | null> {
  const { data, error } = await getSupabase()
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error || !data) return null

  return {
    id: data.id,
    email: '', // filled from auth user below
    nickname: data.nickname || '',
    avatar_url: data.avatar_url || '',
    timezone: data.timezone || 'UTC',
    language: data.language || 'en',
    dietary_preferences: data.dietary_preferences || [],
    created_at: data.created_at,
  }
}

function authUserToPublic(authUser: User, profile: UserPublic | null): UserPublic {
  return {
    id: authUser.id,
    email: authUser.email || '',
    nickname: profile?.nickname || (authUser.user_metadata?.nickname as string) || authUser.email?.split('@')[0] || '',
    avatar_url: profile?.avatar_url || '',
    timezone: profile?.timezone || 'UTC',
    language: profile?.language || 'en',
    dietary_preferences: profile?.dietary_preferences || [],
    created_at: profile?.created_at || authUser.created_at,
  }
}

// ─── Provider ──────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPublic | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Listen to auth state changes
  useEffect(() => {
    let cancelled = false

    getSupabase().auth.getSession().then(({ data: { session: initialSession } }) => {
      if (cancelled) return
      if (initialSession?.user) {
        setSession(initialSession)
        fetchProfile(initialSession.user.id).then(profile => {
          if (!cancelled) {
            setUser(authUserToPublic(initialSession.user, profile))
            // Trigger data migration for existing localStorage data
            migrateLocalData(initialSession.user.id).catch(() => {})
          }
        })
      }
      setIsLoading(false)
    }).catch(() => {
      if (!cancelled) setIsLoading(false)
    })

    const { data: { subscription } } = getSupabase().auth.onAuthStateChange(
      async (event, newSession) => {
        if (cancelled) return
        setSession(newSession)

        if (newSession?.user) {
          const profile = await fetchProfile(newSession.user.id)
          if (!cancelled) {
            setUser(authUserToPublic(newSession.user, profile))
            // Migrate on first sign-in
            if (event === 'SIGNED_IN') {
              migrateLocalData(newSession.user.id).catch(() => {})
            }
          }
        } else {
          setUser(null)
        }

        if (event === 'SIGNED_OUT') {
          setUser(null)
          setSession(null)
        }
      }
    )

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  // ─── Actions ────────────────────────────────────────────────

  const signUp = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    if (!isValidEmail(data.email)) return { success: false, error: 'Please enter a valid email address.' }
    if (data.password.length < 8) return { success: false, error: 'Password must be at least 8 characters.' }
    if (!/[a-zA-Z]/.test(data.password)) return { success: false, error: 'Password must contain at least one letter.' }
    if (!/[0-9]/.test(data.password)) return { success: false, error: 'Password must contain at least one number.' }

    const { data: result, error } = await getSupabase().auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { nickname: data.nickname || data.email.split('@')[0] },
      },
    })

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        return { success: false, error: 'An account with this email already exists.' }
      }
      return { success: false, error: error.message }
    }

    // If email confirmation is off, user is signed in immediately
    if (result.user && result.session) {
      const profile = await fetchProfile(result.user.id)
      setUser(authUserToPublic(result.user, profile))
      setSession(result.session)
      return { success: true }
    }

    // Email confirmation required
    return { success: true }
  }, [])

  const signInWithPassword = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) return { success: false, error: 'Please enter your email and password.' }

    const { data, error } = await getSupabase().auth.signInWithPassword({ email, password })

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return { success: false, error: 'Incorrect email or password.' }
      }
      if (error.message.includes('Email not confirmed')) {
        return { success: false, error: 'Please verify your email first. Check your inbox.' }
      }
      return { success: false, error: error.message }
    }

    if (data.user) {
      const profile = await fetchProfile(data.user.id)
      setUser(authUserToPublic(data.user, profile))
      setSession(data.session)
    }

    return { success: true }
  }, [])

  const sendOtp = useCallback(async (email: string, shouldCreateUser = false): Promise<{ success: boolean; error?: string }> => {
    if (!isValidEmail(email)) return { success: false, error: 'Please enter a valid email address.' }

    const { error } = await getSupabase().auth.signInWithOtp({
      email,
      options: { shouldCreateUser },
    })

    if (error) return { success: false, error: error.message }
    return { success: true }
  }, [])

  const verifyOtp = useCallback(async (email: string, token: string): Promise<{ success: boolean; error?: string }> => {
    if (token.length < 6) return { success: false, error: 'Please enter the 6-digit verification code.' }

    const { data, error } = await getSupabase().auth.verifyOtp({
      email,
      token,
      type: 'email',
    })

    if (error) return { success: false, error: 'Invalid or expired code. Please try again.' }

    if (data.user) {
      const profile = await fetchProfile(data.user.id)
      setUser(authUserToPublic(data.user, profile))
      setSession(data.session)
    }

    return { success: true }
  }, [])

  const resetPasswordForEmail = useCallback(async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (!isValidEmail(email)) return { success: false, error: 'Please enter a valid email address.' }

    const { error } = await getSupabase().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/forgot-password`,
    })

    // Supabase always returns success (doesn't reveal if email exists)
    if (error) return { success: false, error: error.message }
    return { success: true }
  }, [])

  const updateUserPassword = useCallback(async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (newPassword.length < 8) return { success: false, error: 'Password must be at least 8 characters.' }
    if (!/[a-zA-Z]/.test(newPassword)) return { success: false, error: 'Password must contain at least one letter.' }
    if (!/[0-9]/.test(newPassword)) return { success: false, error: 'Password must contain at least one number.' }

    const { error } = await getSupabase().auth.updateUser({ password: newPassword })
    if (error) return { success: false, error: error.message }
    return { success: true }
  }, [])

  const updateProfile = useCallback(async (data: UpdateProfileData): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated.' }

    const updates: Record<string, unknown> = {}
    if (data.nickname !== undefined) {
      const trimmed = data.nickname.trim()
      if (!trimmed) return { success: false, error: 'Nickname cannot be empty.' }
      if (trimmed.length > 32) return { success: false, error: 'Nickname must be 32 characters or fewer.' }
      updates.nickname = trimmed
    }
    if (data.avatar_url !== undefined) updates.avatar_url = data.avatar_url
    if (data.timezone !== undefined) updates.timezone = data.timezone
    if (data.language !== undefined) updates.language = data.language
    if (data.dietary_preferences !== undefined) updates.dietary_preferences = data.dietary_preferences
    updates.updated_at = new Date().toISOString()

    const { error } = await getSupabase().from('profiles').update(updates).eq('id', user.id)

    if (error) return { success: false, error: error.message }

    // Refresh local state
    const profile = await fetchProfile(user.id)
    if (profile) setUser(authUserToPublic({ id: user.id, email: user.email } as User, profile))

    return { success: true }
  }, [user])

  const signOut = useCallback(async () => {
    await getSupabase().auth.signOut()
    setUser(null)
    setSession(null)
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!user) return
    const profile = await fetchProfile(user.id)
    if (profile) setUser(authUserToPublic({ id: user.id, email: user.email } as User, profile))
  }, [user])

  // ─── Value ──────────────────────────────────────────────────

  const value: AuthContextValue = {
    user,
    session,
    isAuthenticated: !!user && !!session,
    isLoading,
    signUp,
    signInWithPassword,
    sendOtp,
    verifyOtp,
    resetPasswordForEmail,
    updateUserPassword,
    updateProfile,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ─── Hook ──────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>.')
  }
  return ctx
}
