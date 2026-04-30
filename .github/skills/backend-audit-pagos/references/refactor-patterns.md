# Patrones de Refactor

## Extraer contrato antes que integracion

Si una implementacion concreta amenaza el dominio, primero extraer interfaz y tipos canonicos.

## Partir por capacidad

Separar:

- pay-in
- payout
- webhook ingestion
- reconciliation

## Reducir acoplamiento web-dominio

Mantener `apps/web` como capa de coordinacion y `payment-core` como fuente de reglas.
