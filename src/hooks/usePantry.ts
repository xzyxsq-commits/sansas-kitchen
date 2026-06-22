import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { Ingredient, IngredientCategory } from '@/types'
import { initialPantryIngredients } from '@/data/ingredients'

export function usePantry() {
  const [ingredients, setIngredients] = useLocalStorage<Ingredient[]>(
    'sansa-pantry',
    initialPantryIngredients
  )

  const addIngredient = useCallback(
    (ingredient: Omit<Ingredient, 'id' | 'addedAt'>) => {
      const newIngredient: Ingredient = {
        ...ingredient,
        id: `ing-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        addedAt: new Date().toISOString().split('T')[0],
      }
      setIngredients((prev) => [...prev, newIngredient])
    },
    [setIngredients]
  )

  const updateIngredient = useCallback(
    (id: string, updates: Partial<Ingredient>) => {
      setIngredients((prev) =>
        prev.map((ing) => (ing.id === id ? { ...ing, ...updates } : ing))
      )
    },
    [setIngredients]
  )

  const deleteIngredient = useCallback(
    (id: string) => {
      setIngredients((prev) => prev.filter((ing) => ing.id !== id))
    },
    [setIngredients]
  )

  const getByCategory = useCallback(
    (category: IngredientCategory) => {
      return ingredients.filter((ing) => ing.category === category)
    },
    [ingredients]
  )

  const searchIngredients = useCallback(
    (query: string) => {
      const q = query.toLowerCase().trim()
      if (!q) return ingredients
      return ingredients.filter(
        (ing) =>
          ing.name.toLowerCase().includes(q) ||
          ing.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    },
    [ingredients]
  )

  const stats = useMemo(() => {
    const ingredientCount = ingredients.filter((i) => i.category === 'ingredient').length
    const seasoningCount = ingredients.filter((i) => i.category === 'seasoning').length
    const toolCount = ingredients.filter((i) => i.category === 'tool').length
    return {
      total: ingredients.length,
      ingredientCount,
      seasoningCount,
      toolCount,
    }
  }, [ingredients])

  return {
    ingredients,
    setIngredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getByCategory,
    searchIngredients,
    stats,
  }
}
