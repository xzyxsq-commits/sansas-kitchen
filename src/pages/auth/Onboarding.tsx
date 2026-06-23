import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, ArrowRight, Check, Sparkles, Utensils, Package, Soup } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/utils/cn'

const DIET_OPTIONS = [
  { value: 'Vegetarian', emoji: '🥬', label: 'Vegetarian' },
  { value: 'Vegan', emoji: '🌱', label: 'Vegan' },
  { value: 'Pescatarian', emoji: '🐟', label: 'Pescatarian' },
  { value: 'Keto', emoji: '🥑', label: 'Keto' },
  { value: 'Paleo', emoji: '🥩', label: 'Paleo' },
  { value: 'Gluten-Free', emoji: '🌾', label: 'Gluten-Free' },
  { value: 'Halal', emoji: '🍖', label: 'Halal' },
  { value: 'No Restrictions', emoji: '🍽️', label: 'No Restrictions' },
]

const TOOL_OPTIONS = [
  { value: 'Wok', emoji: '🥘' },
  { value: 'Oven', emoji: '🔥' },
  { value: 'Rice Cooker', emoji: '🍚' },
  { value: 'Air Fryer', emoji: '💨' },
  { value: 'Instant Pot', emoji: '🍲' },
  { value: 'Blender', emoji: '🥤' },
  { value: 'Microwave', emoji: '⚡' },
  { value: 'Steamer', emoji: '🧺' },
  { value: 'Grill', emoji: '♨️' },
  { value: 'Slow Cooker', emoji: '🫕' },
]

const INGREDIENT_OPTIONS = [
  { value: 'Chicken', emoji: '🍗' },
  { value: 'Beef', emoji: '🥩' },
  { value: 'Pork', emoji: '🥓' },
  { value: 'Fish', emoji: '🐟' },
  { value: 'Shrimp', emoji: '🦐' },
  { value: 'Tofu', emoji: '🧈' },
  { value: 'Eggs', emoji: '🥚' },
  { value: 'Rice', emoji: '🍚' },
  { value: 'Pasta', emoji: '🍝' },
  { value: 'Tomatoes', emoji: '🍅' },
  { value: 'Onions', emoji: '🧅' },
  { value: 'Garlic', emoji: '🧄' },
  { value: 'Bell Peppers', emoji: '🫑' },
  { value: 'Potatoes', emoji: '🥔' },
  { value: 'Carrots', emoji: '🥕' },
  { value: 'Broccoli', emoji: '🥦' },
  { value: 'Mushrooms', emoji: '🍄' },
  { value: 'Spinach', emoji: '🥬' },
  { value: 'Cheese', emoji: '🧀' },
  { value: 'Milk', emoji: '🥛' },
]

