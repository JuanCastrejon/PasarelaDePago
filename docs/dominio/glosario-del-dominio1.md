# Glosario del Dominio v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Definir el vocabulario canonico del proyecto para que producto, arquitectura, operacion y backlog usen los mismos terminos.

## 2. Terminos base

### Plataforma

`PasarelaDePago` como producto propio de orquestacion, observabilidad, conciliacion y operacion de pagos para Colombia.

### Platform Owner

Responsable principal del producto, su direccion funcional y su operacion.

### Merchant

Comercio, empresa o persona que usa la plataforma para cobrar o dispersar dinero.

### Merchant Provider Account

Cuenta, credencial o habilitacion que un comercio posee con un proveedor externo como `Wompi`, `PayU`, `ePayco` o `Payvalida`.

### Payer

Persona que realiza el pago.

### Beneficiary / Payee

Persona o entidad que recibe una dispersion o payout.

### Financial Entity

Entidad seleccionada por el pagador en flujos como `PSE`. No siempre es solo un banco; puede ser banco, billetera, deposito electronico, cooperativa, fiduciaria o fintech.

### Payment Method Family

Familia funcional del medio de pago. Ejemplos:

- `CARD`
- `PSE`
- `BRE_B_QR`
- `NEQUI`
- `BANCOLOMBIA_BUTTON`
- `DAVIPLATA`
- `CASH`

### Payment Rail

Riel operativo real por el que viaja el dinero o la autorizacion. Ejemplos:

- `PSE`
- `Bre-B`
- red de tarjetas
- wallet propia del proveedor

### Payment Order

Intencion de cobro del negocio. Es independiente del proveedor y puede requerir multiples intentos hasta cerrarse.

### Payment Attempt

Intento individual de ejecutar una `Payment Order` con un proveedor, metodo y contexto especificos.

### Checkout Session

Sesion visible al pagador donde se presenta el resumen del cobro y se captura o redirige la informacion necesaria para pagar.

### Provider Transaction

Registro tecnico que el proveedor genera para un intento de pago.

### Provider Event

Evento emitido por el proveedor, normalmente por webhook, para reportar un cambio de estado o un resultado.

### Final Status

Estado validado por webhook, consulta backend o evidencia equivalente del proveedor. Nunca por una simple redireccion del navegador.

### Response URL

Pagina o endpoint a la que vuelve el usuario despues de pagar o intentar pagar. Sirve para UX, no para verdad contable.

### Confirmation URL / Webhook

Endpoint servidor a servidor donde el proveedor notifica cambios de estado o resultado final.

### Routing

Decision de a que proveedor y metodo enviar una operacion segun reglas de negocio, capacidad y salud operativa.

### Fallback

Uso de un proveedor alterno cuando el proveedor primario no es elegible o esta degradado. No implica automaticamente retry silencioso.

### Smart Retry

Nuevo intento controlado de una operacion cuando la falla es recuperable y la experiencia del usuario lo permite.

### Idempotency Key

Llave usada para impedir la ejecucion duplicada de una misma intencion de negocio o de un mismo comando tecnico.

### Canonical Status

Estado interno normalizado del dominio, independiente del texto exacto que usa cada proveedor.

### Raw Provider Status

Estado o codigo original recibido del proveedor sin normalizar.

### CUS

`Codigo Unico de Seguimiento` usado en Colombia, especialmente en `PSE`, como referencia transversal para soporte y validacion.

### Authorization Reference

Codigo de autorizacion visible en algunos proveedores o artefactos post-pago. Puede coincidir con otros identificadores como `CUS`, segun el proveedor y el flujo.

### Receipt Reference

Numero de recibo, comprobante o voucher visible para el pagador o el comercio.

### Reconciliation

Proceso de comparar ordenes internas, intentos, eventos y movimientos financieros contra los registros del proveedor para detectar diferencias.

### Settlement

Momento o proceso en el que el dinero aprobado se abona y se refleja financieramente para el comercio o para la cuenta de origen/destino.

### Refund

Devolucion de dinero de una operacion ya aprobada.

### Reversal / Void

Anulacion o reverso que intenta deshacer una operacion dentro de la ventana permitida por el proveedor o la red.

### Payout

Transferencia saliente desde la plataforma o desde la cuenta del comercio hacia un beneficiario.

### Payout Batch

Lote de dispersiones enviado como una sola unidad operativa.

### Manual Review

Cola o estado donde una operacion requiere intervencion humana por riesgo, inconsistencia o falta de evidencia suficiente.

### Ops Backoffice

Panel y herramientas internas para monitorear, investigar, conciliar y operar pagos y dispersiones.

## 3. Distinciones criticas

- `Payment Order` no es lo mismo que `Payment Attempt`.
- `Response URL` no es lo mismo que `Confirmation URL`.
- `PENDIENTE` no es lo mismo que `FALLIDA`.
- `Rechazada` no es lo mismo que `fallida de creacion`.
- `Aprobacion` no es lo mismo que `settlement`.
- `Fallback` no es lo mismo que `Smart Retry`.
- `Financial Entity` no es lo mismo que `Provider`.

## 4. Regla editorial

Este glosario debe prevalecer sobre nombres de campos crudos de proveedores. Cuando un proveedor use un termino distinto, se debe mapear al lenguaje canonico del proyecto en vez de contaminar el dominio central.
