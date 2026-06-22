import { motion } from 'framer-motion'
import { Trash2, Star } from 'lucide-react'
import type { DiaryEntry } from '@/types'

interface DailyRecordProps {
  entry: DiaryEntry
  onDelete: (id: string) => void
}

const mealTypeLabels: Record<string, { label: string; emoji: string; color: string }> = {
  breakfast: { label: '早餐', emoji: '🌅', color: 'bg-honey-100 text-honey-700' },
  lunch: { label: '午餐', emoji: '☀️', color: 'bg-sage-100 text-sage-500' },
  dinner: { label: '晚餐', emoji: '🌙', color: 'bg-rose-100 text-rose-500' },
  snack: { label: '加餐', emoji: '🍪', color: 'bg-purple-100 text-purple-500' },
}

export function DailyRecord({ entry, onDelete }: DailyRecordProps) {
  const meal = mealTypeLabels[entry.mealType]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 hover:bg-white/90 transition-all duration-200 border border-caramel-200/30"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cream-200 to-cream-300 flex items-center justify-center text-2xl shadow-inner-soft">
        {entry.recipeEmoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="font-semibold text-caramel-700 text-sm truncate">{entry.recipeName}</h4>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${meal.color} flex-shrink-0`}>
            {meal.emoji} {meal.label}
          </span>
        </div>
        {entry.notes && (
          <p className="text-xs text-caramel-400 truncate">{entry.notes}</p>
        )}
        <div className="flex items-center gap-0.5 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < entry.rating ? 'text-honey-400 fill-honey-400' : 'text-caramel-200'}`}
            />
          ))}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onDelete(entry.id)}
        className="flex-shrink-0 p-2 rounded-lg hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-4 h-4 text-rose-400" />
      </motion.button>
    </motion.div>
  )
}
