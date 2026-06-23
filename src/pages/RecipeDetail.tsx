import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Users, Flame, Beef, Droplets, Wheat, AlertCircle, Check, Share2, CheckCheck } from 'lucide-react'
import { useUserRecipes } from '@/hooks/useUserRecipes'
import { useUserPantry } from '@/hooks/useUserPantry'
import { useAuth } from '@/contexts/AuthContext'
import { MatchScore } from '@/components/cooking/MatchScore'
import { CookingSteps } from '@/components/cooking/CookingSteps'
import { AITips } from '@/components/cooking/AITips'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { calculateMatchScore } from '@/utils/recipeMatcher'
import { difficultyLabels, difficultyColors } from '@/data/recipes'

const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:5173'

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getRecipeById } = useUserRecipes(user?.id)
  const { ingredients } = useUserPantry(user?.id)
  const recipe = getRecipeById(id || '')
  const [shared, setShared] = useState(false)

  const shareUrl = recipe ? `${APP_URL}/recipe/${recipe.id}` : ''
  const shareText = recipe ? `🍳 ${recipe.name} — Sansa's Kitchen` : ''

  const handleShare = async () => {
    if (!recipe) return
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.name,
          text: `Check out this recipe: ${recipe.name} (${recipe.nameEn}) — ${recipe.description}`,
          url: shareUrl,
        })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch {
        // user cancelled
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch {
        // clipboard failed
      }
    }
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <span className="text-7xl block mb-4">😢</span>
        <h2 className="text-2xl font-display font-bold text-caramel-700 mb-4">菜谱未找到</h2>
        <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/cooking')}>返回烹饪区</Button>
      </div>
    )
  }

  const match = calculateMatchScore(recipe, ingredients)
  const allMissing = [...match.missingIngredients, ...match.missingSeasonings, ...match.missingTools]

  const nutrition = [
    { label: '热量', value: recipe.calories, unit: 'kcal', icon: Flame, color: 'text-orange-400' },
    { label: '蛋白质', value: recipe.protein, unit: 'g', icon: Beef, color: 'text-red-400' },
    { label: '脂肪', value: recipe.fat, unit: 'g', icon: Droplets, color: 'text-yellow-400' },
    { label: '碳水', value: recipe.carbs, unit: 'g', icon: Wheat, color: 'text-amber-400' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.button
        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/cooking')}
        className="flex items-center gap-2 text-caramel-500 hover:text-caramel-700 transition-colors mb-6 text-sm font-medium"
      ><ArrowLeft className="w-4 h-4" /> 返回烹饪区</motion.button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-cream-200 to-cream-300 flex items-center justify-center text-6xl md:text-7xl shadow-inner-soft border-4 border-white">
            {recipe.emoji}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-caramel-700">{recipe.name}</h1>
              <Badge className={difficultyColors[recipe.difficulty]}>{difficultyLabels[recipe.difficulty]}</Badge>
            </div>
            <p className="text-sm text-caramel-400 mb-2">{recipe.nameEn}</p>
            <p className="text-caramel-500 leading-relaxed mb-4">{recipe.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-caramel-500">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {recipe.totalTime}分钟</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {recipe.servings}人份</span>
              <Badge>{recipe.cuisine}</Badge>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-cream-200 hover:bg-cream-300 text-caramel-600"
              >
                {shared ? <CheckCheck className="w-3.5 h-3.5 text-sage-500" /> : <Share2 className="w-3.5 h-3.5" />}
                {shared ? 'Copied!' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Match */}
          <div className="card-magic p-6">
            <h3 className="font-display font-bold text-caramel-700 mb-4 text-lg">食材匹配度</h3>
            <MatchScore score={match.score} tier={match.tier} size="lg" />
            {allMissing.length > 0 && (
              <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <p className="text-sm font-semibold text-rose-600 mb-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> {match.tier === 'almost' ? '缺少以下材料：' : '还需准备：'}</p>
                <div className="flex flex-wrap gap-2">
                  {allMissing.map(item => <span key={item} className="text-sm px-3 py-1.5 rounded-full bg-white border border-rose-200 text-rose-500">{item}</span>)}
                </div>
              </div>
            )}
            {match.tier === 'perfect' && (
              <div className="mt-4 p-4 rounded-2xl bg-sage-50 border border-sage-200">
                <p className="text-sm font-semibold text-sage-500 flex items-center gap-1.5"><Check className="w-4 h-4" /> 所有材料齐全，可以开始烹饪啦！</p>
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div className="card-magic p-6">
            <h3 className="font-display font-bold text-caramel-700 mb-4 text-lg">所需材料</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {recipe.requiredIngredients.length > 0 && (
                <div><h4 className="text-sm font-semibold text-caramel-500 mb-2">食材</h4>
                  <div className="space-y-1.5">{recipe.requiredIngredients.map(ing => {
                    const has = !match.missingIngredients.includes(ing)
                    return <div key={ing} className="flex items-center gap-2 text-sm"><span className={`w-2 h-2 rounded-full ${has?'bg-sage-400':'bg-caramel-200'}`} /><span className={has?'text-caramel-700 font-medium':'text-caramel-400'}>{ing}</span>{has&&<span className="text-xs text-sage-500">✓</span>}</div>
                  })}</div>
                </div>
              )}
              {recipe.requiredSeasonings.length > 0 && (
                <div><h4 className="text-sm font-semibold text-caramel-500 mb-2">调料</h4>
                  <div className="space-y-1.5">{recipe.requiredSeasonings.map(s => {
                    const has = !match.missingSeasonings.includes(s)
                    return <div key={s} className="flex items-center gap-2 text-sm"><span className={`w-2 h-2 rounded-full ${has?'bg-sage-400':'bg-caramel-200'}`} /><span className={has?'text-caramel-700 font-medium':'text-caramel-400'}>{s}</span>{has&&<span className="text-xs text-sage-500">✓</span>}</div>
                  })}</div>
                </div>
              )}
              {recipe.requiredTools.length > 0 && (
                <div className="sm:col-span-2"><h4 className="text-sm font-semibold text-caramel-500 mb-2">厨具</h4>
                  <div className="flex flex-wrap gap-2">{recipe.requiredTools.map(t => {
                    const has = !match.missingTools.includes(t)
                    return <span key={t} className={`text-sm px-3 py-1.5 rounded-xl ${has?'bg-sage-50 text-sage-500 border border-sage-200':'bg-cream-200 text-caramel-400 border border-caramel-200'}`}>{t} {has?'✓':''}</span>
                  })}</div>
                </div>
              )}
            </div>
          </div>

          <CookingSteps steps={recipe.steps} />
          <AITips tips={recipe.tips} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card-magic p-6">
            <h3 className="font-display font-bold text-caramel-700 mb-4 text-lg">营养信息</h3>
            <div className="space-y-3">{nutrition.map(item => {
              const Icon = item.icon
              return <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-cream-200/50"><div className="flex items-center gap-2"><Icon className={`w-4 h-4 ${item.color}`} /><span className="text-sm text-caramel-600">{item.label}</span></div><span className="text-sm font-bold text-caramel-700">{item.value} <span className="text-xs text-caramel-400">{item.unit}</span></span></div>
            })}</div>
          </div>
          <div className="card-magic p-6">
            <h3 className="font-display font-bold text-caramel-700 mb-3 text-lg">基本信息</h3>
            <div className="space-y-2 text-sm">{[['分类',recipe.category],['菜系',recipe.cuisine],['难度',difficultyLabels[recipe.difficulty]],['准备',`${recipe.prepTime}分钟`],['烹饪',`${recipe.cookTime}分钟`],['份量',`${recipe.servings}人份`]].map(([k,v]) => <div key={k} className="flex justify-between"><span className="text-caramel-400">{k}</span><span className="text-caramel-700 font-medium">{v}</span></div>)}</div>
          </div>
          <div className="card-magic p-6">
            <h3 className="font-display font-bold text-caramel-700 mb-3 text-lg">标签</h3>
            <div className="flex flex-wrap gap-1.5">{recipe.tags.map(tag => <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-cream-300 text-caramel-500">#{tag}</span>)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
