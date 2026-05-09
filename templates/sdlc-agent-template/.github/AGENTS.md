# AGENTS.md — Registro de Personalizacion del Repositorio

Este archivo centraliza la configuracion operativa del agente para
`{{PROJECT_NAME}}`.

## Skills internas del repositorio

- contexto del proyecto: `.github/skills/contexto-proyecto/SKILL.md`
- analisis funcional y enriquecimiento: `.github/skills/enrich-us/SKILL.md`
- cierre de trabajo y PRs: `.github/skills/commit/SKILL.md`
- documentacion viva: `.github/skills/documentacion-viva/SKILL.md`
- orquestacion multiagente: `.github/skills/orquestacion-multiagente/SKILL.md`

## Agentes versionados

- `Planificador Opus`
- `Orquestador Opus`
- `Analista OpenSpec`
- `QA Security Review`

## Validaciones operativas base

- `npm run validate:docs-canonical`
- `npm run validate:enhanced-research -- <change-name>`
- `npm run validate:openspec`

## Regla operativa para el agente

1. Cargar primero la skill `contexto-proyecto`.
2. Si la tarea toca comportamiento funcional no trivial, revisar `openspec/specs/`.
3. Si la capacidad no existe o va a cambiar, abrir o actualizar un change en `openspec/changes/`.
4. Mantener idioma espanol en documentacion, PRs, issues y commits.
5. Los documentos activos usan nombres canonicos; las versiones reemplazadas van a `docs/archive/`.
