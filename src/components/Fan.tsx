import { motion, useReducedMotion } from 'framer-motion'

/** The aquamarine Vietnamese ceiling fan from the front room, seen from below. */
export function Fan({ spinning = true, size = 64 }: { spinning?: boolean; size?: number }) {
  const still = useReducedMotion()
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      aria-hidden
      animate={spinning && !still ? { rotate: 360 } : undefined}
      transition={{ duration: 1.1, ease: 'linear', repeat: Infinity }}
    >
      {[0, 120, 240].map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M-5 -6 C -12 -24, -10 -44, 0 -47 C 10 -44, 12 -24, 5 -6 Z" fill="#5fae9e" stroke="#2f6a60" strokeWidth={1.2} />
      ))}
      <circle r={10} fill="#5fae9e" stroke="#2f6a60" strokeWidth={1.2} />
      <circle r={3.5} fill="#2f6a60" />
    </motion.svg>
  )
}
