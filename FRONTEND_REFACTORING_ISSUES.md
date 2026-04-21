# Frontend Refactoring Issues (Figma Alignment)

Date: 2026-04-21
Context: Refactoring pass based on implemented frontend review versus current design direction.

## Confirmed Correctly Implemented

- Dark green plus gold visual direction is implemented and consistent with product identity.
- Sidebar navigation structure is implemented and functional.
- Trades screen contains required status filters: All, Active, Pending, Completed, Disputed.
- Trades screen includes the Create Trade primary action in the expected area.
- Empty-state handling exists when no trades are returned.
- Trade table and status chips are implemented for populated states.

## Flagged Gaps (Needs Refactor)

- Duplicate header and shell layers are rendered on Trades.
- Shell composition is inconsistent between Trades and Create Trade flows.
- Typography usage is inconsistent with design token intent.
- Root page remains template-like and not product-aligned.
- Spacing and container alignment rhythm is inconsistent across chrome and content.
- Navigation active and hover states are not fully unified.
- Surface and border token usage is mixed and not fully standardized.
- Empty state hierarchy and guidance can be improved.

---

## FE-REF-001 - Refactor to Single App Shell on Trades

Description:
Refactor the Trades experience to use one canonical app shell only. Remove duplicate header and navigation layers so the page structure matches the intended product layout.

Requirements and Context:
- This is a frontend refactoring issue (Priority: P0).
- Scope includes layout unification between app chrome and Trades content.
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Affected files:
	- frontend/src/app/layout.tsx
	- frontend/src/components/Shell.tsx
	- frontend/src/app/trades/page.tsx

Acceptance Criteria:
- [ ] Trades renders with exactly one top-level app chrome.
- [ ] No duplicate logo/title/nav bars remain.
- [ ] Sidebar, top bar, and content alignment are consistent.

Deliverables:
- [ ] Implementation of the above criteria.
- [ ] Proof of correct behavior (screenshots and/or QA notes).

NOTE:
This issue will not be reviewed or approved without screenshot evidence demonstrating that duplicate shell/header layers were removed.

Suggested Execution:
1. Remove page-level shell duplication from Trades route.
2. Keep only canonical app layout chrome.
3. Validate spacing/alignment against Figma.

Guidelines:
- Follow existing frontend conventions.
- Keep refactor scoped to layout concerns.
- Add before/after screenshots in PR.

---

## FE-REF-002 - Unify Navigation States Across App Chrome

Description:
Refactor sidebar, top nav, and tab interactions so active, hover, and focus states are visually and behaviorally consistent.

Requirements and Context:
- This is a frontend refactoring issue (Priority: P0).
- Scope covers interaction consistency and accessibility for navigation.
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Affected files:
	- frontend/src/components/layout/AppTopNav.tsx
	- frontend/src/components/layout/SideNavBar.tsx
	- frontend/src/app/trades/page.tsx

Acceptance Criteria:
- [ ] Active states use one consistent visual pattern.
- [ ] Hover and focus treatments are consistent and keyboard-visible.
- [ ] No conflicting styles remain between nav regions.

Deliverables:
- [ ] Implementation of the above criteria.
- [ ] Proof of correct behavior (screenshots and/or QA notes).

NOTE:
This issue will not be reviewed or approved without screenshots showing default, hover, active, and focus states.

Suggested Execution:
1. Define one navigation state pattern from Figma.
2. Apply to sidebar, top nav, and trades tabs.
3. Verify keyboard navigation and visual parity.

Guidelines:
- Preserve existing routing behavior.
- Do not regress accessibility.
- Add state screenshots in PR.

---

## FE-REF-003 - Standardize Typography Tokens and Hierarchy

Description:
Refactor typography usage so headings, body text, metadata, and nav labels follow one consistent tokenized hierarchy.

