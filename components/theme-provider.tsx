'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface CustomThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: CustomThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
      storageKey="orbit-theme"
    >
      {children}
    </NextThemesProvider>
  )
}
