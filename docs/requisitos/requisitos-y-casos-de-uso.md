# Requisitos y Casos de Uso

Fecha de actualizacion: 2026-04-29

## 1. Vision del producto

Construir una plataforma de payment orchestration para Colombia capaz de:

- recibir pagos por multiples metodos
- enrutar operaciones entre multiples proveedores
- tolerar fallas parciales de proveedores
- ejecutar payouts y dispersiones
- exponer trazabilidad y conciliacion
- escalar a un producto comercializable a futuro

## 2. Actores del sistema

### Actores de negocio

- `Platform Owner`: duenio del producto y operador principal
- `Merchant`: empresa o persona que usa la plataforma para cobrar o pagar
- `Payer`: cliente final que realiza el pago
- `Beneficiary / Payee`: persona o entidad que recibe un payout

### Actores operativos

- `Ops Analyst`: monitorea transacciones, incidentes y reintentos
- `Finance Analyst`: reconcilia pagos, payouts, saldos y discrepancias
- `Approver`: aprueba payouts o cambios sensibles
- `Risk / Compliance Analyst`: revisa excepciones, KYC/KYB y eventos sospechosos

### Actores tecnicos

- `Developer Integrator`: integra APIs del producto
- `Provider System`: Wompi, PayU, ePayco, Mercado Pago u otro proveedor
- `Notification System`: webhooks, jobs, colas y alertas

## 3. Casos de uso de alto nivel

### Cobro

- crear una orden de pago
- seleccionar metodo de pago adecuado
- enrutar la orden al proveedor
- confirmar el estado final
- permitir consulta posterior

### Continuidad operativa

- detectar falla parcial del proveedor principal
- decidir si hay retry o fallback
- mover la operacion al proveedor secundario cuando aplique
- evitar duplicidad de cobro

### Dispersiones

- crear beneficiarios
- crear payouts individuales o por lote
- programar, aprobar y ejecutar payouts
- consultar estados y errores

### Operacion y auditoria

- visualizar transacciones e intentos
- ver eventos webhook y firmas
- reintentar consultas o conciliaciones
- generar reportes

### Gobierno del sistema

- administrar credenciales y capacidades por proveedor
- activar o desactivar metodos
- definir reglas de ruteo
- controlar permisos y aprobaciones

## 4. Requisitos funcionales

## 4.1 Onboarding y configuracion

- `FR-001` El sistema debe permitir registrar uno o multiples comercios.
- `FR-002` El sistema debe permitir asociar a cada comercio uno o multiples proveedores.
- `FR-003` El sistema debe permitir cargar credenciales por proveedor y por ambiente.
- `FR-004` El sistema debe permitir definir que metodos estan habilitados por comercio.
- `FR-005` El sistema debe permitir definir un proveedor primario y uno o mas de respaldo por metodo.

## 4.2 Catalogo de capacidades

- `FR-006` El sistema debe mantener una matriz de capacidades por proveedor, ambiente, pais y metodo.
- `FR-007` El sistema debe indicar si un metodo soporta redirect, QR, webhook, tokenizacion, payout, refund y retry silencioso.
- `FR-008` El sistema debe permitir invalidar o desactivar una capacidad sin borrar historico.

## 4.3 Ordenes e intentos de pago

- `FR-009` El sistema debe crear `payment_orders` independientes del proveedor.
- `FR-010` El sistema debe crear `payment_attempts` por cada envio real a proveedor.
- `FR-011` El sistema debe guardar referencias internas y externas desde el primer intento.
- `FR-012` El sistema debe soportar multiples intentos sobre una misma orden sin perder trazabilidad.
- `FR-013` El sistema debe registrar el origen del intento: primario, retry o fallback.

## 4.4 Checkout y experiencias de pago

- `FR-014` El sistema debe soportar checkout alojado y experiencias API embebidas cuando el proveedor lo permita.
- `FR-015` El sistema debe soportar pagos por tarjetas.
- `FR-016` El sistema debe soportar PSE.
- `FR-017` El sistema debe soportar Nequi.
- `FR-018` El sistema debe soportar Boton Bancolombia y variantes QR relevantes.
- `FR-019` El sistema debe soportar `Bre-B` cuando el proveedor lo exponga oficialmente.
- `FR-020` El sistema debe soportar Daviplata cuando el proveedor lo permita.

## 4.5 Routing, fallback y retries

- `FR-021` El sistema debe enrutar la operacion al proveedor mas adecuado segun metodo, comercio, capacidad y reglas.
- `FR-022` El sistema debe distinguir entre fallback y smart retry.
- `FR-023` El sistema debe permitir fallback a proveedor secundario cuando el fallo sea tecnico y la experiencia lo permita.
- `FR-024` El sistema debe impedir retry silencioso si el metodo requiere una nueva accion del usuario y no existe consentimiento valido.
- `FR-025` El sistema debe clasificar errores en recoverable, non-recoverable y review-required.

## 4.6 Webhooks y sincronizacion

