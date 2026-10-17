import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import Home from './pages/Home'

const Menu = lazy(() => import('./pages/Menu'))
const Book = lazy(() => import('./pages/Book'))
const Groups = lazy(() => import('./pages/Groups'))
const Room = lazy(() => import('./pages/Room'))
const Little = lazy(() => import('./pages/Little'))
const AtHome = lazy(() => import('./pages/AtHome'))
const Visit = lazy(() => import('./pages/Visit'))

const TITLES: Record<string, string> = {
  '/': 'Bánh Bánh · Vietnamese home cooking, made for sharing · Brixton',
  '/menu': 'Menu · Bánh Bánh Brixton',
  '/book': 'Book a table · Bánh Bánh Brixton',
  '/groups': 'Groups & private hire · Bánh Bánh Brixton',
  '/room': 'The room · Bánh Bánh Brixton',
  '/little': 'Little Bánh Bánh · Fleet Street',
  '/at-home': 'Bánh Bánh at Home · Deliveroo',
  '/visit': 'Visit · Bánh Bánh',
}

function useRouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES['/']
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView())
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}

export default function App() {
  useRouteEffects()
  const location = useLocation()
  return (
    <>
      <a href="#main" className="skip-link" onClick={(e) => {
        e.preventDefault()
        document.getElementById('main')?.focus()
      }}>
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/book" element={<Book key={location.key + location.search} />} />
            <Route path="/groups" element={<Groups key={location.key + location.search} />} />
            <Route path="/room" element={<Room />} />
            <Route path="/little" element={<Little />} />
            <Route path="/at-home" element={<AtHome />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
