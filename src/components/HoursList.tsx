import type { WeekHours } from '../data/restaurant'
import { dayName, formatDay } from '../lib/hours'
import { useLondonNow } from '../lib/useNow'

const ORDER = [1, 2, 3, 4, 5, 6, 0] // Monday first, as on their site

export function HoursList({ hours }: { hours: WeekHours }) {
  const now = useLondonNow()
  return (
    <dl className="hours-list">
      {ORDER.map((d) => (
        <div key={d} className={d === now.day ? 'is-today' : undefined}>
          <dt>{dayName(d)}</dt>
          <dd>{formatDay(hours[d])}</dd>
        </div>
      ))}
    </dl>
  )
}
