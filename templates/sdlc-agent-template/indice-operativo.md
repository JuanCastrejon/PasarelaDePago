# Indice Operativo del Agente

Este documento centraliza el contexto operativo que un agente necesita para
trabajar en `{{PROJECT_NAME}}` sin reconstruir el flujo en cada sesion.

## Mapa del sistema

| Componente | Ubicacion | Rol |
|---|---|---|
| Reglas globales | `.github/copilot-instructions.md` | convenciones del repo |
| Registro operativo | `.github/AGENTS.md` | control plane, skills y ownership |
| Contexto del dominio | `CONTEXT.md` | vocabulario canonico del proyecto |
| Navegacion documental | `docs/` | corpus historico del proyecto |
| OpenSpec canonico | `openspec/specs/` | capacidades estabilizadas |
| OpenSpec en curso | `openspec/changes/` | changes activos |
| Guias | `docs/guides/` | adopcion OpenSpec y ceremonia |
| Catalogo de reglas | `docs/domain/reglas-negocio-catalogo.md` | invariantes y reglas detectadas |
| UAT | `docs/requirements/uat/` | validacion funcional humana |
| Tools externas | `docs/agents/external-tools-matrix.md` | estado real del entorno |

## Flujo operativo recomendado

```text
enrich-us -> validation -> opsx:ff | opsx:propose -> opsx:apply -> opsx:verify -> opsx:archive -> commit
```

## Validaciones base

- `npm run validate:docs-canonical`
- `npm run validate:enhanced-research -- <change-name>`
- `npm run validate:openspec`

## Convenciones

- artefactos OpenSpec y documentacion: espanol
- identificadores de codigo y capacidades: ingles estable
- tracker por defecto: `{{TRACKER}}`
- ramas: `{{DEFAULT_BRANCH_FLOW}}`
