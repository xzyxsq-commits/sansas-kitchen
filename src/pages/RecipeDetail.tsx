import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Users, Flame, Beef, Droplets, Wheat } from 'lucide-react'
import { useRecipes } from '@/hooks/useRecipes'
import { usePantry } from '@/hooks/usePantry'
import { MatchScore } from '@/components/cooking/MatchScore'
import { CookingSteps } from '@/components/cooking/CookingSteps'
import { AITips } from '@/components/cooking/AITips'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { calculateMatchScore } from '@/utils/recipeMatcher'
import { difficultyLabels, difficultyColors } from '@/data/recipes'

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getRecipeById } = useRecipes()
  const { ingredients } = usePantry()

  const recipe = getRecipeById(id || '')

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">😢</span>
        <h2 className="text-2xl font-display font-bold text-caramel-700 mb-2">菜谱未找到</h2>
        <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/cooking')}>
          返回烹饪区
        </Button>
      </div>
    )
  }

  const matchResult = calculateMatchScore(recipe, ingredients)
  const allMissing = [...matchResult.missingIngredients, ...matchResult.missingSeasonings, ...matchResult.missingTools]

  const nutritionData = [
    { label: '卡路里', value: recipe.calories, unit: 'kcal', icon: Flame, color: 'text-orange-400' },
    { label: '蛋白质', value: recipe.protein, unit: 'g', icon: Beef, color: 'text-red-400' },
    { label: '脂肪', value: recipe.fat, unit: 'g', icon: Droplets, color: 'text-yellow-400' },
    { label: '碳水', value: recipe.carbs, unit: 'g', icon: Wheat, color: 'text-amber-400' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/cooking')}
        className="flex items-center gap-2 text-caramel-500 hover:text-caramel-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">返回烹饪区</span>
      </motion.button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
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
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card hover={false}>
            <h3 className="font-display font-bold text-caramel-700 mb-3">📊 食材匹配度</h3>
            <MatchScore score={matchResult.score} tier={matchResult.tier} size="lg" />
            {allMissing.length > 0 && (
              <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <p className="text-sm font-semibold text-rose-600 mb-1">
                  {matchResult.tier === 'almost' ? '缺少以下材料：' : '还需准备：'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {allMissing.map((item) => (
                    <span key={item} className="text-sm px-3 py-1 rounded-full bg-white border border-rose-200 text-rose-500">{item}</span>
                  ))}
                </div>
              </div>
            )}
            {matchResult.tier === 'perfect' && (
              <div className="mt-4 p-4 rounded-2xl bg-sage-50 border border-sage-200">
                <p className="text-sm font-semibold text-sage-500">✓ 所有材料齐全，可以开始烹饪啦！</p>
              </div>
            )}
          </Card>

          <Card hover={false}>
            <h3 className="font-display font-bold text-caramel-700 mb-4">🛒 所需材料</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {recipe.requiredIngredients.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-caramel-500 mb-2">🥬 食材</h4>
                  <div className="space-y-1.5">
                    {recipe.requiredIngredients.map((ing) => {
                      const hasIt = !matchResult.missingIngredients.includes(ing)
                      return (
                        <div key={ing} className="flex items-center gap-2 text-sm">
                          <span className={`w-2 h-2 rounded-full ${hasIt ? 'bg-sage-400' : 'bg-caramel-200'}`} />
                          <span className={hasIt ? 'text-caramel-700 font-medium' : 'text-caramel-400'}>{ing}</span>
                          {hasIt && <span className="text-xs text-sage-500">✓</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {recipe.requiredSeasonings.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-caramel-500 mb-2">🧂 调料</h4>
                  <div className="space-y-1.5">
                    {recipe.requiredSeasonings.map((s) => {
                      const hasIt = !matchResult.missingSeasonings.includes(s)
                      return (
                        <div key={s} className="flex items-center gap-2 text-sm">
                          <span className={`w-2 h-2 rounded-full ${hasIt ? 'bg-sage-400' : 'bg-caramel-200'}`} />
                          <span className={hasIt ? 'text-caramel-700 font-medium' : 'text-caramel-400'}>{s}</span>
                          {hasIt && <span className="text-xs text-sage-500">✓</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {recipe.requiredTools.length > 0 && (
                <div className="sm:col-span-2">
                  <h4 className="text-sm font-semibold text-caramel-500 mb-2">🍳 厨具</h4>
                  <div className="flex flex-wrap gap-2">
                    {recipe.requiredTools.map((t) => {
                      const hasIt = !matchResult.missingTools.includes(t)
                      return (
                        <span key={t} className={`text-sm px-3 py-1.5 rounded-xl ${hasIt ? 'bg-sage-50 text-sage-500 border border-sage-200' : 'bg-cream-200 text-caramel-400 border border-caramel-200'}`}>
                          {t} {hasIt ? '✓' : ''}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <CookingSteps steps={recipe.steps} />
          <AITips tips={recipe.tips} />
        </div>

        <div className="space-y-4">
          <Card hover={false}>
            <h3 className="font-display font-bold text-caramel-700 mb-4">📋 营养信息</h3>
            <div className="space-y-3">
              {nutritionData.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-cream-200/50">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-sm text-caramel-600">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-caramel-700">{item.value} <span className="text-xs text-caramel-400">{item.unit}</span></span>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card hover={false}>
            <h3 className="font-display font-bold text-caramel-700 mb-3">ℹ️ 基本信息</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-caramel-400">分类</span><span className="text-caramel-700 font-medium">{recipe.category}</span></div>
              <div className="flex justify-between"><span className="text-caramel-400">菜系</span><span className="text-caramel-700 font-medium">{recipe.cuisine}</span></div>
              <div className="flex justify-between"><span className="text-caramel-400">难度</span><span className="text-caramel-700 font-medium">{difficultyLabels[recipe.difficulty]}</span></div>
              <div className="flex justify-between"><span className="text-caramel-400">准备</span><span className="text-caramel-700 font-medium">{recipe.prepTime}分钟</span></div>
              <div className="flex justify-between"><span className="text-caramel-400">烹饪</span><span className="text-caramel-700 font-medium">{recipe.cookTime}分钟</span></div>
              <div className="flex justify-between"><span className="text-caramel-400">份量</span><span className="text-caramel-700 font-medium">{recipe.servings}人份</span></div>
            </div>
          </Card>

          <Card hover={false}>
            <h3 className="font-display font-bold text-caramel-700 mb-3">🏷️ 标签</h3>
            <div className="flex flex-wrap gap-1.5">
              {recipe.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-cream-300 text-caramel-500">#{tag}</span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
