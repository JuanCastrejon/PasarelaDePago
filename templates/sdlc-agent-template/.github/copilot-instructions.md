# Instrucciones del Proyecto — {{PROJECT_NAME}}

## Idioma

- documentacion, ADRs, backlog, issues, PRs, comentarios y commits: siempre en espanol
- identificadores de codigo: en ingles

## Naturaleza del proyecto

`{{PROJECT_NAME}}` es un proyecto `{{STACK}}`. Ajusta este documento con el
alcance real del dominio, restricciones tecnicas y principios de arquitectura.

## Reglas base

- la documentacion siempre acompana al codigo
- los documentos activos usan nombres canonicos estables
- las versiones reemplazadas se mueven a `docs/archive/`
- si la capacidad no existe o va a cambiar, abrir un change en `openspec/changes/`

## Documentacion viva

Cada cambio relevante debe mantener sincronizados:

- `README.md`
- `indice-operativo.md`
- `openspec/specs/` y `openspec/changes/` cuando aplique
- documentos de dominio, arquitectura, backlog o proceso impactados
- `.github/AGENTS.md` si cambia el flujo operativo
