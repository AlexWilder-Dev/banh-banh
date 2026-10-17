import { Link } from 'react-router-dom'
import { Entrance } from '../components/Entrance'
import { MetTable } from '../components/MetTable'
import { WeekWall } from '../components/WeekWall'
import { Photo } from '../components/Photo'
import { PressLine } from '../components/PressLine'
import { Reveal } from '../components/Reveal'
import { StatusLine } from '../components/StatusLine'
import { atHome, brixton, little, press, voice } from '../data/restaurant'
import { formatDay } from '../lib/hours'
import './home.css'

export default function Home() {
  return (
    <>
      <Entrance />

      {/* Cơm nhà, and why there's no phở at dinner */}
      <section className="home-comnha section" data-header="light">
        <div className="wrap home-comnha__grid">
          <Reveal className="home-comnha__lead">
            <p className="eyebrow">
              <span lang="vi">Cơm nhà</span>
              <span className="gloss">Reopened spring 2026, with a new room and a new menu</span>
            </p>
            <p className="home-comnha__statement">
              Built on over 10 years of cooking, guided by <em lang="vi">Cơm Nhà</em>: family style home cooking, made for sharing.
            </p>
            <PressLine line={press.broadsheetMenus} />
          </Reveal>
          <Reveal className="home-nopho" delay={0.1}>
            <span id="no-pho" className="anchor" />
            <h2 className="home-nopho__title">
              No <span lang="vi">phở</span> at dinner.
              <span>On purpose.</span>
            </h2>
            <p>
              In Vietnam, phở is breakfast, usually eaten on your own. The evening meal is the one where everyone sits down together and the food goes in
              the middle. So dinner here is cơm nhà dishes and mẹt platters, made for the table.
            </p>
            <PressLine line={press.apNoPho} />
            <p className="small home-nopho__note">
              Phở is on at lunch on Fleet Street, at <Link to="/little">Little Bánh Bánh</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The mẹt, seen from above */}
      <section className="home-met section" data-header="dark" id="met">
        <div className="wrap">
          <header className="home-met__head">
            <p className="eyebrow">
              <span lang="vi">Mẹt</span>
              <span className="gloss">Bamboo grazing platters, perfect for sharing</span>
            </p>
            <h2>Lay the table</h2>
            <p className="lede">Pick your mẹt, tell us how many of you there are, and book the table to match.</p>
          </header>
          <MetTable />
          <PressLine line={press.nudgeMet} className="home-met__press" />
        </div>
      </section>

      {/* The room */}
      <section className="home-room" data-header="light">
        <div className="home-room__grid">
          <figure className="home-room__long">
            <Photo
              name="press-long-room"
              alt="The long room: a curved glass-block wall, a counter with stools, frescoes glowing at the far end"
              sizes="(min-width: 900px) 60vw, 100vw"
            />
            <figcaption className="credit">Photo: Anton Rodriguez for We Heart</figcaption>
          </figure>
          <Reveal className="home-room__text">
            <p className="eyebrow">The room</p>
            <h2>Built to be discovered</h2>
            <p>
              House of Baby rebuilt the room around discovery: you see little as you come in, and the space opens up as you move through. Tomio Shota
              painted the frescoes and ceilings; AP Nguyen made the ceramic landscapes and devised the menu.
            </p>
            <PressLine line={press.nudgeInstallation} />
            <Link to="/room" className="link-arrow">
              Walk through the room
            </Link>
          </Reveal>
          <figure className="home-room__screen">
            <Photo name="folding-screen" alt="The hand-painted folding screen, with a watermelon and teapot on the table in front" sizes="(min-width: 900px) 30vw, 60vw" />
          </figure>
        </div>
      </section>

      {/* When we're open */}
      <section className="home-week section" data-header="dark">
        <div className="wrap">
          <header className="home-week__head">
            <p className="eyebrow">Brixton hours</p>
            <h2>Open tonight?</h2>
            <StatusLine venue={brixton.hours} tone="dark" />
          </header>
          <WeekWall hours={brixton.hours} />
          <div className="home-week__ctas">
            <Link to="/book" className="btn btn--cream">
              Book a table
            </Link>
            <Link to="/visit" className="btn btn--ghost-light">
              Getting here
            </Link>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="home-groups" data-header="light">
        <figure className="home-groups__photo">
          <Photo
            name="group-room"
            alt="A semi-private room: a glowing glass-block window, painted plywood walls, a long grey table and red rush-seat chairs"
            sizes="(min-width: 900px) 45vw, 100vw"
            position="50% 60%"
          />
        </figure>
        <Reveal className="home-groups__text">
          <p className="eyebrow">Groups &amp; private hire</p>
          <h2>Tables for ten, rooms for more</h2>
          <p className="lede">{voice.groups}</p>
          <p>{voice.groupsBig}</p>
          <div className="home-groups__xmas">
            <p className="eyebrow">Christmas</p>
            <p>{voice.christmas} Now taking enquiries for December.</p>
          </div>
          <div className="home-groups__ctas">
            <Link to="/book?party=10" className="btn">
              Book for up to 10
            </Link>
            <Link to="/groups" className="btn btn--ghost">
              Group enquiry
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Little Bánh Bánh, in daylight */}
      <section className="home-little" data-header="light">
        <div className="wrap home-little__grid">
          <Reveal className="home-little__text">
            <p className="eyebrow">Weekday lunch in the City</p>
            <h2>Little Bánh Bánh</h2>
            <p className="home-little__where">
              {little.street}, {little.postcode} · Mon–Fri {formatDay(little.hours[1])}
            </p>
            <StatusLine venue={little.hours} />
            <p>{little.blurb}</p>
            <p>Bánh mì, rice boxes, bún and phở at lunch. {little.catering}</p>
            <div className="home-little__ctas">
              <Link to="/little" className="btn">
                Lunch menu
              </Link>
              <Link to="/little#catering" className="btn btn--ghost">
                Catering enquiry
              </Link>
            </div>
          </Reveal>
          <figure className="home-little__photo">
            <Photo
              name="little-counter"
              alt="Little Bánh Bánh: a walnut counter, a glass-block kitchen window and pale stools at a window ledge"
              sizes="(min-width: 900px) 55vw, 100vw"
            />
          </figure>
        </div>
      </section>

      {/* At home */}
      <section className="home-athome" data-header="dark">
        <div className="wrap home-athome__inner">
          <div>
            <p className="eyebrow">Bánh Bánh at Home</p>
            <p className="home-athome__line">{atHome.line}</p>
            <p className="small">Delivery is on Deliveroo only.</p>
          </div>
          <a href={atHome.url} className="btn btn--cream" target="_blank" rel="noreferrer">
            Order on Deliveroo
          </a>
        </div>
      </section>
    </>
  )
}
