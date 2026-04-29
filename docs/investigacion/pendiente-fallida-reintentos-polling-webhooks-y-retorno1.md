# PENDIENTE, FALLIDA, Reintentos, Polling, Webhooks y Retorno al Comercio

Fecha de elaboracion: 2026-04-29
Estado: investigacion de resiliencia operativa multi-proveedor

## Objetivo

Cerrar la capa operativa mas critica para una pasarela/orquestador de pagos en Colombia:

- como interpretar `PENDIENTE` y `FALLIDA`
- cuando se puede o no se puede reintentar
- cuando usar `polling`
- cuando confiar en `webhooks`
- que valor real tiene el `retorno al comercio`

Este documento conecta los hallazgos de `PSE`, `Wompi`, `PayU`, `ePayco`, `Payvalida` y la evidencia observada con `AvalPay Center`.

## Conclusion ejecutiva

La investigacion confirma cinco reglas maestras:

1. `PENDIENTE` no significa error. En Colombia frecuentemente significa que el usuario fue redirigido al banco, al riel o a un tercero y la operacion aun no es terminal.
2. `FALLIDA` no siempre equivale a `RECHAZADA`. En varios proveedores significa que el flujo ni siquiera se completo correctamente o no pudo ser creado/procesado.
3. La `pagina de retorno` o `response URL` sirve para experiencia de usuario, no para verdad contable.
4. El `webhook` suele ser la fuente de verdad final, pero no siempre cubre estados intermedios; por eso el `polling` sigue siendo necesario para ciertas ventanas.
5. El `retry` debe crear un `nuevo intento`, no reciclar silenciosamente el intento anterior, y mucho menos despues del handoff al banco o a PSE.

## Hallazgos por riel y proveedor

## 1. PSE como riel

La documentacion oficial de `PSE` indica que:

- el servicio opera `24/7`
- una transaccion puede tardar hasta `21 minutos` en procesarse
- el `CUS` es el identificador transversal para soporte y validacion
- si el pago aparece aprobado al usuario pero el comercio no lo refleja, debe validarse con el comercio usando el `CUS`
- si la transaccion aparece rechazada pero hubo debito, debe validarse con la entidad financiera usando el `CUS`

Lectura operativa:

- `PSE` es un riel asincrono con ventana temporal relevante
- durante esa ventana el estado comercial correcto es `pendiente de confirmacion`
- no debe dispararse un nuevo intento automatico mientras el resultado del intento anterior siga abierto dentro de la ventana operativa razonable

## 2. Wompi

Wompi documenta que:

- toda transaccion recien creada queda en `PENDING`
- el estado final debe verificarse con `polling` o `webhooks`
- los estados finales relevantes son `APPROVED`, `DECLINED`, `VOIDED` y `ERROR`
- el endpoint de eventos debe responder `200`
- si el endpoint no responde `200`, Wompi reintenta hasta `3` veces durante las siguientes `24 horas`
- la redireccion no debe usarse para validar la transaccion, solo con fines informativos
- una referencia duplicada produce error de validacion

Lectura operativa:

- `Wompi` expone claramente el patron `create pending -> wait -> final webhook`
- es seguro modelar `transaction.updated` como disparador de estado final
- el `polling` es complemento para UI, timeout handling o recuperacion ante caida del webhook

## 3. PayU

La documentacion oficial de `PayU` para Colombia indica que:

- para `PSE`, una peticion exitosa crea una transaccion en estado `PENDING`
- el `responseCode` inicial es `PENDING_TRANSACTION_CONFIRMATION`
- el comprador debe ser redirigido a `BANK_URL`
- la `Response URL` es solo de experiencia del pagador y no debe usarse para procesos backend
- la `Confirmation URL` solo se dispara cuando la transaccion llega a estado final, por ejemplo `aprobada`, `rechazada` o `expirada`
- cada intento tiene un `transaction_id` unico
- si el pagador reintenta un pago, se recibe una notificacion por cada intento
- `Queries` es recomendado para transacciones `PENDING`
- PayU recomienda hacer la primera consulta aproximadamente `7 minutos` despues de creada la transaccion
- en transferencias bancarias las consultas estan disponibles cada `10 minutos`

Lectura operativa:

- `PayU` separa muy bien `estado intermedio`, `retorno del usuario` y `confirmacion final`
- si el negocio necesita mostrar progreso durante `PENDING`, debe usar UI + polling + espera controlada
- el `retry` nunca debe sobreescribir la misma transaccion; cada nuevo intento es un movimiento propio

## 4. ePayco

La documentacion oficial de `ePayco` indica que:

- la `response` redirige al usuario y solo trae informacion basica
- la `confirmation` es el webhook confiable para backend
- la pagina de respuesta no es confiable porque el usuario puede cerrar el navegador o manipular parametros
- `ePayco` puede reintentar el webhook multiples veces
- el webhook debe responder `200` rapidamente, idealmente en menos de `30 segundos`
- para `PSE`, el estado `Pendiente` puede durar hasta `20 minutos` antes de retornar a `aprobada` o `rechazada`
- `Fallida` significa que no se culmino exitosamente el flujo de creacion
- existen estados adicionales como `abandonada`, `cancelada`, `caducada`, `retenida` e `iniciada`

