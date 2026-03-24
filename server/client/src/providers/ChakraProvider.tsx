'use client'

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'

const customSystem = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: '#7C3AED' },
          600: { value: '#6D28D9' },
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