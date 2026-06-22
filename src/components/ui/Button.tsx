import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  loading?: boolean
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', icon, loading, children, className, disabled, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-peach-400/20'
  const variants = {
    primary: 'btn-magic',
    secondary: 'btn-ghost',
    ghost: 'bg-transparent text-caramel-500 hover:bg-cream-200 hover:-translate-y-0.5 active:translate-y-0',
    danger: 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-lg shadow-rose-300/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0',
  }
  const sizes = { sm: 'px-4 py-2 text-sm rounded-xl', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg rounded-3xl' }
  return (
    <motion.button
      whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
      className={cn(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)}
      disabled={disabled || loading} {...(props as any)}
    >
      {loading ? <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
      : icon ? <span className="flex-shrink-0">{icon}</span> : null}
      {children}
    </motion.button>
  )
}
