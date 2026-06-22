import type { Ingredient } from '@/types'

export const defaultIngredients: Ingredient[] = [
  // 食材
  { id: 'ing-1', name: '鸡蛋', category: 'ingredient', tags: ['蛋白质', '早餐'], emoji: '🥚', quantity: 6, unit: '个', addedAt: '2026-06-20' },
  { id: 'ing-2', name: '牛奶', category: 'ingredient', tags: ['饮品', '早餐'], emoji: '🥛', quantity: 1, unit: '升', addedAt: '2026-06-20' },
  { id: 'ing-3', name: '面粉', category: 'ingredient', tags: ['主食', '烘焙'], emoji: '🌾', quantity: 2, unit: 'kg', addedAt: '2026-06-19' },
  { id: 'ing-4', name: '番茄', category: 'ingredient', tags: ['蔬菜'], emoji: '🍅', quantity: 4, unit: '个', addedAt: '2026-06-21' },
  { id: 'ing-5', name: '牛肉', category: 'ingredient', tags: ['肉类', '蛋白质'], emoji: '🥩', quantity: 500, unit: 'g', addedAt: '2026-06-21' },
  { id: 'ing-6', name: '鸡胸肉', category: 'ingredient', tags: ['肉类', '蛋白质', '健身'], emoji: '🍗', quantity: 300, unit: 'g', addedAt: '2026-06-20' },
  { id: 'ing-7', name: '洋葱', category: 'ingredient', tags: ['蔬菜', '调味'], emoji: '🧅', quantity: 3, unit: '个', addedAt: '2026-06-19' },
  { id: 'ing-8', name: '大蒜', category: 'ingredient', tags: ['调味'], emoji: '🧄', quantity: 5, unit: '瓣', addedAt: '2026-06-18' },
  { id: 'ing-9', name: '胡萝卜', category: 'ingredient', tags: ['蔬菜'], emoji: '🥕', quantity: 3, unit: '根', addedAt: '2026-06-20' },
  { id: 'ing-10', name: '土豆', category: 'ingredient', tags: ['蔬菜', '主食'], emoji: '🥔', quantity: 4, unit: '个', addedAt: '2026-06-19' },
  { id: 'ing-11', name: '青椒', category: 'ingredient', tags: ['蔬菜'], emoji: '🫑', quantity: 2, unit: '个', addedAt: '2026-06-21' },
  { id: 'ing-12', name: '西兰花', category: 'ingredient', tags: ['蔬菜', '健身'], emoji: '🥦', quantity: 1, unit: '颗', addedAt: '2026-06-21' },
  { id: 'ing-13', name: '虾仁', category: 'ingredient', tags: ['海鲜', '蛋白质'], emoji: '🦐', quantity: 200, unit: 'g', addedAt: '2026-06-20' },
  { id: 'ing-14', name: '豆腐', category: 'ingredient', tags: ['豆制品', '素食'], emoji: '🫘', quantity: 1, unit: '块', addedAt: '2026-06-19' },
  { id: 'ing-15', name: '米饭', category: 'ingredient', tags: ['主食'], emoji: '🍚', quantity: 3, unit: '碗', addedAt: '2026-06-22' },
  { id: 'ing-16', name: '面条', category: 'ingredient', tags: ['主食'], emoji: '🍝', quantity: 500, unit: 'g', addedAt: '2026-06-18' },
  { id: 'ing-17', name: '芝士', category: 'ingredient', tags: ['乳制品', '西餐'], emoji: '🧀', quantity: 200, unit: 'g', addedAt: '2026-06-20' },
  { id: 'ing-18', name: '黄油', category: 'ingredient', tags: ['乳制品', '烘焙'], emoji: '🧈', quantity: 250, unit: 'g', addedAt: '2026-06-19' },
  { id: 'ing-19', name: '蘑菇', category: 'ingredient', tags: ['蔬菜', '菌类'], emoji: '🍄', quantity: 200, unit: 'g', addedAt: '2026-06-21' },
  { id: 'ing-20', name: '菠菜', category: 'ingredient', tags: ['蔬菜'], emoji: '🥬', quantity: 300, unit: 'g', addedAt: '2026-06-21' },
  { id: 'ing-21', name: '猪肉', category: 'ingredient', tags: ['肉类', '蛋白质'], emoji: '🥓', quantity: 400, unit: 'g', addedAt: '2026-06-20' },
  { id: 'ing-22', name: '三文鱼', category: 'ingredient', tags: ['海鲜', '蛋白质', '健康'], emoji: '🐟', quantity: 250, unit: 'g', addedAt: '2026-06-21' },
  { id: 'ing-23', name: '牛油果', category: 'ingredient', tags: ['水果', '健康'], emoji: '🥑', quantity: 2, unit: '个', addedAt: '2026-06-21' },
  { id: 'ing-24', name: '玉米', category: 'ingredient', tags: ['蔬菜', '主食'], emoji: '🌽', quantity: 2, unit: '根', addedAt: '2026-06-19' },
  { id: 'ing-25', name: '奶油', category: 'ingredient', tags: ['乳制品', '烘焙', '甜品'], emoji: '🍶', quantity: 200, unit: 'ml', addedAt: '2026-06-18' },

  // 调料
  { id: 'sea-1', name: '盐', category: 'seasoning', tags: ['基础'], emoji: '🧂', quantity: 1, unit: '袋', addedAt: '2026-06-15' },
  { id: 'sea-2', name: '糖', category: 'seasoning', tags: ['基础', '甜品'], emoji: '🍬', quantity: 1, unit: '袋', addedAt: '2026-06-15' },
  { id: 'sea-3', name: '生抽', category: 'seasoning', tags: ['中式', '基础'], emoji: '🫗', quantity: 1, unit: '瓶', addedAt: '2026-06-16' },
  { id: 'sea-4', name: '老抽', category: 'seasoning', tags: ['中式'], emoji: '🫗', quantity: 1, unit: '瓶', addedAt: '2026-06-16' },
  { id: 'sea-5', name: '胡椒粉', category: 'seasoning', tags: ['基础'], emoji: '🌶️', quantity: 1, unit: '瓶', addedAt: '2026-06-17' },
  { id: 'sea-6', name: '蚝油', category: 'seasoning', tags: ['中式'], emoji: '🦪', quantity: 1, unit: '瓶', addedAt: '2026-06-16' },
  { id: 'sea-7', name: '料酒', category: 'seasoning', tags: ['中式'], emoji: '🍶', quantity: 1, unit: '瓶', addedAt: '2026-06-17' },
  { id: 'sea-8', name: '醋', category: 'seasoning', tags: ['基础'], emoji: '🍾', quantity: 1, unit: '瓶', addedAt: '2026-06-15' },
  { id: 'sea-9', name: '豆瓣酱', category: 'seasoning', tags: ['中式', '川菜'], emoji: '🫘', quantity: 1, unit: '罐', addedAt: '2026-06-18' },
  { id: 'sea-10', name: '番茄酱', category: 'seasoning', tags: ['西餐'], emoji: '🍅', quantity: 1, unit: '瓶', addedAt: '2026-06-18' },
  { id: 'sea-11', name: '橄榄油', category: 'seasoning', tags: ['西餐', '健康'], emoji: '🫒', quantity: 1, unit: '瓶', addedAt: '2026-06-16' },
  { id: 'sea-12', name: '辣椒粉', category: 'seasoning', tags: ['香料'], emoji: '🌶️', quantity: 1, unit: '瓶', addedAt: '2026-06-17' },
  { id: 'sea-13', name: '咖喱粉', category: 'seasoning', tags: ['香料', '东南亚'], emoji: '🍛', quantity: 1, unit: '袋', addedAt: '2026-06-18' },
  { id: 'sea-14', name: '芝麻油', category: 'seasoning', tags: ['中式'], emoji: '🫗', quantity: 1, unit: '瓶', addedAt: '2026-06-17' },
  { id: 'sea-15', name: '蜂蜜', category: 'seasoning', tags: ['甜品', '健康'], emoji: '🍯', quantity: 1, unit: '罐', addedAt: '2026-06-19' },

  // 厨具
  { id: 'tool-1', name: '炒锅', category: 'tool', tags: ['中式', '基础'], emoji: '🍳', addedAt: '2026-06-10' },
  { id: 'tool-2', name: '平底锅', category: 'tool', tags: ['西餐', '基础'], emoji: '🍳', addedAt: '2026-06-10' },
  { id: 'tool-3', name: '烤箱', category: 'tool', tags: ['烘焙', '西餐'], emoji: '🔥', addedAt: '2026-06-10' },
  { id: 'tool-4', name: '空气炸锅', category: 'tool', tags: ['健康', '便捷'], emoji: '💨', addedAt: '2026-06-11' },
  { id: 'tool-5', name: '蒸锅', category: 'tool', tags: ['中式', '健康'], emoji: '♨️', addedAt: '2026-06-10' },
  { id: 'tool-6', name: '电饭煲', category: 'tool', tags: ['基础', '便捷'], emoji: '🍚', addedAt: '2026-06-09' },
  { id: 'tool-7', name: '料理机', category: 'tool', tags: ['便捷'], emoji: '🔄', addedAt: '2026-06-12' },
  { id: 'tool-8', name: '汤锅', category: 'tool', tags: ['基础'], emoji: '🍲', addedAt: '2026-06-10' },
  { id: 'tool-9', name: '菜刀', category: 'tool', tags: ['基础'], emoji: '🔪', addedAt: '2026-06-09' },
  { id: 'tool-10', name: '砧板', category: 'tool', tags: ['基础'], emoji: '🪵', addedAt: '2026-06-09' },
]

export const ingredientTags = [
  '蛋白质', '蔬菜', '肉类', '海鲜', '主食',
  '乳制品', '水果', '饮品', '烘焙', '甜品',
  '豆制品', '素食', '健身', '健康', '早餐',
  '西餐', '中式', '川菜', '东南亚', '香料',
  '菌类', '便捷', '基础',
]

export const initialPantryIngredients: Ingredient[] = defaultIngredients