Requirements and Context:
- This is a frontend refactoring issue (Priority: P1).
- Scope covers token usage and hierarchy consistency.
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Affected files:
	- frontend/src/app/layout.tsx
	- frontend/src/app/globals.css
	- frontend/src/components/TopNav.tsx
	- frontend/src/app/trades/page.tsx

Acceptance Criteria:
- [ ] Typography uses approved tokenized families and sizes.
- [ ] Heading/body/supporting hierarchy is coherent.
- [ ] Unintended fallback stack usage is removed.

Deliverables:
- [ ] Implementation of the above criteria.
- [ ] Proof of correct behavior (screenshots and/or QA notes).

NOTE:
This issue will not be reviewed or approved without screenshots that clearly show typography hierarchy before and after.

Suggested Execution:
1. Audit and map current typography to Figma scale.
2. Update tokens and component usage.
3. Verify hierarchy in top nav and trades views.

Guidelines:
- Use token-driven classes only.
- Avoid ad-hoc font overrides.
- Attach close-up typography screenshots in PR.

---

## FE-REF-004 - Refactor Spacing and Layout Grid Consistency

Description:
Refactor spacing and grid alignment across app bars, sidebar, content gutters, and tab row to create one consistent layout rhythm.

Requirements and Context:
- This is a frontend refactoring issue (Priority: P1).
- Scope focuses on spacing scale and structural alignment.
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Affected files:
	- frontend/src/components/TopNav.tsx
	- frontend/src/components/layout/AppTopNav.tsx
	- frontend/src/app/trades/page.tsx

Acceptance Criteria:
- [ ] Container gutters align across shell and content.
- [ ] Vertical spacing follows one spacing scale.
- [ ] Header and content columns align consistently.

Deliverables:
- [ ] Implementation of the above criteria.
- [ ] Proof of correct behavior (screenshots and/or QA notes).

NOTE:
This issue will not be reviewed or approved without desktop and mobile screenshots proving spacing and alignment consistency.

Suggested Execution:
1. Establish spacing baseline from Figma.
2. Apply spacing tokens to top bars, tabs, and content blocks.
3. Validate desktop and mobile breakpoints.

Guidelines:
- Keep changes token-based.
- Preserve responsive behavior.
- Add before/after desktop and mobile screenshots.

---

## FE-REF-005 - Normalize Surface, Border, and Elevation Tokens

Description:
Refactor surfaces, borders, and elevation styles to remove ad-hoc values and enforce consistent token-based visual layering.

Requirements and Context:
- This is a frontend refactoring issue (Priority: P1).
- Scope includes table surfaces, status chips, and sidebar chrome.
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Affected files:
	- frontend/tailwind.config.ts
	- frontend/src/app/trades/page.tsx
	- frontend/src/components/layout/SideNavBar.tsx

Acceptance Criteria:
- [ ] Surface layering is consistent and predictable.
- [ ] Border and elevation treatments are token-driven.
- [ ] Status indicators remain readable and consistent.

Deliverables:
- [ ] Implementation of the above criteria.
- [ ] Proof of correct behavior (screenshots and/or QA notes).

NOTE:
This issue will not be reviewed or approved without screenshots of rows, chips, and selected states showing token normalization.

Suggested Execution:
1. Audit conflicting surface/border/elevation styles.
2. Map all to approved tokens.
3. Validate contrast and state consistency.

Guidelines:
- Avoid one-off colors in components.
- Maintain accessibility and readability.
- Add focused visual comparison screenshots.

---

## FE-REF-006 - Improve Trades Empty State UX and Guidance

Description:
Refactor the empty state on Trades for better messaging, hierarchy, and clear next-action guidance.

Requirements and Context:
- This is a frontend refactoring issue (Priority: P2).
- Scope is limited to empty-state UX on Trades.
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Affected files:
	- frontend/src/app/trades/page.tsx

Acceptance Criteria:
- [ ] Empty state clearly communicates context.
- [ ] Empty state provides clear action guidance.
- [ ] Visual hierarchy aligns with page system.

