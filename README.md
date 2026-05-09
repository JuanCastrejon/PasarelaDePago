# PasarelaDePago

`PasarelaDePago` es una plataforma personal de `payment orchestration` para Colombia. El proyecto se enfoca en cobros multiproveedor, rieles bancarios como `PSE` y `Bre-B`, payouts, resiliencia operativa, conciliacion, backoffice y una disciplina fuerte de documentacion y gobierno tecnico.

## Estado actual

Hoy el repositorio ya tiene tres capas vivas:

- `documentacion`: investigacion, dominio, requisitos, backlog, ADRs y slice packs
- `gobierno`: `.github/`, skills internas, hooks, prompts, workflows y validaciones del control plane
- `codigo`: monorepo con `apps/web`, `packages/payment-core`, `supabase/` y `tests/contract`
- `OpenSpec`: `openspec/specs/` y `openspec/changes/` como capa canonica de analisis y cambio

La parte mas nueva del proyecto es la construccion de un sistema de trabajo asistido por IA dentro del propio repo. La idea no es usar la IA como autocomplete, sino como un equipo de trabajo gobernado por artefactos, handoffs, trazabilidad y validacion humana final.

## Revision abierta a la comunidad

Este repositorio esta abriendo a revision tecnica una `v1` de su sistema operativo de desarrollo con IA.

La pregunta de fondo es sencilla: como se ve un `SDLC` cuando la IA deja de ser solo un asistente reactivo y pasa a operar como un equipo de agentes con ownership, memoria, handoffs y gates humanos.

Busco feedback de developers, arquitectos, QA engineers y gente que este experimentando con `Claude`, `Codex`, `Copilot`, `OpenSpec`, `skills`, memorias compartidas o flujos multiagente. Me interesa especialmente saber si la estructura actual:

- mejora la calidad y la trazabilidad real del trabajo
- esta bien balanceada o ya empieza a sobre-ingenierizar el proceso
- separa bien `gobierno`, `contexto`, `ejecucion`, `memoria` y `validacion`
- tiene gaps importantes para colaborar entre humanos y agentes

El proyecto de pagos es el caso de uso, pero lo que quiero poner a discusion es el proceso: como dividir responsabilidades entre humano, modelos, skills, specs, memoria y validaciones sin convertir el repo en una caja negra.

Si quieres revisar el enfoque, puedes abrir un `Issue` o proponer cambios por `PR`.

## Idea central del experimento

El aprendizaje principal fue separar dos cosas que suelen mezclarse:

- `knowledge plane`: contexto, dominio, requisitos, ADRs, backlog, prompts y documentacion viva
- `control plane`: agentes versionados, ownership, estado compartido, handoffs, gates y validaciones

Antes de esta iteracion, el repo ya tenia buen conocimiento del producto. Lo que faltaba era hacer operativa la coordinacion: convertir roles conversacionales en agentes con mision, limites, entradas, salidas y criterios de cierre.

El modelo quedo asi:

- `SDD`: disciplina personal para pensar y ejecutar con cuidado
- `OpenSpec`: artefactos compartibles de requisitos, cambios y backlog
- `analysis-first-sdd`: perfil OpenSpec del repo con `research` obligatorio
- `Engram`: referencia conceptual para memoria operativa compartida
- `Skills`: politicas, capacidades y criterios reutilizables
- `Planificador Opus`: convierte ideas brutas en slices, riesgos, dependencias y cierre
- `Orquestador Opus`: decide que agente actua, con que contexto y bajo que gate
- agentes especializados: poseen fases del `SDLC` y superficies reales del repo
- humano: conserva testing final, QA, code review, deploy y direccion tecnica

## Que se construyo en esta iteracion

En esta conversacion se materializo una capa completa de `control plane` y trazabilidad para el repo:

- agentes versionados en `.github/agents/`
- separacion entre `control plane` y `specialist plane`
- matriz de ownership y superficie tecnica
- estado compartido versionado en `.github/agent-state/`
- plantilla formal de handoffs entre agentes y gates humanos
- validadores del control plane y de drift documental
- trazabilidad por slice y por superficie real del monorepo
- guardrails semanticos del dominio de pagos
- primer `slice pack` de producto listo para ejecutar sobre `payment_order`

En otras palabras: el sistema multiagente dejo de ser solo una idea en conversaciones y paso a ser un conjunto de artefactos auditables dentro del repositorio.

## Mapeo al SDLC

El proceso quedo pensado como una linea de montaje con responsabilidad clara por fase:

| Fase | Agente responsable | Salida esperada |
|---|---|---|
| Definicion | `analista-openspec` | requisitos, casos de uso, criterios de aceptacion y backlog |
| Diseno | `arquitecto-dominio-pagos` | SDD, ADRs, invariantes y decisiones tecnicas |
| Implementacion core | `payment-core` | dominio, contratos, orquestacion y reglas de retry/fallback |
| Implementacion web | `web-operaciones` | UI operativa, route handlers, checkout shell y flujos visibles |
| Integracion y datos | `integraciones-datos` | persistencia, migraciones, adapters y workflows asincronicos |
| Aseguramiento | `qa-security-review` | findings, riesgos, cobertura, seguridad y deuda tecnica |

El `Planificador Opus` y el `Orquestador Opus` no compiten con esas fases. Funcionan como capa de gobierno: preparan slices, asignan contexto, controlan handoffs y aseguran que nadie trabaje fuera de su ownership.

## Arquitectura de trabajo con IA

La estructura actual del proyecto sigue esta idea:

