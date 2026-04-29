# Webhooks, Idempotencia y Fallback por Proveedor v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Este documento aterriza la investigacion de continuidad operativa sobre `webhooks`, `idempotencia`, `confirmacion asincrona` y `reglas de fallback`.

Complementa:

- [resiliencia-failover-y-operacion1.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/investigacion/resiliencia-failover-y-operacion1.md)
- [bre-b-y-transferencias-inmediatas1.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/investigacion/bre-b-y-transferencias-inmediatas1.md)

## 2. Hallazgo central

La comunidad y la documentacion oficial convergen en una misma idea:

- el retorno visual al navegador no es la verdad final
- la verdad final vive en `webhooks`, `polling`, consultas de estado y reconciliacion

Implicacion:

- nuestro dominio interno debe estar desacoplado del frontend y de la pagina de respuesta

## 3. Matriz tecnica resumida

| Proveedor | Cobros / Payouts | Verdad final recomendada | Firma / integridad | Idempotencia oficial | Implicacion de fallback |
| --- | --- | --- | --- | --- | --- |
| `Wompi` | Cobros | `transaction.updated` + `polling` | `X-Event-Checksum` / `signature.checksum` | no se confirmo llave publica general en esta iteracion | no asumir respuesta inmediata |
| `Wompi` | Payouts | webhook + consulta de lotes / transacciones | checksum con `signature.properties` dinamicas | `idempotency-key`, 24h, error `EXC_022` si ya fue procesada | nunca reenviar ciegamente un pago ya aceptado por lote |
| `PayU` | Cobros | `Confirmation URL` server-to-server | no usar solo redireccion del usuario | cada intento genera confirmacion propia | cada reintento del usuario produce resultado independiente |
| `PayU` | Payouts | webhook + estados de payout y payment order | segun configuracion del servicio | no se documento header estandar de idempotencia en esta iteracion | no hacer fallback cuando la orden ya esta en proceso bancario |
| `ePayco` | Cobros | `confirmation` webhook | `x_signature` | recomendacion explicita de idempotencia | responder rapido y procesar asinc |

## 4. Hallazgos por proveedor

## 4.1 Wompi cobros

La documentacion publica de `Wompi` para Colombia deja varias reglas claras:

- ningun metodo entrega respuesta final instantanea y sincronica
- recomiendan `long polling` hasta obtener estado final
- los estados finales incluyen `APPROVED`, `DECLINED`, `VOIDED` y `ERROR`
- el evento principal para cambios de transaccion es `transaction.updated`
- la integridad del evento se valida con `X-Event-Checksum` o `signature.checksum`

Implicacion:

- toda orden Wompi debe nacer como `pending`
- el sistema necesita polling de respaldo si el webhook no llega

## 4.2 Wompi payouts

La documentacion publica revisada de `Pagos a Terceros` en Wompi anade piezas muy valiosas:

- soporte explicito de `idempotency-key`
- la llave debe ser unica
- expira en `24 horas`
- el error `EXC_022` devuelve `409` cuando la llave ya fue procesada
- los eventos usan checksum y una lista `signature.properties` que puede variar

Implicacion:

- no se debe hardcodear el arreglo de propiedades firmadas
- la idempotencia interna del proyecto debe vivir mas tiempo que la del proveedor
- los payouts deben guardar `batch reference`, `item reference`, `idempotency key` y evidencia cruda del evento

## 4.3 PayU cobros

`PayU` documenta que la `Confirmation URL`:

- es la comunicacion `server-to-server`
- es la capa que sincroniza el resultado real de una transaccion
- genera una confirmacion unica por cada intento
- puede producir multiples notificaciones si el pagador reintenta el pago

Ademas, para metodos como `PSE` y `Bre-B QR`, la transaccion exitosa no inicia como aprobada sino como `PENDING` mientras el usuario completa el paso externo o mientras llega la confirmacion final.

Implicacion:

- `payment_attempt` debe ser entidad de primer nivel
- no se debe colapsar varios intentos del usuario en un solo resultado proveedor

## 4.4 PayU payouts

`PayU Payouts - Colombia` documenta una maquina de estados profunda y tiempos bancarios reales:

- primero existe el estado del `payout`
- luego existe el estado de la `payment order`
- una orden en `IN_BANKING_PROCESS` ya esta entrando a capa bancaria
- si la transaccion entra a `IN_BANKING_PROCESS` despues de `4:20 p.m.`, puede moverse al siguiente dia habil
- el proveedor recomienda configurar el webhook antes de enviar payouts

Implicacion:

- el sistema necesita diferenciar `aceptado por proveedor` de `confirmado por banco`
- el fallback de payouts debe bloquearse cuando la orden ya cruzo cierto punto de no retorno

## 4.5 ePayco

La documentacion actualizada de `ePayco` es especialmente util porque deja por escrito varias practicas correctas:

- la pagina `response` no es confiable para el estado final
- la `confirmation` es el webhook confiable
- ePayco puede reintentar la entrega
- se debe implementar idempotencia
- se debe validar la firma `x_signature`
- el webhook debe responder `HTTP 200` en menos de `30 segundos`

Implicacion:

- el endpoint webhook debe `acknowledge fast` y mandar el trabajo pesado a cola
- el sistema debe soportar reentrega y duplicados desde el dia uno

## 5. Lo que ensena el open source

## 5.1 Hyperswitch

`Hyperswitch` aporta tres ideas que debemos reutilizar:

- separar `routing` de `execution`
- clasificar errores en `retriable` y `non-retriable`
- no asumir `smart retry` para metodos que requieren nuevo consentimiento del usuario

