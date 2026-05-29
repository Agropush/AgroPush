# Frontend Implementation Issues (Figma Design Realization)

Date: 2026-04-21
Context: Implementation pass to bring Figma design into project. Focus on design realization, not code cleanup.

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

## FE-REF-001 - Implement Unified App Shell Layout

Description:
Implement a single canonical app shell per Figma design. The Figma shows one top navigation and sidebar chrome serving all pages. Eliminate duplicate header/navigation layers so Trades and other pages use this consistent shell.

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
1. Fork and create a branch:

```bash
git checkout -b refactor/fe-ref-001-single-shell-trades
```

2. In affected files, implement the shell unification:
	- frontend/src/app/layout.tsx
	- frontend/src/components/Shell.tsx
	- frontend/src/app/trades/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: before Trades view with duplicate chrome
	- [ ] Screenshot: after Trades view with single canonical shell
	- [ ] Screenshot: mobile layout parity

4. Example commit message:

```bash
refactor(frontend): remove duplicate shell layers on trades page
```

Guidelines:
- Follow existing frontend conventions.
- Keep refactor scoped to layout concerns.
- Add before/after screenshots in PR.

---

## FE-REF-002 - Implement Consistent Navigation State System

Description:
Implement navigation interaction states (active, hover, focus) per Figma design system. The Figma defines consistent patterns for nav state feedback. Align sidebar, top nav, and tabs to one unified state pattern.

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
1. Fork and create a branch:

```bash
git checkout -b refactor/fe-ref-002-unify-nav-states
```

2. In affected files, standardize active/hover/focus states:
	- frontend/src/components/layout/AppTopNav.tsx
	- frontend/src/components/layout/SideNavBar.tsx
	- frontend/src/app/trades/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: default nav state
	- [ ] Screenshot: hover nav state
	- [ ] Screenshot: active and keyboard focus states

4. Example commit message:

```bash
refactor(frontend): standardize navigation interaction states across app chrome
```

Guidelines:
- Preserve existing routing behavior.
- Do not regress accessibility.
- Add state screenshots in PR.

---

## FE-REF-003 - Implement Typography System from Figma

Description:
Implement the Figma typography system (heading sizes, body styles, metadata text). Enforce consistent tokenized hierarchy across headings, body text, metadata, and nav labels per design specification.

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
1. Fork and create a branch:

```bash
git checkout -b refactor/fe-ref-003-typography-hierarchy
```

2. In affected files, align typography tokens and hierarchy:
	- frontend/src/app/layout.tsx
	- frontend/src/app/globals.css
	- frontend/src/components/TopNav.tsx
	- frontend/src/app/trades/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: top nav typography before/after
	- [ ] Screenshot: trades typography before/after
	- [ ] Screenshot: close-up of heading/body hierarchy

4. Example commit message:

```bash
refactor(frontend): align typography tokens and hierarchy with figma
```

Guidelines:
- Use token-driven classes only.
- Avoid ad-hoc font overrides.
- Attach close-up typography screenshots in PR.

---

## FE-REF-004 - Implement Spacing Grid and Layout Rhythm from Figma

Description:
Implement the Figma spacing grid and layout rhythm. Align app bars, sidebar, content gutters, and tab row to create one consistent spacing scale across all surfaces per design.

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
1. Fork and create a branch:

```bash
git checkout -b refactor/fe-ref-004-spacing-grid-consistency
```

2. In affected files, normalize spacing and layout rhythm:
	- frontend/src/components/TopNav.tsx
	- frontend/src/components/layout/AppTopNav.tsx
	- frontend/src/app/trades/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: desktop alignment before/after
	- [ ] Screenshot: mobile spacing before/after
	- [ ] Screenshot: header/content gutter alignment

4. Example commit message:

```bash
refactor(frontend): normalize spacing scale and grid alignment across chrome
```

Guidelines:
- Keep changes token-based.
- Preserve responsive behavior.
- Add before/after desktop and mobile screenshots.

---

## FE-REF-005 - Implement Surface and Elevation System from Figma

Description:
Implement the Figma surface and elevation token system. Enforce token-based layering for table surfaces, status chips, sidebar chrome, and all UI containers per design specification.

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
1. Fork and create a branch:

```bash
git checkout -b refactor/fe-ref-005-surface-border-elevation-tokens
```

