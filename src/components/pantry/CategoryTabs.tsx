import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { PantryTab } from '@/types'
import { Apple, SprayCanIcon as Spice, Utensils } from 'lucide-react'

interface CategoryTabsProps {
  active: PantryTab
  onChange: (tab: PantryTab) => void
  counts: { all: number; ingredient: number; seasoning: number; tool: number }
}

const tabs: { key: PantryTab; label: string; icon: typeof Apple }[] = [
  { key: 'all', label: '全部', icon: Apple },
  { key: 'ingredient', label: '食材', icon: Apple },
  { key: 'seasoning', label: '调料', icon: Spice },
  { key: 'tool', label: '厨具', icon: Utensils },
]

export function CategoryTabs({ active, onChange, counts }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 p-1.5 bg-white/60 rounded-2xl shadow-inner-soft overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = active === tab.key
        const Icon = tab.icon
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200',
              isActive ? 'text-white' : 'text-caramel-500 hover:text-caramel-700'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="pantry-tab"
                className="absolute inset-0 gradient-logo rounded-xl shadow-md"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{tab.label}</span>
            <span
              className={cn(
                'relative z-10 text-xs px-1.5 py-0.5 rounded-full',
                isActive ? 'bg-white/20' : 'bg-cream-300'
              )}
            >
              {counts[tab.key]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
