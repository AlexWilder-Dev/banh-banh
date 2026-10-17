import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { brixton, metDishes } from '../data/restaurant'
import { price } from '../lib/format'
import { Leaf, metArt, MetDefs } from './MetArt'
import './met.css'

const C = 300 // centre of the 600×600 plan
const MAX = brixton.maxTableSize

/** Where each platter sits on the tray, for 1–4 platters */
const LAYOUTS: [number, number, number][][] = [
  [],
  [[0, 0, -8]],
  [
    [-68, -12, -20],
    [68, 14, 160],
  ],
  [
    [0, -72, -10],
    [-70, 44, 120],
    [70, 44, 240],
  ],
  [
    [-62, -62, -30],
    [62, -62, 40],
    [-62, 62, 140],
    [62, 62, 210],
  ],
]

export function MetTable() {
  const still = useReducedMotion()
  const [party, setParty] = useState(4)
  const [chosen, setChosen] = useState<string[]>(['banh-man-2-mien', 'nem-lui-boc-sa'])
  const overflow = party > MAX
  const seats = Math.min(party, MAX)
  const people = Math.max(2, Math.min(party, MAX))
  const selected = metDishes.filter((d) => chosen.includes(d.id))
  const total = selected.reduce((sum, d) => sum + d.price * people, 0)
  const layout = LAYOUTS[selected.length]
  const scale = selected.length >= 3 ? 0.8 : selected.length === 2 ? 1 : 1.2

  const toggle = (id: string) => setChosen((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))
  const spring = still ? { duration: 0 } : { type: 'spring' as const, stiffness: 160, damping: 20 }

  return (
    <div className="met">
      <div className="met__plan">
        <svg viewBox="0 0 600 600" role="img" aria-label={`A table for ${overflow ? `more than ${MAX}` : party}, seen from above, with ${selected.map((d) => d.vi).join(' and ') || 'an empty mẹt'}`}>
          <MetDefs />
          {/* round table */}
          <circle cx={C} cy={C} r={290} fill="url(#table-grain)" />
          <circle cx={C} cy={C} r={290} fill="none" stroke="#2c170b" strokeWidth={6} />

          {/* place settings: a blue-and-white bowl and a dish of nước chấm each */}
          <AnimatePresence initial={false}>
            {Array.from({ length: seats }, (_, i) => {
              const a = -Math.PI / 2 + (i / seats) * Math.PI * 2
              const x = C + Math.cos(a) * 238
              const y = C + Math.sin(a) * 238
              const sx = C + Math.cos(a + 0.2) * 196
              const sy = C + Math.sin(a + 0.2) * 196
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={spring}
                >
                  <motion.g animate={{ x, y }} initial={false} transition={spring}>
                    <circle r={27} fill="#fbf8f1" />
                    <circle r={27} fill="none" stroke="#2f4f8a" strokeWidth={2} />
                    <circle r={20} fill="none" stroke="#2f4f8a" strokeWidth={0.8} strokeDasharray="3 4" />
                    <circle r={9} fill="none" stroke="#2f4f8a" strokeWidth={1} />
                  </motion.g>
                  <motion.g animate={{ x: sx, y: sy }} initial={false} transition={spring}>
                    <circle r={9} fill="#fbf8f1" stroke="#2f4f8a" strokeWidth={1} />
                    <circle r={6} fill="#d9a35a" />
                  </motion.g>
                </motion.g>
              )
            })}
          </AnimatePresence>
          {overflow && (
            <text x={C} y={C + 282} textAnchor="middle" className="met__more">
              +
            </text>
          )}

          {/* the mẹt: a woven bamboo tray */}
          <g transform={`translate(${C} ${C})`}>
            <circle r={158} fill="#a77a3e" />
            <circle r={150} fill="url(#met-weave)" />
            <circle r={150} fill="none" stroke="#8d6230" strokeWidth={3} />
            <circle r={156} fill="none" stroke="#c9a25e" strokeWidth={2} strokeDasharray="2 5" />
            <AnimatePresence>
              {selected.map((d, i) => {
                const [x, y, rot] = layout[i]
                const Art = metArt[d.id]
                return (
                  <motion.g
                    key={d.id}
                    initial={{ opacity: 0, scale: 0.5, x, y, rotate: rot - 30 }}
                    animate={{ opacity: 1, scale, x, y, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={spring}
                  >
                    <g transform={`rotate(${rot})`}>
                      <Leaf />
                    </g>
                    <Art />
                  </motion.g>
                )
              })}
            </AnimatePresence>
            {selected.length === 0 && (
              <text textAnchor="middle" y={6} className="met__empty">
                Choose a mẹt
              </text>
            )}
          </g>
        </svg>
      </div>

      <div className="met__controls">
        <fieldset className="met__party">
          <legend className="eyebrow">How many of you?</legend>
          <div className="stepper">
            <button type="button" onClick={() => setParty((p) => Math.max(1, p - 1))} disabled={party <= 1} aria-label="One fewer">
              −
            </button>
            <output aria-live="polite">
              <span className="stepper__n">{overflow ? `${MAX}+` : party}</span>
              <span className="stepper__unit">{party === 1 ? 'person' : 'people'}</span>
            </output>
            <button type="button" onClick={() => setParty((p) => Math.min(MAX + 1, p + 1))} disabled={overflow} aria-label="One more">
              +
            </button>
          </div>
        </fieldset>

        <fieldset className="met__choices">
          <legend className="eyebrow">Which mẹt?</legend>
          <ul>
            {metDishes.map((d) => {
              const on = chosen.includes(d.id)
              return (
                <li key={d.id}>
                  <button type="button" className={`met-chip ${on ? 'met-chip--on' : ''}`} aria-pressed={on} onClick={() => toggle(d.id)}>
                    <span className="met-chip__name" lang="vi">
                      {d.vi}
                    </span>
                    <span className="met-chip__price">{d.price}pp</span>
                    <span className="met-chip__desc">
                      {d.en.split('. ')[0].replace(/\.$/, '')}.{d.limited && ' Limited availability.'}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </fieldset>

        <div className="met__sum" aria-live="polite">
          {party === 1 && <p className="small">Mẹt are priced per person, for two or more.</p>}
          {selected.length > 0 && !overflow && (
            <p>
              {selected.length} mẹt for {people}: <strong>{price(total)}</strong>
              <span className="small"> · priced per person, min 2</span>
            </p>
          )}
          {overflow ? (
            <>
              <p>Over {MAX} of you? The whole room, or part of it, can be yours.</p>
              <Link to={`/groups?size=${MAX + 1}`} className="btn">
                Group enquiry
              </Link>
            </>
          ) : (
            <Link to={`/book?party=${party}`} className="btn">
              Book a table for {party}
            </Link>
          )}
          <Link to="/menu" className="link-arrow met__menu-link">
            Add cơm nhà and sides from the menu
          </Link>
        </div>
      </div>
    </div>
  )
}
