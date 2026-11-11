# Chalmers Media Cartel: Project Context

## Purpose

As of November 2026 this is a portfolio and booking site for Chalmers Media (sports, recruiting, and lifestyle photo/video), modeled loosely on the structure of inthegymhoops.com but in the Chalmers navy + lime palette. Families, athletes, coaches, and creators should be able to see the work, understand the services, and request a shoot.

It still has a second audience: event organizers verifying the team before granting press passes. That content lives in the **Press & Credentials** section at `about.html#credentials`, which is the link the client pastes into credential applications. `credentials.html` is now just a redirect to that anchor so older links keep working. Never rename that `id`.

See `GOALS.md` for what "done" means and `PLAN.md` for the punch list and what's still needed from the client.

## Accuracy rule (important)

Never add, infer, or "fill in" a credential, insurance claim, client name, price, testimonial, portfolio item, or experience stat that the client hasn't confirmed. Organizers still check this site before credentialing the client, and parents will hold them to what it says. If a section is missing real content, leave it out (or let it stay hidden) and add it to `PLAN.md` instead of guessing.

Known exception: the three team members after Carlos Chalmers on `about.html` (Jordan Chalmers, Maya Torres, Andre Wells) are placeholder people from the original build, kept at J-Will's request on 2026-11-10. They must be replaced before the client relies on the site. See `PLAN.md`.

## Brand naming

The logo and the client's own About/Mission copy say **Chalmers Media**, so that's the display name across the site. The press kit PDF, the Instagram handle, the domain/repo, the footer copyright, and the Press & Credentials section use **Chalmers Media Cartel**. Keep the credentials section matching whatever the press kit PDF says.

## Stack

Flat static site, no build step, no framework. Open any `.html` file directly in a browser to preview (the Formspree form needs a real server/URL to actually send).

- `index.html`: Home. Hero, Who We Are, services preview, Latest Work (videos, hidden until content.js has some), CTA band
- `about.html`: client's About story + Mission, team, Press & Credentials (`#credentials`)
- `services.html`: six service cards, each with a "Book this" link to `book.html?service=<slug>`
- `portfolio.html`: videos + filterable photo gallery with a lightbox, all rendered from `content.js`; shows an "being updated, see Instagram" empty state when there's nothing yet
- `book.html`: booking/inquiry form (Formspree), preselects the service from the `?service=` query
- `credentials.html`: meta-refresh redirect to `about.html#credentials`
- `content.js`: **the one file to edit for new work**: `videos` (YouTube IDs / Instagram URLs), `photos`, and `formEndpoint`
- `main.js`: shared behavior (mobile nav, video embeds, gallery/filters/lightbox, form validation + submit). Every block checks its elements exist, so it's safe on every page
- `styles.css`: all styles; palette and fonts are CSS variables at the top. Fonts: Montserrat (headings, matches the logo) + Inter (body) from Google Fonts
- `chalmers-logo.png` (cropped, web-sized logo) and `film-reel.png` (reel graphic used in the hero and as favicon), both cut from the original `chalmers-media-trans.png`
- `docs/`: press kit PDF (linked) and media verification packet PDF (not currently linked)
- Source: `github.com/realjwill/chalmersmediacartel` (**public** repo). The git repo root is this folder, so `index.html` is at the repo root. Work in progress is on the `redesign` branch.
- **Hosting: NOT deployed anywhere** (verified 2026-11-10): no Vercel project in J-Will's account is linked to this repo, GitHub Pages is off, the repo has no deployment records, and `chalmersmediacartel.com` has no DNS. Don't describe it as live until that changes. When a Vercel project is created: Framework Preset "Other", Root Directory blank (repo root), no build command. Client site: pushing needs J-Will's confirmation

## Conventions

- **Header/footer are duplicated in every page** (no partials). If you change the nav or footer, change it in all five pages. Each page marks its own nav link with `aria-current="page"`.
- **Service slugs** (`recruiting`, `game-coverage`, `portraits`, `tournaments`, `social-reels`, `music-creators`, plus `credential` and `not-sure` in the form only) must match across the services page links, the home page links, and the `<option value>`s in `book.html`.
- **Photo categories** in `content.js` are `sports`, `portraits`, `music` (labels live in `CATEGORY_LABELS` in `main.js`). Filter buttons are built only for categories that have photos.
- **Form**: until `formEndpoint` is set, submitting shows an honest "not connected yet, nothing was sent" message. Never reintroduce a fake success message.
- **YouTube** embeds are "lite": thumbnail first, real player (youtube-nocookie) loads on click. Instagram embeds load Instagram's script only if an Instagram item exists.
- **Social links**: only link to profiles that are real and live.
- **Scroll animations** (Home, Services, and Portfolio pages; About and Book intentionally static so the story text and the form stay calm; modeled on the reference site's Elementor entrance effects: headings slide in from the left, the Who We Are pair slides in from left/right, service tiles and videos zoom in): add `data-reveal="up|left|right|zoom"` to an element, or `data-reveal-stagger="zoom"` to a grid. A page using them needs the one-line `document.documentElement.classList.add('js')` script in its `<head>` (see `index.html`); without it the attributes are harmless and content just shows without animating. Respects the OS "reduce motion" setting.
