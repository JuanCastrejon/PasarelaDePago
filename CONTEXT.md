# CONTEXT

## Proposito del proyecto

`PasarelaDePago` es una plataforma personal de payment orchestration para Colombia. Su objetivo no es convertirse desde el inicio en adquirente o procesador regulado de bajo nivel, sino construir una capa propia de:

- integracion multiproveedor
- checkout y payout
- failover
- normalizacion de webhooks
- reconciliacion
- observabilidad
- operaciones para comercios

El proyecto esta pensado como:

- base tecnica reusable para futuros clientes
- pieza fuerte de portafolio FullStack
- laboratorio serio de arquitectura, producto, pagos y compliance

## Lenguaje del dominio

### Payment Order

La intencion de cobro en nuestro dominio. Representa el pago que queremos lograr desde negocio, independiente del proveedor o del numero de intentos.

### Payment Attempt

Cada intento individual de procesar una `Payment Order` con un proveedor y un medio de pago especifico.

### Provider

Proveedor externo que procesa pagos o dispersiones. Ejemplos: `Wompi`, `PayU`, `ePayco`, `Mercado Pago`.

### Routing

La decision de a que proveedor, medio o flujo se envia un intento de pago o payout.

### Fallback

Orden de prioridad entre proveedores cuando el proveedor principal no puede procesar una operacion. No implica automaticamente reintento silencioso.

### Smart Retry

Reintento controlado sobre el mismo u otro proveedor cuando la falla es recuperable y no requiere nueva accion del usuario.

### Final Status

Estado confirmado por webhook o consulta servidor a servidor. Nunca por una simple redireccion del navegador.

### Payout

Transferencia saliente hacia un beneficiario. Puede ser individual o por lote.

### Beneficiary / Payee

Persona o entidad que recibe un payout.

### Reconciliation

Proceso de comparar nuestras ordenes, intentos, eventos y saldos contra los registros del proveedor para detectar diferencias operativas o financieras.

### Method Family

Familia logica de medios de pago o transferencia: `CARD`, `PSE`, `BRE_B_QR`, `NEQUI`, `BANCOLOMBIA_BUTTON`, `DAVIPLATA`, `CASH`, `PAYOUT_BANK`, etc.

## Principios de diseño

- No almacenar PAN, CVV ni otros datos sensibles de tarjeta.
- Toda operacion critica debe ser idempotente.
- Todo estado final debe poder trazarse hasta un evento verificable.
- Los proveedores viven detras de interfaces internas estables.
- El failover se diseña por reglas, no por improvisacion.
- La documentacion es parte del producto.
- Las skills del proyecto existen para reducir ambiguedad y mantener disciplina tecnica.
