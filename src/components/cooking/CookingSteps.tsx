import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import type { RecipeStep } from '@/types'

interface CookingStepsProps {
  steps: RecipeStep[]
}

export function CookingSteps({ steps }: CookingStepsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-bold text-caramel-700 flex items-center gap-2">
        <span className="text-2xl">👨‍🍳</span> 制作步骤
      </h3>

      <div className="relative">
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-peach-400 via-rose-400 to-honey-400" />

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-4"
            >
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl gradient-logo text-white flex items-center justify-center font-display font-bold text-lg shadow-md shadow-peach-400/20">
                {i + 1}
              </div>

              <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-caramel-200/50 shadow-soft">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{step.emoji}</span>
                  <h4 className="font-semibold text-caramel-700">{step.title}</h4>
                  {step.time && (
                    <span className="ml-auto flex items-center gap-1 text-xs text-caramel-400">
                      <Clock className="w-3 h-3" />
                      {step.time}分钟
                    </span>
                  )}
                </div>
                <p className="text-sm text-caramel-500 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
