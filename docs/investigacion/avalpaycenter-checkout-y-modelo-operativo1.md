# AvalPay Center: checkout real y modelo operativo 1

Fecha de corte: 2026-04-29

## Objetivo

Analizar `AvalPay Center` como referencia real de una pasarela bancaria colombiana orientada a `recaudo`, usando:

- evidencia directa del checkout compartido por el usuario
- documentacion publica del portal de pagos y recaudadores
- terminos del portal de comercios AvalPay
- referencia secundaria de mercado aportada por el usuario

## Resumen ejecutivo

1. `AvalPay Center` no arranca mostrando de una vez los medios de pago; en el flujo real observado primero exige `correo del pagador`.
2. El checkout observado aplica un patron de `sesion transaccional con tiempo de expiracion`, `resumen lateral`, `dato de contacto inicial` y `abandono explicito`.
3. En la documentacion publica de `AvalPay`, el modelo para comercios ya distingue `Gateway` y `Agregador`, lo cual lo vuelve especialmente relevante para nuestro proyecto.
4. Aval publica una capa operacional clara para comercios: `cuenta de recaudo`, `consulta de transacciones`, `descarga de archivo de recaudo`, `reportes`, `exportables` y `dinero recaudado en tiempo real`.
5. El blog de `Rebill` que compartiste no debe usarse como fuente normativa, pero si refuerza algo importante: en Colombia la decision de pasarela depende tanto de `liquidacion` y `conciliacion` como de `metodos de pago`.

## Lo que aporta el blog de Rebill y como debemos usarlo

