# Slice Pack - Payment Order Bootstrap v1

Fecha: 2026-05-02
Estado: listo para ejecucion
Prioridad: `P0`

## 1. Objetivo

Entregar la primera slice vertical y pequena del producto para crear una `payment_order` independiente del proveedor, con contrato canonico, ruta web inicial y evidencia suficiente para seguir hacia `payment_attempt`.

## 2. Resultado esperado

Al cerrar esta slice, el repo deberia poder:

- construir una `payment_order` valida en el dominio
- exponer una ruta inicial `POST /api/payment-orders`
- devolver una respuesta canonica sin depender todavia de un proveedor real
- dejar lista la base para la siguiente slice de `payment_attempt`

## 3. Trazabilidad

### Requisitos

- `RFV2-011`
- `NFR-014`

### Casos de uso

- `UC-04`

### User stories

- `US-001`

### Features o epics

- `F-301`

### Tasks tecnicas

- `TT-003`
- `TT-011`

### ADRs

- `ADR-0002`
- `ADR-0004`

## 4. Superficies afectadas

- `packages/payment-core`
- `apps/web`
- `docs`
- `tests/contract` solo si aparece un contrato minimo de payload

## 5. Alcance

- definir constructor o helper canonico para `PaymentOrder`
- fijar el payload minimo de entrada para crear la orden
- devolver un payload inicial desde `apps/web/src/app/api/payment-orders/route.ts`
- documentar claramente que esta slice no crea aun `payment_attempt`

## 6. Fuera de alcance

- persistencia real en `supabase`
- creacion de `payment_attempt`
- `checkout_session`
- routing, fallback, retry o proveedor real
- autenticacion o multi-tenant completo

## 7. Diseño de implementacion propuesto

### Dominio

- agregar en `packages/payment-core` un helper o caso de uso simple para crear `PaymentOrder`
- asegurar que la orden no contenga campos tecnicos propios de `payment_attempt`
- mantener `currency` inicial en `COP`

### Web

- validar request minimo en la ruta `payment-orders`
- responder `201` con un cuerpo canonico cuando el payload sea valido
- responder error estructurado cuando falten datos minimos

### Documentacion

- actualizar la slice actual cuando pase a ejecucion de producto
- registrar si la siguiente slice sera `payment_attempt`

## 8. Agentes involucrados

- `Analista OpenSpec`
- `Arquitecto Dominio Pagos`
- `Payment Core`
- `Web Operaciones`
- `QA Security Review`

## 9. Handoffs asociados

- [01 Analista a Arquitecto](/C:/Users/juand/source/repos/PasarelaDePago/.github/agent-state/handoffs/examples/payment-order-bootstrap/01-analista-a-arquitecto.md)
- [02 Arquitecto a Payment Core](/C:/Users/juand/source/repos/PasarelaDePago/.github/agent-state/handoffs/examples/payment-order-bootstrap/02-arquitecto-a-payment-core.md)
- [03 Arquitecto a Web Operaciones](/C:/Users/juand/source/repos/PasarelaDePago/.github/agent-state/handoffs/examples/payment-order-bootstrap/03-arquitecto-a-web-operaciones.md)
- [04 QA y Gate](/C:/Users/juand/source/repos/PasarelaDePago/.github/agent-state/handoffs/examples/payment-order-bootstrap/04-qa-y-gate.md)

## 10. Validaciones obligatorias

- `npm run validate:control-plane`
- `npm run validate:drift`
- `npm run validate:slice-traceability`
- `npm run validate:surface-traceability`
- `npm run validate:semantic-guardrails`
- `npm run typecheck`
- `npm run build`

## 11. Gate humano

- `Lead`: confirmar que la slice sigue siendo pequena y no arrastra `payment_attempt`
- `Testing`: ejecutar la ruta y revisar payload de salida
- `Code Reviewer`: validar que la orden no este contaminada con campos de proveedor

## 12. Riesgos abiertos

- definir demasiado pronto persistencia y expandir el alcance
- meter `payment_attempt` dentro de la misma entrega
- resolver validacion de input de forma temporal pero incompatible con la siguiente slice
