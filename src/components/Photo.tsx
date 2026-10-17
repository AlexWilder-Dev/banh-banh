import type { CSSProperties } from 'react'

// Web sizes made by scripts/images.mjs from the restaurant's own photography
const files = import.meta.glob('../assets/photos/*.{jpg,webp}', { eager: true, query: '?url', import: 'default' }) as Record<
  string,
  string
>

const WIDTHS = [720, 1280, 1920]

export const photoSizes = {
  'fresco-room': [8000, 6000],
  'fresco-banquette': [6000, 7048],
  'still-life': [7695, 5379],
  'sharing-table': [6667, 5152],
  'group-room': [6000, 8000],
  'little-counter': [6066, 4044],
  'folding-screen': [5504, 8256],
  'press-front-room': [753, 1004],
  'press-long-room': [1400, 1050],
} as const

export type PhotoName = keyof typeof photoSizes

function srcset(name: string, ext: 'jpg' | 'webp') {
  return WIDTHS.map((w) => files[`../assets/photos/${name}-${w}.${ext}`] && `${files[`../assets/photos/${name}-${w}.${ext}`]} ${w}w`)
    .filter(Boolean)
    .join(', ')
}

interface Props {
  name: PhotoName
  alt: string
  sizes?: string
  className?: string
  style?: CSSProperties
  eager?: boolean
  position?: string
}

export function Photo({ name, alt, sizes = '100vw', className = 'photo', style, eager, position }: Props) {
  const [w, h] = photoSizes[name]
  return (
    <picture>
      <source type="image/webp" srcSet={srcset(name, 'webp')} sizes={sizes} />
      <img
        src={photoUrl(name)}
        srcSet={srcset(name, 'jpg')}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        className={className}
        style={{ objectPosition: position, ...style }}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : undefined}
      />
    </picture>
  )
}

export function photoUrl(name: PhotoName, width = 1280) {
  return files[`../assets/photos/${name}-${width}.jpg`] ?? files[`../assets/photos/${name}-720.jpg`]
}
