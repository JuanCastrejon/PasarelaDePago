# AGENTS.md

Contexto operativo del repositorio `PasarelaDePago`.

La fuente primaria de reglas del proyecto vive en `.github/`. Este archivo existe para dar una entrada rapida a agentes y herramientas que esperan un `AGENTS.md` en la raiz.

## Agent skills

### Issue tracker

El repositorio usa `GitHub Issues` como tracker operativo inicial. Azure DevOps se incorporara mas adelante como capa de gobierno y backlog ampliado. Ver `docs/agents/issue-tracker.md`.

### Triage labels

Se usan las etiquetas canonicas `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human` y `wontfix`. Ver `docs/agents/triage-labels.md`.

### Domain docs

El repositorio usa layout `single-context` con `CONTEXT.md` en la raiz, `indice-operativo.md` como mapa operativo y `docs/` como corpus historico del dominio. Ver `docs/agents/domain.md`.

### External tools

El inventario operativo de frameworks, bundles de skills y tooling complementario vive en `docs/agents/external-tools-matrix.md`.
Resumen actual:

- `OpenSpec`: instalado repo-local con perfil activo `analysis-first-sdd`.
- `enrich-us`: skill oficial para enriquecer historias antes del flujo OpenSpec.
- `commit`: skill oficial para cierre con Conventional Commits y PR contra `develop`.
- `Graphify`: configurado con `.graphifyignore` para investigacion documental del repo.

## Regla operativa

1. Leer primero `.github/copilot-instructions.md`.
2. Si la tarea toca flujo del repo, leer `.github/AGENTS.md`.
3. Cargar primero `.github/skills/contexto-proyecto/SKILL.md` y luego la skill especifica de la tarea.
4. Si el cambio afecta comportamiento funcional no trivial, revisar primero `openspec/specs/` y `docs/guides/adopcion-openspec-sdd.md`.
5. Si la capacidad no existe o va a cambiar, abrir o actualizar un change en `openspec/changes/` antes de tocar codigo de producto.
6. Si hay conflicto entre una skill externa y una regla interna, prevalece `.github/`.
7. Toda modificacion debe seguir el flujo `feature/* -> develop -> main` por PR.

## Referencias rapidas

- Registro operativo completo: `.github/AGENTS.md`
- Indice operativo: `indice-operativo.md`
- Indice maestro: `docs/indice-maestro.md`
- OpenSpec / SDD: `docs/guides/adopcion-openspec-sdd.md`
- Sistema multiagente: `docs/proceso/sistema-de-trabajo-multiagente.md`
- Matriz de tools externas: `docs/agents/external-tools-matrix.md`

