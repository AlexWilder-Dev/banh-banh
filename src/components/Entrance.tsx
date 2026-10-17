import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Wordmark } from './marks'
import { Photo } from './Photo'
import { Shrine } from './Shrine'
import { StatusLine } from './StatusLine'
import { brixton, voice } from '../data/restaurant'
import './entrance.css'

/**
 * The home page opens the way the room does: a dim corridor, the lit shrine at its end,
 * then the dining room revealing itself as you move through.
 */
export function Entrance() {
  const ref = useRef<HTMLElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const { w, h } = useViewport()
  const stops = useMemo(() => doorInsets(w, h), [w, h])

  if (still) return <StaticEntrance />

  return (
    <section ref={ref} className="entrance" data-header="dark" aria-label="Bánh Bánh, 326 Coldharbour Lane">
      <div className="entrance__stage">
        <Corridor progress={scrollYProgress} door={stops[0]} />
        <Door progress={scrollYProgress} stops={stops} />
        <Hero progress={scrollYProgress} />
        <Captions progress={scrollYProgress} />
      </div>
    </section>
  )
}

/* Door opening: [top, right, bottom, left] insets in % across the scroll */
const DOOR_STOPS = [0, 0.32, 0.55, 0.85]

function doorInsets(w: number, h: number): number[][] {
  const wide = w >= 760
  const top = wide ? 13 : 21
  const bottom = wide ? 30 : h < 720 ? 42 : 35
  const doorHeight = ((100 - top - bottom) / 100) * h
  const doorWidth = Math.min(w * 0.26, doorHeight * (wide ? 0.36 : 0.3))
  const side = ((w - doorWidth) / 2 / w) * 100
  const near = wide ? [8, Math.max(18, ((w - h * 0.62) / 2 / w) * 100), 10] : [9, 16, 16]
  return [
    [top, side, bottom, side],
    [near[0], near[1], near[2], near[1]],
    [near[0], near[1], near[2], near[1]],
    [0, 0, 0, 0],
  ]
}

function useViewport() {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useEffect(() => {
    let last = window.innerWidth
    const onResize = () => {
      // ignore mobile toolbar height jitter
      if (window.innerWidth !== last || Math.abs(window.innerHeight - size.h) > 120) {
        last = window.innerWidth
        setSize({ w: window.innerWidth, h: window.innerHeight })
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [size.h])
  return size
}

function lerpInsets(p: number, stops: number[][]) {
  const i = DOOR_STOPS.findIndex((s, idx) => p <= s || idx === DOOR_STOPS.length - 1)
  if (i <= 0) return stops[0]
  const t = Math.min(1, Math.max(0, (p - DOOR_STOPS[i - 1]) / (DOOR_STOPS[i] - DOOR_STOPS[i - 1])))
  const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  return stops[i].map((v, k) => stops[i - 1][k] + (v - stops[i - 1][k]) * e)
}

function Door({ progress, stops }: { progress: MotionValue<number>; stops: number[][] }) {
  const clipPath = useTransform(progress, (p) => {
    const [t, r, b, l] = lerpInsets(p, stops)
    return `inset(${t}% ${r}% ${b}% ${l}%)`
  })
  const shrineOpacity = useTransform(progress, [0.55, 0.7], [1, 0])
  const shrineScale = useTransform(progress, [0, 0.55], [1.15, 1])
  const roomScale = useTransform(progress, [0.55, 1], [1.12, 1])
  const roomDim = useTransform(progress, [0.55, 0.85], [0.55, 0.15])
  return (
    <motion.div className="entrance__door" style={{ clipPath }}>
      <motion.div className="entrance__room" style={{ scale: roomScale }}>
        <Photo
          name="fresco-room"
          alt="The dining room: Tomio Shota's frescoes between walnut panels, over a pale blue banquette"
          eager
          position="38% 50%"
        />
      </motion.div>
      <motion.div className="entrance__dim" style={{ opacity: roomDim }} />
      <motion.div
        className="entrance__shrine"
        style={{
          opacity: shrineOpacity,
          scale: shrineScale,
          top: `${stops[1][0]}%`,
          right: `${stops[1][1]}%`,
          bottom: `${stops[1][2]}%`,
          left: `${stops[1][3]}%`,
        }}
      >
        <Shrine className="entrance__shrine-svg" />
      </motion.div>
    </motion.div>
  )
}

function Corridor({ progress, door }: { progress: MotionValue<number>; door: number[] }) {
  const opacity = useTransform(progress, [0, 0.4], [1, 0])
  const [t, side, b] = door
  const l = side
  const r = 100 - side
  const bt = 100 - b
  return (
    <motion.svg className="entrance__corridor" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity }} aria-hidden>
      {/* walls, floor and ceiling converge on the lit doorway */}
      <path d={`M0 0 L${l} ${t} L${l} ${bt} L0 100 Z`} fill="#1d0f08" />
      <path d={`M100 0 L${r} ${t} L${r} ${bt} L100 100 Z`} fill="#1a0d07" />
      <path d={`M0 100 L${l} ${bt} L${r} ${bt} L100 100 Z`} fill="#26140a" />
      {[0.3, 0.55, 0.78].map((k) => (
        <g key={k} stroke="#3d2415" strokeWidth={1} vectorEffect="non-scaling-stroke">
          <line x1={l * k} y1={t * k} x2={l * k} y2={100 - b * k} />
          <line x1={100 - l * k} y1={t * k} x2={100 - l * k} y2={100 - b * k} />
        </g>
      ))}
    </motion.svg>
  )
}

function Hero({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.16], [1, 0])
  const y = useTransform(progress, [0, 0.16], [0, -30])
  const pointerEvents = useTransform(progress, (p) => (p > 0.12 ? 'none' : 'auto'))
  return (
    <motion.div className="entrance__hero" style={{ opacity, y, pointerEvents }}>
      <h1 className="entrance__mark">
        <Wordmark />
      </h1>
      <div className="entrance__text">
        <p className="entrance__tagline">{voice.tagline}</p>
        <StatusLine venue={brixton.hours} tone="dark" />
        <p className="entrance__address">
          {brixton.street}, Brixton {brixton.postcode}
        </p>
        <div className="entrance__ctas">
          <Link to="/book" className="btn btn--cream">
            Book a table
          </Link>
          <Link to="/menu" className="btn btn--ghost-light">
            Menu
          </Link>
        </div>
      </div>
      <span className="entrance__hint" aria-hidden>
        Step inside
      </span>
    </motion.div>
  )
}

