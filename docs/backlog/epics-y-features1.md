# Epics y Features v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Traducir la investigacion y los requisitos consolidados a una estructura de backlog lista para migrarse despues a Azure Boards.

## 2. Estructura propuesta

## Epic 1 - Domain Foundations

Objetivo:

- fijar el lenguaje, estados y modelo comun del producto

Features:

- `F-101` Glosario del dominio
- `F-102` Taxonomia canonica de estados
- `F-103` Modelo de dominio canonico
- `F-104` Catalogo de referencias e identificadores

## Epic 2 - Merchant Platform

Objetivo:

- habilitar comercios, cuentas de proveedor y capacidades configurables

Features:

- `F-201` Registro de comercios
- `F-202` Gestion de roles y permisos
- `F-203` Cuentas de proveedor por comercio
- `F-204` Matriz de capacidades por comercio

## Epic 3 - Pay-in Core

Objetivo:

- soportar ordenes, intentos y sesiones de cobro

Features:

- `F-301` Payment orders
- `F-302` Payment attempts
- `F-303` Checkout sessions
- `F-304` Catalogo de metodos de pago

## Epic 4 - PSE and Bank Rails

Objetivo:

- construir correctamente el flujo bancario principal del producto

Features:

- `F-401` Flujo `PSE`
- `F-402` Captura de entidad financiera
- `F-403` Correlacion por `CUS`
- `F-404` Artefactos visibles post-pago

## Epic 5 - Bre-B and Immediate Transfers

Objetivo:

- incorporar pagos inmediatos interoperables como capacidad de primera clase

Features:

- `F-501` Modelado `Bre-B`
- `F-502` QR estatico o dinamico
- `F-503` Alias o llave
- `F-504` Politicas de expiracion y confirmacion

## Epic 6 - Routing and Resilience

Objetivo:

- orquestar proveedores con reglas explicables y seguras

Features:

- `F-601` Routing engine
- `F-602` Health y disponibilidad por proveedor
- `F-603` Fallback controlado
- `F-604` Smart retry
- `F-605` Clasificacion de errores

## Epic 7 - Provider Integrations

Objetivo:

- integrar los proveedores priorizados mediante adapters

Features:

- `F-701` Adapter `Wompi`
- `F-702` Adapter `PayU`
- `F-703` Adapter `ePayco`
- `F-704` Adapter `Payvalida`

## Epic 8 - Webhooks and State Sync

Objetivo:

- consolidar la verdad asincrona del sistema

Features:

- `F-801` Inbox de webhooks
- `F-802` Verificacion de firmas y checksums
- `F-803` Normalizacion de eventos
- `F-804` Polling de respaldo

## Epic 9 - Payouts

Objetivo:

- ejecutar dispersiones trazables a beneficiarios

Features:

- `F-901` Beneficiarios
- `F-902` Payout individual
- `F-903` Payout batch
- `F-904` Aprobacion dual

## Epic 10 - Operations and Reconciliation

Objetivo:

- ofrecer backoffice, reporting y soporte operativo serio

Features:

- `F-1001` Timeline operativa
- `F-1002` Busqueda por referencias
- `F-1003` Conciliacion
- `F-1004` Excepciones y resolucion
- `F-1005` Reportes operativos

## Epic 11 - Security and Governance

Objetivo:

- asegurar que el sistema sea defendible en seguridad y auditoria

Features:

- `F-1101` Auditoria de cambios sensibles
- `F-1102` Gestion de secretos
- `F-1103` Segregacion de roles
- `F-1104` Evidencia de onboarding y compliance

## Epic 12 - Portfolio Readiness

Objetivo:

- asegurar que el proyecto comunique bien su valor como portafolio y base comercial

Features:

- `F-1201` Documentacion navegable
- `F-1202` ADRs base
- `F-1203` Skills propias del proyecto
- `F-1204` Demo operativa y arquitectura visible

## 3. Priorizacion inicial

### P0

- Epic 1
- Epic 2
- Epic 3
- Epic 4
- Epic 6
- Epic 8

### P1

- Epic 7
- Epic 10
- Epic 11

### P2

- Epic 5
- Epic 9
- Epic 12

## 4. Conclusion

Esta estructura ya es suficientemente clara para convertirse despues en `Epics` y `Features` de Azure Boards sin perder la semantica del dominio.
