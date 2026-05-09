---
status: active
updated: 2026-05-09
supersedes:
  - docs/adr/adr-0003-adapters-de-proveedor-y-routing-desacoplado1.md
---

# ADR-0003 - Adapters de proveedor y routing desacoplado

Fecha: 2026-04-29
Estado: aceptado

## Contexto

Cada proveedor usa:

- payloads distintos
- nombres de estados distintos
- reglas distintas de retry
- capacidades distintas por metodo

Ademas, `routing` y `provider integration` resuelven problemas diferentes.

## Decision

El producto separara:

- `provider adapters`
- `routing/orchestration engine`

Los adapters traducen y validan integraciones. El routing decide a quien enviar una operacion segun capacidades, reglas y salud operativa.

## Consecuencias

### Positivas

- menor acoplamiento a un proveedor
- mejor soporte a multiproveedor
- posibilidad de agregar nuevos proveedores sin reescribir el dominio

### Costos

- mayor inversion inicial en contratos y capas
- mas disciplina de mapeo y testing

## Implicaciones directas

- debe existir contrato formal de adapter
- la matriz de capacidades no puede vivir embebida dentro del codigo del dominio
- el motor de routing necesita clasificacion de errores y reglas por metodo

## Documentos relacionados

- [matriz-de-capacidades-por-proveedor.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/matriz/matriz-de-capacidades-por-proveedor.md)
- [orquestacion-failover-y-bre-b.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/arquitectura/orquestacion-failover-y-bre-b.md)


