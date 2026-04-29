# Orquestacion, Failover y Bre-B

Fecha de actualizacion: 2026-04-29

## 1. Objetivo arquitectonico

Disenar una plataforma que pueda:

- recibir pagos con varios metodos
- enrutar operaciones a varios proveedores
- sobrevivir a la caida parcial de un proveedor
- ejecutar payouts de forma trazable
- incorporar `Bre-B` como metodo de primera clase

## 2. Principios base

- `payment order` y `payment attempt` son entidades distintas
- `provider adapter` y `routing engine` no son lo mismo
- `fallback` y `smart retry` no son lo mismo
- `redirect UX` y `final settlement status` no son lo mismo
- `payments` y `payouts` comparten patrones, pero no deben mezclarse en un solo flujo ambiguo

## 3. Capas recomendadas

### 3.1 API / Application layer

Responsable de:

- exponer endpoints al frontend o a integradores
- validar requests
- crear ordenes
- lanzar jobs
- devolver estados canonicos

### 3.2 Domain layer

Responsable de:

- reglas del negocio
- estados internos
- elegibilidad de retry o fallback
- politicas de payout y aprobacion
- reconciliacion

### 3.3 Provider adapter layer

Responsable de:

- traducir requests internos a payloads del proveedor
- traducir responses y errores del proveedor a un lenguaje comun
- verificar webhooks
- consultar estados
- exponer capacidades por metodo

### 3.4 Routing / orchestration layer

Responsable de:

- seleccionar proveedor primario
- decidir fallback
- disparar retries permitidos
- aplicar reglas por comercio, metodo o proveedor

### 3.5 Infrastructure layer

Responsable de:

- jobs
- colas
- base de datos
- almacenamiento de eventos
- logs
- metricas
- secretos

## 4. Modelo de dominio recomendado

### 4.1 Pagos

- `payment_orders`
- `payment_attempts`
- `provider_transactions`
- `payment_events`
- `refunds`
- `payment_methods`
- `provider_capabilities`

### 4.2 Payouts

- `payout_batches`
- `payout_items`
- `beneficiaries`
- `source_accounts`
- `payout_events`
- `payout_approvals`

### 4.3 Soporte y gobierno

- `merchants`
- `merchant_provider_credentials`
- `routing_rules`
- `audit_logs`
- `reconciliation_items`

## 5. Contrato recomendado del adapter

Interfaz conceptual:

```ts
interface PaymentProviderAdapter {
  getProviderCode(): string
  supportsMethod(method: PaymentMethodCode): boolean
  getHealthStatus(): Promise<ProviderHealth>
  createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult>
  createDirectPayment(input: CreateDirectPaymentInput): Promise<CreateDirectPaymentResult>
  createPaymentSource?(input: CreatePaymentSourceInput): Promise<CreatePaymentSourceResult>
  getTransactionStatus(input: GetTransactionStatusInput): Promise<GetTransactionStatusResult>
  refundPayment?(input: RefundPaymentInput): Promise<RefundPaymentResult>
  verifyWebhook(input: VerifyWebhookInput): Promise<VerifyWebhookResult>
  parseWebhookEvent(input: ParseWebhookEventInput): Promise<NormalizedWebhookEvent[]>
  classifyFailure(input: ProviderFailureInput): ProviderFailureClassification
}
```

Para payouts:

```ts
interface PayoutProviderAdapter {
  getProviderCode(): string
  getHealthStatus(): Promise<ProviderHealth>
  supportsDestination(type: PayoutDestinationType): boolean
  listSourceAccounts(): Promise<SourceAccount[]>
  listBanks(): Promise<ProviderBank[]>
  getLimits(): Promise<PayoutLimits>
  createPayoutBatch(input: CreatePayoutBatchInput): Promise<CreatePayoutBatchResult>
  getPayoutBatchStatus(input: GetPayoutBatchStatusInput): Promise<GetPayoutBatchStatusResult>
  verifyWebhook(input: VerifyWebhookInput): Promise<VerifyWebhookResult>
  parseWebhookEvent(input: ParseWebhookEventInput): Promise<NormalizedWebhookEvent[]>
  classifyFailure(input: ProviderFailureInput): ProviderFailureClassification
}
```

