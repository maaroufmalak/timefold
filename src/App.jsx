import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  CaretDown,
  List,
  Moon,
  SlidersHorizontal,
  Sun,
  X,
} from '@phosphor-icons/react'

const YEAR_SECONDS = 31_557_600
const LIGHT_SPEED_KM_S = 299_792

const destinations = [
  {
    name: 'Moon',
    family: 'Our neighborhood',
    seconds: 384_400 / LIGHT_SPEED_KM_S,
    distance: '384,400 km',
    lightTime: '1.28 seconds',
    statement: 'A live-looking Moon is already more than one second old.',
    detail:
      'Its average distance changes as it orbits Earth, so this is a representative one-way light time.',
    source: 'https://science.nasa.gov/moon/facts/',
  },
  {
    name: 'Sun',
    family: 'Our star',
    seconds: 8.350022 * 60,
    distance: 'About 150 million km',
    lightTime: '8 minutes 21 seconds',
    statement: 'Every sunrise carries information that left the Sun more than eight minutes earlier.',
    detail:
      'If the Sun changed at this instant, Earth would not receive the new light until that delay had passed.',
    source: 'https://science.nasa.gov/earth/facts/',
  },
  {
    name: 'Proxima Centauri',
    family: 'Nearest star',
    seconds: 4.24 * YEAR_SECONDS,
    distance: '4.24 light-years',
    lightTime: '4.24 years',
    statement: 'The nearest star beyond the Sun still arrives as a view from several years ago.',
    detail:
      'Proxima is the closest member of the Alpha Centauri system and the nearest known star to our Sun.',
    source: 'https://science.nasa.gov/sun/facts/',
  },
  {
    name: 'Sirius',
    family: 'Bright nearby system',
    seconds: 8.6 * YEAR_SECONDS,
    distance: '8.6 light-years',
    lightTime: '8.6 years',
    statement: 'The brightest star in our night sky is never shown to us in real time.',
    detail:
      'Sirius is a binary system. Its faint white dwarf companion is hidden in the glare of Sirius A.',
    source: 'https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/',
  },
  {
    name: 'Orion Nebula',
    family: 'Stellar nursery',
    seconds: 1_500 * YEAR_SECONDS,
    distance: '1,500 light-years',
    lightTime: '1,500 years',
    statement: 'This stellar nursery reaches us as an image made long before the first modern telescope.',
    detail:
      'M42 is the closest large star-forming region to Earth and can be seen without a telescope in dark skies.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/',
  },
  {
    name: 'Andromeda',
    family: 'Neighbor galaxy',
    seconds: 2_500_000 * YEAR_SECONDS,
    distance: '2.5 million light-years',
    lightTime: '2.5 million years',
    statement: 'The Andromeda Galaxy arrives from a time before Homo sapiens existed.',
    detail:
      'M31 is the nearest major galaxy to the Milky Way and is visible to the unaided eye under dark skies.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/',
  },
  {
    name: 'GN-z11',
    family: 'Early universe',
    seconds: 13_400_000_000 * YEAR_SECONDS,
    distance: '13.4 billion years of light travel',
    lightTime: '13.4 billion years',
    statement: 'Hubble recorded this galaxy as it was about 400 million years after the Big Bang.',
    detail:
      'At this scale, expanding space makes distance more complex. The instrument shows light travel time, not a present-day ruler distance.',
    source: 'https://science.nasa.gov/missions/hubble/hubble-team-breaks-cosmic-distance-record/',
  },
]

