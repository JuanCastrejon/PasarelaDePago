# Instrucciones del Proyecto — PasarelaDePago

## Idioma

- documentacion, issues, PRs, comentarios y commits: siempre en espanol
- identificadores de codigo: en ingles
- nombres de tablas y columnas: `snake_case` en ingles o lenguaje tecnico estable

## Naturaleza del proyecto

`PasarelaDePago` es una plataforma de `payment orchestration` para Colombia. No es una simple integracion de checkout; es una base reutilizable de:

- cobros multiproveedor
- ruteo y resiliencia
- `PSE` y `Bre-B` como rieles de primera clase
- payouts y beneficiarios
- conciliacion, soporte y backoffice

## Stack actual

| Capa | Estado actual |
|------|---------------|
| Dominio base | TypeScript estricto |
| Documentacion | Markdown versionado |
| CI | GitHub Actions |
| Deploy objetivo | Vercel |
| Base de datos objetivo | Supabase Postgres |
| Gobierno futuro | Azure DevOps |

## Regla de arquitectura

1. `payment_order` y `payment_attempt` son entidades distintas.
2. `response URL` no es verdad final.
3. `webhook + polling + consulta` forman la verdad asincrona.
4. `fallback` y `retry` no son lo mismo.
5. `PSE` y `Bre-B` requieren consentimiento fuerte del usuario.

## Reglas de flujo de trabajo

- ramas base:
  - `main` = rama estable / portafolio publico
  - `develop` = integracion
- ramas de trabajo:
  - `feature/<accion-kebab-case>`
  - `fix/<accion-kebab-case>`
  - `docs/<accion-kebab-case>`
- toda rama de trabajo nace desde `develop`
- merge a `develop` solo por PR
- merge de `develop` a `main` solo por PR
- no se hace push directo a `main` ni `develop`

## Commits

- usar `Conventional Commits` en espanol
- cada commit debe ser atomico y enfocado
- antes de commitear:
  - revisar `git status`
  - revisar `git diff --staged`
  - confirmar que no haya evidencia privada, secretos o artefactos temporales

## Validaciones minimas

Mientras el proyecto madura, los gates minimos son:

- `npm run typecheck`
- `npm run build`

Cuando existan nuevas capas, se agregan:

- tests unitarios
- tests de integracion
- smoke tests de webhooks
- validacion de preview/deploy

## Documentacion viva

Cada cambio relevante debe mantener sincronizados:

- `README.md`
- `docs/indice-maestro1.md`
- documentos de dominio, requisitos o backlog que correspondan
- skills internas si cambian flujo o criterios

## Higiene del repositorio

- no versionar `node_modules`, `dist`, caches ni secretos
- no versionar evidencia real con PII o datos bancarios
- no versionar copias locales de referencia que no sean parte del producto

## Uso de skills

1. cargar `contexto-proyecto`
2. cargar la skill especifica de la tarea
3. si una skill externa contradice una regla interna, prevalece `.github/`
