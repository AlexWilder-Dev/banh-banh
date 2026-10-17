import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Wordmark } from './marks'
import { brixton } from '../data/restaurant'
import { venueStatus } from '../lib/hours'
import { useLondonNow } from '../lib/useNow'
import './header.css'

export const NAV = [
  { to: '/menu', label: 'Menu', gloss: 'Khai vị, mẹt, cơm nhà, ăn kèm' },
  { to: '/book', label: 'Book a table', gloss: 'Up to 10 guests' },
  { to: '/groups', label: 'Groups & hire', gloss: 'Over 10, semi or full hire' },
  { to: '/room', label: 'The room', gloss: 'By House of Baby' },
  { to: '/little', label: 'Little Bánh Bánh', gloss: 'Fleet Street, weekday lunch' },
  { to: '/at-home', label: 'At home', gloss: 'Delivery on Deliveroo' },
  { to: '/visit', label: 'Visit', gloss: '326 Coldharbour Lane' },
]

/** Reads the data-header attribute of whatever section sits under the bar. */
function useHeaderTone() {
  const [tone, setTone] = useState<'dark' | 'light'>('light')
  const { pathname } = useLocation()
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const el = document.elementsFromPoint(window.innerWidth / 2, 40).find((e) => e.closest('[data-header]') && !e.closest('.site-header'))
      const value = el?.closest('[data-header]')?.getAttribute('data-header')
      setTone(value === 'dark' ? 'dark' : 'light')
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    const t = window.setTimeout(read, 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearTimeout(t)
      cancelAnimationFrame(frame)
    }
  }, [pathname])
  return tone
}

export function Header() {
  const [open, setOpen] = useState(false)
  const tone = useHeaderTone()
  const { pathname } = useLocation()
  const now = useLondonNow()
  const status = venueStatus(brixton.hours, now)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className={`site-header site-header--${open ? 'dark' : tone}`}>
        <Link to="/" className="site-header__mark" aria-label="Bánh Bánh, home">
          <Wordmark />
        </Link>
        <nav className="site-header__links" aria-label="Main">
          {NAV.filter((n) => n.to !== '/book').map((n) => (
            <NavLink key={n.to} to={n.to}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__actions">
          <span className={`site-header__status status ${status.open ? 'status--open' : ''}`}>
            <span className="status__dot" aria-hidden />
            {status.headline}
          </span>
          {pathname !== '/book' && (
            <Link to="/book" className="btn site-header__book">
              Book
            </Link>
          )}
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            <span className={`burger ${open ? 'burger--open' : ''}`} aria-hidden>
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-nav"
            className="nav-sheet"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.22, 0.8, 0.24, 1] }}
          >
            <nav aria-label="Site">
              <ol>
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.to}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.04, duration: 0.4 }}
                  >
                    <NavLink to={n.to}>
                      <span className="nav-sheet__label">{n.label}</span>
                      <span className="nav-sheet__gloss">{n.gloss}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ol>
            </nav>
            <div className="nav-sheet__foot">
              <span className={`status ${status.open ? 'status--open' : ''}`}>
                <span className="status__dot" aria-hidden />
                {status.headline}
              </span>
              <span className="small">
                {brixton.street}, {brixton.postcode}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
