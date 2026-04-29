# Payment Checkout Flow Audit

## Purpose

Use this skill when the task is to inspect a real payment flow, checkout session, bank handoff or public payment link in order to understand:

- UX sequence
- data capture order
- timeout behavior
- merchant summary layout
- payment-method exposure
- abandonment paths
- backend truth boundaries

This skill is intended for the Colombian payment orchestration project.

## Workflow

1. Inspect the real URL without completing the payment.
2. Prefer public observation first:
   - page title
   - visible form fields
   - summary panel
   - session or order identifiers
   - timeout or expiration text
   - cancellation / abandonment actions
3. If the page is a SPA, wait for hydration and inspect the rendered DOM.
4. Stop before submitting any form that transmits contact, identity, payment or banking data unless the user gave explicit permission for that exact transmission.
5. Cross-reference the observed behavior with official provider or bank documentation.
6. Extract architecture implications for:
   - session handling
   - order state
   - payer data capture
   - method selection
   - timeout / retry
   - reconciliation

## Output structure

- Objective
- Direct observation
- What the flow captures first
- Merchant-side summary signals
- Timeout / abandonment behavior
- What could not be inspected safely
- Official docs cross-check
- Product implications
- Sources

## Project rules

- Never overwrite an existing research file; create a new versioned file.
- Do not perform a real payment.
- Do not type user contact data, IDs, banking data or card data without explicit consent.
- Separate what was directly observed from what was inferred from docs.
- Treat `return UX`, `provider confirmation` and `settlement` as different layers.

