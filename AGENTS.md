# AGENTS.md

Contexto operativo del repositorio `PasarelaDePago`.

La fuente primaria de reglas del proyecto vive en `.github/`. Este archivo existe para dar una entrada rapida a agentes y herramientas que esperan un `AGENTS.md` en la raiz.

## Agent skills

### Issue tracker

El repositorio usa `GitHub Issues` como tracker operativo inicial. Azure DevOps se incorporara mas adelante como capa de gobierno y backlog ampliado. Ver `docs/agents/issue-tracker.md`.

### Triage labels

Se usan las etiquetas canonicas `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human` y `wontfix`. Ver `docs/agents/triage-labels.md`.

### Domain docs

El repositorio usa layout `single-context` con `CONTEXT.md` en la raiz y documentacion de dominio/ADR bajo `docs/`. Ver `docs/agents/domain.md`.

## Regla operativa

1. Leer primero `.github/copilot-instructions.md`.
2. Si la tarea toca flujo del repo, leer `.github/AGENTS.md`.
3. Cargar primero `.github/skills/contexto-proyecto/SKILL.md` y luego la skill especifica de la tarea.
4. Si hay conflicto entre una skill externa y una regla interna, prevalece `.github/`.
5. Toda modificacion debe seguir el flujo `feature/* -> develop -> main` por PR.

## Referencias rapidas

- Registro operativo completo: `.github/AGENTS.md`
- Indice maestro: `docs/indice-maestro1.md`
- Sistema multiagente: `docs/proceso/sistema-de-trabajo-multiagente1.md`
