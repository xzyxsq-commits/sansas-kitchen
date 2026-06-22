import type { Ingredient, Recipe, MatchResult } from '@/types'

export function calculateMatchScore(
  recipe: Recipe,
  userIngredients: Ingredient[]
): MatchResult {
  const userIngredientNames = userIngredients
    .filter((i) => i.category === 'ingredient')
    .map((i) => i.name.toLowerCase())

  const userSeasoningNames = userIngredients
    .filter((i) => i.category === 'seasoning')
    .map((i) => i.name.toLowerCase())

  const userToolNames = userIngredients
    .filter((i) => i.category === 'tool')
    .map((i) => i.name.toLowerCase())

  const missingIngredients = recipe.requiredIngredients.filter(
    (name) => !userIngredientNames.includes(name.toLowerCase())
  )
  const missingSeasonings = recipe.requiredSeasonings.filter(
    (name) => !userSeasoningNames.includes(name.toLowerCase())
  )
  const missingTools = recipe.requiredTools.filter(
    (name) => !userToolNames.includes(name.toLowerCase())
  )

  const totalRequired =
    recipe.requiredIngredients.length +
    recipe.requiredSeasonings.length +
    recipe.requiredTools.length

  const totalMissing =
    missingIngredients.length + missingSeasonings.length + missingTools.length

  const totalMatched = totalRequired - totalMissing
  const score = totalRequired > 0 ? Math.round((totalMatched / totalRequired) * 100) : 0

  let tier: MatchResult['tier'] = 'explore'
  let tierLabel = '探索发现'

  if (score === 100) {
    tier = 'perfect'
    tierLabel = '✓ 立即可做'
  } else if (totalMissing <= 2) {
    tier = 'almost'
    tierLabel = `缺少 ${totalMissing} 种材料`
  } else {
    tier = 'explore'
    tierLabel = `还需准备 ${totalMissing} 种材料`
  }

  return {
    recipe,
    score,
    missingIngredients,
    missingSeasonings,
    missingTools,
    tier,
    tierLabel,
  }
}

export function sortRecipesByMatch(
  recipes: Recipe[],
  userIngredients: Ingredient[]
): MatchResult[] {
  const results = recipes.map((recipe) =>
    calculateMatchScore(recipe, userIngredients)
  )

  return results.sort((a, b) => {
    if (a.tier !== b.tier) {
      const tierOrder = { perfect: 0, almost: 1, explore: 2 }
      return tierOrder[a.tier] - tierOrder[b.tier]
    }
    return b.score - a.score
  })
}

export function filterRecipesByTier(
  results: MatchResult[],
  tier: MatchResult['tier']
): MatchResult[] {
  return results.filter((r) => r.tier === tier)
}
