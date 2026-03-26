## feat: setup — `<TransactionTimeline>` — Chronological trade events

Closes #39

---

### Summary

Implements the `TransactionTimeline` component — a vertical sidebar timeline that renders the chronological sequence of events in a trade lifecycle.

---

### What's changed

**New files**

- `src/components/trade/TransactionTimeline.tsx` — container component; maps `TransactionEvent[]`, applies flex layout to stretch vertically down the sidebar, and algorithmically derives `status` per event from `currentEventIndex`.
- `src/components/trade/TimelineEventItem.tsx` — molecule; renders a single event row with a status node (completed / active / pending), actor label, title, timestamp, and optional description.

**Modified files**

- `src/types/trade.ts` — added `TransactionEvent`, `TransactionEventStatus`, `TransactionEventActor` types; extended `TradeDetail` with optional `transactionTimeline` and `currentTransactionIndex` fields.
- `src/components/trade/index.ts` — exported `TimelineEventItem` and `TransactionTimeline`.
- `src/components/trade/TradeDetailPanel.tsx` — integrated `TransactionTimeline` into the sidebar column; moved `TradeTimeline` to the main column.
- `src/app/assets/[id]/page.tsx` — added `transactionTimeline` mock data covering all 6 lifecycle events with `currentTransactionIndex: 3` (In Transit active).

---

### Trade event sequence

| #   | Event                         | Actor  |
| --- | ----------------------------- | ------ |
| 1   | Trade Created                 | System |
| 2   | Funds Deposited               | Buyer  |
| 3   | Goods Dispatched              | Seller |
| 4   | **In Transit** ← active       | Driver |
| 5   | Delivery Confirmed / Disputed | Buyer  |
| 6   | Funds Released / Refunded     | System |

---

### Requirements checklist

- [x] Maps `TransactionEvent[]` over `TimelineEventItem` instances
- [x] Wraps in `flex flex-col flex-1` to stretch down sidebar vertically
- [x] `resolveStatus(index, currentEventIndex)` algorithmically injects `status="active"` to the current child; `"completed"` to prior; `"pending"` to future

---

### Pipeline / Build proof

<!-- ATTACHMENT: paste a screenshot of the successful `npm run build` output or the CI pipeline run here -->

![Build output]()

> **How to get the attachment:**
>
> 1. In your terminal, run `cd frontend && npm run build`.
> 2. Take a screenshot of the terminal showing the `✓ Compiled successfully` and `✓ Finished TypeScript` lines plus the route table at the end.
> 3. Alternatively, push this branch and open the PR — GitHub Actions will run the pipeline. Take a screenshot of the green checkmark on the Actions tab.
> 4. Paste the screenshot above in place of the empty `![]()`.

---

### Screenshots (UI)

<!-- ATTACHMENT: paste a screenshot of the /assets/[id] page showing the TransactionTimeline in the right sidebar -->

![TransactionTimeline UI]()

> **How to get the UI screenshot:**
>
> 1. Run `cd frontend && npm run dev`.
> 2. Open `http://localhost:3000/assets/AMN-4920-X` in your browser.
> 3. The right sidebar will show the **Transaction Timeline** card with 6 events, "In Transit" highlighted as active.
> 4. Take a screenshot and paste it above.
