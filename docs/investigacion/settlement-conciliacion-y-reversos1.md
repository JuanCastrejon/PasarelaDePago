# Investigacion de settlement, conciliacion y reversos 1

Fecha de corte: 2026-04-29

## Objetivo

Documentar como operan `abonos`, `conciliacion`, `reembolsos`, `anulaciones`, `transferencias` y `contracargos` en proveedores relevantes para Colombia, con enfasis en las implicaciones arquitectonicas de una plataforma de orquestacion multiproveedor.

## Conclusiones ejecutivas

1. `Aprobacion de pago` y `abono de fondos` no son la misma verdad operativa. La plataforma debe modelarlos como procesos distintos.
2. El `routing` no puede optimizar solo por exito transaccional; tambien debe considerar `SLA de abono`, `capacidad de reverso`, `visibilidad financiera` y `costo operativo de conciliacion`.
3. Para metodos como `PSE`, `Boton Bancolombia` y, por extension, `Bre-B` y otros handoffs bancarios, la plataforma no debe asumir que un `return URL` equivale a pago confirmado; la verdad debe venir de `webhooks`, `consultas API`, `reportes` o `extractos`.
4. `Reversos` y `reembolsos` no son equivalentes. En la practica colombiana, el reverso "en linea" suele ser mas limitado y normalmente depende del medio de pago y del momento exacto en que se solicita.
5. El backoffice futuro debe separar como minimo estas capas: `payment status`, `provider settlement status`, `merchant transfer status`, `refund status`, `dispute status` y `reconciliation status`.

## Matriz por proveedor

### Wompi

#### Verdad transaccional

- Wompi documenta seguimiento por `id`, `reference`, `amount_in_cents`, `created_at`, `finalized_at` y `payment_method_type`.
- Estados finales documentados: `APPROVED`, `DECLINED`, `VOIDED` y `ERROR`.
- La consulta de verdad puede venir por `GET /v1/transactions/{id}` o por el evento `transaction.updated`.
- Wompi reintenta notificaciones de eventos hasta `3` veces adicionales dentro de `24 horas` si el comercio no responde `HTTP 200`; el primer reintento es a los `30 minutos`, luego a las `3 horas` y luego a las `24 horas`.

#### Settlement y abonos

- El centro de ayuda de Wompi indica que en `Modelo Agregador` los abonos se realizan `al siguiente dia habil`.
- En ese mismo articulo se indica que algunos `BIN` de tarjetas pueden reflejarse en Wompi hasta `72 horas` despues de la transaccion.
- Para `Modelo Gateway`, Wompi publica un comportamiento por medio de pago:
  - `PSE`: abono segun ciclo.
  - `Tarjetas`: siguiente dia habil.
  - `Boton Bancolombia`: en linea.
  - `Nequi`: siguiente dia habil.

#### Reversos y reembolsos

- Wompi distingue entre `anulacion/reversion` y `reembolso`.
- El soporte publico de Wompi indica que una `anulacion` de tarjeta puede intentarse el mismo dia y depende de que la red transaccional aun la permita.
- Si la anulacion en linea ya no es posible, Wompi solicita soporte adicional para pedir la reversion ante la red y publica un tiempo de respuesta de hasta `10 dias habiles`.
- El soporte publico tambien indica que los `reembolsos` aplican solo para transacciones por `Tarjetas`, especificamente `VISA`, `MASTERCARD` y `AMEX` con autorizador `Redeban/Credibanco`.
- Para que un reembolso se procese, el comercio debe tener saldo `Disponible` en la cuenta Wompi.

#### Observaciones de arquitectura

- Wompi obliga a separar:
  - `estado del pago`
  - `estado del abono`
  - `estado del reverso`
  - `saldo disponible para devolver`
- El modelo `Gateway` y el modelo `Agregador` no pueden tratarse igual en el motor de conciliacion.
- La diferencia `PSE por ciclo` vs `Boton Bancolombia en linea` debe entrar en el `scoring` del proveedor.

