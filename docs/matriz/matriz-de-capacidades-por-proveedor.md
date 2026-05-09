---
status: active
updated: 2026-05-09
supersedes:
  - docs/matriz/matriz-de-capacidades-por-proveedor1.md
---

# Matriz de Capacidades por Proveedor v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Consolidar en una sola vista lo que hoy esta confirmado, lo que esta parcialmente auditado y lo que aun no debe asumirse para cada proveedor relevante del proyecto.

## 2. Politica de lectura

- `Si`: capacidad confirmada por documentacion oficial revisada.
- `Parcial`: existe evidencia o documentacion general, pero falta auditoria profunda o condiciones comerciales.
- `No confirmado`: no se encontro evidencia oficial suficiente en la investigacion actual.

## 3. Matriz resumida

| Proveedor | Cobros locales | PSE | Bre-B | Webhooks / notificaciones | Consulta de estado | Payouts | Split / marketplace | Recurrentes / tokenizacion | Reportes / conciliacion | Rol recomendado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Wompi` | Si | Si | No confirmado | Si | Si | Si | Parcial | Si | Parcial | Primario local |
| `PayU` | Si | Si | Si | Si | Si | Si | Parcial | Parcial | Si | Respaldo fuerte / Bre-B |
| `ePayco` | Si | Si | No confirmado | Si | Si | Parcial | Si | Si | Si | Cobertura amplia / split |
| `Payvalida` | Si | Si | No confirmado | Si | Si | Parcial | Parcial | Parcial | Si | Recaudo alterno / benchmark |
| `AvalPay Center` | Si | Si | No confirmado | No auditado publicamente | No auditado publicamente | No auditado publicamente | No auditado publicamente | No auditado publicamente | Si | Benchmark bancario UX/portal |
| `Mercado Pago` | Si | Parcial foco CO | No confirmado | Si | Si | Parcial | Parcial | Si | Parcial | Expansion / benchmark regional |

## 4. Hallazgos por proveedor

## 4.1 Wompi

### Confirmado

- tarjetas
- `PSE`
- `Nequi`
- boton o QR `Bancolombia`
- `Daviplata`
- `payment sources`
- eventos por webhook
- consulta de transacciones
- `Pagos a terceros`

### No asumir todavia

- `Bre-B` como metodo oficialmente publicado
- split marketplace profundo con el mismo nivel de auditoria que `ePayco`

### Riesgos y notas

- la redireccion no valida el pago; el webhook manda
- una transaccion nace en `PENDING`
- la estrategia de settlement depende del modelo `Gateway` o `Agregador`

## 4.2 PayU

### Confirmado

- tarjetas
- `PSE`
- `QR Bre-B`
- `Nequi`
- `Boton Bancolombia`
- medios en efectivo o referenciados
- `Confirmation URL`
- `Queries API`
- `Payouts`
- estructura fuerte de reportes y extractos

### No asumir todavia

- recurrentes clasicos como capacidad moderna de primera linea; la documentacion remite mas a tokenizacion

### Riesgos y notas

- `PSE` inicia en `PENDING`
- la `Confirmation URL` solo reporta estados finales
- recomienda consulta posterior para `PENDING`

## 4.3 ePayco

### Confirmado

- checkout
- `PSE`
- tarjetas
- cash
- `Daviplata`
- customers
- tokenizacion
- planes y suscripciones
- split payments
- `response` + `confirmation`
- validacion por firma

### No asumir todavia

- `Bre-B` oficialmente expuesto
- payouts con el mismo nivel de detalle auditado que sus cobros

### Riesgos y notas

- la pagina de respuesta no es fuente de verdad
- para `PSE` puede haber estados `Pendiente`, `Fallida`, `Abandonada`, `Cancelada`

## 4.4 Payvalida

### Confirmado

- API de recaudo
- checkout
- `PSE`
- notificaciones al comercio
- consulta de orden
- `CUS` accesible en orden aprobada PSE bajo consulta adicional
- conciliacion por consulta y documentacion de soporte

### Parcial

- cashout o desembolsos a nivel de catalogo general
- capacidades ampliadas de payin digital asincrono

### Riesgos y notas

- maneja `orden de recaudo` y `transaccion PSE` como capas distintas
- no permite nueva transaccion PSE con la misma referencia mientras siga `PENDIENTE`

## 4.5 AvalPay Center

### Confirmado

- portal de recaudo
- `PSE`
- botones de bancos Aval
- tarjetas
- consulta de transacciones
- exportables y reportes
- informacion en tiempo real de recaudo

### No auditado profundamente en backend

- webhook tecnico
- API publica para integracion moderna
- payouts
- tokenizacion o recurrentes

### Riesgos y notas

- es una referencia fuerte de flujo bancario y experiencia real de recaudo
- sirve como benchmark de UX y backoffice bancario, no como primer adapter objetivo

## 4.6 Mercado Pago

### Confirmado

- SDK oficial
- webhooks
- checkout redirect
- refunds
- base regional amplia

### No asumir para foco inicial Colombia

- cobertura local colombiana comparable a `Wompi` o `PayU`
- `Bre-B`

### Riesgos y notas

- su mayor valor inmediato es como benchmark tecnico y camino de expansion

## 5. Matriz de madurez para el proyecto

| Proveedor | Nivel de madurez para Fase 1 | Justificacion |
| --- | --- | --- |
| `Wompi` | Alto | Mejor combinacion de metodos locales, webhook, consulta y payouts iniciales |
| `PayU` | Alto | Mejor evidencia publica para `Bre-B`, estructura enterprise y reportes fuertes |
| `ePayco` | Medio-Alto | Excelente cobertura y split, pero requiere cuidado en taxonomia de estados |
| `Payvalida` | Medio | Valioso para recaudo y PSE, aun no es prioridad como primer adapter |
| `AvalPay Center` | Medio | Muy util como benchmark bancario, pero no como primer objetivo de integracion |
| `Mercado Pago` | Medio | Muy bueno como patron tecnico, no como foco colombiano inicial |

## 6. Decision de priorizacion

### Fase 1

- `Wompi`
- `PayU`

### Fase 2

- `ePayco`
- `Payvalida`

### Fase 3

- `AvalPay Center` como benchmark adicional
- `Mercado Pago` para expansion o comparativa regional

## 7. Campos recomendados para versionar esta matriz en datos

- `provider_code`
- `country_code`
- `environment`
- `method_family`
- `direction` (`payin` / `payout`)
- `supports_redirect`
- `supports_webhook`
- `supports_polling`
- `supports_refund`
- `supports_split`
- `supports_recurring`
- `supports_qr`
- `supports_alias`
- `supports_silent_retry`
- `evidence_level`
- `last_verified_at`
- `source_url`

## 8. Conclusion

La matriz deja claro que el proyecto no debe tratar a los proveedores como si fueran intercambiables. Cada uno aporta algo distinto:

- `Wompi`: fortaleza local y primera capa de ejecucion
- `PayU`: respaldo enterprise y mejor ancla para `Bre-B`
- `ePayco`: cobertura amplia y split
- `Payvalida`: recaudo alterno y patron asincrono util
- `AvalPay Center`: benchmark bancario
- `Mercado Pago`: benchmark regional

