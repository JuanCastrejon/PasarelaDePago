---
name: contexto-proyecto
description: "Carga el contexto operativo y de dominio de PasarelaDePago. Usar cuando se necesite entender arquitectura, monorepo, flujo de trabajo, backlog, proveedores o reglas del proyecto antes de ejecutar cambios. Incluye referencias separadas por stack, convenciones y sistema multiagente."
---

# Contexto del Proyecto

## Procedimiento

1. Leer `.github/copilot-instructions.md`.
2. Leer `CONTEXT.md`.
3. Leer `indice-operativo.md`.
4. Leer `docs/indice-maestro.md`.
5. Si la tarea toca codigo, leer `docs/dominio/modelo-de-dominio-canonico.md`.
6. Si la tarea toca flujo del repo, leer `.github/AGENTS.md`.
7. Si la tarea toca comportamiento funcional no trivial, revisar `openspec/specs/` y `docs/guides/adopcion-openspec-sdd.md`.
8. Si la tarea toca estructura del monorepo o stack, leer:
   - `references/stack-y-monorepo.md`
   - `references/convenciones.md`
   - `references/skills-y-fases.md`

## Puntos clave

- el proyecto es una plataforma de payment orchestration para Colombia
- `PSE` y `Bre-B` son rieles importantes
- el flujo oficial de analisis es `enrich-us -> validation -> OpenSpec -> commit`
- el repositorio usa `feature/* -> develop -> main`
- la documentacion es parte del producto
- el monorepo actual vive en `apps/`, `packages/`, `supabase/`, `docs/` y `openspec/`

