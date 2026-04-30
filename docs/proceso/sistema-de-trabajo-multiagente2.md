# Sistema de Trabajo Multiagente v2

Fecha de actualizacion: 2026-04-30

## 1. Objetivo

Definir un sistema de trabajo que convierta el repositorio en una base real para colaboracion humano + IA, con planificacion, orquestacion, ejecucion y validacion claramente separadas.

## 2. Capas del sistema

### `SDD`

Disciplina personal para pensar, partir problemas y cerrar slices con criterio.

### `OpenSpec`

Capa compartible de:

- requisitos
- backlog
- ADRs
- roadmap

### `Engram`

Memoria persistente del proyecto en:

- `CONTEXT.md`
- `docs/`
- skills internas
- workflows locales

## 3. Fases

### Fase 1 - Requisitos

Entrada:

- investigacion
- contexto de negocio
- riesgos

Salida:

- requisitos
- casos de uso
- historias

### Fase 2 - Planificacion

Rol lider:

- `Planificador Opus`

Salida:

- slices
- orden tecnico
- dependencias

### Fase 3 - Orquestacion

Rol lider:

- `Orquestador Opus`

Salida:

- asignacion de tarea
- skill aplicable
- contexto minimo

### Fase 4 - Ejecucion

Roles sugeridos:

- `Backend Sonnet`
- `Frontend Sonnet`
- `Integraciones y Datos Sonnet`
- `Documentacion y Backlog Sonnet`
- `Testing de apoyo Sonnet`
- `Observabilidad y Operacion Sonnet`

### Fase 5 - Validacion

Roles humanos:

- testing
- QA
- review

### Fase 6 - Deploy

Roles humanos:

- deploy
- monitoreo

## 4. Contrato de handoff

Toda delegacion debe incluir:

1. objetivo concreto
2. artefacto de entrada
3. skill o instruccion aplicable
4. salida esperada
5. criterio de cierre

## 5. Reglas de uso

1. La planificacion ocurre antes de dividir.
2. La documentacion es parte del cierre.
3. Los agentes no inventan stack ni proceso; leen el repo.
4. La validacion humana tiene la ultima palabra en merge, QA y deploy.