const sourceGroups = [
  {
    title: 'Distance and light',
    links: [
      ['Moon facts', 'https://science.nasa.gov/moon/facts/'],
      ['Earth facts and one-way light time', 'https://science.nasa.gov/earth/facts/'],
      ['What is a light-year?', 'https://science.nasa.gov/exoplanets/what-is-a-light-year/'],
      ['NASA spaceflight glossary', 'https://science.nasa.gov/learn/basics-of-space-flight/glossary/'],
    ],
  },
  {
    title: 'Stars and deep space',
    links: [
      ['Sirius and its companion', 'https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/'],
      ['Orion Nebula, Messier 42', 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/'],
      ['Andromeda Galaxy, Messier 31', 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/'],
      ['Hubble and GN-z11', 'https://science.nasa.gov/missions/hubble/hubble-team-breaks-cosmic-distance-record/'],
    ],
  },
]

const logMin = Math.log10(destinations[0].seconds)
const logMax = Math.log10(destinations.at(-1).seconds)

const destinationPositions = destinations.map((destination) =>
  Math.round(((Math.log10(destination.seconds) - logMin) / (logMax - logMin)) * 1000),
)

function positionToSeconds(position) {
  return 10 ** (logMin + (position / 1000) * (logMax - logMin))
}

function getNearestDestinationIndex(position) {
  let nearestIndex = 0
  let nearestDistance = Number.POSITIVE_INFINITY

  destinationPositions.forEach((destinationPosition, index) => {
    const distance = Math.abs(destinationPosition - position)
    if (distance < nearestDistance) {
      nearestIndex = index
      nearestDistance = distance
    }
  })

  return nearestIndex
}

function formatTravelTime(seconds) {
  if (seconds < 60) return `${seconds.toFixed(seconds < 10 ? 2 : 0)} seconds`
  if (seconds < 3_600) return `${(seconds / 60).toFixed(seconds < 600 ? 2 : 1)} minutes`
  if (seconds < 86_400) return `${(seconds / 3_600).toFixed(1)} hours`
  if (seconds < YEAR_SECONDS) return `${(seconds / 86_400).toFixed(1)} days`

  const years = seconds / YEAR_SECONDS
  if (years < 10) return `${years.toFixed(2)} years`
  if (years < 1_000) return `${Math.round(years).toLocaleString('en-US')} years`
  if (years < 1_000_000) return `${(years / 1_000).toFixed(1)} thousand years`
  if (years < 1_000_000_000) return `${(years / 1_000_000).toFixed(2)} million years`
  return `${(years / 1_000_000_000).toFixed(2)} billion years`
}

function App() {
  const [position, setPosition] = useState(destinationPositions[0])
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)

  const activeIndex = useMemo(() => getNearestDestinationIndex(position), [position])
  const activeDestination = destinations[activeIndex]
  const currentTravelTime = useMemo(() => formatTravelTime(positionToSeconds(position)), [position])
  const depth = position / 1000

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('timefold-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId || targetId === 'top') return undefined

    let restoreFrame
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId)
      if (!target) return

      const root = document.documentElement
      const previousScrollBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      target.scrollIntoView({ block: 'start' })
      restoreFrame = window.requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior
      })
    })

    return () => {
      window.cancelAnimationFrame(frame)
      if (restoreFrame) window.cancelAnimationFrame(restoreFrame)
    }
  }, [])

  const selectDestination = (index) => {
    setPosition(destinationPositions[index])
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="TIMEFOLD home">
          TIMEFOLD<span aria-hidden="true">01</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#instrument">Instrument</a>
          <a href="#principle">The principle</a>
          <a href="#questions">Questions</a>
          <a href="#sources">Sources</a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} weight="regular" /> : <List size={20} weight="regular" />}
          </button>

          <button
            className="icon-button"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? <Sun size={20} weight="regular" /> : <Moon size={20} weight="regular" />}
          </button>
        </div>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          <a href="#instrument" onClick={closeMenu}>Instrument</a>
          <a href="#principle" onClick={closeMenu}>The principle</a>
          <a href="#questions" onClick={closeMenu}>Questions</a>
          <a href="#sources" onClick={closeMenu}>Sources</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-kicker">
              <p className="eyebrow">One strange rule</p>
              <span className="hero-kicker__note" aria-hidden="true">space = time</span>
            </div>
            <h1 id="hero-title">
              <span>You have never</span>
              <span>seen the <em>present.</em></span>
            </h1>
            <p className="hero-intro">
              Every view of space is delayed. Move through the universe and watch now become history.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#instrument">
                Open instrument
                <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
              </a>
              <a className="text-link" href="#principle">Learn the rule</a>
            </div>
          </div>

          <div className="hero-visual">
            <div
              className="hero-art"
              role="img"
              aria-label="A cosmic lens visualizing light arriving from the Moon"
            >
              <div className="hero-art__ring" aria-hidden="true" />
              <div className="hero-art__readout">
                <span>Light arriving now</span>
                <strong>1.28 s old</strong>
              </div>
            </div>
            <div className="hero-art__caption" aria-hidden="true">
              <span>Start here: the Moon</span>
              <strong>Look farther. See earlier.</strong>
            </div>
          </div>
        </section>

        <section className="instrument-section" id="instrument" aria-labelledby="instrument-title">
          <div className="section-heading section-heading--instrument">
            <SlidersHorizontal size={28} weight="regular" aria-hidden="true" />
            <div>
              <h2 id="instrument-title">Fold distance into time.</h2>
              <p>Move the control continuously, or choose a destination to land on a known view.</p>
            </div>
          </div>

          <div className="instrument-shell">
            <ol className="destination-rail" aria-label="Destination presets">
              {destinations.map((destination, index) => (
                <li key={destination.name}>
                  <button
                    type="button"
                    className={index === activeIndex ? 'destination-button destination-button--active' : 'destination-button'}
                    aria-pressed={index === activeIndex}
                    onClick={() => selectDestination(index)}
                  >
                    <span>{destination.family}</span>
                    {destination.name}
                  </button>
                </li>
              ))}
            </ol>

            <div className="instrument-grid">
              <div className="instrument-controls">
                <div className="slider-heading">
                  <label htmlFor="time-range">Light travel time</label>
                  <output htmlFor="time-range" aria-live="polite">{currentTravelTime}</output>
                </div>

                <div className="range-field">
                  <input
                    id="time-range"
                    type="range"
                    min="0"
                    max="1000"
                    step="1"
                    value={position}
                    aria-valuetext={`${currentTravelTime}, nearest destination ${activeDestination.name}`}
                    onChange={(event) => setPosition(Number(event.target.value))}
                  />
                  <div className="range-track" aria-hidden="true">
                    <span className="range-track__fill" style={{ width: `${position / 10}%` }} />
                    {destinationPositions.map((destinationPosition, index) => (
                      <span
                        className={index === activeIndex ? 'range-tick range-tick--active' : 'range-tick'}
                        style={{ left: `${destinationPosition / 10}%` }}
                        key={destinations[index].name}
                      />
                    ))}
                  </div>
                </div>

                <div className="range-limits" aria-hidden="true">
                  <span>1.28 seconds</span>
                  <span>13.4 billion years</span>
                </div>

                <p className="keyboard-note">Use the arrow keys for fine movement. Presets jump to exact reference points.</p>

                <article className="signal-copy" key={activeDestination.name} aria-live="polite">
                  <div className="signal-copy__meta">
                    <span>{activeDestination.family}</span>
                    <span>{activeDestination.distance}</span>
                  </div>
                  <h3>{activeDestination.name}</h3>
                  <p className="signal-copy__statement">{activeDestination.statement}</p>
                  <p>{activeDestination.detail}</p>
                  <a href={activeDestination.source} target="_blank" rel="noreferrer">
                    Read the NASA source
                    <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                  </a>
                </article>
              </div>

              <div
                className="portal"
                style={{
                  '--core-scale': 0.82 + depth * 0.18,
                  '--ring-scale-one': 0.9 + depth * 0.1,
                  '--ring-scale-two': 0.94 + depth * 0.06,
                  '--depth-opacity': 0.35 + depth * 0.5,
                }}
                aria-label={`Visualization centered on ${activeDestination.name}`}
              >
                <div className="portal__ring portal__ring--outer" aria-hidden="true" />
                <div className="portal__ring portal__ring--middle" aria-hidden="true" />
                <div className="portal__core" aria-hidden="true">
                  <span />
                </div>
                <div className="portal__readout">
                  <span>Nearest anchor</span>
                  <strong>{activeDestination.name}</strong>
                  <small>{activeDestination.lightTime} old</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="principle" id="principle" aria-labelledby="principle-title">
          <div className="principle-copy">
            <h2 id="principle-title">Light is fast. Distance is larger.</h2>
            <p>
              Sight feels instant because earthly distances are small. On a cosmic scale, every photon carries a departure time.
            </p>
          </div>

          <div className="speed-readout" aria-label="The speed of light is 299,792 kilometers per second">
            <strong>299,792</strong>
            <span>kilometers per second</span>
          </div>

          <div className="equation-band">
            <span>distance</span>
            <span aria-hidden="true">/</span>
            <span>light speed</span>
            <span aria-hidden="true">=</span>
            <span>lookback time</span>
          </div>
        </section>

        <section className="archive" aria-labelledby="archive-title">
          <div className="archive-copy">
            <h2 id="archive-title">The sky is not one moment.</h2>
            <p>
              Look in different directions and you receive different dates. The night sky is a layered archive delivered at light speed.
            </p>
            <p className="archive-manifesto">A telescope does not only look farther. It looks earlier.</p>
          </div>

          <div className="archive-scale" aria-label="Examples of the different ages visible in the sky">
            <div>
              <span>Moon</span>
              <strong>Now - 1.28 seconds</strong>
            </div>
            <div>
              <span>Sun</span>
              <strong>Now - 8.35 minutes</strong>
            </div>
            <div>
              <span>Andromeda</span>
              <strong>Now - 2.5 million years</strong>
            </div>
            <div>
              <span>GN-z11</span>
              <strong>Now - 13.4 billion years</strong>
            </div>
          </div>
        </section>

        <section className="questions" id="questions" aria-labelledby="questions-title">
          <div className="questions-intro">
            <h2 id="questions-title">Where the simple rule bends.</h2>
            <p>The core idea is direct. The universe adds motion, expansion, and measurement uncertainty.</p>
          </div>

          <div className="question-list">
            <details>
              <summary>
                Are we seeing where an object is now?
                <CaretDown size={20} weight="regular" aria-hidden="true" />
              </summary>
              <p>
                Not exactly. You see where it was when the arriving light began its journey. Astronomers model motion to estimate current positions.
              </p>
            </details>
            <details>
              <summary>
                Why is the slider logarithmic?
                <CaretDown size={20} weight="regular" aria-hidden="true" />
              </summary>
              <p>
                The endpoints differ by about 17 powers of ten in light travel time. A linear control would crush the solar system into an invisible sliver.
              </p>
            </details>
            <details>
              <summary>
                Is GN-z11 simply 13.4 billion light-years away today?
                <CaretDown size={20} weight="regular" aria-hidden="true" />
              </summary>
              <p>
                Not in the simple ruler sense. Space expanded while the light traveled. TIMEFOLD uses light travel time, not present-day proper distance.
              </p>
            </details>
          </div>
        </section>

        <section className="sources" id="sources" aria-labelledby="sources-title">
          <div className="sources-heading">
            <h2 id="sources-title">Trace every number.</h2>
            <p>Distances are rounded for clarity. Primary references are from NASA Science.</p>
          </div>

          <div className="source-groups">
            {sourceGroups.map((group) => (
              <div className="source-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map(([label, url]) => (
                    <li key={url}>
                      <a href={url} target="_blank" rel="noreferrer">
                        {label}
                        <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <a className="wordmark" href="#top">TIMEFOLD<span aria-hidden="true">c</span></a>
          <p>An interactive field guide to the age of light.</p>
        </div>
        <a className="text-link" href="#top">Return to top</a>
      </footer>
    </>
  )
}

export default App
