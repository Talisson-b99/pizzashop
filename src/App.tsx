import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { Router } from './routes'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="@pizzashop-theme">
      <HelmetProvider>
        <Toaster richColors position="top-right" />
        <Helmet titleTemplate="%s | pizza.shop" />
        <RouterProvider router={Router} />
      </HelmetProvider>
    </ThemeProvider>
  )
}

export default App