Lectura operativa:

- `ePayco` tiene una taxonomia mas rica que obliga a no colapsar todo en `failed`
- `Pendiente`, `Fallida`, `Abandonada` y `Cancelada` deben vivir como causas y estados distintos
- `ref_payco` debe guardarse para consulta posterior y reconstruccion del estado

## 5. Payvalida

La documentacion oficial de `Payvalida` muestra dos patrones:

### API Recaudo

- una orden se crea en `PENDIENTE`
- puede pasar a `APROBADA`, `VENCIDA`, `CANCELADA` o `ANULADA`
- `Payvalida` notifica automaticamente al comercio cuando cambia el estado
- pueden existir notificaciones repetidas de la misma orden
- el comercio debe evitar entregar el producto mas de una vez
- la consulta de orden expone `NOTIFICATION_RESPONSE`, `STATE`, `checkout`, y para pagos exitosos por PSE puede devolver `CUS` en `ADITIONAL_INFO`

### API PSE

- permite crear una transaccion PSE y obtener `URL_BANK` y `TICKET_ID`
- recomienda esperar entre `5 y 10 minutos` entre la creacion y la consulta del estado
- los estados posibles son `APROBADA`, `RECHAZADA`, `PENDIENTE` y `FALLIDA`
- no se debe registrar una nueva transaccion PSE sobre la misma referencia mientras siga `PENDIENTE`

Lectura operativa:

- `Payvalida` mezcla bien dos niveles: `orden de recaudo` y `transaccion PSE`
- el orquestador debe distinguir entre `estado de la orden` y `estado del riel`
- `PENDIENTE` tiene una regla operativa explicita: no abrir otro intento con la misma referencia mientras no cambie a terminal

## 6. AvalPay Center

De la evidencia observada con checkout real y correos:

- el usuario entra a una sesion con resumen, TTL y captura de contacto
- luego pasa a captura de identidad y seleccion de entidad financiera
- despues hay handoff a `registro.pse.com.co`
- finalmente aparece el desafio/autorizacion de la entidad
- el usuario puede recibir notificaciones separadas de `PSE` y `AvalPay`

No se reviso documentacion publica equivalente a webhook tecnico de `AvalPay` en esta iteracion. Por eso, `AvalPay` se usa aqui como referencia de UX y de artefactos visibles, no como fuente principal para reglas de backend.

## Matriz operativa resumida

| Proveedor/Riel | Estado inicial esperado | Fuente de verdad final | Estados intermedios relevantes | Regla de retry mas importante | Polling |
| --- | --- | --- | --- | --- | --- |
| `PSE` | handoff/espera de autorizacion | proveedor/comercio que integra PSE | esperando banco, esperando confirmacion | no reintentar dentro de la misma ventana sin cierre claro | depende del proveedor |
| `Wompi` | `PENDING` | webhook `transaction.updated` | `PENDING` | nueva referencia por intento; no validar por redireccion | si, recomendado |
| `PayU PSE` | `PENDING` + `PENDING_TRANSACTION_CONFIRMATION` | `Confirmation URL` | varios `PENDING_*` | cada retry es nuevo `transaction_id`; no confiar en response URL | si, recomendado para pending |
| `ePayco PSE` | `Pendiente` | `confirmation` | `Pendiente`, `Iniciada`, `Abandonada`, `Cancelada` | no decidir por response URL; validar firma y deduplicar | si, como respaldo |
| `Payvalida PSE` | `PENDIENTE` | notificacion + consulta | `PENDIENTE` | no nueva transaccion misma referencia mientras siga pendiente | si, esperar 5-10 min |
| `AvalPay + PSE` | checkout activo / handoff | no documentado publicamente aqui | espera usuario, espera banco | no fallback silencioso tras handoff | observacion indirecta |

## Regla canonica de estados para el orquestador

Con base en todos los proveedores, el orquestador deberia manejar una taxonomia propia como minimo:

- `attempt_created`
- `checkout_session_started`
- `payer_data_captured`
- `provider_redirect_ready`
- `payer_redirected`
- `awaiting_payer_action`
- `awaiting_bank_or_rail_confirmation`
- `pending_manual_review`
- `pending_provider_notification`
- `approved`
- `rejected`
- `failed_to_create`
- `failed_processing`
- `abandoned_by_payer`
- `expired`
- `cancelled`
- `reversed_or_nullified`

Importante:

- `failed_to_create` no es igual a `rejected`
- `abandoned_by_payer` no es igual a `expired`
- `pending_provider_notification` no es igual a `pending_manual_review`

## Politica recomendada de polling

## 1. Principio general

El `polling` no reemplaza al webhook. Su rol es:

