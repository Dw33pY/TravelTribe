# Travel Tribe Vacations — Static Website (Root-Domain Build)

This folder is the complete Travel Tribe Vacations website compiled to
**plain HTML, CSS and JavaScript** — no server, no Node, no database required.
Host these files anywhere that can serve static files.

## What's inside

- `index.html` — the cinematic home page
- `about/` `services/` `destinations/` `safaris/` `contact/` — full content pages
- `_next/` — the compiled CSS, JS and fonts (do not delete)
- `images/` — all photography
- `404.html`, `robots.txt`, `sitemap.xml`, favicons, OG share image

## How to host it

**Any web host / your own domain (e.g. traveltribevacations.co.ke via cPanel,
Netlify, Vercel, Cloudflare Pages):**
upload the entire contents of this folder to your web root — done.

**GitHub Pages (username.github.io style, served from the repo root):**
push these files to your repository's `main` or `gh-pages` branch.

**To preview locally:** run `npx serve .` inside this folder (opening
`index.html` by double-click works in most browsers too, but a local server
is more reliable because assets use root-absolute paths).

## How the booking form works here

The Next.js (server) version of the site saves enquiries to a database.
This static version has no server, so the trip-planning form and the
newsletter automatically fall back to opening **WhatsApp / your email app**
with the enquiry pre-written — every lead still reaches +254 716 820629.

## Editing content

All copy (prices, phone numbers, destinations, reviews) lives in one file
in the source project: `src/lib/site-data.ts`. Change it there and re-run
`scripts/static-export.sh` to regenerate this folder.

> Note: prices and traveller statistics in the content are clearly-marked
> starting points — replace them with your verified figures before launch.
