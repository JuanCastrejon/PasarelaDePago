---
name: backend-audit-pagos
description: "Auditoria de arquitectura backend y del payment core. Usar cuando se necesite verificar la calidad del dominio, adapters, route handlers, webhook inbox o contratos de integracion antes de extender el nucleo del proyecto. Incluye reglas de arquitectura, checklist por modulo y prompts reutilizables."
---

# Backend Audit - Payment Core

## Objetivo

Garantizar que el nucleo del proyecto evolucione con separacion clara entre:

- dominio
- contratos
- errores
- route handlers
- adapters de proveedor
- jobs asincronos

## Superficies a auditar

- `packages/payment-core/src/`
- `apps/web/src/app/api/`
- futuras capas de workflows, polling e inbox

## Procedimiento

1. revisar `references/module-checklist.md`
2. revisar `references/architecture-rules.md`
3. clasificar hallazgos por severidad
4. si se requiere refactor, usar `references/refactor-patterns.md`

## Prompts disponibles

- `prompts/audit-module.md`
- `prompts/migrate-to-clean.md`
