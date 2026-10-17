import type { PressLine as Line } from '../data/restaurant'

export function PressLine({ line, className = '' }: { line: Line; className?: string }) {
  return (
    <figure className={`press-line ${className}`}>
      <blockquote cite={line.url}>
        <p>“{line.quote}”</p>
      </blockquote>
      <figcaption>
        <a href={line.url} target="_blank" rel="noreferrer">
          {line.source}
        </a>
        , {line.date}
      </figcaption>
    </figure>
  )
}
