---
name: payment-orchestration-review
description: Use when designing or reviewing multi-provider routing, failover, retries, webhook normalization, adapter interfaces, payout orchestration, or provider capability mapping for the PasarelaDePago project.
---

# Payment Orchestration Review

Use this skill when the task touches routing or multi-provider behavior.

## Workflow

1. Read:
   - `CONTEXT.md`
   - `docs/arquitectura/orquestacion-failover-y-bre-b.md`
   - `docs/requisitos/requisitos-y-casos-de-uso.md`
2. Separate these concepts clearly:
   - payment order
   - payment attempt
   - fallback
   - smart retry
   - final status
   - payout batch
3. Check whether the method requires user action.
4. Allow silent retry only when:
   - the failure is technical and recoverable
   - the provider/method combination permits it
   - duplicate charging risk is controlled
5. Treat webhook validation and idempotency as required, not optional.
6. Model provider-specific states behind normalized internal states.
7. For payouts, verify:
   - source accounts
   - limits
   - approval flow
   - batch status model

## Review questions

- Is the adapter contract stable?
- Are provider capabilities explicit?
- Is fallback separated from business decline handling?
- Is the final source of truth webhook or server-to-server status?
- Is observability good enough to explain every attempt?
