import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from '@/components/layout/Layout'
import { motion } from 'framer-motion'

const Home = lazy(() => import('@/pages/Home'))
const Pantry = lazy(() => import('@/pages/Pantry'))
const CookingStudio = lazy(() => import('@/pages/CookingStudio'))
const FoodDiary = lazy(() => import('@/pages/FoodDiary'))
const RecipeDetail = lazy(() => import('@/pages/RecipeDetail'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 rounded-full border-4 border-caramel-200 border-t-[#FFAB76]"
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pantry" element={<Pantry />} />
            <Route path="/cooking" element={<CookingStudio />} />
            <Route path="/diary" element={<FoodDiary />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
