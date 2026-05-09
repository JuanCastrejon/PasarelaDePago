---
status: active
updated: 2026-05-09
---

# Adopcion de OpenSpec y SDD en PasarelaDePago

## Proposito

Este documento define como `PasarelaDePago` incorpora OpenSpec sin romper el
corpus de investigacion ya consolidado en `docs/`.

La regla base es simple:

- `docs/` conserva evidencia, investigacion, requisitos, backlog y ADRs
- `openspec/specs/` concentra capacidades canonicas vigentes
- `openspec/changes/` ordena los cambios nuevos antes de tocar codigo

## Perfil activo del repositorio

El perfil por defecto del repo es `analysis-first-sdd`.

Se usa porque el proyecto ya tiene suficiente investigacion como para
formalizar cambios, pero todavia necesita que `research` sea obligatorio antes
de proponer, especificar o implementar.

Tambien se conserva `legacy-brownfield-sdd` como overlay reusable para futuros
proyectos de migracion o para cambios que dependan de paridad con un sistema
previo.

## Jerarquia de verdad

1. `openspec/specs/` para capacidades canonicas ya estabilizadas
2. `docs/adr/`, `docs/dominio/`, `docs/requisitos/`, `docs/backlog/`
3. `docs/investigacion/` y `docs/matriz/` como evidencia de soporte
4. `GitHub Issues` como tracker operativo enlazado al flujo documental

## Flujo recomendado

```text
/enrich-us -> [validation] -> /opsx:ff | /opsx:propose -> /opsx:apply -> /opsx:verify -> /opsx:archive -> /commit
```

### Analisis

1. Tomar un `GitHub Issue` o una idea textual.
2. Ejecutar `enrich-us` para producir el bloque `## [enhanced]`.
3. Registrar reglas nuevas en `docs/domain/reglas-negocio-catalogo.md`.
4. Solicitar bloque humano `## [validation]`.

### Especificacion

5. Crear o actualizar un change en `openspec/changes/`.
6. Completar `research`, `proposal`, `specs`, `design` y `tasks` segun el nivel de ceremonia.

### Ejecucion

7. Implementar por slices pequenos.
8. Ejecutar `validate:*`, pruebas y `validate:openspec`.
9. Archivar el change cuando la capacidad quede canonizada.

## CLI y scripts

Este repositorio no asume instalacion global de OpenSpec.

La forma operativa estandar es via `npx`:

- `npx @fission-ai/openspec@latest validate --all`
- `npx @fission-ai/openspec@latest show <item>`
- `npx @fission-ai/openspec@latest archive <change>`

Y desde `package.json`:

- `npm run validate:openspec`
- `npm run validate:enhanced-research -- <change-name>`

## Reglas de uso

1. No empezar codigo de producto nuevo si la capacidad no existe y no hay change abierto.
2. No usar OpenSpec para reemplazar `docs/`; usarlo para comprimir y canonizar.
3. Mantener artefactos en espanol y nombres de capacidad en kebab-case ingles.
4. Si una historia cambia comportamiento observable, debe quedar trazada en spec o change.
