# Aprobaciones PSE, Payvalida y Artefactos Post-Pago

Fecha de elaboracion: 2026-04-29
Estado: investigacion aplicada con evidencia real y contraste con documentacion oficial

## Objetivo

Analizar como se comunica una transaccion `aprobada` en dos escenarios distintos:

- `AvalPay Center + PSE`
- `Payvalida + PSE`

El objetivo es entender que ve el pagador, que identificadores quedan visibles, cuales quedan ocultos para backend y como debe modelarse el resultado final para soporte, conciliacion y auditoria.

## Evidencia analizada

### Evidencia real compartida

- correo de aprobacion emitido por `AvalPay`
- correo de aprobacion emitido por `PSE / ACH Colombia`
- correo de aprobacion emitido por `Payvalida`

### Documentacion oficial consultada

- `Payvalida API PSE`
- `Payvalida checkout - pago con PSE`
- `Payvalida soporte y SLA para comercios`
- documentacion oficial de `PSE / ACH Colombia` previamente analizada en la investigacion del proyecto

Nota: no se replica PII innecesaria del pagador. Solo se documentan patrones operativos y campos relevantes para el dominio.

## Hallazgos principales

### 1. La aprobacion tambien llega en capas, no en un solo artefacto

En el flujo `AvalPay + PSE`, la aprobacion al pagador se reparte en dos notificaciones:

- una del riel `PSE`
- una del checkout/proveedor `AvalPay`

Esto replica el mismo patron que ya se observo en rechazo: la verdad visible al usuario se distribuye entre varios actores.

En el caso `Payvalida`, la evidencia compartida muestra al menos un correo de aprobacion emitido por `Payvalida` con enfoque comercial y de soporte al comprador.

### 2. En AvalPay + PSE hay una correlacion fuerte entre identificadores visibles

En la evidencia aprobada revisada:

- el `CUS` del correo de `PSE`
- coincide con la `Autorizacion` mostrada por `AvalPay`

Esto refuerza lo observado en el rechazo y permite tratar esta correlacion como patron operativo de alto valor para:

- soporte
- busqueda de transacciones
- auditoria
- conciliacion de evidencias entre riel y checkout

### 3. Payvalida expone menos detalle tecnico al pagador que AvalPay

En el correo revisado de `Payvalida`, el pagador recibe:

- estado aprobado
- valor
- empresa
- descripcion
- fecha
- medio de pago (`PSE`)
- `numero de referencia`

No se observan en el correo del comprador, al menos en la evidencia revisada:

- `CUS`
- `ticketid`
- `TRAZABILITY_CODE`
- codigo de banco
- numero de recibo
- codigo de autorizacion equivalente visible

Esto es relevante porque la documentacion tecnica de `Payvalida` si confirma que internamente existen identificadores adicionales.

## Lo que confirma la documentacion oficial de Payvalida

Segun la `API PSE` oficial de `Payvalida`:

- para crear una transaccion PSE se registra una orden y se obtiene `URL_BANK` y `TICKET_ID`
- el comprador es redirigido al flujo bancario para completar la operacion
- el resultado se consulta por `ticketid`
- la consulta retorna, entre otros, `STATUS`, `TRANSACTION_DATE`, `BANK` y `TRAZABILITY_CODE`
- los estados posibles de la orden son `APROBADA`, `RECHAZADA`, `PENDIENTE` y `FALLIDA`
- si la transaccion PSE queda `APROBADA`, la orden de compra en `Payvalida` pasa automaticamente a `APROBADA`
- para reintentar una nueva transaccion PSE sobre la misma referencia, se debe esperar a que el intento anterior deje de estar `PENDIENTE` y pase a `FALLIDA` o `RECHAZADA`

Adicionalmente, la guia oficial de checkout de `Payvalida` confirma el patron:

- formulario del checkout
- seleccion de banco
- redireccion a `PSE`
- resultado en PSE
- regreso al comercio/checkout

## Comparacion de artefactos visibles al pagador

### AvalPay + PSE aprobado

`PSE` expone:

- valor
- empresa
- descripcion
- fecha
- `CUS`

`AvalPay` expone:

- estado aprobado
- comercio
- referencia
- descripcion
- valor
- medio de pago
- `Autorizacion`
- `Recibo`

