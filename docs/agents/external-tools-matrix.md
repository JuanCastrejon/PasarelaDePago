# External tools matrix

Inventario inicial de frameworks, bundles de skills y herramientas externas que forman parte del flujo operativo de `PasarelaDePago`, con foco en lo que ya esta disponible hoy y lo que entra en la cola del bootstrap.

> Ultima auditoria: 2026-05-09. Este documento es la referencia viva para decidir que parte del framework entra a la plantilla base y que parte sigue siendo opcional por proyecto.

## Convenciones

- **Estado**: `✅` instalado y operativo, `⚠️` parcial o solo global, `❌` no instalado.
- **Footprint local**: donde deja evidencia en el repo o en el entorno del agente.
- **Trigger**: como se invoca o en que momento aplica.
- **Template base**: si deberia formar parte del `core` reusable o quedar como opcion por proyecto.

---

## 1. OpenSpec (Fission-AI/OpenSpec)

- **Estado**: `✅` Instalado y operativo en el repo.
- **Rol**: capa versionada de especificacion y cambio del flujo de analisis.
- **Footprint local actual**:
  - [openspec/config.yaml](/C:/Users/juand/source/repos/PasarelaDePago/openspec/config.yaml)
  - `openspec/specs/`
  - `openspec/changes/`
  - `openspec/schemas/analysis-first-sdd/`
  - `openspec/schemas/legacy-brownfield-sdd/`
  - script `validate:openspec` en [package.json](/C:/Users/juand/source/repos/PasarelaDePago/package.json)
- **Trigger**:
  - `npx @fission-ai/openspec@latest validate --all`
  - `/opsx:propose`
  - `/opsx:ff`
  - `/opsx:apply`
  - `/opsx:verify`
  - `/opsx:archive`
- **Template base**: `si`
- **Notas**:
  - perfil activo: `analysis-first-sdd`
  - overlay reusable: `legacy-brownfield-sdd`

## 2. LIDR `enrich-us` y `commit`

- **Estado**: `✅` Instaladas y adaptadas al flujo del repo.
- **Rol**: enriquecer historias, aterrizar investigacion y cerrar con commits consistentes al flujo `feature/* -> develop -> main`.
- **Footprint local**:
  - [.github/skills/enrich-us/SKILL.md](/C:/Users/juand/source/repos/PasarelaDePago/.github/skills/enrich-us/SKILL.md)
  - [.github/skills/commit/SKILL.md](/C:/Users/juand/source/repos/PasarelaDePago/.github/skills/commit/SKILL.md)
- **Trigger**:
  - `/enrich-us`
  - `/commit`
- **Template base**: `si`
- **Notas**:
  - `enrich-us` produce el bloque `## [enhanced]` y exige catalogar reglas
  - `commit` cierra contra `develop` y reconoce `openspec/changes/`

## 3. autoskills (midudev/autoskills)

- **Estado**: `✅` Instalado localmente para el stack actual del repo.
- **Footprint local**:
  - [skills-lock.json](/C:/Users/juand/source/repos/PasarelaDePago/skills-lock.json)
  - `.agents/skills/` con 17 skills detectadas
  - allowlist en [.github/skills/operacion-cli-devops/references/autoskills-allowlist.md](/C:/Users/juand/source/repos/PasarelaDePago/.github/skills/operacion-cli-devops/references/autoskills-allowlist.md)
  - gobernanza en [gobernanza-de-skills-y-fuentes.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/proceso/gobernanza-de-skills-y-fuentes.md)
- **Trigger**:
  - no se invoca como skill unica; sus skills quedan disponibles para el agente segun el stack
- **Template base**: `documentacion si`, `instalacion no`
- **Siguiente paso recomendado**:
  - mantener la allowlist curada
  - documentar que el template solo trae la gobernanza, no la instalacion obligatoria

## 4. caveman

- **Estado**: `✅` Disponible globalmente en Codex, con uso opt-in.
- **Footprint local**:
  - referencia en [AGENTS.md](/C:/Users/juand/source/repos/PasarelaDePago/AGENTS.md)
  - referencia en [.github/AGENTS.md](/C:/Users/juand/source/repos/PasarelaDePago/.github/AGENTS.md)
  - skill global en `~/.codex/skills/caveman`
- **Trigger**:
  - `$caveman`
  - frase natural equivalente pedida por el usuario
- **Template base**: `documentacion si`, `instalacion no`
- **Siguiente paso recomendado**:
  - mantenerlo como herramienta opt-in y nunca como regla always-on del template

## 5. `mattpocock/skills`

