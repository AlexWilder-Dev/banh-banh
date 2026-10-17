import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource-variable/oswald'
import '@fontsource-variable/crimson-pro'
import '@fontsource-variable/crimson-pro/wght-italic.css'
import './styles.css'
import './pages/pages.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
