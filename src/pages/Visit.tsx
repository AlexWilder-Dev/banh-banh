import { Link } from 'react-router-dom'
import { PageHead } from '../components/PageHead'
import { StatusLine } from '../components/StatusLine'
import { brixton, little, type WeekHours } from '../data/restaurant'
import { dayName, formatDay } from '../lib/hours'
import { mapsLinks } from '../lib/format'
import './visit.css'

const ORDER = [1, 2, 3, 4, 5, 6, 0]

function Hours({ hours }: { hours: WeekHours }) {
  return (
    <dl className="visit-hours">
      {ORDER.map((d) => (
        <div key={d}>
          <dt>{dayName(d)}</dt>
          <dd>{formatDay(hours[d])}</dd>
        </div>
      ))}
    </dl>
  )
}

function MapLinks({ q, lat, lng }: { q: string; lat: number; lng: number }) {
  const m = mapsLinks(q, lat, lng)
  return (
    <p className="visit-maps">
      <a className="btn btn--ghost" href={m.google} target="_blank" rel="noreferrer">
        Google Maps
      </a>
      <a className="btn btn--ghost" href={m.apple} target="_blank" rel="noreferrer">
        Apple Maps
      </a>
      <a className="btn btn--ghost" href={m.citymapper} target="_blank" rel="noreferrer">
        Citymapper
      </a>
    </p>
  )
}

export default function Visit() {
  return (
    <div className="visit-page">
      <PageHead eyebrow="Visit" gloss="Getting here, hours and contact" title="Find us" />

      <section className="visit" data-header="light">
        <div className="wrap visit__grid">
          <article className="visit-venue">
            <p className="eyebrow">Dinner, weekend lunch &amp; groups</p>
            <h2>Bánh Bánh, Brixton</h2>
            <address>
              {brixton.street}
              <br />
              London {brixton.postcode}
            </address>
            <StatusLine venue={brixton.hours} />
            <MapLinks q={`Bánh Bánh, ${brixton.street}, London ${brixton.postcode}`} lat={brixton.lat} lng={brixton.lng} />
            <h3 className="eyebrow">Nearest stations</h3>
            <ul className="fact-list">
              {brixton.stations.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="visit-tip">Look for the cream BÁNH BÁNH fascia on Coldharbour Lane.</p>
            <h3 className="eyebrow">Hours</h3>
            <Hours hours={brixton.hours} />
            <p className="visit-cta">
              <Link to="/book" className="btn">
                Book a table
              </Link>
            </p>
          </article>

          <article className="visit-venue visit-venue--little">
            <p className="eyebrow">Weekday lunch &amp; catering</p>
            <h2>Little Bánh Bánh</h2>
            <address>
              {little.street}
              <br />
              London {little.postcode}
            </address>
            <StatusLine venue={little.hours} />
            <MapLinks q={`Little Bánh Bánh, ${little.street}, London ${little.postcode}`} lat={little.lat} lng={little.lng} />
            <h3 className="eyebrow">Nearest stations</h3>
            <ul className="fact-list">
              {little.stations.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <h3 className="eyebrow">Hours</h3>
            <Hours hours={little.hours} />
            <p className="visit-cta">
              <Link to="/little" className="btn btn--ghost">
                Lunch menu &amp; catering
              </Link>
            </p>
          </article>
        </div>
      </section>

      <section className="visit-contact" data-header="dark">
        <div className="wrap visit-contact__grid">
          <h2>Get in touch</h2>
          <ul>
            <li>
              <span className="eyebrow">Email</span>
              <a href={`mailto:${brixton.email}`}>{brixton.email}</a>
            </li>
            <li>
              <span className="eyebrow">Phone</span>
              <a href={brixton.phoneHref}>{brixton.phone}</a>
            </li>
            <li>
              <span className="eyebrow">Instagram</span>
              <a href={brixton.instagramUrl} target="_blank" rel="noreferrer">
                @{brixton.instagram}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
