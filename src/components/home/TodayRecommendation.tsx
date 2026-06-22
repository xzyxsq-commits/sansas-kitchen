import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Clock, Gauge, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Recipe } from '@/types'
import { difficultyLabels } from '@/data/recipes'

interface TodayRecommendationProps {
  recipe: Recipe
}

export function TodayRecommendation({ recipe }: TodayRecommendationProps) {
  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-honey-400 to-honey-500 flex items-center justify-center shadow-md shadow-honey-400/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-caramel-700">
              今日推荐
            </h2>
            <p className="text-sm text-caramel-400">根据你的食材库智能推荐</p>
          </div>
        </div>

        <Card
          padding="lg"
          className="!bg-gradient-to-br from-cream-100 via-white to-peach-100 !border-caramel-200/30"
          onClick={() => navigate(`/recipe/${recipe.id}`)}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-cream-300 to-peach-200 flex items-center justify-center text-5xl md:text-6xl shadow-inner-soft">
              {recipe.emoji}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-xl md:text-2xl font-display font-bold text-caramel-700">
                  {recipe.name}
                </h3>
                <Badge variant="success">推荐</Badge>
              </div>
              <p className="text-sm text-caramel-400 mb-3">{recipe.description}</p>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="flex items-center gap-1 text-xs text-caramel-500">
                  <Clock className="w-3.5 h-3.5" /> {recipe.totalTime}分钟
                </span>
                <span className="flex items-center gap-1 text-xs text-caramel-500">
                  <Gauge className="w-3.5 h-3.5" /> {difficultyLabels[recipe.difficulty]}
                </span>
                <Badge>{recipe.cuisine}</Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/60 border border-caramel-200/50 text-caramel-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex md:flex-col justify-center gap-2 md:self-center">
              <Button icon={<ArrowRight className="w-4 h-4" />}>查看详情</Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
