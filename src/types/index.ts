// ─── Auth & User ──────────────────────────────────────────────

export interface UserPublic {
  id: string
  email: string
  nickname: string
  avatar_url: string
  timezone: string
  language: string
  dietary_preferences: string[]
  created_at: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  nickname?: string
}

export interface UpdateProfileData {
  nickname?: string
  avatar_url?: string
  timezone?: string
  language?: string
  dietary_preferences?: string[]
}

// ─── Pantry & Kitchen ─────────────────────────────────────────

export interface Ingredient {
  id: string
  name: string
  category: 'ingredient' | 'seasoning' | 'tool'
  tags: string[]
  quantity?: number
  unit?: string
  emoji: string
  addedAt: string
}

export type IngredientCategory = 'ingredient' | 'seasoning' | 'tool'

export interface Recipe {
  id: string
  name: string
  nameEn: string
  emoji: string
  image: string
  category: string
  cuisine: string
  difficulty: 'easy' | 'medium' | 'hard'
  prepTime: number
  cookTime: number
  totalTime: number
  servings: number
  calories: number
  protein: number
  fat: number
  carbs: number
  requiredIngredients: string[]
  requiredSeasonings: string[]
  requiredTools: string[]
  steps: RecipeStep[]
  tips: string[]
  tags: string[]
  description: string
  popularity?: number
}

export interface RecipeStep {
  title: string
  description: string
  emoji: string
  time?: number
}

export interface MatchResult {
  recipe: Recipe
  score: number
  missingIngredients: string[]
  missingSeasonings: string[]
  missingTools: string[]
  tier: 'perfect' | 'almost' | 'explore'
  tierLabel: string
}

export interface DiaryEntry {
  id: string
  date: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  recipeId: string
  recipeName: string
  recipeEmoji: string
  notes: string
  rating: number
}

export interface FoodAnimal {
  id: string
  name: string
  emoji: string
  recipeName: string
  description: string
  personality: string
  color: string
}

export interface WeeklyStats {
  topRecipes: { name: string; emoji: string; count: number }[]
  totalMeals: number
  avgCalories: number
  favoriteMealType: string
}

export interface MonthlyStats {
  topRecipes: { name: string; emoji: string; count: number }[]
  totalMeals: number
  cuisineDistribution: { name: string; value: number; color: string }[]
  dailyCounts: { date: string; count: number }[]
}

export interface SearchSuggestion {
  type: 'recipe' | 'ingredient' | 'cuisine' | 'tag'
  text: string
  emoji: string
  href?: string
}

export interface AIChefResponse {
  message: string
  suggestedRecipe?: Recipe
  tips?: string[]
  timestamp: string
}

export type PantryTab = 'all' | 'ingredient' | 'seasoning' | 'tool'
export type DiaryMealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'
export type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard'
