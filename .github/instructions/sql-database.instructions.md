---
description: "Usar cuando se trabaje con SQL, migraciones o configuracion de Supabase/Postgres para PasarelaDePago. Incluye convenciones de naming, auditoria, idempotencia y encoding en Windows."
applyTo: "supabase/**/*"
---

# Convenciones SQL y Supabase

## Nombres

- tablas y columnas: `snake_case` en ingles
- PK: `id uuid default gen_random_uuid()`
- FK: `<entidad>_id`
- timestamps: `created_at timestamptz default now()`, `updated_at timestamptz default now()`

## Reglas del dominio de pagos

- modelar `payment_order`, `payment_attempt`, `payment_reference` y `provider_event` como verdades separadas
- guardar idempotency keys, referencias externas y eventos crudos con trazabilidad
- nunca usar una sola tabla generica para mezclar cobros, payouts, webhooks y conciliacion
- disenar pensando en timeline operativa y auditoria posterior

## Seguridad y gobierno

- toda tabla sensible debe evaluar RLS antes de exponerse
- minimizar PII; no guardar PAN ni CVV
- auditar payloads crudos con retencion y acceso controlado

## Encoding UTF-8 en Windows

- todo script SQL con texto en espanol debe ejecutarse con UTF-8
- si se usa `psql` en Windows, forzar `SET client_encoding TO 'UTF8';` cuando aplique
- evitar seeds con caracteres corruptos
