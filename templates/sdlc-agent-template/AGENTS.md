# AGENTS.md

Contexto operativo del repositorio `{{PROJECT_NAME}}`.

La fuente primaria de reglas del proyecto vive en `.github/`.

## Agent skills

### Issue tracker

El repositorio usa `{{TRACKER}}` como tracker operativo por defecto. Ver
`docs/agents/issue-tracker.md`.

### Triage labels

Se usan las etiquetas canonicas `needs-triage`, `needs-info`,
`ready-for-agent`, `ready-for-human` y `wontfix`. Ver
`docs/agents/triage-labels.md`.

### Domain docs

El repositorio usa layout `single-context` con `CONTEXT.md` en la raiz,
`indice-operativo.md` como mapa operativo y `docs/` como corpus historico del
dominio. Ver `docs/agents/domain.md`.

### External tools

El inventario operativo de frameworks, bundles de skills y tooling
complementario vive en `docs/agents/external-tools-matrix.md`.

## Regla operativa

1. Leer primero `.github/copilot-instructions.md`.
2. Si la tarea toca flujo del repo, leer `.github/AGENTS.md`.
3. Cargar primero `.github/skills/contexto-proyecto/SKILL.md` y luego la skill especifica de la tarea.
4. Si el cambio afecta comportamiento funcional no trivial, revisar `openspec/specs/` y `docs/guides/adopcion-openspec-sdd.md`.
5. Si la capacidad no existe o va a cambiar, abrir o actualizar un change en `openspec/changes/` antes de tocar codigo de producto.
6. Si hay conflicto entre una skill externa y una regla interna, prevalece `.github/`.
7. Toda modificacion debe seguir el flujo `{{DEFAULT_BRANCH_FLOW}}`.

## Referencias rapidas

- Registro operativo completo: `.github/AGENTS.md`
- Indice operativo: `indice-operativo.md`
- OpenSpec / SDD: `docs/guides/adopcion-openspec-sdd.md`
- Matriz de tools externas: `docs/agents/external-tools-matrix.md`
