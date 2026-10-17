// One-off: build public/og.jpg (1200×630) and the favicons from the restaurant's own artwork.
// Usage: node scripts/og-image.mjs <path to the original dining-room photo, 2PG6vsSbhGAbvzWcwMdkClI3UM.jpg>
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'

const photo = process.argv[2]
if (!photo) {
  console.error('Pass the dining-room photo.')
  process.exit(1)
}

const marks = await readFile('src/components/marks.tsx', 'utf8')
const paths = (name) => JSON.parse(marks.match(new RegExp(`const ${name} = (\\[.*?\\])\\n`, 's'))[1].replace(/'/g, '"'))
const box = (name) => marks.match(new RegExp(`function ${name}[\\s\\S]*?viewBox="([^"]+)"`))[1]

const svg = (viewBox, d, fill, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${extra}${d.map((p) => `<path d="${p}" fill="${fill}" fill-rule="evenodd"/>`).join('')}</svg>`

// ---------- og.jpg ----------
const W = 1200
const H = 630
const base = await sharp(photo, { limitInputPixels: false })
  .rotate()
  .resize({ width: W, height: H, fit: 'cover', position: 'centre' })
  .toBuffer()

const shade = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <radialGradient id="g" cx="50%" cy="52%" r="62%">
        <stop offset="0" stop-color="#150b06" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#150b06" stop-opacity="0.15"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`,
)

const [, , vw, vh] = box('Wordmark').split(' ').map(Number)
const markW = 860
const markH = Math.round((markW * vh) / vw)
const wordmark = await sharp(Buffer.from(svg(`0 0 ${vw} ${vh}`, paths('WORDMARK'), '#fdfcdd'))).resize({ width: markW }).png().toBuffer()
const markShadow = await sharp(Buffer.from(svg(`0 0 ${vw} ${vh}`, paths('WORDMARK'), '#150b06'))).resize({ width: markW }).blur(10).png().toBuffer()

const caption = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="80">
    <text x="50%" y="48" text-anchor="middle" font-family="Crimson Pro, Georgia, serif" font-weight="500" font-size="34" fill="#fdfcdd" letter-spacing="1">326 Coldharbour Lane · Brixton</text>
  </svg>`,
)

const top = Math.round((H - markH) / 2) - 20
await sharp(base)
  .composite([
    { input: shade },
    { input: markShadow, top: top + 4, left: Math.round((W - markW) / 2), blend: 'multiply' },
    { input: wordmark, top, left: Math.round((W - markW) / 2) },
    { input: caption, top: top + markH + 18, left: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og.jpg')
console.log('public/og.jpg', (await sharp('public/og.jpg').metadata()).width, 'x', (await sharp('public/og.jpg').metadata()).height)

// ---------- favicons: the B́B from the badge, cream on the badge's olive ----------
const [, , bw, bh] = box('Badge').split(' ').map(Number)
const shieldTop = bh * 0.105
const shieldH = bh * 0.77
const icon = (size, radius) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" rx="${radius}" fill="#363722"/>
      <svg x="${size * 0.14}" y="${size * 0.1}" width="${size * 0.72}" height="${size * 0.8}" viewBox="0 ${shieldTop} ${bw} ${shieldH}">
        <clipPath id="shield"><rect x="0" y="${shieldTop}" width="${bw}" height="${shieldH}"/></clipPath>
        <g clip-path="url(#shield)">${paths('BADGE').map((p) => `<path d="${p}" fill="#fdfcdd" fill-rule="evenodd"/>`).join('')}</g>
      </svg>
    </svg>`,
  )

await writeFile('public/favicon.svg', icon(64, 12))
await sharp(icon(180, 0)).png().toFile('public/apple-touch-icon.png')
await sharp(icon(64, 12)).resize(32).png().toFile('public/favicon-32.png')
console.log('favicons written')
