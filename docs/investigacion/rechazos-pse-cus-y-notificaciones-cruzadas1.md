# Rechazos PSE, CUS y Notificaciones Cruzadas

Fecha de elaboracion: 2026-04-29
Estado: investigacion aplicada con evidencia real compartida por el propietario del proyecto

## Objetivo

Documentar como se presenta un rechazo de pago en un flujo `AvalPay Center -> PSE -> entidad financiera`, que identificadores quedan visibles para el pagador y que implicaciones tiene esto para soporte, conciliacion, observabilidad y taxonomia de estados.

## Evidencia analizada

- PDF de correo enviado por `PSE / ACH Colombia` con asunto de transaccion rechazada.
- PDF de correo enviado por `AvalPay Center` con asunto de transaccion rechazada del comercio.
- Flujo visual anterior observado en checkout de `Universidad del Magdalena` con metodo `Cuentas debito ahorro y corriente (PSE)`.

Nota: en este documento no se replican datos personales del pagador. Solo se documentan los patrones operativos y los campos relevantes para el dominio.

## Hallazgos principales

### 1. Un mismo rechazo genera al menos dos notificaciones distintas al pagador

En la evidencia revisada, el pagador recibe:

- un correo de `PSE / ACH Colombia`
- un correo de `AvalPay Center` asociado al comercio

Esto confirma que la plataforma debe modelar notificaciones por `actor emisor`, no solo por `estado de pago`.

### 2. El correo de PSE y el correo del checkout no exponen la misma informacion

El correo de `PSE` muestra una capa mas corta y orientada al riel:

- valor
- empresa
- descripcion
- fecha de transaccion
- `CUS`
- recomendaciones de seguridad

El correo de `AvalPay Center` muestra una capa mas orientada al comercio y al soporte:

- estado visible al pagador (`Transaccion Declinada` / `Rechazada`)
- valor
- comercio
- fecha/hora
- referencia del comercio
- descripcion
- medio de pago
- `Autorizacion`
- `Recibo`
- correo de contacto del comercio
- recomendacion de intentar con otro medio de pago

## Correlacion de identificadores

La evidencia permite inferir un patron muy importante:

- el `CUS` visible en el correo de `PSE`
- coincide con el valor de `Autorizacion` visible en el correo de `AvalPay`

Esto sugiere que, en este flujo observado, `CUS` funciona como identificador transversal util para:

- rastrear la operacion entre riel y checkout
- responder tickets de soporte
- enlazar evidencia de correo con webhooks, logs y consultas posteriores

Adicionalmente, el correo del checkout aporta otros identificadores que no estaban visibles en el correo de PSE:

- `referencia del comercio`
- `recibo`

## Secuencia temporal observada

La evidencia muestra una secuencia corta pero no instantanea:

- primero existe una `fecha/hora de transaccion`
- despues llega el correo de `PSE`
- despues llega el correo de `AvalPay`

La diferencia es pequena, pero suficiente para dejar claro que:

- la notificacion al usuario es asincrona
- no todos los actores notifican al mismo tiempo
- el frontend no debe asumir que el primer mensaje recibido es la version final o mas completa del evento

## Hallazgos de producto y arquitectura

### 1. Debemos separar estado normalizado interno de etiqueta visible al usuario

En la evidencia aparecen etiquetas como:

- `rechazada`
- `declinada`

La plataforma debe tener:

- una taxonomia interna normalizada de estados
- una tabla de equivalencias por proveedor
- una capa de copy para mostrar mensajes claros al usuario

### 2. El rechazo visible al usuario no necesariamente trae causa tecnica accionable

En los correos revisados no aparece:

- codigo tecnico de rechazo
- submotivo
- regla antifraude
- detalle de autorizacion de la entidad

Por lo tanto, el producto no puede depender del correo del pagador para diagnosticar. Debe conservar mas detalle en:

- webhook crudo
- consulta posterior al proveedor
- logs de enrutamiento
- intentos por riel
- telemetria por proveedor y entidad financiera

### 3. El soporte necesita varios identificadores, no uno solo

Para soporte y conciliacion se deben persistir, como minimo:

- `merchant_reference`
- `pse_cus`
- `provider_authorization_reference`
- `provider_receipt_reference`
- `payment_method_family`
- `financial_entity_selected`
- `occurred_at`
- `notification_sent_at`
- `customer_visible_status`
- `normalized_status`

### 4. Hay que modelar artefactos de comunicacion

La plataforma deberia guardar registro de:

- que actor notifico
- por que canal (`email`, webhook, polling, panel)
- cuando notifico
- que estado reporto
- que identificadores incluyo

Esto ayuda a auditoria, soporte y conciliacion de disputas de "me llego un correo, pero el sistema dice otra cosa".

## Implicaciones para el flujo de rechazo

El rechazo en PSE no debe tratarse como un simple `failed`.

Debe existir al menos la siguiente lectura de negocio:

- `rejected_at_rail`: el riel PSE reporta rechazo
- `rejected_at_checkout`: el checkout/comercio confirma rechazo al usuario
- `unknown_debit_outcome`: estado temporal si el usuario alega debito y el comercio no lo refleja aun
- `retry_recommended`: rechazo donde el canal sugiere intentar con otro medio
- `manual_support_required`: cuando hay inconsistencia entre correos, panel, banco o reclamo del usuario

## Requisitos derivados

### Funcionales

- Registrar multiples identificadores por intento de pago.
- Relacionar `CUS` con `authorization_reference` cuando apliquen al mismo flujo.
- Mostrar al operador una vista unificada de artefactos de rechazo por intento.
- Permitir buscar transacciones por `CUS`, referencia del comercio o recibo.
- Conservar el historial de notificaciones emitidas por distintos actores.

### No funcionales

- Trazabilidad completa de evidencias de transaccion.
- Retencion segura de payloads y metadatos operativos.
- Normalizacion de estados sin perder el valor crudo del proveedor.
- Capacidad de auditoria para soporte de pagos rechazados y reclamos de usuarios.

## Modelo de datos sugerido

### payment_attempt

- `id`
- `payment_order_id`
- `provider_code`
- `payment_method_family`
- `financial_entity_code`
- `merchant_reference`
- `normalized_status`
- `customer_visible_status`
- `occurred_at`

### provider_reference

- `payment_attempt_id`
- `reference_type` (`cus`, `authorization`, `receipt`, `merchant_reference`)
- `reference_value`
- `issuer` (`pse`, `checkout_provider`, `merchant`)

### customer_notification_artifact

- `payment_attempt_id`
- `emitter`
- `channel`
- `subject`
- `status_reported`
- `sent_at`
- `artifact_hash`
- `artifact_location`

## Conclusion

La evidencia confirma que un rechazo de `PSE` no se entiende bien si solo miramos la pantalla final o solo un correo. Operativamente, el rechazo se distribuye en varias capas:

- el `riel` (`PSE`)
- el `checkout/acquirer` (`AvalPay`)
- el `comercio`
- la `entidad financiera`

Para el proyecto, esto obliga a construir un modelo de soporte y conciliacion basado en correlacion de identificadores, eventos asincronos y notificaciones cruzadas, no en una sola respuesta simplificada de "pago rechazado".
