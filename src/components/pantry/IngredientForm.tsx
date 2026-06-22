import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import type { Ingredient, IngredientCategory } from '@/types'
import { ingredientTags } from '@/data/ingredients'

interface IngredientFormProps {
  initial?: Ingredient | null
  onSubmit: (data: Omit<Ingredient, 'id' | 'addedAt'>) => void
  onCancel: () => void
}

const categories: { value: IngredientCategory; label: string; emoji: string }[] = [
  { value: 'ingredient', label: '食材', emoji: '🥬' },
  { value: 'seasoning', label: '调料', emoji: '🧂' },
  { value: 'tool', label: '厨具', emoji: '🍳' },
]

export function IngredientForm({ initial, onSubmit, onCancel }: IngredientFormProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<IngredientCategory>('ingredient')
  const [quantity, setQuantity] = useState<number | undefined>(undefined)
  const [unit, setUnit] = useState('')
  const [emoji, setEmoji] = useState('🥬')
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    if (initial) {
      setName(initial.name)
      setCategory(initial.category)
      setQuantity(initial.quantity)
      setUnit(initial.unit || '')
      setEmoji(initial.emoji)
      setTags(initial.tags)
    }
  }, [initial])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit({
      name: name.trim(),
      category,
      quantity,
      unit: unit || undefined,
      emoji,
      tags,
    })
  }

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const emojis = ['🥬', '🥩', '🐟', '🥚', '🥛', '🧀', '🍅', '🥕', '🧅', '🧄', '🫑', '🥦', '🍄', '🌽', '🥑', '🍗', '🦐', '🫘', '🍚', '🍝', '🧂', '🫗', '🍯', '🍳', '🔪', '🔥']

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-caramel-600 mb-1.5">名称 *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例如：鸡蛋、面粉..."
          className="input-dreamy"
          required
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-caramel-600 mb-1.5">分类</label>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.value}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat.value)}
              className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                category === cat.value
                  ? 'gradient-logo text-white shadow-md'
                  : 'bg-cream-200 text-caramel-500 hover:bg-caramel-200'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-caramel-600 mb-1.5">数量</label>
          <input
            type="number"
            value={quantity ?? ''}
            onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : undefined)}
            placeholder="0"
            className="input-dreamy"
            min="0"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-caramel-600 mb-1.5">单位</label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="个 / g / ml..."
            className="input-dreamy"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-caramel-600 mb-1.5">图标</label>
        <div className="flex flex-wrap gap-1.5">
          {emojis.map((e) => (
            <motion.button
              key={e}
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setEmoji(e)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-lg transition-all duration-200 ${
                emoji === e
                  ? 'gradient-logo shadow-md scale-110'
                  : 'bg-cream-200 hover:bg-caramel-200'
              }`}
            >
              {e}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-caramel-600 mb-1.5">标签</label>
        <div className="flex flex-wrap gap-1.5">
          {ingredientTags.slice(0, 15).map((tag) => (
            <Tag
              key={tag}
              label={tag}
              selected={tags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" icon={initial ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}>
          {initial ? '保存修改' : '添加'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          取消
        </Button>
      </div>
    </form>
  )
}
