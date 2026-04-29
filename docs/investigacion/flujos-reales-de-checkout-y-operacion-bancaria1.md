# Flujos reales de checkout y operacion bancaria 1

Fecha de corte: 2026-04-29

## Objetivo

Aterrizar el comportamiento real del pagador y del comercio usando ejemplos vivos y documentacion bancaria oficial, para traducirlos en requisitos de UX, backoffice y orquestacion.

## Hallazgos principales

1. El flujo real de pagos en Colombia casi nunca es una sola pantalla lineal; normalmente combina `checkout del comercio`, `pantalla del proveedor`, `handoff al banco o riel`, `confirmacion asincrona` y `prueba/recibo`.
2. En medios bancarios, el usuario suele validar al receptor antes del debito, y eso debe reflejarse en nuestro producto.
3. La experiencia actual del mercado confirma que el `fallback` debe ocurrir antes del handoff o despues de un fallo final claro, no a mitad del consentimiento bancario.

## Caso 1 - Wompi en un checkout publico real

### Evidencia observada

El `2026-04-29` se inspeccionaron dos links publicos de Wompi sin ejecutar ningun pago:

- `https://checkout.wompi.co/l/3Z0Cfi`
- `https://checkout.wompi.co/l/ZMzFzR`

### Resultado observado

- El link `3Z0Cfi` devolvio una pantalla de error indicando que no se pudo cargar la informacion del link de pago.
- El link `ZMzFzR` si cargo un checkout publico.

### Flujo visible en el link valido

En el checkout cargado se observaron estos pasos:

1. Resumen del producto:
   - nombre visible: `MATRICULA O PENSIONES 2023`
   - descripcion visible: `Link para pagos institucionales ano 2023 periodo academico de Febrero a Noviembre`
2. Captura del monto:
   - texto visible: `Cuanto vas a pagar?`
   - campo visible con placeholder tipo `$0`
3. Seleccion del medio:
   - texto visible: `Como quieres pagar?`
   - metodos visibles en el DOM del checkout:
     - `Transferencia Bancolombia`
     - `PSE`
4. Despliegue de informacion adicional del producto mediante una opcion de tipo `Ver mas`

### Implicaciones

- Wompi permite flujos donde el valor final lo define el pagador en la pasarela, no necesariamente en el catalogo del comercio.
- La arquitectura debe soportar `payment orders` con monto fijo y con monto definible por el usuario.
- Debemos soportar links vencidos, rotos o despublicados como caso de error real.

## Caso 2 - Flujo oficial de pago PSE en Bancolombia

La ayuda oficial de Bancolombia actualizada el `22 de mayo de 2025` describe el siguiente recorrido del pagador cuando un comercio ofrece `PSE Personas`:

1. El usuario selecciona `PSE Personas` en la pagina del comercio.
2. En la plataforma PSE define si es `persona natural` o `juridica`, escribe su correo y pulsa `Ir al Banco`.
3. El sistema redirecciona a la `Sucursal Virtual Personas`.
4. El usuario ingresa `usuario` y `Clave Principal`.
5. Luego digita `Clave Dinamica`.
6. Selecciona la cuenta a debitar.
7. Verifica la informacion.
8. Confirma y obtiene el comprobante.

### Implicaciones

- El comercio no controla la parte mas sensible del flujo.
- El `payer journey` contiene autenticacion bancaria y seleccion explicita de cuenta origen.
- Nuestro producto debe exponer estados de `handoff`, `autenticacion bancaria`, `esperando confirmacion` y `confirmado`.

## Caso 3 - Operacion bancaria del recaudador con Bancolombia

La documentacion empresarial de Bancolombia y su reglamento de recaudos muestran una vision muy util desde el lado del comercio:

- El recaudador puede consultar informacion del recaudo en `tiempo real`.
- La informacion restante puede consultarse al `dia habil siguiente`.
- En recaudos electronicos se publican `varios cortes durante el dia` y un `archivo consolidado al dia siguiente`.
- El `abono` puede ser `consolidado o detallado`.

### Implicaciones

- La conciliacion futura del proyecto no puede depender solo de webhooks.
- Necesitamos soportar al menos dos ritmos de reconciliacion:
  - `near real time`
  - `financial close / next day`

## Caso 4 - Patron de ePayco checkout

### Lo que publica ePayco

La documentacion y el help center de ePayco dejan ver este patron:

1. El cliente parte desde el comercio.
2. Se ingresa correo y datos iniciales para desplegar metodos disponibles.
3. El cliente elige el metodo de pago.
4. ePayco puede operar en `OnPage` o en `Standard Checkout`.
5. En `Standard Checkout`, el cliente es redirigido al checkout seguro de ePayco.
6. Luego del pago, existe:
   - `pagina de respuesta` para la experiencia del usuario
   - `pagina de confirmacion` para la verdad backend

### Lo que significa para el proyecto

- La capa de orquestacion debe tratar `response URL` como una capa UX y `confirmation URL` como una capa operativa.
- El proyecto debe ser capaz de reconstruir el resultado aunque el pagador cierre la pestana o no vuelva al comercio.

## Caso 5 - Flujo actual de Bre-B

El Banco de la Republica describe el flujo vigente de `Bre-B` asi:

1. El usuario entra a la `zona Bre-B` desde la app o sitio web de su entidad.
2. En `Pagos y transferencias` elige:
   - `Con Llave`
   - `Con codigo QR`
3. Si usa `Llave`, digita la llave del receptor y el monto.
4. Si usa `QR`, escanea el codigo; si es QR estatico, ingresa el monto.
5. El sistema muestra el `nombre enmascarado del receptor`.
6. El usuario confirma.

