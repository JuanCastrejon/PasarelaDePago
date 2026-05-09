---
status: active
updated: 2026-05-09
supersedes:
  - docs/requisitos/requisitos-funcionales-consolidados1.md
---

# Requisitos Funcionales v2

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Consolidar y refinar los requisitos funcionales del proyecto usando el lenguaje de dominio ya definido y la investigacion operativa cerrada.

## 2. Gestion de plataforma y comercios

- `RFV2-001` El sistema debe permitir registrar multiples comercios.
- `RFV2-002` El sistema debe permitir administrar usuarios, roles y permisos por comercio.
- `RFV2-003` El sistema debe permitir asociar uno o multiples proveedores por comercio.
- `RFV2-004` El sistema debe permitir guardar credenciales por proveedor, ambiente y comercio.
- `RFV2-005` El sistema debe permitir activar o suspender una cuenta de proveedor sin borrar historico.

## 3. Matriz de capacidades y configuracion

- `RFV2-006` El sistema debe mantener una matriz de capacidades por proveedor, metodo y direccion (`payin` o `payout`).
- `RFV2-007` El sistema debe indicar si una capacidad requiere redirect, QR, alias, webhook, polling o consentimiento fuerte.
- `RFV2-008` El sistema debe permitir versionar o fechar la ultima verificacion de una capacidad.
- `RFV2-009` El sistema debe permitir habilitar o deshabilitar metodos por comercio.
- `RFV2-010` El sistema debe permitir definir proveedor primario y proveedores alternos por metodo.

## 4. Ordenes y sesiones de cobro

- `RFV2-011` El sistema debe crear `payment_orders` independientes del proveedor.
- `RFV2-012` El sistema debe crear `checkout_sessions` con TTL y resumen persistente.
- `RFV2-013` El sistema debe capturar los datos necesarios del pagador segun el metodo de pago.
- `RFV2-014` El sistema debe permitir seleccionar entidad financiera cuando el riel lo requiera, como en `PSE`.
- `RFV2-015` El sistema debe soportar respuesta visual distinta para `desktop` y `mobile` cuando el flujo requiera handoff externo.

## 5. Orquestacion de cobros

- `RFV2-016` El sistema debe crear un `payment_attempt` por cada envio real a proveedor.
- `RFV2-017` El sistema debe enrutar cada intento segun reglas de comercio, metodo, salud del proveedor y capacidades.
- `RFV2-018` El sistema debe diferenciar `primary`, `retry`, `fallback` y `manual attempt`.
- `RFV2-019` El sistema debe impedir retry silencioso cuando el usuario ya fue redirigido al banco o al riel.
- `RFV2-020` El sistema debe soportar fallback tecnico antes del punto de no retorno del flujo.

## 6. Metodos de pago prioritarios

- `RFV2-021` El sistema debe soportar tarjetas a traves de proveedores compatibles.
- `RFV2-022` El sistema debe soportar `PSE` como familia prioritaria de metodo.
- `RFV2-023` El sistema debe soportar `Bre-B` como familia propia cuando exista soporte oficial del proveedor integrado.
- `RFV2-024` El sistema debe soportar wallets y botones bancarios relevantes para Colombia como `Nequi`, `Daviplata` y `Boton Bancolombia` cuando la integracion escogida lo permita.
- `RFV2-025` El sistema debe soportar pago por redirect y experiencias embebidas cuando el proveedor lo permita.

## 7. Webhooks, consultas y sincronizacion

- `RFV2-026` El sistema debe recibir webhooks de multiples proveedores.
- `RFV2-027` El sistema debe verificar firma, checksum o mecanismo oficial de autenticidad antes de aceptar un webhook.
- `RFV2-028` El sistema debe procesar webhooks de forma idempotente.
- `RFV2-029` El sistema debe soportar `polling` o consulta backend para recuperar estado cuando el webhook no llegue o se retrase.
- `RFV2-030` El sistema debe distinguir entre `raw provider status` y `canonical status`.

## 8. Estados y evidencias

