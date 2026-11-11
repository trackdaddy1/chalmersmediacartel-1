# Plan

## Done (Nov 10, 2026 redesign, branch `redesign`)

- Rebuilt as a five-page site (Home, About, Services, Portfolio, Book) modeled on inthegymhoops.com's structure, in the Chalmers palette
- Client's new About story and Mission statement added verbatim to `about.html` (and excerpted on Home)
- `credentials.html` folded into About as `#credentials`; old URL redirects there
- Booking form rebuilt for Formspree with service preselect; shows an honest "not connected" message until the endpoint is set
- Portfolio and Latest Work render from `content.js` and stay hidden until real content exists
- Replaced the 10MB Instagram SVG and other logo images with inline icons; logo cropped and resized for web

## Must fix before this goes live

- **Placeholder team members**: Jordan Chalmers, Maya Torres, Andre Wells on `about.html` are not real people. Replace with the real crew (name, role, one line, ideally a headshot) or remove them. Note "Jordan Chalmers" also conflicts with the real founder, Carlos Chalmers.
- **Press kit PDF** (`docs/ChalmersMedia_PressKit.pdf`): page 2 "Contact Information" is still bracketed placeholders (`[Name / Title]`, `[Email Address]`, `[Phone Number]`, `[Website URL]`), and page 1 has the OLD mission statement. This PDF is what organizers download. Needs a regenerated version.
- **Insurance wording mismatch**: site says "Liability insurance carried for assignments"; press kit says "Liability insurance available upon request." Pick the true one (with carrier details if carried) and make both match.

## Needed from client

- **Inbox email** for booking requests: create the Formspree form, paste its URL into `formEndpoint` in `content.js`
- **Contact email**: `info@chalmersmediacartel.com` is shown on About and Book but has never been confirmed as real
- **Portfolio**: YouTube video links / Instagram post URLs, and photos (with category: sports, portraits, music)
- **Pricing**: services show "Pricing on request" until real prices are provided
- **Services review**: the six services were rebuilt from the old site's list plus the new About copy (recruiting highlights and portraits added; old "Sideline/Locker Room" and "Travel Storytelling" cards dropped, since the new About doesn't mention travel). Client should confirm the list and the deliverable bullets.
- **Who We Cover**: real league/program/event names (section removed until provided)
- **Coverage Experience**: confirm the four remaining lines are accurate
- **Testimonials**: real quotes with names/titles, if they want a testimonials section like the reference site
- **Hero photo/video**: optional background reel for the home hero (instructions in a comment in `index.html`)
- **YouTube/TikTok**: real profile URLs if/when they exist

## Cleanup (low priority)

- Unused files still in the repo: `instagram-logo.svg` (10MB), `facebook-logo.png`, `tiktok-logo.png`, `youtube-logo.png`, `chalmers-media-trans.png` (source for the cropped logo). Safe to delete once confirmed.
- `docs/ChalmersMedia_MediaVerificationPacket.pdf` is not linked anywhere. Decide whether to link it from Press & Credentials or remove it.
