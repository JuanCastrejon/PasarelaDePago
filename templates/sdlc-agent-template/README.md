# `sdlc-agent-template`

Plantilla local para iniciar proyectos con flujo `analysis-first` asistido por
agentes, OpenSpec y documentacion viva.

## Incluye

- `AGENTS.md` y `.github/AGENTS.md`
- `indice-operativo.md`
- `docs/agents/`, `docs/guides/`, `docs/domain/`, `docs/requirements/uat/`
- `openspec/` con `analysis-first-sdd` y `legacy-brownfield-sdd`
- skills `contexto-proyecto`, `enrich-us` y `commit`
- validadores base de documentacion, research y OpenSpec

## Placeholders

- `{{PROJECT_NAME}}`
- `{{STACK}}`
- `{{TRACKER}}`
- `{{DEFAULT_BRANCH_FLOW}}`

## Uso sugerido

1. Reemplazar placeholders.
2. Completar `CONTEXT.md`.
3. Ajustar `docs/agents/external-tools-matrix.md`.
4. Sembrar las primeras capacidades en `openspec/specs/`.
5. Abrir el primer issue y correr `enrich-us`.
