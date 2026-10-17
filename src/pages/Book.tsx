import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHead } from '../components/PageHead'
import { Field, TextField } from '../components/Form'
import { Fan } from '../components/Fan'
import { brixton, voice } from '../data/restaurant'
import { bookingDays, icsFor, longDate, slotsFor, type BookDay } from '../lib/booking'
import { formatTime } from '../lib/hours'
import { mapsLinks } from '../lib/format'
import { useLondonNow } from '../lib/useNow'
import '../components/form.css'
import './book.css'

const MAX = brixton.maxTableSize

export default function Book() {
  const [params] = useSearchParams()
  const now = useLondonNow()
  const initialParty = Number(params.get('party'))
  const [party, setParty] = useState<number | null>(initialParty >= 1 ? Math.min(initialParty, MAX + 1) : null)
  const [day, setDay] = useState<BookDay | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [stage, setStage] = useState<'form' | 'sending' | 'done'>('form')
  const [guest, setGuest] = useState({ name: '', email: '' })

  const days = useMemo(() => bookingDays(now), [now.date])
  const groups = day ? slotsFor(day, now) : []
  const whenRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  const go = (el: HTMLElement | null) => window.setTimeout(() => el?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)

  useEffect(() => {
    if (time && groups.every((g) => !g.slots.includes(time))) setTime(null)
  }, [day])

  const overflow = party !== null && party > MAX

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setGuest({ name: String(data.get('name') ?? ''), email: String(data.get('email') ?? '') })
    setStage('sending')
    window.setTimeout(() => {
      setStage('done')
      window.scrollTo({ top: 0 })
    }, 1300)
  }

  if (stage === 'done' && party && day && time) {
    return <Confirmed party={party} day={day} time={time} name={guest.name} email={guest.email} />
  }

  return (
    <div className="book-page">
      <PageHead eyebrow="Brixton" gloss={`${brixton.street}, ${brixton.postcode}`} title="Book a table">
        <p>
          Tables for up to {MAX}. Weekend lunch on Saturday and Sunday; closed on Tuesdays. For more than {MAX}, <Link to="/groups">send a group enquiry</Link>.
        </p>
      </PageHead>

      <form className="wrap book" onSubmit={submit} data-header="light">
        {/* 1. Party size */}
        <section className="book__step" aria-labelledby="step-party">
          <h2 id="step-party" className="book__q">
            <span className="book__n">1</span> How many of you?
          </h2>
          <div className="book__party" role="radiogroup" aria-labelledby="step-party">
            {Array.from({ length: MAX }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={party === n}
                className={`chip ${party === n ? 'is-on' : ''}`}
                onClick={() => {
                  setParty(n)
                  go(whenRef.current)
                }}
              >
                {n}
              </button>
            ))}
            <button type="button" role="radio" aria-checked={overflow} className={`chip chip--wide ${overflow ? 'is-on' : ''}`} onClick={() => setParty(MAX + 1)}>
              {MAX + 1}+
            </button>
          </div>
          <AnimatePresence>
            {overflow && (
              <motion.div className="book__overflow" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <p>{voice.groupsBig}</p>
                <Link to={`/groups?size=${MAX + 1}`} className="btn">
                  Group &amp; private hire enquiry
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 2. Day */}
        <section className={`book__step ${!party || overflow ? 'is-waiting' : ''}`} aria-labelledby="step-day" ref={whenRef}>
          <h2 id="step-day" className="book__q">
            <span className="book__n">2</span> Which day?
          </h2>
          <div className="book__days" role="radiogroup" aria-labelledby="step-day">
            {days.map((d) => {
              const full = !d.closed && slotsFor(d, now).length === 0
              const disabled = d.closed || full || !party || overflow
              return (
                <button
                  key={d.iso}
                  type="button"
                  role="radio"
                  aria-checked={day?.iso === d.iso}
                  disabled={disabled}
                  className={`day ${day?.iso === d.iso ? 'is-on' : ''} ${d.closed ? 'day--closed' : ''}`}
                  onClick={() => {
                    setDay(d)
                    go(timeRef.current)
                  }}
                  aria-label={`${longDate(d.iso)}${d.closed ? ', closed' : full ? ', no more tables today' : ''}`}
                >
                  <span className="day__name">{d.iso === now.date ? 'Today' : d.label}</span>
                  <span className="day__date">{d.date}</span>
                  <span className="day__month">{d.closed ? 'Closed' : d.month}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* 3. Time */}
        <section className={`book__step ${!day ? 'is-waiting' : ''}`} aria-labelledby="step-time" ref={timeRef}>
          <h2 id="step-time" className="book__q">
            <span className="book__n">3</span> What time?
          </h2>
          {!day && <p className="book__wait">Pick a day to see times.</p>}
          {groups.map((g) => (
            <div key={g.name} className="book__slots-group">
              <h3 className="eyebrow">{g.name}</h3>
              <div className="book__slots" role="radiogroup" aria-label={g.name}>
                {g.slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={time === s}
                    className={`chip chip--time ${time === s ? 'is-on' : ''}`}
                    onClick={() => {
                      setTime(s)
                      go(detailsRef.current)
                    }}
                  >
                    {formatTime(s)}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {party && day && (
            <p className="book__policy small">
              Tables of {party >= 4 ? '4 or more have 120 minutes' : 'up to 3 have 90 minutes'}. If you’re running late, let us know: we hold tables for 15 minutes.
            </p>
          )}
        </section>

        {/* 4. Details */}
        <section className={`book__step ${!time ? 'is-waiting' : ''}`} aria-labelledby="step-details" ref={detailsRef}>
          <h2 id="step-details" className="book__q">
            <span className="book__n">4</span> Your details
          </h2>
          <div className="mock-form__fields">
            <Field label="Name" name="name" autoComplete="name" required disabled={!time} />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" required disabled={!time} />
            <Field label="Email" name="email" type="email" autoComplete="email" required disabled={!time} wide />
            <TextField label="Anything we should know?" name="notes" hint={voice.allergies} disabled={!time} />
          </div>
          <div className="book__submit">
            <button type="submit" className="btn" disabled={!time || stage === 'sending'}>
              {stage === 'sending'
                ? 'Booking'
                : party && day && time
                  ? `Book · ${party} · ${day.label} ${day.date} ${day.month} · ${formatTime(time)}`
                  : 'Book a table'}
            </button>
            {stage === 'sending' && <Fan size={40} />}
          </div>
        </section>
      </form>
    </div>
  )
}

function Confirmed({ party, day, time, name, email }: { party: number; day: BookDay; time: string; name: string; email: string }) {
  const maps = mapsLinks(`Bánh Bánh, ${brixton.street}, London ${brixton.postcode}`, brixton.lat, brixton.lng)
  const ics = useMemo(() => icsFor(day.iso, time, party, name), [day.iso, time, party, name])
  return (
    <div className="book-done" data-header="dark">
      <div className="wrap book-done__inner">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Table booked</p>
          <h1 className="book-done__title">
            See you on {longDate(day.iso).split(' ')[0]}
            {name && <span>, {name.split(' ')[0]}</span>}
          </h1>
          <dl className="book-done__facts">
            <div>
              <dt>Table for</dt>
              <dd>{party}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{longDate(day.iso)}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{formatTime(time)}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>
                {brixton.street}, {brixton.postcode}
              </dd>
            </div>
          </dl>
          <p>
            {email ? `A confirmation would go to ${email}.` : ''} Running late? Call {brixton.phone}: we hold tables for 15 minutes.
          </p>
          <div className="book-done__ctas">
            <a className="btn btn--cream" href={ics} download="banh-banh-booking.ics">
              Add to calendar
            </a>
            <a className="btn btn--ghost-light" href={maps.google} target="_blank" rel="noreferrer">
              Directions
            </a>
            <Link className="btn btn--ghost-light" to="/menu">
              Read the menu
            </Link>
          </div>
          <p className="small book-done__demo">This is a demo: no table has been booked and nothing was sent.</p>
        </motion.div>
      </div>
    </div>
  )
}