2. In affected files, replace ad-hoc values with tokens:
	- frontend/tailwind.config.ts
	- frontend/src/app/trades/page.tsx
	- frontend/src/components/layout/SideNavBar.tsx

3. Tests/proof required:
	- [ ] Screenshot: table rows before/after
	- [ ] Screenshot: status chips before/after
	- [ ] Screenshot: selected tab and border/elevation consistency

4. Example commit message:

```bash
refactor(frontend): normalize surface, border, and elevation token usage
```

Guidelines:
- Avoid one-off colors in components.
- Maintain accessibility and readability.
- Add focused visual comparison screenshots.

---

## FE-REF-006 - Implement Trades Empty State Per Figma Design

Description:
Implement the empty state design shown in Figma for the Trades page. Add proper messaging hierarchy, visual guidance, and clear action CTA per design specification.

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
1. Fork and create a branch:

```bash
git checkout -b refactor/fe-ref-006-trades-empty-state
```

2. In affected file, improve empty-state UX:
	- frontend/src/app/trades/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: empty state before
	- [ ] Screenshot: empty state after
	- [ ] Screenshot: action guidance/CTA visibility

4. Example commit message:

```bash
refactor(frontend): improve trades empty-state hierarchy and guidance
```

Guidelines:
- Keep messaging concise.
- Ensure CTA remains obvious.
- Add before/after screenshots in PR.

---

## FE-REF-007 - Implement Root Landing Page from Figma

Description:
Implement the root landing page (/pages) per Figma design. Replace template content with the product-aligned entry experience designed for Amana, including proper branding, value proposition, and navigation per specification.

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
1. Fork and create a branch:

```bash
git checkout -b refactor/fe-ref-007-root-entry-page
```

2. In affected file, replace template content with product-aligned entry screen:
	- frontend/src/app/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: current template root page
	- [ ] Screenshot: new root page desktop
	- [ ] Screenshot: new root page mobile

4. Example commit message:

```bash
refactor(frontend): replace root template with product-aligned entry page
```

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
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-001-dashboard-page
```

2. Create and implement route:
	- frontend/src/app/dashboard/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: dashboard desktop
	- [ ] Screenshot: dashboard mobile
	- [ ] Screenshot: authenticated and unauthenticated states (if applicable)

4. Example commit message:

```bash
feat(frontend): create dashboard landing page from figma
```

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
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-002-assets-index-page
```

2. Create and implement route:
	- frontend/src/app/assets/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: assets list/grid populated state
	- [ ] Screenshot: assets empty state
	- [ ] Screenshot: item navigation to /assets/[id]

4. Example commit message:

```bash
feat(frontend): add assets index page with list states and detail navigation
```

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
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-003-reputation-page
```

2. Create and implement route:
	- frontend/src/app/reputation/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: reputation page desktop
	- [ ] Screenshot: reputation page mobile
	- [ ] Screenshot: major metric/history sections

4. Example commit message:

```bash
feat(frontend): create reputation page and key trust metric sections
```

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
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-004-settings-page
```

2. Create and implement route:
	- frontend/src/app/settings/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: all settings groups
	- [ ] Screenshot: validation feedback
	- [ ] Screenshot: success/failure save states

4. Example commit message:

```bash
feat(frontend): create settings page with grouped preferences and feedback states
```

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
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-005-mediator-disputes-index
```

2. Create and implement route:
	- frontend/src/app/mediator/disputes/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: disputes queue list state
	- [ ] Screenshot: filters/status segmentation
	- [ ] Screenshot: navigation into /mediator/disputes/[id]

4. Example commit message:

```bash
feat(frontend): add mediator disputes index with filters and detail navigation
```

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
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-006-nav-destination-productionization
```

2. Implement route hygiene and nav destination completion:
	- Verify sidebar and top nav destination pages
	- Add missing page routes or guarded fallbacks
	- Exclude/gate dev-test routes from production UX

3. Tests/proof required:
	- [ ] Screenshot: each primary nav destination loaded
	- [ ] Screenshot: no dead-link destination remains
	- [ ] Screenshot: dev-test routes not exposed in production navigation

4. Example commit message:

```bash
feat(frontend): complete navigation destinations and remove production dead routes
```

Guidelines:
- Keep navigation labels aligned with Figma IA.
- Avoid introducing placeholder dead ends.
- Include screenshot proof for each major route.

