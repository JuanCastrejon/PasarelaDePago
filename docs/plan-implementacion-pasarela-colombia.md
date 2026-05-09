---
status: active
updated: 2026-05-09
supersedes:
  - docs/plan-implementacion-pasarela-colombia1.md
---

# Plan Maestro de Implementacion v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito de este documento

Este archivo no reemplaza el plan maestro base. Funciona como `corte incremental` de investigacion y decisiones, para respetar la regla de no sobrescribir los documentos ya existentes.

Documento base relacionado:

- [plan-implementacion-pasarela-colombia.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/plan-implementacion-pasarela-colombia.md)

## 2. Cambios relevantes de esta iteracion

### 2.1 Bre-B pasa a prioridad alta

La evidencia oficial del Banco de la Republica ya permite tratar `Bre-B` como infraestructura operativa real:

- el 18 de septiembre de 2025 el Banco de la Republica anunció que el `23 de septiembre` entraba en funcionamiento el mecanismo que permite la interoperabilidad plena del sistema
- el 6 de abril de 2026 el propio BanRep ya habla de `seis meses de operación`
- las FAQ oficiales indican que para pagar con Bre-B basta conocer la `llave` del receptor o `escanear el código QR`

Implicacion:

- Bre-B no puede quedar relegado a “fase futura difusa”
- el modelo de medios de pago del proyecto debe incluir `llaves`, `QR` y `pago inmediato interoperable`

### 2.2 Wompi y PayU se fortalecen por razones distintas

`Wompi`:

- sobresale en pagos locales
- tiene payouts con sandbox
- soporta múltiples cuentas origen
- soporta idempotencia
- maneja aprobación y rechazo en pagos a terceros

`PayU`:

- documenta `QR Bre-B` explícitamente en la API de pagos de Colombia
- tiene una oferta de payouts más madura para escenarios de terceros
- soporta webhook, estados detallados y validaciones de riesgo en payouts

Implicacion:

- la primera arquitectura multiproveedor debe modelar a `Wompi` y `PayU` como binomio principal

### 2.3 Azure DevOps se usará como sistema de gobierno, no como sustituto de investigación

La investigación debe terminar primero en artefactos claros y luego migrarse a:

- Azure Boards
- Azure Wiki
- Azure Repos / PR traceability
- dashboards y queries

Implicacion:

- por ahora seguimos creando documentación fuerte en el repo
- después sincronizamos esa estructura a Azure DevOps con una taxonomía limpia

## 3. Nuevos frentes de trabajo

### Frente A - Compliance y operación para terceros

Objetivo:

- entender qué cambia cuando la plataforma deja de ser “proyecto técnico” y empieza a prestar servicio a terceros

Archivo relacionado:

- [compliance-y-riesgo-para-terceros.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/investigacion/compliance-y-riesgo-para-terceros.md)

### Frente B - Resiliencia y operación multi-proveedor

Objetivo:

- modelar failover, retry, webhooks, estados y payouts con disciplina operativa

Archivo relacionado:

- [resiliencia-failover-y-operacion.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/investigacion/resiliencia-failover-y-operacion.md)

### Frente C - Gobierno futuro con Azure DevOps

Objetivo:

- preparar la forma profesional de capturar requisitos, backlog, documentación y trazabilidad

Archivo relacionado:

- [azure-devops-y-gobierno-del-proyecto.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/proceso/azure-devops-y-gobierno-del-proyecto.md)

## 4. Decisiones provisionales actualizadas

### Pagos

- `Wompi` primero para tarjetas, PSE, Nequi y flujos locales
- `PayU` segundo para Bre-B y respaldo estratégico
- `ePayco` tercero para cobertura, split y recurrentes

### Payouts

- `Wompi` primero para validación funcional rápida
- `PayU` segundo para escenarios más empresariales y de riesgo

### Trazabilidad

- toda orden debe terminar ligada a work items y PRs cuando pasemos a Azure DevOps

## 5. Siguiente backlog de investigación

1. Profundizar el flujo exacto de `Bre-B` por proveedor, incluyendo UX, estados, limitaciones y trazabilidad.
2. Investigar KYC/KYB, activación comercial y análisis de riesgo para operar pagos y payouts para terceros.
3. Diseñar la taxonomía de errores que habilita `retry`, `fallback` o `manual review`.
4. Definir el mapa de epics/features/stories que luego se migrará a Azure Boards.

## 6. Fuentes clave de esta iteracion

- Banco de la República - Bre-B:
  [banrep.gov.co/es/bre-b](https://www.banrep.gov.co/es/bre-b)
- Wompi Pagos a Terceros:
  [docs.wompi.co/docs/colombia/introduccion-pagos-a-terceros](https://docs.wompi.co/docs/colombia/introduccion-pagos-a-terceros/)
- PayU API de Pagos - Colombia:
  [developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-colombia.html](https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-colombia.html)
- PayU Payouts - Colombia:
  [developers.payulatam.com/latam/es/docs/services/payouts.html](https://developers.payulatam.com/latam/es/docs/services/payouts.html)
- Azure Boards y Azure Repos:
  [learn.microsoft.com/en-us/azure/devops](https://learn.microsoft.com/en-us/azure/devops/)




