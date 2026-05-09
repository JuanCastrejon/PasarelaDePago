# Current Slice

## ID

`sdlc-template-bootstrap-v1`

## Slice Type

- `governance`

## Owner Plane

- `shared`

## SDLC Phase

- planificacion de framework reusable
- bootstrap operativo de analisis

## Objetivo

Preparar la primera slice operativa para convertir el framework de trabajo actual en una plantilla reusable de inicio de proyecto, usando `PasarelaDePago` como piloto para bootstrap de analisis, gobierno documental y futura adopcion de `OpenSpec`.

## Alcance

- rama de trabajo dedicada al bootstrap
- slice de gobernanza para la iniciativa
- documentacion de la estrategia `core -> profile -> project`
- definicion del bootstrap aditivo para `PasarelaDePago`
- preparacion de la cola para `OpenSpec`, skills de analisis y matriz de tools externas

## Fuera de alcance

- cambios de codigo de producto en `apps/`, `packages/` o `supabase/`
- reorganizacion masiva del corpus documental existente
- bootstrap operativo de Azure DevOps en esta iteracion

## Source Traceability

### Requisitos

- `N/A`

### User Stories

- `N/A`

### Epics o Features

- `N/A`

### Tasks Tecnicas

- `N/A`

### ADRs

- `N/A`

### Fuentes de gobernanza

- `docs/proceso/template-sdlc-y-bootstrap-de-analisis.md`
- `docs/proceso/sistema-de-trabajo-multiagente.md`
- `docs/proceso/consolidacion-documental-para-inicio-del-proyecto.md`
- `docs/proceso/auditoria-de-personalizacion-y-brechas.md`
- `.github/skills/orquestacion-multiagente/SKILL.md`
- `.github/skills/gitflow-prs/SKILL.md`
- `docs/skills/catalogo-de-skills-del-proyecto.md`

## Owned Surfaces

- `.github`
- `docs`
- `scripts`

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

