---
status: active
updated: 2026-05-09
supersedes:
  - docs/investigacion/resiliencia-failover-y-operacion1.md
---

# Resiliencia, Failover y Operación Multi-proveedor v1

Fecha de actualizacion: 2026-04-29

## 1. Objetivo

Definir cómo debe operar una plataforma de pagos que quiera mantenerse disponible aun cuando un proveedor falle parcial o totalmente.

## 2. Premisa principal

Tener varios proveedores no crea resiliencia por sí solo.

La resiliencia aparece cuando existen:

- contratos claros por proveedor
- matriz de capacidades
- taxonomía de errores
- reglas de elegibilidad de retry
- observabilidad
- reconciliación
- operación humana preparada

## 3. Hallazgos técnicos de investigación

## 3.1 Wompi payouts ya trae varias piezas que nos interesan

La documentación oficial de `Pagos a Terceros` de Wompi ya confirma:

- ambiente `Sandbox`
- `múltiples cuentas origen`
- `idempotencia` para evitar duplicidad
- `webhook`
- estados de lote como `PENDING_APPROVAL`, `PENDING`, `NOT_APPROVED`
- estados de transacción como `PENDING`, `APPROVED`, `CANCELLED`

Implicacion:

- nuestro dominio debe separar `payout_batch` y `payout_item`
- aprobación y rechazo no son eventos secundarios; son parte del flujo

## 3.2 PayU payouts documenta una máquina de estados rica

PayU documenta para payouts estados como:

- `AWAITING_SANCTION_SCREENING`
- `AWAITING_FOR_SENT`
- `SENT_TO_CREATE`
- `CREATED`
- `REJECTED`
- `PROCESSING_COMPLETED`

Y para la orden de pago:

- `REQUEST_BY_THE_MERCHANT`
- `IN_VALIDATION`
- `IN_PAYU_PROCESS`
- `AWAITING_BANK_SENT`
- `IN_BANKING_PROCESS`
- `CONFIRMED_BY_THE_BANK`
- `REJECTED`

Implicacion:

- no basta con “pending / approved / failed”
- el sistema necesita estados internos intermedios, especialmente para payouts

## 3.3 ePayco y Mercado Pago refuerzan una misma lección

En ePayco, la documentación y el SDK empujan a confirmar transacciones mediante confirmación/consulta y no solo por respuesta visual.

En Mercado Pago, el template open source revisado remarca que:

- el webhook puede reintentarse varios días
- la URL visual de retorno y el webhook no son lo mismo

Implicacion:

- toda integración debe asumir asincronía
- toda integración debe ser idempotente

## 4. Taxonomía operativa recomendada

## 4.1 Tipos de falla

- `PROVIDER_OUTAGE`
- `TECHNICAL_RECOVERABLE`
- `TECHNICAL_NON_RECOVERABLE`
- `BUSINESS_DECLINE`
- `USER_ACTION_REQUIRED`
- `CONFIGURATION_ERROR`
- `RATE_LIMIT`
- `RISK_REVIEW`
- `BANKING_DELAY`

## 4.2 Decisiones por tipo de falla

### Fallback automático posible

- provider outage
- technical recoverable
- algunos rate limits

### Retry sobre mismo proveedor posible

- timeout
- error transitorio de red
- polling fallido no concluyente

### No hacer fallback automático

- fraude o sospecha de fraude
- rechazo de negocio
- documento inválido
- usuario canceló
- método exige nueva acción del usuario

## 5. Política de retry y fallback por método

### Tarjeta

- puede permitir retry técnico según el punto de fallo
- no debe duplicar autorización
- con 3DS la elegibilidad es más restringida

### PSE

- casi siempre requiere nueva acción del usuario
- evitar fallback silencioso entre proveedores después de que el usuario inició el flujo

### Bre-B

- al estar basado en llave o QR, normalmente requiere interacción del usuario
- modelarlo por defecto como `no silent retry`

### Nequi / billeteras

- depende del proveedor y del token/estado
- si hay token o pre-autorización específica, revisar elegibilidad caso por caso

### Payout

- fallback no debe ocurrir ciegamente
- antes de reenviar se debe validar si el banco o proveedor ya tomó posesión del procesamiento

## 6. Arquitectura de operación recomendada

## 6.1 Ingesta

- API recibe orden
- crea `payment_order`
- crea `payment_attempt`
- persiste `idempotency_key`
- ejecuta adapter del proveedor

## 6.2 Confirmación

- registrar webhook crudo
- validar firma
- deduplicar por event id / checksum / payload hash
- normalizar a evento interno
- aplicar transición de estado

## 6.3 Polling

Usar polling cuando:

- el webhook no llega
- el proveedor lo recomienda como respaldo
- el estado siga pendiente después del SLA esperado

## 6.4 Operación humana

- cola de revisión manual
- cola de payouts en validación
- panel de eventos fallidos
- panel de reintentos bloqueados

## 7. Requisitos operativos derivados

- health status por proveedor
- métricas por método y proveedor
- alertas de caída y degradación
- dashboard de orders stuck
- auditoría de retries y fallbacks
- conciliación de payouts por lote y por item

## 8. Qué aprender del open source

### Hyperswitch

Lo valioso no es copiar su stack completo, sino adoptar ideas:

- adapters formales
- smart retries
- routing engine separado
- reconciliación como módulo propio

### Kill Bill

Lo valioso es:

- modelar crecimiento de producto a largo plazo
- no mezclar billing con processing
- mantener extensibilidad

## 9. Recomendaciones de diseño para nuestro proyecto

1. Crear una `provider capability matrix` persistente.
2. Tratar `payment_attempt` como unidad principal de resiliencia.
3. Tener `idempotency_key` en cobros y payouts.
4. Diseñar una tabla de `normalized_provider_errors`.
5. Tener `manual review` como salida válida del sistema.
6. No permitir fallback silencioso en métodos con fuerte interacción del usuario.

## 10. Fuentes

- Wompi eventos:
  [docs.wompi.co/en/docs/colombia/eventos](https://docs.wompi.co/en/docs/colombia/eventos/)
- Wompi pagos a terceros:
  [docs.wompi.co/docs/colombia/introduccion-pagos-a-terceros](https://docs.wompi.co/docs/colombia/introduccion-pagos-a-terceros/)
- Wompi eventos pagos a terceros:
  [docs.wompi.co/docs/colombia/eventos-pagos-a-terceros](https://docs.wompi.co/docs/colombia/eventos-pagos-a-terceros/)
- PayU API de pagos Colombia:
  [developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-colombia.html](https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-colombia.html)
- PayU Payouts - Colombia:
  [developers.payulatam.com/latam/es/docs/services/payouts.html](https://developers.payulatam.com/latam/es/docs/services/payouts.html)
- PayU API de Payouts:
  [developers.payulatam.com/latam/es/docs/integrations/api-integration/payouts-api.html](https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payouts-api.html)
- ePayco API:
  [docs.epayco.com/docs/api](https://docs.epayco.com/docs/api)
- Hyperswitch:
  [github.com/juspay/hyperswitch](https://github.com/juspay/hyperswitch)
- Kill Bill:
  [github.com/killbill/killbill](https://github.com/killbill/killbill)

