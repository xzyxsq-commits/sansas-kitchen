import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Sparkles, ArrowRight, ChefHat, Package, BookOpen,
  Clock, TrendingUp, Shuffle, Flame, Star, Zap,
} from 'lucide-react'
import { useUserRecipes } from '@/hooks/useUserRecipes'
import { useAuth } from '@/contexts/AuthContext'
import { recipes } from '@/data/recipes'
import { cn } from '@/utils/cn'
import type { SearchSuggestion } from '@/types'

/* ─── Trending ─── */
function TrendingCarousel() {
  const trending = useMemo(() => {
    return [...recipes]
      .filter(r => r.popularity && r.popularity > 85)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 8)
  }, [])

  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()

  const next = useCallback(() => setActiveIndex(i => (i + 1) % trending.length), [trending.length])
  const prev = useCallback(() => setActiveIndex(i => (i - 1 + trending.length) % trending.length), [trending.length])

  if (trending.length === 0) return null
  const r = trending[activeIndex]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-honey-400 to-honey-500 flex items-center justify-center shadow-md shadow-honey-400/20">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-caramel-700">Trending Now</h2>
          <p className="text-sm text-caramel-400">社区最受欢迎的菜谱</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={prev} className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center hover:bg-white transition-colors text-caramel-500">←</button>
          <button onClick={next} className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center hover:bg-white transition-colors text-caramel-500">→</button>
        </div>
      </div>

      <motion.div
        key={r.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        onClick={() => navigate(`/recipe/${r.id}`)}
        className="card-magic p-6 md:p-8 cursor-pointer overflow-hidden relative group"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-honey-100/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="flex flex-col md:flex-row gap-6 items-start relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-cream-200 to-cream-300 flex items-center justify-center text-5xl md:text-6xl shadow-inner-soft flex-shrink-0">
            {r.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-honey-400 to-honey-500 text-white">🔥 Trending</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-cream-200 text-caramel-500">{r.cuisine}</span>
              <span className="text-xs text-caramel-400 flex items-center gap-1"><Star className="w-3 h-3 fill-honey-400 text-honey-400" /> {r.popularity}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-caramel-700 mb-1">{r.name}</h3>
            <p className="text-sm text-caramel-400 mb-3 line-clamp-2">{r.description}</p>
            <div className="flex items-center gap-4 text-xs text-caramel-500">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{r.totalTime}min</span>
              <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" />{r.calories}kcal</span>
              <span className="px-2 py-0.5 rounded-full bg-cream-200 text-caramel-600">{r.difficulty === 'easy' ? '简单' : r.difficulty === 'medium' ? '普通' : '困难'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {trending.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              i === activeIndex ? 'w-6 bg-peach-500' : 'bg-caramel-200 hover:bg-caramel-300'
            )}
          />
        ))}
      </div>
    </section>
  )
}

/* ─── Quick Feature Cards ─── */
const features = [
  { icon: Package, title: 'Pantry', desc: '管理食材库存', path: '/pantry', gradient: 'from-emerald-50 to-green-50', iconBg: 'bg-emerald-100 text-emerald-600' },
  { icon: ChefHat, title: 'Cook', desc: '智能菜谱推荐', path: '/cooking', gradient: 'from-honey-50 to-amber-50', iconBg: 'bg-honey-100 text-honey-600' },
  { icon: BookOpen, title: 'Diary', desc: '饮食记录分析', path: '/diary', gradient: 'from-rose-50 to-pink-50', iconBg: 'bg-rose-100 text-rose-500' },
]

