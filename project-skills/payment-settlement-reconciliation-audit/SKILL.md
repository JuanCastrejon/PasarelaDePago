# Payment Settlement Reconciliation Audit

## Purpose

Use this skill when investigating how a payment provider or bank handles:

- settlement
- disbursements
- reconciliation
- refunds
- reversals
- disputes / chargebacks
- provider reports and statements

This skill is for the research phase of the Colombian payment orchestration project.

## Inputs expected

- Provider or bank name
- Country / rail context
- Business model in scope:
  - aggregator
  - gateway
  - merchant-owned accounts
  - payouts / third-party payments
- Payment methods in scope:
  - card
  - PSE
  - Bancolombia button
  - Bre-B
  - wallet
  - cash

## Workflow

1. Identify the provider's official technical docs first.
2. Identify official help center / support content second.
3. Identify bank or rail documentation third.
4. Extract and classify the following independently:
   - transactional truth
   - settlement truth
   - transfer-to-merchant truth
   - refund truth
   - dispute truth
5. Record deadlines, state machines, retry policies, statement/report availability and manual intervention points.
6. Distinguish clearly between:
   - response URL
   - confirmation URL / webhook
   - dashboard view
   - downloadable report
   - bank statement / settlement file
7. Document architecture implications for:
   - routing
   - idempotency
   - reconciliation
   - backoffice
   - support operations

## Mandatory output structure

Produce findings under these headings:

- Objective
- Executive conclusions
- Provider matrix
- Bank / rail benchmark
- Architecture implications
- Recommended data model additions
- Open questions
- Sources

## Project-specific rules

- Do not overwrite existing research docs. Create a new versioned file instead.
- Prefer official sources over blogs and community summaries.
- If using support-center content, label it as operational evidence rather than normative regulation.
- Call out where a finding is a direct statement versus an inference.
- Always separate `payment approved` from `funds settled`.
- Always check whether the provider differentiates `reversal`, `void`, `refund`, `chargeback` and `merchant transfer`.

## Expected high-value outputs

- Comparative matrix by provider
- Reconciliation edge cases
- Backoffice requirements
- Ledger / statement modeling recommendations
- Constraints for multi-provider failover

