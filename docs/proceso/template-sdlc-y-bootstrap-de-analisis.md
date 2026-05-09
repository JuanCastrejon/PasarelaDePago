---
status: active
updated: 2026-05-09
supersedes:
  - docs/proceso/template-sdlc-y-bootstrap-de-analisis1.md
---

# Template SDLC y Bootstrap de Analisis v1

Fecha de actualizacion: 2026-05-09

## 1. Objetivo

Definir la secuencia de trabajo para convertir el framework operativo que ya maduro en `FacturacionDian` en una base reusable de inicio de proyecto, usando `PasarelaDePago` como primer piloto controlado.

## 2. Decisiones de arranque

### Secuencia recomendada

- primero construir la base reusable dentro de una rama de trabajo de `PasarelaDePago`
- despues validar el flujo con artefactos reales del repo
- por ultimo extraer la version estabilizada a un repositorio-template

### Modelo de capas

- `core`: gobierno, control plane, validadores, `OpenSpec`, skills base, matriz de tools
- `profile`: perfiles como `analysis-first-sdd` o `legacy-brownfield-sdd`
- `project`: dominio, contexto, backlog, ADRs, reglas y skills especializadas

### Regla de bootstrap

El bootstrap en `PasarelaDePago` debe ser aditivo:

- no mover el corpus documental existente
- no romper el `single-context` vigente
- no mezclar normalizacion documental con implementacion del framework

## 3. Alcance inicial del piloto

### Capa base a introducir

- `openspec/` con perfil de analisis
- skills `enrich-us` y `commit`
- `indice-operativo.md` como mapa de trabajo del agente
- `docs/agents/external-tools-matrix.md`
- validadores de analisis complementarios
- catalogo vacio de reglas de negocio y estructura UAT inicial

### Capa de gobierno a mantener

- `GitHub Issues` como tracker operativo inicial
- flujo `feature/* -> develop -> main`
- control plane actual en `.github/agents/` y `.github/agent-state/`

## 4. Orden de ejecucion

1. crear rama de trabajo y slice operativo
2. documentar estrategia del bootstrap
3. instalar la capa reusable de `OpenSpec` y skills de analisis
4. adaptar documentos de entrada del proyecto al nuevo flujo
5. validar el proceso end-to-end con una historia real
6. extraer la version estabilizada como template independiente

## 5. Criterio de exito

Consideraremos exitoso este piloto cuando `PasarelaDePago` pueda:

- levantar un cambio nuevo desde una historia o necesidad
- enriquecerlo con investigacion reutilizable
- convertirlo en artefactos versionados de trabajo
- mantener trazabilidad y gobierno sin depender de memoria oral

## 6. Riesgos a vigilar

- sobreajustar la plantilla al estado actual de `PasarelaDePago`
- introducir demasiada ceremonia para cambios pequenos
- instalar herramientas externas sin un orden de gobernanza claro
- duplicar fuentes de verdad entre `docs/` y la nueva capa de especificacion

## 7. Siguiente bloque de trabajo

La siguiente iteracion debe enfocarse en:

- crear el perfil `analysis-first-sdd`
- bootstrapear `openspec/`
- incorporar `enrich-us` y `commit`
- crear la matriz de tools externas para este repo
- abrir el primer artefacto operativo con el nuevo flujo

