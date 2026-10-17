import { useEffect, useState } from 'react'
import { londonNow, type LondonNow } from './hours'

/** London time, refreshed every minute so "open now" stays honest. */
export function useLondonNow(): LondonNow {
  const [now, setNow] = useState(() => londonNow())
  useEffect(() => {
    const id = window.setInterval(() => setNow(londonNow()), 60_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}
