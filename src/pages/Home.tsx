import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Package, Sparkles, BookOpen, ArrowRight } from 'lucide-react'
import { HeroSection } from '@/components/home/HeroSection'
import { TodayRecommendation } from '@/components/home/TodayRecommendation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { recipes } from '@/data/recipes'

const features = [
  {
    icon: Package,
    title: '食材库',
    description: '管理你的厨房库存，随时了解有什么可用食材。',
    color: 'from-emerald-50 to-green-50',
    iconBg: 'bg-emerald-100 text-emerald-600',
    path: '/pantry',
  },
  {
    icon: Sparkles,
    title: '烹饪区',
    description: '智能匹配食材，推荐最适合你现在制作的菜肴。',
    color: 'from-honey-50 to-amber-50',
    iconBg: 'bg-honey-100 text-honey-600',
    path: '/cooking',
  },
  {
    icon: BookOpen,
    title: '记录区',
    description: '追踪你的饮食习惯，发现你的烹饪偏好和最爱。',
    color: 'from-rose-50 to-pink-50',
    iconBg: 'bg-rose-100 text-rose-500',
    path: '/diary',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const todayRecipe = recipes[Math.floor(Math.random() * recipes.length)]

  return (
    <div>
      <HeroSection />
      <TodayRecommendation recipe={todayRecipe} />

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-caramel-700 mb-3">
              探索 Sansa's Kitchen
            </h2>
            <p className="text-caramel-400 text-lg">
              三大核心模块，让烹饪变得简单有趣
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <Card
                    padding="lg"
                    className={`!bg-gradient-to-br ${feature.color} h-full`}
                    onClick={() => navigate(feature.path)}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-caramel-700 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-caramel-500 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-caramel-400 hover:text-caramel-600 transition-colors">
                      了解更多 <ArrowRight className="w-4 h-4" />
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Quick stats */}
      <section className="bg-gradient-to-b from-transparent to-cream-200/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '菜谱总数', value: recipes.length, emoji: '📖' },
              { label: '中式料理', value: recipes.filter((r) => r.cuisine === '中式' || r.cuisine === '川菜').length, emoji: '🥘' },
              { label: '西式料理', value: recipes.filter((r) => r.cuisine === '西式' || r.cuisine === '意式' || r.cuisine === '法式').length, emoji: '🍝' },
              { label: '日式料理', value: recipes.filter((r) => r.cuisine === '日式').length, emoji: '🍣' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
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
