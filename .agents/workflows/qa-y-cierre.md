# QA y Cierre

## Gates minimos

- `git status` esperado
- `npm run validate:control-plane`
- `npm run validate:drift`
- `npm run validate:slice-traceability`
- `npm run validate:surface-traceability`
- `npm run validate:semantic-guardrails`
- `npm run typecheck`
- `npm run build`
- documentacion alineada
- sin artefactos privados en el commit

## Gate humano

- testing: humano
- QA: humano
- review final: humano
- deploy: humano

## Regla

Un cambio puede estar tecnicamente correcto y aun asi no estar listo para merge si no pasa el gate documental o de higiene del repo.
