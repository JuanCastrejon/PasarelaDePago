# PasarelaDePago

`PasarelaDePago` es una plataforma personal de `payment orchestration` para Colombia. El proyecto se enfoca en cobros multiproveedor, rieles bancarios como `PSE` y `Bre-B`, payouts, resiliencia operativa, conciliacion y backoffice.

## Estado actual

La base fundacional del proyecto ya esta creada en tres capas:

- `documentacion`: investigacion, dominio, requisitos, backlog y ADRs
- `gobierno`: `.github/`, skills internas, hooks locales, workflows y versionado
- `codigo`: monorepo con `apps/web`, `packages/payment-core`, `supabase/` y `tests/contract`

## Navegacion recomendada

- [Indice maestro de documentacion](/C:/Users/juand/source/repos/PasarelaDePago/docs/indice-maestro2.md)
- [Glosario del dominio](/C:/Users/juand/source/repos/PasarelaDePago/docs/dominio/glosario-del-dominio1.md)
- [Vision y alcance](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/vision-y-alcance-del-producto1.md)
- [Modelo de dominio canonico](/C:/Users/juand/source/repos/PasarelaDePago/docs/dominio/modelo-de-dominio-canonico1.md)
- [Matriz de capacidades por proveedor](/C:/Users/juand/source/repos/PasarelaDePago/docs/matriz/matriz-de-capacidades-por-proveedor1.md)
- [Matriz canonica de estados por proveedor](/C:/Users/juand/source/repos/PasarelaDePago/docs/matriz/matriz-canonica-de-estados-por-proveedor1.md)
- [Esqueleto tecnico del repositorio](/C:/Users/juand/source/repos/PasarelaDePago/docs/arquitectura/esqueleto-tecnico-del-repositorio1.md)
- [Sistema de trabajo multiagente](/C:/Users/juand/source/repos/PasarelaDePago/docs/proceso/sistema-de-trabajo-multiagente2.md)
- [Gobernanza de skills y fuentes](/C:/Users/juand/source/repos/PasarelaDePago/docs/proceso/gobernanza-de-skills-y-fuentes2.md)
- [Roadmap por fases](/C:/Users/juand/source/repos/PasarelaDePago/docs/backlog/roadmap-por-fases1.md)

## Esqueleto tecnico actual

La primera base de implementacion ya vive como monorepo ligero:

- `apps/web`: Next.js App Router para panel, overview operativo y route handlers
- `packages/payment-core`: tipos de dominio, contratos de adapters, taxonomia de estados y politica inicial de retry/fallback
- `supabase/`: bootstrap local del esquema
- `tests/contract/`: base reservada para adapters y payloads de proveedor

## Flujo operativo del repo

El repositorio ya incluye una capa interna de operacion en:

- `.github/` para instrucciones, skills, prompts, versionado, PR template y CI
- `.agents/workflows/` para gitflow, multiagente, skills externas y QA
- `docs/agents/` para tracker, labels, layout del dominio y mapa de stack

## Comandos

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Nota sobre evidencia real

Los PDFs descargados desde correos y otros artefactos con datos personales reales se mantienen solo como evidencia local y estan excluidos del primer commit publico.