El blog [Las 11 mejores pasarelas de pago en Colombia](https://www.rebill.com/blog/pasarelas-pago-colombia) y la comparativa mas reciente de [pasarelas de pago en Colombia (2026)](https://www.rebill.com/blog/pasarelas-pago-colombia-1813a) sirven como referencia secundaria de mercado.

### Valor real del material

- Refuerza que la eleccion de proveedor no debe centrarse solo en "acepta tarjetas".
- Pone foco en `PSE`, `liquidacion`, `conciliacion`, `webhooks`, `reportes`, `contracargos` y `exportables`.
- Coincide con lo que ya estamos viendo en fuentes oficiales: el problema serio aparece en `backoffice`, no solo en el checkout.

### Limitaciones

- Es contenido authored por un proveedor.
- Mezcla comparativa con posicionamiento comercial.
- No reemplaza documentacion oficial, reglamentos ni terminos operativos.

### Decision metodologica

Lo vamos a usar como `radar de preguntas correctas`, no como fuente de verdad.

## Evidencia directa del checkout real compartido

Se inspecciono la URL:

- `https://checkout.avalpaycenter.com/spa/session/13510766/7748705dd5c52643b442988f7f221bad`

La inspeccion se realizo sin completar pago y sin enviar datos personales.

### Hallazgos observados en el HTML y la captura

El checkout resolvio correctamente y mostro:

- comercio: `Universidad del Magdalena`
- tipo de entorno visible en metadatos: `AVALPAY Checkout Prod`
- pantalla inicial con `input de correo`
- CTA principal: `Continuar`
- CTA secundaria: `No deseo continuar`
- resumen de pago en panel lateral

### Datos visibles en la sesion observada

- identificador visible de sesion/transaccion: `S13510766-T106`
- total a pagar: `$359.300,00 COP`
- concepto: `Derecho de Grado (Pregrado presencial)`
- referencia: `534391`
- fecha de solicitud visible: `2026-04-29 15:10:47`
- aviso de expiracion del proceso: `Tu proceso expirará en 11 minutos`

### Patron UX detectado

El flujo observado sigue esta estructura:

1. Logo del comercio.
2. Solicitud de `correo del pagador`.
3. Boton `Continuar`.
4. Ruta de abandono voluntario: `No deseo continuar`.
5. Panel persistente de resumen con:
   - total
   - concepto
   - referencia
   - fecha de solicitud
   - countdown de expiracion

### Que significa esto para nuestra arquitectura

- El correo no es un dato decorativo; hace parte del onboarding transaccional del pagador.
- La orden vive dentro de una `sesion con TTL`, no como una pantalla abierta sin control temporal.
- El resumen de la orden se mantiene visible antes del metodo de pago.
- El checkout contempla explicitamente el caso de `abandono`.

## Lo que no se hizo y por que

No se avanzo al siguiente paso del checkout.

Motivo:

- Para continuar era necesario `enviar un correo` a `AvalPay Center`.
- Eso constituye `transmision de un dato de contacto a un tercero`.
- Como no habia autorizacion especifica para remitir ese dato, la inspeccion se detuvo en la frontera segura.

Esto no bloquea la investigacion actual, porque el primer paso ya expone suficiente informacion de diseno y comportamiento.

## Hallazgos oficiales de AvalPay sobre operacion y recaudo

### Portal de comercios AvalPay

Los terminos del portal de comercios AvalPay indican:

- el portal esta pensado para comercios `bancarizados o no bancarizados`
- permite operar `sin sitio web propio`
- el comercio puede definir `una o varias cuentas de recaudo`
- para usar el portal se requiere `cuenta de recaudo` en una Entidad Aval
- el portal habilita funcionalidades progresivas de pago

### Funcionalidades de pago publicadas

En los terminos publicos aparecen al menos estas familias:

- `Pagos con QR`
- `Pasarela de Pagos`
- `Link de Pagos`
- `Micrositios`

### Modelos operativos publicados

Los terminos publicos distinguen:

- `Modelo Gateway`
- `Modelo Agregador`

En el material descargado del portal se observa, para `Modelo Gateway`:

- pasarela para cobros `no presentes`
- integracion por `SDK`
- uso complementario de `link de pagos`
- posibilidad de recibir pagos sin integrar el sitio si se usa link
- recepcion del dinero en la cuenta habilitada en Bancos Aval

Esto es especialmente valioso para nuestro proyecto porque confirma que el propio ecosistema Aval ya piensa la operacion en dos modelos financieros distintos.

## Hallazgos oficiales de AvalPay sobre backoffice y conciliacion

### Portal de recaudadores

La comunicacion publica de AvalPay para recaudadores afirma que el comercio puede:

- consultar todos los recaudos en el portal
- generar reportes de pagos recibidos
- exportar recaudos en diferentes estructuras para facilitar la conciliacion
- cargar archivos de recaudo
- consultar informacion en tiempo real del dinero recaudado

### FAQ publica del portal

La FAQ publica refuerza varios puntos:

- la empresa debe estar vinculada a un Banco Aval con `cuenta definida para abonar el recaudo`
- los clientes pueden pagar `24/7`
- el reporte de pagos recibidos se visualiza en `Consulta de Transacciones`
- tambien se puede descargar por `Descargar archivo de recaudo`
- el cargue de archivos de facturacion toma alrededor de `1 hora` para validacion de estructura

### Flujo publico del portal de pagos

En la explicacion publica `Como funciona`, AvalPay describe este recorrido:

1. Buscar servicio o empresa.
2. Digitar datos de pago.
3. Confirmar la informacion.
4. Pagar facil y seguro.
5. Recibir el comprobante.

Tambien publica que:

- la confirmacion del pago es `en linea`
- el comprobante llega al `correo`
- los medios de pago dependen del convenio
- medios publicados en la pagina general:
  - `Bancos Aval`
  - `PSE`
  - `Tarjeta de crédito`

## Comparacion con lo que venimos investigando

### Coincidencias con Wompi, PayU y ePayco

- El flujo real no empieza necesariamente con seleccion de medio de pago.
- El `correo` aparece temprano como parte del proceso de notificacion y cierre.
- Hay separacion entre `checkout de cara al usuario` y `reporteria/consulta del comercio`.
- La operacion del comercio depende de `reporte`, `consulta`, `archivo` y `cuenta de recaudo`, no solo del webhook.

### Diferencias interesantes de AvalPay

- La capa de `recaudo bancario` esta mas explicita que en varias pasarelas orientadas a startups.
- El lenguaje de `cuenta de recaudo`, `archivo de recaudo`, `estructuras de exportacion` y `portal recaudador` es muy bancario.
- El flujo observado de la universidad demuestra un checkout con fuerte control de `sesion`, `tiempo` y `referencia`.

## Implicaciones directas para nuestro proyecto

### Requisitos funcionales nuevos o reforzados

1. Soportar `sesiones de pago con expiracion`.
2. Permitir una etapa previa al metodo de pago para capturar `correo` u otros datos de contacto.
3. Mantener un `resumen lateral` o resumen fijo de la orden antes del pago.
4. Exponer una salida explicita de `abandono`.
5. Modelar `cuentas de recaudo` por proveedor o por rail bancario.
6. Soportar `descargas estructuradas` para conciliacion.
7. Soportar pagos con:
   - pasarela gateway
   - link de pago
   - QR
   - micrositio

### Requisitos no funcionales reforzados

1. TTL y expiracion de sesiones transaccionales.
2. Idempotencia entre `session`, `order` y `payment attempt`.
3. Auditabilidad del `estado de sesion`.
4. Exportables de conciliacion estables.
5. Trazabilidad entre:
   - referencia de negocio
   - referencia del proveedor
   - fecha de solicitud
   - fecha de pago
   - fecha de abono

### Modelo de datos sugerido

Ademas del modelo ya propuesto, esta investigacion refuerza agregar o explicitar:

- `checkout_session`
- `checkout_session_expires_at`
- `payer_contact_capture`
- `collection_account`
- `reconciliation_export_profile`
- `revenue_channel_type`:
  - `gateway`
  - `payment_link`
  - `microsite`
  - `qr`

## Hallazgo estrategico importante

`AvalPay Center` se acerca mucho mas a un modelo de `recaudo bancario estructurado` que a una simple pasarela de checkout embebible.

Eso lo vuelve un benchmark muy util para la parte de:

- `cuentas de recaudo`
- `conciliacion`
- `reportes`
- `archivos`
- `portal operativo del comercio`

En otras palabras: si queremos que el proyecto se vea serio y enterprise en tu portafolio, debemos estudiar no solo a las pasarelas "developer-friendly", sino tambien a este tipo de soluciones con sabor a `cash management`.

## Fuentes oficiales y de apoyo usadas

- Checkout real observado: https://checkout.avalpaycenter.com/spa/session/13510766/7748705dd5c52643b442988f7f221bad
- AvalPay Center - Terminos y condiciones portal de comercios: https://pasarela.avalpaycenter.com/assets/shell/legal/TerminosYCondicionesAvalPay31012025.pdf
- Portal de recaudadores - ¿Por qué elegirnos?: https://recaudadores.avalpaycenter.com/wps/portal/portal-de-recaudadores/web/pagos-aval/porque-elegirnos
- Portal de recaudadores - Preguntas frecuentes: https://recaudadores.avalpaycenter.com/wps/portal/portal-de-recaudadores/web/pagos-aval/preguntas-frecuentes/
- Portal de pagos - ¿Cómo funciona?: https://recaudadores.avalpaycenter.com/wps/portal/portal-de-pagos/web/banco-popular/como-funciona/%21ut/p/a1/lZLPDoIwDIefxSegjG6R46YGcOJC-CPuYjiZJYoejM_v0HiAxRl6a_J9adNfAx20ge67pzl3D3Pru8vQa3ZaxpRlCESqnK6BM16kOxZCJsECRwvAj-Iw8bGwflanIqEiAvX1PcDYl3sOfINFpUqEhERTP6lQWF-WJBUyhJJ6_YY6PsbM-ipfNU0dAuBcfzyf4Mz9XcDjqy3x-wMwb38X-JP_IdBjZHKBFTqAe-I34Psh74ghZC9gU7hf60-1YDLDFy8Nk6Ue/?uri=nm%3Aoid%3AZ6_8956I402KOKNA0AE4QTOS40845
- Rebill - Guía 2026: https://www.rebill.com/blog/pasarelas-pago-colombia
- Rebill - Comparativa 2026: https://www.rebill.com/blog/pasarelas-pago-colombia-1813a

