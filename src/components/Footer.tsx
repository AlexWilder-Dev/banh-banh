import { Link } from 'react-router-dom'
import { Badge } from './marks'
import { brixton, little } from '../data/restaurant'
import { dayName, formatDay } from '../lib/hours'
import { mapsLinks } from '../lib/format'
import './footer.css'

const ORDER = [1, 2, 3, 4, 5, 6, 0]

export function Footer() {
  const maps = mapsLinks(`Bánh Bánh, ${brixton.street}, London ${brixton.postcode}`, brixton.lat, brixton.lng)
  return (
    <footer className="site-footer" data-header="light">
      <div className="wrap site-footer__grid">
        <Badge className="site-footer__badge" />

        <section>
          <h2 className="eyebrow">Bánh Bánh, Brixton</h2>
          <address>
            {brixton.street}
            <br />
            London {brixton.postcode}
          </address>
          <p>
            <a href={maps.google} target="_blank" rel="noreferrer">
              Map
            </a>
          </p>
          <dl className="site-footer__hours">
            {ORDER.map((d) => (
              <div key={d}>
                <dt>{dayName(d).slice(0, 3)}</dt>
                <dd>{formatDay(brixton.hours[d])}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="eyebrow">Little Bánh Bánh</h2>
          <address>
            {little.street}
            <br />
            London {little.postcode}
          </address>
          <p>Mon–Fri {formatDay(little.hours[1])}</p>
          <h2 className="eyebrow site-footer__sub">Get in touch</h2>
          <p>
            <a href={`mailto:${brixton.email}`}>{brixton.email}</a>
            <br />
            <a href={brixton.phoneHref}>{brixton.phone}</a>
            <br />
            <a href={brixton.instagramUrl} target="_blank" rel="noreferrer">
              @{brixton.instagram}
            </a>
          </p>
        </section>

        <nav aria-label="Footer">
          <h2 className="eyebrow">Find</h2>
          <ul>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/book">Book a table</Link>
            </li>
            <li>
              <Link to="/groups">Groups &amp; private hire</Link>
            </li>
            <li>
              <Link to="/room">The room</Link>
            </li>
            <li>
              <Link to="/little">Little Bánh Bánh</Link>
            </li>
            <li>
              <Link to="/at-home">At home</Link>
            </li>
            <li>
              <Link to="/visit">Visit</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="wrap site-footer__base">
        <p>Spatial design by House of Baby · Menu concept by AP Nguyen</p>
        <p>Site by AlexWilder-Dev</p>
      </div>
    </footer>
  )
}
