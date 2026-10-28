# Shotsmith website

Landing page for Shotsmith, a Mac app for capturing, annotating, and automating screenshots. Built on the MIT-licensed [Finwise](https://github.com/nexi-launch/finwise-landing-page) template (Next.js + Tailwind CSS).

## Editing content

All copy lives in `src/data`:

- `siteDetails.ts` — name, metadata, download URL, Lemon Squeezy checkout URL, support email
- `hero.ts`, `benefits.tsx`, `pricing.ts`, `faq.ts`, `cta.ts`, `footer.ts`, `menuItems.ts`

The product screenshots in `public/images` (`hero-editor.webp`, `feature-*.webp`) and the pin demo video (`feature-pin.mp4`, with `feature-pin.webp` as its poster) are rendered from the app's real windows by `scripts/render-marketing.sh` in the app repo. Re-run it after UI changes:

```bash
scripts/render-marketing.sh ../shotsmith-website/public/images
```

## Post-purchase activation

`public/activate.html` is the page Lemon Squeezy redirects to after checkout (`/activate.html?key=[license_key]`). It opens `shotsmith://activate?key=…` so the app activates itself. It's served as a static file, outside the Next.js pages.

## Development

```bash
npm install
npm run dev
```

The production URL comes from `NEXT_PUBLIC_SITE_URL`, or from Vercel's `VERCEL_PROJECT_PRODUCTION_URL` when deployed on Vercel.
