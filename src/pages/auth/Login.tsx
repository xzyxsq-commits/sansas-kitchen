import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Mail } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { VerificationInput } from '@/components/auth/VerificationInput'
import { isValidEmail } from '@/utils/auth'

type Mode = 'password' | 'code'
type Step = 'email' | 'verify' | 'password'

export default function Login() {
  const navigate = useNavigate()
  const { signInWithPassword, sendOtp, verifyOtp, isAuthenticated } = useAuth()

  const [mode, setMode] = useState<Mode>('password')
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [countdown])

  const handleSendCode = async () => {
    setError('')
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    const result = await sendOtp(email)
    setLoading(false)
    if (result.success) {
      setStep('verify')
      setCountdown(60)
    } else {
      setError(result.error || 'Failed to send verification code.')
    }
  }

  const handleVerifyCode = async () => {
    setError('')
    if (code.length < 6) {
      setError('Please enter the 6-digit verification code.')
      return
    }
    setLoading(true)
    const result = await verifyOtp(email, code)
    setLoading(false)
    if (result.success) {
      navigate('/', { replace: true })
    } else {
      setError(result.error || 'Invalid or expired code.')
    }
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    const result = await signInWithPassword(email, password)
    setLoading(false)
    if (result.success) {
      navigate('/', { replace: true })
    } else {
      setError(result.error || 'Login failed.')
    }
  }

  const handleResendCode = async () => {
    if (countdown > 0) return
    setError('')
    setCode('')
    setLoading(true)
    const result = await sendOtp(email)
    setLoading(false)
    if (result.success) {
      setCountdown(60)
    } else {
      setError(result.error || 'Failed to resend code.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 sparkle-bg pointer-events-none" />
      <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-[10%] text-4xl opacity-20 pointer-events-none">🥐</motion.div>
      <motion.div animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-[12%] text-3xl opacity-20 pointer-events-none">☕</motion.div>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-28 left-[15%] text-5xl opacity-15 pointer-events-none">🧑‍🍳</motion.div>
      <motion.div animate={{ y: [0, 15, 0], rotate: [0, 4, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-[10%] text-3xl opacity-15 pointer-events-none">🍳</motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-md"
      >
        <div className="card-magic p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-peach-300 via-peach-400 to-peach-500 shadow-lg shadow-peach-400/20 mb-5">
              <img src="/Sansa/logo.png" alt="Sansa" className="w-10 h-10 rounded-xl" />
            </Link>
            <h1 className="text-2xl font-display font-bold text-caramel-700 mb-1">Welcome Back</h1>
            <p className="text-sm text-caramel-400">Sign in to your kitchen</p>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-cream-200/60 rounded-2xl p-1 mb-6">
            {(['password', 'code'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setStep('email'); setError(''); setCode(''); setPassword('') }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  mode === m ? 'bg-white text-caramel-700 shadow-sm' : 'text-caramel-400 hover:text-caramel-600'
                }`}
              >
                {m === 'password' ? 'Password' : 'Verify Code'}
              </button>
            ))}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium rounded-2xl px-4 py-3 mb-5 text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password mode */}
          {mode === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-caramel-400" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address" autoComplete="email" className="input-magic pl-11"
                />
              </div>
              <PasswordInput value={password} onChange={setPassword} placeholder="Password" showStrength={false} />
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs font-semibold text-peach-500 hover:text-peach-600 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <button type="submit" disabled={loading} className="btn-magic w-full py-3.5 text-base">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Code mode: email step */}
          {mode === 'code' && step === 'email' && (
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-caramel-400" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address" autoComplete="email" className="input-magic pl-11"
                />
              </div>
              <button onClick={handleSendCode} disabled={loading} className="btn-magic w-full py-3.5 text-base">
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </div>
          )}

          {/* Code mode: verify step */}
          {mode === 'code' && step === 'verify' && (
            <div className="space-y-5">
              <p className="text-sm text-caramel-500 text-center">
                Enter the 6-digit code sent to <span className="font-semibold text-caramel-600">{email}</span>
              </p>
              <VerificationInput value={code} onChange={setCode} error="" />
              <button onClick={handleVerifyCode} disabled={loading || code.length < 6} className="btn-magic w-full py-3.5 text-base">
                {loading ? 'Verifying...' : 'Sign In'}
              </button>
              <div className="text-center space-y-2">
                <button onClick={() => { setStep('email'); setError(''); setCode('') }}
                  className="text-xs font-medium text-caramel-400 hover:text-caramel-600 transition-colors flex items-center gap-1 mx-auto">
                  <ArrowLeft className="w-3 h-3" /> Change email
                </button>
                <p className="text-xs text-caramel-400">
                  Didn't receive code?{' '}
                  {countdown > 0 ? (
                    <span className="text-caramel-300">Resend in {countdown}s</span>
                  ) : (
                    <button onClick={handleResendCode} className="font-semibold text-peach-500 hover:text-peach-600 transition-colors">
                      Resend
                    </button>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-sm text-caramel-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-peach-500 hover:text-peach-600 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
