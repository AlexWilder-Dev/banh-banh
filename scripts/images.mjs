// One-off: resize the restaurant's original photos into web sizes.
// Usage: node scripts/images.mjs <folder with the original Framer downloads>
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const src = process.argv[2]
if (!src) {
  console.error('Pass the folder holding the original images.')
  process.exit(1)
}

const out = 'src/assets/photos'
const widths = [720, 1280, 1920]

// Original file -> name used in the site.
// Framer ids are the restaurant's own photos; banhbanhbrixton*.jpg are Anton Rodriguez's for We Heart.
const photos = {
  '2PG6vsSbhGAbvzWcwMdkClI3UM.jpg': 'fresco-room',
  'ey6Sa03o7tXZyoR9MMkwqUs0FYg.jpg': 'fresco-banquette',
  'Xq2mi06jQzo0f6Du9Av3SC3OE.jpg': 'still-life',
  'fh5jKk0cLNIZMw85m9NJwbMbE8.jpg': 'sharing-table',
  '5OQGPRTUucws55rZOK1WWcL65o.jpg': 'group-room',
  'REynFMj997lviM03La7eqG5SE.jpg': 'little-counter',
  'YzHPfPfiFcIFkI4dUyQdx1lzYo.jpg': 'folding-screen',
  'banhbanhbrixton5.jpg': 'press-front-room',
  'banhbanhbrixton7.jpg': 'press-long-room',
}

await mkdir(out, { recursive: true })

for (const [file, name] of Object.entries(photos)) {
  const input = sharp(path.join(src, file), { limitInputPixels: false }).rotate()
  const { width: srcWidth = 0 } = await input.metadata()
  for (const w of widths.filter((w, i) => i === 0 || w <= srcWidth)) {
    const base = input.clone().resize({ width: w, withoutEnlargement: true })
    await base.clone().jpeg({ quality: 76, mozjpeg: true, progressive: true }).toFile(`${out}/${name}-${w}.jpg`)
    await base.clone().webp({ quality: 72 }).toFile(`${out}/${name}-${w}.webp`)
  }
  console.log('done', name)
}
