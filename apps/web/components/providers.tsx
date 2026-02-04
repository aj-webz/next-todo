"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { QueryClient } from "@tanstack/react-query";
import  { QueryClientProvider } from '@tanstack/react-query'
export const queryClient = new QueryClient({defaultOptions:{
    queries:{
        staleTime :1000*60,
        refetchOnWindowFocus: false,
    }
}})
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
          <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
    </QueryClientProvider>
  )
}
