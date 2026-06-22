import { motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import type { Ingredient } from '@/types'
import { cn } from '@/utils/cn'

interface IngredientCardProps {
  ingredient: Ingredient
  onEdit: (ingredient: Ingredient) => void
  onDelete: (id: string) => void
}

const categoryLabels = {
  ingredient: '食材',
  seasoning: '调料',
  tool: '厨具',
}

const categoryColors = {
  ingredient: 'from-emerald-50 to-green-50 border-emerald-200',
  seasoning: 'from-amber-50 to-yellow-50 border-amber-200',
  tool: 'from-rose-50 to-pink-50 border-rose-200',
}

const categoryIconBg = {
  ingredient: 'bg-emerald-100',
  seasoning: 'bg-amber-100',
  tool: 'bg-rose-100',
}

export function IngredientCard({ ingredient, onEdit, onDelete }: IngredientCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -3 }}
      className={cn(
        'relative bg-gradient-to-br rounded-2xl border p-4 shadow-soft transition-shadow hover:shadow-soft-lg',
        categoryColors[ingredient.category]
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-xl', categoryIconBg[ingredient.category])}>
          {ingredient.emoji}
        </div>
        <div className="flex gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(ingredient)}
            className="p-1.5 rounded-lg hover:bg-white/60 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-caramel-400" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(ingredient.id)}
            className="p-1.5 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
          </motion.button>
        </div>
      </div>

      <h3 className="font-semibold text-caramel-700 mb-1">{ingredient.name}</h3>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/60 text-caramel-500">
          {categoryLabels[ingredient.category]}
        </span>
        {ingredient.quantity && (
          <span className="text-xs text-caramel-400">
            {ingredient.quantity} {ingredient.unit}
          </span>
        )}
      </div>

      {ingredient.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {ingredient.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-white/50 text-caramel-400"
            >
              {tag}
            </span>
          ))}
          {ingredient.tags.length > 3 && (
            <span className="text-xs text-caramel-300">+{ingredient.tags.length - 3}</span>
          )}
        </div>
      )}
    </motion.div>
  )
}
