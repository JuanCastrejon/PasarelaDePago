---
name: payment-third-party-onboarding-audit
description: Use when researching merchant onboarding, beneficiary onboarding, KYC/KYB, provider activation, compliance-sensitive account setup, or third-party operating models for the PasarelaDePago project.
---

# Payment Third-Party Onboarding Audit

Use this skill when the question is not just "can provider X charge a card?" but "what does it take to onboard and operate a third party safely?"

## Workflow

1. Start with primary sources:
   - official provider docs
   - Superfinanciera
   - SIC
   - Supersociedades
   - Banco de la Republica when Bre-B or transfers are involved
2. Separate three layers:
   - platform account onboarding
   - provider account activation
   - beneficiary onboarding for payouts
3. For each provider, capture:
   - who must request activation
   - required documents
   - identity checks
   - dual control or approval roles
   - activation states
   - operational limits
   - reverification rules
4. For the product, distinguish operating models:
   - merchant-owned accounts
   - master accounts
   - hybrid model
5. Record which conclusions are:
   - confirmed by official docs
   - inferred from docs
   - still unknown
6. Review public GitHub repos only to extract reusable technical patterns, not legal assumptions.

## Output shape

- recommended operating model
- onboarding requirements by actor
- architecture implications
- unresolved legal or compliance questions
- sources with dates when relevant

## Project docs to consult or update

- `docs/investigacion/compliance-y-riesgo-para-terceros1.md`
- `docs/investigacion/modelos-operativos-y-onboarding-para-terceros1.md`
- `docs/requisitos/requisitos-operativos-y-no-funcionales1.md`
