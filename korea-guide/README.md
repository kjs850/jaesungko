# Somewhere in Korea — Seoul field guide

An English first-timer’s guide to Seoul, built from a locally reviewed copy of the Seoul Tourism Organization’s `2025 Seoul Tourist Guide`.

The site includes:

- a Seoul overview and six-area neighborhood sketch;
- 18 editorially summarized places with Korean names and source pages;
- interest, neighborhood, and text filters;
- browser-local saved places and preparation checklist;
- first-visit and practical essentials guides;
- print layout for a saved trip;
- original SVG illustrations instead of material copied from the source PDF.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run typecheck
npm test
npm run build
```

The browser test expects a production server on port 3100:

```bash
npm run start -- --port 3100
npm run test:browser
```

If Playwright cannot find a browser, set `CHROMIUM_PATH` to an installed Chromium executable for that command.

## Deploy to Vercel

Create a Vercel project from this repository and set its **Root Directory** to `korea-guide`.

Set `NEXT_PUBLIC_SITE_URL` to the production origin, without a trailing slash. This value is used for the generated sitemap. The app otherwise has no required secrets, database, account system, analytics, or external runtime API.

Every route is statically generated except browser-only local interactions. Preview deployments can be reviewed without changing production.

## Source and editorial limits

The source PDF is referenced by its official URL and is not copied into this project. Place facts and page references were checked against the user-provided local PDF on September 13, 2026. Current venue hours, prices, admission, accessibility, and reservations were deliberately omitted unless users are directed to recheck official sources.

The source publication states that unauthorized use of its contents is prohibited. Do not copy its photos, maps, or prose into this project without permission. The illustrations and neighborhood sketch in this implementation are original and conceptual.
