import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Text settling into place as it scrolls in. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const still = useReducedMotion()
  if (still) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.8, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}