- `RFV2-031` El sistema debe conservar el payload original de cada evento del proveedor.
- `RFV2-032` El sistema debe guardar referencias internas y externas desde el primer intento.
- `RFV2-033` El sistema debe correlacionar referencias como `CUS`, autorizacion, recibo, `transaction_id`, `ticket_id` o equivalentes.
- `RFV2-034` El sistema debe conservar artefactos visibles al cliente como correos, vouchers o comprobantes cuando existan.
- `RFV2-035` El sistema debe exponer una linea de tiempo por orden e intento.

## 9. Reintentos y continuidad operativa

- `RFV2-036` El sistema debe crear un nuevo `payment_attempt` por cada retry.
- `RFV2-037` El sistema debe impedir un nuevo intento incompatible mientras el intento previo siga `PENDING` en proveedores que lo prohigan.
- `RFV2-038` El sistema debe clasificar fallas como tecnicas recuperables, tecnicas no recuperables, rechazo de negocio o revision manual.
- `RFV2-039` El sistema debe soportar reintento guiado del usuario cuando el metodo lo permita.
- `RFV2-040` El sistema debe registrar por que se disparo un fallback o retry.

## 10. Beneficiarios y payouts

- `RFV2-041` El sistema debe permitir registrar y validar beneficiarios.
- `RFV2-042` El sistema debe soportar payouts individuales y por lote.
- `RFV2-043` El sistema debe soportar cuentas origen multiples cuando el proveedor lo permita.
- `RFV2-044` El sistema debe soportar flujo de aprobacion para payouts sensibles.
- `RFV2-045` El sistema debe consultar el estado de lotes e items de payout.

## 11. Refunds, reversos y anulaciones

- `RFV2-046` El sistema debe modelar refunds y reversos como procesos distintos.
- `RFV2-047` El sistema debe asociar cada refund o reverso a la orden y al intento original.
- `RFV2-048` El sistema debe registrar si la devolucion fue nativa del proveedor o manual por operacion externa.
- `RFV2-049` El sistema debe soportar devoluciones parciales y totales cuando el proveedor lo permita.
- `RFV2-050` El sistema debe registrar la confirmacion final del proveedor antes de marcar una devolucion como completada.

## 12. Conciliacion y reporting

- `RFV2-051` El sistema debe conciliar ordenes internas con transacciones externas.
- `RFV2-052` El sistema debe soportar conciliacion por pago, intento, payout, lote y evento.
- `RFV2-053` El sistema debe identificar diferencias por monto, referencia, estado o tiempo.
- `RFV2-054` El sistema debe registrar excepciones de conciliacion y su estado de resolucion.
- `RFV2-055` El sistema debe generar reportes operativos y financieros basicos.

## 13. Operacion y soporte

- `RFV2-056` El sistema debe exponer dashboards operativos por proveedor, metodo y estado.
- `RFV2-057` El sistema debe permitir buscar una operacion por referencia interna, `CUS`, autorizacion, recibo o referencia del proveedor.
- `RFV2-058` El sistema debe exponer el historico de webhooks y su validacion.
- `RFV2-059` El sistema debe permitir reconsultar estados desde backoffice.
- `RFV2-060` El sistema debe mostrar claramente la diferencia entre estado visible al usuario y estado final canonico.

## 14. Gobierno y seguridad funcional

- `RFV2-061` El sistema debe segregar permisos entre operador, finanzas, aprobador, cumplimiento y desarrollador.
- `RFV2-062` El sistema debe auditar cambios de credenciales, reglas de routing y acciones sensibles.
- `RFV2-063` El sistema debe soportar estados de onboarding del comercio y del beneficiario.
- `RFV2-064` El sistema debe impedir operar metodos no activados para un comercio.
- `RFV2-065` El sistema debe registrar evidencia suficiente para explicar decisiones automaticas y manuales.

## 15. Conclusion

Estos requisitos funcionales v2 convierten la investigacion en un contrato de producto mas claro: el sistema no solo debe `cobrar`, sino orquestar, evidenciar, reconciliar y operar pagos reales con trazabilidad defendible.

