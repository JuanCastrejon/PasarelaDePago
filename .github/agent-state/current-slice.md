# Current Slice

## ID

`control-plane-agentes-v1`

## Slice Type

- `governance`

## Owner Plane

- `shared`

## SDLC Phase

- implementacion de gobernanza
- validacion de proceso

## Objetivo

Crear la primera version operativa del control plane multiagente del repositorio para que el SDLC tenga owners explicitos, artefactos de handoff, estado compartido versionado y validaciones ligeras de drift, trazabilidad de slice, cobertura por superficie real del repo y guardrails semanticos del dominio.

## Alcance

- manifiestos de agentes en `.github/agents/`
- matriz de ownership por fase y superficie
- estado compartido en `.github/agent-state/`
- validaciones `control-plane` y `drift` integradas al flujo
- matriz machine-readable de trazabilidad por superficie
- validacion de cobertura por superficie
- guardrails semanticos machine-readable
- validacion automatica de invariantes del dominio
- actualizacion de `.github/AGENTS.md` y docs de proceso

## Fuera de alcance

- cambios de codigo de producto en `apps/`, `packages/` o `supabase/`
- adopcion de una herramienta externa de memoria
- automatizacion de hooks adicionales con logica de drift

## Source Traceability

### Requisitos

- N/A

### User Stories

- `US-001`

### Epics o Features

- `F-301`
- `F-1201`
- `F-1202`
- `F-1203`

### Tasks Tecnicas

- `TT-011`
- `TT-001`

### ADRs

- `ADR-0002`

### Fuentes de gobernanza

- `docs/proceso/sistema-de-trabajo-multiagente2.md`
- `.github/AGENTS.md`
- `.github/skills/orquestacion-multiagente/SKILL.md`
- `docs/proceso/sdd-openspec-engram1.md`

## Owned Surfaces

- `.github`
- `docs`
- `scripts`

## Entradas clave

- `docs/proceso/sistema-de-trabajo-multiagente2.md`
- `.github/AGENTS.md`
- conversacion de investigacion sobre SDLC y agentes

## Salidas esperadas

- agentes versionados y documentados
- state manager simple basado en archivos
- handoff contract reusable
- actualizacion del mapa operativo del repo
- validadores de `control-plane`, `drift`, trazabilidad de slice, trazabilidad por superficie y guardrails semanticos
- primer slice pack de producto listo para ejecutar sobre `payment_order`

## Validaciones

- `npm run validate:control-plane`
- `npm run validate:drift`
- `npm run validate:slice-traceability`
- `npm run validate:surface-traceability`
- `npm run validate:semantic-guardrails`

## Gate humano

- revisar si la separacion entre memoria normativa y memoria operativa resulta suficiente
- confirmar si el siguiente paso sera memoria externa, enforcement mas profundo o semantica de producto mas rica
