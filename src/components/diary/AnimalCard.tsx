import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import type { FoodAnimal } from '@/types'
import { cn } from '@/utils/cn'

interface AnimalCardProps {
  animal: FoodAnimal
  index: number
}

export function AnimalCard({ animal, index }: AnimalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={cn(
        'relative bg-gradient-to-br rounded-3xl p-5 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden',
        animal.color
      )}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3" />

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="w-16 h-16 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center text-3xl shadow-inner-soft">
            {animal.emoji}
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
          >
            <Heart className="w-6 h-6 text-white/60 fill-white/30" />
          </motion.div>
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-1">{animal.name}</h3>
        <p className="text-xs text-white/70 mb-2">最爱：{animal.recipeName}</p>
        <p className="text-sm text-white/80 leading-relaxed mb-2">{animal.description}</p>
        <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs text-white font-medium">
          {animal.personality}
        </div>
      </div>
    </motion.div>
  )
}
