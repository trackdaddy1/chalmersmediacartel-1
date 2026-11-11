# Goal

The client asked (November 2026) for a site similar to inthegymhoops.com: a portfolio and booking site that shows off the work, lays out services, and makes it easy to request a shoot. It keeps the Chalmers navy + lime palette and stays a flat static site.

Press-credential verification is still a job this site has to do, but it's now one section (`about.html#credentials`) instead of its own page.

## What "done" looks like for this version

- Real portfolio work on the site (videos in Latest Work and the Portfolio page, photos in the gallery)
- The booking form delivers to the client's inbox (Formspree endpoint set in `content.js`)
- No placeholder text, placeholder people, or dead links anywhere
- Every claim (services, insurance, experience, team) is something the client can stand behind
- The press kit PDF linked from the site is current and has no placeholders

## Explicitly not goals right now

- Online payments / pay-at-booking (decided 2026-11-10: inquiry form only)
- Live auto-updating social feeds (decided: hand-picked embeds in `content.js`)
- A news/blog section or merch store
- Migrating off vanilla HTML/CSS/JS
