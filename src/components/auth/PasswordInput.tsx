import { useState } from 'react'
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  showStrength?: boolean
  error?: string
  autoFocus?: boolean
}

export function PasswordInput({ value, onChange, placeholder = 'Password', showStrength = true, error, autoFocus }: PasswordInputProps) {
  const [show, setShow] = useState(false)
  const [focused, setFocused] = useState(false)

  const checks = {
    length: value.length >= 8,
    letter: /[a-zA-Z]/.test(value),
    number: /[0-9]/.test(value),
    special: /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/`~]/.test(value),
  }

  const strength = [checks.length, checks.letter, checks.number, checks.special].filter(Boolean).length
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', 'bg-rose-400', 'bg-honey-400', 'bg-sage-400', 'bg-sage-500'][strength]
  const strengthWidth = ['0%', '25%', '50%', '75%', '100%'][strength]

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="new-password"
          className={cn(
            'input-magic pr-11',
            error && 'border-rose-300 focus:border-rose-400 focus:shadow-[0_0_0_5px_rgba(240,100,100,0.10)]'
          )}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-cream-200 transition-colors"
          tabIndex={-1}
        >
          {show ? (
            <EyeOff className="w-4 h-4 text-caramel-400" />
          ) : (
            <Eye className="w-4 h-4 text-caramel-400" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-xs text-rose-500 font-medium pl-1">{error}</p>
      )}

      {showStrength && focused && value.length > 0 && (
        <div className="px-1 space-y-2 pt-1">
          {/* Strength bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-cream-300 overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', strengthColor)}
                style={{ width: strengthWidth }}
              />
            </div>
            <span className="text-[10px] font-bold text-caramel-500 uppercase tracking-wider">
              {strengthLabel}
            </span>
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-2 gap-1">
            {[
              { key: 'length', label: '8+ chars' },
              { key: 'letter', label: 'Letters' },
              { key: 'number', label: 'Numbers' },
              { key: 'special', label: 'Symbols' },
            ].map(({ key, label }) => {
              const passed = checks[key as keyof typeof checks]
              return (
                <div key={key} className="flex items-center gap-1">
                  {passed ? (
                    <Check className="w-3 h-3 text-sage-500" />
                  ) : (
                    <X className="w-3 h-3 text-caramel-300" />
                  )}
                  <span className={cn('text-[11px]', passed ? 'text-sage-600 font-medium' : 'text-caramel-400')}>
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
