# Catalogo de Casos de Uso v2

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Consolidar los casos de uso prioritarios que transforman la investigacion en flujos concretos de producto.

## 2. Casos de uso de plataforma

## UC-01 Registrar comercio

- Actores: `Platform Owner`, `Merchant`
- Disparador: se necesita habilitar un nuevo comercio en la plataforma
- Resultado esperado: el comercio queda creado con estado inicial y datos basicos

## UC-02 Configurar cuenta de proveedor

- Actores: `Merchant`, `Platform Owner`
- Disparador: el comercio necesita operar con `Wompi`, `PayU`, `ePayco` u otro PSP
- Resultado esperado: la cuenta queda asociada al comercio con ambiente y capacidades controladas

## UC-03 Habilitar metodos por comercio

- Actores: `Platform Owner`, `Ops Analyst`
- Disparador: se quiere activar o desactivar `PSE`, tarjetas, wallets o payouts
- Resultado esperado: el catalogo del comercio queda alineado con sus credenciales y politica operativa

## 3. Casos de uso de cobro

## UC-04 Crear payment order

- Actores: `Merchant System`, `Developer Integrator`
- Disparador: el comercio quiere cobrar una obligacion o compra
- Resultado esperado: existe una `payment_order` trazable e independiente del proveedor

## UC-05 Iniciar checkout session

- Actores: `Payer`
- Disparador: el pagador abre el flujo de pago
- Resultado esperado: se crea una sesion con TTL, resumen y contexto de metodo

## UC-06 Pagar con PSE

- Actores: `Payer`, `Provider System`, `Financial Entity`
- Disparador: el usuario selecciona `PSE`
- Resultado esperado: la plataforma registra handoff, espera confirmacion y cierra por webhook o consulta

## UC-07 Pagar con tarjeta

- Actores: `Payer`, `Provider System`
- Disparador: el usuario selecciona tarjeta
- Resultado esperado: el intento termina en `APPROVED`, `DECLINED`, `ERROR` o estado equivalente

## UC-08 Pagar con wallet o boton bancario

- Actores: `Payer`, `Provider System`
- Disparador: el usuario elige `Nequi`, `Daviplata`, `Boton Bancolombia` u otro metodo similar
- Resultado esperado: el intento se procesa segun el riel y se conserva la trazabilidad del handoff

## UC-09 Pagar con Bre-B

- Actores: `Payer`, `Provider System`
- Disparador: el usuario elige `Bre-B`
- Resultado esperado: la plataforma crea el recurso necesario como QR o alias, espera confirmacion y no hace fallback silencioso tras la exposicion al usuario

## 4. Casos de uso de estados asincronos

## UC-10 Procesar webhook de estado final

- Actores: `Provider System`
- Disparador: llega un webhook valido de pago
- Resultado esperado: el sistema valida autenticidad, deduplica y actualiza el estado canonico

## UC-11 Consultar estado pendiente

- Actores: `Ops Analyst`, `Job Scheduler`
- Disparador: un intento sigue `PENDING` y se necesita recuperar consistencia
- Resultado esperado: el sistema consulta el proveedor y actualiza o escala el estado

## UC-12 Correlacionar artefactos visibles

- Actores: `Ops Analyst`, `Finance Analyst`
- Disparador: existe un correo, voucher o reclamo del pagador
- Resultado esperado: la operacion se ubica por `CUS`, autorizacion, recibo o referencia equivalente

## 5. Casos de uso de resiliencia

## UC-13 Aplicar fallback tecnico

- Actores: `Routing Engine`
- Disparador: el proveedor primario no es elegible antes del punto de no retorno
- Resultado esperado: se crea un nuevo intento con proveedor alterno y se deja rastro del motivo

## UC-14 Reintento guiado por el usuario

- Actores: `Payer`
- Disparador: un intento previo termino en estado terminal fallido o rechazado
- Resultado esperado: el usuario puede iniciar un nuevo intento compatible sin duplicar el anterior

## UC-15 Escalar a revision manual

- Actores: `Ops Analyst`, `Risk Analyst`
- Disparador: existe inconsistencia entre webhooks, correos, paneles o reclamos
- Resultado esperado: la operacion entra a una cola de revision con evidencia suficiente

## 6. Casos de uso de payouts

## UC-16 Registrar beneficiario

- Actores: `Merchant`, `Ops Analyst`
- Disparador: se necesita crear un destinatario de dispersion
- Resultado esperado: el beneficiario queda registrado y validado

## UC-17 Crear payout individual

- Actores: `Merchant`, `Approver`
- Disparador: se requiere dispersar dinero a un beneficiario
- Resultado esperado: se crea y ejecuta un payout con trazabilidad y control de aprobacion

## UC-18 Crear payout batch

- Actores: `Merchant`, `Approver`
- Disparador: se necesita dispersar a multiples beneficiarios
- Resultado esperado: se crea un lote con items individuales y seguimiento por estado

## UC-19 Consultar estado de payout

- Actores: `Ops Analyst`, `Finance Analyst`
- Disparador: una dispersion sigue en curso o presenta error
- Resultado esperado: el sistema consulta lote e item y conserva referencias externas

## 7. Casos de uso de devoluciones y conciliacion

## UC-20 Solicitar refund o reverso

- Actores: `Ops Analyst`, `Merchant`
- Disparador: se requiere devolver dinero o anular una operacion
- Resultado esperado: el sistema registra la solicitud y espera confirmacion final del proveedor

## UC-21 Conciliar pagos y settlement

- Actores: `Finance Analyst`
- Disparador: se ejecuta un ciclo de conciliacion
- Resultado esperado: se detectan diferencias por monto, estado, referencia o tiempo

## UC-22 Resolver excepcion de conciliacion

- Actores: `Finance Analyst`, `Ops Analyst`
- Disparador: se detecta un pago aprobado sin match interno, un debito inconsistente o un webhook ausente
- Resultado esperado: la excepcion queda investigada, resuelta o escalada

## 8. Casos de uso de gobierno

## UC-23 Cambiar reglas de routing

- Actores: `Platform Owner`, `Ops Analyst`
- Disparador: se necesita reordenar proveedores o desactivar una ruta
- Resultado esperado: el cambio queda auditado y entra en vigor sin romper historico

## UC-24 Auditar accion sensible

- Actores: `Platform Owner`, `Auditor`
- Disparador: se requiere investigar un cambio en credenciales, aprobaciones o payouts
- Resultado esperado: existe rastro claro de quien hizo la accion, cuando y sobre que entidad

## 9. Conclusion

Este catalogo resume el producto como un sistema de cobro, confirmacion asincrona, resiliencia, payouts y soporte. La siguiente capa natural es traducir estos casos de uso a epics, features, historias y tasks.