Deliverables:
- [ ] Implementation of the above criteria.
- [ ] Proof of correct behavior (screenshots and/or QA notes).

NOTE:
This issue will not be reviewed or approved without before/after screenshots of the empty state and action guidance.

Suggested Execution:
1. Refine empty-state copy and supporting content.
2. Keep CTA prominence aligned with Figma.
3. Validate hierarchy and spacing.

Guidelines:
- Keep messaging concise.
- Ensure CTA remains obvious.
- Add before/after screenshots in PR.

---

## FE-REF-007 - Replace Root Template Page with Product-Aligned Entry

Description:
Refactor the root page by replacing template/demo content with a product-aligned entry experience that matches app design language.

Requirements and Context:
- This is a frontend refactoring issue (Priority: P1).
- Scope includes root page structure and visual consistency.
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Affected files:
	- frontend/src/app/page.tsx

Acceptance Criteria:
- [ ] Template/demo content is fully removed.
- [ ] Root page matches product shell and visual language.
- [ ] Navigation to core flows is clear.

Deliverables:
- [ ] Implementation of the above criteria.
- [ ] Proof of correct behavior (screenshots and/or QA notes).

NOTE:
This issue will not be reviewed or approved without desktop and mobile screenshots proving final behavior.

Suggested Execution:
1. Remove template assets and placeholders.
2. Implement product-aligned entry layout from Figma.
3. Validate responsiveness and navigation clarity.

Guidelines:
- Keep page production-ready.
- Reuse existing design tokens and components.
- Attach desktop/mobile screenshots in PR.

---

## Additional Frontend Feature-Creation Issues (Not Refactor)

These issues cover design sections that are not yet created in the current frontend route/component surface.

## FE-BUILD-001 - Create Dashboard Landing Page

Description:
Create the full Dashboard page based on Figma. The sidebar already links to /dashboard, but the page route does not exist yet.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P0
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Expected route: /dashboard
- Current gap: No page file exists for /dashboard.

Acceptance Criteria:
- [ ] /dashboard route is implemented and renders a production page.
- [ ] Layout, sections, and CTA placement follow Figma.
- [ ] Page works in desktop and mobile breakpoints.

Deliverables:
- [ ] Implementation of dashboard page and supporting components.
- [ ] Proof of behavior via screenshots.

NOTE:
This issue will not be reviewed or approved without screenshots showing complete Dashboard rendering across required breakpoints.

Suggested Execution:
1. Add frontend/src/app/dashboard/page.tsx.
2. Build page sections according to Figma hierarchy.
3. Validate responsive and auth states.

Guidelines:
- Reuse existing design tokens and shell components.
- Avoid adding temporary placeholder content.
- Include before/after or new-page screenshots in PR.

---

## FE-BUILD-002 - Create Assets Index/List Page

Description:
Create the Assets listing/index screen from Figma. The top nav links to /assets and only /assets/[id] currently exists.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P0
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Expected route: /assets
- Current gap: No page file exists for /assets index.

Acceptance Criteria:
- [ ] /assets route is implemented with list/grid and filtering/search as designed.
- [ ] Item cards/rows link correctly to /assets/[id].
- [ ] Empty, loading, and error states are implemented.

Deliverables:
- [ ] Assets index page and related UI components.
- [ ] Proof of behavior via screenshots.

NOTE:
This issue will not be reviewed or approved without screenshots showing populated and empty assets states.

Suggested Execution:
1. Add frontend/src/app/assets/page.tsx.
2. Implement list container and item navigation to detail route.
3. Add loading/empty/error states.

Guidelines:
- Keep components composable and testable.
- Match tokenized spacing and typography.
- Include screenshots of state variations in PR.

---

## FE-BUILD-003 - Create Reputation Page

Description:
Create the Reputation experience from Figma. Sidebar currently links to /reputation, but the route has not been created.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P1
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Expected route: /reputation
- Current gap: No page file exists for /reputation.

