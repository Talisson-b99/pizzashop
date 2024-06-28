import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import { Router } from './routes'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="@pizzashop-theme">
      <HelmetProvider>
        <Toaster richColors position="top-right" />
        <Helmet titleTemplate="%s | pizza.shop" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router} />
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  )
}

export default App
