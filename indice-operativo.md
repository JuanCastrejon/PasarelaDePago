# Indice Operativo del Agente

Este documento centraliza el contexto operativo que un agente necesita para
trabajar en `PasarelaDePago` sin reconstruir el flujo en cada sesion.

## Mapa del sistema

| Componente | Ubicacion | Rol |
|---|---|---|
| Reglas globales | `.github/copilot-instructions.md` | convenciones del repo |
| Registro operativo | `.github/AGENTS.md` | control plane, skills y ownership |
| Contexto del dominio | `CONTEXT.md` | vocabulario canonico del proyecto |
| Navegacion documental | `docs/indice-maestro.md` | corpus historico de investigacion |
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

### Analisis

1. Leer `CONTEXT.md`, `docs/indice-maestro.md` y `.github/AGENTS.md`.
2. Si la entrada es vaga, ejecutar `enrich-us`.
3. Registrar reglas nuevas en `docs/domain/reglas-negocio-catalogo.md`.
4. Solicitar bloque `## [validation]` en GitHub Issue.
5. Abrir o actualizar el change OpenSpec correspondiente.

### Implementacion

6. Revisar `openspec/specs/` y `openspec/changes/` antes de tocar codigo.
7. Mantener `docs/`, ADRs, backlog y control plane sincronizados.
8. Ejecutar validaciones segun el alcance del cambio.

## Validaciones base

- `npm run validate:control-plane`
- `npm run validate:drift`
- `npm run validate:docs-canonical`
- `npm run validate:slice-traceability`
- `npm run validate:surface-traceability`
- `npm run validate:semantic-guardrails`
- `npm run validate:enhanced-research -- <change-name>`
- `npm run validate:openspec`

## Convenciones

- artefactos OpenSpec y documentacion: espanol
- identificadores de codigo y capacidades: ingles estable
- tracker por defecto: GitHub Issues
- ramas: `feature/* -> develop -> main`

## Referencias rapidas

- `README.md`
- `AGENTS.md`
- `docs/guides/adopcion-openspec-sdd.md`
- `docs/guides/umbrales-ceremonia.md`
- `docs/agents/issue-tracker.md`
- `docs/agents/triage-labels.md`