## 6. Routing, fallback y retry

## 6.1 Fallback

`Fallback` es la lista de prioridad de proveedores. Se usa cuando:

- un proveedor esta degradado
- un metodo no esta disponible temporalmente
- una integracion esta en mantenimiento

Ejemplo:

- tarjetas: `Wompi -> PayU -> ePayco`
- PSE: `Wompi -> PayU -> ePayco`
- Bre-B: `PayU -> futuro segundo proveedor`
- payout bank transfer: `Wompi -> PayU`

## 6.2 Smart retry

`Smart retry` es un nuevo intento controlado. Solo se debe permitir si:

- la falla fue tecnica o recuperable
- el proveedor indica un error elegible
- el metodo no requiere nueva accion del usuario
- no hay riesgo de duplicidad operativa

## 6.3 Regla critica

No todos los metodos son aptos para retry silencioso:

- tarjetas no 3DS: a veces si
- tarjetas con 3DS: depende del punto de falla
- PSE: normalmente no sin nueva accion del usuario
- Bre-B QR: normalmente no sin nueva accion del usuario
- payouts: depende del tipo de error y del estado bancario

## 7. Clasificacion sugerida de errores

- `TECHNICAL_RECOVERABLE`
- `TECHNICAL_NON_RECOVERABLE`
- `BUSINESS_DECLINE`
- `AUTHENTICATION_ERROR`
- `CONFIGURATION_ERROR`
- `RATE_LIMIT`
- `PROVIDER_DEGRADED`
- `BANKING_IN_PROGRESS`
- `MANUAL_REVIEW_REQUIRED`

## 8. Flujo recomendado para Bre-B

## 8.1 Consideraciones

Bre-B es un sistema de pagos inmediatos interoperados. En el proyecto debe modelarse como familia propia, no como simple variante cosmetica.

Campos conceptuales esperables:

- `method_family = BRE_B_QR`
- `requires_user_action = true`
- `requires_qr_or_alias = true`
- `supports_silent_retry = false` por defecto
- `final_state_source = webhook_or_polling`

## 8.2 Flujo de alto nivel

1. Crear `payment_order`.
2. Resolver proveedor compatible con `Bre-B`.
3. Crear `payment_attempt`.
4. Solicitar al proveedor el recurso necesario para el flujo: QR, alias, session o datos equivalentes.
5. Mostrar experiencia al usuario.
6. Esperar webhook o consultar estado.
7. Consolidar `APPROVED`, `DECLINED`, `ERROR` o estado equivalente.
8. Conciliar referencias.

## 9. Flujo recomendado para payouts

1. Registrar o seleccionar cuenta origen.
2. Validar limites y saldo.
3. Construir lote o payout individual.
4. Pasar por etapa de aprobacion si aplica.
5. Enviar al proveedor con idempotency key.
6. Persistir estado y referencias.
7. Escuchar webhook o consultar estado.
8. Cerrar conciliacion del lote y de cada item.

## 10. Observabilidad minima obligatoria

- metricas por proveedor, metodo y estado
- trazas por `payment_order_id`, `payment_attempt_id`, `payout_batch_id`
- porcentaje de exito por proveedor
- latencia de autorizacion
- latencia de webhook
- tasa de errores recuperables vs no recuperables
- conteo de fallback activados

## 11. Lecciones extraidas de open source

### Hyperswitch

- separar claramente `connector integration`, `routing`, `retries`, `vault` y `reconciliation`
- definir contratos por flujo
- mapear estados del proveedor a estados internos

### Kill Bill

- mantener el dominio desacoplado del proveedor
- pensar en multi-tenant y reportes desde temprano

### Templates de integracion tipo Mercado Pago

- el webhook manda
- el redirect solo ayuda a UX
- los reintentos del proveedor existen y hay que soportarlos

## 12. Riesgos arquitectonicos a evitar

- fallback sin clasificacion de errores
- mezclar estado visual con estado financiero final
- acoplar el dominio a nombres de campos de un proveedor
- modelar payouts como una variante de refunds o viceversa
- no separar `health check` de `business success rate`
