import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, Package, BookOpen, Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuth } from '@/contexts/AuthContext'
import { UserMenu, AuthButtons } from '@/components/auth/UserMenu'

const navItems = [
  { path: '/', label: 'Home', icon: ChefHat },
  { path: '/pantry', label: 'Pantry', icon: Package },
  { path: '/cooking', label: 'Cook', icon: Sparkles },
  { path: '/diary', label: 'Diary', icon: BookOpen },
]

export function Navbar() {
  const location = useLocation()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          scrolled
            ? 'glass-strong shadow-soft'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-peach-300 via-peach-400 to-peach-500 flex items-center justify-center shadow-lg shadow-peach-400/20 group-hover:shadow-xl group-hover:shadow-peach-400/30 transition-all duration-300 overflow-hidden group-hover:scale-105">
                <img
                  src="/Sansa/logo.png"
                  alt="Sansa's Kitchen"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-display font-bold text-caramel-700 leading-tight">
                  Sansa's Kitchen
                </h1>
                <p className="text-[11px] text-caramel-400 font-body tracking-wide">
                  Cook with Love ✦
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-md rounded-2xl p-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={cn(
                        'relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                        isActive
                          ? 'text-white'
                          : 'text-caramel-500 hover:text-caramel-700'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 gradient-logo rounded-xl shadow-md"
                          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        />
                      )}
                      <Icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center">
              {isLoading ? (
                <div className="w-8 h-8 rounded-full skeleton" />
              ) : isAuthenticated ? (
                <UserMenu />
              ) : (
                <AuthButtons />
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-cream-200 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5 text-caramel-600" /> : <Menu className="w-5 h-5 text-caramel-600" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/15 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="fixed top-20 inset-x-4 z-40 md:hidden glass-strong rounded-3xl p-3 shadow-soft-lg"
            >
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                return (
                  <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold mb-1 transition-all',
                        isActive ? 'gradient-logo text-white shadow-md' : 'text-caramel-600 hover:bg-cream-200'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                )
              })}

              {/* Mobile auth */}
              <div className="mt-2 pt-2 border-t border-caramel-200/50">
                {!isLoading && (
                  isAuthenticated ? (
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-caramel-700">👋 {user?.nickname}</p>
                      <Link
                        to="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="block mt-1 text-xs text-peach-500 font-medium hover:text-peach-600 transition-colors"
                      >
                        Profile & Settings
                      </Link>
                    </div>
                  ) : (
                    <div className="flex gap-2 px-4 py-2">
                      <Link
                        to="/login"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold btn-ghost"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold btn-magic"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-16 md:h-20" />
    </>
  )
}
