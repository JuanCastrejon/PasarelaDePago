---
name: payment-provider-audit
description: Use when researching or comparing payment providers, official docs, SDKs, public GitHub integrations, or method support for the PasarelaDePago project. Especially relevant for Wompi, PayU, ePayco, Mercado Pago, Bre-B, PSE, Nequi, Daviplata, payouts, split payments, webhooks, idempotency, sandbox behavior, and failover readiness in Colombia.
---

# Payment Provider Audit

Use this skill to investigate a provider or payment method with discipline.

## Workflow

1. Prefer official sources first:
   - provider docs
   - Banco de la Republica for Bre-B
   - Superfinanciera for regulatory/security context
2. Confirm the country and date context before assuming support.
3. Compare the provider on:
   - payment methods
   - payouts
   - tokenization
   - webhooks
   - idempotency
   - sandbox quality
   - refunds
   - recurrent payments
   - dual control / approvals
4. Search public GitHub repos for:
   - SDKs
   - plugins
   - wrappers
   - examples
   - orchestration patterns
5. Extract patterns, not cargo-cult code.
6. Update or consult:
   - `docs/investigacion/proveedores-colombia-y-open-source.md`
   - `docs/arquitectura/orquestacion-failover-y-bre-b.md`
7. Record unknowns explicitly. Never infer Bre-B or payout support from vague marketing.

## Output shape

- supported capabilities
- unsupported or unclear capabilities
- architecture implications
- open questions
- sources with dates when relevant
