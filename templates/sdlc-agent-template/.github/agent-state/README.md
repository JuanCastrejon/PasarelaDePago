# Agent State

Esta carpeta guarda el estado operativo compartido del sistema multiagente.

## Objetivo

- dar a todos los agentes una foto actual del proyecto
- registrar handoffs sin depender de memoria conversacional
- separar memoria normativa de memoria operativa

## Archivos base

- `phase-status.yaml`: estado resumido del SDLC y owners activos
- `current-slice.md`: slice actual en curso
- `open-decisions.md`: decisiones tecnicas o de producto aun abiertas
- `open-risks.md`: riesgos abiertos que afectan ejecucion o merge
- `handoffs/TEMPLATE.md`: plantilla unica de traspaso
- `handoffs/examples/`: ejemplos reales de handoff por slice
- `templates/current-slice-template.md`: plantilla base para slices trazables
- `templates/phase-gate.md`: checklist de cierre entre fases

## Regla

Si una tarea cambia la fase, el ownership, los riesgos o las decisiones activas, estos archivos deben actualizarse junto con la documentacion relevante.
