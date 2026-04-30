# Estrategia de Versionado

## Principio

Solo se versiona lo que aporta ejecucion, decisiones tecnicas, trazabilidad o valor publico al repositorio.

## Versionado

### Documentacion y gobierno

- `README.md`
- `CONTEXT.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.github/`
- `.agents/workflows/`
- `docs/`
- `supabase/`

### Codigo y configuracion

- `apps/`
- `packages/`
- `package.json`
- `package-lock.json`
- `turbo.json`
- `tsconfig.base.json`
- `tsconfig.json`
- `.vscode/extensions.json`

### Skills del proyecto

- `.github/skills/*/SKILL.md`
- `project-skills/*/SKILL.md`

## Ignorado

### Secretos y configuracion local

- `.env`
- `.env.local`
- `.vscode/settings.json`
- `.vscode/mcp.json`
- `.copilot/`
- `.agents/skills/`
- `skills-lock.json`

### Artefactos locales

- `node_modules/`
- `.next/`
- `dist/`
- `.cache/`
- `coverage/`
- `playwright-report/`
- `test-results/`
- `supabase/.temp/`

### Evidencia privada o de referencia

- `docs/Gmail - *.pdf`
- `copia_.github_otro_proyecto_de_referencia/`

## Flujo de ramas

1. crear rama desde `develop`
2. desarrollar en `feature/*`, `fix/*` o `docs/*`
3. abrir PR a `develop`
4. promover `develop` a `main` solo por PR

## Reglas de commit

- mensajes en espanol
- formato tipo `feat(...)`, `fix(...)`, `docs(...)`, `chore(...)`
- un commit = un objetivo

## Checklist previo al commit

- [ ] `git status` revisado
- [ ] `git diff --staged` revisado
- [ ] sin secretos ni archivos temporales
- [ ] sin evidencia privada o material local de referencia
- [ ] validaciones minimas ejecutadas
