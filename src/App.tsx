import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { Router } from './routes'

function App() {
  return (
    <HelmetProvider>
      <Toaster richColors position="top-right" />
      <Helmet titleTemplate="%s | pizza.shop" />
      <RouterProvider router={Router} />
    </HelmetProvider>
  )
}

export default App
