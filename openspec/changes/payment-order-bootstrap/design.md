## Context

El proyecto ya tiene dominio, ADRs y backlog suficientes para ejecutar una
primera vertical pequena. La decision clave es introducir una capacidad de
creacion de orden que respete el lenguaje canonico sin colapsar el modelo
hacia `payment_attempt` o integraciones reales.

## Goals / Non-Goals

**Goals:**

- fijar la primera vertical tecnica del dominio de cobro
- mantener separacion estricta entre orden e intento
- dejar el contrato HTTP inicial listo para futura evolucion

**Non-Goals:**

- persistencia real
- `payment_attempt`
- `checkout_session`
- proveedor real o routing
- multi-tenant completo

## Decisions

- usar una capacidad nueva `payment-order-bootstrap` en lugar de modificar la spec de separacion
- tratar el endpoint HTTP como contrato inicial minimo, no como flujo de cobro completo
- mantener el cambio pequeno para proteger la siguiente slice de `payment_attempt`

## Risks / Trade-offs

- [Riesgo] La vertical se expande hacia integracion real antes de tiempo
  - Mitigacion: dejar exclusiones explicitas en spec y tasks
- [Riesgo] El payload minimo queda demasiado pobre o demasiado definitivo
  - Mitigacion: validar el contrato temprano y mantenerlo agnostico del proveedor

## Open Questions

- definir el payload minimo exacto
- decidir el shape inicial de la respuesta canónica
