# AGENTS.md — Registro de Personalizacion del Repositorio

Este archivo centraliza la configuracion operativa del agente para `PasarelaDePago`.

## Objetivo

- unificar instrucciones, skills, prompts, workflows y gobierno del repo
- mantener un flujo compatible con gitflow `develop -> main`
- permitir trabajo multiagente sin perder trazabilidad

## Orden de prioridad

1. `.github/copilot-instructions.md`
2. `.github/instructions/*.instructions.md`
3. `.github/skills/*/SKILL.md`
4. `AGENTS.md` y `docs/agents/*.md`
5. `project-skills/*/SKILL.md`
6. `.agents/workflows/*.md`
7. skills externas instaladas en Codex

## Mapa de personalizaciones

### Instrucciones

- base global: `.github/copilot-instructions.md`
- gobernanza: `.github/instructions/agent-personalizacion.instructions.md`
- TypeScript y dominio: `.github/instructions/typescript-domain.instructions.md`
- arquitectura de pagos: `.github/instructions/pagos-arquitectura.instructions.md`
- documentacion y backlog: `.github/instructions/documentacion-y-backlog.instructions.md`
- gitflow y versionado: `.github/instructions/gitflow-versionado.instructions.md`

### Skills internas del repositorio

- contexto del proyecto: `.github/skills/contexto-proyecto/SKILL.md`
- gitflow y PRs: `.github/skills/gitflow-prs/SKILL.md`
- operacion CLI y DevOps: `.github/skills/operacion-cli-devops/SKILL.md`
- documentacion viva: `.github/skills/documentacion-viva/SKILL.md`
- orquestacion multiagente: `.github/skills/orquestacion-multiagente/SKILL.md`
- arquitectura y dominio de pagos: `.github/skills/arquitectura-dominio-pagos/SKILL.md`

### Skills de dominio ya existentes

- catalogo local: `project-skills/`
- estas skills quedan como apoyo especializado para investigacion y auditoria del dominio

### Prompts reutilizables

- planificacion opus: `.github/prompts/planificacion-opus.prompt.md`
- orquestacion multiagente: `.github/prompts/orquestacion-multiagente.prompt.md`
- ejecucion de slice: `.github/prompts/ejecucion-slice.prompt.md`
- revision final: `.github/prompts/revision-entrega.prompt.md`

### Workflows locales

- sistema multiagente: `.agents/workflows/sistema-trabajo-multiagente.md`
- `SDD` + `OpenSpec` + `Engram`: `.agents/workflows/sdd-openspec-engram.md`
- gitflow del repo: `.agents/workflows/flujo-feature-develop-main.md`
- gobernanza de skills: `.agents/workflows/gobernanza-skills-externas.md`
- QA y cierre: `.agents/workflows/qa-y-cierre.md`

## Regla operativa para el agente

1. Cargar primero la skill `contexto-proyecto`.
2. Cargar luego la skill especifica de la tarea.
3. Mantener idioma espanol en documentacion, PRs, issues y commits.
4. Mantener identificadores de codigo en ingles.
5. Toda rama de trabajo nace desde `develop`.
6. No hacer push directo a `develop` ni `main`.
7. Todo cambio va por PR.
8. Los commits deben ser atomicos y en espanol.
9. Si hay artefactos privados, evidencia sensible o material solo de referencia, deben quedar fuera del repo.

## Modelo de trabajo

La estructura objetivo del proyecto es:

- `SDD` personal para pensamiento y ejecucion disciplinada
- `OpenSpec` como capa compartible de requisitos y backlog
- `Engram` como memoria persistente del proyecto en documentos y skills
- skills internas para repetir criterios operativos
- 6 agentes personalizados documentados, con orquestacion y planificacion separadas de la ejecucion
- validacion humana final para testing, QA, code review y deploy

## Estado actual

- repositorio remoto creado y publicado
- `main` establecida como rama publica
- `develop` usada como rama de integracion
- este documento define el flujo que se usara de ahora en adelante