### PayU

#### Verdad transaccional y notificaciones

- PayU usa `Confirmation URL` como webhook `server-to-server`.
- La documentacion actualizada en `febrero de 2026` indica que solo se notifica cuando la transaccion llega a un `estado final`; no se notifican pagos aun `en proceso`.
- PayU publica que cada `reintento` del pagador genera una confirmacion propia.
- El endpoint debe aceptar `x-www-form-urlencoded`, ser publico, no requerir `Basic Auth` y preferiblemente estar protegido por lista blanca de IPs de PayU.

#### Reporteria y conciliacion

- El `Sales Report` muestra referencia, comprador, monto, medio de pago y estado.
- En el detalle de transaccion se ve valor cobrado, valor pendiente, valor reembolsado, valor expirado y el historial de transacciones asociadas a la compra.
- El `Financial Statement` es especialmente valioso para conciliacion financiera. PayU documenta conceptos como:
  - `SALES`
  - `POL_COMMISSION`
  - `IVA_POL_COMMISSION`
  - `IVA_RETENTION`
  - `RENTA_RETENTION`
  - `ICA_RETENTION`
  - `RETENTION SALES`
  - `RETENTION POL_COMMISSION`
  - `RETENTION IVA_POL_COMMISSION`
- PayU indica explicitamente que este reporte sirve para validar `creditos y debitos` y para conciliar comisiones con la factura mensual.
- El `Transfer Report` muestra el estado de las transferencias solicitadas desde la cuenta PayU a la cuenta bancaria del comercio. Estados publicados:
  - `Aprobada`
  - `En progreso`
  - `Rechazada`

#### Reembolsos

- PayU indica que los reembolsos son revisados y aprobados o rechazados por su equipo en `1 a 3 dias habiles`.
- Para `Colombia`, la documentacion actualizada en `febrero de 2026` publica:
  - solicitud minima de `100 COP`
  - ventana de hasta `357 dias`
  - si la solicitud no se hace el mismo dia de la captura antes de `9 PM UTC-5`, el proceso pasa a manejo manual
  - una vez aprobado, el dinero puede tardar hasta `15 dias habiles` segun el emisor

#### Disputas y contracargos

- PayU publica una seccion formal de `Disputas`.
- Para `Colombia`, el plazo maximo de envio de evidencia es de `3 dias habiles`.
- Estados publicados para disputas:
  - `Notified`
  - `Under Review`
  - `No Evidence Provided`
  - `Lost`
  - `Won`
  - `Expired`
  - `Refunded`
- PayU tambien publica un `Webhook de Disputas` con estados y motivos, util para automatizar backoffice, congelamiento y seguimiento.

#### Observaciones de arquitectura

- PayU es el proveedor con la estructura mas completa para separar:
  - `venta`
  - `extracto financiero`
  - `transferencia bancaria`
  - `reembolso`
  - `disputa`
- Esto lo hace buen candidato para el diseno del `ledger` interno y del modulo de `reconciliation`.

### ePayco

#### Verdad transaccional y confirmacion

- ePayco mantiene la distincion entre `pagina de respuesta` y `pagina de confirmacion`.
- La documentacion insiste en validar `x_signature` y verificar el `valor pagado`.
- La URL de confirmacion es la fuente backend mas importante para sincronizar el pago con el sistema del comercio.

#### Reporteria, dashboard y conciliacion

- El centro de ayuda oficial de ePayco indica que el dashboard permite ver:
  - saldo disponible
  - historial de transacciones aceptadas, rechazadas o pendientes
  - archivo descargable con datos de cada transaccion
  - reportes de movimientos, comisiones y retiros
- El modulo `Registros` de `ePayco Control` agrega una segunda capa de analitica y auditoria para clientes `Gateway`, con estados como:
  - transaccion permitida
  - transaccion denegada
  - transaccion alertada
  - alertada y permitida
  - alertada y denegada

