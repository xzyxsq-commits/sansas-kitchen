import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Plus, Calendar, TrendingUp } from 'lucide-react'
import { useDiary } from '@/hooks/useDiary'
import { useRecipes } from '@/hooks/useRecipes'
import { DailyRecord } from '@/components/diary/DailyRecord'
import { TopRecipesList, HeatMap, PieChart, BarChart } from '@/components/diary/StatsCharts'
import { AnimalCard } from '@/components/diary/AnimalCard'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { DiaryMealType } from '@/types'

const mealTypes: { key: DiaryMealType; label: string; emoji: string }[] = [
  { key: 'breakfast', label: '早餐', emoji: '🌅' },
  { key: 'lunch', label: '午餐', emoji: '☀️' },
  { key: 'dinner', label: '晚餐', emoji: '🌙' },
  { key: 'snack', label: '加餐', emoji: '🍪' },
]

export default function FoodDiary() {
  const { entries, addEntry, deleteEntry, weeklyStats, monthlyStats, foodAnimals } = useDiary()
  const { allRecipes } = useRecipes()
  const [modalOpen, setModalOpen] = useState(false)
  const [activeView, setActiveView] = useState<'records' | 'stats'>('records')

  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    mealType: 'lunch' as DiaryMealType,
    recipeId: '',
    notes: '',
    rating: 4,
  })

  const today = '2026-06-22'
  const todayEntries = useMemo(() => entries.filter((e) => e.date === today), [entries, today])

  const handleAddEntry = () => {
    const recipe = allRecipes.find((r) => r.id === newEntry.recipeId)
    if (!recipe) return
    addEntry({
      date: newEntry.date,
      mealType: newEntry.mealType,
      recipeId: newEntry.recipeId,
      recipeName: recipe.name,
      recipeEmoji: recipe.emoji,
      notes: newEntry.notes,
      rating: newEntry.rating,
    })
    setModalOpen(false)
    setNewEntry({ date: new Date().toISOString().split('T')[0], mealType: 'lunch', recipeId: '', notes: '', rating: 4 })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-300/30">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-caramel-700">记录区</h1>
            <p className="text-sm text-caramel-400">本周 {weeklyStats.totalMeals} 餐 · 本月 {monthlyStats.totalMeals} 餐</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white/60 rounded-2xl p-1.5">
            <button onClick={() => setActiveView('records')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${activeView === 'records' ? 'gradient-logo text-white shadow-md' : 'text-caramel-500'}`}>
              <Calendar className="w-4 h-4 inline mr-1.5" />记录
            </button>
            <button onClick={() => setActiveView('stats')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${activeView === 'stats' ? 'gradient-logo text-white shadow-md' : 'text-caramel-500'}`}>
              <TrendingUp className="w-4 h-4 inline mr-1.5" />统计
            </button>
          </div>
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>记录</Button>
        </div>
      </motion.div>

      {activeView === 'records' ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-display font-bold text-caramel-700 mb-4 flex items-center gap-2">
              📅 今日记录 · {today}
            </h2>
            {todayEntries.length > 0 ? (
              <div className="space-y-2 mb-8">
                {todayEntries.map((entry) => (<DailyRecord key={entry.id} entry={entry} onDelete={deleteEntry} />))}
              </div>
            ) : (
              <div className="text-center py-8 mb-8 bg-white/40 rounded-3xl border border-caramel-200/30">
                <span className="text-4xl block mb-2">📝</span>
                <p className="text-caramel-400 mb-4">今天还没有记录</p>
                <Button icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)} size="sm">记录今天的美食</Button>
              </div>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <h2 className="text-xl font-display font-bold text-caramel-700 mb-4">📜 最近记录</h2>
            <div className="space-y-2">
              {entries.slice(0, 20).map((entry) => (<DailyRecord key={entry.id} entry={entry} onDelete={deleteEntry} />))}
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <TopRecipesList data={weeklyStats.topRecipes} title="🏆 本周TOP10" />
            <TopRecipesList data={monthlyStats.topRecipes} title="🌟 本月TOP10" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <PieChart data={monthlyStats.cuisineDistribution} />
            <BarChart weekly={weeklyStats} monthly={monthlyStats} />
          </div>
          <HeatMap data={monthlyStats.dailyCounts} />
          <div>
            <h2 className="text-2xl font-display font-bold text-caramel-700 mb-4 flex items-center gap-2">🎨 最爱的动物（食物版）</h2>
            <p className="text-sm text-caramel-400 mb-6">根据你的饮食偏好，为你生成了专属的食物小动物伙伴</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {foodAnimals.map((animal, i) => (<AnimalCard key={animal.id} animal={animal} index={i} />))}
            </div>
          </div>
        </motion.div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="记录美食">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-caramel-600 mb-1.5">日期</label>
            <input type="date" value={newEntry.date} onChange={(e) => setNewEntry((p) => ({ ...p, date: e.target.value }))} className="input-dreamy" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-caramel-600 mb-1.5">餐次</label>
            <div className="grid grid-cols-4 gap-2">
              {mealTypes.map((mt) => (
                <button key={mt.key} type="button" onClick={() => setNewEntry((p) => ({ ...p, mealType: mt.key }))}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl text-sm transition-all duration-200 ${newEntry.mealType === mt.key ? 'gradient-logo text-white shadow-md' : 'bg-cream-200 text-caramel-500 hover:bg-caramel-200'}`}>
                  <span className="text-xl">{mt.emoji}</span>
                  <span className="text-xs font-medium">{mt.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-caramel-600 mb-1.5">菜谱</label>
            <select value={newEntry.recipeId} onChange={(e) => setNewEntry((p) => ({ ...p, recipeId: e.target.value }))} className="input-dreamy" required>
              <option value="">选择菜谱...</option>
              {allRecipes.map((r) => (<option key={r.id} value={r.id}>{r.emoji} {r.name}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-caramel-600 mb-1.5">评分</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setNewEntry((p) => ({ ...p, rating: star }))}
                  className={`text-2xl transition-all duration-200 ${star <= newEntry.rating ? 'scale-110' : 'opacity-30'}`}>⭐</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-caramel-600 mb-1.5">备注</label>
            <textarea value={newEntry.notes} onChange={(e) => setNewEntry((p) => ({ ...p, notes: e.target.value }))}
              placeholder="味道如何？有什么改进想法？" className="input-dreamy resize-none h-20" />
          </div>
          <Button onClick={handleAddEntry} disabled={!newEntry.recipeId} className="w-full">
            <Plus className="w-4 h-4" /> 保存记录
          </Button>
        </div>
      </Modal>
    </div>
  )
}
