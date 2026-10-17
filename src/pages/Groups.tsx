import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHead } from '../components/PageHead'
import { Photo } from '../components/Photo'
import { PressLine } from '../components/PressLine'
import { Choice, Field, MockForm, SelectField, TextField } from '../components/Form'
import { brixton, metDishes, press, voice } from '../data/restaurant'
import { longDate } from '../lib/booking'
import { londonNow } from '../lib/hours'
import './groups.css'

export default function Groups() {
  const [params] = useSearchParams()
  const size = Math.max(11, Number(params.get('size')) || 12)
  const [space, setSpace] = useState('semi')
  const [sitting, setSitting] = useState('dinner')
  const today = londonNow().date

  return (
    <div className="groups-page">
      <PageHead eyebrow="Groups & private hire" gloss="Bánh Bánh, Brixton" title="Tables for ten, rooms for more">
        <p>{voice.groups}</p>
        <p>{voice.groupsBig}</p>
      </PageHead>

      <section className="groups-options" data-header="light">
        <div className="wrap groups-options__grid">
          <figure className="groups-options__photo">
            <Photo
              name="group-room"
              alt="A semi-private room with a glowing glass-block window, painted plywood walls, a long grey table and red rush-seat chairs"
              sizes="(min-width: 900px) 40vw, 100vw"
            />
          </figure>
          <div className="groups-options__cards">
            <article className="groups-card">
              <p className="eyebrow">Up to {brixton.maxTableSize}</p>
              <h2>Semi-private</h2>
              <p>A space for you and friends, booked like any other table.</p>
              <Link to={`/book?party=${brixton.maxTableSize}`} className="btn">
                Book for up to {brixton.maxTableSize}
              </Link>
            </article>
            <article className="groups-card">
              <p className="eyebrow">{brixton.maxTableSize + 1} and over</p>
              <h2>Full or semi-private hire</h2>
              <p>Tell us the date, the numbers and the occasion, and we’ll come back to you with what’s possible.</p>
              <a href="#enquiry" className="btn btn--ghost" onClick={(e) => {
                e.preventDefault()
                document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Make an enquiry
              </a>
            </article>
            <article className="groups-card groups-card--xmas">
              <p className="eyebrow">Christmas</p>
              <h2>December parties</h2>
              <p>{voice.christmas}</p>
              <p className="small">Larger groups: use the enquiry form and choose “Christmas party”.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="groups-met" data-header="dark">
        <div className="wrap groups-met__grid">
          <div>
            <p className="eyebrow">
              <span lang="vi">Mẹt</span>
              <span className="gloss">Made for a full table</span>
            </p>
            <h2>Food in the middle</h2>
            <PressLine line={press.apMiddle} />
          </div>
          <ul className="groups-met__list">
            {metDishes.map((d) => (
              <li key={d.id}>
                <span lang="vi">{d.vi}</span>
                <span>{d.price}pp</span>
              </li>
            ))}
            <li className="groups-met__note">Priced per person. min 2 people.</li>
            <li>
              <Link to="/#met" className="link-arrow">
                Lay a table for your group
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="groups-enquiry" id="enquiry" data-header="light">
        <div className="wrap groups-enquiry__grid">
          <div>
            <p className="eyebrow">Enquiry</p>
            <h2>Group &amp; private hire</h2>
            <p>We read every enquiry and reply by email. If it’s soon, call us on <a href={brixton.phoneHref}>{brixton.phone}</a>.</p>
          </div>
          <MockForm
            submitLabel="Send enquiry"
            confirmation={(d) => (
              <>
                <h3>Thank you{d.name ? `, ${d.name.split(' ')[0]}` : ''}</h3>
                <p>
                  Your enquiry for {d.size} people {d.date ? `on ${longDate(d.date)}` : ''} is with the team. We’ll reply to {d.email}.
                </p>
              </>
            )}
          >
            <Field label="Name" name="name" autoComplete="name" required />
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field label="How many?" name="size" type="number" min={brixton.maxTableSize + 1} defaultValue={size} required />
            <Field label="Date" name="date" type="date" min={today} required hint="Closed on Tuesdays" />
            <Choice
              legend="Lunch or dinner"
              name="sitting"
              value={sitting}
              onChange={setSitting}
              options={[
                { value: 'lunch', label: 'Lunch', note: 'Sat & Sun' },
                { value: 'dinner', label: 'Dinner' },
              ]}
            />
            <Choice
              legend="Space"
              name="space"
              value={space}
              onChange={setSpace}
              options={[
                { value: 'semi', label: 'Semi-private' },
                { value: 'full', label: 'Full hire' },
                { value: 'unsure', label: 'Not sure yet' },
              ]}
            />
            <SelectField label="Occasion" name="occasion" defaultValue="" wide>
              <option value="" disabled>
                Choose one
              </option>
              <option>Christmas party</option>
              <option>Birthday</option>
              <option>Work do</option>
              <option>Family gathering</option>
              <option>Something else</option>
            </SelectField>
            <TextField label="Anything else" name="notes" hint={voice.allergies} />
          </MockForm>
        </div>
      </section>
    </div>
  )
}
