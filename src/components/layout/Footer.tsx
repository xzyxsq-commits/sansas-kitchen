import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent to-cream-200/50" />
      <div className="relative bg-gradient-to-b from-cream-200/50 to-cream-300/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-peach-300 to-peach-500 flex items-center justify-center">
                <span className="text-sm">🐱</span>
              </div>
              <span className="font-display font-bold text-caramel-600">Sansa's Kitchen</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-caramel-400">
              <a href="/pantry" className="hover:text-caramel-600 transition-colors">Pantry</a>
              <a href="/cooking" className="hover:text-caramel-600 transition-colors">Cook</a>
              <a href="/diary" className="hover:text-caramel-600 transition-colors">Diary</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-caramel-400">
              <Heart className="w-3.5 h-3.5 text-peach-500 fill-peach-500" />
              <span>Made with love & magic</span>
            </div>
          </div>
          <p className="text-center text-xs text-caramel-300 mt-6">© 2026 Sansa's Kitchen. All rights reserved.</p>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-peach-400 via-rose-400 to-honey-400" />
      </div>
    </footer>
  )
}
