# Muhammad Haim, portfolio

Next.js App Router, Tailwind v4, Motion, self-hosted Geist and Archivo. Five
routes, one dark theme, one accent. Static except the contact page and the
Resend inquiry route.

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
| `/contact` | CV download, WhatsApp, three engagement paths, inquiry form |
| `/privacy` | What the site collects and who handles it |
| `/api/inquiry` | Server route that validates and relays form submissions |

## Making the contact form send you email (Resend)

The form on `/contact` is live only when `RESEND_API_KEY` is set. Until then the
page shows email and WhatsApp buttons instead. It never pretends to send.

1. Sign up at [resend.com](https://resend.com) **with the same Gmail you want
   messages in** (muhammadhaim0786@gmail.com). Without a verified domain, Resend's
   test sender `onboarding@resend.dev` can only deliver to the account owner's email.
2. Resend dashboard > **API Keys** > Create API key (Sending access is enough).
3. Vercel > Project > **Settings > Environment Variables**: add
   `RESEND_API_KEY=re_...` for Production (and Preview if you want). Redeploy.
4. Send yourself a test from the live `/contact` page. Check spam the first time
   and mark it "Not spam".

Each message arrives with the visitor's address as **Reply-To**, so hitting reply
answers them directly. Locally, copy `.env.example` to `.env.local`.

Optional later: verify your own domain in Resend and set
`CONTACT_FROM_EMAIL="Portfolio <hello@yourdomain.com>"` for better deliverability.

The route (`src/app/api/inquiry/route.ts`) validates every field, escapes all
HTML, strips newlines from header fields, drops honeypot submissions, rate-limits
per IP (best effort, per serverless instance), and returns a real error instead of
a fake success if Resend is down. Provider error details go to the server log only.

## Deploy to Vercel

1. Push to GitHub.
2. vercel.com > **Add New > Project** > import the repo. Framework is detected.
3. Add `RESEND_API_KEY` (above), then deploy.
4. If you use a custom domain, set `NEXT_PUBLIC_SITE_URL` so Open Graph and
   canonical links use it. Otherwise Vercel's production URL is used automatically.

## Where the content lives

Everything visible comes from `src/content/resume.ts`. Nothing is hardcoded in
components.

| Key | Drives |
| --- | --- |
| `person` | Name, role, email, WhatsApp link, LinkedIn, CV path, hero copy |
| `figures` | The four numbers in the hero panel |
| `bio` | The About page paragraphs |
| `roles` | Experience on `/about`. First 3 render in full, the rest compact. Change `DETAILED` in `Experience.tsx`. |
| `work` | Case studies. Entry 0 is the feature cell. |
| `capabilities` | The bento grid. It tiles a 6x3 grid exactly, so adjust `placement` in `Capabilities.tsx` if you add or remove one. |
| `method` | The horizontal scroll row |
| `paths` | The three engagement cards on `/contact` |
| `inquiryTopics` | The form's subject dropdown. The API route reads the same list, so there is nothing to keep in sync. |
| `credentials` | Education, certifications, tools |
| `toolchain` | The logo rail, as `simple-icons` export names |

Replacing the CV: drop the new PDF in `public/` and update `person.cv` and
`person.cvName`.

## Design decisions worth knowing before you edit

- **One dark theme.** Near-black background, one acid-lime accent (`--accent`) and
  one olive glow (`--glow`), all defined in `globals.css`. There is no light mode.
- **Display type** is Archivo variable at weight 900 and width 125%, self-hosted
  from `@fontsource-variable/archivo` via `next/font/local`. Body stays Geist.
- **Shape rule.** Buttons and chips are full pills, cards use `--r-card` (22px),
  inputs use `--r-input` (14px).
- **Motion**: hero headline mask reveal and pointer-following glow (Motion values,
  no React state), count-up figures, sticky stacking work cards (Motion
  `useScroll`), spotlight card borders (CSS variables), CSS scroll-driven reveals.
  Everything collapses to static under `prefers-reduced-motion`.
- **Only one marquee** (the toolchain rail).
- **WhatsApp** is a floating button on every page plus a row in every contact block.

## Verified

axe-core (WCAG 2.0/2.1 A and AA) reports 0 violations on all five routes at
desktop and mobile widths. No horizontal overflow, one `h1` per route, no broken
anchors or internal links, no console errors, no content left invisible after
jumping to the bottom of the page.

## Stack

- Next.js App Router
- Tailwind v4 with CSS custom properties as the token layer
- `geist` for self-hosted Geist Sans and Geist Mono, no Google Fonts request
- `motion` for the hero, figures, and work stack
- `@phosphor-icons/react` for icons, `simple-icons` for brand marks