- `FR-026` El sistema debe recibir webhooks de multiples proveedores.
- `FR-027` El sistema debe verificar la firma, checksum o mecanismo oficial de autenticidad del proveedor.
- `FR-028` El sistema debe procesar webhooks de forma idempotente.
- `FR-029` El sistema debe persistir el payload original del webhook y su resultado de validacion.
- `FR-030` El sistema debe poder consultar activamente el estado de una transaccion cuando el webhook no llegue.

## 4.7 Refunds, anulaciones y reversos

- `FR-031` El sistema debe soportar reverso o refund cuando el proveedor lo permita.
- `FR-032` El sistema debe modelar refunds parciales y totales.
- `FR-033` El sistema debe asociar cada refund al intento y a la orden original.

## 4.8 Tokenizacion y pagos recurrentes

- `FR-034` El sistema debe soportar tokenizacion mediante el proveedor, nunca almacenando datos sensibles completos.
- `FR-035` El sistema debe soportar fuentes de pago reutilizables cuando el proveedor lo permita.
- `FR-036` El sistema debe soportar suscripciones y cargos recurrentes por modulo separado.

## 4.9 Payouts y dispersiones

- `FR-037` El sistema debe soportar beneficiarios individuales y lotes de beneficiarios.
- `FR-038` El sistema debe soportar payouts inmediatos, programados o recurrentes cuando el proveedor lo permita.
- `FR-039` El sistema debe soportar aprobacion dual para dispersiones sensibles.
- `FR-040` El sistema debe soportar multiples cuentas origen.
- `FR-041` El sistema debe soportar consulta de limites, saldos, lotes y transacciones de payout.
- `FR-042` El sistema debe soportar payout a bancos y billeteras soportadas por el proveedor.

## 4.10 Reconciliacion y reporting

- `FR-043` El sistema debe conciliar ordenes internas con transacciones externas.
- `FR-044` El sistema debe identificar diferencias por monto, estado, referencia o tiempo.
- `FR-045` El sistema debe generar reportes de transacciones, payouts y discrepancias.
- `FR-046` El sistema debe conservar historico de estados y cambios.

## 4.11 Operacion, monitoreo y soporte

- `FR-047` El sistema debe mostrar dashboards operativos por proveedor, metodo y estado.
- `FR-048` El sistema debe permitir explorar errores y eventos por orden o intento.
- `FR-049` El sistema debe alertar sobre caidas, latencia anormal y picos de error.
- `FR-050` El sistema debe exponer un estado de salud interno del sistema y de sus proveedores integrados.

## 5. Requisitos no funcionales

## 5.1 Seguridad

- `NFR-001` No almacenar PAN ni CVV.
- `NFR-002` Cifrar credenciales, secretos y PII sensible.
- `NFR-003` Verificar autenticidad de webhooks.
- `NFR-004` Mantener auditoria inmutable de eventos criticos.
- `NFR-005` Aplicar minimo privilegio en accesos y roles.

## 5.2 Resiliencia

- `NFR-006` Toda operacion critica debe ser idempotente.
- `NFR-007` El sistema debe tolerar reintentos del proveedor sin duplicar efectos.
- `NFR-008` El sistema debe degradar con elegancia si un proveedor falla.
- `NFR-009` Los jobs asincronos deben poder reanudarse sin corromper estado.

## 5.3 Observabilidad

- `NFR-010` Toda orden debe ser trazable end-to-end.
- `NFR-011` Deben existir logs estructurados por orden, intento, webhook y payout.
- `NFR-012` Deben existir metricas por proveedor, metodo y error.
- `NFR-013` Deben existir alertas de negocio y de infraestructura.

## 5.4 Rendimiento

- `NFR-014` Los webhooks deben responder rapido y mover procesamiento pesado a colas o jobs.
- `NFR-015` Las consultas operativas deben escalar con indices y particionado razonable.
- `NFR-016` El sistema debe soportar crecimiento en numero de comercios y transacciones sin rediseño completo.

## 5.5 Mantenibilidad

- `NFR-017` Cada proveedor debe integrarse mediante adaptadores desacoplados.
- `NFR-018` Los cambios en un proveedor no deben romper el dominio comun.
- `NFR-019` Deben existir pruebas unitarias, integracion y contratos relevantes.
- `NFR-020` La documentacion debe evolucionar junto al codigo.

## 5.6 Portafolio y calidad visible

- `NFR-021` El repositorio debe mostrar claramente arquitectura, decisiones y trade-offs.
- `NFR-022` Debe existir una historia visible de requisitos, ADRs, docs y skills propias.
- `NFR-023` El proyecto debe demostrar tanto backend como frontend, datos, integraciones y operacion.

## 6. Casos de uso prioritarios por fases

### Fase 1

- crear orden de pago
- cobrar con un proveedor
- recibir webhook
- reflejar estado final
- listar transacciones

### Fase 2

- enrutar por metodo y proveedor
- fallback controlado
- consolidar observabilidad
- comenzar conciliacion

### Fase 3

- payouts y beneficiarios
- aprobacion dual
- reportes operativos y financieros
- recurrentes y tokenizacion

## 7. Preguntas abiertas

- el producto iniciara con `single merchant` o `multi-merchant` desde el dia 1?
- el onboarding legal y operativo de clientes terceros se modelara desde la primera version?
- que parte del producto sera self-service y que parte sera operada manualmente al inicio?
