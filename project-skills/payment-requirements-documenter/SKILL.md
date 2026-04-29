---
name: payment-requirements-documenter
description: Use when translating research into requirements, use cases, user stories, ADR inputs, PRD material, or portfolio-facing documentation for the PasarelaDePago project.
---

# Payment Requirements Documenter

Use this skill to convert research into structured product documentation.

## Workflow

1. Read:
   - `CONTEXT.md`
   - `docs/investigacion/proveedores-colombia-y-open-source.md`
   - `docs/requisitos/requisitos-y-casos-de-uso.md`
   - `docs/requisitos/historias-de-usuario.md`
2. Keep the documentation layered:
   - research
   - requirements
   - stories
   - architecture
   - plan
3. When adding requirements:
   - use stable IDs like `FR-###` or `NFR-###`
   - write behavior, not implementation detail
4. When adding stories:
   - write them from actor perspective
   - cover both pay-in and payout flows
   - include ops, finance, risk, and portfolio concerns
5. Always mark assumptions and open questions explicitly.
6. Prefer reusable language from `CONTEXT.md`.

## Default files

- `docs/requisitos/requisitos-y-casos-de-uso.md`
- `docs/requisitos/historias-de-usuario.md`
- `docs/plan-implementacion-pasarela-colombia.md`

## Goal

Leave the project in a state where the next step can become:

- a PRD
- an ADR
- a backlog
- a skill
- or directly implementable engineering work
