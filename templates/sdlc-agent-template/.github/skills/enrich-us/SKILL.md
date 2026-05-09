---
name: enrich-us
description: Refinar y enriquecer una historia de usuario, issue o idea vaga hasta dejarla lista para el flujo OpenSpec del proyecto.
author: PasarelaDePago
version: 2.0.0-ppago
---

# enrich-us - PasarelaDePago

Skill previo al flujo OpenSpec. Toma una idea vaga, un `GitHub Issue` o una
historia parcial y la deja con el detalle funcional minimo para abrir un change
en `openspec/changes/` sin ambiguedad innecesaria.

## Cuando usar

- la historia todavia no esta lista para `OpenSpec`
- el issue tiene descripcion minima o sin reglas de negocio claras
- antes de `/opsx:propose` o `/opsx:ff`

## Argumentos

`$ARGUMENTS` puede contener:

- un `GitHub Issue` como `#123`
- texto libre con la idea inicial
- una referencia al slice o feature que se va a analizar

## Instrucciones

1. Cargar contexto base:
   - `.github/copilot-instructions.md`
   - `AGENTS.md`
   - `.github/AGENTS.md`
   - `openspec/config.yaml`
   - `.github/skills/contexto-proyecto/SKILL.md`

2. Recuperar el ticket:
   - si `$ARGUMENTS` apunta a un issue, usar `gh issue view <id> --json title,body,labels,state`
   - si no hay issue, tratar el input del usuario como borrador inicial

3. Analizar la historia usando:
   - `docs/dominio/`
   - `docs/requisitos/`
   - `docs/backlog/`
   - `docs/adr/`
   - `docs/investigacion/`
   - `docs/matriz/`
   - `docs/domain/reglas-negocio-catalogo.md`

4. Diagnosticar la historia con foco en:
   - descripcion funcional observable
   - stakeholders afectados
   - reglas de negocio explicitas
   - flujos AS-IS y TO-BE cuando aplique
   - endpoints, formularios, pantallas o entidades afectadas
   - impacto en capacidades OpenSpec existentes o nuevas
   - viabilidad preliminar, dependencias y riesgos
   - requisitos no funcionales y operativos

5. Separar evidencia en tres bloques:
   - confirmado
   - inferencia
   - vacio abierto

6. Ejecutar investigacion de prior art en este orden:
   1. Graphify si existe `graphify-out/graph.json`
   2. `openspec/specs/` y documentacion interna
   3. investigacion externa solo si la interna no basta

7. Generar el bloque enriquecido con esta estructura:

```md
## [enhanced]

### Contexto

### Stakeholders afectados
| Rol del sistema | Persona / cargo | Impacto | Valida |
|---|---|---|---|

### Fuentes consultadas
- Primaria:
- Secundaria:
- Evidencia revisada:

### Comportamiento esperado

### Proceso AS-IS (si aplica)

### Wireflow funcional (si hay UI)

### Reglas de negocio detectadas
| ID | Regla | Modulo(s) | Tipo | Fuente |
|---|---|---|---|---|

### Endpoints / formularios / pantallas afectadas
| Tipo | Identificador | Cambio |
|---|---|---|

### Prior art
- Interno:
- Externo:
- Decision:

### Impacto en `openspec/specs/`
- Capacidades a tocar:
- Requiere nuevo change:

### Viabilidad preliminar
- Esfuerzo estimado:
- Dependencias tecnicas:
- Dependencias funcionales:
- Riesgos de bloqueo:

### Requisitos no funcionales

### Definition of Done
- [ ] ...

### Riesgos / Mitigaciones

### Brechas abiertas
```

8. Persistir en el issue cuando exista:
   - agregar `## [enhanced]`
   - preservar el contenido original como `## [original]` si hace falta
   - sugerir `ready-for-agent` si la historia quedo completa
   - sugerir `needs-info` si quedan huecos importantes

9. Solicitar bloque humano `## [validation]` con veredicto:
   - `aprobado`
   - `requiere-cambios`
   - `rechazado`

10. Catalogar reglas nuevas en `docs/domain/reglas-negocio-catalogo.md`.

11. Este skill no abre changes ni modifica `openspec/specs/`.
    Su salida es la entrada para `/opsx:propose` o `/opsx:ff`.