#### Reversiones, devoluciones y contracargos

- El centro de ayuda oficial de ePayco publica que solo `Tarjetas de credito` permiten `reversiones` dentro de ePayco.
- Para `PSE` y `efectivo`, el comercio debe realizar la devolucion por los canales normales de banca comercial y asumir sus costos.
- En contracargos, el centro de ayuda publica:
  - el comercio tiene `2 dias` para adjuntar pruebas
  - el banco puede tardar hasta `120 dias habiles` en responder
  - si el caso se pierde, el banco descuenta el valor al comercio y abona al pagador

#### Observaciones de arquitectura

- ePayco refuerza una regla clave del proyecto: para algunos medios, `refund engine` y `provider reversal engine` no son lo mismo.
- Tambien deja claro que un `marketplace` o `split` necesita trazabilidad adicional para saber si un pago puede revertirse internamente o si debe dispersarse una devolucion fuera de la pasarela.

## Benchmark bancario y de rieles

### Bancolombia - Recaudo PSE y recaudos electronicos

- Bancolombia publica que `Recaudo PSE` entrega confirmacion del pago para comercio y cliente.
- Tambien publica que la informacion detallada del recaudo puede consultarse a traves del `modulo administrativo PSE`.
- En su reglamento de recaudos, Bancolombia describe un proceso donde el recaudador puede consultar en `tiempo real` el valor y referencias principales del recaudo, y al `dia habil siguiente` la informacion restante.
- Para `Recaudos Electronicos`, Bancolombia publica:
  - entrega de archivos en varios cortes durante el dia
  - archivo consolidado al dia siguiente
  - afectacion de la cuenta del pagador y del recaudador en tiempo real
  - abono consolidado o detallado

### ACH Colombia / PSE

- ACH publica que `PSE` opera `24/7`, aunque con ventanas de mantenimiento publicadas.
- Esto implica que la plataforma debe modelar `intermitencias del riel` por separado de la disponibilidad del proveedor agregador.

## Implicaciones directas para la arquitectura del proyecto

### Modelo de datos minimo

Se recomienda modelar al menos las siguientes entidades:

- `payment_order`
- `payment_attempt`
- `provider_transaction`
- `provider_event`
- `provider_statement_entry`
- `merchant_transfer`
- `refund_case`
- `dispute_case`
- `reconciliation_run`
- `reconciliation_exception`

### Reglas del motor de orquestacion

1. No marcar `paid` con `return URL`.
2. No marcar `settled` con `payment approved`.
3. No marcar `refunded` solo por solicitud interna; debe existir confirmacion del proveedor o evidencia financiera.
4. No hacer `silent fallback` una vez el usuario ya salio a `PSE`, `Boton Bancolombia`, `Bre-B` o QR bancario.
5. El `routing` debe considerar una `politica financiera`, no solo tecnica:
   - rapidez de abono
   - posibilidad de reverso
   - facilidad de conciliacion
   - tiempo de respuesta en disputas

### Backoffice operativo que se desprende de esta investigacion

El panel operativo futuro debe exponer como minimo:

- Vista de `pagos` con su verdad transaccional.
- Vista de `abonos` y `saldos por proveedor`.
- Vista de `transferencias al comercio`.
- Vista de `reembolsos y anulaciones`.
- Vista de `disputas/contracargos` con fechas limite.
- Vista de `conciliacion` con diferencias entre:
  - pago aprobado sin abono
  - abono sin match de orden interna
  - reembolso solicitado sin confirmacion financiera
  - disputa abierta con fondos congelados

## Decisiones preliminares recomendadas

1. Diseñar el `ledger interno` inspirado mas en `PayU Financial Statement + Transfer Report` que en un simple listado de transacciones.
2. Tratar a `Wompi Gateway`, `Wompi Agregador`, `PayU`, `ePayco` y `Boton Bancolombia` como `modos operativos distintos`, aunque algunos parezcan el mismo proveedor desde ventas.
3. Preparar desde el inicio una capa de `reconciliation adapters` por proveedor.
4. Separar la UX de `devolucion` en dos caminos:
   - `provider-native refund/reversal`
   - `manual bank payout return`

