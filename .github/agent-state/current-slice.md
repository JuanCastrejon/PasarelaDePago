# Current Slice

## ID

`payment-order-bootstrap`

## Slice Type

- `hybrid`

## Owner Plane

- `payment-core`
- `web-operaciones`

## SDLC Phase

- implementacion producto minima
- validacion tecnica de la vertical

## Objetivo

Implementar la primera vertical minima para crear una `payment_order` canonica e independiente de proveedor via `POST /api/payment-orders`, dejando explicito que no se crea `payment_attempt`.

## Alcance

- helper o constructor canonico de `payment_order` en `packages/payment-core`
- validacion minima de payload en `apps/web/src/app/api/payment-orders/route.ts`
- respuesta HTTP `201` canonica y agnostica de proveedor
- pruebas unitarias minimas del helper y del endpoint

## Fuera de alcance

- persistencia real en `supabase`
- creacion de `payment_attempt`
- routing, fallback, retry o proveedor real
- autenticacion o multi-tenant completo

## Source Traceability

### Requisitos

- `RFV2-011`

### User Stories

- `US-001`

### Epics o Features

- `F-301`

### Tasks Tecnicas

- `TT-003`
- `TT-011`

### ADRs

- `ADR-0002`
- `ADR-0004`

### Fuentes de gobernanza

- `docs/proceso/template-sdlc-y-bootstrap-de-analisis.md`
- `docs/proceso/sistema-de-trabajo-multiagente.md`
- `docs/proceso/consolidacion-documental-para-inicio-del-proyecto.md`
- `docs/proceso/auditoria-de-personalizacion-y-brechas.md`
- `.github/skills/orquestacion-multiagente/SKILL.md`
- `.github/skills/gitflow-prs/SKILL.md`
- `docs/skills/catalogo-de-skills-del-proyecto.md`
- `docs/backlog/slices/slice-payment-order-bootstrap.md`
- `openspec/changes/payment-order-bootstrap/specs/payment-order-bootstrap/spec.md`

## Owned Surfaces

- `.github`
- `apps/web`
- `packages/payment-core`

## Entradas clave

- `docs/proceso/template-sdlc-y-bootstrap-de-analisis.md`
- `docs/proceso/consolidacion-documental-para-inicio-del-proyecto.md`
- `docs/proceso/auditoria-de-personalizacion-y-brechas.md`
- conversacion de diseno sobre plantilla reusable y bootstrap de analisis

## Salidas esperadas

- slice operativo nuevo y documentado
- estrategia de bootstrap reusable versionada en el repo
- rama de trabajo dedicada a la iniciativa
- cola lista para introducir `OpenSpec`, skills de analisis y matriz de tools externas

## Validaciones

- `npm run validate:control-plane`
- `npm run validate:drift`
- `npm run validate:docs-canonical`
- `npm run validate:enhanced-research -- payment-order-bootstrap`
- `npm run validate:openspec`
- `npm run validate:slice-traceability`
- `npm run validate:surface-traceability`
- `npm run validate:semantic-guardrails`

## Gate humano

- confirmar que el bootstrap siga siendo aditivo
- confirmar el uso de `PasarelaDePago` como piloto antes de extraer el template a otro repo
