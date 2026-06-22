import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Check, AlertCircle, Lightbulb, SlidersHorizontal } from 'lucide-react'
import { useRecipes } from '@/hooks/useRecipes'
import { RecipeCard } from '@/components/cooking/RecipeCard'
import { SearchBar } from '@/components/ui/SearchBar'
import { cn } from '@/utils/cn'
import type { DifficultyFilter } from '@/types'

const tiers = [
  { key: 'all', label: '全部', icon: Sparkles, color: 'text-caramel-500' },
  { key: 'perfect', label: '立即可做', icon: Check, color: 'text-sage-500' },
  { key: 'almost', label: '差1-2种', icon: AlertCircle, color: 'text-honey-500' },
  { key: 'explore', label: '探索发现', icon: Lightbulb, color: 'text-rose-500' },
]

const cuisines = ['all', '中式', '粤菜', '湘菜', '川菜', '日式', '意式', '法式', '西式', '美式', '融合']
const difficulties: { key: DifficultyFilter; label: string }[] = [
  { key: 'all', label: '全部难度' },
  { key: 'easy', label: '简单' },
  { key: 'medium', label: '普通' },
  { key: 'hard', label: '困难' },
]

export default function CookingStudio() {
  const { matchResults, perfectMatches, almostMatches, exploreMatches, searchRecipes, filterByCategory, filterByDifficulty } = useRecipes()
  const [search, setSearch] = useState('')
  const [activeTier, setActiveTier] = useState<string>('all')
  const [cuisine, setCuisine] = useState('all')
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')

  const displayResults = useMemo(() => {
    let results = matchResults
    if (activeTier === 'perfect') results = perfectMatches
    else if (activeTier === 'almost') results = almostMatches
    else if (activeTier === 'explore') results = exploreMatches
    if (cuisine !== 'all') results = results.filter((m) => m.recipe.cuisine === cuisine)
    if (difficulty !== 'all') results = results.filter((m) => m.recipe.difficulty === difficulty)
    if (search) results = searchRecipes(search).filter((m) => results.includes(m))
    return results
  }, [matchResults, perfectMatches, almostMatches, exploreMatches, activeTier, cuisine, difficulty, search, searchRecipes])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-honey-400 to-honey-500 flex items-center justify-center shadow-lg shadow-honey-400/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-caramel-700">烹饪区</h1>
            <p className="text-sm text-caramel-400">
              {perfectMatches.length}个立即可做 · {matchResults.length}个菜谱
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tier tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {tiers.map((tier) => {
          const Icon = tier.icon
          const isActive = activeTier === tier.key
          const counts: Record<string, number> = {
            all: matchResults.length,
            perfect: perfectMatches.length,
            almost: almostMatches.length,
            explore: exploreMatches.length,
          }
          return (
            <button
              key={tier.key}
              onClick={() => setActiveTier(tier.key)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200',
                isActive
                  ? 'gradient-logo text-white shadow-md'
                  : 'bg-white/60 text-caramel-500 hover:bg-cream-200'
              )}
            >
              <Icon className="w-4 h-4" />
              {tier.label}
              <span className={cn('text-xs px-1.5 py-0.5 rounded-full', isActive ? 'bg-white/20' : 'bg-cream-300')}>
                {counts[tier.key] || 0}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="搜索菜名、食材..." className="flex-1 min-w-[200px]" />
        <div className="flex items-center gap-1.5 bg-white/60 rounded-2xl p-1.5">
          <SlidersHorizontal className="w-4 h-4 text-caramel-400 ml-2" />
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}
            className="text-sm bg-transparent border-none text-caramel-600 font-medium outline-none cursor-pointer px-2 py-1.5">
            {cuisines.map((c) => (<option key={c} value={c}>{c === 'all' ? '全部菜系' : c}</option>))}
          </select>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as DifficultyFilter)}
            className="text-sm bg-transparent border-none text-caramel-600 font-medium outline-none cursor-pointer px-2 py-1.5">
            {difficulties.map((d) => (<option key={d.key} value={d.key}>{d.label}</option>))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayResults.map((match, i) => (
          <RecipeCard key={match.recipe.id} match={match} index={i} />
        ))}
      </div>

      {displayResults.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <span className="text-6xl block mb-4">🔍</span>
          <h3 className="text-xl font-display font-bold text-caramel-600 mb-2">没有找到匹配的菜谱</h3>
          <p className="text-caramel-400">试试调整筛选条件或去食材库添加更多食材</p>
        </motion.div>
      )}
    </div>
  )
}
