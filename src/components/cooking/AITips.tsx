import { motion } from 'framer-motion'
import { Lightbulb, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface AITipsProps {
  tips: string[]
}

export function AITips({ tips }: AITipsProps) {
  return (
    <Card className="!bg-gradient-to-br from-honey-50 via-cream-100 to-peach-50 !border-honey-200/50" hover={false}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-honey-400 to-honey-500 flex items-center justify-center shadow-md shadow-honey-400/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-display font-bold text-caramel-700">厨师小贴士</h3>
          <p className="text-xs text-caramel-400">AI智能生成 · 助你成功</p>
        </div>
      </div>

      <div className="space-y-3">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3 p-3 rounded-2xl bg-white/60 hover:bg-white/80 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-honey-100 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-honey-500" />
            </div>
            <p className="text-sm text-caramel-600 leading-relaxed">{tip}</p>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
