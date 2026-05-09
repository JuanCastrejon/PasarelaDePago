# Current Slice Template

## ID

`slice-id`

## Slice Type

- `product`
- `governance`
- `hybrid`

## Owner Plane

- `control`
- `specialist`
- `shared`

## SDLC Phase

- fase principal del SDLC
- fase del repo

## Objetivo

Describe el resultado que se quiere conseguir.

## Alcance

- lista de cambios incluidos

## Fuera de alcance

- lista de limites de la slice

## Source Traceability

### Requisitos

- `RFV2-xxx`

### User Stories

- `US-xxx`

### Epics o Features

- `F-xxx`

### Tasks Tecnicas

- `TT-xxx`

### ADRs

- `ADR-xxxx`

### Fuentes de gobernanza

- documento, workflow, skill o decision operativa

## Owned Surfaces

- `apps/web`
- `packages/payment-core`
- `supabase`
- `.github`
- `docs`
- `scripts`

## Entradas clave

- artefactos o documentos de entrada para la tarea

## Salidas esperadas

- artefactos o cambios que debe producir la slice

## Validaciones

- `npm run validate:control-plane`
- `npm run validate:drift`
- `npm run validate:slice-traceability`
- `npm run validate:surface-traceability`
- `npm run validate:semantic-guardrails`
- otras validaciones tecnicas necesarias

## Gate humano

- aprobaciones o revisiones humanas requeridas
