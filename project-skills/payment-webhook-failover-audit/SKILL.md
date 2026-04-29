---
name: payment-webhook-failover-audit
description: Use when researching webhook delivery, async confirmation, idempotency, provider retries, silent fallback eligibility, or multi-provider continuity behavior for the PasarelaDePago project.
---

# Payment Webhook Failover Audit

Use this skill when the task is not "integrate provider X" but "understand how provider X behaves under real operational stress".

## Workflow

1. Start with official documentation:
   - provider docs
   - Banco de la Republica when Bre-B is involved
   - regulatory or operational notices when continuity rules are relevant
2. Separate:
   - cobros
   - payouts
   - browser return
   - webhook truth
   - polling fallback
3. For each provider, capture:
   - webhook endpoint model
   - event types
   - signature or checksum validation
   - final and intermediate statuses
   - idempotency mechanism
   - documented retry or redelivery behavior
   - point of no return for fallback
4. For each method, decide whether `silent retry` is:
   - allowed
   - restricted
   - forbidden by design
5. Default to `no silent retry` for:
   - PSE
   - Bre-B
   - bank redirects
   - QR handoff flows
   unless current official docs explicitly prove otherwise.
6. Review public GitHub repos only as implementation evidence:
   - SDKs
   - wrappers
   - WooCommerce / WordPress plugins
   - orchestration projects
7. Extract patterns, not cargo-cult behavior.

## Output shape

- provider-by-provider findings
- method-by-method retry/fallback eligibility
- architecture implications
- unresolved risks
- sources with verification date

## Project docs to consult or update

- `docs/investigacion/webhooks-idempotencia-y-fallback1.md`
- `docs/investigacion/resiliencia-failover-y-operacion1.md`
- `docs/requisitos/requisitos-operativos-y-no-funcionales1.md`
