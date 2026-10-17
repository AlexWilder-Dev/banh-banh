import type { WeekHours } from '../data/restaurant'
import { venueStatus } from '../lib/hours'
import { useLondonNow } from '../lib/useNow'

export function StatusLine({ venue, tone = 'light' }: { venue: WeekHours; tone?: 'light' | 'dark' }) {
  const now = useLondonNow()
  const status = venueStatus(venue, now)
  const later = !status.open && status.headline.startsWith('Open')
  return (
    <p className={`status status--${tone} ${status.open ? 'status--open' : later ? 'status--later' : ''}`} aria-live="polite">
      <span className="status__dot" aria-hidden />
      <span>
        {status.headline}
        {status.detail && <span className="status__detail"> · {status.detail}</span>}
      </span>
    </p>
  )
}
