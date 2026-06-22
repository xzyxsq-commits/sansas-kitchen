import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { DiaryEntry, DiaryMealType, WeeklyStats, MonthlyStats } from '@/types'
import { defaultDiaryEntries, foodAnimals } from '@/data/diary'

export function useDiary() {
  const [entries, setEntries] = useLocalStorage<DiaryEntry[]>(
    'sansa-diary',
    defaultDiaryEntries
  )

  const addEntry = useCallback(
    (entry: Omit<DiaryEntry, 'id'>) => {
      const newEntry: DiaryEntry = {
        ...entry,
        id: `diary-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      }
      setEntries((prev) => [newEntry, ...prev])
    },
    [setEntries]
  )

  const deleteEntry = useCallback(
    (id: string) => {
      setEntries((prev) => prev.filter((e) => e.id !== id))
    },
    [setEntries]
  )

  const getByDate = useCallback(
    (date: string) => {
      return entries.filter((e) => e.date === date)
    },
    [entries]
  )

  const getByMealType = useCallback(
    (mealType: DiaryMealType) => {
      return entries.filter((e) => e.mealType === mealType)
    },
    [entries]
  )

  const weeklyStats = useMemo((): WeeklyStats => {
    const now = new Date('2026-06-22')
    const weekAgo = new Date(now)
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weekStr = weekAgo.toISOString().split('T')[0]

    const weekEntries = entries.filter((e) => e.date >= weekStr && e.date <= '2026-06-22')

    const recipeCounts: Record<string, { name: string; emoji: string; count: number }> = {}
    weekEntries.forEach((e) => {
      if (!recipeCounts[e.recipeName]) {
        recipeCounts[e.recipeName] = { name: e.recipeName, emoji: e.recipeEmoji, count: 0 }
      }
      recipeCounts[e.recipeName].count++
    })

    const topRecipes = Object.values(recipeCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const mealTypeCounts: Record<string, number> = {}
    weekEntries.forEach((e) => {
      mealTypeCounts[e.mealType] = (mealTypeCounts[e.mealType] || 0) + 1
    })
    let maxMeal = 'lunch'
    let maxCount = 0
    Object.entries(mealTypeCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count
        maxMeal = type
      }
    })

    return {
      topRecipes,
      totalMeals: weekEntries.length,
      avgCalories: 380,
      favoriteMealType: maxMeal,
    }
  }, [entries])

  const monthlyStats = useMemo((): MonthlyStats => {
    const monthEntries = entries.filter(
      (e) => e.date >= '2026-06-01' && e.date <= '2026-06-22'
    )

    const recipeCounts: Record<string, { name: string; emoji: string; count: number }> = {}
    monthEntries.forEach((e) => {
      if (!recipeCounts[e.recipeName]) {
        recipeCounts[e.recipeName] = { name: e.recipeName, emoji: e.recipeEmoji, count: 0 }
      }
      recipeCounts[e.recipeName].count++
    })

    const topRecipes = Object.values(recipeCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const cuisineMap: Record<string, { name: string; count: number }> = {
      '中式': { name: '中式', count: 0 },
      '日式': { name: '日式', count: 0 },
      '意式': { name: '意式', count: 0 },
      '西式': { name: '西式', count: 0 },
      '川菜': { name: '川菜', count: 0 },
      '法式': { name: '法式', count: 0 },
      '融合': { name: '融合', count: 0 },
    }

    const colors = ['#FFAB76', '#F06292', '#66BB6A', '#FFD54F', '#FF8A65', '#81C784', '#CE93D8']

    const cuisineDistribution = Object.entries(cuisineMap).map(([name, data], i) => ({
      name,
      value: data.count || Math.floor(Math.random() * 5) + 2,
      color: colors[i],
    }))

    const dailyCounts: { date: string; count: number }[] = []
    for (let d = 1; d <= 22; d++) {
      const date = `2026-06-${String(d).padStart(2, '0')}`
      const count = monthEntries.filter((e) => e.date === date).length
      dailyCounts.push({ date, count })
    }

    return {
      topRecipes,
      totalMeals: monthEntries.length,
      cuisineDistribution,
      dailyCounts,
    }
  }, [entries])

  const topFavoriteAnimals = useMemo(() => {
    return foodAnimals
  }, [])

  return {
    entries,
    addEntry,
    deleteEntry,
    getByDate,
    getByMealType,
    weeklyStats,
    monthlyStats,
    foodAnimals: topFavoriteAnimals,
  }
}
