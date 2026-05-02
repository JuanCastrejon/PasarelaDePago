# Instrucciones del Proyecto — PasarelaDePago

## Idioma

- documentacion, ADRs, backlog, issues, PRs, comentarios y commits: siempre en espanol
- identificadores de codigo: en ingles
- nombres de tablas, columnas, enums de base de datos y topics de eventos: `snake_case` en ingles o lenguaje tecnico estable

## Naturaleza del proyecto

`PasarelaDePago` es una plataforma de `payment orchestration` para Colombia. No es una simple integracion de checkout ni un clon de una pasarela existente. El repositorio debe comunicar:

- cobros multiproveedor
- ruteo, resiliencia y failover controlado
- `PSE` y `Bre-B` como rieles de primera clase
- payouts, beneficiarios y dispersiones
- conciliacion, soporte y backoffice operativo
- disciplina documental y de gobierno del proyecto

## Stack real del repositorio

| Capa | Implementacion actual |
|------|------------------------|
| Monorepo | `npm workspaces` + `Turborepo` |
| Web / panel | `Next.js` App Router en `apps/web` |
| Dominio core | `TypeScript` estricto en `packages/payment-core` |
| Base de datos objetivo | `Supabase Postgres` |
| Asincronia objetivo | `Vercel Workflow` + `Queues` + jobs de consulta |
| Testing habilitado para crecimiento | `Vitest` + `Playwright` |
| Documentacion | Markdown versionado en `docs/` |
| Gobierno | GitHub hoy + Azure DevOps como capa de boards/wiki/backlog |

## Mapa tecnico actual

```text
apps/
  web/              -> backoffice, checkout shell, route handlers y webhooks
packages/
  payment-core/     -> dominio, contratos de adapters, errores y orquestacion
supabase/           -> bootstrap local de esquema, migraciones y config
tests/contract/     -> pruebas de contrato futuras
.github/            -> reglas, skills, prompts, CI y hooks locales
.agents/workflows/  -> workflows operativos y multiagente
docs/               -> dominio, arquitectura, backlog, proceso e investigacion
```

## Principios arquitectonicos no negociables

1. `payment_order` y `payment_attempt` son entidades distintas.
2. `response URL` es experiencia de usuario; no es verdad final.
3. `webhook + polling + consulta server-to-server + reconciliacion` forman la verdad asincrona.
4. `fallback` y `retry` no son lo mismo.
5. `PSE` y `Bre-B` requieren consentimiento fuerte del usuario.
6. `approved`, `settled`, `transferred`, `reversed` y `disputed` son verdades separadas.
7. los proveedores viven detras de contratos internos estables.
8. la capa web nunca debe exponer secretos ni depender de logica del proveedor en cliente.

## Reglas de monorepo y modularidad

- `apps/web` concentra UI, route handlers y entry points de Vercel
- `packages/payment-core` concentra dominio puro, contratos y orquestacion reusable
- `supabase/` concentra config local, migraciones y seeds
- la documentacion siempre acompana al codigo; no se deja para el final
- cuando un cambio importante sea documental, crear una nueva version numerada del documento en `docs/` en lugar de destruir el historial semantico

## Reglas de flujo de trabajo

- ramas base:
  - `main` = rama estable / portafolio publico
  - `develop` = rama de integracion
- ramas de trabajo:
  - `feature/<accion-kebab-case>`
  - `fix/<accion-kebab-case>`
  - `docs/<accion-kebab-case>`
- toda rama de trabajo nace desde `develop`
- merge a `develop` solo por PR
- merge de `develop` a `main` solo por PR
- no hacer push directo a `main` ni `develop`

## Commits

- usar `Conventional Commits` en espanol
- cada commit debe ser atomico y enfocado en un solo objetivo
- cuando el cambio combina codigo y documentacion del mismo objetivo, preferir el mismo commit
- antes de commitear:
  - revisar `git status`
  - revisar `git diff --staged`
  - confirmar que no haya evidencia privada, secretos, caches ni artefactos temporales

## Validaciones minimas vigentes

Gates obligatorios hoy:

- `npm run typecheck`
- `npm run build`

Gates proyectados por activarse por slice:

- `npm run lint`
- `npm run test:unit`
- `npm run test:e2e`
- smoke tests de webhooks
- validacion de preview y despliegue

## Documentacion viva

Cada cambio relevante debe mantener sincronizados:

- `README.md`
- `docs/indice-maestro2.md` cuando exista una nueva navegacion fundacional
- documentos de dominio, arquitectura, backlog o proceso impactados
- `.github/AGENTS.md` si cambia el flujo operativo
- skills internas si cambian stack, criterios o workflow

## Higiene del repositorio

- no versionar `node_modules`, `.next`, `dist`, caches, logs ni secretos
- no versionar evidencia real con PII o datos bancarios
- no versionar copias locales de referencia que no sean parte del producto
- no dejar `.copilot/`, wrappers locales o configuracion personal fuera de `.gitignore`

## Uso de skills

1. cargar `contexto-proyecto`
2. cargar la skill especifica de la tarea
3. si una skill externa contradice una regla interna, prevalece `.github/`
4. si el cambio afecta arquitectura o flujo, sincronizar tambien la documentacion viva
