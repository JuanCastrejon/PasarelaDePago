---
description: "Reglas para mantener documentacion, requisitos, backlog y ADRs sincronizados con el repositorio. Usar cuando: se cambie alcance, arquitectura, backlog o flujo operativo."
---

# Documentacion y Backlog

## Reglas

- no sobrescribir documentos previos si la politica del repo pide version incremental
- si un cambio modifica arquitectura o flujo, actualizar docs relevantes en la misma rama
- usar `docs/indice-maestro1.md` como nodo de navegacion
- requisitos, backlog y ADRs deben mantenerse alineados

## Orden de actualizacion

1. documento fuente del cambio
2. indice maestro
3. backlog o ADR relacionado
4. skills internas si cambia el flujo de trabajo
