import { brixton } from '../data/restaurant'
import { londonNow, toMinutes, type LondonNow } from './hours'

export interface BookDay {
  iso: string // YYYY-MM-DD
  day: number // 0 = Sunday
  label: string // "Sat"
  date: number
  month: string
  closed: boolean
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** The next N days in London, starting today. */
export function bookingDays(now: LondonNow = londonNow(), count = brixton.booking.daysAhead): BookDay[] {
  const [y, m, d] = now.date.split('-').map(Number)
  const out: BookDay[] = []
  for (let i = 0; i < count; i++) {
    const dt = new Date(Date.UTC(y, m - 1, d + i, 12))
    const day = dt.getUTCDay()
    out.push({
      iso: dt.toISOString().slice(0, 10),
      day,
      label: DAYS[day],
      date: dt.getUTCDate(),
      month: MONTHS[dt.getUTCMonth()],
      closed: brixton.hours[day].length === 0,
    })
  }
  return out
}

export interface SlotGroup {
  name: 'Lunch' | 'Dinner'
  slots: string[]
}

const pad = (n: number) => String(n).padStart(2, '0')
const fromMinutes = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`

/** Bookable times for a day: every 15 minutes, the last an hour before the kitchen closes. */
export function slotsFor(day: BookDay, now: LondonNow = londonNow()): SlotGroup[] {
  const { slotMinutes, lastBookingBeforeClose } = brixton.booking
  const isToday = day.iso === now.date
  return brixton.hours[day.day]
    .map(([open, close]): SlotGroup => {
      const slots: string[] = []
      for (let t = toMinutes(open); t <= toMinutes(close) - lastBookingBeforeClose; t += slotMinutes) {
        if (!isToday || t > now.minutes) slots.push(fromMinutes(t))
      }
      return { name: toMinutes(open) < 17 * 60 ? 'Lunch' : 'Dinner', slots }
    })
    .filter((g) => g.slots.length > 0)
}

export function longDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d, 12))
  return new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(dt)
}

/** A calendar file for the confirmed table, built in the browser. */
export function icsFor(iso: string, time: string, party: number, name: string) {
  const [h, m] = time.split(':').map(Number)
  const minutes = party >= 4 ? 120 : 90
  const start = `${iso.replace(/-/g, '')}T${pad(h)}${pad(m)}00`
  const endTotal = h * 60 + m + minutes
  const end = `${iso.replace(/-/g, '')}T${pad(Math.floor(endTotal / 60))}${pad(endTotal % 60)}00`
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Banh Banh//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${iso}-${time}-${party}@banhbanh.com`,
    `DTSTART;TZID=Europe/London:${start}`,
    `DTEND;TZID=Europe/London:${end}`,
    `SUMMARY:Bánh Bánh, table for ${party}`,
    `LOCATION:${brixton.street}\\, London ${brixton.postcode}`,
    `DESCRIPTION:Booked under ${name}. ${brixton.phone}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return URL.createObjectURL(new Blob([body], { type: 'text/calendar' }))
}