function Captions({ progress }: { progress: MotionValue<number> }) {
  const shrine = useTransform(progress, [0.22, 0.32, 0.5, 0.58], [0, 1, 1, 0])
  const room = useTransform(progress, [0.8, 0.9], [0, 1])
  const roomY = useTransform(progress, [0.8, 0.9], [20, 0])
  return (
    <>
      <motion.div className="entrance__caption entrance__caption--shrine" style={{ opacity: shrine }}>
        <p className="eyebrow">First, the shrine</p>
        <p>
          Pink tile, fruit, flowers and incense for <span lang="vi">Thổ Địa</span> and <span lang="vi">Thần Tài</span>, gods of the land and of wealth.
        </p>
      </motion.div>
      <motion.div className="entrance__caption entrance__caption--room" style={{ opacity: room, y: roomY }}>
        <p className="eyebrow">Then the room opens up</p>
        <p>Curved glass blocks, cool concrete, deep wood and iron-oxide yellow. Frescoes hand-painted by Tomio Shota.</p>
        <Link to="/room" className="link-arrow">
          The room
        </Link>
      </motion.div>
    </>
  )
}

function StaticEntrance() {
  return (
    <section className="entrance entrance--static" data-header="dark" aria-label="Bánh Bánh, 326 Coldharbour Lane">
      <div className="entrance__stage">
        <div className="entrance__door entrance__door--static">
          <div className="entrance__shrine entrance__shrine--static">
            <Shrine className="entrance__shrine-svg" />
          </div>
        </div>
        <div className="entrance__hero">
          <h1 className="entrance__mark">
            <Wordmark />
          </h1>
          <div className="entrance__text">
            <p className="entrance__tagline">{voice.tagline}</p>
            <StatusLine venue={brixton.hours} tone="dark" />
            <p className="entrance__address">
              {brixton.street}, Brixton {brixton.postcode}
            </p>
            <div className="entrance__ctas">
              <Link to="/book" className="btn btn--cream">
                Book a table
              </Link>
              <Link to="/menu" className="btn btn--ghost-light">
                Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
      <figure className="entrance__still-room">
        <Photo name="fresco-room" alt="The dining room: Tomio Shota's frescoes between walnut panels, over a pale blue banquette" />
      </figure>
    </section>
  )
}
