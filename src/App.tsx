import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from '@/components/layout/Layout'
import { AuthProvider } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

const Home = lazy(() => import('@/pages/Home'))
const Pantry = lazy(() => import('@/pages/Pantry'))
const CookingStudio = lazy(() => import('@/pages/CookingStudio'))
const FoodDiary = lazy(() => import('@/pages/FoodDiary'))
const RecipeDetail = lazy(() => import('@/pages/RecipeDetail'))
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const Profile = lazy(() => import('@/pages/auth/Profile'))
const Onboarding = lazy(() => import('@/pages/auth/Onboarding'))

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
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Auth pages (no navbar/footer) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Main app with Layout (navbar + footer) */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pantry" element={<Pantry />} />
              <Route path="/cooking" element={<CookingStudio />} />
              <Route path="/diary" element={<FoodDiary />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
