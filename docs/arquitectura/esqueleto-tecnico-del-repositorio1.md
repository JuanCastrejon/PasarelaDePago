# Esqueleto Tecnico del Repositorio v1

Fecha de actualizacion: 2026-04-30

## 1. Objetivo

Materializar una estructura tecnica real del proyecto antes de entrar a la implementacion profunda de proveedores, para que el flujo multiagente y las skills externas trabajen sobre un stack visible y no sobre supuestos.

## 2. Estructura actual

```text
apps/
  web/
    src/app/
      api/
        health/
        payment-orders/
        webhooks/[provider]/
      operations/
packages/
  payment-core/
    src/
      contracts/
      domain/
      errors/
      orchestration/
      providers/
supabase/
tests/
  contract/
```

## 3. Responsabilidades por capa

### `apps/web`

- panel y superficies del producto
- placeholders operativos del backoffice
- route handlers que luego recibiran webhooks, ordenes y jobs de coordinacion

### `packages/payment-core`

- lenguaje del dominio
- contratos de `PaymentProviderAdapter` y `PayoutProviderAdapter`
- matriz de capacidades
- mapeo de estados crudos a estados canonicos
- politica inicial de retry

### `supabase`

- configuracion local del proyecto
- directorio objetivo de migraciones y seeds
- futura fuente de tipos generados

### `tests/contract`

- payloads de webhook
- fixtures de consultas por proveedor
- compatibilidad de adapters

## 4. Stack explicitado

- `Next.js 16`
- `React 19`
- `Tailwind CSS 4`
- `TypeScript 5`
- `Turborepo`
- `Supabase`
- `Vitest`
- `Playwright`
- `Zod`
- `workflow`

## 5. Beneficio operativo

Esta estructura mejora tres cosas a la vez:

1. La lectura del repo por reclutadores o clientes.
2. La deteccion de stack por `autoskills`.
3. La separacion futura entre UI, dominio, persistencia y orquestacion.

## 6. Decision de alcance

Todavia no se congela una arquitectura final de microservicios o de modulos de runtime. Este esqueleto prioriza:

- visibilidad del stack
- claridad del dominio
- integracion futura con Vercel y Supabase
- compatibilidad con trabajo multiagente
