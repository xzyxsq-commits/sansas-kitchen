import { useState, useEffect, useCallback, useMemo } from 'react'
import type { DiaryEntry, DiaryMealType, WeeklyStats, MonthlyStats } from '@/types'
import { getSupabase } from '@/lib/supabase'
import { defaultDiaryEntries, foodAnimals } from '@/data/diary'

interface DiaryRow {
  id: string
  user_id: string
  date: string
  meal_type: DiaryMealType
  recipe_id: string
  recipe_name: string
  recipe_emoji: string
  notes: string
  rating: number
}

function rowToEntry(row: DiaryRow): DiaryEntry {
  return {
    id: row.id,
    date: row.date,
    mealType: row.meal_type,
    recipeId: row.recipe_id,
    recipeName: row.recipe_name,
    recipeEmoji: row.recipe_emoji,
    notes: row.notes,
    rating: row.rating,
  }
}

export function useUserDiary(userId: string | undefined) {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setEntries(defaultDiaryEntries)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    getSupabase()
      .from('diary_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .then(({ data, error: fetchErr }) => {
        if (cancelled) return
        if (fetchErr) {
          setError(fetchErr.message)
          setEntries(defaultDiaryEntries)
        } else if (data) {
          setEntries((data as DiaryRow[]).map(rowToEntry))
        }
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [userId])

  const setEntriesDirect = useCallback((value: DiaryEntry[] | ((prev: DiaryEntry[]) => DiaryEntry[])) => {
    setEntries(value)
  }, [])

  const addEntry = useCallback(
    async (entry: Omit<DiaryEntry, 'id'>) => {
      if (!userId) return

      const newRow = {
        user_id: userId,
        date: entry.date,
        meal_type: entry.mealType,
        recipe_id: entry.recipeId,
        recipe_name: entry.recipeName,
        recipe_emoji: entry.recipeEmoji,
        notes: entry.notes,
        rating: entry.rating,
      }

      const { data, error: insertErr } = await getSupabase()
        .from('diary_entries')
        .insert(newRow)
        .select()
        .single()

      if (insertErr) {
        setError(insertErr.message)
        return
      }

      if (data) {
        setEntries(prev => [rowToEntry(data as DiaryRow), ...prev])
      }
    },
    [userId]
  )

  const deleteEntry = useCallback(
    async (id: string) => {
      if (!userId) return

      const { error: deleteErr } = await getSupabase()
        .from('diary_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)

      if (deleteErr) {
        setError(deleteErr.message)
        return
      }

      setEntries(prev => prev.filter(e => e.id !== id))
    },
    [userId]
  )

  const getByDate = useCallback(
    (date: string) => entries.filter(e => e.date === date),
    [entries]
  )

  const getByMealType = useCallback(
    (mealType: DiaryMealType) => entries.filter(e => e.mealType === mealType),
    [entries]
  )

  const weeklyStats = useMemo((): WeeklyStats => {
    const now = new Date()
    const weekAgo = new Date(now)
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weekStr = weekAgo.toISOString().split('T')[0]
    const todayStr = now.toISOString().split('T')[0]

    const weekEntries = entries.filter(e => e.date >= weekStr && e.date <= todayStr)

    const recipeCounts: Record<string, { name: string; emoji: string; count: number }> = {}
    weekEntries.forEach(e => {
      if (!recipeCounts[e.recipeName]) {
        recipeCounts[e.recipeName] = { name: e.recipeName, emoji: e.recipeEmoji, count: 0 }
      }
      recipeCounts[e.recipeName].count++
    })

    const topRecipes = Object.values(recipeCounts).sort((a, b) => b.count - a.count).slice(0, 10)

    const mealTypeCounts: Record<string, number> = {}
    weekEntries.forEach(e => { mealTypeCounts[e.mealType] = (mealTypeCounts[e.mealType] || 0) + 1 })
    let maxMeal = 'lunch'; let maxCount = 0
    Object.entries(mealTypeCounts).forEach(([type, count]) => { if (count > maxCount) { maxCount = count; maxMeal = type } })

    return { topRecipes, totalMeals: weekEntries.length, avgCalories: 380, favoriteMealType: maxMeal }
  }, [entries])

  const monthlyStats = useMemo((): MonthlyStats => {
    const now = new Date()
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
    const todayStr = now.toISOString().split('T')[0]
    const monthEntries = entries.filter(e => e.date >= monthStart && e.date <= todayStr)

    const recipeCounts: Record<string, { name: string; emoji: string; count: number }> = {}
    monthEntries.forEach(e => {
      if (!recipeCounts[e.recipeName]) recipeCounts[e.recipeName] = { name: e.recipeName, emoji: e.recipeEmoji, count: 0 }
      recipeCounts[e.recipeName].count++
    })
    const topRecipes = Object.values(recipeCounts).sort((a, b) => b.count - a.count).slice(0, 10)

    const cuisineMap: Record<string, { name: string; count: number }> = {
      '中式': { name: '中式', count: 0 }, '日式': { name: '日式', count: 0 },
      '意式': { name: '意式', count: 0 }, '西式': { name: '西式', count: 0 },
      '川菜': { name: '川菜', count: 0 }, '法式': { name: '法式', count: 0 },
      '融合': { name: '融合', count: 0 },
    }
    const colors = ['#FFAB76', '#F06292', '#66BB6A', '#FFD54F', '#FF8A65', '#81C784', '#CE93D8']
    const cuisineDistribution = Object.entries(cuisineMap).map(([name, data], i) => ({
      name, value: data.count || Math.floor(Math.random() * 5) + 2, color: colors[i],
    }))

    const days = now.getDate()
    const dailyCounts: { date: string; count: number }[] = []
    for (let d = 1; d <= days; d++) {
      const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      dailyCounts.push({ date, count: monthEntries.filter(e => e.date === date).length })
    }

    return { topRecipes, totalMeals: monthEntries.length, cuisineDistribution, dailyCounts }
  }, [entries])

  const topFavoriteAnimals = useMemo(() => foodAnimals, [])

  return {
    entries, setEntries: setEntriesDirect, addEntry, deleteEntry,
    getByDate, getByMealType, weeklyStats, monthlyStats,
    foodAnimals: topFavoriteAnimals, isLoading: loading, error,
  }
}
