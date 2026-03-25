'use client'

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { ColorModeProvider } from '@/components/ui/color-mode'

const customSystem = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: '#fff7ed' },
          100: { value: '#ffedd5' },
          200: { value: '#fed7aa' },
          300: { value: '#fdba74' },
          400: { value: '#fb923c' },
          500: { value: '#f97316' },
          600: { value: '#ea6c0a' },
          700: { value: '#c2570c' },
          800: { value: '#9a3e08' },
          900: { value: '#7c2d06' },
          950: { value: '#431407' },
        },
      },
    },
    semanticTokens: {
      colors: {
        'app.bg': {
          value: { _light: '#ffffff', _dark: '#000000' },
        },
        'app.surface': {
          value: { _light: '#f9fafb', _dark: '#111111' },
        },
        'app.card': {
          value: { _light: '#ffffff', _dark: '#0a0a0a' },
        },
        'app.border': {
          value: { _light: '#e5e7eb', _dark: '#1f2937' },
        },
        'app.text.primary': {
          value: { _light: '#111111', _dark: '#f9fafb' },
        },
        'app.text.secondary': {
          value: { _light: '#6b7280', _dark: '#9ca3af' },
        },
        'app.text.muted': {
          value: { _light: '#9ca3af', _dark: '#4b5563' },
        },
        'app.input.bg': {
          value: { _light: '#f3f4f6', _dark: '#111111' },
        },
        'app.input.border': {
          value: { _light: '#d1d5db', _dark: '#1f2937' },
        },
        'app.tag.bg': {
          value: { _light: '#f3f4f6', _dark: '#111827' },
        },
        'app.tag.active.bg': {
          value: { _light: '#f97316', _dark: '#f97316' },
        },
        'app.badge.promo.bg': {
          value: { _light: '#fff7ed', _dark: '#1a0f00' },
        },
        'app.badge.promo.color': {
          value: { _light: '#c2570c', _dark: '#fb923c' },
        },
        'app.badge.free.bg': {
          value: { _light: '#f0fdf4', _dark: '#052e16' },
        },
        'app.badge.free.color': {
          value: { _light: '#15803d', _dark: '#4ade80' },
        },
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider>
      <ChakraProvider value={customSystem}>
        {children}
      </ChakraProvider>
    </ColorModeProvider>
  )
}