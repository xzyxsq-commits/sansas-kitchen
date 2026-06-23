import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Mail, Check } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { VerificationInput } from '@/components/auth/VerificationInput'
import { isValidEmail } from '@/utils/auth'

type Step = 'email' | 'verify' | 'password' | 'done'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { sendOtp, verifyOtp, updateUserPassword, isAuthenticated } = useAuth()

  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
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
      setError(result.error || 'Failed to send code.')
    }
  }

  const handleVerify = async () => {
    setError('')
    if (code.length < 6) {
      setError('Please enter the 6-digit verification code.')
      return
    }
    setLoading(true)
    const result = await verifyOtp(email, code)
    setLoading(false)
    if (result.success) {
      setStep('password')
    } else {
      setError(result.error || 'Invalid code.')
    }
  }

  const handleReset = async () => {
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (!/[a-zA-Z]/.test(password)) {
      setError('Password must contain at least one letter.')
      return
    }
    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one number.')
      return
    }
    setLoading(true)
    const result = await updateUserPassword(password)
    setLoading(false)
    if (result.success) {
      setStep('done')
    } else {
      setError(result.error || 'Password reset failed.')
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

  const steps: { key: Step; label: string }[] = [
    { key: 'email', label: 'Email' },
    { key: 'verify', label: 'Verify' },
    { key: 'password', label: 'Reset' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 sparkle-bg pointer-events-none" />
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-[10%] text-4xl opacity-20 pointer-events-none">🔑</motion.div>

      {step === 'done' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-full max-w-md card-magic p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-sage-500" />
          </motion.div>
          <h1 className="text-2xl font-display font-bold text-caramel-700 mb-2">Password Reset!</h1>
          <p className="text-caramel-400 mb-8">Your password has been updated.</p>
          <Link to="/" className="btn-magic px-10 py-3.5 inline-block">
            Back to Kitchen
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md"
        >
          <div className="card-magic p-8 md:p-10">
            <div className="text-center mb-6">
              <Link to="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-peach-300 via-peach-400 to-peach-500 shadow-lg shadow-peach-400/20 mb-5">
                <img src="/Sansa/logo.png" alt="Sansa" className="w-10 h-10 rounded-xl" />
              </Link>
              <h1 className="text-2xl font-display font-bold text-caramel-700 mb-1">Reset Password</h1>
              <p className="text-sm text-caramel-400">We'll help you get back in</p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-7">
              {steps.map((s, i) => {
                const isActive = step === s.key
                const isDone = steps.findIndex(x => x.key === step) > i
                return (
                  <div key={s.key} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isDone ? 'bg-sage-400 text-white' : isActive ? 'gradient-logo text-white shadow-md' : 'bg-cream-200 text-caramel-400'
                    }`}>
                      {isDone ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    {i < steps.length - 1 && <div className={`w-4 h-0.5 rounded-full ${isDone ? 'bg-sage-300' : 'bg-cream-300'}`} />}
                  </div>
                )
              })}
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

            {/* Step 1: Email */}
            {step === 'email' && (
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-caramel-400" />
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address" autoComplete="email" autoFocus className="input-magic pl-11"
                  />
                </div>
                <button onClick={handleSendCode} disabled={loading} className="btn-magic w-full py-3.5 text-base">
                  {loading ? 'Sending...' : 'Send Reset Code'}
                </button>
              </div>
            )}

            {/* Step 2: Verify */}
            {step === 'verify' && (
              <div className="space-y-5">
                <p className="text-sm text-caramel-500 text-center">
                  Enter the code sent to <span className="font-semibold text-caramel-600">{email}</span>
                </p>
                <VerificationInput value={code} onChange={setCode} error="" />
                <button onClick={handleVerify} disabled={loading || code.length < 6} className="btn-magic w-full py-3.5 text-base">
                  {loading ? 'Verifying...' : 'Verify Identity'}
                </button>
                <div className="text-center space-y-2">
                  <button onClick={() => { setStep('email'); setError(''); setCode('') }}
                    className="text-xs font-medium text-caramel-400 hover:text-caramel-600 transition-colors flex items-center gap-1 mx-auto">
                    <ArrowLeft className="w-3 h-3" /> Change email
                  </button>
                  <p className="text-xs text-caramel-400">
                    {countdown > 0 ? (
                      <span className="text-caramel-300">Resend in {countdown}s</span>
                    ) : (
                      <button onClick={handleResendCode} className="font-semibold text-peach-500 hover:text-peach-600 transition-colors">
                        Resend code
                      </button>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: New password */}
            {step === 'password' && (
              <div className="space-y-4">
                <p className="text-sm text-caramel-500 text-center">Choose a new password</p>
                <PasswordInput value={password} onChange={setPassword} placeholder="New password" showStrength autoFocus />
                <button onClick={handleReset} disabled={loading} className="btn-magic w-full py-3.5 text-base">
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            )}

            <p className="text-center text-sm text-caramel-400 mt-6">
              <Link to="/login" className="font-semibold text-peach-500 hover:text-peach-600 transition-colors flex items-center gap-1 justify-center">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