## Fuentes oficiales y semioficiales usadas

- Wompi Docs - Seguimiento de transacciones: https://docs.wompi.co/docs/colombia/seguimiento-de-transacciones/
- Wompi Docs - Eventos: https://docs.wompi.co/docs/colombia/eventos/
- Wompi Help Center - Desembolso por modelo: https://soporte.wompi.co/hc/es-419/articles/360020766034--Cu%C3%A1nto-tiempo-tarda-en-realizarse-el-desembolso-a-la-cuenta-del-comercio-en-cada-modelo-de-negocios
- Wompi Help Center - Desembolso gateway: https://soporte.wompi.co/hc/es-419/articles/16754899741331--Cu%C3%A1nto-tiempo-tarda-en-realizarse-el-desembolso-a-la-cuenta-del-comercio-bajo-el-Modelo-Gateway
- Wompi Help Center - Reversion de tarjeta: https://soporte.wompi.co/hc/es-419/articles/360046916653--C%C3%B3mo-se-gestiona-la-reversi%C3%B3n-de-una-transacci%C3%B3n-con-Tarjeta-de-cr%C3%A9dito
- Wompi Help Center - Reembolso total: https://soporte.wompi.co/hc/es-419/articles/1500009267322--Qu%C3%A9-es-reembolso-total-y-qu%C3%A9-pasa-con-los-impuestos-previamente-liquidados
- PayU - URL de Confirmacion: https://developers.payulatam.com/latam/es/docs/integrations/confirmation-url.html
- PayU - Reportes: https://developers.payulatam.com/latam/es/payu-module-documentation/reports.html
- PayU - Reporte de ventas: https://developers.payulatam.com/latam/en/payu-module-documentation/reports/sales-report.html
- PayU - Balance financiero: https://developers.payulatam.com/latam/es/payu-module-documentation/reports/financial-statement.html
- PayU - Reporte de transferencias: https://developers.payulatam.com/latam/es/payu-module-documentation/reports/transfer-report.html
- PayU - Reembolsos: https://developers.payulatam.com/latam/en/payu-module-documentation/payu-operations/refunds-mp.html
- PayU - Disputas: https://developers.payulatam.com/latam/es/payu-module-documentation/payu-operations/disputes-mp.html
- PayU - Webhook de disputas: https://developers.payulatam.com/latam/es/docs/tools/disputes/disputes-webhook.html
- ePayco Docs - URL de confirmacion: https://docs.epayco.com/docs/url-de-confirmacion
- ePayco Docs - Registros: https://docs.epayco.com/docs/registros-1
- ePayco Help Center - Dashboard: https://ayuda.epayco.com/en/articles/10739-dashboard
- ePayco Help Center - Contracargos: https://ayuda.epayco.com/en/articles/1994-como-gestionar-un-contracargo
- ePayco Help Center - Reversiones por medio de pago: https://ayuda.epayco.com/en/articles/2018-a-qu-mtodos-de-pago-se-les-puede-hacer-reversiones-con-epayco
- Bancolombia - Recaudo PSE: https://www.bancolombia.com/pagos/recaudo-pse
- Bancolombia - Recaudos electronicos: https://www.bancolombia.com/empresas/productos-servicios/cash-management/recaudos/recaudos-electronicos
- Bancolombia - Reglamento de recaudos vigente a partir de agosto 2025: https://www.bancolombia.com/wcm/connect/e6cc0031-899f-497f-aba5-5c837367b8dc/Reglamento_de_Recaudos_Vigente_a_partir_de_agosto_2025.pdf?MOD=AJPERES
- ACH Colombia - Disponibilidad del servicio: https://www.achcolombia.com.co/disponibilidad-del-servicio

