# Sistema de Trabajo Multiagente v1

Fecha de actualizacion: 2026-04-29

## 1. Objetivo

Definir una estructura de trabajo estable para que `PasarelaDePago` pueda desarrollarse como si fuera un equipo completo de software asistido por IA, con fases claras, roles separados y validacion humana final.

## 2. Principios

1. El agente no improvisa flujo; sigue un sistema operativo del proyecto.
2. La planificacion y la ejecucion no son el mismo rol.
3. La validacion humana conserva la ultima palabra.
4. La documentacion es memoria operativa, no solo anexos.

## 3. Capas del sistema de trabajo

### `SDD`

Uso personal y disciplinado del ciclo de desarrollo para pensar, partir el problema y cerrar una slice con criterio.

### `OpenSpec`

Capa compartible de especificacion del producto:

- requisitos
- backlog
- ADRs
- roadmap

### `Engram`

Memoria persistente del proyecto:

- `CONTEXT.md`
- glosario
- matrices
- backlog
- skills internas

## 4. Fases

## Fase 1 — Requisitos

- humano + IA
- requisitos funcionales
- no funcionales
- casos de uso
- logica de negocio

## Fase 2 — Planificacion

- agente principal: `Planificador Opus`
- descompone sistema
- propone arquitectura
- deriva roadmap y slices

## Fase 3 — Orquestacion

- agente principal: `Orquestador Opus`
- decide que rol actua
- decide que skill aplica
- define contexto minimo por tarea

## Fase 4 — Ejecucion

- agentes de ejecucion sugeridos:
  - backend
  - frontend
  - datos e integraciones
  - documentacion y backlog
  - testing de apoyo
  - observabilidad/operacion

## Fase 5 — Validacion

- testing: humano
- QA: humano
- code review: humano

## Fase 6 — Deploy

- despliegue: humano
- monitoreo: humano

## 5. Seis agentes personalizados sugeridos

1. `Orquestador Opus`
2. `Planificador Opus`
3. `Backend Sonnet`
4. `Frontend Sonnet`
5. `Integraciones y Datos Sonnet`
6. `Documentacion y Backlog Sonnet`

## 6. Roles humanos

- `Lead`: define prioridades y cierra decisiones
- `Testing`: ejecuta validacion manual y tecnica
- `QA`: revisa comportamiento y entrega
- `Code Reviewer`: revisa coherencia final
- `Deploy`: promueve cambios a entorno remoto

## 7. Reglas de delegacion

1. la planificacion nace antes de delegar
2. la tarea urgente del camino critico no se delega a ciegas
3. cada agente recibe contexto minimo suficiente
4. toda salida delegada debe poder integrarse de vuelta al repositorio

## 8. Artefactos por fase

- requisitos: `docs/requisitos/`
- dominio: `docs/dominio/`
- arquitectura: `docs/adr/` y `docs/arquitectura/`
- backlog: `docs/backlog/`
- workflow: `.github/` y `.agents/workflows/`

## 9. Conclusion

Este sistema convierte al repositorio en una base operativa multiagente: primero piensa, luego parte, despues ejecuta en paralelo y al final valida con criterio humano.
