This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
## Visual Regression Testing

This frontend includes a Playwright visual regression suite targeted at the primary UI flows most likely to change.

Run the suite locally:

```bash
npm run test:visual
```

Update snapshots when UI changes are intentional:

```bash
npm run test:visual:update
```

If Jest resolves multiple config files, use the explicit config with:

```bash
npm test
```

Snapshot coverage includes:
- Landing page at mobile and desktop breakpoints
- Trades page render state

## Privacy-First Analytics Instrumentation

A privacy-safe analytics wrapper has been added under `src/lib/analytics.ts`.
It masks sensitive fields such as emails, wallet addresses, tokens, and IP-like values before any event is sent.

The analytics layer supports:
- `trackEvent(eventName, payload)` for generic event tracking
- `trackFunnelStep(step, metadata)` for funnel step transitions
- `trackFailure(errorType, metadata)` for UI errors
- `trackApiFailure(endpoint, status, metadata)` for API failures
- `trackAuthEvent(step, status, metadata)` for auth flows

By default, analytics events are only logged to the browser console in non-production environments.
To enable a provider, set `NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible` or `NEXT_PUBLIC_ANALYTICS_PROVIDER=custom`.
When using a custom backend, also set `NEXT_PUBLIC_ANALYTICS_ENDPOINT` to a privacy-safe ingest URL.

> NOTE: The analytics wrapper scrubs PII from payloads before any provider can receive it.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
