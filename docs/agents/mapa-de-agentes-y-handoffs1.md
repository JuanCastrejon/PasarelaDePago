# Mapa de Agentes y Handoffs v1

Fecha de actualizacion: 2026-05-02

## 1. Objetivo

Materializar una primera version del control plane multiagente de `PasarelaDePago`, mapeando el SDLC a owners concretos y dejando trazables los handoffs entre fases.

## 2. Idea base

El proyecto no funciona con "muchos agentes leyendo todo". Funciona con:

- una constitucion comun
- estado compartido minimo
- ownership por fase y por superficie
- handoffs con contrato
- gate humano en puntos de riesgo

## 3. Planos del sistema

### Control plane

- `Planificador Opus`
- `Orquestador Opus`

Estos dos roles no son ejecutores principales del producto. Son la capa de gobierno:

- planifican
- asignan contexto
- cortan ambiguedad
- determinan el gate humano

### Specialist plane

- `Analista OpenSpec`
- `Arquitecto Dominio Pagos`
- `Payment Core`
- `Web Operaciones`
- `Integraciones y Datos`
- `QA Security Review`

## 4. Mapa SDLC -> owner

| Fase SDLC | Owner principal | Artefacto de salida |
|---|---|---|
| definicion | `Analista OpenSpec` | requisitos, casos de uso, propuesta OpenSpec, ambiguedades abiertas |
| diseno de sistema | `Arquitecto Dominio Pagos` | SDD tecnico, ADRs, contratos, invariantes |
| implementacion backend | `Payment Core` | codigo reusable, contratos, pruebas del core |
| implementacion frontend | `Web Operaciones` | UI operativa, handlers, flujos visibles |
| integracion y datos | `Integraciones y Datos` | adapters, migraciones, estados asincronos, fixtures |
| aseguramiento | `QA Security Review` | findings, cobertura, riesgos, recomendacion de avance |
| revision final | humano | aprobacion o cambios requeridos |
| deploy | humano | promocion y monitoreo |

## 5. Relacion con las fases del repo

El repo ya trabaja con seis fases macro. Esta v1 no las reemplaza; las hace mas operativas:

- `requisitos` -> `Analista OpenSpec`
- `planificacion` -> `Planificador Opus` + `Arquitecto Dominio Pagos`
- `orquestacion` -> `Orquestador Opus`
- `ejecucion` -> `Payment Core`, `Web Operaciones`, `Integraciones y Datos`
- `validacion` -> `QA Security Review` + validacion humana
- `deploy` -> humano

## 6. Estado compartido

La memoria operativa versionada vive en `.github/agent-state/`:

- `phase-status.yaml`
- `current-slice.md`
- `open-decisions.md`
- `open-risks.md`
- `handoffs/TEMPLATE.md`

Esto no reemplaza la memoria normativa del repo. La complementa.

## 7. Regla de handoff

Ningun agente deberia empezar sin:

1. objetivo concreto
2. artefactos de entrada
3. skills a cargar
4. salida esperada
5. criterio de cierre
6. riesgos abiertos
7. gate humano

## 8. Resultado de esta v1

El sistema deja de depender solo de nombres como "Opus", "Sonnet" o "agente de QA". Ahora cada rol tiene:

- ownership
- superficie tecnica
- contrato de entrada y salida
- relacion con el SDLC

## 9. Siguiente paso recomendado

Una vez establecida esta v1, el siguiente avance natural es elegir entre:

- `v2 de enforcement`: hooks y checks contra drift
- `v2 de memoria externa`: integrar una capa como `Engram`
- `v2 de orquestacion paralela`: evaluar un patron como `MCO`
