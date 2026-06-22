import { Heart, Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent to-cream-200/50" />

      <div className="relative bg-gradient-to-b from-cream-200/50 to-cream-300/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-peach-300 to-peach-500 flex items-center justify-center">
                  <span className="text-lg">🐱</span>
                </div>
                <h3 className="text-lg font-display font-bold text-caramel-700">
                  Sansa's Kitchen
                </h3>
              </div>
              <p className="text-sm text-caramel-400 leading-relaxed">
                Cook with Love, Create with Magic.
                <br />
                你的智能厨房助手，让每一餐都充满温暖。
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="font-display font-semibold text-caramel-600 mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-honey-400" />
                快速链接
              </h4>
              <div className="flex flex-col gap-2 text-sm">
                <a href="/pantry" className="text-caramel-400 hover:text-caramel-600 transition-colors">食材库</a>
                <a href="/cooking" className="text-caramel-400 hover:text-caramel-600 transition-colors">烹饪区</a>
                <a href="/diary" className="text-caramel-400 hover:text-caramel-600 transition-colors">记录区</a>
              </div>
            </div>

            {/* Motto */}
            <div className="text-center md:text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-2xl border border-caramel-200/50">
                <Heart className="w-4 h-4 text-peach-500 fill-peach-500" />
                <span className="text-sm font-body text-caramel-500 italic">
                  Made with love & a pinch of magic
                </span>
              </div>
              <p className="text-xs text-caramel-300 mt-4">
                © 2026 Sansa's Kitchen. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-peach-400 via-rose-400 to-honey-400" />
      </div>
    </footer>
  )
}