---

## FE-BUILD-007 - Create Vault Management Page

Description:
Create the Vault management page from Figma. This page handles escrow fund management, partner network display, and vault overview metrics. Sidebar links to /vault but the route is missing.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P1
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Expected route: /vault
- Current gap: No page file exists for /vault.

Acceptance Criteria:
- [ ] /vault route is implemented and renders a production page.
- [ ] Fund management section with balance display and actions.
- [ ] Partner network section showing connected parties and status.
- [ ] Vault overview metrics and key statistics.
- [ ] Page works in desktop and mobile breakpoints.

Deliverables:
- [ ] Vault management page and supporting components.
- [ ] Proof of behavior via screenshots.

NOTE:
This issue will not be reviewed or approved without screenshots showing Vault rendering across required breakpoints with all key sections.

Suggested Execution:
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-007-vault-management-page
```

2. Create and implement route:
	- frontend/src/app/vault/page.tsx

3. Tests/proof required:
	- [ ] Screenshot: vault page desktop
	- [ ] Screenshot: vault page mobile
	- [ ] Screenshot: fund management section
	- [ ] Screenshot: partner network section
	- [ ] Screenshot: vault metrics/overview

4. Example commit message:

```bash
feat(frontend): create vault management page with funds and partner network
```

Guidelines:
- Reuse existing design tokens and shell components.
- Keep fund management actions clear and intuitive.
- Ensure partner network status is visually distinct.
- Include screenshots of all major sections in PR.

---

## FE-BUILD-008 - Implement Toast/Notification System

Description:
Implement a toast/notification system per Figma design patterns. Toasts display transient feedback for user actions (success, error, warning, info). Should support multiple notifications, auto-dismiss, and manual dismiss.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P2
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Current gap: No centralized toast system exists; feedback is scattered.

Acceptance Criteria:
- [ ] Toast component displays at specified position (top-right preferred per Figma).
- [ ] Toast types: success, error, warning, info with distinct styling.
- [ ] Auto-dismiss after configurable duration (default: 4s).
- [ ] Manual dismiss via close button.
- [ ] Multiple toasts stack without overlap.
- [ ] Uses design tokens for colors and typography.

Deliverables:
- [ ] Toast component and notification context/provider.
- [ ] Integration example in one existing page.
- [ ] Screenshots showing all toast types and states.

NOTE:
This issue will not be reviewed or approved without screenshots demonstrating all toast types and auto-dismiss behavior.

Suggested Execution:
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-008-toast-notification-system
```

2. Create toast components:
	- frontend/src/components/ui/Toast.tsx
	- frontend/src/components/ui/ToastContainer.tsx
	- frontend/src/hooks/useToast.ts

3. Tests/proof required:
	- [ ] Screenshot: success toast
	- [ ] Screenshot: error toast
	- [ ] Screenshot: warning toast
	- [ ] Screenshot: info toast
	- [ ] Screenshot: multiple toasts stacked

4. Example commit message:

```bash
feat(frontend): implement centralized toast notification system
```

Guidelines:
- Keep animations smooth (fade in/out, slide).
- Ensure accessibility with proper ARIA labels.
- Use Tailwind tokens for consistent styling.
- Include integration example in trades or dashboard.

---

## FE-BUILD-009 - Implement Modal/Dialog System

Description:
Implement a reusable modal/dialog component system per Figma design. Modals display focused content (confirmations, forms, alerts) with backdrop overlay and proper focus management.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P2
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Current gap: No centralized modal system.

Acceptance Criteria:
- [ ] Modal component with header, body, footer sections.
- [ ] Backdrop overlay with configurable dimming.
- [ ] Close button and ESC key support.
- [ ] Focus trap and keyboard navigation.
- [ ] Smooth open/close animations.
- [ ] Responsive on mobile (full screen or centered card).

Deliverables:
- [ ] Modal component and composition patterns.
- [ ] Hook for modal state management (useModal).
- [ ] Screenshots of modal states and responsiveness.

NOTE:
This issue will not be reviewed or approved without desktop and mobile screenshots.

