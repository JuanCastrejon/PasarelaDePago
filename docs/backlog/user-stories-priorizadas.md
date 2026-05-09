---
status: active
updated: 2026-05-09
supersedes:
  - docs/backlog/user-stories-priorizadas1.md
---

# User Stories Priorizadas v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Definir las primeras historias de usuario con valor real de producto y orden sugerido de ejecucion.

## 2. Prioridad P0

## `US-001` Crear payment order

Como `Merchant System`, quiero crear una `payment_order`, para iniciar un cobro sin depender todavia de un proveedor especifico.

## `US-002` Crear payment attempt

Como `Routing Engine`, quiero crear un `payment_attempt` separado por proveedor y metodo, para no perder trazabilidad de cada envio real.

## `US-003` Iniciar checkout session

Como `Payer`, quiero ver un resumen del pago con una sesion de checkout, para entender que estoy pagando y completar el flujo dentro de una ventana valida.

## `US-004` Pagar con PSE

Como `Payer`, quiero pagar por `PSE`, para usar mi cuenta bancaria o entidad financiera habitual.

## `US-005` Confirmar pago por webhook

Como `Ops Platform`, quiero cerrar el estado final del pago por webhook o consulta backend, para no depender de la redireccion del navegador.

## `US-006` Consultar operacion por referencia

Como `Ops Analyst`, quiero buscar una transaccion por referencia interna, `CUS`, autorizacion o recibo, para resolver incidentes rapidamente.

## `US-007` Procesar webhook idempotente

Como `Provider Integration`, quiero deduplicar webhooks, para evitar activar dos veces el mismo efecto de negocio.

## `US-008` Mantener ordenes pendientes bajo control

Como `Ops Analyst`, quiero identificar ordenes `PENDING` y reconsultarlas segun politica, para que no queden huerfanas.

## 3. Prioridad P1

## `US-009` Configurar cuentas de proveedor por comercio

Como `Platform Owner`, quiero registrar credenciales por proveedor y ambiente, para operar con multiples PSP sin mezclar cuentas.

## `US-010` Aplicar fallback tecnico

Como `Routing Engine`, quiero seleccionar un proveedor alterno antes del punto de no retorno, para sostener continuidad sin duplicar cobros.

## `US-011` Registrar timeline operativa

Como `Ops Analyst`, quiero ver una linea de tiempo completa de una orden, para entender que ocurrio entre checkout, webhook, consulta y artefactos visibles.

## `US-012` Conciliar pagos aprobados

Como `Finance Analyst`, quiero comparar ordenes internas con estados y referencias del proveedor, para detectar discrepancias de conciliacion.

## `US-013` Registrar beneficiario

Como `Merchant`, quiero crear beneficiarios reutilizables, para poder dispersar dinero de forma ordenada y segura.

## `US-014` Ejecutar payout batch

Como `Merchant`, quiero enviar dispersiones por lote, para pagar multiples destinatarios sin repetir el proceso manualmente.

## `US-015` Aprobar payouts sensibles

Como `Approver`, quiero revisar y aprobar dispersiones de riesgo, para reducir errores o fraude operativo.

## 4. Prioridad P2

## `US-016` Integrar Bre-B

Como `Payer`, quiero pagar con `Bre-B`, para usar transferencias inmediatas interoperables cuando el proveedor lo permita.

## `US-017` Exponer reportes operativos

Como `Platform Owner`, quiero dashboards por proveedor, metodo y estado, para entender salud operativa y priorizar mejoras.

## `US-018` Modelar onboarding de comercio

Como `Platform Owner`, quiero registrar estados y evidencia del onboarding del comercio, para preparar una operacion usable por terceros.

## `US-019` Solicitar refund o reverso

Como `Ops Analyst`, quiero registrar una devolucion o reverso sobre un intento original, para conservar trazabilidad financiera.

## `US-020` Presentar arquitectura y decisiones

Como visitante del repositorio, quiero entender el dominio, la arquitectura y las decisiones tomadas, para valorar el proyecto como una pieza seria de portafolio.

## 5. Criterio de priorizacion

- `P0`: desbloquea el nucleo del cobro y la verdad asincrona.
- `P1`: agrega resiliencia, operacion y payouts.
- `P2`: expande producto, gobierno y visibilidad.

## 6. Conclusion

Estas historias ya permiten iniciar backlog ejecutable sin saltar directamente a implementaciones desordenadas.

