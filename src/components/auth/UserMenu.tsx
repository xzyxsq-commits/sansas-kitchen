import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/utils/cn'

export function UserMenu() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!user) return null

  const initials = user.nickname
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-cream-200/60 transition-all duration-200"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-peach-300 via-peach-400 to-peach-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-peach-400/20 overflow-hidden flex-shrink-0">
          {user.avatar_url ? (
            <img src={user.avatar_url} alt={user.nickname} className="w-full h-full object-cover" />
          ) : (
            initials || <User className="w-4 h-4" />
          )}
        </div>
        <span className="hidden sm:block text-sm font-semibold text-caramel-700 max-w-[100px] truncate">
          {user.nickname}
        </span>
        <ChevronDown className={cn('w-3.5 h-3.5 text-caramel-400 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-2xl shadow-soft-lg overflow-hidden z-50"
          >
            {/* User info */}
            <div className="px-4 py-3.5 border-b border-caramel-200/50">
              <p className="font-semibold text-caramel-700 text-sm truncate">{user.nickname}</p>
              <p className="text-xs text-caramel-400 truncate">{user.email}</p>
            </div>

            {/* Menu items */}
            <div className="p-1.5">
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-caramel-600 hover:bg-cream-200 transition-colors"
              >
                <User className="w-4 h-4 text-caramel-400" />
                Profile
              </Link>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-caramel-600 hover:bg-cream-200 transition-colors"
              >
                <Settings className="w-4 h-4 text-caramel-400" />
                Settings
              </Link>
              <button
                onClick={() => { signOut(); setOpen(false) }}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/login"
        className="px-4 py-2 text-sm font-semibold text-caramel-600 hover:text-caramel-700 hover:bg-cream-200 rounded-xl transition-all duration-200"
      >
        Sign In
      </Link>
      <Link
        to="/register"
        className="btn-magic px-5 py-2 text-sm rounded-xl"
      >
        Sign Up
      </Link>
    </div>
  )
}
