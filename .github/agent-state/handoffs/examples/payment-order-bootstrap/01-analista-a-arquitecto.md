# Handoff - Analista a Arquitecto

## Objetivo

Convertir la necesidad de crear una `payment_order` en una definicion tecnica pequena y ejecutable.

## Fase

SDLC: definicion -> diseno de sistema

Repo: requisitos -> planificacion

## Agente origen

`analista-openspec`

## Agente destino

`arquitecto-dominio-pagos`

## Artefactos de entrada

- `RFV2-011`
- `NFR-014`
- `UC-04`
- `US-001`
- `TT-003`
- `TT-011`
- `ADR-0002`

## Skills a cargar

- `contexto-proyecto`
- `documentacion-viva`
- `arquitectura-dominio-pagos`

## Salida esperada

- contrato tecnico minimo de `payment_order`
- limite explicito del alcance de la slice
- decision de superficies a tocar

## Criterio de cierre

- la slice ya puede separarse entre `Payment Core` y `Web Operaciones`

## Riesgos abiertos

- confundir orden con intento
- arrastrar persistencia o proveedor real

## Gate humano

- `Lead`
