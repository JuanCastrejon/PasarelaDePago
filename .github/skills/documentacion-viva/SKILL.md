---
name: documentacion-viva
description: "Mantiene README, docs, backlog y skills sincronizados con el estado real de PasarelaDePago. Usar cuando se complete una funcionalidad, cambie la arquitectura, se actualice el backlog, se cree una nueva capa del monorepo o se modifique el flujo operativo."
---

# Documentacion Viva

## Principio

Si cambia el proyecto, cambia la documentacion y la memoria operativa.

## Validaciones recomendadas

- `npm run validate:control-plane`
- `npm run validate:drift`
- `npm run validate:slice-traceability`
- `npm run validate:surface-traceability`
- `npm run validate:semantic-guardrails`

## Archivos a revisar

- `README.md`
- el indice maestro vigente
- documentos de dominio, requisitos, backlog o ADRs afectados
- `.github/AGENTS.md`
- `.github/agent-state/` si cambio fase, ownership, riesgos o decisiones activas
- skills internas si cambio el flujo

## Cuadricula de sincronizacion

| Tipo de cambio | Documentos a revisar |
|---|---|
| nueva capa del monorepo | README, indice maestro, skill `contexto-proyecto` |
| cambio de stack o dependencia relevante | `copilot-instructions.md`, docs de proceso, allowlist de skills |
| nueva regla de arquitectura | ADR, modelo canonico, skill de arquitectura |
| nueva regla operativa | `.github/AGENTS.md`, `VERSIONADO.md`, workflows |
| cambio en ownership, handoffs o control plane | `.github/AGENTS.md`, `docs/proceso/`, `.github/agent-state/`, docs de agentes |
