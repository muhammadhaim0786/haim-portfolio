# Muhammad Haim, portfolio

Next.js App Router, Tailwind v4, self-hosted Geist, five routes, one accent,
one corner radius, light and dark. Static except the contact page and the
inquiry relay.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero, toolchain rail, work index, capabilities, working method, CTA |
| `/work` | The three case studies in full |
| `/about` | Portrait, bio, all five roles, education, certifications |
| `/contact` | CV download, three engagement paths, inquiry form |
| `/privacy` | What the site collects and who handles it |
| `/api/inquiry` | Server route that validates and relays form submissions |

## Making the inquiry form send you email

The form is live only when `CONTACT_ENDPOINT` is set. Until then `/contact`
shows the direct email details instead. It never pretends to send.

Pick one provider:

**Formspree** (free account at formspree.io, 50 submissions a month)

```
CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

**Web3Forms** (no account, they email you an access key at web3forms.com)

```
CONTACT_ENDPOINT=https://api.web3forms.com/submit
CONTACT_ACCESS_KEY=your-access-key
```

Add these in Vercel under **Project Settings > Environment Variables**, then
redeploy. Locally, put them in `.env.local` (see `.env.example`).

The key is read server side inside `/api/inquiry`, so it never reaches the
browser bundle. That route also validates every field, drops anything that
fills the hidden honeypot, and returns a real error rather than a fake success
when the provider is down.

## Deploy to Vercel

1. Push to GitHub.
2. vercel.com > **Add New > Project** > import the repo. Framework is detected.
3. Add the `CONTACT_*` variables above, then deploy.
4. Set your real domain in `metadataBase` in `src/app/layout.tsx` and push again,
   so Open Graph and canonical links resolve.

## Where the content lives

Everything visible comes from `src/content/resume.ts`. Nothing is hardcoded in
components.

| Key | Drives |
| --- | --- |
| `person` | Name, role, contact details, CV path, hero copy |
| `figures` | The four numbers in the hero panel |
| `bio` | The About page paragraphs |
| `roles` | Experience on `/about`. First 3 render in full, the rest compact. Change `DETAILED` in `Experience.tsx`. |
| `work` | Case studies. Entry 0 is the feature cell. |
| `capabilities` | The bento grid. It tiles a 6x3 grid exactly, so adjust `placement` in `Capabilities.tsx` if you add or remove one. |
| `method` | The horizontal scroll row |
| `paths` | The three engagement cards on `/contact` |
| `inquiryTopics` | The form's subject dropdown. Keep in sync with `TOPICS` in `src/app/api/inquiry/route.ts`. |
| `credentials` | Education, certifications, tools |
| `toolchain` | The logo rail, as `simple-icons` export names |

Replacing the CV: drop the new PDF in `public/` and update `person.cv` and
`person.cvName`.

## Design decisions worth knowing before you edit

- **One accent.** Burnt orange, defined once as `--accent` in `globals.css`. A
  second accent color is the fastest way to make this look generic.
- **One corner radius.** `--r` is 2px and applies to buttons, cards and inputs
  alike.
- **Two themes, one page.** Both are token sets. Picked from
  `prefers-color-scheme`, overridable by the toggle, stored in `localStorage`.
  No section ever inverts against the page theme.
- **No eyebrows.** No uppercase tracking label above any section heading. The
  section's position on the page already says what it is.
- **Scroll reveal is CSS only** (`src/components/Reveal.tsx` plus the `.reveal`
  rule in `globals.css`). It uses `animation-timeline: view()`, which is
  computed from scroll position every frame. The earlier IntersectionObserver
  version could drop a callback during a fast fling or an End keypress and
  leave content at opacity 0 permanently; this version cannot, and browsers
  without support just render the content plainly.
- **Motion respects `prefers-reduced-motion`** everywhere, including the logo
  rail and the reveals.

## Verified

axe-core (WCAG 2.0 and 2.1, A and AA, plus best-practice) reports 0 violations
on all five routes in both themes. No horizontal overflow, one `h1` per route,
no content left invisible after a jump to the bottom of the page. Lighthouse
desktop scored 100 across performance, accessibility, best practices and SEO.

## Stack

- Next.js App Router
- Tailwind v4 with CSS custom properties as the token layer
- `geist` for self-hosted Geist Sans and Geist Mono, no Google Fonts request
- `motion` for the hero entry sequence only
- `@phosphor-icons/react` for icons, `simple-icons` for brand marks
