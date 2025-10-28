'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), [])

  // Show a placeholder button while hydrating
  if (!mounted) {
    return (
      <button
        className="w-9 h-9 flex items-center justify-center rounded-md border opacity-50"
        disabled
      >
        <Sun className="h-4 w-4" />
      </button>
    )
  }

  const themes = [
    { name: 'Light', value: 'light', icon: Sun },
    { name: 'Dark', value: 'dark', icon: Moon },
  ]

  const currentThemeIndex = themes.findIndex(t => t.value === theme)
  const currentTheme = themes[currentThemeIndex] || themes[0] // Default to light if theme is not found

  const cycleTheme = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length
    setTheme(themes[nextIndex].value)
  }

  return (
    <button
      onClick={cycleTheme}
      className={`w-9 h-9 flex items-center justify-center rounded-md border transition-all duration-200 ${
        theme === 'light'
          ? 'bg-blue-500 border-blue-500 text-white shadow-md ring-2 ring-blue-500/20'
          : 'bg-blue-600 border-blue-600 text-white shadow-md ring-2 ring-blue-600/20'
      }`}
      title={`Current: ${currentTheme.name}. Click to cycle theme.`}
    >
      <currentTheme.icon className="h-4 w-4" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