- **Estado**: `✅` Disponibles globalmente en Codex y alineadas a la configuracion del repo.
- **Footprint local**:
  - skills globales verificadas en `~/.codex/skills/`: `setup-matt-pocock-skills`, `grill-with-docs`, `to-prd`, `to-issues`, `tdd`, `diagnose`, `improve-codebase-architecture`, `zoom-out`, `triage`
  - catalogadas en [catalogo-de-skills-del-proyecto.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/skills/catalogo-de-skills-del-proyecto.md)
- **Trigger**:
  - `/setup-matt-pocock-skills`
  - `/grill-with-docs`
  - `/to-prd`
  - `/to-issues`
  - y otras skills segun el caso
- **Template base**: `documentacion si`, `instalacion no`
- **Convivencia acordada**:
  - `OpenSpec` es la fuente principal para especificacion y changes
  - `grill-with-docs`, `diagnose`, `triage`, `to-prd` y `to-issues` operan como complementos, no como flujo paralelo de verdad

## 6. `ComposioHQ/awesome-codex-skills`

- **Estado**: `✅` Parcial, disponible globalmente en Codex.
- **Footprint local**:
  - skills globales verificadas en `~/.codex/skills/`: `webapp-testing`, `deploy-pipeline`, `issue-triage`
  - catalogadas en [catalogo-de-skills-del-proyecto.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/skills/catalogo-de-skills-del-proyecto.md)
- **Trigger**:
  - segun la skill: testing web, pipeline o triage
- **Template base**: `documentacion si`, `instalacion no`
- **Siguiente paso recomendado**:
  - tratarlas como extensiones opcionales de productividad, no como dependencia base del framework

## 7. Graphify

- **Estado**: `✅` Configurado y con primer build AST local realizado.
- **Footprint local**:
  - [.graphifyignore](/C:/Users/juand/source/repos/PasarelaDePago/.graphifyignore)
  - `graphify-out/graph.json`
  - `graphify-out/GRAPH_REPORT.md`
- **Rol**: investigacion estructural interna sobre `docs/`, `openspec/`, `.github/` y raiz.
- **Trigger**:
  - `graphify update .`
  - `graphify query "<tema>"`
  - `graphify explain "<nodo>"`
- **Template base**: `documentacion si`, `instalacion no`
- **Notas**:
  - el primer scope excluye codigo de producto
  - `query` ya devuelve trazabilidad sobre specs y ADRs semilla

## 8. BMAD-METHOD

- **Estado**: `❌` No instalado.
- **Rol esperado**: ninguno por ahora.
- **Template base**: `no`
- **Siguiente paso recomendado**:
  - no adoptar sin ADR previa, porque se solapa con el control plane actual y con la futura capa `OpenSpec`

## 9. CLIs operativas del entorno

- **Estado**: `✅` Documentadas para operacion local.
- **Footprint local**:
  - [MCP.md](/C:/Users/juand/source/repos/PasarelaDePago/.github/MCP.md)
  - skill [operacion-cli-devops](/C:/Users/juand/source/repos/PasarelaDePago/.github/skills/operacion-cli-devops/SKILL.md)
- **Herramientas**:
  - `gh`
  - `supabase`
  - `vercel`
  - `az`
  - `az devops`
- **Template base**: `documentacion si`, `instalacion no`
- **Siguiente paso recomendado**:
  - mantener separada la documentacion de CLIs del inventario de skills/frameworks para no confundir gobierno de repo con setup personal

## Resumen ejecutivo

| Tool | Estado | Entra al template base | Comentario |
|---|---|---|---|
| OpenSpec | `✅` | si | perfil `analysis-first-sdd` activo |
| enrich-us / commit | `✅` | si | skills de analisis y cierre activas |
| autoskills | `✅` | solo gobernanza | util por stack, no obligatorio en todos los proyectos |
| caveman | `✅` | solo documentacion | opt-in global |
| mattpocock/skills | `✅` | solo documentacion | definir convivencia con OpenSpec |
| awesome-codex-skills | `✅` | solo documentacion | opcional por productividad |
| Graphify | `✅` | solo documentacion | grafo documental ya construido |
| BMAD-METHOD | `❌` | no | fuera del alcance actual |
| CLIs operativas | `✅` | solo documentacion | entorno de trabajo, no framework base |

## Regla de mantenimiento

1. Si cambia una herramienta instalada, actualizar esta matriz y las referencias en `AGENTS.md`.
2. Si una herramienta pasa de opcional a base, registrarlo en el documento de bootstrap del template.
3. Si una herramienta externa contradice una regla interna del repo, prevalece `.github/`.



