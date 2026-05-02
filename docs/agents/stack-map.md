# Stack Map

## Superficies tecnicas actuales

- `apps/web`: `Next.js`, `React`, `Tailwind CSS`, `Zod`, route handlers
- `packages/payment-core`: `TypeScript` estricto para dominio, contratos y orquestacion
- `supabase/`: `Postgres` + configuracion local
- `tests/contract/`: `Vitest` y fixtures futuros

## Objetivo del mapa

Ayudar a skills externas y agentes a detectar rapidamente:

- donde vive la UI
- donde vive el dominio reusable
- donde se modela persistencia
- donde deberian caer pruebas y adapters

## Relacion con trazabilidad

La relacion entre estas superficies y el backlog/arquitectura queda fijada en:

- `docs/agents/matriz-de-trazabilidad-por-superficie1.md`
- `.github/agents/surface-traceability.json`
