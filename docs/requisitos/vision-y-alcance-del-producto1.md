# Vision y Alcance del Producto v1

Fecha de actualizacion: 2026-04-29

## 1. Vision

Construir una plataforma de payment orchestration para Colombia capaz de integrar multiples proveedores, operar cobros y dispersiones con trazabilidad fuerte, soportar rieles bancarios como `PSE` y `Bre-B`, y ofrecer un backoffice serio para soporte, conciliacion y continuidad operativa.

## 2. Tesis del producto

El valor del proyecto no esta en "cobrar con una API". El valor real esta en:

- abstraer diferencias entre proveedores
- normalizar estados y eventos
- sostener la operacion cuando un proveedor falla
- conservar evidencia util para soporte y conciliacion
- exponer una base tecnica reutilizable para futuros clientes

## 3. Tipo de producto

El producto se concibe primero como:

- plataforma de orquestacion de pagos
- capa operativa sobre cuentas y habilitaciones de proveedores
- software-first platform con fuerte trazabilidad

No se concibe inicialmente como:

- adquirente propio
- procesador financiero de bajo nivel
- custodio centralizado de fondos de terceros
- reemplazo legal del onboarding regulado de los PSP

## 4. Problema que resuelve

Los comercios y operadores que cobran en Colombia suelen enfrentar:

- integraciones aisladas por proveedor
- poca visibilidad del estado real del pago
- dificultad para correlacionar intentos, webhooks y reportes
- manejo manual de incidentes y conciliacion
- acoplamiento excesivo a un solo proveedor

El producto busca resolver esto con una capa propia de dominio, operacion y gobierno.

## 5. Usuarios objetivo

### Primarios

- duenio de la plataforma
- equipos tecnicos que integran comercios o clientes
- operadores que monitorean pagos y dispersiones

### Secundarios

- comercios que requieren multiproveedor
- comercios con necesidad de payouts
- clientes futuros que quieran una capa mas robusta que un checkout basico

### Indirectos

- pagadores finales
- beneficiarios de dispersiones

## 6. Alcance dentro del proyecto

## 6.1 En alcance

- cobros multiproveedor
- checkout y sesiones de pago
- `PSE` como riel principal bancario
- `Bre-B` como capacidad de primera clase
- normalizacion de webhooks y estados
- retries y fallback controlados
- payouts y dispersiones
- conciliacion y reporting
- backoffice operativo
- skills propias, ADRs y documentacion fuerte

## 6.2 Fuera de alcance inicial

- custodia propia de tarjetas o datos PAN/CVV
- core bancario
- adquirencia propia
- emision de dinero electronico
- compliance regulatorio reemplazando a los PSP
- operacion completa de fondos de terceros sin validacion legal y contractual

## 7. Principios de producto

1. La fuente de verdad del pago es asincrona.
2. El producto debe preferir claridad operativa sobre magia invisible.
3. La resiliencia no puede introducir duplicidad.
4. Cada integracion debe poder auditarse.
5. La documentacion es parte del valor entregado.

## 8. Propuesta de valor

### Valor tecnico

- arquitectura reusable
- desacople del proveedor
- mejor soporte a cambios y crecimiento

### Valor operativo

- timeline de transaccion
- correlacion de referencias
- soporte a incidencias reales

### Valor comercial futuro

- demostracion clara de conocimiento fullstack
- base para ofrecer integraciones avanzadas
- posicionamiento como plataforma y no solo como demo

## 9. Criterios de exito de esta etapa

La etapa fundacional se considera exitosa cuando el repositorio contenga:

- lenguaje de dominio consistente
- alcance y no alcance claros
- modelo canonico del dominio
- matriz de capacidades por proveedor
- requisitos consolidados
- backlog inicial trazable
- ADRs base

## 10. Riesgos a controlar

- sobredisenar sin validar capacidades reales de proveedores
- mezclar alcance tecnico con promesas regulatorias
- confundir UX de checkout con verdad financiera
- asumir soporte de metodos no confirmados oficialmente

## 11. Resultado esperado del producto

Una plataforma capaz de servir como:

- pieza fuerte de portafolio
- base real de implementacion
- laboratorio serio de arquitectura y pagos
- cimiento para futuros clientes y evoluciones comerciales
