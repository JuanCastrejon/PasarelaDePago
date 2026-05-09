---
status: active
updated: 2026-05-09
supersedes:
  - docs/investigacion/pse-como-rail-principal-y-handoff-bancario1.md
---

# PSE como rail principal y handoff bancario 1

Fecha de corte: 2026-04-29

## Objetivo

Documentar `PSE` como metodo central de pagos en linea para Colombia, usando:

- documentacion oficial de `PSE / ACH Colombia`
- evidencia directa del flujo compartido por el usuario
- observacion del paso previo en `AvalPay Center`
- listado de entidades visibles en el selector compartido por el usuario

## Conclusiones ejecutivas

1. `PSE` debe tratarse en el proyecto como un `rail bancario principal`, no como un simple "metodo mas" del checkout.
2. El flujo real observado confirma una secuencia de `captura de contacto -> captura de identidad minima -> seleccion de entidad -> handoff a PSE -> handoff a la entidad -> challenge/autorizacion`.
3. El punto de no retorno real no es el boton inicial del comercio, sino el momento en que el usuario ya entro a la etapa de `autorizacion de su entidad`.
4. El ecosistema visible alrededor de PSE ya no es solo banca tradicional; el selector compartido incluye `bancos`, `fiduciarias`, `cooperativas`, `wallets`, `neobancos` y jugadores digitales.
5. Para una plataforma propia, `PSE` exige modelar al menos:
   - `payer identity capture`
   - `financial institution selection`
   - `PSE session`
   - `entity challenge step`
   - `timeout`
   - `CUS / reference tracking`
   - `merchant notification vs payer notification`

## Lo que dice la documentacion oficial de PSE

### Que es PSE

La pagina oficial de PSE lo define como el boton de `Pagos Seguros en Línea`, un servicio de `ACH Colombia` que permite a las empresas vender o recaudar por internet, mientras el usuario autoriza desde la banca virtual de su entidad el debito de fondos desde cuentas de ahorro, corrientes o depositos electronicos.

### Flujo oficial basico publicado

El brochure oficial de PSE resume el flujo asi:

1. El usuario entra al sitio del comercio.
2. Selecciona productos o servicios.
3. Liquida el pago.
4. Selecciona `PSE` como medio de pago.
5. Selecciona la `Entidad Financiera`.
6. Ingresa credenciales de autenticacion y autoriza el debito.
7. PSE informa a la entidad recaudadora y a la empresa el pago realizado.

### Tiempos y comportamiento general

La pagina oficial de personas publica:

- disponibilidad `24/7`
- notificacion del estado en el flujo de pago
- informacion en linea de recaudos para el negocio
- tiempo maximo de procesamiento de una transaccion: `21 minutos`

### Registro del usuario PSE

El centro de ayuda oficial publica hallazgos muy importantes:

- para usar PSE `no se requiere clave o usuario PSE`, sino `correo electronico registrado`
- `no` se puede pagar sin registrarse
- el registro solicita identificacion y datos de contacto
- PSE no pide informacion financiera ni de cuentas bancarias durante el registro
- el estado de la transaccion se envia por correo
- el `CUS` sirve para validar con comercio o entidad financiera

### Reversiones y soporte

El centro de ayuda publica que:

- si la transaccion aprobada no se refleja en el comercio, se valida con el comercio usando `CUS`
- si la transaccion llega rechazada pero hubo debito, se valida con la `Entidad Financiera` usando `CUS`
- la evaluacion de reverso o devolucion debe pasar por la entidad financiera segun el caso

## Evidencia directa del flujo compartido por el usuario

Las capturas compartidas por el usuario permiten reconstruir tres etapas muy claras del flujo real.

### Etapa 1 - Checkout del proveedor / comercio

En `AvalPay Center`, despues de identificar al pagador por correo, el flujo observado mostro:

- familia de pago seleccionada: `Cuentas débito ahorro y corriente (PSE)`
- selector de tipo de persona: `Personas`
- selector de entidad financiera
- formulario de `Datos del propietario`