- sostener la UX de espera
- recuperar consistencia cuando el webhook falla o se retrasa
- cerrar estados viejos atascados
- permitir operaciones de soporte

## 2. Reglas por proveedor

### Wompi

- consultar durante la ventana corta posterior a creacion
- detener polling al llegar a estado terminal
- conservar webhook como verdad final primaria

### PayU

- para `PSE`, no consultar de inmediato
- primera consulta alrededor de `7 minutos`
- en transferencias bancarias considerar que la informacion de consulta se actualiza cada `10 minutos`

### ePayco

- usar webhook como principal
- si solo se tiene `ref_payco` desde la pagina de respuesta, consultar el endpoint de validacion para reconstruir el estado mientras llega confirmacion

### Payvalida

- primera consulta entre `5 y 10 minutos` luego de crear la transaccion PSE
- si la orden general sigue `PENDIENTE`, no reabrir nueva transaccion sobre la misma referencia

## Politica recomendada de retry

## 1. Regla principal

Un `retry` del producto siempre debe crear un `nuevo payment_attempt`.

No debe:

- reciclar el mismo intento
- cambiar de proveedor por detras sin conocimiento del usuario despues del handoff al banco
- reutilizar referencias incompatibles con las reglas del proveedor

## 2. Cuando SI considerar retry

- fallo tecnico antes de handoff al riel o banco
- timeout local sin evidencia de creacion remota
- error de infraestructura del proveedor antes de generar referencia/URL de redireccion
- estado terminal claramente fallido o rechazado

## 3. Cuando NO hacer retry automatico

- existe `PENDING` en banco/PSE/proveedor
- el usuario ya fue redirigido al banco o desafio de la entidad
- existe webhook o correo con `CUS`/autorizacion asociado
- el proveedor advierte que no se cree una nueva transaccion sobre la misma referencia mientras siga abierta

## 4. Que hacer en lugar de retry automatico

- mostrar pantalla de `estamos confirmando tu pago`
- dejar polling controlado
- permitir reconsulta por referencia
- habilitar `reintentar` solo cuando el intento previo ya sea terminal o exceda la politica de timeout del negocio

## Valor real del retorno al comercio

El `retorno al comercio` debe tratarse como artefacto UX.

Sirve para:

- informar al usuario
- mostrar resumen
- permitir imprimir comprobante
- ofrecer boton de reintento o finalizacion

No sirve por si solo para:

- aprobar pedidos
- liberar inventario
- activar servicios
- considerar conciliada una operacion

## Requisitos tecnicos derivados

### Funcionales

- Crear un `payment_attempt` nuevo por cada reintento del usuario.
- Persistir estado canonico y estado crudo del proveedor.
- Guardar `redirect_url`, `response_url`, `confirmation_url`, `ticket_id`, `CUS`, `ref_payco`, `transaction_id`, `authorization`, `receipt` y referencias equivalentes.
- Permitir polling backend y consultas manuales por soporte.
- Mostrar UI diferenciada para `pendiente`, `rechazada`, `fallida`, `abandonada` y `expirada`.

### No funcionales

- idempotencia estricta en webhooks
- almacenamiento de payloads crudos
- auditoria de reintentos
- soporte a operaciones asincronas de larga duracion
- tolerancia a notificaciones duplicadas o tardias

## Conclusion

La resiliencia real del proyecto no depende solo de integrar muchos proveedores. Depende de modelar correctamente la vida de un intento asincrono:

- crear
- redirigir
- esperar
- confirmar
- reintentar solo cuando corresponde

En el contexto colombiano, especialmente con `PSE`, una pasarela seria debe estar pensada como un sistema de `orquestacion de estados y evidencias`, no solo como un formulario que llama APIs de cobro.

## Fuentes

- https://www.pse.com.co/
- https://www.pse.com.co/persona-centro-de-ayuda
- https://docs.wompi.co/docs/colombia/transacciones/
- https://docs.wompi.co/docs/colombia/eventos/
- https://docs.wompi.co/docs/colombia/widget-checkout-web/
- https://developers.payulatam.com/latam/es/docs/integrations/confirmation-url.html
- https://developers.payulatam.com/latam/es/docs/integrations/response-url.html
- https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payments-api-colombia.html
- https://developers.payulatam.com/latam/en/docs/services/queries.html
- https://developers.payulatam.com/latam/es/docs/getting-started/response-codes-and-variables.html
- https://docs.epayco.com/docs/checkout-respuesta-y-confirmacion
- https://docs.epayco.com/docs/url-de-confirmacion
- https://docs.epayco.com/docs/checkout-implementacion
- https://docs.payvalida.com/api-recaudo/notificacion
- https://docs.payvalida.com/api-recaudo/ordenes-de-compra/consultar
- https://docs.payvalida.com/apipse
- https://docs.payvalida.com/apipse/ordenes-de-pse/registrar
- https://docs.payvalida.com/apipse/ordenes-de-pse/consultar
