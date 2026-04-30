# Reglas de Arquitectura

## Payment Core

- `domain/` no depende de IO externo
- `contracts/` define puertos internos, no implementaciones
- `errors/` tipa fallas de integracion y negocio
- `orchestration/` aplica reglas canonicas y politicas
- `providers/` no debe convertirse en un basurero de excepciones ad-hoc

## Web / Route Handlers

- coordinan entrada/salida HTTP
- validan input y delegan
- responden rapido en webhooks
- no contienen reglas de settlement o reconciliacion inline
