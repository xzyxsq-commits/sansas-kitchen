import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, User, Mail, Globe, Languages, Utensils, Camera, Save, Shield, Key } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/utils/cn'

const TIMEZONES = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Toronto', 'America/Vancouver', 'America/Sao_Paulo', 'America/Argentina/Buenos_Aires',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Madrid', 'Europe/Rome',
  'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Seoul', 'Asia/Singapore', 'Asia/Kolkata',
  'Asia/Dubai', 'Asia/Hong_Kong', 'Asia/Bangkok', 'Asia/Jakarta',
  'Australia/Sydney', 'Australia/Melbourne', 'Pacific/Auckland',
  'Africa/Cairo', 'Africa/Lagos', 'Africa/Johannesburg',
]

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
]

const DIET_OPTIONS = [
  'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo',
  'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Low-Carb', 'Halal',
  'Kosher', 'Low-Sodium', 'Diabetic-Friendly', 'No Restrictions',
]

export default function Profile() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, updateProfile, updateUserPassword, signOut } = useAuth()

  const [nickname, setNickname] = useState('')
  const [timezone, setTimezone] = useState('UTC')
  const [language, setLanguage] = useState('en')
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Password change
  const [showPwdSection, setShowPwdSection] = useState(false)
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [changingPwd, setChangingPwd] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/login', { replace: true })
  }, [isAuthenticated, isLoading, navigate])

  useEffect(() => {
    if (user) {
      setNickname(user.nickname)
      setTimezone(user.timezone)
      setLanguage(user.language)
      setDietaryPreferences(user.dietary_preferences)
    }
  }, [user])

  const toggleDiet = (diet: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    )
  }

  const handleSaveProfile = async () => {
    if (!nickname.trim()) {
      setMessage({ type: 'error', text: 'Nickname cannot be empty.' })
      return
    }
    setSaving(true)
    setMessage(null)
    const result = await updateProfile({
      nickname: nickname.trim(),
      timezone,
      language,
      dietary_preferences: dietaryPreferences,
    })
    setSaving(false)
    setMessage(result.success
      ? { type: 'success', text: 'Profile updated!' }
      : { type: 'error', text: result.error || 'Failed to update profile.' }
    )
  }

  const handleChangePassword = async () => {
    if (!newPwd) {
      setMessage({ type: 'error', text: 'Please enter a new password.' })
      return
    }
    setChangingPwd(true)
    setMessage(null)
    const result = await updateUserPassword(newPwd)
    setChangingPwd(false)
    if (result.success) {
      setCurrentPwd('')
      setNewPwd('')
      setShowPwdSection(false)
      setMessage({ type: 'success', text: 'Password changed successfully!' })
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to change password.' })
    }
  }

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-4 border-caramel-200 border-t-peach-400"
        />
      </div>
    )
  }

  const initials = user.nickname
    .split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Back + Title */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2.5 rounded-xl hover:bg-cream-200 transition-colors">
            <ArrowLeft className="w-5 h-5 text-caramel-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-caramel-700">Profile</h1>
            <p className="text-sm text-caramel-400">Manage your account</p>
          </div>
        </div>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className={cn(
                'rounded-2xl px-4 py-3 mb-6 text-sm font-medium',
                message.type === 'success' ? 'bg-sage-50 border border-sage-200 text-sage-700' : 'bg-rose-50 border border-rose-200 text-rose-600'
              )}
              onAnimationComplete={() => { if (message.type === 'success') setTimeout(() => setMessage(null), 3000) }}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar & Nickname card */}
        <div className="card-magic p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-peach-300 via-peach-400 to-peach-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-peach-400/20 overflow-hidden">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.nickname} className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <button className="absolute inset-0 rounded-2xl bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-caramel-400 uppercase tracking-wider">Nickname</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={32}
                className="input-magic mt-1"
              />
            </div>
          </div>
        </div>

        {/* Email (read-only) */}
        <div className="card-magic p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-4 h-4 text-caramel-400" />
            <h3 className="font-semibold text-caramel-700">Email</h3>
          </div>
          <p className="text-caramel-500 bg-cream-100 rounded-xl px-4 py-2.5 text-sm">{user.email}</p>
        </div>

        {/* Timezone & Language */}
        <div className="card-magic p-6 mb-6 space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-4 h-4 text-caramel-400" />
              <h3 className="font-semibold text-caramel-700">Timezone</h3>
            </div>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="input-magic"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Languages className="w-4 h-4 text-caramel-400" />
              <h3 className="font-semibold text-caramel-700">Language</h3>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-magic"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dietary preferences */}
        <div className="card-magic p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Utensils className="w-4 h-4 text-caramel-400" />
            <h3 className="font-semibold text-caramel-700">Dietary Preferences</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {DIET_OPTIONS.map((diet) => {
              const selected = dietaryPreferences.includes(diet)
              return (
                <button
                  key={diet}
                  onClick={() => toggleDiet(diet)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border-2',
                    selected
                      ? 'bg-peach-100 border-peach-400 text-peach-700'
                      : 'bg-white/50 border-caramel-200 text-caramel-500 hover:border-caramel-300'
                  )}
                >
                  {diet}
                </button>
              )
            })}
          </div>
        </div>

        {/* Save */}
        <button onClick={handleSaveProfile} disabled={saving} className="btn-magic w-full py-3.5 mb-6">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>

        {/* Change Password */}
        <div className="card-magic p-6 mb-6">
          <button
            onClick={() => setShowPwdSection(!showPwdSection)}
            className="flex items-center gap-3 w-full text-left"
          >
            <Key className="w-4 h-4 text-caramel-400" />
            <div className="flex-1">
              <h3 className="font-semibold text-caramel-700">Change Password</h3>
              <p className="text-xs text-caramel-400">Update your account password</p>
            </div>
            <span className="text-sm text-peach-500 font-semibold">{showPwdSection ? 'Cancel' : 'Change'}</span>
          </button>

          <AnimatePresence>
            {showPwdSection && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-caramel-200/50 space-y-3">
                  <input
                    type="password"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    placeholder="Current password"
                    className="input-magic"
                  />
                  <input
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="New password"
                    className="input-magic"
                  />
                  <button onClick={handleChangePassword} disabled={changingPwd} className="btn-ghost w-full py-2.5 text-sm">
                    {changingPwd ? 'Changing...' : 'Update Password'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Danger zone */}
        <div className="card-magic p-6 border-rose-200/30">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-4 h-4 text-rose-400" />
            <div>
              <h3 className="font-semibold text-caramel-700">Sign Out</h3>
              <p className="text-xs text-caramel-400">Sign out of your account on this device</p>
            </div>
          </div>
          <button
            onClick={() => { signOut(); navigate('/', { replace: true }) }}
            className="px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
