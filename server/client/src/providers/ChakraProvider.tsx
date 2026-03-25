'use client'

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'

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
        },
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={customSystem}>
      {children}
    </ChakraProvider>
  )
}