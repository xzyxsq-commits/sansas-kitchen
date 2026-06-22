import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants = {
    default: 'bg-cream-300 text-caramel-600',
    success: 'bg-sage-100 text-sage-500',
    warning: 'bg-honey-100 text-honey-600',
    danger: 'bg-rose-100 text-rose-500',
    info: 'bg-blue-50 text-blue-500',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span className={cn('inline-flex items-center rounded-full font-semibold', variants[variant], sizes[size], className)}>
      {children}
    </span>
  )
}
