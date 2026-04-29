# ADR-0002 - Separacion entre payment order y payment attempt

Fecha: 2026-04-29
Estado: aceptado

## Contexto

Los proveedores investigados manejan reintentos, handoffs bancarios, estados pendientes, referencias distintas y multiples notificaciones sobre una misma intencion de cobro.

Si el dominio tratara cada pago como un solo objeto monolitico, perderia:

- trazabilidad de retries
- explicacion de fallbacks
- correlacion de referencias
- soporte y conciliacion

## Decision

El dominio separara formalmente:

- `payment_order`: intencion de negocio
- `payment_attempt`: ejecucion tecnica individual

Una `payment_order` puede contener multiples `payment_attempts`.

## Consecuencias

### Positivas

- soporte real a retry y fallback
- timeline clara por intento
- conciliacion mas precisa

### Costos

- esquema de datos mas rico
- mayor necesidad de normalizacion de estados

## Implicaciones directas

- cada retry crea un nuevo intento
- el intento conserva sus referencias propias
- el estado de la orden se deriva del conjunto de intentos y no de uno solo

## Documentos relacionados

- [modelo-de-dominio-canonico1.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/dominio/modelo-de-dominio-canonico1.md)
- [orquestacion-failover-y-bre-b.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/arquitectura/orquestacion-failover-y-bre-b.md)
