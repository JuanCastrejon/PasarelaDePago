# Matriz Canonica de Estados por Proveedor v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Traducir estados crudos de los proveedores y rieles a una taxonomia canonica del proyecto para dejar lista la implementacion del motor de orquestacion.

## 2. Estados canonicos del proyecto

- `ATTEMPT_CREATED`
- `CHECKOUT_SESSION_STARTED`
- `PROVIDER_REDIRECT_READY`
- `PAYER_REDIRECTED`
- `AWAITING_PAYER_ACTION`
- `AWAITING_PROVIDER_CONFIRMATION`
- `PENDING_MANUAL_REVIEW`
- `APPROVED`
- `REJECTED`
- `FAILED_TO_CREATE`
- `FAILED_PROCESSING`
- `ABANDONED_BY_PAYER`
- `EXPIRED`
- `CANCELLED`
- `REVERSED_OR_NULLIFIED`

## 3. Politica de mapeo

1. Nunca usar texto crudo del proveedor como estado de dominio.
2. Conservar siempre el estado crudo original.
3. Separar `REJECTED` de `FAILED_TO_CREATE` y `FAILED_PROCESSING`.
4. Tratar `PENDING` como familia de espera, no como error.

## 4. Mapeo por proveedor

## 4.1 Wompi

| Estado crudo | Estado canonico | Terminal | Nota |
| --- | --- | --- | --- |
| `PENDING` | `AWAITING_PROVIDER_CONFIRMATION` | No | Toda transaccion nace asi |
| `APPROVED` | `APPROVED` | Si | Pago exitoso |
| `DECLINED` | `REJECTED` | Si | Rechazo de negocio o procesamiento |
| `VOIDED` | `REVERSED_OR_NULLIFIED` | Si | Anulada |
| `ERROR` | `FAILED_PROCESSING` | Si | Error durante procesamiento |

## 4.2 PayU

| Estado crudo | Estado canonico | Terminal | Nota |
| --- | --- | --- | --- |
| `PENDING` | `AWAITING_PROVIDER_CONFIRMATION` | No | Caso general |
| `SUBMITTED` | `AWAITING_PROVIDER_CONFIRMATION` | No | Enviada a entidad financiera |
| `APPROVED` | `APPROVED` | Si | Aprobada |
| `DECLINED` | `REJECTED` | Si | Rechazo final |
| `EXPIRED` | `EXPIRED` | Si | Expiro la transaccion |
| `ERROR` | `FAILED_PROCESSING` | Si | Error tecnico |

### Submotivos relevantes de `PENDING`

| Codigo o mensaje | Estado canonico | Nota |
| --- | --- | --- |
| `PENDING_TRANSACTION_CONFIRMATION` | `AWAITING_PROVIDER_CONFIRMATION` | Esperando confirmacion del riel |
| `PENDING_TRANSACTION_REVIEW` | `PENDING_MANUAL_REVIEW` | Revision manual o validacion |
| `PENDING_AWAITING_PSE_CONFIRMATION` | `AWAITING_PROVIDER_CONFIRMATION` | Espera propia de PSE |
| `PENDING_PAYMENT_IN_ENTITY` | `AWAITING_PROVIDER_CONFIRMATION` | Espera de entidad |
| `PENDING_PAYMENT_IN_BANK` | `AWAITING_PROVIDER_CONFIRMATION` | Espera de banco |
| `PENDING_NOTIFYING_ENTITY` | `AWAITING_PROVIDER_CONFIRMATION` | Espera de notificacion |

## 4.3 ePayco

| Estado crudo | Estado canonico | Terminal | Nota |
| --- | --- | --- | --- |
| `Aceptada` | `APPROVED` | Si | Pago aprobado |
| `Rechazada` | `REJECTED` | Si | Rechazo final |
| `Pendiente` | `AWAITING_PROVIDER_CONFIRMATION` | No | PSE y otros medios asincronos |
| `Fallida` | `FAILED_TO_CREATE` | Si | No se completo el flujo de creacion |
| `Retenida` | `PENDING_MANUAL_REVIEW` | No | Caso de auditoria/revision |
| `Iniciada` | `ATTEMPT_CREATED` | No | Estado interno de arranque |
| `Abandonada` | `ABANDONED_BY_PAYER` | Si | El usuario cerro el navegador |
| `Cancelada` | `CANCELLED` | Si | El usuario no culmino el proceso final |
| `Caducada` | `EXPIRED` | Si | Vencimiento del medio |
| `Reversada` | `REVERSED_OR_NULLIFIED` | Si | Reintegro o reverso |

