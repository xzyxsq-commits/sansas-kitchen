import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

interface CardProps { children: ReactNode; className?: string; hover?: boolean; padding?: 'none' | 'sm' | 'md' | 'lg'; onClick?: () => void }

export function Card({ children, className, hover = true, padding = 'md', onClick }: CardProps) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onClick={onClick}
      className={cn('card-magic cursor-pointer', paddings[padding], className)}
    >{children}</motion.div>
  )
}
