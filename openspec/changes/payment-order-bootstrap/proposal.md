## Why

El repositorio necesita la primera capacidad de producto realmente ejecutable
para pasar de investigacion y backlog a una vertical de codigo pequena,
trazable y sin acoplamiento prematuro a proveedores.

## What Changes

- se introduce una capacidad minima para crear `payment_order`
- se define un contrato inicial para `POST /api/payment-orders`
- se documenta explicitamente que esta capacidad no crea `payment_attempt`

## Capabilities

### New Capabilities
- `payment-order-bootstrap`: creacion inicial de `payment_order` y contrato HTTP minimo agnostico del proveedor

### Modified Capabilities
- ninguna

## Dependency Map

| Dependencia | Tipo | Estado | Bloqueante |
|---|---|---|---|
| `payment-order-attempt-separation` | funcional | resuelta | si |
| `project-scope-vision` | funcional | resuelta | no |
| payload minimo de orden | funcional | pendiente | si |

## Impact

- `packages/payment-core`
- `apps/web`
- `docs/backlog/`
- `openspec/changes/`

## Viabilidad y esfuerzo

- **Esfuerzo estimado**: `M`
- **Riesgo técnico**: `bajo`
- **Riesgo funcional**: `medio`
- **Justificación**: el riesgo principal es expandir el alcance hacia `payment_attempt`, persistencia o integraciones reales antes de tiempo.
