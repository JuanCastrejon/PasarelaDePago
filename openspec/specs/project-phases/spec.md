# Project Phases Specification

## Purpose

Canonizar el roadmap por fases del proyecto para que backlog, slices y cambios
OpenSpec se alineen a una progresion comun.

## Requirements

### Requirement: El proyecto sigue una secuencia de fases fundacionales

El proyecto MUST organizarse al menos en las fases `F0` a `F6` definidas en el
roadmap del repositorio.

#### Scenario: Planeacion de trabajo

- **GIVEN** una iniciativa de producto o de plataforma
- **WHEN** se decide su prioridad
- **THEN** la iniciativa se asigna a una fase canonica del roadmap
- **AND** su salida esperada se evalua contra el criterio de salida de esa fase

### Requirement: Cada fase declara objetivo, entregables y criterio de salida

Cada fase canonica MUST describir objetivo, entregables y criterio de salida
antes de considerarse activa o cerrada.

#### Scenario: Cierre de fase

- **GIVEN** una fase marcada como proxima a completarse
- **WHEN** el equipo revisa su estado
- **THEN** existen entregables y criterio de salida verificables para esa fase
- **AND** el cierre no depende solo de percepcion subjetiva
