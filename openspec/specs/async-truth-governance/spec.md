# Async Truth Governance Specification

## Purpose

Canonizar la regla de que la verdad final de pagos y payouts es asincrona y
verificable, no una simple señal visual del frontend o de la `response URL`.

## Requirements

### Requirement: El estado final proviene de evidencia asincrona verificable

El sistema MUST determinar el estado final de una operacion con base en
webhooks, consultas backend, reportes del proveedor o evidencia de
conciliacion.

#### Scenario: Response URL no define aprobacion final

- **GIVEN** un usuario regresa al comercio despues de un pago
- **WHEN** solo existe la `response URL` o un retorno visible en navegador
- **THEN** la operacion no se considera aprobada en firme
- **AND** el sistema espera confirmacion asincrona verificable

### Requirement: Los estados pendientes tienen mecanismos de recuperacion

El sistema MUST soportar recuperacion de consistencia para operaciones
pendientes mediante webhook, polling o consulta servidor a servidor.

#### Scenario: Webhook retrasado o ausente

- **GIVEN** un intento sigue en estado `PENDING`
- **WHEN** el webhook no llega dentro del tiempo esperado
- **THEN** el sistema habilita consulta backend o reconciliacion
- **AND** conserva trazabilidad del intento mientras espera la verdad final