### Payvalida + PSE aprobado

`Payvalida` expone:

- estado aprobado
- valor
- empresa
- descripcion
- fecha
- medio de pago
- `numero de referencia`

### Lectura arquitectonica

`AvalPay + PSE` da mas llaves visibles al comprador final.

`Payvalida + PSE` parece reservar mas informacion tecnica para backend o panel de comercio, dejando al usuario final con un comprobante mas simple.

## Implicaciones para nuestro producto

### 1. Debemos modelar el resultado como un conjunto de artefactos, no como una sola respuesta

Una transaccion aprobada puede producir:

- webhook tecnico
- retorno del comprador
- voucher del checkout
- correo del riel
- correo del proveedor
- panel administrativo

Cada uno puede traer distinto nivel de detalle.

### 2. No todos los proveedores exponen la misma llave al usuario final

Por eso el backend debe persistir y correlacionar identificadores de varias capas:

- `merchant_reference`
- `payer_visible_reference`
- `pse_cus`
- `provider_ticket_id`
- `provider_authorization_reference`
- `provider_receipt_reference`
- `rail_traceability_code`

### 3. Hay que separar exito operativo de exito comunicado

Una aprobacion deberia permitir distinguir al menos:

- `approved_at_rail`
- `approved_at_provider`
- `returned_to_merchant`
- `voucher_presented`
- `payer_notified`

Esto ayuda a diagnosticar casos como:

- el pago fue aprobado pero el usuario no vio el voucher
- el webhook llego pero el correo no
- la orden quedo aprobada en el proveedor pero aun no conciliada internamente

### 4. El modelo de retries depende del estado previo del intento

La documentacion oficial de `Payvalida` muestra que no se debe crear una nueva transaccion PSE sobre la misma referencia mientras el intento siga `PENDIENTE`.

Eso implica que nuestro orquestador debe tener reglas de reintento por riel y por proveedor, no un retry generico.

## Requisitos derivados

### Funcionales

- Guardar multiples identificadores tecnicos y visibles al cliente.
- Permitir busqueda por `CUS`, referencia, ticket del proveedor, autorizacion o recibo.
- Distinguir `estado tecnico`, `estado visible al cliente` y `estado conciliado`.
- Registrar si hubo retorno al comercio y si se emitio voucher final.
- Bloquear retries incompatibles cuando el riel o proveedor mantenga la operacion en `PENDIENTE`.

### No funcionales

- trazabilidad multi-actor
- auditoria de artefactos post-pago
- observabilidad sobre aprobaciones sin voucher o sin retorno visible
- consistencia entre email, webhook, panel y consulta API

## Modelo sugerido

### payment_attempt_result

- `payment_attempt_id`
- `rail_status`
- `provider_status`
- `merchant_status`
- `customer_visible_status`
- `is_return_completed`
- `is_voucher_presented`
- `is_customer_notified`

### payment_reference_map

- `payment_attempt_id`
- `reference_type`
- `reference_value`
- `issuer`
- `visibility_scope`

Valores sugeridos de `visibility_scope`:

- `customer_visible`
- `merchant_visible`
- `provider_internal`
- `support_only`

## Conclusion

La evidencia muestra dos realidades complementarias:

- en `AvalPay + PSE`, el pagador puede ver una correlacion clara entre `CUS` y `Autorizacion`
- en `Payvalida + PSE`, el pagador recibe una confirmacion mas simple, mientras que la documentacion oficial confirma que existen identificadores tecnicos adicionales no visibles en ese correo

Para el proyecto, esto significa que una plataforma seria de orquestacion en Colombia no puede basarse solo en el comprobante mostrado al usuario. Debe conservar una capa interna rica de referencias, estados y artefactos post-pago para poder soportar conciliacion, soporte y operacion multi-proveedor.

## Fuentes

- https://docs.payvalida.com/apipse
- https://docs.payvalida.com/apipse/ordenes-de-pse/registrar
- https://docs.payvalida.com/apipse/ordenes-de-pse/consultar
- https://docs.payvalida.com/guia-de-checkout/pago-con-pse
- https://payvalida.com/desarrolladores/
- https://payvalida.com/wp-content/uploads/Esquema_de_soporte_y_SLAs_Comercios_Payvalida.pdf
