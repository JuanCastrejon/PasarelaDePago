# Handoff - Arquitecto a Web Operaciones

## Objetivo

Exponer la primera ruta web de creacion de `payment_order` usando el contrato canonico del core.

## Fase

SDLC: diseno -> implementacion frontend/backend edge

Repo: planificacion -> ejecucion

## Agente origen

`arquitecto-dominio-pagos`

## Agente destino

`web-operaciones`

## Artefactos de entrada

- `slice-payment-order-bootstrap.md`
- `ADR-0004`
- `apps/web/src/app/api/payment-orders/route.ts`
- contrato o helper del `payment-core`

## Skills a cargar

- `contexto-proyecto`
- `ui-ux-operaciones-pagos`
- `next-best-practices`
- `zod`

## Salida esperada

- handler `POST /api/payment-orders` con validacion minima
- respuesta `201` canonica
- respuesta de error consistente para payload invalido

## Criterio de cierre

- la ruta deja de responder `501` y devuelve una orden inicial valida o error estructurado

## Riesgos abiertos

- acoplar la ruta a proveedor real
- validar de menos y dejar contrato ambiguo

## Gate humano

- `Testing`

