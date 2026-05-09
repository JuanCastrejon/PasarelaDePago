# Agentes del Proyecto

Esta carpeta materializa la capa de agentes versionados de `PasarelaDePago`.

## Objetivo

- separar plano de control de plano de ejecucion
- fijar ownership por fase y por superficie tecnica
- reducir handoffs ambiguos
- hacer que el sistema multiagente sea auditable dentro del repo

## Regla base

Todos los agentes comparten este core minimo:

- `.github/copilot-instructions.md`
- `.github/AGENTS.md`
- `.github/skills/contexto-proyecto/SKILL.md`
- `CONTEXT.md`
- `indice-operativo.md`
- `docs/indice-maestro.md`
- `openspec/specs/` cuando la tarea toque comportamiento funcional

Despues de cargar el core, cada agente agrega solo sus skills y artefactos de especialidad.

## Planos

### Control plane

- `planificador-opus`
- `orquestador-opus`

### Specialist plane

- `analista-openspec`
- `arquitecto-dominio-pagos`
- `payment-core`
- `web-operaciones`
- `integraciones-datos`
- `qa-security-review`

## Artefactos operativos relacionados

- `.github/agents/ownership-matrix.md`
- `.github/agents/surface-traceability.json`
- `.github/agents/semantic-guardrails.json`
- `.github/agent-state/phase-status.yaml`
- `.github/agent-state/current-slice.md`
- `.github/agent-state/open-decisions.md`
- `.github/agent-state/open-risks.md`
- `.github/agent-state/handoffs/TEMPLATE.md`

