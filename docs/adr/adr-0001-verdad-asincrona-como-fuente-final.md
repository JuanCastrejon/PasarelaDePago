---
status: active
updated: 2026-05-09
supersedes:
  - docs/adr/adr-0001-verdad-asincrona-como-fuente-final1.md
---

# ADR-0001 - Verdad asincrona como fuente final

Fecha: 2026-04-29
Estado: aceptado

## Contexto

La investigacion sobre `PSE`, `Wompi`, `PayU`, `ePayco`, `Payvalida` y los flujos reales observados demostro que la pagina de retorno del navegador no representa de forma confiable la verdad final de una transaccion.

## Decision

El sistema adoptara como principio que la verdad final de pagos y payouts debe venir de fuentes asincronas verificables:

- webhook
- consulta backend
- reporte del proveedor
- evidencia financiera o conciliacion

La `response URL` o retorno al comercio se tratara solo como artefacto de experiencia de usuario.

## Consecuencias

### Positivas

- reduce riesgo de marcar pagos falsamente aprobados
- mejora trazabilidad y conciliacion
- alinea el producto con la realidad de `PSE` y PSPs colombianos

### Costos

- obliga a implementar polling, webhooks e idempotencia
- aumenta complejidad de UX para estados `PENDING`

## Implicaciones directas

- el frontend no puede aprobar pedidos por si solo
- debe existir inbox de webhooks
- debe existir consulta de respaldo para estados pendientes

## Documentos relacionados

- [pendiente-fallida-reintentos-polling-webhooks-y-retorno.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/investigacion/pendiente-fallida-reintentos-polling-webhooks-y-retorno.md)
- [pse-como-rail-principal-y-handoff-bancario.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/investigacion/pse-como-rail-principal-y-handoff-bancario.md)




