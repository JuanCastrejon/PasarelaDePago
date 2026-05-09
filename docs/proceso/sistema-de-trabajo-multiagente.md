---
status: active
updated: 2026-05-09
supersedes:
  - docs/proceso/sistema-de-trabajo-multiagente1.md
  - docs/proceso/sistema-de-trabajo-multiagente2.md
---

# Sistema de Trabajo Multiagente v2

Fecha de actualizacion: 2026-05-02

## 1. Objetivo

Definir un sistema de trabajo que convierta el repositorio en una base real para colaboracion humano + IA, con planificacion, orquestacion, ejecucion y validacion claramente separadas.

## 2. Capas del sistema

### `SDD`

Disciplina personal para pensar, partir problemas y cerrar slices con criterio.

### `OpenSpec`

Capa compartible de:

- requisitos
- backlog
- ADRs
- roadmap

### `Engram`

Memoria persistente del proyecto en:

- `CONTEXT.md`
- `docs/`
- skills internas
- workflows locales

## 2.1 Plano de control

El sistema separa gobierno de ejecucion:

- `Planificador Opus`: convierte cambios en slices ejecutables
- `Orquestador Opus`: asigna agente, contexto minimo y gate humano

## 2.2 Agentes especializados versionados

La ejecucion y el aseguramiento quedan repartidos entre agentes versionados en `.github/agents/`:

- `Analista OpenSpec`
- `Arquitecto Dominio Pagos`
- `Payment Core`
- `Web Operaciones`
- `Integraciones y Datos`
- `QA Security Review`

## 3. Fases

### Fase 1 - Requisitos

Entrada:

- investigacion
- contexto de negocio
- riesgos

Salida:

- requisitos
- casos de uso
- historias

Owner principal:

- `Analista OpenSpec`

### Fase 2 - Planificacion

Rol lider:

- `Planificador Opus`

Salida:

- slices
- orden tecnico
- dependencias

Apoyo de diseno:

- `Arquitecto Dominio Pagos`

### Fase 3 - Orquestacion

Rol lider:

- `Orquestador Opus`

Salida:

- asignacion de tarea
- skill aplicable
- contexto minimo

### Fase 4 - Ejecucion

Roles sugeridos:

- `Payment Core`
- `Web Operaciones`
- `Integraciones y Datos`

### Fase 5 - Validacion

Agente de aseguramiento:

- `QA Security Review`

Roles humanos:

- testing
- QA
- review

### Fase 6 - Deploy

Roles humanos:

- deploy
- monitoreo

## 4. Contrato de handoff

Toda delegacion debe incluir:

1. objetivo concreto
2. artefacto de entrada
3. skill o instruccion aplicable
4. salida esperada
5. criterio de cierre
6. riesgos abiertos
7. gate humano requerido

## 5. Reglas de uso

1. La planificacion ocurre antes de dividir.
2. La documentacion es parte del cierre.
3. Los agentes no inventan stack ni proceso; leen el repo.
4. La validacion humana tiene la ultima palabra en merge, QA y deploy.
5. El estado operativo compartido vive en `.github/agent-state/`.
6. El ownership por fase y superficie vive en `.github/agents/ownership-matrix.md`.
7. Los cambios en codigo, skills o control plane deben pasar un gate ligero de drift documental y operativo.
8. Toda slice activa debe declarar su trazabilidad minima en `current-slice.md`.
9. Las superficies reales del monorepo deben mapearse a backlog y ADRs en la matriz de trazabilidad por superficie.
10. Las reglas fundacionales del dominio deben tener guardrails semanticos automatizados.

## 6. Artefactos operativos nuevos

- manifiestos de agentes: `.github/agents/*.agent.md`
- matriz de ownership: `.github/agents/ownership-matrix.md`
- estado compartido: `.github/agent-state/`
- mapa documental: `docs/agents/mapa-de-agentes-y-handoffs.md`
- validacion de drift: `scripts/validate-drift.mjs`
- validacion de trazabilidad: `scripts/validate-slice-traceability.mjs`
- matriz por superficie: `.github/agents/surface-traceability.json`
- validacion por superficie: `scripts/validate-surface-traceability.mjs`
- guardrails semanticos: `.github/agents/semantic-guardrails.json`
- validacion semantica: `scripts/validate-semantic-guardrails.mjs`




