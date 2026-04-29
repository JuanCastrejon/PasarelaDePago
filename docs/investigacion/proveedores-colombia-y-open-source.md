# Proveedores Colombia y Open Source

Fecha de actualizacion: 2026-04-29

## 1. Objetivo de esta investigacion

Este documento responde cuatro preguntas:

1. Que medios y capacidades existen hoy en proveedores relevantes para Colombia.
2. Que proveedor conviene usar para cada parte del producto.
3. Que patrones tecnicos ya resolvio la comunidad open source.
4. Que no debemos asumir sin documentacion oficial vigente.

## 2. Contexto de mercado actual

### 2.1 Bre-B ya no es una idea futura

De acuerdo con el Banco de la Republica, `Bre-B` es el sistema interoperado de pagos inmediatos de Colombia. La pagina oficial de abril de 2026 ya habla de `seis meses de operacion`, por lo que su operacion plena comenzo alrededor de `octubre de 2025`. El mismo sitio oficial indica:

- los comercios pueden usar codigos QR desde el inicio de operacion de Bre-B
- las personas naturales pueden usar codigos QR desde el primer semestre de 2026
- el sistema esta pensado para pagos y transferencias inmediatas interoperables

Implicacion para el proyecto:

- `Bre-B` debe tratarse como requerimiento de primera clase, no como feature futura opcional
- no basta con soportar `PSE`; el producto debe modelar pagos inmediatos interoperables

### 2.2 No todo proveedor publica lo mismo

Durante la investigacion vimos un patron claro:

- algunos proveedores documentan muy bien los medios de entrada pero poco las dispersiones
- otros documentan bien payouts pero no dejan claro smart failover o comportamiento ante caidas
- algunos soportes aparecen en repos publicos o snippets, pero no en documentacion oficial vigente

Regla de investigacion:

- nunca marcar un metodo como `soportado` si no aparece de forma suficientemente clara en la documentacion oficial actual del proveedor o en una confirmacion comercial/documental reciente

## 3. Matriz resumida de proveedores

## 3.1 Wompi

### Capacidades confirmadas

- tarjetas
- PSE
- Nequi
- Boton / QR Bancolombia
- Daviplata
- acceptance tokens obligatorios
- tokenizacion y payment sources
- webhooks verificables
- payouts / pagos a terceros
- pagos inmediatos, programados o recurrentes en payouts
- soporte de idempotencia en payouts
- multiples cuentas origen
- control dual y roles para payouts

### Capacidades importantes para la arquitectura

- permite construir una primera capa fuerte de `payments + payouts`
- tiene sandbox para pagos y para payouts
- expone consultas de cuentas, bancos, limites, lotes y transacciones

### Observaciones criticas

- la documentacion actual revisada no publica `Bre-B` como metodo standalone
- no debemos inferir que `Bancolombia QR` equivale automaticamente a `Bre-B`
- sus payouts muestran una fuerte orientacion a operacion interna y empresarial, lo cual es positivo para el proyecto

### Rol recomendado en el producto

- `proveedor principal` para pagos y primeras dispersiones

## 3.2 PayU

### Capacidades confirmadas

- tarjetas
- `QR Bre-B`
- PSE
- Google Pay
- Nequi
- Boton Bancolombia
- efectivo o referencia bancaria
- payouts en Colombia
- payouts con cuentas `Nequi`

### Capacidades importantes para la arquitectura

- es el proveedor mas claramente alineado con `Bre-B` en la documentacion oficial revisada
- ofrece un perfil enterprise util para redundancia y cobertura
- soporta notificacion por `notifyUrl` y consulta de transacciones

### Observaciones criticas

- `Payouts` es un servicio bajo demanda y depende de analisis de riesgo y seguridad
- la funcionalidad publica de pagos recurrentes aparece `descontinuada` y la propia documentacion remite a tokenizacion como camino actual

### Rol recomendado en el producto

- `proveedor principal o secundario` para Bre-B
- `proveedor de respaldo` para continuidad operativa
- `proveedor fuerte de payouts`

## 3.3 ePayco

### Capacidades confirmadas

- mas de 22 medios de pago
- checkout
- tokenizacion
- customers
- planes
- suscripciones
- PSE
- cash
- Daviplata
- split payments / pagos divididos
- webhook / URL de confirmacion confiable

### Capacidades importantes para la arquitectura

- es fuerte para marketplaces y distribucion de pagos
- su SDK Node publico cubre buena parte de los flujos utiles para una plataforma propia
- sirve como tercera capa de cobertura

### Observaciones criticas

- la `response` page no es fuente confiable de verdad
- la URL de confirmacion si debe considerarse la fuente valida
- en la investigacion actual no encontramos documentacion oficial vigente que anuncie `Bre-B` como metodo expuesto

### Rol recomendado en el producto

- `proveedor secundario o terciario`
- cobertura amplia de medios
- split payments y suscripciones

## 3.4 Mercado Pago

### Capacidades confirmadas

- SDK oficial Node.js
- webhooks
- preferencia de pago y redirect checkout
- refunds
- enfoque regional fuerte

### Observaciones criticas

- no es la mejor primera apuesta para foco 100% Colombia
- si es muy util como benchmark de integracion, webhook y expansion regional

### Rol recomendado en el producto

- `benchmark tecnico`
- `proveedor futuro de expansion`

