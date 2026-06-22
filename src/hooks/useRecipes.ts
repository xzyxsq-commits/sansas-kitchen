import { useMemo } from 'react'
import { usePantry } from './usePantry'
import { recipes } from '@/data/recipes'
import { sortRecipesByMatch, filterRecipesByTier } from '@/utils/recipeMatcher'
import type { MatchResult } from '@/types'

export function useRecipes() {
  const { ingredients } = usePantry()

  const matchResults = useMemo<MatchResult[]>(() => {
    return sortRecipesByMatch(recipes, ingredients)
  }, [ingredients])

  const perfectMatches = useMemo(() => filterRecipesByTier(matchResults, 'perfect'), [matchResults])
  const almostMatches = useMemo(() => filterRecipesByTier(matchResults, 'almost'), [matchResults])
  const exploreMatches = useMemo(() => filterRecipesByTier(matchResults, 'explore'), [matchResults])

  const getRecipeById = (id: string) => recipes.find((r) => r.id === id) ?? null

  const searchRecipes = (query: string) => {
    const q = query.toLowerCase().trim()
    if (!q) return matchResults
    return matchResults.filter(
      (m) =>
        m.recipe.name.toLowerCase().includes(q) ||
        m.recipe.nameEn.toLowerCase().includes(q) ||
        m.recipe.tags.some((t) => t.toLowerCase().includes(q)) ||
        m.recipe.requiredIngredients.some((i) => i.toLowerCase().includes(q))
    )
  }

  const filterByCategory = (category: string) => {
    if (category === 'all') return matchResults
    return matchResults.filter((m) => m.recipe.cuisine === category)
  }

  const filterByDifficulty = (difficulty: string) => {
    if (difficulty === 'all') return matchResults
    return matchResults.filter((m) => m.recipe.difficulty === difficulty)
  }

  return {
    matchResults,
    perfectMatches,
    almostMatches,
    exploreMatches,
    allRecipes: recipes,
    getRecipeById,
    searchRecipes,
    filterByCategory,
    filterByDifficulty,
  }
}
