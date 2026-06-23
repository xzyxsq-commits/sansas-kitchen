import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Package } from 'lucide-react'
import { useUserPantry } from '@/hooks/useUserPantry'
import { useAuth } from '@/contexts/AuthContext'
import { CategoryTabs } from '@/components/pantry/CategoryTabs'
import { IngredientCard } from '@/components/pantry/IngredientCard'
import { IngredientForm } from '@/components/pantry/IngredientForm'
import { SearchBar } from '@/components/ui/SearchBar'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { Ingredient, PantryTab } from '@/types'

export default function Pantry() {
  const { user } = useAuth()
  const { ingredients, addIngredient, updateIngredient, deleteIngredient, searchIngredients, stats } = useUserPantry(user?.id)
  const [activeTab, setActiveTab] = useState<PantryTab>('all')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null)

  const filtered = useMemo(() => {
    let result = search ? searchIngredients(search) : ingredients
    if (activeTab !== 'all') {
      result = result.filter((ing) => ing.category === activeTab)
    }
    return result
  }, [ingredients, activeTab, search, searchIngredients])

  const handleSubmit = (data: Omit<Ingredient, 'id' | 'addedAt'>) => {
    if (editingIngredient) {
      updateIngredient(editingIngredient.id, data)
    } else {
      addIngredient(data)
    }
    setModalOpen(false)
    setEditingIngredient(null)
  }

  const handleEdit = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setEditingIngredient(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-300/30">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-caramel-700">食材库</h1>
            <p className="text-sm text-caramel-400">
              共 {stats.total} 种 · 食材 {stats.ingredientCount} · 调料 {stats.seasoningCount} · 厨具 {stats.toolCount}
            </p>
          </div>
        </div>
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
          添加物品
        </Button>
      </motion.div>

      <div className="space-y-4 mb-6">
        <CategoryTabs
          active={activeTab}
          onChange={setActiveTab}
          counts={{ all: stats.total, ingredient: stats.ingredientCount, seasoning: stats.seasoningCount, tool: stats.toolCount }}
        />
        <SearchBar value={search} onChange={setSearch} placeholder="搜索食材、调料、厨具..." />
      </div>

      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              onEdit={handleEdit}
              onDelete={deleteIngredient}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <span className="text-6xl block mb-4">📦</span>
          <h3 className="text-xl font-display font-bold text-caramel-600 mb-2">
            {search ? '没有找到匹配的物品' : '食材库是空的'}
          </h3>
          <p className="text-caramel-400 mb-6">{search ? '试试其他关键词' : '开始添加你的厨房库存吧'}</p>
          {!search && (
            <Button icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
              添加第一件物品
            </Button>
          )}
        </motion.div>
      )}

      <Modal isOpen={modalOpen} onClose={handleClose} title={editingIngredient ? '编辑物品' : '添加物品'}>
        <IngredientForm initial={editingIngredient} onSubmit={handleSubmit} onCancel={handleClose} />
      </Modal>
    </div>
  )
}
