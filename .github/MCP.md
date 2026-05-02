# Operacion Local de Herramientas y CLIs

## Objetivo

Documentar el plano operativo local del repositorio, incluso cuando no existan MCP servers dedicados versionados dentro del proyecto.

## Herramientas disponibles

### GitHub

- CLI: `gh`
- uso principal:
  - crear y revisar PRs
  - consultar checks y runs
  - crear issues
  - configurar protecciones y settings del repo

### Supabase

- CLI: `supabase`
- uso principal:
  - `supabase init`
  - `supabase link --project-ref <ref>`
  - migraciones, seeds y generacion de tipos
  - estado y utilidades locales

### Vercel

- CLI: `vercel`
- uso principal:
  - deploy preview
  - deploy produccion
  - variables de entorno
  - linkage y logs del proyecto

### Azure

- CLI: `az`
- estado:
  - autenticado por el propietario del proyecto
- uso previsto:
  - tokens de Entra ID
  - automatizacion complementaria
  - descubrimiento y soporte a Azure DevOps

### Azure DevOps

- extension CLI: `az devops`
- uso previsto:
  - bootstrap de proyecto
  - boards, wiki, repos, areas e iterations
  - gobierno y backlog a nivel organizacional

## Notas operativas

- si se versionan wrappers locales en el futuro, deben vivir bajo `.github/hooks/` o una carpeta documentada y sin secretos embebidos
- el repo puede convivir con configuraciones personales como `.vscode/mcp.json`, pero esas rutas quedan fuera de git
- cualquier automatizacion local sensible debe quedar documentada antes de compartirse

## Politica actual

- mientras GitHub siga siendo el tracker activo, `gh` es la herramienta primaria para PRs e issues
- Azure DevOps ya puede usarse como capa de gobierno, pero no reemplaza el valor documental del repo
- las decisiones operativas deben reflejarse en `.github/skills/operacion-cli-devops/` y en `docs/proceso/`
