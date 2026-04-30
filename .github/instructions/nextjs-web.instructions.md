---
description: "Usar cuando se trabaje con archivos TypeScript, TSX o CSS de apps/web. Incluye convenciones de App Router, route handlers, UI operacional y acoplamiento permitido con payment-core."
applyTo: "apps/web/**/*.{ts,tsx,css}"
---

# Convenciones Web Next.js

## Estructura

```text
src/
  app/        -> rutas, layouts, route handlers y superficies del producto
```

## Reglas

- preferir Server Components por defecto; usar Client Components solo cuando exista una necesidad real de interaccion local
- route handlers en `app/api/**/route.ts` deben responder rapido y delegar trabajo pesado
- nunca exponer secretos de proveedor o credenciales de infraestructura al cliente
- el panel debe comunicar operacion, no solo estetica
- si se consume `@pasarela/payment-core`, mantener el web app como capa de presentacion y coordinacion, no como dueña del dominio

## UI del proyecto

- el checkout y el backoffice deben sentirse como producto serio, no como landing generica
- toda vista relevante debe contemplar estados `loading`, `empty`, `error` y `partial`
- las interfaces operativas deben priorizar legibilidad de referencias, estados y tiempos

## Rutas futuras esperadas

- `app/api/payment-orders`
- `app/api/payment-attempts`
- `app/api/webhooks/[provider]`
- `app/operations`
- `app/reconciliation`
