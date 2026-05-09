---
status: active
updated: 2026-05-09
supersedes:
  - docs/requisitos/requisitos-operativos-y-no-funcionales1.md
---

# Requisitos Operativos y No Funcionales v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Este documento complementa el levantamiento funcional ya existente y aterriza los requisitos que vuelven la plataforma:

- operable
- auditable
- resiliente
- comercializable a futuro

Complementa:

- [requisitos-y-casos-de-uso.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/requisitos-y-casos-de-uso.md)
- [historias-de-usuario.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/historias-de-usuario.md)
- [webhooks-idempotencia-y-fallback.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/investigacion/webhooks-idempotencia-y-fallback.md)

## 2. Principios operativos

1. El sistema nunca debe asumir que una redireccion de navegador equivale a una transaccion final.
2. La resiliencia se mide por la capacidad de evitar caidas y tambien por la capacidad de evitar duplicados.
3. Todo fallback debe ser explicable, trazable y reversible a nivel de auditoria, aunque no siempre lo sea a nivel financiero.
4. Los metodos con consentimiento fuerte del usuario no deben recibir `silent retry` por defecto.
5. La plataforma debe poder crecer a nuevos proveedores sin reescribir el nucleo del dominio.

## 3. Requisitos no funcionales

## 3.1 Disponibilidad y continuidad

- `NFR-001` El sistema debe mantener estado de salud por `proveedor`, `metodo`, `ambiente` y `comercio` cuando aplique.
- `NFR-002` El sistema debe permitir activar o desactivar rutas de pago sin despliegue de codigo.
- `NFR-003` El sistema debe diferenciar degradacion parcial de caida total del proveedor.
- `NFR-004` El sistema debe impedir que una caida de un metodo derribe otros metodos sanos del mismo proveedor.
- `NFR-005` El sistema debe distinguir entre `retry`, `fallback`, `manual retry` y `manual review`.

## 3.2 Integridad e idempotencia

- `NFR-006` Toda orden de cobro debe aceptar una `idempotency key` interna del comercio o del sistema.
- `NFR-007` Todo payout debe aceptar y persistir una `idempotency key` interna, aunque el proveedor tenga otra ventana o formato.
- `NFR-008` El sistema debe impedir transiciones dobles de estado originadas por eventos repetidos.
- `NFR-009` El sistema debe persistir `raw webhook`, `headers`, `timestamp de recepcion`, `checksum` y `payload hash`.
- `NFR-010` El sistema debe deduplicar eventos usando varios criterios y no solo uno.

## 3.3 Verdad transaccional y asincronia

- `NFR-011` La fuente de verdad del estado final debe ser asincrona y no depender de la pagina de retorno del frontend.
- `NFR-012` El sistema debe soportar `polling de respaldo` cuando el proveedor lo recomiende o cuando el webhook no llegue.
- `NFR-013` Las ordenes `pending` deben tener reglas de vencimiento, reconsulta y escalamiento.
- `NFR-014` El dominio debe modelar `payment_order` y `payment_attempt` por separado.
- `NFR-015` El dominio debe modelar `payout_batch` y `payout_item` por separado.

## 3.4 Seguridad

- `NFR-016` El sistema debe validar firma, checksum o mecanismo equivalente en cada webhook antes de procesarlo.
- `NFR-017` Las credenciales de proveedores deben almacenarse por ambiente y rotarse sin afectar historicos.
- `NFR-018` Los permisos de aprobacion de payouts no deben mezclarse con los permisos de configuracion de credenciales.
- `NFR-019` El acceso a evidencias crudas, webhooks y llaves debe quedar auditado.
- `NFR-020` El sistema debe soportar segregacion de roles para operador, aprobador, finanzas, cumplimiento y desarrollador.

## 3.5 Observabilidad

- `NFR-021` El sistema debe exponer metricas por proveedor, metodo, estado y tipo de error.
- `NFR-022` El sistema debe registrar si un intento fue `primary`, `retry`, `fallback` o `manual`.
- `NFR-023` El sistema debe detectar ordenes atascadas segun SLA interno por metodo.
- `NFR-024` El sistema debe alertar cuando fallen webhooks, validaciones de firma o reconciliaciones.
- `NFR-025` El sistema debe permitir inspeccionar la linea de tiempo completa de una orden.

