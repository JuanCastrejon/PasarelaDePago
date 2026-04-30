---
description: "Usar cuando se creen o revisen pruebas, calidad o criterios de validacion en el monorepo. Incluye unit, contract, e2e y gates minimos del repo."
---

# Testing y Calidad

## Estrategia

- `Vitest` para dominio puro y utilidades
- `tests/contract/` para adapters, payloads y estados de proveedor
- `Playwright` para validar paneles, operaciones y checkout shell

## Reglas

- no escribir pruebas decorativas
- una prueba debe proteger una regla de dominio, un contrato o un flujo de negocio
- en webhooks y rieles asincronos, priorizar contract tests y fixtures reproducibles
- cuando exista regression risk, agregar prueba en la misma rama