Su propia documentacion indica que los retries automaticos no son viables para flujos que requieren autenticacion o consentimiento adicional, como `bank transfers`.

Implicacion:

- `PSE`, `Bre-B` y flujos equivalentes deben ser `no silent retry by default`

## 5.2 Kill Bill

`Kill Bill` refuerza otra leccion:

- una plataforma seria debe evitar `vendor lock-in`
- la extensibilidad via modulos o plugins es una decision de arquitectura, no un lujo

Implicacion:

- debemos construir adaptadores desacoplados del dominio de ordenes, intentos y conciliacion

## 5.3 Repos publicos de integracion local

Los repos publicos revisados de la comunidad muestran que la mayoria de implementaciones:

- resuelven integraciones `proveedor por proveedor`
- configuran `url_response` y `url_confirmation`
- exponen payloads muy dependientes del proveedor
- agregan metodos locales como `split`, `Daviplata`, `PSE`, `Nequi`, plugins WooCommerce, etc.

No resuelven por si solos:

- orquestacion multiproveedor
- taxonomia comun de errores
- politica comun de retries
- reconciliacion transversal

Implicacion:

- reutilizaremos SDKs, wrappers y plugins como insumo, pero la capa de orquestacion debe ser propia

## 6. Politica recomendada de fallback

## 6.1 Cuando SI se puede considerar fallback tecnico

- antes de exponer al usuario un `redirect`, `QR` o handoff externo
- cuando el proveedor falla por disponibilidad o error tecnico recuperable
- cuando no exista evidencia de que la operacion llego a red bancaria o a un estado irreversible

## 6.2 Cuando NO se debe hacer fallback silencioso

- despues de generar un `Bre-B QR`
- despues de redirigir a `PSE`
- despues de crear una `payment order` que ya este en procesamiento bancario
- cuando el usuario debe volver a consentir o autenticarse
- cuando el rechazo es de negocio, fraude o datos invalidos

## 6.3 Cuando se requiere revision manual

- eventos duplicados con payload inconsistente
- webhook recibido despues de timeout y con orden ya reenviada
- payout con estado proveedor y estado bancario desalineados
- cobro con confirmacion final pero sin traza completa del intento

## 7. Requisitos tecnicos que nacen de esta investigacion

1. Guardar `raw_webhook` inmutable con metadatos de recepcion.
2. Calcular `payload_hash` interno aun cuando el proveedor no lo provea.
3. Deducir duplicados por `event_id`, `checksum`, `payload_hash` y claves externas relevantes.
4. Separar `payment_order`, `payment_attempt`, `provider_event`, `payout_batch` y `payout_item`.
5. Aislar el procesamiento pesado del webhook en colas o jobs.
6. Disponer de polling de respaldo donde el proveedor lo recomiende.
7. Mantener una tabla de `normalized_provider_errors`.

## 8. Preguntas abiertas

1. Que mecanismos oficiales de consulta y reconciliacion detallada debemos usar por proveedor para cerrar incidentes?
2. Que ventana interna de retencion usaremos para `idempotency keys` por encima de la ventana del proveedor?
3. Que politicas de redelivery y replay controlado queremos ofrecer desde nuestra operacion humana?

## 9. Fuentes

- Wompi eventos:
  [https://docs.wompi.co/en/docs/colombia/eventos/](https://docs.wompi.co/en/docs/colombia/eventos/)
- Wompi metodos de pago:
  [https://docs.wompi.co/en/docs/colombia/metodos-de-pago/](https://docs.wompi.co/en/docs/colombia/metodos-de-pago/)
- Wompi pagos a terceros:
  [https://docs.wompi.co/en/docs/colombia/introduccion-pagos-a-terceros/](https://docs.wompi.co/en/docs/colombia/introduccion-pagos-a-terceros/)
- Wompi crear lote:
  [https://docs.wompi.co/en/docs/colombia/crea-tu-primer-lote/](https://docs.wompi.co/en/docs/colombia/crea-tu-primer-lote/)
- Wompi errores payouts:
  [https://docs.wompi.co/en/docs/colombia/errores-pagos-a-terceros/](https://docs.wompi.co/en/docs/colombia/errores-pagos-a-terceros/)
- Wompi eventos payouts:
  [https://docs.wompi.co/en/docs/colombia/eventos-pagos-a-terceros/](https://docs.wompi.co/en/docs/colombia/eventos-pagos-a-terceros/)
- PayU Confirmation URL:
  [https://developers.payulatam.com/latam/en/docs/integrations/confirmation-url.html](https://developers.payulatam.com/latam/en/docs/integrations/confirmation-url.html)
- PayU Payments API - Colombia:
  [https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payments-api-colombia.html](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payments-api-colombia.html)
- PayU Payouts - Colombia:
  [https://developers.payulatam.com/latam/en/docs/services/payouts.html](https://developers.payulatam.com/latam/en/docs/services/payouts.html)
- ePayco checkout respuesta y confirmacion:
  [https://docs.epayco.com/docs/checkout-respuesta-y-confirmacion](https://docs.epayco.com/docs/checkout-respuesta-y-confirmacion)
- Hyperswitch smart retries:
  [https://docs.hyperswitch.io/explore-hyperswitch/workflows/smart-retries](https://docs.hyperswitch.io/explore-hyperswitch/workflows/smart-retries)
- Kill Bill:
  [https://github.com/killbill/killbill](https://github.com/killbill/killbill)
- Wompi WooCommerce community plugin:
  [https://github.com/saulmoralespa/payment-integration-wompi](https://github.com/saulmoralespa/payment-integration-wompi)
- ePayco Node SDK:
  [https://github.com/epayco/epayco-node](https://github.com/epayco/epayco-node)
