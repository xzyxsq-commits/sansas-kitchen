import { motion } from 'framer-motion'
import { Clock, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchScore } from './MatchScore'
import type { MatchResult } from '@/types'
import { difficultyLabels, difficultyColors } from '@/data/recipes'

interface RecipeCardProps {
  match: MatchResult
  index: number
}

export function RecipeCard({ match, index }: RecipeCardProps) {
  const navigate = useNavigate()
  const { recipe, score, tier, missingIngredients, missingSeasonings, missingTools } = match

  const allMissing = [...missingIngredients, ...missingSeasonings, ...missingTools]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      <Card>
        <div className="flex gap-4">
          {/* Emoji/Image */}
          <div className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-cream-200 to-cream-300 flex items-center justify-center text-4xl md:text-5xl shadow-inner-soft overflow-hidden">
            {recipe.emoji}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-display font-bold text-caramel-700 text-lg leading-tight">
                  {recipe.name}
                </h3>
                <p className="text-xs text-caramel-400">{recipe.nameEn}</p>
              </div>
              <Badge variant={tier === 'perfect' ? 'success' : tier === 'almost' ? 'warning' : 'info'}>
                {score}% 匹配
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={difficultyColors[recipe.difficulty]}>
                {difficultyLabels[recipe.difficulty]}
              </Badge>
              <span className="text-xs text-caramel-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {recipe.totalTime}分钟
              </span>
              <span className="text-xs text-caramel-400 flex items-center gap-1">
                <Users className="w-3 h-3" /> {recipe.servings}人份
              </span>
            </div>

            <MatchScore score={score} tier={tier} size="sm" />

            {allMissing.length > 0 && allMissing.length <= 4 && (
              <div className="mt-2 text-xs text-rose-400">
                缺少：{allMissing.join('、')}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
