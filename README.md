# Muhammad Haim, portfolio

A single-page portfolio for a Quality Engineer. Next.js App Router, Tailwind v4,
self-hosted Geist, zero runtime CSS-in-JS, static output.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel

Option A, from the dashboard:

1. Push this folder to a GitHub repo.
2. On vercel.com choose **Add New > Project**, import the repo.
3. Framework preset is detected as Next.js. No environment variables, no build
   overrides, nothing to configure. Click **Deploy**.

Option B, from the terminal:

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

After the first deploy, set the production URL in `src/app/layout.tsx`
(`metadataBase`) so Open Graph and canonical links resolve correctly.

## Where the content lives

Everything visible on the page comes from one file: `src/content/resume.ts`.
Edit that and the whole site updates. Nothing is hardcoded in the components.

| Key | Drives |
| --- | --- |
| `person` | Name, role, contact details, hero headline and subline |
| `figures` | The four numbers in the hero panel |
| `roles` | Experience section. First 3 entries render in full, the rest in the compact "Earlier" block. Change `DETAILED` in `src/components/Experience.tsx` to move the cut. |
| `work` | Selected work. Entry 0 is the feature cell, the rest are supporting cells. |
| `capabilities` | The bento grid. It tiles a 6x3 grid exactly, so if you add or remove an item, adjust `placement` in `src/components/Capabilities.tsx`. |
| `method` | The horizontal scroll row |
| `credentials` | Education, certifications, tools |
| `toolchain` | The logo rail. Values are `simple-icons` export names. |

## Adding the Playwright logo

`simple-icons` does not ship a Playwright mark, so Playwright is given
typographic prominence in the Automation capability cell instead of appearing
in the logo rail. If you want it in the rail:

1. Drop the official SVG at `public/brand/playwright.svg`.
2. In `src/components/Toolchain.tsx`, render an `<img src="/brand/playwright.svg" />`
   alongside the mapped marks.

## Design decisions worth knowing before you edit

- **One accent.** Burnt orange, defined once as `--accent` in `globals.css` and
  used nowhere else in a different hue. Adding a second accent color is the
  quickest way to make this look generic.
- **One corner radius.** `--r` is 2px and applies to buttons, cards, and inputs
  alike. Mixed radii read as broken.
- **Two themes, one page.** Light and dark are both defined as token sets. The
  theme is picked from `prefers-color-scheme`, overridable by the toggle, and
  stored in `localStorage`. No section ever inverts against the page theme.
- **Reveal on scroll never hides content permanently.** `src/components/Reveal.tsx`
  renders visible on the server and only hides an element on the client, before
  paint, when it starts below the fold and motion is allowed. Failed hydration,
  disabled JS, or a resize cannot leave anything invisible.
- **Motion respects `prefers-reduced-motion`** everywhere, including the logo rail.

## Stack

- Next.js (App Router, static prerender)
- Tailwind v4 with CSS custom properties as the token layer
- `geist` for self-hosted Geist Sans and Geist Mono, no Google Fonts request
- `motion` for the hero entry sequence only
- `@phosphor-icons/react` for icons, `simple-icons` for brand marks
