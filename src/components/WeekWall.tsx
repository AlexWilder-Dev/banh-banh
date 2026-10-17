import type { WeekHours } from '../data/restaurant'
import { dayName, formatDay, toMinutes } from '../lib/hours'
import { useLondonNow } from '../lib/useNow'
import './weekwall.css'

const ORDER = [1, 2, 3, 4, 5, 6, 0] // Monday first, as on their site

/**
 * The week as a glass-block wall: one column per day, one block per hour,
 * lit where the kitchen is open.
 */
export function WeekWall({ hours, from = 11, to = 22 }: { hours: WeekHours; from?: number; to?: number }) {
  const now = useLondonNow()
  const rows = Array.from({ length: to - from }, (_, i) => from + i)

  const lit = (day: number, hour: number) => {
    const start = hour * 60
    const end = start + 60
    let covered = 0
    for (const [o, c] of hours[day]) {
      covered += Math.max(0, Math.min(end, toMinutes(c)) - Math.max(start, toMinutes(o)))
    }
    return covered / 60
  }

  return (
    <div className="weekwall">
      <div className="weekwall__grid" aria-hidden>
        <div className="weekwall__hours">
          {rows.map((h) => (
            <span key={h}>{h === 12 ? '12pm' : h > 12 ? `${h - 12}` : `${h}am`}</span>
          ))}
        </div>
        {ORDER.map((d) => (
          <div key={d} className={`weekwall__col ${d === now.day ? 'weekwall__col--today' : ''}`}>
            {rows.map((h) => {
              const amount = lit(d, h)
              const isNow = d === now.day && now.minutes >= h * 60 && now.minutes < h * 60 + 60 && amount > 0
              return (
                <span
                  key={h}
                  className={`weekwall__block ${amount > 0 ? 'weekwall__block--lit' : ''} ${amount > 0 && amount < 1 ? 'weekwall__block--half' : ''} ${isNow ? 'weekwall__block--now' : ''}`}
                />
              )
            })}
            <span className="weekwall__day">{dayName(d).slice(0, 3)}</span>
          </div>
        ))}
      </div>
      <dl className="weekwall__list">
        {ORDER.map((d) => (
          <div key={d} className={d === now.day ? 'is-today' : undefined}>
            <dt>{dayName(d)}</dt>
            <dd>{formatDay(hours[d])}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