Campos visibles o inferibles en esta etapa:

- nombre
- apellido
- tipo de documento
- numero de documento
- prefijo/pais
- numero de celular

Tambien se observan:

- boton `Pagar $359.300,00`
- boton `Atrás`
- opcion `No deseo continuar`
- countdown de expiracion de sesion

### Etapa 2 - Handoff a PSE

La siguiente captura muestra el dominio:

- `registro.pse.com.co`

y una pantalla de transicion con mensajes como:

- `Estamos procesando tu transacción`
- `Te estamos redireccionando a tu entidad financiera`

Esta capa es importante porque demuestra que el checkout del proveedor no va directo a la app del banco; existe una etapa intermedia del rail `PSE`.

### Etapa 3 - Challenge de la entidad financiera

La tercera captura muestra un challenge de la entidad seleccionada, en este caso con branding de `Nequi`, donde se solicita:

- una `clave dinámica` o codigo de verificacion
- countdown corto visible (`83` segundos en la captura)
- boton `Pagar con PSE`
- boton `Cancelar`

Esto confirma que, en la practica, el flujo tiene una etapa de `strong customer authorization` o validacion equivalente controlada por la entidad.

## Insight clave: por que el checkout pide correo primero

Al cruzar las capturas con la ayuda oficial de PSE, aparece una razon de producto muy fuerte:

- `AvalPay` pide el `correo` muy temprano.
- `PSE` usa el `correo registrado` como dato central del usuario.
- `PSE` envia al correo el estado de la transaccion y el `CUS`.

Esto significa que el correo no es solo un canal de notificacion del comercio; tambien es una pieza funcional del rail.

## Que nos enseña el selector de entidades compartido

El listado que compartiste muestra que el universo visible para el pagador no es solamente banca tradicional.

### Familias detectadas en el selector observado

- `Bancos tradicionales`
  - Bancolombia
  - Davivienda
  - Banco de Bogotá
  - Banco de Occidente
  - BBVA
  - Caja Social
  - Popular
  - AV Villas
- `Billeteras / depositos electronicos / challengers`
  - Nequi
  - Daviplata
  - dale!
  - Nu
  - Lulo Bank
  - RappiPay
  - Movii
  - Ualá
- `Cooperativas y financieras`
  - Coopcentral
  - CFA
  - Confiar
  - Cotrafa
  - Juriscoop
  - Crezcamos
- `Otros actores del ecosistema`
  - Fiduciarias
  - Global66
  - Bold CF
  - Powwi
  - PayCash

### Implicacion

Para la plataforma futura, `financial_institution` no debe modelarse como una tabla de "bancos" solamente. Debe ser una entidad mas amplia, algo como:

- `financial_entity`
- `entity_type`
  - bank
  - wallet
  - deposito_electronico
  - cooperative
  - fiduciary
  - fintech

## Lo que esto cambia en la arquitectura de nuestra pasarela

### 1. PSE necesita un subdominio de estados propio

No basta con `created / approved / declined`.

Como minimo, para `PSE` deberiamos pensar en:

- `checkout_session_created`
- `payer_contact_captured`
- `payer_identity_captured`
- `financial_entity_selected`
- `redirected_to_pse`
- `redirected_to_financial_entity`
- `entity_challenge_pending`
- `authorization_submitted`
- `approved`
- `rejected`
- `expired`
- `unknown_pending_reconciliation`

### 2. Hay varios puntos de timeout

La investigacion ya muestra minimo tres relojes potenciales:

- expiracion del `checkout session` del proveedor
- tiempo maximo de procesamiento del rail `PSE` (`21 minutos`)
- countdown del `challenge` de la entidad

### 3. El fallback no aplica igual despues del handoff

Una vez el usuario ya:

- selecciono entidad
- fue redirigido a `registro.pse.com.co`
- entro al challenge de su entidad