## 4.4 Payvalida - orden de recaudo

| Estado crudo | Estado canonico | Terminal | Nota |
| --- | --- | --- | --- |
| `PENDIENTE` | `AWAITING_PROVIDER_CONFIRMATION` | No | Orden abierta |
| `APROBADA` | `APPROVED` | Si | Orden pagada |
| `VENCIDA` | `EXPIRED` | Si | No pagada a tiempo |
| `CANCELADA` | `CANCELLED` | Si | Eliminada por comercio |
| `ANULADA` | `REVERSED_OR_NULLIFIED` | Si | Anulada o devuelta |

## 4.5 Payvalida - transaccion PSE

| Estado crudo | Estado canonico | Terminal | Nota |
| --- | --- | --- | --- |
| `PENDIENTE` | `AWAITING_PROVIDER_CONFIRMATION` | No | No crear nueva transaccion con misma referencia |
| `APROBADA` | `APPROVED` | Si | PSE exitosa |
| `RECHAZADA` | `REJECTED` | Si | PSE rechazada |
| `FALLIDA` | `FAILED_PROCESSING` | Si | Fallo tecnico o de procesamiento |

## 4.6 PSE como riel

| Evento o situacion | Estado canonico | Terminal | Nota |
| --- | --- | --- | --- |
| Usuario entra al handoff PSE | `PAYER_REDIRECTED` | No | Ya no hay fallback silencioso |
| Espera de validacion bancaria | `AWAITING_PAYER_ACTION` | No | El usuario aun puede estar interactuando |
| Espera de confirmacion del riel | `AWAITING_PROVIDER_CONFIRMATION` | No | Ventana operativa hasta 21 minutos |
| Correo de aprobacion con `CUS` | `APPROVED` | Si | Debe correlacionarse con proveedor |
| Correo de rechazo con `CUS` | `REJECTED` | Si | Puede requerir validacion con banco si hubo debito |

## 4.7 AvalPay Center

| Artefacto o estado visible | Estado canonico | Terminal | Nota |
| --- | --- | --- | --- |
| Sesion de checkout iniciada | `CHECKOUT_SESSION_STARTED` | No | Con TTL |
| Datos del pagador capturados | `AWAITING_PAYER_ACTION` | No | Antes del handoff |
| Handoff a `registro.pse.com.co` | `PAYER_REDIRECTED` | No | Punto de no retorno UX |
| Correo `Transaccion Aprobada` | `APPROVED` | Si | Artefacto visible |
| Correo `Transaccion Rechazada` | `REJECTED` | Si | Artefacto visible |

## 5. Reglas canonicas de negocio

## 5.1 Retry

- `AWAITING_PAYER_ACTION` y `AWAITING_PROVIDER_CONFIRMATION` no son elegibles para retry silencioso.
- `FAILED_TO_CREATE` puede permitir retry tecnico si no hubo referencia remota confiable.
- `FAILED_PROCESSING` puede permitir retry o fallback segun metodo y punto del flujo.
- `REJECTED` debe tratarse como nuevo intento guiado por el usuario, no como retry silencioso.

## 5.2 Conciliacion

- `APPROVED` no significa settlement conciliado.
- `REVERSED_OR_NULLIFIED` no significa refund liquidado sin confirmacion financiera.
- `ABANDONED_BY_PAYER` debe separarse de `EXPIRED` y `CANCELLED`.

## 5.3 UX

- `AWAITING_PROVIDER_CONFIRMATION` debe mostrar mensaje de espera y reconsulta.
- `PENDING_MANUAL_REVIEW` debe mostrar estado de revision y no de error generico.
- `FAILED_TO_CREATE` y `FAILED_PROCESSING` deben tener copy distinto.

## 6. Uso esperado en implementacion

Esta matriz debe alimentar:

- mapeadores por proveedor
- reglas de retry
- alertas operativas
- dashboards
- timeline de transacciones

## 7. Conclusion

La matriz canonica permite que el producto hable un lenguaje estable aunque `Wompi`, `PayU`, `ePayco`, `Payvalida`, `PSE` y `AvalPay` usen vocabularios diferentes.
