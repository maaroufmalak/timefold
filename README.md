# TIMEFOLD

TIMEFOLD is a Vite and React information site about light travel time. Its central instrument lets a reader move from the Moon to GN-z11 and see how distance turns every observation into a view of the past.

## Concept

The page is built around one claim: you have never seen the present. Even moonlight takes more than a second to arrive. Sunlight takes more than eight minutes. Deep-space observations can carry light that traveled for billions of years.

The distance range spans about 17 powers of ten, so the slider uses a logarithmic scale. This keeps the Moon, nearby stars, galaxies, and the early universe usable in one control. Destination presets snap the instrument to exact reference points while the range input supports continuous exploration.

## Design system

- Near-black and silver theme tokens with one restrained coral accent
- Square editorial surfaces and controls
- Circular geometry reserved for the light lens and range thumb
- Asymmetric desktop compositions that become a strict single column on small screens
- Native CSS with no utility framework
- Phosphor Icons as the only icon family
- Motion limited to hierarchy, state feedback, and lens depth changes
- System-aware light and dark themes with a manual toggle

## Hero asset

The hero references:

```text
public/images/timefold-hero.webp
```

The file can be added without changing any component code. Layered CSS backgrounds provide a complete fallback when the image is not present, so local development and production builds remain functional.

Recommended image shape: square, at least 1600 by 1600 pixels, WebP.

## Science data

Values are rounded for a general audience. Light time for the Moon is calculated from NASA's average Earth to Moon distance and NASA's listed speed of light. The source links are also available inside the interface.

- [NASA Moon facts](https://science.nasa.gov/moon/facts/)
- [NASA Earth facts and one-way light time](https://science.nasa.gov/earth/facts/)
- [NASA light-year explainer](https://science.nasa.gov/exoplanets/what-is-a-light-year/)
- [NASA spaceflight glossary](https://science.nasa.gov/learn/basics-of-space-flight/glossary/)
- [NASA Sirius reference](https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/)
- [NASA Orion Nebula reference](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/)
- [NASA Andromeda reference](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/)
- [NASA Hubble GN-z11 reference](https://science.nasa.gov/missions/hubble/hubble-team-breaks-cosmic-distance-record/)

At cosmological distances, light travel time is not the same as present-day proper distance. The GN-z11 copy calls out this distinction directly.

## Accessibility

- Semantic landmarks and heading order
- Skip link and labeled primary navigation
- Native range input with live value text
- Preset buttons with pressed states
- Keyboard support through native controls
- Visible focus treatments
- Mobile navigation with Escape key support
- Reduced-motion support
- Reduced-transparency fallback
- Theme contrast designed for both color schemes

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
npm run preview
```

The production output is written to `dist/`.

## Deployment

The project is a standard static Vite build. On Vercel, use the Vite framework preset, `npm run build` as the build command, and `dist` as the output directory.
