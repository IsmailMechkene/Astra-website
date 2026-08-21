# Astra website

The landing page, documentation, policies, and Windows download experience for [Astra](https://github.com/IsmailMechkene/Astra).

## Stack

- vinext and React 19
- TypeScript and Vite
- Cloudflare Workers with static assets
- Lucide React icons

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The main routes are `/`, `/docs`, and `/policies`. Release metadata and the official installer URL are kept in `app/release.ts`.

## Deploy to Cloudflare

Import the repository as a **Cloudflare Worker** using these build settings:

```text
Production branch: main
Root directory: /
Build command: npm run build
Deploy command: npx wrangler deploy --config dist/server/wrangler.json
```

For a manual deployment after authenticating Wrangler:

```bash
npm run deploy
```

The Worker configuration is stored in `wrangler.jsonc`.
