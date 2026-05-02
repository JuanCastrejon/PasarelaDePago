# Handoff - QA y Gate

## Objetivo

Validar que la slice de `payment_order` sea pequena, canonica y lista para abrir la siguiente slice de `payment_attempt`.

## Fase

SDLC: implementacion -> aseguramiento

Repo: ejecucion -> validacion

## Agente origen

`payment-core` y `web-operaciones`

## Agente destino

`qa-security-review`

## Artefactos de entrada

- cambios en `packages/payment-core`
- cambios en `apps/web/src/app/api/payment-orders/route.ts`
- `slice-payment-order-bootstrap1.md`
- `ADR-0002`
- validaciones del repo

## Skills a cargar

- `contexto-proyecto`
- `diagnose`
- `vitest`

## Salida esperada

- reporte de findings
- confirmacion de que la orden y el intento siguen separados
- confirmacion de que no aparecieron secretos de tarjeta

## Criterio de cierre

- la slice queda aprobada o devuelta con findings accionables

## Riesgos abiertos

- crecimiento accidental del alcance hacia `payment_attempt`
- payload web distinto al dominio

## Gate humano

- `Lead`
- `Testing`
- `Code Reviewer`