Adicionalmente, el Banco de la Republica publico el `13 de abril de 2026` que:

- Bre-B ya supera `34 millones` de usuarios registrados.
- Acumula mas de `670 millones` de transacciones.
- Ya hay `comercios` cobrando con `QR interoperable`.
- El siguiente paso esperado del sistema incluye `recaudos` y `dispersiones a proveedores y nomina`.

### Implicaciones

- `Bre-B` no debe modelarse como una simple transferencia bancaria adicional.
- El proyecto necesitara:
  - `key alias management`
  - `masked receiver validation`
  - `QR statico vs QR dinamico`
  - eventos de `payment created`, `payment accepted`, `payment settled` y `payment disputed` si el ecosistema/proveedor lo expone

## Casos de uso y UX que se desprenden

### Casos de exito

- Pago con monto fijo y medio de pago decidido desde el comercio.
- Pago con monto abierto decidido en el checkout del proveedor.
- Pago con handoff bancario y retorno correcto al comercio.
- Pago aprobado aunque el usuario no vuelva a la pagina del comercio.
- Pago en comercio fisico o semipresencial usando `Bre-B QR`.

### Casos de falla que deben quedar desde la base

- Link de pago expirado o invalido.
- Usuario abandona el flujo despues del handoff.
- Pago queda `pendiente` en el proveedor pero sin cierre final inmediato.
- Webhook no llega, llega duplicado o llega tarde.
- El usuario ve "pago enviado" pero el comercio aun no tiene confirmacion final.
- Un proveedor presenta incidente mientras el riel bancario sigue operativo.

## Requisitos funcionales derivados

1. Mostrar `estado del intento` y `estado final de la orden` por separado.
2. Permitir `reintento` solo cuando el proveedor y el medio lo permitan y el usuario siga en una ventana valida de reintento.
3. Guardar `snapshot` del checkout externo cuando sea posible para soporte y trazabilidad.
4. Exponer al comercio un historial de:
   - orden
   - intento
   - proveedor
   - medio de pago
   - hora de handoff
   - hora de confirmacion
5. Soportar metodos donde el pagador define el monto.
6. Soportar metodos donde el comercio define el monto y el usuario solo autoriza.

## Requisitos no funcionales derivados

1. Idempotencia fuerte en creacion de ordenes, recepcion de webhooks y cierre financiero.
2. Observabilidad de `handoff`, `timeout`, `return`, `callback`, `polling` y `statement match`.
3. Auditoria de UX para incidentes donde el usuario afirme haber pagado pero la orden no este cerrada.
4. Registro de `proof artifacts`:
   - referencias del proveedor
   - identificadores del banco
   - recibos
   - timestamps
   - estado del intento

## Recomendaciones de producto para nuestra futura pasarela

1. Incluir una `pantalla intermedia` antes del handoff que explique:
   - estas saliendo al banco/proveedor
   - no cierres la ventana
   - si algo falla, volveremos a consultar el estado
2. Incluir una `pantalla de estado` despues del retorno que no prometa exito si aun no existe confirmacion backend.
3. Incluir una opcion de `seguir consultando` y `notificar por correo/whatsapp` para pagos asincronos.
4. Modelar `metodos con monto abierto` como una familia propia de integracion.
5. Preparar la UX de `Bre-B` con los conceptos de `llave`, `QR`, `receptor enmascarado` y `confirmacion inmediata`.

## Fuentes usadas

- Wompi checkout publico observado el 2026-04-29:
  - https://checkout.wompi.co/l/ZMzFzR
  - https://checkout.wompi.co/l/3Z0Cfi
- Wompi Docs - Inicio rapido: https://docs.wompi.co/en/docs/colombia/inicio-rapido/
- Bancolombia - Como pagar con PSE: https://www.bancolombia.com/centro-de-ayuda/preguntas-frecuentes/como-pago-pse-bancolombia
- Bancolombia - Recaudo PSE: https://www.bancolombia.com/pagos/recaudo-pse
- Bancolombia - Recaudo sucursal virtual y telefonica: https://www.bancolombia.com/pagos/recaudo-sucursal-virtual-telefonica
- Bancolombia - Recaudos electronicos: https://www.bancolombia.com/empresas/productos-servicios/cash-management/recaudos/recaudos-electronicos
- Bancolombia - Reglamento de recaudos vigente a partir de agosto 2025: https://www.bancolombia.com/wcm/connect/e6cc0031-899f-497f-aba5-5c837367b8dc/Reglamento_de_Recaudos_Vigente_a_partir_de_agosto_2025.pdf?MOD=AJPERES
- ePayco Docs - Proceso de pagos: https://docs.epayco.com/docs/proceso-de-pagos
- ePayco Help Center - Proceso de pagos: https://ayuda.epayco.com/en/articles/32958-proceso-de-pagos
- ePayco Docs - Checkout general: https://docs.epayco.com/docs/checkout-general
- ePayco Docs - Descripcion general checkout: https://docs.epayco.com/docs/checkout-descripcion
- ePayco marketing - Checkout: https://epayco.com/checkout/
- Banco de la Republica - Como hacer un pago o transferencia con Bre-B: https://www.banrep.gov.co/es/bre-b/preguntas-frecuentes/como-puedo-hacer-pago-o-transferencia-con-bre-b
- Banco de la Republica - Documento tecnico Bre-B febrero 2026: https://www.banrep.gov.co/es/publicaciones-investigaciones/documentos-tecnicos-presentaciones/documento-bre-b-febrero-2026
- Banco de la Republica - Seis meses de operacion de Bre-B: https://www.banrep.gov.co/es/noticias/seis-meses-bre-b-acumula-34-millones-usuarios