Acceptance Criteria:
- [ ] /reputation route is implemented and functional.
- [ ] Metrics/cards/history blocks match Figma structure.
- [ ] Mobile responsiveness and accessibility checks pass.

Deliverables:
- [ ] Reputation page implementation.
- [ ] Proof of behavior via screenshots.

NOTE:
This issue will not be reviewed or approved without screenshots proving desktop and mobile fidelity.

Suggested Execution:
1. Add frontend/src/app/reputation/page.tsx.
2. Build key sections and supporting components.
3. Validate states and responsive behavior.

Guidelines:
- Maintain visual consistency with existing shell.
- Prefer reusable stat/summary components.
- Include screenshots of all key sections.

---

## FE-BUILD-004 - Create Settings Page

Description:
Create the Settings page from Figma for account, wallet, and app preferences. Sidebar links to /settings but route is missing.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P1
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Expected route: /settings
- Current gap: No page file exists for /settings.

Acceptance Criteria:
- [ ] /settings route is implemented.
- [ ] Form controls and preference groups match Figma structure.
- [ ] Save/update feedback states exist (success, validation, failure).

Deliverables:
- [ ] Settings page and subcomponents.
- [ ] Proof of behavior via screenshots.

NOTE:
This issue will not be reviewed or approved without screenshots showing all settings groups and interaction states.

Suggested Execution:
1. Add frontend/src/app/settings/page.tsx.
2. Build grouped settings sections.
3. Add validation/submit feedback states.

Guidelines:
- Use shared form components where possible.
- Keep accessibility-first labels and hints.
- Include screenshots for each settings section.

---

## FE-BUILD-005 - Create Mediator Disputes Index Page

Description:
Create the Mediator disputes listing/index page from Figma. Only mediator dispute detail route currently exists.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P1
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Expected route: /mediator/disputes
- Current gap: No index page for mediator disputes queue.

Acceptance Criteria:
- [ ] /mediator/disputes index page exists with dispute cards/table.
- [ ] Filters/status segmentation are implemented per design.
- [ ] Clicking an item navigates to /mediator/disputes/[id].

Deliverables:
- [ ] Disputes queue page and navigation flow.
- [ ] Proof of behavior via screenshots.

NOTE:
This issue will not be reviewed or approved without screenshots covering list state and item-to-detail navigation proof.

Suggested Execution:
1. Add frontend/src/app/mediator/disputes/page.tsx.
2. Implement list/filter UI and data hooks.
3. Connect row/card actions to detail route.

Guidelines:
- Keep mediator role constraints visible in UI.
- Reuse existing status components.
- Add screenshots for queue states and navigation.

---

## FE-BUILD-006 - Productionize Navigation Destinations and Remove Dead Routes

Description:
Ensure all visible navigation links point to implemented product pages and isolate dev-test pages from production navigation.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P1
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Current gap: Several nav destinations are missing while dev-test pages still exist.

Acceptance Criteria:
- [ ] Sidebar and top nav destinations resolve to working pages.
- [ ] No user-facing dead-link route remains.
- [ ] Dev-test pages are gated or excluded from production UX.

Deliverables:
- [ ] Navigation destination completion and route hygiene updates.
- [ ] Proof of behavior via screenshots.

NOTE:
This issue will not be reviewed or approved without screenshots showing each primary nav destination loading correctly.

Suggested Execution:
1. Verify all nav routes and their page implementations.
2. Add missing routes or temporary guard pages where required.
3. Restrict dev-only pages from production navigation.

Guidelines:
- Keep navigation labels aligned with Figma IA.
- Avoid introducing placeholder dead ends.
- Include screenshot proof for each major route.

---

## Merge Gate for All Frontend Issues in This File

For every issue above, screenshot evidence is a required merge gate. Any PR without screenshots of completed work should be considered incomplete and blocked from merge.
