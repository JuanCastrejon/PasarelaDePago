# Open Risks

## Riesgo 1

- severidad: media
- area: proceso
- descripcion: los agentes ya tienen ownership documentado, pero todavia no existe enforcement automatico para impedir que un agente tome trabajo fuera de su superficie
- mitigacion: usar `ownership-matrix.md` y revisar handoffs antes de delegar

## Riesgo 2

- severidad: media
- area: memoria
- descripcion: si `phase-status.yaml` y `current-slice.md` no se actualizan, el sistema puede volver a depender de memoria oral
- mitigacion: incluir estos archivos en el checklist de cierre documental

## Riesgo 3

- severidad: baja
- area: tooling
- descripcion: la v1 no integra todavia una herramienta externa neutral para memoria o coordinacion multi-modelo
- mitigacion: evaluar `Engram`, `MCO` o una capa equivalente despues de estabilizar la gobernanza interna

## Riesgo 4

- severidad: media
- area: drift
- descripcion: la validacion actual de drift solo comprueba acompanamiento documental minimo; no detecta contradicciones semanticas entre requisitos, ADRs y codigo
- mitigacion: evolucionar despues hacia una validacion mas profunda por reglas o analisis estructural

## Riesgo 5

- severidad: media
- area: trazabilidad
- descripcion: la matriz por superficie cubre el repo actual, pero puede quedarse obsoleta si aparecen nuevos modulos sin que nadie los registre
- mitigacion: exigir `npm run validate:surface-traceability` en CI y mantener la matriz dentro del checklist de documentacion viva

## Riesgo 6

- severidad: media
- area: guardrails
- descripcion: los guardrails semanticos iniciales dependen de patrones textuales y pueden necesitar ajuste cuando el codigo gane implementaciones reales mas complejas
- mitigacion: revisar periodicamente falsos positivos y migrar reglas criticas a checks mas estructurales
