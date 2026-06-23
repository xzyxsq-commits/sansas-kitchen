import { useRef, useEffect, useState } from 'react'
import { cn } from '@/utils/cn'

interface VerificationInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export function VerificationInput({ length = 6, value, onChange, error, disabled }: VerificationInputProps) {
  const [focused, setFocused] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Auto-focus first empty input
    if (!disabled) {
      const firstEmpty = value.length
      if (firstEmpty < length) {
        inputsRef.current[firstEmpty]?.focus()
      }
    }
  }, [disabled, length, value.length])

  const handleChange = (index: number, char: string) => {
    if (disabled) return
    if (!/^\d*$/.test(char)) return

    const digits = value.split('')
    digits[index] = char
    const newValue = digits.join('').slice(0, length)
    onChange(newValue)

    // Auto-advance to next input
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange(pasted)
    if (pasted.length < length) {
      inputsRef.current[pasted.length]?.focus()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ''}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            className={cn(
              'w-11 h-14 sm:w-14 sm:h-16 rounded-2xl text-center text-xl font-bold outline-none transition-all duration-300',
              'bg-white/60 border-2',
              error
                ? 'border-rose-300 focus:border-rose-400'
                : focused
                  ? 'border-peach-400 focus:border-peach-400 shadow-[0_0_0_5px_rgba(240,168,120,0.10)]'
                  : 'border-caramel-200 hover:border-caramel-300',
              value[i] && 'border-peach-400 bg-peach-50/50',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          />
        ))}
      </div>
      {error && (
        <p className="text-xs text-rose-500 font-medium text-center">{error}</p>
      )}
    </div>
  )
}