| Capa | Artefacto principal | Rol |
|---|---|---|
| Contexto base | `CONTEXT.md`, `docs/`, `.github/copilot-instructions.md` | Fuente de verdad del proyecto |
| Gobierno | `.github/AGENTS.md`, skills internas, prompts, workflows | Reglas operativas del repo |
| Agentes | `.github/agents/` | Especializacion por fase y por superficie |
| Estado compartido | `.github/agent-state/` | Slice actual, riesgos, decisiones y handoffs |
| Trazabilidad | `surface-traceability`, slice packs, backlog, ADRs | Relacion entre cambios, dominio y codigo |
| Guardrails | scripts `validate:*` + CI | Deteccion temprana de drift y contradicciones |

### Planos de agentes

`Control plane`:

- `Planificador Opus`
- `Orquestador Opus`

`Specialist plane`:

- `Analista OpenSpec`
- `Arquitecto Dominio Pagos`
- `Payment Core`
- `Web Operaciones`
- `Integraciones y Datos`
- `QA Security Review`

### Estado compartido

Los artefactos vivos mas importantes del sistema son:

- `.github/agent-state/phase-status.yaml`
- `.github/agent-state/current-slice.md`
- `.github/agent-state/open-decisions.md`
- `.github/agent-state/open-risks.md`
- `.github/agent-state/handoffs/TEMPLATE.md`

### Guardrails activos

Hoy el repo ya valida:

- `npm run validate:control-plane`
- `npm run validate:drift`
- `npm run validate:docs-canonical`
- `npm run validate:enhanced-research -- <change-name>`
- `npm run validate:openspec`
- `npm run validate:slice-traceability`
- `npm run validate:surface-traceability`
- `npm run validate:semantic-guardrails`

Estas validaciones no reemplazan testing ni code review humano, pero si ayudan a que la capa de IA no opere sin contexto, sin ownership o sin trazabilidad.

## Primer slice de producto listo

La primera slice preparada para llevar este sistema a codigo real ya esta documentada:

- [Slice P0 - Payment Order Bootstrap](docs/backlog/slices/slice-payment-order-bootstrap.md)

La intencion fue dejar primero la gobernanza lista y despues ejecutar la primera vertical de producto sobre una base mas controlada.

## Ruta recomendada para revisar el proyecto

Si vienes a revisar especificamente el trabajo con IA, esta es la mejor secuencia:

1. [Indice maestro](docs/indice-maestro.md)
2. [Indice operativo](indice-operativo.md)
3. [Adopcion OpenSpec y SDD](docs/guides/adopcion-openspec-sdd.md)
4. [Sistema de trabajo multiagente v2](docs/proceso/sistema-de-trabajo-multiagente.md)
5. [Mapa de agentes y handoffs v1](docs/agents/mapa-de-agentes-y-handoffs.md)
6. [Matriz de trazabilidad por superficie v1](docs/agents/matriz-de-trazabilidad-por-superficie.md)
7. [Guardrails semanticos del dominio v1](docs/agents/guardrails-semanticos-del-dominio.md)

Si quieres entender primero el producto y luego el sistema operativo:

1. [CONTEXT.md](CONTEXT.md)
2. [Vision y alcance](docs/requisitos/vision-y-alcance-del-producto.md)
3. [Glosario del dominio](docs/dominio/glosario-del-dominio.md)
4. [Modelo de dominio canonico](docs/dominio/modelo-de-dominio-canonico.md)
5. [Roadmap por fases](docs/backlog/roadmap-por-fases.md)

## Preguntas abiertas para feedback

Estos son algunos puntos donde el feedback externo seria especialmente valioso:

- si la separacion entre `control plane` y `specialist plane` esta bien definida
- si `6` agentes especializados es un numero razonable para esta etapa
- si la matriz de ownership y los handoffs son suficientes o todavia ambiguos
- si los `validate:*` actuales ayudan de verdad o agregan friccion innecesaria
- si la trazabilidad entre `OpenSpec`, backlog, ADRs y superficies del repo esta bien aterrizada
- si la memoria versionada en el repo es suficiente antes de integrar una memoria externa tipo `Engram`
- si ven riesgos de sobre-ingenieria o puntos ciegos en seguridad, QA o mantenibilidad

## Estructura tecnica actual

La base de implementacion vive asi:

- `apps/web`: Next.js App Router para panel, overview operativo y route handlers
- `packages/payment-core`: dominio, contratos de adapters, taxonomia de estados y orquestacion
- `supabase/`: bootstrap local del esquema y migraciones
- `tests/contract/`: base para pruebas de contrato y adapters
- `.github/`: reglas, skills, prompts, CI, hooks, agentes y estado compartido
- `.agents/workflows/`: workflows operativos del sistema multiagente
- `openspec/`: capacidades canonicas y changes activos
- `docs/`: fuente historica y versionada del conocimiento del proyecto

## Flujo operativo del repo

El flujo de trabajo vigente es:

- `feature/* -> develop -> main`
- toda rama de trabajo nace desde `develop`
- merge a `develop` solo por `PR`
- merge de `develop` a `main` solo por `PR`
- testing, QA, deploy y aprobacion final siguen bajo validacion humana

## Comandos utiles

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run validate:control-plane
npm run validate:drift
npm run validate:docs-canonical
npm run validate:openspec
npm run validate:slice-traceability
npm run validate:surface-traceability
npm run validate:semantic-guardrails
```

## Nota sobre memoria y modelos

La vision del proyecto incluye colaboracion entre modelos, memoria compartida y auditoria cruzada, pero la fuente de verdad sigue viviendo en el repositorio. La memoria externa puede acelerar el trabajo, pero no debe reemplazar los artefactos versionados del proyecto.

