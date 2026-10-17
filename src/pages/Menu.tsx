import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHead } from '../components/PageHead'
import { Photo } from '../components/Photo'
import { PressLine } from '../components/PressLine'
import { Wordmark } from '../components/marks'
import { drinks, markLabels, menu, press, voice, type Dish, type Mark } from '../data/restaurant'
import { menuPrice } from '../lib/format'
import './menu.css'

type Filter = 'vg' | 'gf' | 'nop'

const FILTERS: { id: Filter; label: string; mark: string }[] = [
  { id: 'vg', label: 'Vegan', mark: '[vg]' },
  { id: 'gf', label: 'Gluten free', mark: '[gf]' },
  { id: 'nop', label: 'No peanuts', mark: '[p]' },
]

const has = (d: Dish, m: Mark) => d.marks.includes(m) || !!d.options?.some((o) => o.marks.includes(m))

function matches(d: Dish, active: Filter[]) {
  return active.every((f) => (f === 'nop' ? !d.marks.includes('p') : has(d, f)))
}

function Marks({ marks }: { marks: Mark[] }) {
  if (!marks.length) return null
  return (
    <span className="dish__marks">
      {marks.map((m) => (
        <abbr key={m} title={markLabels[m] || undefined}>
          [{m}]
        </abbr>
      ))}
    </span>
  )
}

function DishRow({ dish, active }: { dish: Dish; active: Filter[] }) {
  return (
    <motion.li
      layout
      className="dish"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dish__head">
        <h3 className="dish__name" lang="vi">
          {dish.vi}
        </h3>
        {dish.limited && <span className="dish__limited">[limited availability]</span>}
        <Marks marks={dish.marks} />
        <span className="dish__price">
          {menuPrice(dish.price)}
          {dish.perPerson && <span className="dish__pp">pp</span>}
        </span>
      </div>
      <p className="dish__desc">{dish.en}</p>
      {dish.options && (
        <p className="dish__options">
          {dish.options.map((o, i) => {
            const lit = active.some((f) => f !== 'nop' && o.marks.includes(f))
            return (
              <span key={o.label} className={lit ? 'is-lit' : undefined}>
                {i > 0 && ' | '}
                {o.label} <Marks marks={o.marks} />
              </span>
            )
          })}
        </p>
      )}
    </motion.li>
  )
}

export default function Menu() {
  const [active, setActive] = useState<Filter[]>([])
  const toggle = (f: Filter) => setActive((a) => (a.includes(f) ? a.filter((x) => x !== f) : [...a, f]))
  const total = useMemo(() => menu.reduce((n, s) => n + s.dishes.length, 0), [])
  const shown = useMemo(() => menu.reduce((n, s) => n + s.dishes.filter((d) => matches(d, active)).length, 0), [active])

  // Two columns, as on the printed menu: Khai Vị and Mẹt, then Cơm Nhà and Ăn Kèm
  const columns = [menu.slice(0, 2), menu.slice(2)]

  return (
    <div className="menu-page">
      <PageHead
        eyebrow="Menu"
        gloss="Bánh Bánh, Brixton"
        title={
          <>
            Made for <span lang="vi">sharing</span>
          </>
        }
        aside={<PressLine line={press.broadsheetMenus} />}
      >
        <p>{voice.comNha}</p>
        <p className="small">
          No phở at dinner, <Link to="/#no-pho">on purpose</Link>. Order a few dishes for the middle of the table and a mẹt between you.
        </p>
      </PageHead>

      <div className="menu-bar" data-header="light">
        <div className="wrap menu-bar__inner">
          <nav className="menu-bar__sections" aria-label="Menu sections">
            {menu.map((s) => (
              <a key={s.id} href={`#${s.id}`} lang="vi" onClick={(e) => {
                e.preventDefault()
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
              }}>
                {s.vi}
              </a>
            ))}
            <a href="#drinks" onClick={(e) => {
              e.preventDefault()
              document.getElementById('drinks')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Drinks
            </a>
          </nav>
          <div className="menu-bar__filters" role="group" aria-label="Filter by dietary mark">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" aria-pressed={active.includes(f.id)} onClick={() => toggle(f.id)} className={`filter ${active.includes(f.id) ? 'is-on' : ''}`}>
                {f.label} <span className="filter__mark">{f.mark}</span>
              </button>
            ))}
            <span className="menu-bar__count" aria-live="polite">
              {active.length ? `${shown} of ${total} dishes` : `${total} dishes`}
            </span>
          </div>
        </div>
      </div>

      <section className="menu-sheet" data-header="light">
        <div className="wrap">
          <Wordmark className="menu-sheet__mark" aria-hidden />
          <div className="menu-sheet__cols">
            {columns.map((col, ci) => (
              <div key={ci} className="menu-sheet__col">
                {col.map((section) => {
                  const dishes = section.dishes.filter((d) => matches(d, active))
                  return (
                    <section key={section.id} id={section.id} className="menu-section">
                      <h2 className="menu-section__head">
                        <span lang="vi">{section.vi}</span>
                        {section.en && <span className="gloss">{section.en}</span>}
                      </h2>
                      {section.intro?.map((line) => (
                        <p key={line} className="menu-section__intro">
                          {line}
                        </p>
                      ))}
                      {section.id === 'com-nha' && (
                        <figure className="menu-section__photo">
                          <Photo name="sharing-table" alt="Cơm nhà dishes shared across a wooden table, with a mẹt and a bottle of Hanoi beer" sizes="(min-width: 900px) 45vw, 100vw" />
                        </figure>
                      )}
                      <ul className="menu-section__list">
                        <AnimatePresence initial={false}>
                          {dishes.map((d) => (
                            <DishRow key={d.id} dish={d} active={active} />
                          ))}
                        </AnimatePresence>
                      </ul>
                      {dishes.length === 0 && <p className="menu-section__none">Nothing here with those marks.</p>}
                      {section.id === 'met' && (
                        <Link to="/#met" className="link-arrow menu-section__plan">
                          Plan a mẹt for your table
                        </Link>
                      )}
                    </section>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="menu-sheet__foot">
            <p>{voice.allergies}</p>
            <p className="menu-sheet__legend">
              [vgo] vegan option available [vg] vegan
              <br />
              [p] peanuts [gf] gluten free
            </p>
          </div>

          <section id="drinks" className="menu-drinks">
            <h2 className="menu-section__head">
              Drinks
              <span className="gloss">From the bar</span>
            </h2>
            <ul>
              {drinks.cocktails.map((c) => (
                <li key={c}>{c}</li>
              ))}
              <li>{drinks.fizz}</li>
              <li>{drinks.wine}</li>
              <li>{drinks.beer}</li>
            </ul>
          </section>

          <div className="menu-cta">
            <Link to="/book" className="btn">
              Book a table
            </Link>
            <Link to="/at-home" className="btn btn--ghost">
              Order at home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
