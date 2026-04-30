---
description: "Usar cuando se trabaje con webhooks, jobs, route handlers asincronos, polling o flujos durables sobre Vercel Workflow y Queues."
applyTo: "apps/web/src/app/api/**/*.ts"
---

# Workflows y Asincronia

## Reglas

1. un webhook no hace trabajo pesado inline si puede responder rapido y delegar
2. toda recepcion de evento debe ser idempotente
3. la normalizacion del proveedor sucede antes de afectar estado de negocio
4. el polling es respaldo, no reemplazo de webhooks
5. un retry tecnico nunca debe reciclar silenciosamente el mismo `payment_attempt`

## Cuando usar durabilidad

- polling de estados pendientes
- reconciliaciones
- reintentos programados
- ingestiones o callbacks de proveedores inestables
- dispersiones por lote

## Capas minimas esperadas

- route handler de recepcion
- normalizador de payload
- persistencia del evento
- dispatcher a workflow o cola
- procesador con deduplicacion y trazabilidad
