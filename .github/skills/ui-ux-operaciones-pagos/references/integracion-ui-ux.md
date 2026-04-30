# Integracion UI/UX - PasarelaDePago

## Principios

1. la UI debe explicar lo que ocurre, no solo verse bien
2. un operador debe poder seguir una transaccion sin abrir la base de datos
3. los estados `pending`, `failed`, `rejected`, `approved` y `settled` deben sentirse distintos

## Patrones recomendados

- cards de referencia con `payment_order`, `payment_attempt`, `CUS`, autorizacion y recibo
- timelines con sellos de tiempo visibles
- tablas operativas con filtros, chips de estado y acciones seguras
- formularios de checkout con instrucciones claras y expiracion visible

## Riesgos a evitar

- dashboards genericos sin lenguaje del dominio
- colores sin semantica operativa
- modales que ocultan referencias o evidencias criticas