const STEPS = [
  { key: 'diet', icon: Utensils, title: 'Dietary Preferences', subtitle: 'Tell us what you love to eat' },
  { key: 'tools', icon: Soup, title: 'Kitchen Tools', subtitle: 'What do you cook with?' },
  { key: 'ingredients', icon: Package, title: 'Pantry Staples', subtitle: 'What\'s in your kitchen?' },
  { key: 'done', icon: Sparkles, title: 'All Set!', subtitle: 'Your kitchen is ready' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading: authLoading, updateProfile } = useAuth()

  const [step, setStep] = useState(0)
  const [dietPrefs, setDietPrefs] = useState<string[]>([])
  const [tools, setTools] = useState<string[]>([])
  const [ingredients, setIngredients] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate('/login', { replace: true })
  }, [isAuthenticated, authLoading, navigate])

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item])
  }

  const handleComplete = async () => {
    setSaving(true)
    await updateProfile({ dietary_preferences: dietPrefs })
    setSaving(false)
    // Navigate home — kitchen is initialized
    setTimeout(() => navigate('/', { replace: true }), 500)
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-4 border-caramel-200 border-t-peach-400" />
      </div>
    )
  }

  const currentStep = STEPS[step]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cream-50">
      <div className="absolute inset-0 sparkle-bg pointer-events-none" />

      <div className="relative w-full max-w-lg">
        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8 px-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 rounded-full flex-1 transition-all duration-500',
                i < step ? 'bg-sage-400' : i === step ? 'gradient-logo' : 'bg-caramel-200'
              )}
            />
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="card-magic p-8 md:p-10">
            {/* Step header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl gradient-logo-soft flex items-center justify-center shadow-md">
                <currentStep.icon className="w-6 h-6 text-peach-700" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-caramel-700">{currentStep.title}</h2>
                <p className="text-sm text-caramel-400">{currentStep.subtitle}</p>
              </div>
            </div>

            {/* Step content */}
            {step === 0 && (
              <div className="space-y-3">
                {DIET_OPTIONS.map((opt) => {
                  const selected = dietPrefs.includes(opt.value)
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleItem(dietPrefs, setDietPrefs, opt.value)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left font-semibold transition-all duration-200 border-2',
                        selected
                          ? 'bg-peach-100 border-peach-400 text-peach-700 shadow-sm'
                          : 'bg-white/50 border-caramel-200 text-caramel-600 hover:border-caramel-300'
                      )}
                    >
                      <span className="text-xl">{opt.emoji}</span>
                      <span className="flex-1">{opt.label}</span>
                      {selected && <Check className="w-4 h-4 text-peach-500" />}
                    </button>
                  )
                })}
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-wrap gap-2">
                {TOOL_OPTIONS.map((opt) => {
                  const selected = tools.includes(opt.value)
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleItem(tools, setTools, opt.value)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2',
                        selected
                          ? 'bg-peach-100 border-peach-400 text-peach-700 shadow-sm'
                          : 'bg-white/50 border-caramel-200 text-caramel-600 hover:border-caramel-300'
                      )}
                    >
                      <span className="text-lg">{opt.emoji}</span>
                      {opt.value}
                      {selected && <Check className="w-3.5 h-3.5 text-peach-500" />}
                    </button>
                  )
                })}
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-wrap gap-2">
                {INGREDIENT_OPTIONS.map((opt) => {
                  const selected = ingredients.includes(opt.value)
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleItem(ingredients, setIngredients, opt.value)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2',
                        selected
                          ? 'bg-peach-100 border-peach-400 text-peach-700 shadow-sm'
                          : 'bg-white/50 border-caramel-200 text-caramel-600 hover:border-caramel-300'
                      )}
                    >
                      <span className="text-lg">{opt.emoji}</span>
                      {opt.value}
                      {selected && <Check className="w-3.5 h-3.5 text-peach-500" />}
                    </button>
                  )
                })}
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-24 h-24 bg-gradient-to-br from-peach-300 via-peach-400 to-peach-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-peach-400/30"
                >
                  <ChefHat className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-caramel-700 mb-2">
                  Welcome to Sansa's Kitchen!
                </h3>
                <p className="text-caramel-400 mb-2">
                  Your kitchen is all set up and ready for cooking adventures.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {dietPrefs.length > 0 && (
                    <span className="text-xs font-medium bg-peach-100 text-peach-700 px-3 py-1.5 rounded-xl">
                      🍽️ {dietPrefs.length} diet preferences
                    </span>
                  )}
                  {tools.length > 0 && (
                    <span className="text-xs font-medium bg-peach-100 text-peach-700 px-3 py-1.5 rounded-xl">
                      🍳 {tools.length} tools
                    </span>
                  )}
                  {ingredients.length > 0 && (
                    <span className="text-xs font-medium bg-peach-100 text-peach-700 px-3 py-1.5 rounded-xl">
                      🥘 {ingredients.length} ingredients
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 0 && step < 3 && (
                <button onClick={() => setStep(s => s - 1)} className="btn-ghost px-6 py-3 text-sm">
                  Back
                </button>
              )}
              {step < 3 ? (
                <button onClick={() => setStep(s => s + 1)} className="btn-magic flex-1 py-3 text-sm">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleComplete} disabled={saving} className="btn-magic flex-1 py-3.5 text-base">
                  <Sparkles className="w-4 h-4" />
                  {saving ? 'Setting up...' : 'Start Cooking!'}
                </button>
              )}
            </div>

            {/* Skip */}
            {step < 3 && (
              <button
                onClick={() => setStep(3)}
                className="w-full text-center text-xs text-caramel-400 hover:text-caramel-500 transition-colors mt-4 font-medium"
              >
                Skip this step
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
