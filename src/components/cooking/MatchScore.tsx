import { cn } from '@/utils/cn'
import { Check, AlertCircle, Lightbulb } from 'lucide-react'

interface MatchScoreProps {
  score: number
  tier: 'perfect' | 'almost' | 'explore'
  size?: 'sm' | 'md' | 'lg'
}

const tierConfig = {
  perfect: {
    icon: Check,
    label: '立即可做',
    bg: 'bg-sage-100 text-sage-500',
    bar: 'bg-gradient-to-r from-sage-400 to-sage-500',
  },
  almost: {
    icon: AlertCircle,
    label: '差少许材料',
    bg: 'bg-honey-100 text-honey-600',
    bar: 'bg-gradient-to-r from-honey-400 to-honey-500',
  },
  explore: {
    icon: Lightbulb,
    label: '探索发现',
    bg: 'bg-rose-100 text-rose-500',
    bar: 'bg-gradient-to-r from-rose-300 to-rose-400',
  },
}

export function MatchScore({ score, tier, size = 'md' }: MatchScoreProps) {
  const config = tierConfig[tier]
  const Icon = config.icon

  const sizeStyles = {
    sm: { bar: 'h-1.5', text: 'text-xs' },
    md: { bar: 'h-2', text: 'text-sm' },
    lg: { bar: 'h-3', text: 'text-base' },
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className={cn('flex items-center gap-1 font-semibold', sizeStyles[size].text, config.bg, 'px-2 py-0.5 rounded-full')}>
          <Icon className="w-3.5 h-3.5" />
          {config.label}
        </span>
        <span className={cn('font-bold text-caramel-600', sizeStyles[size].text)}>
          {score}%
        </span>
      </div>
      <div className={cn('w-full bg-caramel-100 rounded-full overflow-hidden', sizeStyles[size].bar)}>
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', config.bar)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
