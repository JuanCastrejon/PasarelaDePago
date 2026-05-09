# Provider Adapter Routing Decoupling Specification

## Purpose

Canonizar el desacople entre adapters de proveedor y motor de routing para
soportar multiproveedor, capacidades por metodo y evolucion incremental sin
acoplar el dominio a una sola integracion.

## Requirements

### Requirement: Los proveedores se integran detras de contratos estables

El sistema MUST encapsular cada proveedor detras de contratos y adapters
internos estables.

#### Scenario: Incorporacion de un proveedor nuevo

- **GIVEN** la necesidad de integrar un proveedor adicional
- **WHEN** se define la nueva integracion
- **THEN** el proveedor se implementa detras de un adapter dedicado
- **AND** el dominio central no depende del payload crudo del proveedor

### Requirement: El routing opera separado del adapter

El sistema MUST resolver routing, elegibilidad, fallback y capacidades sin
mezclar esas decisiones dentro del adapter individual.

#### Scenario: Seleccion de proveedor por metodo y salud

- **GIVEN** una operacion que puede ejecutarse con mas de un proveedor
- **WHEN** el sistema evalua metodo, capacidades y salud operativa
- **THEN** la decision de routing ocurre fuera del adapter
- **AND** el adapter solo traduce y ejecuta la integracion elegida
