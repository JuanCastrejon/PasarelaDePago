# Sistema de Trabajo Multiagente

## Objetivo

Definir como se organiza el trabajo entre planeacion, orquestacion, ejecucion y validacion humana.

## Fase 1 — Requisitos

- humano + IA
- requisitos funcionales
- requisitos no funcionales
- casos de uso
- logica de negocio

## Fase 2 — Planificacion

- rol sugerido: `Planificador Opus`
- descompone el sistema
- propone arquitectura inicial
- genera roadmap tecnico
- asigna slices

## Fase 3 — Orquestacion

- rol sugerido: `Orquestador Opus`
- decide que agente actua
- define contexto minimo
- define skills necesarias

## Fase 4 — Ejecucion

- roles sugeridos: backend, frontend, integraciones, documentacion
- modelo sugerido: `Sonnet` o equivalente para ejecucion
- cada agente usa skills internas y externas

## Fase 5 — Validacion

- testing humano
- QA humano
- code review humano

## Fase 6 — Deploy

- despliegue humano
- monitoreo humano

## Regla

Ninguna fase debe saltarse los artefactos de salida de la fase anterior.
