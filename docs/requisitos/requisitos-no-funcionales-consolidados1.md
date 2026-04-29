# Requisitos No Funcionales v2

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Definir los atributos de calidad minimos para que el proyecto sea tecnicamente serio, operable y sostenible.

## 2. Seguridad

- `RNFV2-001` El sistema no debe almacenar `PAN`, `CVV` ni datos equivalentes de tarjeta.
- `RNFV2-002` El sistema debe cifrar secretos, credenciales y PII sensible en reposo.
- `RNFV2-003` El sistema debe usar HTTPS para webhooks, APIs y callbacks.
- `RNFV2-004` El sistema debe validar autenticidad de webhooks antes de procesarlos.
- `RNFV2-005` El acceso a datos sensibles y evidencias crudas debe quedar auditado.

## 3. Idempotencia e integridad

- `RNFV2-006` Toda operacion critica debe poder ejecutarse de forma idempotente.
- `RNFV2-007` El sistema debe tolerar notificaciones duplicadas de proveedor sin duplicar efectos de negocio.
- `RNFV2-008` El sistema debe evitar transiciones de estado imposibles o regresivas no justificadas.
- `RNFV2-009` El sistema debe conservar historico de estados y referencias.
- `RNFV2-010` El sistema debe diferenciar entre payload crudo y datos normalizados.

## 4. Resiliencia

- `RNFV2-011` La caida parcial de un proveedor no debe derribar el resto del sistema.
- `RNFV2-012` El sistema debe permitir desactivar rutas o metodos sin despliegue.
- `RNFV2-013` Los jobs asincronos deben poder reanudarse sin corromper estado.
- `RNFV2-014` Los endpoints de webhook deben responder rapido y delegar trabajo pesado a procesos asincronos.
- `RNFV2-015` Las ordenes `PENDING` deben tener reglas de timeout, reconsulta y escalamiento.

## 5. Verdad transaccional

- `RNFV2-016` La fuente de verdad final no debe depender de la pagina de retorno del navegador.
- `RNFV2-017` El sistema debe soportar polling de respaldo cuando el proveedor o el riel lo exijan.
- `RNFV2-018` El sistema debe separar estado transaccional, settlement, devolucion y conciliacion.
- `RNFV2-019` Debe existir trazabilidad entre la evidencia visible al cliente y la evidencia backend.
- `RNFV2-020` El sistema debe poder explicar por que una operacion esta `PENDING`, `FAILED`, `REJECTED` o `APPROVED`.

## 6. Observabilidad

- `RNFV2-021` Toda orden debe ser trazable end-to-end.
- `RNFV2-022` Deben existir logs estructurados por orden, intento, webhook, payout y conciliacion.
- `RNFV2-023` Deben existir metricas por proveedor, metodo, estado y tipo de error.
- `RNFV2-024` Deben existir alertas de negocio para ordenes atascadas, webhooks fallidos y discrepancias de conciliacion.
- `RNFV2-025` Debe poder medirse la latencia entre creacion, confirmacion y cierre de una operacion.

## 7. Rendimiento y escalabilidad

- `RNFV2-026` El sistema debe soportar crecimiento en numero de transacciones sin rediseño total del dominio.
- `RNFV2-027` Las consultas operativas deben escalar mediante indices, filtros y paginacion adecuados.
- `RNFV2-028` Las integraciones con proveedores deben soportar reintentos tecnicos controlados.
- `RNFV2-029` Los procesos de conciliacion deben ejecutarse de forma incremental o por lotes.
- `RNFV2-030` Los payloads grandes y artefactos de evidencia deben almacenarse sin degradar la operacion diaria.

## 8. Operabilidad

- `RNFV2-031` El sistema debe permitir reconsultas manuales y automatizadas por soporte.
- `RNFV2-032` Los errores deben clasificarse en categorias operables por humanos y por reglas.
- `RNFV2-033` El backoffice debe poder mostrar la linea de tiempo de una operacion sin acceso directo a base de datos.
- `RNFV2-034` El sistema debe soportar workflows de aprobacion para dispersiones sensibles.
- `RNFV2-035` Debe existir capacidad de congelar, revisar o escalar operaciones inconsistentes.

## 9. Mantenibilidad y arquitectura

- `RNFV2-036` Cada proveedor debe integrarse mediante adapters desacoplados.
- `RNFV2-037` El dominio central no debe depender de nombres de campos crudos del proveedor.
- `RNFV2-038` La matriz de capacidades debe poder actualizarse sin reescribir el nucleo del sistema.
- `RNFV2-039` Payments y payouts deben compartir principios, pero no mezclarse en modelos ambiguos.
- `RNFV2-040` Las decisiones clave deben quedar documentadas en ADRs.

## 10. Cumplimiento y gobernanza

- `RNFV2-041` El sistema debe soportar segregacion de roles operativos y de aprobacion.
- `RNFV2-042` Los cambios de credenciales, configuracion y reglas deben quedar auditados.
- `RNFV2-043` La plataforma debe minimizar el contacto con datos de pago sensibles.
- `RNFV2-044` El modelo inicial debe ser compatible con un enfoque `software-only orchestration`.
- `RNFV2-045` La evidencia necesaria para KYC/KYB, activacion y soporte debe poder modelarse sin improvisacion.

## 11. Calidad visible del repositorio

- `RNFV2-046` El repositorio debe mostrar arquitectura, decisiones y trade-offs de forma clara.
- `RNFV2-047` La documentacion debe poder migrarse despues a Azure Boards y Wiki sin perdida semantica.
- `RNFV2-048` Las skills del proyecto deben ayudar a preservar consistencia tecnica y editorial.
- `RNFV2-049` La base documental debe permitir convertir investigacion en backlog sin rehacer analisis.
- `RNFV2-050` El proyecto debe demostrar conocimiento de frontend, backend, integraciones, datos y operacion.

## 12. Objetivos operativos iniciales

- `OBJV2-001` Ningun webhook valido debe producir dos veces el mismo efecto de negocio.
- `OBJV2-002` Ninguna orden `PENDING` debe quedar sin estrategia de cierre, espera o revision.
- `OBJV2-003` Toda transaccion debe poder explicarse desde el backoffice usando referencias y evidencias.
- `OBJV2-004` Una falla de proveedor debe dejar rastro util para decisiones automaticas y humanas.
- `OBJV2-005` La integracion de un nuevo proveedor no debe exigir reescritura del dominio.

## 13. Conclusion

Los requisitos no funcionales v2 fijan el estandar minimo del producto: no buscamos una demo bonita, sino una base defendible para pagos reales, estados asincronos, soporte y crecimiento multiproveedor.
