import type { Session, WeekHours } from '../data/restaurant'

const TZ = 'Europe/London'
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export interface LondonNow {
  day: number // 0 = Sunday
  minutes: number // minutes since midnight
  date: string // YYYY-MM-DD
}

export function londonNow(at: Date = new Date()): LondonNow {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(at)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return {
    day: weekday,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
    date: `${get('year')}-${get('month')}-${get('day')}`,
  }
}

export const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** 18:00 -> "6pm", 21:30 -> "9:30pm", 12:00 -> "12pm" */
export function formatTime(t: string, withSuffix = true): string {
  const [h, m] = t.split(':').map(Number)
  const h12 = h % 12 === 0 ? 12 : h % 12
  const suffix = withSuffix ? (h < 12 ? 'am' : 'pm') : ''
  return `${h12}${m ? `:${String(m).padStart(2, '0')}` : ''}${suffix}`
}

/** ["18:00","21:30"] -> "6–9:30pm"; drops the first suffix when both halves share it */
export function formatSession([open, close]: Session): string {
  const samePeriod = toMinutes(open) >= 720 === toMinutes(close) >= 720
  return `${formatTime(open, !samePeriod)}–${formatTime(close)}`
}

export function formatDay(sessions: Session[]): string {
  return sessions.length ? sessions.map(formatSession).join(' & ') : 'Closed'
}

export const dayName = (d: number) => DAY_NAMES[d]

export interface Status {
  open: boolean
  headline: string
  detail: string
}

function nextOpening(week: WeekHours, from: LondonNow): { dayOffset: number; session: Session } | null {
  for (let offset = 0; offset < 8; offset++) {
    const day = (from.day + offset) % 7
    for (const session of week[day]) {
      if (offset > 0 || toMinutes(session[0]) > from.minutes) return { dayOffset: offset, session }
    }
  }
  return null
}

function whenLabel(offset: number, day: number) {
  if (offset === 0) return 'today'
  if (offset === 1) return 'tomorrow'
  return dayName(day)
}

/** Plain-English status for a venue, evaluated in London time. */
export function venueStatus(week: WeekHours, now: LondonNow = londonNow()): Status {
  const today = week[now.day]
  const current = today.find(([o, c]) => now.minutes >= toMinutes(o) && now.minutes < toMinutes(c))
  if (current) {
    const later = today.find(([o]) => toMinutes(o) > now.minutes)
    return {
      open: true,
      headline: `Open now until ${formatTime(current[1])}`,
      detail: later ? `Then again ${formatSession(later)}` : `Today ${formatDay(today)}`,
    }
  }
  const next = nextOpening(week, now)
  if (!next) return { open: false, headline: 'Closed', detail: '' }
  const nextDay = (now.day + next.dayOffset) % 7
  if (next.dayOffset === 0) {
    const evening = toMinutes(next.session[0]) >= 17 * 60
    return {
      open: false,
      headline: evening ? `Open tonight ${formatSession(next.session)}` : `Open today from ${formatTime(next.session[0])}`,
      detail: `Today ${formatDay(today)}`,
    }
  }
  const closedToday = today.length === 0
  return {
    open: false,
    headline: closedToday ? `Closed today, ${dayName(now.day)}` : 'Closed for today',
    detail: `Opens ${whenLabel(next.dayOffset, nextDay)} at ${formatTime(next.session[0])}`,
  }
}
