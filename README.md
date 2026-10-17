# Bánh Bánh

A speculative redesign of [banhbanh.com](https://www.banhbanh.com) for Bánh Bánh, 326 Coldharbour Lane, Brixton, and Little Bánh Bánh, 170 Fleet Street.

It is a front-end demo with static data. Booking, group, and catering forms are mock-ups that end on a confirmation screen, and nothing is sent anywhere.

Live: https://alexwilder-dev.github.io/banh-banh/

## Stack

- Vite, React, TypeScript, Framer Motion
- HashRouter, so it works on GitHub Pages under `/banh-banh/`
- Oswald and Crimson Pro, the restaurant's own pair, self-hosted with Vietnamese subsets

## Where things live

- `src/data/restaurant.ts`: the Brixton and Little Bánh Bánh menus, hours, addresses, contact details, links, and press lines. Edit this file to change what the site says.
- `src/components/marks.tsx`: the wordmark and badge, traced from the restaurant's artwork.
- `src/assets/photos/`: web sizes of the restaurant's photography. Two photos are Anton Rodriguez's, taken for We Heart, and are credited where they're used.
- `research/notes.md`: research, sources, conflicts found, and design reasoning.

## Scripts

```sh
npm install
npm run dev        # local dev server
npm run build      # type-check and build to dist/
npm run images -- <folder of original photos>   # regenerate src/assets/photos
npm run og -- <original dining-room photo>      # regenerate public/og.jpg and favicons
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`. To turn this on, go to Settings → Pages and set Source to "GitHub Actions".

Site by AlexWilder-Dev.
