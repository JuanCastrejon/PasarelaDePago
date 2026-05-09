---
status: active
updated: 2026-05-09
---

# Catalogo de Reglas de Negocio

Este catalogo concentra las reglas de negocio detectadas durante `research`,
ADRs y capacidades canonicas. Es la referencia viva que conecta investigacion,
OpenSpec y validacion funcional.

## Convencion

| Campo | Descripcion |
|---|---|
| ID | Identificador estable `RN-<DOMINIO>-NNN` |
| Tipo | `general`, `operativa`, `proveedor`, `seguridad`, `dominio` |
| Estado | `vigente`, `pendiente-validacion`, `supersedida` |
| Fuente | Documento, ADR o spec donde se confirma |

## Reglas base

| ID | Regla | Modulo(s) | Tipo | Estado | Fuente |
|---|---|---|---|---|---|
| `RN-PAY-001` | La verdad final de una operacion de pago o payout no puede depender solo de la `response URL`; debe confirmarse por canales asincronos verificables. | pagos, payouts, operaciones | dominio | vigente | `docs/adr/adr-0001-verdad-asincrona-como-fuente-final.md` |
| `RN-PAY-002` | `payment_order` y `payment_attempt` son entidades separadas; un retry o fallback crea un nuevo intento. | pay-in orchestration | dominio | vigente | `docs/adr/adr-0002-separacion-entre-payment-order-y-payment-attempt.md` |
| `RN-PAY-003` | No se debe ejecutar `silent retry` una vez que el pagador ya fue expuesto a un handoff bancario o a un flujo con consentimiento fuerte. | routing, checkout | operativa | vigente | `docs/requisitos/requisitos-funcionales-consolidados.md`, `docs/dominio/glosario-del-dominio.md` |
| `RN-PAY-004` | Los adapters de proveedor y el motor de routing deben permanecer desacoplados; las capacidades no viven embebidas en una sola integracion. | integrations, orchestration | dominio | vigente | `docs/adr/adr-0003-adapters-de-proveedor-y-routing-desacoplado.md` |
| `RN-PAY-005` | El sistema no debe almacenar `PAN`, `CVV` ni secretos equivalentes de tarjeta en el dominio propio. | seguridad, compliance | seguridad | vigente | `CONTEXT.md`, `.github/copilot-instructions.md` |
| `RN-PAY-006` | Crear una `payment_order` no crea automaticamente un `payment_attempt`; la orden representa solo la intencion de negocio. | payment order bootstrap | operativa | vigente | `docs/backlog/slices/slice-payment-order-bootstrap.md`, `openspec/changes/payment-order-bootstrap/research.md` |
| `RN-PAY-007` | La respuesta inicial de creacion de `payment_order` debe ser canónica y agnostica del proveedor. | payment core, web | general | vigente | `docs/backlog/slices/slice-payment-order-bootstrap.md`, `openspec/changes/payment-order-bootstrap/research.md` |

## Regla operativa

1. Toda historia enriquecida o `research.md` que detecte reglas nuevas debe agregarlas aqui.
2. Si una regla cambia de forma material, actualizar tambien la spec o ADR que la sustenta.
3. Si una regla deja de aplicar, marcarla como `supersedida` y enlazar su reemplazo.
