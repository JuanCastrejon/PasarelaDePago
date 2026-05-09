---
status: active
updated: 2026-05-09
supersedes:
  - docs/skills/catalogo-de-skills-del-proyecto2.md
---

# Catalogo de Skills del Proyecto v2

Fecha de actualizacion: 2026-05-09

## 1. Objetivo

Consolidar las skills que ya gobiernan el trabajo del proyecto, separando las internas del repo de las externas curadas por stack.

## 2. Skills internas del repositorio

### Core de operacion

- `contexto-proyecto`
- `documentacion-viva`
- `gitflow-prs`
- `operacion-cli-devops`
- `orquestacion-multiagente`

### Core de dominio

- `arquitectura-dominio-pagos`
- `backend-audit-pagos`
- `ui-ux-operaciones-pagos`

### Dominio especializado en `project-skills/`

- auditoria de proveedores
- webhooks y failover
- estados asincronos
- settlement y conciliacion
- onboarding y payouts

## 3. Skills externas curadas

### Desde `mattpocock/skills`

- `setup-matt-pocock-skills`
- `grill-with-docs`
- `to-prd`
- `to-issues`
- `tdd`
- `diagnose`
- `improve-codebase-architecture`
- `zoom-out`
- `triage`

### Desde `ComposioHQ/awesome-codex-skills`

- `webapp-testing`
- `deploy-pipeline`
- `issue-triage`

### Desde `autoskills`

- skills detectadas por `Next.js`, `Supabase`, `Turborepo`, `Playwright`, `Vitest`, `Tailwind`, `Zod`

## 4. Estado de instalacion

- `autoskills` ya se ejecuto localmente para el stack detectado del repo
- tambien quedaron instaladas skills adicionales de `mattpocock/skills` y `ComposioHQ/awesome-codex-skills` en `~/.codex/skills`
- `setup-matt-pocock-skills` ya quedo aterrizada en `AGENTS.md` y `docs/agents/`

## 5. Regla de uso

1. primero skills internas
2. luego skills de dominio local
3. despues skills externas por stack

## 6. Criterio de madurez

Una skill es util si:

- reduce ambiguedad
- acelera una tarea repetible
- protege una regla del proyecto
- mejora calidad visible en el repo

