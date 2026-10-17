import { Link } from 'react-router-dom'
import { PageHead } from '../components/PageHead'
import { Photo } from '../components/Photo'
import { atHome, little } from '../data/restaurant'
import './athome.css'

export default function AtHome() {
  return (
    <div className="athome-page">
      <PageHead tone="dark" eyebrow="Bánh Bánh at Home" gloss="Delivery, on Deliveroo only" title="From our home to yours">
        <p>
          {atHome.intro} {atHome.line}
        </p>
      </PageHead>

      <section className="athome-options" data-header="dark">
        <div className="wrap athome-options__grid">
          <article className="athome-card">
            <p className="eyebrow">Bánh Bánh</p>
            <h2>Brixton</h2>
            <p>Delivery from Bánh Bánh in Brixton.</p>
            <a href={atHome.url} className="btn btn--cream" target="_blank" rel="noreferrer">
              Order on Deliveroo
            </a>
          </article>
          <article className="athome-card">
            <p className="eyebrow">Little Bánh Bánh</p>
            <h2>Fleet Street</h2>
            <p>Bánh mì, rice boxes, bún and phở for City desks.</p>
            <a href={little.deliverooUrl} className="btn btn--ghost-light" target="_blank" rel="noreferrer">
              Order on Deliveroo
            </a>
          </article>
        </div>
        <figure className="athome-photo">
          <Photo name="sharing-table" alt="Dishes spread across a wooden table to share" sizes="100vw" />
        </figure>
        <div className="wrap athome-foot">
          <p>
            Rather eat in? <Link to="/book">Book a table</Link> in Brixton.
          </p>
        </div>
      </section>
    </div>
  )
}
