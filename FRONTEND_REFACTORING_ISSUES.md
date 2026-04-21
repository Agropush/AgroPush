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

Type: Frontend Refactoring  
Priority: P0  
Scope: Remove duplicate shell/header rendering and keep one canonical app chrome pattern.
Figma Design: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1

Files:
- frontend/src/app/layout.tsx
- frontend/src/components/Shell.tsx
- frontend/src/app/trades/page.tsx

Acceptance Criteria:
1. Trades renders with exactly one top-level app chrome.
2. No duplicate title/logo/navigation bars remain.
3. Sidebar, top bar, and content alignment is consistent with the canonical shell.

Screenshot Requirement (Mandatory for Merge):
1. Add before and after full-page desktop screenshots.
2. Include one focused screenshot proving duplicate header removal.

---

## FE-REF-002 - Unify Navigation States Across App Chrome

Type: Frontend Refactoring  
Priority: P0  
Scope: Standardize active, hover, and focus behavior for sidebar links, top nav, and trades filter tabs.
Figma Design: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1

Files:
- frontend/src/components/layout/AppTopNav.tsx
- frontend/src/components/layout/SideNavBar.tsx
- frontend/src/app/trades/page.tsx

Acceptance Criteria:
1. Active states use one consistent visual pattern.
2. Hover and keyboard focus treatments are consistent and accessible.
3. No conflicting interaction styles remain between nav regions.

Screenshot Requirement (Mandatory for Merge):
1. Add screenshots for default, hover, active, and focus states.
2. Include at least one screenshot each for sidebar, top nav, and tabs.

---

## FE-REF-003 - Standardize Typography Tokens and Hierarchy

Type: Frontend Refactoring  
Priority: P1  
Scope: Enforce typography system consistency for body text, headings, nav labels, and metadata.
Figma Design: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1

Files:
- frontend/src/app/layout.tsx
- frontend/src/app/globals.css
- frontend/src/components/TopNav.tsx
- frontend/src/app/trades/page.tsx

Acceptance Criteria:
1. Typography uses approved tokenized families and sizes consistently.
2. Heading, body, and supporting text hierarchy is visually coherent.
3. Unintended fallback stack usage is eliminated in target screens.

Screenshot Requirement (Mandatory for Merge):
1. Add before and after screenshots of top nav and trades page.
2. Include close-up screenshot showing heading and body typography hierarchy.

---

## FE-REF-004 - Refactor Spacing and Layout Grid Consistency

Type: Frontend Refactoring  
Priority: P1  
Scope: Normalize horizontal and vertical rhythm across app bars, sidebar, content gutters, and tab row.
Figma Design: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1

Files:
- frontend/src/components/TopNav.tsx
- frontend/src/components/layout/AppTopNav.tsx
- frontend/src/app/trades/page.tsx

Acceptance Criteria:
1. Container gutters align across shell and content.
2. Vertical spacing follows one spacing scale and appears visually balanced.
3. Header and main content columns align consistently.

Screenshot Requirement (Mandatory for Merge):
1. Add before and after desktop screenshots showing full layout alignment.
2. Add mobile screenshot proving responsive spacing consistency.

---

## FE-REF-005 - Normalize Surface, Border, and Elevation Tokens

Type: Frontend Refactoring  
Priority: P1  
Scope: Replace ad-hoc shades with consistent token-based surfaces, borders, and elevation across trades and chrome.
Figma Design: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1

Files:
- frontend/tailwind.config.ts
- frontend/src/app/trades/page.tsx
- frontend/src/components/layout/SideNavBar.tsx

Acceptance Criteria:
1. Surface layering is consistent and predictable.
2. Border and elevation treatments are token-driven and coherent.
3. Status indicators and selected states preserve readability and contrast.

Screenshot Requirement (Mandatory for Merge):
1. Add before and after screenshots of table rows, status chips, and selected tabs.
2. Include one screenshot focused on border/elevation differences.

---

## FE-REF-006 - Improve Trades Empty State UX and Guidance

Type: Frontend Refactoring  
Priority: P2  
Scope: Improve empty-state hierarchy, messaging clarity, and action guidance.
Figma Design: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1

Files:
- frontend/src/app/trades/page.tsx

Acceptance Criteria:
1. Empty state communicates context clearly.
2. Empty state gives clear next action guidance.
3. Visual hierarchy matches the rest of the screen.

Screenshot Requirement (Mandatory for Merge):
1. Add before and after screenshots of empty state.
2. Include one screenshot where action guidance is clearly visible.

---

## FE-REF-007 - Replace Root Template Page with Product-Aligned Entry

Type: Frontend Refactoring  
Priority: P1  
Scope: Replace default root template content with product-aligned experience consistent with app design language.
Figma Design: https://www.figma.com/design/r4l1ciQ2AnyrOxVW9t5oCm/Amana?node-id=0-1&t=1MBz2FGXTfJSQ8ma-1

Files:
- frontend/src/app/page.tsx

Acceptance Criteria:
1. No template/demo content remains on root page.
2. Entry page aligns with product shell and visual system.
3. Navigation path from root to core user flows is clear.

Screenshot Requirement (Mandatory for Merge):
1. Add before and after full-page desktop screenshots.
2. Add mobile screenshot proving responsive behavior.

---

## Merge Gate for All Refactoring Issues

For every issue above, screenshot evidence is a required merge gate. Any PR without screenshots of completed work should be considered incomplete and blocked from merge.
