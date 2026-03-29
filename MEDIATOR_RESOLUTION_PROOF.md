# Mediator Resolution Panel - Phase 3 Proof

Date: 2026-03-28
Route: `/mediator/disputes/[id]`

## Implemented semantic fixes

1. Contract call switched from `initiate_dispute` to `resolve_dispute`.
2. Resolution call now uses contract signature:
   - `resolve_dispute(trade_id: u64, mediator: Address, seller_gets_bps: u32)`
3. Loss-ratio action mapping:
   - `Resolve 50/50 On-Chain` => `seller_gets_bps = 5000`
   - `Resolve 70/30 On-Chain` => `seller_gets_bps = 7000`
4. Guard added to ensure URL id is numeric and valid for on-chain `trade_id`.
5. Mediator gating remains strict via Freighter identity + wallet whitelist.

## Pipeline / command evidence

Run from `frontend/`:

```powershell
npx eslint "src/app/mediator/disputes/**/*.{ts,tsx}"
```

Result:

- Pass (no lint output for mediator disputes files).

```powershell
npx tsc --noEmit
```

Result:

- Fails due to pre-existing unrelated files, not mediator page changes.
- Current errors:
  - `src/app/dev-test/page.tsx` (missing `Spinner`, `LoadingState` symbols)
  - `src/components/ui/FormField.tsx` (React `cloneElement` typing mismatch)

## Screenshot checklist (attach to PR)

1. Mediator wallet connected and authorized badge visible. (mediator-panel-full.png)
2. Unauthorized wallet state showing access blocked. (mediator-unauthorized.png)
3. Video panel rendering with Pinata gateway label and player controls. (video-playback-primary.png)
4. Playback fallback / gateway switch UI after a failed gateway. (video-playback-fallback.png / gateway-switch.png)
5. Resolution controls with presets visible (50/50, 70/30) and confirmation modal. (resolution-presets.png / resolution-confirm.png)
6. Transaction signing via Freighter and pending state. (freighter-sign.png / tx-pending.png)
7. Transaction success showing tx hash / link (tx-success.png) and failure state (tx-error.png).
8. Optional mobile narrow viewport layout (mediator-panel-mobile.png) and short evidence clip (evidence-clip.mp4).

## Capture steps (quick)

1. Start the app from `frontend/`:

```powershell
cd frontend
npm install
npm run dev
```

2. Create `.env.local` with the environment variables listed earlier and ensure Freighter is installed and logged into a mediator address from `NEXT_PUBLIC_MEDIATOR_WALLETS`.

3. Open the route `/mediator/disputes/123` in your browser and reproduce the UI states below. Use an incognito window or a different Freighter account for the unauthorized state.

4. Capture screenshots using the browser or OS tools. For extracted thumbnails from a short recorded clip use `ffmpeg`:

```powershell
ffmpeg -i evidence-clip.mp4 -ss 00:00:02 -vframes 1 evidence-thumb.png
```

## PR attachment guidance

Place the images under `frontend/public/screenshots/mediator-resolution/` and reference them in the PR description or this proof file using relative links. Example markdown snippet to include in the PR:

```
![Mediator panel full](/screenshots/mediator-resolution/mediator-panel-full.png)
![Unauthorized](/screenshots/mediator-resolution/mediator-unauthorized.png)
![Video playback primary](/screenshots/mediator-resolution/video-playback-primary.png)
```

## Notes

- If you encounter CORS/latency for a gateway, use the gateway switch control in the UI to retry with the fallback gateway before capturing.
- Use the device toolbar in Chrome/Edge devtools to capture mobile layouts.

## Notes for reviewers

- Full repo typecheck is currently red for unrelated pre-existing issues.
- Mediator resolution path itself is wired to the correct on-chain method and argument semantics.
