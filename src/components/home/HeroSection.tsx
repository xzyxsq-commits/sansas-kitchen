import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, ChefHat } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient matched to logo */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Sparkle dot pattern */}
      <div className="absolute inset-0 sparkle-bg opacity-40" />

      {/* Floating decorative emojis */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-[10%] text-6xl md:text-8xl opacity-20"
      >
        🍳
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 left-[5%] text-5xl md:text-7xl opacity-20"
      >
        🥐
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-40 left-[15%] text-4xl md:text-5xl opacity-15"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-32 right-[20%] text-5xl md:text-6xl opacity-15"
      >
        🧁
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-1/3 right-[25%] text-4xl opacity-10"
      >
        🐱
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-caramel-200/50 mb-6">
                <Sparkles className="w-4 h-4 text-honey-400" />
                <span className="text-sm font-medium text-caramel-500">你的智能厨房助手</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-caramel-700 leading-tight mb-4">
                Welcome to
                <br />
                <span className="text-gradient-warm">Sansa's Kitchen</span>
              </h1>

              <p className="text-xl md:text-2xl font-script text-caramel-400 mb-6">
                Cook with Love, Create with Magic.
              </p>

              <p className="text-base md:text-lg text-caramel-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                记录你的食材，发现美味食谱，追踪你的烹饪旅程。
                <br />
                让每一餐都充满温暖与魔法 ✦
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  size="lg"
                  icon={<ChefHat className="w-5 h-5" />}
                  onClick={() => navigate('/cooking')}
                >
                  开始烹饪
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  icon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => navigate('/pantry')}
                >
                  管理食材
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right: Logo display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Outer peach glow */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-8 rounded-full bg-gradient-to-br from-peach-300 via-peach-400 to-rose-300 blur-3xl opacity-40"
              />

              {/* Secondary glow ring */}
              <motion.div
                animate={{ scale: [1, 1.03, 1], opacity: [0.6, 0.8, 0.6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -inset-4 rounded-full bg-gradient-to-br from-peach-200 via-cream-200 to-honey-200 blur-xl opacity-60"
              />

              {/* Main logo circle */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-cream-100 via-white to-cream-300 shadow-soft-lg flex items-center justify-center overflow-hidden border-[6px] border-white/80">
                {/* Logo image */}
                <img
                  src="/Sansa/logo.png"
                  alt="Sansa's Kitchen"
                  className="w-full h-full object-cover rounded-full"
                />

                {/* Floating food emojis around the logo */}
                {[
                  { emoji: '🥕', angle: 0 },
                  { emoji: '🍅', angle: 60 },
                  { emoji: '🧀', angle: 120 },
                  { emoji: '🍞', angle: 180 },
                  { emoji: '🥚', angle: 240 },
                  { emoji: '🧁', angle: 300 },
                ].map(({ emoji, angle }, i) => {
                  const rad = (angle * Math.PI) / 180
                  const r = 175
                  const x = Math.cos(rad) * r
                  const y = Math.sin(rad) * r
                  return (
                    <motion.span
                      key={emoji}
                      className="absolute text-2xl md:text-3xl pointer-events-none select-none"
                      style={{
                        left: `calc(50% + ${x}px - 16px)`,
                        top: `calc(50% + ${y}px - 16px)`,
                      }}
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 10, 0],
                      }}
                      transition={{
                        duration: 3 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut',
                      }}
                    >
                      {emoji}
                    </motion.span>
                  )
                })}
              </div>

              {/* Disney-style sparkles */}
              {[
                { x: -20, y: -20, delay: 0 },
                { x: 20, y: -30, delay: 0.8 },
                { x: -30, y: 25, delay: 1.6 },
                { x: 25, y: 20, delay: 1.2 },
              ].map((sparkle, i) => (
                <motion.span
                  key={i}
                  className="absolute text-lg md:text-xl pointer-events-none select-none"
                  style={{ left: `calc(50% + ${sparkle.x}px)`, top: `calc(50% + ${sparkle.y}px)` }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: sparkle.delay }}
                >
                  ✦
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40C240 80 480 0 720 20C960 40 1200 80 1440 40V80H0V40Z"
            fill="#FFFDFA"
          />
        </svg>
      </div>
    </section>
  )
}