## 3.6 UX operativa

- `NFR-026` Los endpoints webhook deben responder rapido y delegar procesos pesados a colas o jobs.
- `NFR-027` Los flujos `QR` deben mostrar expiracion visible cuando el proveedor lo requiera.
- `NFR-028` Los metodos con handoff externo deben mostrar instrucciones adecuadas para `desktop` y `mobile`.
- `NFR-029` El sistema debe impedir `silent retry` despues de exponer al usuario un `QR`, redirect o consentimiento fuerte.
- `NFR-030` El sistema debe permitir reintento guiado del usuario cuando el metodo o proveedor lo permita.

## 3.7 Datos, conciliacion y auditoria

- `NFR-031` Cada orden debe mantener referencias internas y externas desde el primer intento.
- `NFR-032` El sistema debe permitir conciliacion por orden, intento, payout, lote y evento.
- `NFR-033` El sistema debe conservar evidencia suficiente para explicar por que una operacion fue cobrada, reenviada, rechazada o revisada manualmente.
- `NFR-034` El sistema debe soportar un catalogo normalizado de errores de proveedor.
- `NFR-035` El sistema debe mantener trazabilidad entre decisiones tecnicas, artefactos funcionales y backlog futuro en Azure DevOps.

## 3.8 Extensibilidad

- `NFR-036` Un nuevo proveedor debe integrarse mediante `adapter` sin contaminar el dominio central.
- `NFR-037` La matriz de capacidades debe versionarse o al menos conservar fecha de verificacion y evidencia.
- `NFR-038` El sistema debe soportar metodos `redirect`, `tokenized`, `wallet`, `QR`, `bank transfer` y `payout` sin redisenar su nucleo.
- `NFR-039` La capa de routing no debe depender de payloads crudos del proveedor.
- `NFR-040` El sistema debe permitir deshabilitar una capacidad especifica sin eliminar su historico.

## 4. Objetivos operativos propuestos

Estos objetivos no son contrato final; son referencia de investigacion para el backlog futuro.

- `OBJ-001` El sistema debe aceptar y registrar un webhook con latencia baja y procesarlo de forma desacoplada.
- `OBJ-002` El sistema no debe ejecutar dos veces efectos de negocio para un mismo evento proveedor.
- `OBJ-003` Una orden pendiente debe terminar en `estado final`, `espera justificada` o `cola manual`, pero no quedar huerfana sin estrategia.
- `OBJ-004` Una caida de proveedor debe dejar evidencia util para decisiones automaticas y humanas.
- `OBJ-005` Toda transaccion debe poder explicarse desde UI operativa sin inspeccionar directamente la base de datos.

## 5. Restricciones derivadas por metodo

## 5.1 Tarjetas

- se puede evaluar retry tecnico bajo reglas estrictas
- se debe evitar doble autorizacion
- 3DS o autenticacion adicional reduce la elegibilidad de fallback silencioso

## 5.2 PSE

- requiere accion explicita del usuario
- el sistema no debe cambiar de proveedor silenciosamente una vez iniciado el redirect

## 5.3 Bre-B

- se debe modelar como metodo de consentimiento fuerte
- QR o llaves exigen trazabilidad y expiracion propia
- el fallback automatico solo es sensato antes de exponer el rail al usuario

## 5.4 Payouts

- la plataforma debe conocer el punto de no retorno operativo
- una orden ya tomada por el banco o por la red no debe reenviarse ciegamente

## 6. Backlog derivado de arquitectura

1. Disenar el esquema de datos de `payment_order`, `payment_attempt`, `provider_event`, `payout_batch` y `payout_item`.
2. Disenar la tabla de `provider_capability_matrix`.
3. Disenar el catalogo de `normalized_provider_errors`.
4. Disenar la politica interna de `idempotency key retention`.
5. Definir SLAs por metodo para deteccion de `stuck orders`.
6. Definir la taxonomia de roles operativos y de aprobacion.

## 7. Conclusion

La plataforma no necesita solo `soportar pagos`; necesita soportar:

- verdad asincrona
- fallas reales
- operacion humana
- trazabilidad defendible
- crecimiento multiproveedor sin deuda estructural

Ese es el nivel minimo para que este proyecto pueda verse serio en portafolio y, mas adelante, acercarse a un producto ofrecible.


