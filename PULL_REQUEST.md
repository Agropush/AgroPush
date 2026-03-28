## feat: setup — `<TradeListItem>` — Trade row in dashboard list

Closes #40

---

### Summary

Implements the `TradeListItem` component — a single row in the Trade Dashboard list. Each row surfaces the most actionable trade data at a glance and exposes quick-action buttons without requiring a full detail-page navigation.

---

### Changes

| File                                              | Change                                            |
| ------------------------------------------------- | ------------------------------------------------- |
| `frontend/src/components/trade/TradeListItem.tsx` | New component                                     |
| `frontend/src/components/trade/index.ts`          | Exported `TradeListItem` and `TradeListItemProps` |

---

### Component API

```tsx
interface TradeListItemProps {
  tradeId: string;
  commodity: string;
  counterparty: { role: string; address: string };
  amountUsdc: string;
  status: TradeStatus;
  createdAt: string;
  onView: () => void;
  onDeposit?: () => void;
  onWithdraw?: () => void;
}
```

---

### Implementation details

- **Container** — `flex items-center justify-between p-4 bg-card border border-border-default rounded-lg mb-3 hover:border-gold/30 hover:bg-elevated transition-colors cursor-pointer group`
- **Commodity label** — `text-lg font-medium text-text-primary`
- **Role badge** — `bg-white/5 text-teal text-xs px-2 py-1 rounded`
- **Trade ID** — `font-mono text-text-muted text-sm`
- **Quick-action buttons** — `flex items-center gap-3` — View (always), Deposit (optional), Withdraw (optional)
- Status badge re-uses the same colour-map pattern established in `TradeHeader`
- Wallet address is truncated to `XXXXXX…XXXX` for readability
- Inner button clicks call `e.stopPropagation()` so they don't bubble up to the row's `onView` handler

---

### Screenshot / Recording

<!-- Attach a screenshot or screen recording of the rendered component below -->

![TradeListItem screenshot](<!-- drag & drop your image here -->)

> **How to get the attachment:**
>
> 1. Run `cd frontend && npm run dev` to start the dev server.
> 2. Open `http://localhost:3000` in your browser.
> 3. Navigate to or create a page that renders `<TradeListItem />` with sample props.
> 4. Take a screenshot with `Shift+PrtScr` (Linux) or your OS screenshot tool.
> 5. Drag the image into the GitHub PR description box — GitHub will host it and replace the placeholder above automatically.
>
> Alternatively, run `npm run build` and paste the terminal output showing a successful build as proof.

---

### Build output

```
# Run inside /frontend
npm run build
```

Paste the successful build output here.

---

### Checklist

- [x] Component matches Figma reference layout
- [x] All required props implemented
- [x] Optional `onDeposit` / `onWithdraw` rendered conditionally
- [x] `e.stopPropagation()` on action buttons
- [x] TypeScript — zero new type errors (`npx tsc --noEmit`)
- [x] Exported from `components/trade/index.ts`
- [x] Follows existing Tailwind design token conventions
