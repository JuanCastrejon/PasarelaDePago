# Payment Order Attempt Separation Specification

## Purpose

Canonizar la separacion entre la intencion de negocio y los intentos tecnicos
de pago para habilitar retries, fallback, soporte y conciliacion sin perder
historial.

## Requirements

### Requirement: Payment order y payment attempt son entidades distintas

El sistema MUST modelar `payment_order` y `payment_attempt` como entidades
separadas.

#### Scenario: Creacion de una orden con multiples intentos

- **GIVEN** una intencion de cobro del negocio
- **WHEN** el proveedor inicial falla o el flujo requiere un nuevo intento
- **THEN** la misma `payment_order` puede contener multiples `payment_attempt`
- **AND** cada intento conserva su propio contexto tecnico

### Requirement: Cada retry o fallback crea un intento nuevo

El sistema MUST crear un nuevo `payment_attempt` por cada retry, fallback o
intento manual compatible.

#### Scenario: Retry controlado

- **GIVEN** una `payment_order` con un intento previo fallido o degradado
- **WHEN** el sistema decide reintentar o cambiar de proveedor
- **THEN** se crea un `payment_attempt` nuevo
- **AND** el intento anterior permanece trazable en el historico
