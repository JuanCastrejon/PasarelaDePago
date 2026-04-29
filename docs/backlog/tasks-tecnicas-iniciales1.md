# Tasks Tecnicas Iniciales v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Traducir las historias priorizadas a trabajo tecnico concreto para iniciar el proyecto con orden.

## 2. Fundaciones de dominio

- `TT-001` Crear estructura `docs/dominio`, `docs/matriz`, `docs/backlog` y `docs/adr`.
- `TT-002` Formalizar taxonomia canonica de estados en documento y futura enumeracion de codigo.
- `TT-003` Disenar esquema inicial de `payment_orders`.
- `TT-004` Disenar esquema inicial de `payment_attempts`.
- `TT-005` Disenar esquema de `payment_references` y `provider_events`.

## 3. Fundaciones de integracion

- `TT-006` Definir contrato TypeScript de `PaymentProviderAdapter`.
- `TT-007` Definir contrato de `PayoutProviderAdapter`.
- `TT-008` Disenar tabla o configuracion de `provider_capability_matrix`.
- `TT-009` Definir clasificacion interna de errores de proveedor.
- `TT-010` Definir estructura de `idempotency keys`.

## 4. Fundaciones de cobro

- `TT-011` Disenar flujo de creacion de `payment_order`.
- `TT-012` Disenar flujo de creacion de `checkout_session`.
- `TT-013` Disenar flujo de creacion de `payment_attempt`.
- `TT-014` Definir campos minimos de `PSE` y `financial_entity`.
- `TT-015` Definir politica de expiracion de sesiones e intentos.

## 5. Fundaciones de asincronia

- `TT-016` Disenar inbox de webhooks.
- `TT-017` Definir estrategia de deduplicacion de eventos.
- `TT-018` Disenar polling de respaldo por proveedor.
- `TT-019` Definir reglas de retry y fallback por familia de metodo.
- `TT-020` Disenar timeline operativa por orden.

## 6. Fundaciones de proveedor

- `TT-021` Priorizar adapter `Wompi`.
- `TT-022` Priorizar adapter `PayU`.
- `TT-023` Preparar adapter `ePayco`.
- `TT-024` Preparar adapter `Payvalida`.
- `TT-025` Definir health checks y score de disponibilidad por proveedor.

## 7. Fundaciones de payouts

- `TT-026` Disenar esquema de `beneficiaries`.
- `TT-027` Disenar esquema de `payout_batches`.
- `TT-028` Disenar esquema de `payout_items`.
- `TT-029` Definir workflow de aprobacion dual.
- `TT-030` Definir reconciliacion basica de payouts.

## 8. Fundaciones operativas

- `TT-031` Definir consultas de soporte por referencia, `CUS`, autorizacion y recibo.
- `TT-032` Disenar panel de timeline operativa.
- `TT-033` Disenar panel de conciliacion y excepciones.
- `TT-034` Definir reportes basicos por proveedor y metodo.
- `TT-035` Definir alertas para webhooks fallidos y ordenes atascadas.

## 9. Fundaciones de seguridad y gobierno

- `TT-036` Definir roles de `Platform Owner`, `Ops Analyst`, `Finance Analyst`, `Approver` y `Developer`.
- `TT-037` Definir politica de auditoria de acciones sensibles.
- `TT-038` Definir estrategia de almacenamiento de secretos y rotacion.
- `TT-039` Definir minima retencion de payloads y evidencias.
- `TT-040` Definir limite de acceso a PII y artefactos crudos.

## 10. Orden sugerido de ejecucion

### Ola 1

- `TT-002`
- `TT-003`
- `TT-004`
- `TT-005`
- `TT-006`
- `TT-008`

### Ola 2

- `TT-011`
- `TT-012`
- `TT-013`
- `TT-016`
- `TT-017`
- `TT-018`

### Ola 3

- `TT-021`
- `TT-022`
- `TT-031`
- `TT-032`
- `TT-035`

### Ola 4

- `TT-026`
- `TT-027`
- `TT-028`
- `TT-029`
- `TT-033`

## 11. Conclusion

Estas tasks tecnicas iniciales ya permiten convertir la documentacion en trabajo de implementacion ordenado, sin perder el enfoque en dominio y resiliencia.
