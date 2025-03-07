import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from './global/Providers/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </Router>
  </StrictMode>,
)
