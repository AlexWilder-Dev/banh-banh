import type { ReactNode } from 'react'

interface Props {
  eyebrow: ReactNode
  gloss?: ReactNode
  title: ReactNode
  children?: ReactNode
  tone?: 'light' | 'dark'
  aside?: ReactNode
}

export function PageHead({ eyebrow, gloss, title, children, tone = 'light', aside }: Props) {
  return (
    <header className={`page-head page-head--${tone}`} data-header={tone}>
      <div className="wrap page-head__grid">
        <div>
          <p className="eyebrow">
            {eyebrow}
            {gloss && <span className="gloss">{gloss}</span>}
          </p>
          <h1 className="page-head__title">{title}</h1>
          {children && <div className="page-head__intro">{children}</div>}
        </div>
        {aside && <div className="page-head__aside">{aside}</div>}
      </div>
    </header>
  )
}