## 4. Hallazgos open source que si aportan al proyecto

## 4.1 Hyperswitch

Repositorio:

- `https://github.com/juspay/hyperswitch`

Lo mas valioso que aporta como referencia:

- arquitectura modular de conectores
- ruteo inteligente
- smart retries
- vault
- reconciliacion
- capas de configuracion por proveedor
- separacion clara entre request mapping, response mapping, errores y capacidades

Lecciones reutilizables:

- cada proveedor debe vivir detras de un `adapter`
- el mapeo de estados del proveedor a estados internos debe estar aislado
- el failover no es una simple lista: necesita clasificacion de errores y elegibilidad de retry
- payouts y payments deben modelarse como dominios conectados pero distintos

## 4.2 Kill Bill

Repositorio:

- `https://github.com/killbill/killbill`

Lo mas valioso que aporta como referencia:

- modularidad
- billing y payments desacoplados
- extensibilidad via plugins
- reporting y analitica de larga vida

Lecciones reutilizables:

- separar `payments core` de `billing/subscriptions`
- evitar acoplar el dominio comercial al detalle del proveedor
- disenar pensando en versionamiento de reglas y crecimiento del producto

## 4.3 MercadoPago API template

Repositorio:

- `https://github.com/proyecto26/mercadopago-api`

Lo mas valioso que aporta como referencia:

- uso explicito de `notification_url`
- claridad entre redirect UX y webhook backend
- nota operacional sobre reintentos de notificaciones

Lecciones reutilizables:

- el webhook debe responder 200/201 rapido
- el usuario puede ver una pagina final sin que el estado final este consolidado
- hay que modelar intentos, notificaciones y consultas asincronas

## 4.4 SDKs y plugins locales

Repositorios utiles:

- `https://github.com/epayco/epayco-node`
- `https://github.com/saulmoralespa/payment-integration-wompi`
- `https://github.com/saulmoralespa/n8n-nodes-wompi`
- `https://github.com/germanescobar/epayco-nodejs`

Lo que aportan:

- payloads reales
- parametros obligatorios
- nombres de campos usados por la comunidad
- flujos de tokenizacion, customers, subscriptions y confirmation urls

## 5. Hallazgos que cambian el plan tecnico

## 5.1 Bre-B obliga a un modulo de capacidades por proveedor

No todos los proveedores soportan los mismos metodos. Por eso el sistema necesita una tabla o config de `provider capability matrix` por:

- pais
- ambiente
- metodo
- direccion del flujo (`pay-in` o `payout`)
- requiere redireccion
- requiere QR
- requiere consentimiento del usuario
- soporta retry silencioso

## 5.2 Payout necesita modelado propio

Las dispersiones no son un anexo del cobro. Requieren:

- beneficiarios
- cuentas destino
- lotes
- aprobacion
- origen de fondos
- limites
- conciliacion
- retries

## 5.3 Failover no puede ser ciego

Hay tres tipos distintos de problema:

- `provider outage`
- `technical failure recoverable`
- `business decline`

Solo los dos primeros son candidatos a retry o fallback automatico, y no siempre en todos los medios.

## 6. Decisiones provisionales recomendadas

### Pagos

- `Wompi` primero para tarjetas, PSE, Nequi y flujos locales
- `PayU` segundo para Bre-B y respaldo multi-metodo
- `ePayco` tercero para cobertura y split

### Payouts

- `Wompi Pagos a terceros` primero
- `PayU Payouts` segundo

### Recurrentes

- `Wompi` y `ePayco` tienen mejor posicion actual en la investigacion publica que `PayU`

## 7. Incertidumbres que deben seguir investigandose

- condiciones exactas de activacion comercial para payout en cada proveedor
- diferencias reales entre soporte Bre-B QR y otros QR bancarios
- tiempos de settlement y conciliacion por metodo
- politicas de devolucion y reverso por proveedor y por metodo
- webhooks y deduplicacion en escenarios de reintento masivo

## 8. Fuentes

- Banco de la Republica - Bre-B:
  `https://www.banrep.gov.co/es/bre-b`
- Banco de la Republica - Que es Bre-B:
  `https://www.banrep.gov.co/es/bre-b/que-es`
- Wompi pagos a terceros:
  `https://docs.wompi.co/docs/colombia/introduccion-pagos-a-terceros/`
- Wompi que es pagos a terceros:
  `https://docs.wompi.co/docs/colombia/que-es-pagos-a-terceros/`
- Wompi consultas y operaciones:
  `https://docs.wompi.co/docs/colombia/consultas-y-operaciones/`
- Wompi metodos de pago:
  `https://docs.wompi.co/en/docs/colombia/metodos-de-pago/`
- PayU API de pagos Colombia:
  `https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-colombia.html`
- PayU payouts servicio:
  `https://developers.payulatam.com/latam/es/docs/services/payouts.html`
- PayU API de payouts:
  `https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payouts-api.html`
- ePayco checkout respuesta y confirmacion:
  `https://docs.epayco.com/docs/checkout-respuesta-y-confirmacion`
- ePayco overview:
  `https://docs.epayco.com/docs/que-es-epayco`
- Hyperswitch:
  `https://github.com/juspay/hyperswitch`
- Kill Bill:
  `https://github.com/killbill/killbill`