/* ─── Home Page ─── */
export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { matchResults } = useUserRecipes(user?.id)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [aiThinking, setAiThinking] = useState(false)

  /* ── Search suggestions ── */
  const suggestions = useMemo<SearchSuggestion[]>(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    const results: SearchSuggestion[] = []

    // Recipe matches
    recipes
      .filter(r => r.name.toLowerCase().includes(q) || r.nameEn.toLowerCase().includes(q) || r.tags.some(t => t.toLowerCase().includes(q)))
      .slice(0, 4)
      .forEach(r => results.push({ type: 'recipe', text: r.name, emoji: r.emoji, href: `/recipe/${r.id}` }))

    // Cuisine matches
    const cuisines = ['粤菜','湘菜','川菜','中式','意式','法式','美式','日式','西式']
    cuisines.filter(c => c.includes(q)).slice(0, 2)
      .forEach(c => results.push({ type: 'cuisine', text: `${c}料理`, emoji: '🍽️' }))

    // Tag matches
    const allTags = [...new Set(recipes.flatMap(r => r.tags))]
    allTags.filter(t => t.toLowerCase().includes(q)).slice(0, 2)
      .forEach(t => results.push({ type: 'tag', text: `#${t}`, emoji: '🏷️' }))

    return results.slice(0, 6)
  }, [searchQuery])

  /* ── Surprise Me ── */
  const handleSurprise = useCallback(() => {
    setAiThinking(true)
    const readyRecipes = matchResults.filter(m => m.tier === 'perfect')
    const pool = readyRecipes.length >= 3 ? readyRecipes : matchResults
    const pick = pool[Math.floor(Math.random() * pool.length)]
    setTimeout(() => {
      setAiThinking(false)
      navigate(`/recipe/${pick.recipe.id}`)
    }, 800)
  }, [matchResults, navigate])

  const readyCount = matchResults.filter(m => m.tier === 'perfect').length

  return (
    <div>
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 sparkle-bg opacity-40" />

        {/* Floating decor */}
        <motion.div animate={{ y: [0,-18,0], rotate: [0,4,0] }} transition={{ duration: 5.5, repeat: Infinity }} className="absolute top-24 right-[12%] text-5xl md:text-7xl opacity-20 pointer-events-none">🍳</motion.div>
        <motion.div animate={{ y: [0,14,0], rotate: [0,-3,0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.8 }} className="absolute bottom-28 left-[8%] text-4xl md:text-6xl opacity-15 pointer-events-none">🥐</motion.div>
        <motion.div animate={{ y: [0,-10,0], scale: [1,1.08,1] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.4 }} className="absolute top-40 left-[18%] text-3xl md:text-5xl opacity-12 pointer-events-none">✨</motion.div>
        <motion.div animate={{ y: [0,10,0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-36 right-[16%] text-4xl md:text-6xl opacity-12 pointer-events-none">🧁</motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-caramel-200/50 mb-6">
                <Sparkles className="w-4 h-4 text-honey-400" />
                <span className="text-sm font-medium text-caramel-500">你的AI智能厨房助手</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4">
                <span className="text-caramel-700">Welcome to</span>
                <br />
                <span className="text-gradient-warm">Sansa's Kitchen</span>
              </h1>

              <p className="text-xl md:text-2xl font-script text-caramel-400 mb-4">
                Cook with Love, Create with Magic.
              </p>
              <p className="text-base md:text-lg text-caramel-400 leading-relaxed mb-8 max-w-lg">
                记录食材，发现菜谱，追踪烹饪旅程。让AI为你的每一餐注入魔法 ✦
              </p>

              {/* Search bar */}
              <div className="relative max-w-md mb-4">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-caramel-300" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true) }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="搜索菜谱、食材、菜系..."
                  className="input-magic pl-14 pr-4"
                />
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                      className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl p-2 shadow-soft-lg z-20"
                    >
                      {suggestions.map((s, i) => (
                        <button
                          key={i}
                          onMouseDown={() => {
                            if (s.href) navigate(s.href)
                            else setSearchQuery(s.text)
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-cream-200 transition-colors text-left"
                        >
                          <span className="text-lg">{s.emoji}</span>
                          <div>
                            <p className="text-sm font-semibold text-caramel-700">{s.text}</p>
                            <p className="text-[11px] text-caramel-400 capitalize">{s.type}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/cooking')}
                  className="btn-magic px-6 py-3.5 text-base"
                >
                  <ChefHat className="w-5 h-5" /> 开始烹饪
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={handleSurprise}
                  disabled={aiThinking}
                  className="btn-ghost px-6 py-3.5 text-base"
                >
                  {aiThinking ? (
                    <><span className="animate-spin">⏳</span> AI思考中...</>
                  ) : (
                    <><Shuffle className="w-5 h-5" /> Surprise Me ✨</>
                  )}
                </motion.button>
              </div>

              {/* Quick stats pill */}
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-100 text-sage-600 font-semibold">
                  <Zap className="w-3.5 h-3.5" /> {readyCount}道可立即制作
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-200 text-caramel-600 font-medium">
                  📖 {recipes.length}道菜谱
                </span>
              </div>
            </motion.div>

            {/* Right: Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <motion.div
                  animate={{ scale: [1,1.05,1], opacity: [0.3,0.5,0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -inset-8 rounded-full bg-gradient-to-br from-peach-300 via-peach-400 to-rose-300 blur-3xl opacity-35"
                />
                <motion.div
                  animate={{ scale: [1,1.03,1], opacity: [0.5,0.7,0.5] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.6 }}
                  className="absolute -inset-4 rounded-full bg-gradient-to-br from-peach-200 via-cream-200 to-honey-200 blur-2xl opacity-50"
                />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-cream-100 via-white to-cream-300 shadow-soft-lg flex items-center justify-center overflow-hidden border-[6px] border-white/80">
                  <img src="/Sansa/logo.png" alt="Sansa's Kitchen" className="w-full h-full object-cover rounded-full" />
                  {['🥕','🍅','🧀','🍞','🥚','🧁'].map((emoji, i) => {
                    const angle = (i * 60 * Math.PI) / 180
                    const r = 178
                    const x = Math.cos(angle) * r
                    const y = Math.sin(angle) * r
                    return (
                      <motion.span
                        key={emoji}
                        className="absolute text-2xl md:text-3xl pointer-events-none select-none"
                        style={{ left: `calc(50% + ${x}px - 16px)`, top: `calc(50% + ${y}px - 16px)` }}
                        animate={{ y: [0,-7,0], rotate: [0,8,0] }}
                        transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                      >{emoji}</motion.span>
                    )
                  })}
                </div>
                {[{x:-22,y:-22,d:0},{x:24,y:-32,d:0.7},{x:-32,y:24,d:1.4},{x:26,y:20,d:1.1}].map((s,i) => (
                  <motion.span
                    key={i}
                    className="absolute text-base md:text-lg pointer-events-none select-none"
                    style={{ left: `calc(50% + ${s.x}px)`, top: `calc(50% + ${s.y}px)` }}
                    animate={{ opacity: [0,1,0], scale: [0.5,1.2,0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: s.d }}
                  >✦</motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 40C240 80 480 0 720 20C960 40 1200 80 1440 40V80H0V40Z" fill="#FFFDFA" /></svg>
        </div>
      </section>

      {/* ═══ Trending Carousel ═══ */}
      <TrendingCarousel />

      {/* ═══ Feature Cards ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-caramel-700 mb-3">探索 Sansa's Kitchen</h2>
            <p className="text-caramel-400 text-lg">三大核心模块，让烹饪变得简单有趣</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div
                    onClick={() => navigate(f.path)}
                    className={cn('card-magic p-8 h-full cursor-pointer', `!bg-gradient-to-br ${f.gradient}`)}
                  >
                    <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-4', f.iconBg)}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-caramel-700 mb-2">{f.title}</h3>
                    <p className="text-caramel-500 leading-relaxed mb-4">{f.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-caramel-400 hover:text-caramel-600 transition-colors">
                      了解更多 <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══ Quick Stats ═══ */}
      <section className="bg-gradient-to-b from-transparent to-cream-200/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '菜谱总数', value: recipes.length, emoji: '📖' },
              { label: '中式料理', value: recipes.filter(r => ['中式','粤菜','湘菜','川菜'].includes(r.cuisine)).length, emoji: '🥘' },
              { label: '西式料理', value: recipes.filter(r => ['西式','意式','法式','美式'].includes(r.cuisine)).length, emoji: '🍝' },
              { label: '日式料理', value: recipes.filter(r => r.cuisine === '日式').length, emoji: '🍣' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.08 }}
                className="text-center p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-caramel-200/30"
              >
                <span className="text-3xl mb-2 block">{stat.emoji}</span>
                <div className="text-2xl font-display font-bold text-caramel-700">{stat.value}</div>
                <div className="text-sm text-caramel-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
