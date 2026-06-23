import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Ingredient, IngredientCategory } from '@/types'
import { getSupabase } from '@/lib/supabase'
import { initialPantryIngredients } from '@/data/ingredients'

interface PantryRow {
  id: string
  user_id: string
  name: string
  category: 'ingredient' | 'seasoning' | 'tool'
  tags: string[]
  quantity: number | null
  unit: string | null
  emoji: string
  added_at: string
}

function rowToIngredient(row: PantryRow): Ingredient {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    tags: row.tags || [],
    quantity: row.quantity ?? undefined,
    unit: row.unit ?? undefined,
    emoji: row.emoji,
    addedAt: row.added_at,
  }
}

export function useUserPantry(userId: string | undefined) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch on mount / userId change
  useEffect(() => {
    if (!userId) {
      setIngredients(initialPantryIngredients)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    getSupabase()
      .from('pantry_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .then(({ data, error: fetchErr }) => {
        if (cancelled) return
        if (fetchErr) {
          setError(fetchErr.message)
          setIngredients(initialPantryIngredients)
        } else if (data) {
          setIngredients((data as PantryRow[]).map(rowToIngredient))
        }
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [userId])

  const setIngredientsDirect = useCallback((value: Ingredient[] | ((prev: Ingredient[]) => Ingredient[])) => {
    setIngredients(value)
  }, [])

  const addIngredient = useCallback(
    async (ingredient: Omit<Ingredient, 'id' | 'addedAt'>) => {
      if (!userId) return

      const newRow = {
        user_id: userId,
        name: ingredient.name,
        category: ingredient.category,
        tags: ingredient.tags,
        quantity: ingredient.quantity ?? null,
        unit: ingredient.unit ?? null,
        emoji: ingredient.emoji,
        added_at: new Date().toISOString().split('T')[0],
      }

      const { data, error: insertErr } = await getSupabase()
        .from('pantry_items')
        .insert(newRow)
        .select()
        .single()

      if (insertErr) {
        setError(insertErr.message)
        return
      }

      if (data) {
        setIngredients(prev => [...prev, rowToIngredient(data as PantryRow)])
      }
    },
    [userId]
  )

  const updateIngredient = useCallback(
    async (id: string, updates: Partial<Ingredient>) => {
      if (!userId) return

      const dbUpdates: Record<string, unknown> = {}
      if (updates.name !== undefined) dbUpdates.name = updates.name
      if (updates.category !== undefined) dbUpdates.category = updates.category
      if (updates.tags !== undefined) dbUpdates.tags = updates.tags
      if (updates.quantity !== undefined) dbUpdates.quantity = updates.quantity
      if (updates.unit !== undefined) dbUpdates.unit = updates.unit
      if (updates.emoji !== undefined) dbUpdates.emoji = updates.emoji

      if (Object.keys(dbUpdates).length === 0) return

      const { error: updateErr } = await getSupabase()
        .from('pantry_items')
        .update(dbUpdates)
        .eq('id', id)
        .eq('user_id', userId)

      if (updateErr) {
        setError(updateErr.message)
        return
      }

      setIngredients(prev =>
        prev.map(ing => (ing.id === id ? { ...ing, ...updates } : ing))
      )
    },
    [userId]
  )

  const deleteIngredient = useCallback(
    async (id: string) => {
      if (!userId) return

      const { error: deleteErr } = await getSupabase()
        .from('pantry_items')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)

      if (deleteErr) {
        setError(deleteErr.message)
        return
      }

      setIngredients(prev => prev.filter(ing => ing.id !== id))
    },
    [userId]
  )

  const getByCategory = useCallback(
    (category: IngredientCategory) => ingredients.filter(ing => ing.category === category),
    [ingredients]
  )

  const searchIngredients = useCallback(
    (query: string) => {
      const q = query.toLowerCase().trim()
      if (!q) return ingredients
      return ingredients.filter(
        ing => ing.name.toLowerCase().includes(q) || ing.tags.some(tag => tag.toLowerCase().includes(q))
      )
    },
    [ingredients]
  )

  const stats = useMemo(() => {
    const ingredientCount = ingredients.filter(i => i.category === 'ingredient').length
    const seasoningCount = ingredients.filter(i => i.category === 'seasoning').length
    const toolCount = ingredients.filter(i => i.category === 'tool').length
    return { total: ingredients.length, ingredientCount, seasoningCount, toolCount }
  }, [ingredients])

  return {
    ingredients,
    setIngredients: setIngredientsDirect,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getByCategory,
    searchIngredients,
    stats,
    isLoading: loading,
    error,
  }
}
