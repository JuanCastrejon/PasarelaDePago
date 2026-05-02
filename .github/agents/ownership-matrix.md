# Ownership Matrix

## Objetivo

Mapear el SDLC operativo del proyecto a agentes concretos, evitando solapamiento entre planeacion, arquitectura, implementacion y aseguramiento.

## Matriz

| Agente | Plano | Fase SDLC principal | Fase del repo | Superficie | Salidas obligatorias | Gate humano |
|---|---|---|---|---|---|---|
| `planificador-opus` | control | planificacion | planificacion | roadmap, slices, dependencias | plan de slice, riesgos, criterio de cierre | `Lead` |
| `orquestador-opus` | control | orquestacion | orquestacion | asignacion de trabajo y contexto | handoff, contexto minimo, skill routing, gate requerido | `Lead` |
| `analista-openspec` | specialist | definicion | requisitos | requisitos, casos de uso, backlog, logica de negocio | propuesta OpenSpec, criterios de aceptacion, ambiguedades abiertas | `Lead` |
| `arquitecto-dominio-pagos` | specialist | diseno de sistema | planificacion | dominio, arquitectura, ADRs | SDD tecnico, decisiones de arquitectura, invariantes | `Lead` |
| `payment-core` | specialist | implementacion backend | ejecucion | `packages/payment-core` | dominio, contratos, orquestacion, pruebas unitarias del core | `Testing`, `Code Reviewer` |
| `web-operaciones` | specialist | implementacion frontend | ejecucion | `apps/web` | UI operativa, handlers, validacion visible, pruebas de flujo | `Testing`, `QA` |
| `integraciones-datos` | specialist | integracion y datos | ejecucion | `supabase`, adapters, webhooks, jobs | migraciones, contratos de integracion, estados asincronos, fixtures | `Testing`, `QA` |
| `qa-security-review` | specialist | aseguramiento | validacion | pruebas, riesgos, deuda tecnica, seguridad | reporte adversarial, cobertura, findings, cambios requeridos | `Lead`, `QA`, `Code Reviewer` |

## Reglas

1. Ningun agente especializado redefine prioridades globales; eso le pertenece al control plane.
2. Ningun agente de implementacion cambia arquitectura sin devolver el cambio al `arquitecto-dominio-pagos`.
3. `qa-security-review` puede bloquear una entrega, pero no redefine requisitos por su cuenta.
4. Todo cambio que modifique el diseno o la logica de negocio debe actualizar `open-decisions` o `open-risks`.
