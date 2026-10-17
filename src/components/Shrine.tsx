import { motion, useReducedMotion } from 'framer-motion'

/**
 * The pink-tiled shrine at the end of the entrance corridor: Thổ Địa and Thần Tài,
 * with fruit, flowers and incense. Drawn rather than photographed: no published photo of it exists.
 */
export function Shrine({ className }: { className?: string }) {
  const still = useReducedMotion()

  const tiles = (x0: number, y0: number, cols: number, rows: number, size: number, fill: string) => {
    const out = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        out.push(<rect key={`${x}-${y}`} x={x0 + x * size + 1} y={y0 + y * size + 1} width={size - 2} height={size - 2} rx={1.2} fill={fill} />)
      }
    }
    return out
  }

  const smoke = (x: number, delay: number) => (
    <motion.path
      d={`M${x} 312 C ${x - 10} 284, ${x + 12} 262, ${x} 236 S ${x - 12} 190, ${x + 6} 160`}
      fill="none"
      stroke="#fff6ed"
      strokeWidth={1.3}
      strokeLinecap="round"
      initial={{ pathLength: 0.3, opacity: 0.3 }}
      animate={still ? { pathLength: 1, opacity: 0.35 } : { pathLength: [0.2, 1, 1], opacity: [0, 0.55, 0], y: [0, -10, -22] }}
      transition={still ? undefined : { duration: 6.5, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )

  return (
    <svg className={className} viewBox="0 0 400 640" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="shrine-light" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#ffe9dc" />
          <stop offset="0.6" stopColor="#f2c6b6" />
          <stop offset="1" stopColor="#c98a78" />
        </radialGradient>
        <radialGradient id="niche-light" cx="50%" cy="35%" r="75%">
          <stop offset="0" stopColor="#fff4e6" />
          <stop offset="1" stopColor="#e7a996" />
        </radialGradient>
        <linearGradient id="figure" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f6dfb0" />
          <stop offset="1" stopColor="#c99a52" />
        </linearGradient>
      </defs>

      {/* pink tile wall */}
      <rect width="400" height="640" fill="url(#shrine-light)" />
      <g opacity={0.5}>{tiles(0, 0, 10, 16, 40, '#f8d6c8')}</g>

      {/* the niche, tiled and lit from within */}
      <rect x="110" y="196" width="180" height="228" fill="#d99583" />
      <rect x="118" y="204" width="164" height="220" fill="url(#niche-light)" />
      <g opacity={0.4}>{tiles(118, 204, 8, 11, 20.5, '#fbe3d6')}</g>
      <path d="M104 196 h192 v-10 h-192 z" fill="#c97b70" />

      {/* Thần Tài and Thổ Địa, two small seated figures */}
      <g transform="translate(166 0)">
        <path d="M-22 412 C -24 380, -16 360, 0 358 C 16 360, 24 380, 22 412 Z" fill="url(#figure)" />
        <circle cy="346" r="12" fill="#f3d9a6" />
        <path d="M-15 340 h30 l-4 -9 h-22 z" fill="#b8742a" />
      </g>
      <g transform="translate(234 0)">
        <path d="M-20 412 C -22 382, -15 364, 0 362 C 15 364, 22 382, 20 412 Z" fill="url(#figure)" />
        <circle cy="350" r="11" fill="#f3d9a6" />
        <path d="M-8 356 q 8 14 16 0" fill="#fff6ed" />
        <line x1="18" y1="368" x2="22" y2="412" stroke="#8a5a20" strokeWidth={2} />
      </g>

      {/* ledge */}
      <rect x="96" y="424" width="208" height="16" fill="#c97b70" />
      <rect x="104" y="440" width="192" height="200" fill="#d99583" />
      <g opacity={0.35}>{tiles(104, 440, 9, 10, 21.3, '#f2bfae')}</g>

      {/* offerings: fruit, incense, flowers */}
      <ellipse cx="140" cy="420" rx="26" ry="5" fill="#fff6ed" />
      <circle cx="131" cy="409" r="10" fill="#e2862d" />
      <circle cx="149" cy="410" r="9.5" fill="#d9772a" />
      <circle cx="140" cy="397" r="9.5" fill="#e9a23a" />
      <circle cx="142" cy="388" r="2.4" fill="#5f7a3a" />

      <path d="M186 422 h28 l-4 -18 h-20 z" fill="#c2850c" />
      <ellipse cx="200" cy="404" rx="10.5" ry="3" fill="#8a5a10" />
      {[-5, 0, 5].map((dx) => (
        <line key={dx} x1={200 + dx} y1={404} x2={200 + dx * 1.8} y2={314} stroke="#7a2e18" strokeWidth={1.4} />
      ))}
      {[-9, 0, 9].map((dx) => (
        <circle key={dx} cx={200 + dx} cy={314} r={1.7} fill="#ff9a5a" />
      ))}
      {smoke(191, 0)}
      {smoke(200, 2.2)}
      {smoke(209, 4.4)}

      <path d="M250 422 h20 l-3 -26 h-14 z" fill="#fff6ed" />
      <path d="M254 398 c -5 -22 -12 -34 -18 -44 M260 398 c 0 -24 3 -38 6 -52 M265 398 c 6 -18 13 -28 20 -36" stroke="#5f7a3a" strokeWidth={1.4} fill="none" />
      <circle cx="236" cy="352" r="6.5" fill="#f4d23c" />
      <circle cx="266" cy="344" r="7.5" fill="#f6e07a" />
      <circle cx="285" cy="360" r="6" fill="#f4d23c" />
    </svg>
  )
}
