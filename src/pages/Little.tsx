import { useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Photo } from '../components/Photo'
import { StatusLine } from '../components/StatusLine'
import { Choice, Field, MockForm, TextField } from '../components/Form'
import { little, littleMenu } from '../data/restaurant'
import { formatDay, londonNow } from '../lib/hours'
import { mapsLinks } from '../lib/format'
import { longDate } from '../lib/booking'
import './little.css'

export default function Little() {
  const maps = mapsLinks(`Little Bánh Bánh, ${little.street}, London ${little.postcode}`, little.lat, little.lng)
  const [kind, setKind] = useState('office')
  return (
    <div className="little-page">
      <PageHead
        eyebrow="Fleet Street"
        gloss="Weekday lunch in the City"
        title="Little Bánh Bánh"
        aside={
          <div className="little-head__aside">
            <StatusLine venue={little.hours} />
            <p className="little-head__where">
              {little.street}, {little.postcode}
              <br />
              Mon–Fri {formatDay(little.hours[1])} · Sat &amp; Sun closed
            </p>
            <p className="little-head__maps">
              <a href={maps.google} target="_blank" rel="noreferrer">
                Google Maps
              </a>
              <a href={maps.apple} target="_blank" rel="noreferrer">
                Apple Maps
              </a>
              <a href={maps.citymapper} target="_blank" rel="noreferrer">
                Citymapper
              </a>
            </p>
          </div>
        }
      >
        <p>{little.blurb}</p>
      </PageHead>

      <figure className="little-photo" data-header="light">
        <Photo name="little-counter" alt="Little Bánh Bánh: a curved walnut counter, a glass-block kitchen window and pale stools at a window ledge" sizes="100vw" />
      </figure>

      <section className="little-menu" data-header="light">
        <div className="wrap">
          <header className="little-menu__head">
            <h2>Lunch menu</h2>
            <p>Made fresh each day, served fast. Eat in, take away, or order through Deliveroo.</p>
            <a className="btn" href={little.deliverooUrl} target="_blank" rel="noreferrer">
              Little Bánh Bánh on Deliveroo
            </a>
          </header>
          <div className="little-menu__grid">
            {littleMenu.map((section) => (
              <section key={section.en} className="little-section">
                <h3>{section.en}</h3>
                <p className="little-section__intro">{section.intro}</p>
                <ul>
                  {section.items.map((item) => (
                    <li key={item.en + item.vi}>
                      <div className="little-item__head">
                        <span className="little-item__en">{item.en}</span>
                        <span className="little-item__price">{item.price}</span>
                      </div>
                      {item.options && <span className="little-item__opts">{item.options}</span>}
                      <span className="little-item__vi" lang="vi">
                        {item.vi}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="small little-menu__note">Prices in £.</p>
        </div>
      </section>

      <section className="little-catering" id="catering" data-header="light">
        <div className="wrap little-catering__grid">
          <div>
            <p className="eyebrow">Catering</p>
            <h2>Lunch for the office, food for the event</h2>
            <p>{little.catering} Tell us what you’re planning and we’ll put a package together.</p>
          </div>
          <MockForm
            submitLabel="Send catering enquiry"
            confirmation={(d) => (
              <>
                <h3>Thank you{d.name ? `, ${d.name.split(' ')[0]}` : ''}</h3>
                <p>
                  We’ve got your enquiry for {d.headcount} people{d.date ? ` on ${longDate(d.date)}` : ''}. Little Bánh Bánh will reply to {d.email}.
                </p>
              </>
            )}
          >
            <Field label="Name" name="name" autoComplete="name" required />
            <Field label="Company" name="company" autoComplete="organization" />
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field label="Date" name="date" type="date" min={londonNow().date} required />
            <Field label="How many people?" name="headcount" type="number" min={1} required />
            <Choice
              legend="What’s it for?"
              name="kind"
              value={kind}
              onChange={setKind}
              options={[
                { value: 'office', label: 'Office lunch' },
                { value: 'event', label: 'An event' },
                { value: 'other', label: 'Something else' },
              ]}
            />
            <Field label="Where in the city?" name="where" placeholder="Address or postcode" wide />
            <TextField label="Anything else" name="notes" hint="Dietary needs, budget, timings" />
          </MockForm>
        </div>
      </section>
    </div>
  )
}