Suggested Execution:
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-009-modal-dialog-system
```

2. Create modal components:
	- frontend/src/components/ui/Modal.tsx
	- frontend/src/hooks/useModal.ts

3. Tests/proof required:
	- [ ] Screenshot: modal desktop open state
	- [ ] Screenshot: modal mobile open state
	- [ ] Screenshot: modal with form content
	- [ ] Screenshot: modal closed/backdrop

4. Example commit message:

```bash
feat(frontend): implement reusable modal dialog system
```

Guidelines:
- Follow ARIA best practices for accessibility.
- Support both controlled and uncontrolled patterns.
- Allow content composition (header, body, footer).
- Include focus management and keyboard support.

---

## FE-BUILD-010 - Implement Form Validation and Error Pattern

Description:
Implement a consistent form validation and error display pattern per Figma. Includes inline field errors, form-level errors, and validation feedback states.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P2
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Current gap: Form validation patterns are inconsistent across pages.

Acceptance Criteria:
- [ ] Inline field error display with icon and message.
- [ ] Form-level error summary section.
- [ ] Required field indicators.
- [ ] Success/valid state feedback.
- [ ] Validation happens on blur and submit.
- [ ] Uses design tokens for error colors and typography.

Deliverables:
- [ ] Form field wrapper component with error states.
- [ ] Validation hook (useFormValidation or similar).
- [ ] Example form with comprehensive error states.
- [ ] Screenshots showing all validation states.

NOTE:
This issue will not be reviewed or approved without screenshots of empty, filled, error, and success field states.

Suggested Execution:
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-010-form-validation-pattern
```

2. Create form validation components:
	- frontend/src/components/ui/FormField.tsx
	- frontend/src/hooks/useFormValidation.ts

3. Tests/proof required:
	- [ ] Screenshot: empty field
	- [ ] Screenshot: filled field (valid)
	- [ ] Screenshot: field with error message
	- [ ] Screenshot: form-level error summary
	- [ ] Screenshot: success state confirmation

4. Example commit message:

```bash
feat(frontend): implement consistent form validation and error patterns
```

Guidelines:
- Support both HTML5 validation and custom validators.
- Show error state immediately on blur or after submit attempt.
- Keep error messages concise and actionable.
- Highlight invalid fields distinctly per design tokens.

---

## FE-BUILD-011 - Implement Loading and Skeleton States Across Pages

Description:
Implement consistent loading skeletons and loading states per Figma design. Applied to data-heavy pages (trades list, assets, dashboard, etc.) while content loads.

Requirements and Context:
- Type: Frontend Feature Creation
- Priority: P2
- Figma Link: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1
- Current gap: Loading states vary; some pages lack skeleton feedback.

Acceptance Criteria:
- [ ] Skeleton components for list items, cards, tables.
- [ ] Animated shimmer effect using design tokens.
- [ ] Applied to trades, assets, dashboard initial load.
- [ ] Loading state placeholder matches final layout (prevents layout shift).
- [ ] Uses bg-color tokens for consistency.

Deliverables:
- [ ] Skeleton component variants (list, card, table row).
- [ ] Applied to 2+ pages showing loading state.
- [ ] Screenshots of loading states in action.

NOTE:
This issue will not be reviewed or approved without screenshots showing skeleton loading on populated pages.

Suggested Execution:
1. Fork and create a branch:

```bash
git checkout -b feat/fe-build-011-loading-skeleton-states
```

2. Create skeleton components:
	- frontend/src/components/ui/Skeleton.tsx
	- frontend/src/components/ui/SkeletonList.tsx
	- frontend/src/components/ui/SkeletonCard.tsx

3. Apply to pages:
	- frontend/src/app/trades/page.tsx (trades loading)
	- frontend/src/app/assets/page.tsx (assets loading)
	- frontend/src/app/dashboard/page.tsx (dashboard metrics loading)

4. Tests/proof required:
	- [ ] Screenshot: trades loading with skeletons
	- [ ] Screenshot: assets loading with skeletons
	- [ ] Screenshot: shimmer animation in action
	- [ ] Screenshot: transition to loaded state

5. Example commit message:

```bash
feat(frontend): add skeleton loading states to data-heavy pages
```

Guidelines:
- Use shimmer animation with gradient overlay.
- Match skeleton layout to final component layout.
- Apply consistent pulse/shimmer timing.
- Replace skeletons smoothly with real content.

---

## Merge Gate for All Frontend Issues in This File

For every issue above, screenshot evidence is a required merge gate. Any PR without screenshots of completed work should be considered incomplete and blocked from merge.
