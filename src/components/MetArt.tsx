// Plan drawings of each mẹt, seen from above. Local coordinates, centred on 0,0, about 130 across.
import type { ReactElement } from 'react'

const BOWL_RIM = '#2f4f8a'

function Saucer({ x, y, r = 11, fill }: { x: number; y: number; r?: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#fbf8f1" stroke={BOWL_RIM} strokeWidth={1.4} />
      <circle r={r * 0.68} fill={fill} />
    </g>
  )
}

function Vermicelli({ x, y, r = 22 }: { x: number; y: number; r?: number }) {
  const arcs = []
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2
    const rr = r * (0.45 + ((i * 37) % 10) / 20)
    arcs.push(
      <path
        key={i}
        d={`M ${Math.cos(a) * rr} ${Math.sin(a) * rr} q ${Math.cos(a + 1.6) * r * 0.9} ${Math.sin(a + 1.6) * r * 0.9} ${Math.cos(a + 2.8) * rr} ${Math.sin(a + 2.8) * rr}`}
        fill="none"
        stroke="#fbf6ea"
        strokeWidth={1.3}
        strokeLinecap="round"
      />,
    )
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#efe7d6" />
      {arcs}
    </g>
  )
}

function Dill({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`} stroke="#5d8a34" strokeWidth={1.1} strokeLinecap="round" fill="none">
      <path d="M0 0 L0 -24" />
      {[-20, -14, -8, -2].map((yy) => (
        <g key={yy}>
          <path d={`M0 ${yy} l -7 -6`} />
          <path d={`M0 ${yy} l 7 -6`} />
        </g>
      ))}
    </g>
  )
}

function Star({ x, y, r = 11, rot = 0 }: { x: number; y: number; r?: number; rot?: number }) {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const rr = i % 2 === 0 ? r : r * 0.5
    pts.push(`${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`)
  }
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <polygon points={pts.join(' ')} fill="#e2cf45" stroke="#b9a32a" strokeWidth={0.8} strokeLinejoin="round" />
      <circle r={r * 0.18} fill="#f3e9a6" />
    </g>
  )
}

/** Bánh Mặn 2 Miền: bánh bèo in little saucers, golden bánh rán */
function BanhMan() {
  const saucers = [
    [-40, -26],
    [-14, -40],
    [14, -40],
    [40, -26],
    [-30, 2],
    [-4, -12],
  ]
  return (
    <g>
      {saucers.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r={12} fill="#fbf8f1" stroke={BOWL_RIM} strokeWidth={1.3} />
          <circle r={8.5} fill="#f1e5c9" />
          <circle cx={-2} cy={-1} r={2.4} fill="#e0763a" />
          <circle cx={2.5} cy={1.5} r={1.8} fill="#e98a4a" />
          <circle cx={1} cy={-3} r={1.1} fill="#6f9a3e" />
        </g>
      ))}
      {[
        [10, 22],
        [34, 14],
        [26, 38],
        [2, 44],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r={12.5} fill="url(#met-golden)" />
          <circle cx={-3} cy={-4} r={1} fill="#fff6e0" />
          <circle cx={3} cy={-2} r={1} fill="#fff6e0" />
          <circle cx={0} cy={3} r={1} fill="#fff6e0" />
        </g>
      ))}
      <Saucer x={-34} y={34} fill="#d9a35a" />
    </g>
  )
}

/** Chả Cá Lã Vọng: turmeric monkfish, dill, vermicelli, peanuts, shrimp dip */
function ChaCa() {
  return (
    <g>
      <Vermicelli x={-28} y={-26} r={24} />
      {[
        [8, -8, 10],
        [32, -18, -15],
        [18, 14, 25],
        [-6, 20, -5],
        [40, 8, 40],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <rect x={-13} y={-8} width={26} height={16} rx={7} fill="#e2a019" />
          <path d="M-7 -6 l -3 12 M0 -7 l -3 14 M7 -6 l -3 12" stroke="#a5650c" strokeWidth={1.2} />
        </g>
      ))}
      <Dill x={-6} y={4} rot={-30} />
      <Dill x={30} y={34} rot={20} />
      <Dill x={46} y={-14} rot={60} />
      {[
        [-36, 16],
        [-30, 22],
        [-40, 26],
        [-26, 30],
        [-34, 34],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={3.4} ry={2.4} fill="#c99558" transform={`rotate(${i * 40} ${x} ${y})`} />
      ))}
      <Saucer x={-6} y={-48} fill="#8e6b7c" />
    </g>
  )
}

/** Nem Lụi Bọc Sả: pork on lemongrass sticks, starfruit, plantain, peanut dip */
function NemLui() {
  return (
    <g>
      {[-30, -14, 2, 18].map((y, i) => (
        <g key={i} transform={`translate(${-6 + i * 3} ${y}) rotate(-12)`}>
          <rect x={-48} y={-2} width={96} height={4} rx={2} fill="#d8d18a" />
          <rect x={-16} y={-7.5} width={46} height={15} rx={7.5} fill="#8a4a25" />
          <path d="M-8 -6 l 0 12 M4 -6 l 0 12 M16 -6 l 0 12" stroke="#5c2c13" strokeWidth={1.4} />
        </g>
      ))}
      <Star x={-34} y={36} rot={8} />
      <Star x={-12} y={42} r={10} rot={30} />
      <Star x={10} y={44} r={11} rot={-12} />
      {[
        [36, 30, 30],
        [44, 12, -20],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={13} ry={7} fill="#d8922c" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <Saucer x={38} y={-38} r={13} fill="#c47b39" />
    </g>
  )
}

/** Bò Nướng Lá Lốt: beef rolled in betel leaf on skewers, vermicelli, lettuce, nước chấm */
function BoLaLot() {
  return (
    <g>
      <path d="M-50 -30 c 10 -20 34 -24 44 -10 c 8 12 -6 28 -22 30 c -14 2 -28 -6 -22 -20 z" fill="#9cc46a" />
      <path d="M-46 -28 c 12 2 22 6 30 14" stroke="#7aa34c" strokeWidth={1} fill="none" />
      <Vermicelli x={30} y={-26} r={22} />
      {[0, 1].map((row) => (
        <g key={row} transform={`translate(${-4 + row * 8} ${10 + row * 24}) rotate(${row ? 8 : -6})`}>
          <rect x={-52} y={-1.2} width={104} height={2.4} fill="#c8a46a" />
          {[-30, -6, 18].map((x) => (
            <g key={x} transform={`translate(${x} 0)`}>
              <rect x={-11} y={-7} width={22} height={14} rx={7} fill="#3f6b2f" />
              <path d="M-8 0 h16" stroke="#6f9b4f" strokeWidth={1} />
            </g>
          ))}
        </g>
      ))}
      <Saucer x={44} y={20} fill="#d9a35a" />
    </g>
  )
}

export const metArt: Record<string, () => ReactElement> = {
  'banh-man-2-mien': BanhMan,
  'cha-ca-la-vong': ChaCa,
  'nem-lui-boc-sa': NemLui,
  'bo-nuong-la-lot': BoLaLot,
}

/** A banana-leaf piece for each platter to sit on */
export function Leaf({ rot = 0 }: { rot?: number }) {
  return (
    <g transform={`rotate(${rot})`}>
      <path d="M-74 0 C -60 -50, 50 -62, 78 -6 C 60 52, -46 60, -74 0 Z" fill="#4f7a3a" />
      <path d="M-74 0 C -20 -4, 30 -6, 78 -6" stroke="#6e9a52" strokeWidth={1.4} fill="none" />
      {[-48, -24, 0, 24, 48].map((x) => (
        <g key={x} stroke="#5e8c45" strokeWidth={0.8}>
          <path d={`M${x} -3 q 6 -22 12 -40`} fill="none" />
          <path d={`M${x} -3 q 6 22 12 40`} fill="none" />
        </g>
      ))}
    </g>
  )
}

export function MetDefs() {
  return (
    <defs>
      <radialGradient id="met-golden" cx="40%" cy="35%" r="70%">
        <stop offset="0" stopColor="#f2c063" />
        <stop offset="1" stopColor="#b9701a" />
      </radialGradient>
      <pattern id="met-weave" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="12" height="12" fill="#cfa766" />
        <rect width="6" height="12" fill="#c39553" />
        <rect y="0" width="12" height="2" fill="#b7894a" opacity="0.5" />
        <rect y="6" width="12" height="1" fill="#e2c38a" opacity="0.6" />
      </pattern>
      <pattern id="table-grain" width="600" height="18" patternUnits="userSpaceOnUse">
        <rect width="600" height="18" fill="#4b2a17" />
        <path d="M0 9 C 150 4, 300 14, 600 8" stroke="#5b3520" strokeWidth="3" fill="none" />
        <path d="M0 15 C 200 12, 380 18, 600 14" stroke="#40230f" strokeWidth="1.5" fill="none" />
      </pattern>
    </defs>
  )
}
