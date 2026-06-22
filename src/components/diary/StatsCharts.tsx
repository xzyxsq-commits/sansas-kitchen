import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import type { WeeklyStats, MonthlyStats } from '@/types'

interface StatsChartsProps {
  weekly: WeeklyStats
  monthly: MonthlyStats
}

export function TopRecipesList({ data, title }: { data: { name: string; emoji: string; count: number }[]; title: string }) {
  const maxCount = Math.max(...data.map((d) => d.count), 1)

  return (
    <Card hover={false}>
      <h3 className="font-display font-bold text-caramel-700 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3"
          >
            <span className="text-sm font-bold text-caramel-300 w-5">{i + 1}</span>
            <span className="text-xl">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-caramel-600 truncate">{item.name}</span>
                <span className="text-xs text-caramel-400 ml-2">{item.count}次</span>
              </div>
              <div className="h-2 bg-caramel-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / maxCount) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  className="h-full rounded-full gradient-logo"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

export function HeatMap({ data }: { data: { date: string; count: number }[] }) {
  const weeks: { date: string; count: number }[][] = []
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7))
  }

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-cream-200'
    if (count === 1) return 'bg-honey-200'
    if (count === 2) return 'bg-honey-300'
    if (count === 3) return 'bg-peach-400'
    return 'bg-peach-500'
  }

  return (
    <Card hover={false}>
      <h3 className="font-display font-bold text-caramel-700 mb-4">📊 饮食热力图</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: wi * 0.02 }}
                  className={`w-8 h-8 rounded-lg ${getIntensity(day.count)} flex items-center justify-center`}
                  title={`${day.date}: ${day.count}餐`}
                >
                  <span className="text-[10px] font-semibold text-caramel-700/60">
                    {day.date.split('-')[2]}
                  </span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-caramel-400">
          <span>少</span>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${getIntensity(i)}`} />
          ))}
          <span>多</span>
        </div>
      </div>
    </Card>
  )
}

export function PieChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  let cumulativePercent = 0

  return (
    <Card hover={false}>
      <h3 className="font-display font-bold text-caramel-700 mb-4">🥧 菜系占比</h3>
      <div className="flex items-center gap-6">
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {data.map((d) => {
              const percent = (d.value / total) * 100
              const startAngle = (cumulativePercent / 100) * 360
              const endAngle = ((cumulativePercent + percent) / 100) * 360
              cumulativePercent += percent

              const startRad = (startAngle * Math.PI) / 180
              const endRad = (endAngle * Math.PI) / 180

              const r = 40
              const cx = 50
              const cy = 50

              const x1 = cx + r * Math.cos(startRad)
              const y1 = cy + r * Math.sin(startRad)
              const x2 = cx + r * Math.cos(endRad)
              const y2 = cy + r * Math.sin(endRad)

              const largeArc = endAngle - startAngle > 180 ? 1 : 0

              return (
                <motion.path
                  key={d.name}
                  d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={d.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )
            })}
            <circle cx="50" cy="50" r="25" fill="white" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-display font-bold text-caramel-700">{total}</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-sm text-caramel-600">{d.name}</span>
              <span className="text-xs text-caramel-400 ml-auto">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function BarChart({ weekly, monthly }: StatsChartsProps) {
  const maxCount = Math.max(...monthly.dailyCounts.map((d) => d.count), 1)

  return (
    <Card hover={false}>
      <h3 className="font-display font-bold text-caramel-700 mb-4">📈 本月饮食频率</h3>
      <div className="flex items-end gap-1 h-32">
        {monthly.dailyCounts.map((day) => (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(day.count / maxCount) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="w-full rounded-t-lg bg-gradient-to-t from-peach-400 to-peach-500 min-h-[4px]"
            />
            {day.date.endsWith('01') || day.date.endsWith('08') || day.date.endsWith('15') || day.date.endsWith('22') ? (
              <span className="text-[9px] text-caramel-400">{day.date.split('-')[2]}</span>
            ) : (
              <span className="text-[9px] text-caramel-300">·</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-caramel-400">
        <span>6月1日</span>
        <span>6月22日</span>
      </div>
    </Card>
  )
}
