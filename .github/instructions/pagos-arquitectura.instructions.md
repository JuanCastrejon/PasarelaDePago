---
description: "Reglas de arquitectura para pagos asincronos, PSE, Bre-B, webhooks, polling y conciliacion. Usar cuando: se tomen decisiones de arquitectura o integracion de proveedores."
---

# Arquitectura de Pagos

## Reglas base

1. la verdad final es asincrona
2. `response URL` es UX, no settlement
3. `PSE` y `Bre-B` no permiten retry silencioso despues del handoff
4. `retry` siempre implica nuevo intento
5. `approved` no equivale a `settled`

## Capas

- dominio
- routing
- adapters
- inbox de webhooks
- polling
- conciliacion
- backoffice

## Verificacion previa a cambios

- leer `docs/arquitectura/orquestacion-failover-y-bre-b.md`
- leer `docs/matriz/matriz-canonica-de-estados-por-proveedor1.md`
- leer `docs/dominio/modelo-de-dominio-canonico1.md`
