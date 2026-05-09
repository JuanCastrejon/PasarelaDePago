---
status: active
updated: 2026-05-09
supersedes:
  - docs/agents/matriz-de-trazabilidad-por-superficie1.md
---

# Matriz de Trazabilidad por Superficie v1

Fecha de actualizacion: 2026-05-02

## 1. Objetivo

Relacionar superficies reales del monorepo con requisitos, historias, features, tasks tecnicas y ADRs para que la trazabilidad no viva solo en la slice activa.

## 2. Regla

Cada superficie tecnica importante debe poder responder dos preguntas:

1. que problema del producto o del proceso esta sirviendo
2. que artefactos del backlog o de la arquitectura la justifican

## 3. Fuente operativa

La version machine-readable de esta matriz vive en:

- `.github/agents/surface-traceability.json`

Esta pagina existe para facilitar lectura humana y revision de gobierno.

## 4. Superficies de `apps/web`

| Superficie | Owner | Trazabilidad principal |
|---|---|---|
| `src/app/page.tsx`, `layout.tsx`, `globals.css` | `Web Operaciones` | `US-020`, `F-1204`, `TT-001`, `ADR-0004` |
| `src/app/operations/` | `Web Operaciones` | `RFV2-056`, `RFV2-057`, `RFV2-060`, `US-006`, `US-011`, `F-1001`, `F-1002`, `F-1005`, `TT-031`, `TT-032`, `TT-035` |
| `src/app/api/payment-orders/` | `Web Operaciones` | `RFV2-011`, `US-001`, `F-301`, `TT-011`, `ADR-0002`, `ADR-0004` |
| `src/app/api/webhooks/` | `Web Operaciones` | `RFV2-026` a `RFV2-030`, `US-005`, `US-007`, `F-801` a `F-804`, `TT-016` a `TT-018`, `ADR-0001`, `ADR-0003` |
| `src/app/api/health/` | `Web Operaciones` | `US-020`, `F-1204`, `TT-035`, `ADR-0004` |

## 5. Superficies de `packages/payment-core`

| Superficie | Owner | Trazabilidad principal |
|---|---|---|
| `domain/payment-order.ts` | `Payment Core` | `RFV2-011`, `US-001`, `F-301`, `TT-003`, `ADR-0002` |
| `domain/payment-attempt.ts` | `Payment Core` | `RFV2-016`, `RFV2-018`, `RFV2-036`, `RFV2-040`, `US-002`, `US-008`, `F-302`, `F-603`, `F-604`, `TT-004`, `TT-019`, `ADR-0002`, `ADR-0003` |
| `domain/payment-status.ts` y `orchestration/provider-status-map.ts` | `Payment Core` | `RFV2-030`, `US-005`, `US-007`, `F-102`, `F-801`, `F-803`, `TT-002`, `TT-009`, `ADR-0001`, `ADR-0003` |
| `domain/provider.ts` y `domain/payment-method-family.ts` | `Payment Core` | `RFV2-022`, `RFV2-023`, `RFV2-024`, `US-004`, `US-016`, `F-304`, `F-401`, `F-501`, `TT-014`, `ADR-0003` |
| `contracts/payment-provider-adapter.ts` | `Payment Core` | `RFV2-017`, `RFV2-026`, `RFV2-029`, `US-005`, `US-007`, `F-701` a `F-704`, `TT-006`, `ADR-0003` |
| `contracts/payout-provider-adapter.ts` | `Payment Core` | `RFV2-042`, `RFV2-045`, `US-014`, `F-901` a `F-903`, `TT-007`, `ADR-0003` |
| `orchestration/retry-policy.ts` | `Payment Core` | `RFV2-019`, `RFV2-020`, `RFV2-036`, `RFV2-038`, `RFV2-039`, `RFV2-040`, `US-008`, `US-010`, `F-603`, `F-604`, `F-605`, `TT-019`, `ADR-0001`, `ADR-0003` |
| `providers/capability-matrix.ts` | `Payment Core` | `RFV2-006` a `RFV2-010`, `US-009`, `F-204`, `F-304`, `F-601`, `TT-008`, `ADR-0003` |
| `errors/provider-error.ts` | `Payment Core` | `RFV2-038`, `US-008`, `F-605`, `TT-009`, `ADR-0003` |
| `index.ts` | `Payment Core` | `US-020`, `F-1204`, `TT-001`, `ADR-0004` |

## 6. Superficies de `supabase`

| Superficie | Owner | Trazabilidad principal |
|---|---|---|
| `migrations/` y `seed.sql` | `Integraciones y Datos` | `RFV2-011`, `RFV2-016`, `RFV2-032`, `US-001`, `US-002`, `US-007`, `F-301`, `F-302`, `F-801`, `TT-003` a `TT-005`, `TT-016`, `TT-017`, `ADR-0002`, `ADR-0004` |

## 7. Superficies de pruebas

| Superficie | Owner | Trazabilidad principal |
|---|---|---|
| `tests/contract` | `QA Security Review` | `RFV2-027` a `RFV2-030`, `US-005`, `US-007`, `F-701` a `F-704`, `F-801` a `F-804`, `TT-006`, `TT-007`, `TT-016` a `TT-018`, `ADR-0001`, `ADR-0003` |

## 8. Uso recomendado

Esta matriz sirve para:

- justificar por que existe una superficie
- detectar huecos de backlog sobre el monorepo
- revisar drift entre codigo, backlog y arquitectura
- ayudar a que un agente no edite una zona sin entender que requisitos toca

## 9. Validacion

La cobertura estructural de esta matriz se valida con:

- `npm run validate:surface-traceability`

