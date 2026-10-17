import { Link } from 'react-router-dom'
import { PageHead } from '../components/PageHead'
import { Photo } from '../components/Photo'
import { PressLine } from '../components/PressLine'
import { Reveal } from '../components/Reveal'
import { Shrine } from '../components/Shrine'
import { Fan } from '../components/Fan'
import { credits, press, voice } from '../data/restaurant'
import './room.css'

export default function Room() {
  return (
    <div className="room-page">
      <PageHead tone="dark" eyebrow="The room" gloss="Reopened spring 2026" title="Walk through">
        <p>{voice.amulet}</p>
      </PageHead>

      <section className="room-walk" data-header="dark">
        <div className="wrap">
          <PressLine line={press.losperReveal} className="room-walk__quote" />
        </div>

        {/* 1 */}
        <article className="room-stop room-stop--corridor">
          <div className="wrap room-stop__grid">
            <div className="room-stop__num">01</div>
            <Reveal className="room-stop__text">
              <h2>The corridor</h2>
              <p>
                You come in off Coldharbour Lane into a long, quiet, dimly lit corridor. You can’t see much yet. That’s the point: House of Baby wanted
                the room to be discovered, not seen all at once.
              </p>
            </Reveal>
            <div className="room-stop__visual room-corridor" aria-hidden>
              <span />
            </div>
          </div>
        </article>

        {/* 2 */}
        <article className="room-stop room-stop--shrine">
          <div className="wrap room-stop__grid">
            <div className="room-stop__num">02</div>
            <Reveal className="room-stop__text">
              <h2>The shrine</h2>
              <p>
                At the end of the corridor, lit up and tiled in pink: a Vietnamese shrine with <span lang="vi">Thổ Địa</span>, god of the land, and{' '}
                <span lang="vi">Thần Tài</span>, god of wealth, dressed with fruit, flowers and incense.
              </p>
            </Reveal>
            <div className="room-stop__visual room-stop__shrine">
              <Shrine />
            </div>
          </div>
        </article>

        {/* 3 */}
        <article className="room-stop room-stop--dining">
          <div className="wrap room-stop__grid">
            <div className="room-stop__num">03</div>
            <Reveal className="room-stop__text">
              <h2>The dining room</h2>
              <p>
                Then it opens up. Vietnamese modernism: full-height curved glass-block walls that catch the light, cool concrete, deep wood and warm,
                iron-oxide yellows.
              </p>
              <p>
                Tomio Shota spent weeks hand-painting the frescoes and ceilings: dreamlike, nostalgic Vietnamese scenes and the everyday objects of a
                Vietnamese kitchen. Around them, wool tapestries, a hand-painted folding screen, AP Nguyen’s ceramic <span lang="vi">hòn non bộ</span>{' '}
                landscapes, and a raised platform after the <span lang="vi">phản</span>, the low wooden platform used for everything from eating to napping.
              </p>
              <PressLine line={press.weHeart} />
            </Reveal>
            <div className="room-stop__visual room-stop__gallery">
              <figure className="room-g room-g--a">
                <Photo name="fresco-banquette" alt="A fresco of two figures at a red table with a fish, above a pale blue banquette and a bamboo-style chair" sizes="(min-width: 900px) 30vw, 70vw" />
              </figure>
              <figure className="room-g room-g--b">
                <Photo name="press-long-room" alt="The long room, with its curved glass-block wall and counter" sizes="(min-width: 900px) 30vw, 70vw" />
                <figcaption className="credit">Photo: Anton Rodriguez for We Heart</figcaption>
              </figure>
              <figure className="room-g room-g--c">
                <Photo name="still-life" alt="A ceramic hòn non bộ landscape on a carved stand, against a concrete wall with an octagonal niche" sizes="(min-width: 900px) 30vw, 70vw" />
              </figure>
              <figure className="room-g room-g--d">
                <Photo name="folding-screen" alt="The hand-painted folding screen" sizes="(min-width: 900px) 20vw, 50vw" />
              </figure>
            </div>
          </div>
        </article>

        {/* 4 */}
        <article className="room-stop room-stop--front">
          <div className="wrap room-stop__grid">
            <div className="room-stop__num">04</div>
            <Reveal className="room-stop__text">
              <h2>The front room</h2>
              <p>
                Up front, a separate pink room with fold-away doors that can become a covered terrace, under an aquamarine Vietnamese fan and more of
                Shota’s illustrations.
              </p>
              <div className="room-stop__fan">
                <Fan size={72} />
              </div>
            </Reveal>
            <figure className="room-stop__visual room-stop__photo">
              <Photo name="press-front-room" alt="Through an octagonal concrete opening: the pink front room, its aquamarine ceiling fan and a long table" sizes="(min-width: 900px) 35vw, 80vw" />
              <figcaption className="credit">Photo: Anton Rodriguez for We Heart</figcaption>
            </figure>
          </div>
        </article>

        {/* 5 */}
        <article className="room-stop room-stop--groups">
          <div className="wrap room-stop__grid">
            <div className="room-stop__num">05</div>
            <Reveal className="room-stop__text">
              <h2>Group rooms</h2>
              <p>Two rooms for groups, made for eating together: glass blocks glowing behind a long table, walls painted with small still lifes.</p>
              <Link to="/groups" className="link-arrow">
                Groups &amp; private hire
              </Link>
            </Reveal>
            <figure className="room-stop__visual room-stop__photo">
              <Photo name="group-room" alt="A group room: glowing glass blocks, a long grey table and red chairs" sizes="(min-width: 900px) 35vw, 80vw" />
            </figure>
          </div>
        </article>
      </section>

      <section className="room-credits" data-header="light">
        <div className="wrap room-credits__grid">
          <div>
            <p className="eyebrow">Credits</p>
            <h2>Who made it</h2>
          </div>
          <dl>
            <div>
              <dt>Spatial design</dt>
              <dd>
                <a href={credits.spatial.url} target="_blank" rel="noreferrer">
                  {credits.spatial.name}
                </a>
                : {credits.spatial.people.join(' and ')}
              </dd>
            </div>
            <div>
              <dt>Frescoes and paintings</dt>
              <dd>Tomio Shota</dd>
            </div>
            <div>
              <dt>Menu concept</dt>
              <dd>
                <a href={credits.menu.url} target="_blank" rel="noreferrer">
                  {credits.menu.name}
                </a>
              </dd>
            </div>
            <div>
              <dt>Ceramics</dt>
              <dd>AP Nguyen</dd>
            </div>
            <div>
              <dt>Photography</dt>
              <dd>Bánh Bánh; long room and front room by Anton Rodriguez for We Heart</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  )
}
