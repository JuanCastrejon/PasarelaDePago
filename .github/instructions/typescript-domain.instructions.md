---
description: "Reglas para desarrollar el nucleo TypeScript del dominio y la orquestacion de pagos. Usar cuando: se cree o refactorice codigo en src/, modelos, mapeos, adapters o politicas de retry."
---

# TypeScript y Dominio

## Reglas

- usar TypeScript estricto
- no usar `any`
- mantener identificadores en ingles
- mantener enums o uniones canonicas, no estados crudos del proveedor en el dominio
- separar dominio, orquestacion y adapters

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
