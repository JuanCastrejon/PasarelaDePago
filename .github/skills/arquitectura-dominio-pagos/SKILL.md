---
name: arquitectura-dominio-pagos
description: "Aplica reglas del dominio de pagos asincronos, estados canonicos, retry, fallback, PSE y Bre-B en PasarelaDePago. Usar cuando se disenen modelos, adapters, webhooks, polling o politicas operativas."
---

# Arquitectura y Dominio de Pagos

## Regla de oro

La verdad final es asincrona y debe modelarse con estados canonicos propios.

## Leer antes de actuar

- `docs/dominio/modelo-de-dominio-canonico.md`
- `docs/matriz/matriz-canonica-de-estados-por-proveedor.md`
- `docs/arquitectura/orquestacion-failover-y-bre-b.md`
- `docs/investigacion/pendiente-fallida-reintentos-polling-webhooks-y-retorno.md`

## Recordatorios

- no mezclar `payment_order` con `payment_attempt`
- no usar `response URL` como verdad final
- no hacer `silent retry` despues del handoff bancario
- distinguir `approved`, `settled`, `transferred` y `reversed`

