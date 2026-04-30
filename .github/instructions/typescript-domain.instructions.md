---
description: "Reglas para desarrollar el nucleo TypeScript del dominio y la orquestacion de pagos. Usar cuando: se cree o refactorice codigo en packages/payment-core, modelos, mapeos, adapters, contratos o politicas de retry."
---

# TypeScript y Dominio

## Reglas

- usar TypeScript estricto
- no usar `any`
- mantener identificadores en ingles
- mantener enums o uniones canonicas, no estados crudos del proveedor en el dominio
- separar dominio, contratos, errores, orquestacion y adapters
- preferir tipos puros y funciones puras en `packages/payment-core`
- no meter IO de proveedor dentro de entidades o tipos canonicos

## Modelo minimo

- `payment_order`
- `payment_attempt`
- `payment_reference`
- `provider_event`
- `beneficiary`
- `payout_batch`
- `payout_item`

## Regla critica

Nunca contaminar el dominio central con nombres crudos del proveedor si antes no pasan por mapeo.
