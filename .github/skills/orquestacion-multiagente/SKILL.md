---
name: orquestacion-multiagente
description: "Orquesta trabajo por fases, roles y skills en PasarelaDePago. Usar cuando una tarea deba dividirse entre planificacion, ejecucion, documentacion, validacion o multiples agentes especializados."
---

# Orquestacion Multiagente

## Fases

1. requisitos
2. planificacion
3. orquestacion
4. ejecucion
5. validacion
6. deploy

## Regla

Separar siempre:

- quien planifica
- quien ejecuta
- quien valida
- que skill gobierna cada fase
- que agente posee la fase o superficie
- que estado compartido debe actualizarse

## Contrato minimo por handoff

- objetivo concreto
- artefacto de entrada
- skill o instruccion aplicable
- salida esperada
- criterio de cierre
- riesgos abiertos
- gate humano requerido

## Referencia

Antes de delegar:

1. leer `.github/agents/ownership-matrix.md`
2. leer `.github/agent-state/phase-status.yaml`
3. revisar `.github/agent-state/current-slice.md`
4. usar `.github/agent-state/handoffs/TEMPLATE.md` si el trabajo pasa a otro agente
5. leer la version mas reciente de `docs/proceso/sistema-de-trabajo-multiagente*.md`
