# Handoff - Arquitecto a Payment Core

## Objetivo

Implementar el modelo y helper inicial de `payment_order` sin contaminarlo con logica de proveedor.

## Fase

SDLC: diseno -> implementacion backend

Repo: planificacion -> ejecucion

## Agente origen

`arquitecto-dominio-pagos`

## Agente destino

`payment-core`

## Artefactos de entrada

- `slice-payment-order-bootstrap.md`
- `ADR-0002`
- `docs/dominio/modelo-de-dominio-canonico.md`
- `packages/payment-core/src/domain/payment-order.ts`

## Skills a cargar

- `contexto-proyecto`
- `backend-audit-pagos`
- `typescript-advanced-types`

## Salida esperada

- helper o caso de uso para crear `PaymentOrder`
- payload canonico de salida
- riesgo documentado si falta una regla del dominio

## Criterio de cierre

- el dominio puede construir una orden valida sin `providerCode`, `attemptNumber` ni `rawProviderStatus`

## Riesgos abiertos

- meter campos tecnicos de intento
- fijar un contrato que luego choque con checkout session

## Gate humano

- `Code Reviewer`

