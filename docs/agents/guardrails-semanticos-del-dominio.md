---
status: active
updated: 2026-05-09
supersedes:
  - docs/agents/guardrails-semanticos-del-dominio1.md
---

# Guardrails Semanticos del Dominio v1

Fecha de actualizacion: 2026-05-02

## 1. Objetivo

Fijar reglas semanticas no negociables del dominio de pagos y de la arquitectura para que el repo no solo tenga trazabilidad, sino tambien protecciones automaticas contra regresiones conceptuales.

## 2. Fuente operativa

La version machine-readable vive en:

- `.github/agents/semantic-guardrails.json`

La validacion automatica vive en:

- `scripts/validate-semantic-guardrails.mjs`

## 3. Guardrails activos

### 3.1 La verdad final es asincrona

- `response URL` no puede tratarse como verdad final
- debe existir evidencia de `webhook` y consulta backend
- el contrato del adapter debe exponer consulta y normalizacion de webhook

Referencias:

- `ADR-0001`
- `.github/copilot-instructions.md`
- `.github/instructions/pagos-arquitectura.instructions.md`

### 3.2 `payment_order` y `payment_attempt` son entidades separadas

- `payment_order` representa la intencion de negocio
- `payment_attempt` representa la ejecucion tecnica
- el intento debe conservar `providerCode`, `methodFamily`, `attemptNumber` y `origin`
- la orden no debe absorber esos campos tecnicos

Referencias:

- `ADR-0002`
- `packages/payment-core/src/domain/payment-order.ts`
- `packages/payment-core/src/domain/payment-attempt.ts`

### 3.3 No almacenar `PAN` ni `CVV`

- el codigo de producto y la persistencia no deben introducir campos o artefactos de tarjeta sensibles
- la restriccion aplica a `apps/`, `packages/`, `supabase/` y pruebas versionadas

Referencias:

- `CONTEXT.md`
- `RNFV2-001`

### 3.4 No `silent retry` despues de handoff o consentimiento fuerte

- `PSE` y `Bre-B` deben tratarse como metodos de consentimiento fuerte
- si el usuario ya fue redirigido o existe referencia remota confiable, el flujo debe pasar a `USER_GUIDED_RETRY`
- la matriz de capacidades debe mantener `supportsSilentRetry = false` para esos metodos

Referencias:

- `.github/instructions/pagos-arquitectura.instructions.md`
- `packages/payment-core/src/orchestration/retry-policy.ts`
- `packages/payment-core/src/providers/capability-matrix.ts`

### 3.5 Adapters y routing desacoplados

- debe existir contrato formal de adapter
- la matriz de capacidades no debe colapsarse dentro del modelo de dominio
- el routing y el mapping de estados deben mantenerse como piezas separadas

Referencias:

- `ADR-0003`
- `payment-provider-adapter.ts`
- `capability-matrix.ts`
- `retry-policy.ts`
- `provider-status-map.ts`

## 4. Alcance

Estos guardrails no reemplazan:

- pruebas unitarias
- pruebas de contrato
- revision humana
- validacion funcional real

Su objetivo es detener regresiones conceptuales obvias y costosas.

## 5. Validacion

Ejecutar:

- `npm run validate:semantic-guardrails`

