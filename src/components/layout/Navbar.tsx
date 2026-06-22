import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, Package, BookOpen, Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

const navItems = [
  { path: '/', label: '首页', icon: ChefHat },
  { path: '/pantry', label: '食材库', icon: Package },
  { path: '/cooking', label: '烹饪区', icon: Sparkles },
  { path: '/diary', label: '记录区', icon: BookOpen },
]

export function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-peach-300 via-peach-400 to-peach-500 flex items-center justify-center shadow-lg shadow-peach-400/20 group-hover:shadow-xl group-hover:shadow-peach-400/30 transition-all duration-300 overflow-hidden">
                <img
                  src="/Sansa/logo.png"
                  alt="Sansa's Kitchen"
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                    const parent = (e.target as HTMLImageElement).parentElement!
                    parent.innerHTML = '<span style="font-size:1.5rem">🐱</span>'
                    parent.style.display = 'flex'
                    parent.style.alignItems = 'center'
                    parent.style.justifyContent = 'center'
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-display font-bold text-caramel-700 leading-tight">
                  Sansa's Kitchen
                </h1>
                <p className="text-xs text-caramel-400 font-body leading-tight">
                  Cook with Love ✦
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm rounded-2xl p-1 shadow-inner-soft">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
                        isActive
                          ? 'text-white'
                          : 'text-caramel-500 hover:text-caramel-700'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 gradient-logo rounded-xl shadow-md"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-cream-200 transition-colors"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-caramel-600" />
              ) : (
                <Menu className="w-6 h-6 text-caramel-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 md:hidden glass-strong border-t border-cream-300/50"
          >
            <div className="p-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.97 }}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all duration-200',
                        isActive
                          ? 'gradient-logo text-white shadow-md'
                          : 'text-caramel-600 hover:bg-cream-200'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  )
}
