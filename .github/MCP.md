# Operacion Local de Herramientas y CLIs

## Objetivo

Documentar las herramientas locales que alimentan la operacion del repositorio.

## Herramientas disponibles

### GitHub

- CLI: `gh`
- uso principal:
  - crear PRs
  - revisar checks
  - consultar runs
  - crear issues

### Supabase

- CLI: `supabase`
- uso principal:
  - link de proyecto
  - migraciones
  - tipos TypeScript
  - estado de base de datos

### Vercel

- CLI: `vercel`
- uso principal:
  - deploy preview
  - deploy produccion
  - variables de entorno
  - logs

### Azure

- CLI: `az`
- estado:
  - autenticado por el propietario del proyecto
- uso previsto:
  - gobierno futuro
  - automatizacion de infraestructura si se requiere

### Azure DevOps

- CLI: `az devops`
- uso previsto:
  - backlog y gobierno en fase posterior

## Politica

- mientras el tracker principal siga en GitHub, `gh` es la herramienta primaria para PRs e issues
- `az devops` no se usa todavia como fuente de verdad del backlog
- cualquier automatizacion local sensible debe quedar documentada antes de compartirse
