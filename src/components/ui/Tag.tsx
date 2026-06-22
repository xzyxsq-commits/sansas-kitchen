import { cn } from '@/utils/cn'
import { X } from 'lucide-react'

interface TagProps {
  label: string
  selected?: boolean
  onRemove?: () => void
  onClick?: () => void
  className?: string
}

export function Tag({ label, selected, onRemove, onClick, className }: TagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
        selected
          ? 'gradient-logo text-white shadow-md'
          : 'bg-cream-300 text-caramel-500 hover:bg-caramel-200 cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="p-0.5 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  )
}
