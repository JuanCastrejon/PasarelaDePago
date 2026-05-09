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
- Next.js web: `.github/instructions/nextjs-web.instructions.md`
- SQL y Supabase: `.github/instructions/sql-database.instructions.md`
- arquitectura de pagos: `.github/instructions/pagos-arquitectura.instructions.md`
- workflows y asincronia: `.github/instructions/vercel-workflows.instructions.md`
- documentacion y backlog: `.github/instructions/documentacion-y-backlog.instructions.md`
- gitflow y versionado: `.github/instructions/gitflow-versionado.instructions.md`
- testing y calidad: `.github/instructions/testing-quality.instructions.md`

### Skills internas del repositorio

- contexto del proyecto: `.github/skills/contexto-proyecto/SKILL.md`
- analisis funcional y enriquecimiento: `.github/skills/enrich-us/SKILL.md`
- cierre de trabajo y PRs: `.github/skills/commit/SKILL.md`
- gitflow y PRs: `.github/skills/gitflow-prs/SKILL.md`
- operacion CLI y DevOps: `.github/skills/operacion-cli-devops/SKILL.md`
- documentacion viva: `.github/skills/documentacion-viva/SKILL.md`
- orquestacion multiagente: `.github/skills/orquestacion-multiagente/SKILL.md`
- arquitectura y dominio de pagos: `.github/skills/arquitectura-dominio-pagos/SKILL.md`
- auditoria backend del payment core: `.github/skills/backend-audit-pagos/SKILL.md`
- UI/UX de operaciones y checkout: `.github/skills/ui-ux-operaciones-pagos/SKILL.md`

### Agentes versionados

#### Control plane

- `Planificador Opus`: `.github/agents/planificador-opus.agent.md`
- `Orquestador Opus`: `.github/agents/orquestador-opus.agent.md`

#### Specialist plane

- `Analista OpenSpec`: `.github/agents/analista-openspec.agent.md`
- `Arquitecto Dominio Pagos`: `.github/agents/arquitecto-dominio-pagos.agent.md`
- `Payment Core`: `.github/agents/payment-core.agent.md`
- `Web Operaciones`: `.github/agents/web-operaciones.agent.md`
- `Integraciones y Datos`: `.github/agents/integraciones-datos.agent.md`
- `QA Security Review`: `.github/agents/qa-security-review.agent.md`

#### Matriz de ownership

- matriz principal: `.github/agents/ownership-matrix.md`
- resumen de uso: `.github/agents/README.md`

### Estado compartido y handoffs

- estado de fase: `.github/agent-state/phase-status.yaml`
- slice actual: `.github/agent-state/current-slice.md`
- decisiones abiertas: `.github/agent-state/open-decisions.md`
- riesgos abiertos: `.github/agent-state/open-risks.md`
- plantilla de handoff: `.github/agent-state/handoffs/TEMPLATE.md`
- plantilla de phase gate: `.github/agent-state/templates/phase-gate.md`

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

### Hooks locales de guardrails

- configuracion base: `.github/hooks/base-guardrails.json`
- validacion pre-tool-use: `.github/hooks/scripts/pre-tool-use.js`
- mensaje de arranque de sesion: `.github/hooks/scripts/session-start.js`

### Validaciones operativas del control plane

- validacion estructural: `npm run validate:control-plane`
- validacion de drift documental y operativo: `npm run validate:drift`
- validacion de nombres canonicos documentales: `npm run validate:docs-canonical`
- validacion de research enriquecido: `npm run validate:enhanced-research -- <change-name>`
- validacion OpenSpec: `npm run validate:openspec`
- validacion de trazabilidad de slice: `npm run validate:slice-traceability`
- validacion de trazabilidad por superficie: `npm run validate:surface-traceability`
- validacion de guardrails semanticos: `npm run validate:semantic-guardrails`

## Regla operativa para el agente

1. Cargar primero la skill `contexto-proyecto`.
2. Si la tarea cruza fases o agentes, leer `.github/agents/ownership-matrix.md` y `.github/agent-state/phase-status.yaml`.
3. Cargar luego la skill especifica de la tarea.
4. Si el cambio toca comportamiento funcional no trivial, revisar `openspec/specs/` y `docs/guides/adopcion-openspec-sdd.md`.
5. Si la capacidad no existe o va a cambiar, abrir o actualizar un change en `openspec/changes/` antes de tocar codigo de producto.
6. Usar la plantilla de `handoff` cuando una salida deba consumirse por otro agente o rol humano.
7. Mantener idioma espanol en documentacion, PRs, issues y commits.
8. Mantener identificadores de codigo en ingles.
9. Toda rama de trabajo nace desde `develop`.
10. No hacer push directo a `develop` ni `main`.
11. Todo cambio va por PR.
12. Los commits deben ser atomicos y en espanol.
13. Si hay artefactos privados, evidencia sensible o material solo de referencia, deben quedar fuera del repo.
14. Los documentos activos usan nombres canonicos; las versiones reemplazadas se mueven a `docs/archive/`.
15. Si el cambio toca codigo de producto, skills, OpenSpec o control plane, debe pasar las validaciones aplicables de `control-plane`, `drift`, `docs-canonical`, `slice-traceability`, `surface-traceability`, `semantic-guardrails` y `openspec`.

## Modelo de trabajo

La estructura objetivo del proyecto es:

- `SDD` personal para pensamiento y ejecucion disciplinada
- `OpenSpec` como capa compartible de requisitos, capacidades canonicas y changes antes de implementacion
- `Engram` como memoria persistente del proyecto en documentos y skills
- skills internas para repetir criterios operativos
- 2 agentes de control plane y 6 agentes especializados documentados en `.github/agents/`
- estado operativo compartido en `.github/agent-state/`
- validacion humana final para testing, QA, code review y deploy

## Estructura tecnica actual

- `apps/web`: capa web y futura superficie operativa en Next.js
- `packages/payment-core`: dominio, contratos y orquestacion reusable
- `supabase/`: arranque local del esquema y migraciones
- `tests/contract/`: base para pruebas de contrato y adapters
- `openspec/`: capacidades canonicas y changes activos
- `docs/`: fuente historica y versionada del conocimiento

## Estado actual

- repositorio remoto creado y publicado
- `main` establecida como rama publica
- `develop` usada como rama de integracion
- control plane multiagente `v1` materializado con manifiestos y estado compartido
- este documento define el flujo que se usara de ahora en adelante
