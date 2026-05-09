---
status: active
updated: 2026-05-09
supersedes:
  - docs/backlog/slices/slice-sdlc-template-bootstrap1.md
---

# Slice Pack - SDLC Template Bootstrap v1

Fecha: 2026-05-09
Estado: en planificacion
Prioridad: `P0`

## 1. Objetivo

Preparar en `PasarelaDePago` una base operativa para convertir el framework de trabajo actual en una plantilla reusable de inicio de proyecto, usando este repo como piloto para el bootstrap de analisis, OpenSpec y gobierno documental.

## 2. Resultado esperado

Al cerrar esta slice, el repo deberia tener:

- una rama de trabajo dedicada al bootstrap del template
- un slice operativo nuevo alineado con el control plane
- una ruta de ejecucion clara para instalar `OpenSpec`, `enrich-us`, `commit`, validadores y matriz de tools externas
- una decision explicita de trabajar con bootstrap aditivo sobre la documentacion ya existente

## 3. Trazabilidad

### Requisitos

- N/A

### Casos de uso

- N/A

### User stories

- N/A

### Features o epics

- N/A

### Tasks tecnicas

- N/A

### ADRs

- N/A

## 4. Superficies afectadas

- `.github`
- `docs`
- `scripts`

## 5. Alcance

- crear una rama `feature/*` para concentrar el trabajo
- abrir una slice de gobernanza para el bootstrap del template
- documentar la secuencia `core -> profile -> project`
- preparar la cola de trabajo para `OpenSpec`, skills de analisis y `external-tools-matrix`

## 6. Fuera de alcance

- cambios de producto en `apps/web`
- cambios de producto en `packages/payment-core`
- cambios de esquema o migraciones en `supabase`
- reorganizacion masiva del corpus documental existente
- bootstrap operativo de Azure DevOps

## 7. Diseño de implementacion propuesto

### Gobernanza

- usar `PasarelaDePago` como primer piloto controlado
- mantener `GitHub Issues` como tracker por defecto en esta etapa
- trabajar con una capa reusable `analysis-first-sdd` en lugar de acoplar todo al perfil brownfield

### Documentacion

- crear un documento de proceso que describa la estrategia del bootstrap
- registrar el slice activo en `.github/agent-state/`
- mantener el indice maestro enlazado al nuevo artefacto de proceso

### Ejecucion

- instalar primero la capa base reusable
- adaptar despues los artefactos especificos del proyecto
- posponer la extraccion a repositorio-template hasta validar el flujo dentro de este repo

## 8. Agentes involucrados

- `Planificador Opus`
- `Orquestador Opus`
- `Analista OpenSpec`
- `QA Security Review`

## 9. Handoffs asociados

- por definir durante la implementacion del bootstrap

## 10. Validaciones obligatorias

- `npm run validate:control-plane`
- `npm run validate:drift`
- `npm run validate:slice-traceability`
- `npm run validate:surface-traceability`
- `npm run validate:semantic-guardrails`

## 11. Gate humano

- confirmar que el bootstrap siga siendo aditivo y no reorganice el corpus existente
- confirmar que la plantilla se valide primero en `PasarelaDePago` antes de publicarse como template independiente

## 12. Riesgos abiertos

- intentar extraer una plantilla demasiado pronto y sobreajustada al contexto actual
- mezclar bootstrap del framework con reorganizacion documental profunda
- abrir demasiadas herramientas externas al mismo tiempo sin orden de adopcion