ya no tiene sentido un `failover silencioso` a otro proveedor como si nada hubiera pasado. A partir de ahi, lo correcto es:

- esperar cierre del intento
- consultar estado
- ofrecer reintento solo si el flujo termino en rechazo/timeout claro

### 4. Se necesita tracking del `CUS`

PSE usa el `CUS` como referencia de validacion posterior entre usuario, comercio y entidad financiera.

Por lo tanto nuestra plataforma deberia persistir algo equivalente a:

- `pse_cus`
- `provider_reference`
- `merchant_reference`
- `financial_entity_code`

### 5. El correo del pagador es un dato operativo

Para `PSE`, el correo debe modelarse como:

- `payer_contact_email`
- `pse_registered_email` si aplica
- canal de notificacion
- parte del soporte post-transaccion

## Relacion con AvalPay y con nuestro proyecto

`AvalPay Center` nos esta mostrando una implementacion muy util para imitar en ciertos puntos:

- resumen lateral fuerte
- captura progresiva de datos
- expiracion de sesion
- ruta de abandono
- transicion visible hacia el rail

Pero para nuestro proyecto, que quiere ser mas amplio, debemos ir mas alla y desacoplar:

- `checkout UX`
- `rail orchestration`
- `institution challenge`
- `payment truth`
- `settlement truth`

## Requisitos funcionales derivados

1. Permitir que un proveedor o rail capture `correo` antes del medio de pago final.
2. Soportar `tipo de persona` como parte de ciertos pagos bancarios.
3. Soportar `financial_entity` como categoria amplia, no solo banco.
4. Mostrar claramente cuando el usuario esta:
   - en el checkout
   - en PSE
   - en la entidad financiera
5. Conservar referencias visibles y comprobables para soporte:
   - referencia del comercio
   - referencia del proveedor
   - `CUS`
6. Registrar cancelacion y expiracion en cualquier etapa.

## Requisitos no funcionales derivados

1. Auditoria de handoffs entre dominios.
2. Capacidad de polling/consulta cuando no haya retorno limpio.
3. Correlacion completa entre `order`, `attempt`, `rail session` y `entity challenge`.
4. Backoffice capaz de distinguir:
   - rechazo en checkout
   - rechazo en rail
   - rechazo en entidad
   - timeout en challenge

## Modelo de datos sugerido

Agregar o reforzar:

- `payment_rail`
- `rail_session`
- `rail_session_expires_at`
- `financial_entity`
- `financial_entity_type`
- `payer_person_type`
- `payer_document_type`
- `payer_contact_phone`
- `payer_contact_email`
- `pse_cus`
- `authorization_channel`
- `challenge_status`

## Fuentes oficiales y evidencia usada

- PSE Persona: https://www.pse.com.co/persona/
- PSE Centro de ayuda personas: https://www.pse.com.co/persona-centro-de-ayuda
- Tu primer pago por PSE: https://www.pse.com.co/persona-tu-primer-pago-por-pse
- PSE Pasarela de pagos: https://www.pse.com.co/pasarela-de-pagos
- PSE Conexión directa: https://www.pse.com.co/conexi%C3%B3n-directa
- ACH Colombia - Productos y servicios: https://www.achcolombia.com.co/productos-y-servicios
- ACH Colombia - Disponibilidad del servicio: https://www.achcolombia.com.co/disponibilidad-del-servicio
- ACH Colombia - Reglamento de acceso: https://www.achcolombia.com.co/documents/1176249/5313778/Reglamento_de_acceso_2021__NoCopy.pdf/2f0e9888-36c1-3445-7fae-665376ca6010?t=1639520061212
- PSE - Brochure oficial: https://www.pse.com.co/documents/1176700/1193759/Brochure_pse.pdf/e2b0d8ed-dda7-279a-c9df-61687bddf81c?t=1637770867999
- Evidencia directa:
  - capturas compartidas por el usuario del flujo `AvalPay Center -> PSE -> entidad financiera`
  - listado de entidades visible en selector compartido por el usuario


