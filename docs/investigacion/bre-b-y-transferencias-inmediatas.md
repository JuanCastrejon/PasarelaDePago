---
status: active
updated: 2026-05-09
supersedes:
  - docs/investigacion/bre-b-y-transferencias-inmediatas1.md
---

# Bre-B y Transferencias Inmediatas v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Este documento profundiza la investigacion de `Bre-B` como capacidad de producto y no solo como metodo de pago aislado.

Complementa:

- [plan-implementacion-pasarela-colombia.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/plan-implementacion-pasarela-colombia.md)
- [orquestacion-failover-y-bre-b.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/arquitectura/orquestacion-failover-y-bre-b.md)

## 2. Hechos confirmados a la fecha

### 2.1 Estado real de Bre-B

La evidencia oficial del Banco de la Republica confirma que `Bre-B` ya opera como infraestructura viva y masiva:

- el `23 de septiembre de 2025` entro en funcionamiento la interoperabilidad plena del sistema
- el `13 de abril de 2026` el Banco reporto mas de `34 millones de usuarios registrados`
- en esa misma fecha se reportaron mas de `670 millones de transacciones`, mas de `105 billones de pesos` movilizados y mas de `103 millones de llaves registradas`

Implicacion:

- el proyecto debe tratar `Bre-B` como requerimiento de primera clase
- no debe modelarse como una capacidad hipotetica de largo plazo

### 2.2 Restricciones funcionales relevantes

Las FAQ oficiales y la documentacion publica ya dejan ver reglas de negocio importantes:

- el valor maximo por transaccion en `2026` es de `COP 12.110.000`
- cada entidad financiera puede imponer montos menores, limites diarios y controles adicionales de seguridad
- `Bre-B` usa `llaves` para recibir pagos y tambien `QR`
- los comercios pueden usar `QR` desde el inicio de la operacion
- las personas naturales pueden usar `QR` a partir del `primer semestre de 2026`

Implicacion:

- el dominio del proyecto necesita modelar `llaves`, `QR`, `limites por entidad` y `expiracion de sesion`

### 2.3 Casos de uso que vienen creciendo

El Banco de la Republica ya habla de siguientes frentes de evolucion del sistema:

- pagos en comercios
- pagos electronicos entre empresas
- recaudos
- dispersiones a proveedores
- dispersiones de nomina

Implicacion:

- la vision del proyecto encaja con la direccion real del ecosistema colombiano
- `Bre-B` no solo impacta checkout; tambien impacta `B2B`, `payouts` y futuros casos de recaudo

## 3. Lo que Bre-B cambia dentro del producto

## 3.1 Ya no basta con modelar "transferencia bancaria"

`Bre-B` no debe mezclarse sin mas con:

- `PSE`
- `Boton Bancolombia`
- `Bancolombia QR`
- transferencias ACH tradicionales

Cada uno tiene UX, tiempos, confirmacion y restricciones distintas.

## 3.2 El metodo tiene fuerte dependencia de la experiencia del usuario

En `Bre-B` el pagador normalmente:

- escanea un `QR`, o
- usa una `llave`, o
- continua el flujo desde su aplicacion bancaria o billetera

Esto significa que el producto debe asumir:

- consentimiento explicito del usuario
- pasos fuera de nuestro frontend
- confirmacion asincrona
- expiracion o abandono del flujo

## 3.3 El metodo nace con vocacion de continuidad 24/7

La narrativa oficial de `Bre-B` gira alrededor de pagos y transferencias al instante, sin importar dia u hora.

Implicacion:

- la plataforma debe diferenciar disponibilidad teorica del rail de disponibilidad real del proveedor
- un proveedor "activo" puede seguir degradado por limites, incidentes o activaciones comerciales faltantes

## 4. Mapa de proveedores a 2026-04-29

## 4.1 PayU

`PayU` es, hasta donde llega la evidencia oficial revisada, el proveedor con soporte publico mas claro para `Bre-B QR` en Colombia:

- documenta `Bre-B QR` en `Payments API - Colombia`
- lo presenta como disponible en `Aggregator Model`, `Web Checkout`, `API Integration` y `Payment Link`
- indica que el `QR` se genera como imagen `base64`, `PNG`, de `158x158 px`
- indica expiracion de `15 minutos`
- indica que, al completarse, los fondos llegan de inmediato a la cuenta virtual PayU
- lista el parametro de metodo `REDEBAN_INTEROPERABLE_QR`

Implicacion:

- `PayU` debe seguir como proveedor prioritario para la capa `Bre-B`
- la plataforma debe contemplar UX diferenciada para `PC` y `movil` al generar `QR`

## 4.2 Wompi

La documentacion publica revisada de `Wompi` para Colombia lista metodos como:

- tarjetas
- `Bancolombia Transfer`
- `Nequi`
- `PSE`
- `Bancolombia QR`
- `Daviplata`
- `PCOL`
- `BNPL Bancolombia`

Tambien documenta que sus transacciones se resuelven de forma asincrona y recomienda `long polling` hasta estado final.

Sin embargo, en la evidencia oficial revisada en esta iteracion:

- no aparecio un metodo publico llamado `Bre-B`
- no aparecio una integracion publica oficial de `Bre-B QR`

Implicacion:

- `Bancolombia QR` debe tratarse como capacidad propia y no como sinonimo de `Bre-B`
- `Wompi` sigue siendo fuerte en metodos locales, pero su soporte oficial publico de `Bre-B` debe marcarse como `no confirmado`

## 4.3 ePayco

En la documentacion oficial revisada de `ePayco` durante esta iteracion:

- la fortaleza visible sigue estando en checkout, confirmacion asincrona y ecosistema local
- no se encontro evidencia oficial publica de soporte `Bre-B`

Implicacion:

- `ePayco` no debe entrar al roadmap de `Bre-B` hasta tener confirmacion documental actual

## 4.4 Mercado Pago

En la evidencia publica revisada para esta iteracion:

- no se encontro soporte oficial documentado para `Bre-B` en Colombia

Implicacion:

- `Mercado Pago` puede seguir siendo referencia regional, pero no debe asumirse como rail `Bre-B`

## 5. Requisitos funcionales derivados

1. La matriz de capacidades debe distinguir entre `supports_breb_qr`, `supports_breb_key`, `supports_bank_qr` y `supports_pse`.
2. El checkout debe soportar experiencia `desktop` y `mobile` para `QR`.
3. La orden de pago debe poder guardar `qr_expires_at`, `qr_payload_type`, `payer_instruction_set` y `llave_type` cuando aplique.
4. El sistema debe soportar estados internos distintos para `QR generado`, `pendiente de accion del usuario`, `expirado`, `confirmado` y `fallido`.
5. El sistema no debe hacer `silent fallback` una vez el usuario ya recibio un `QR` o ya inicio un flujo fuera de banda.
6. El sistema debe permitir reemitir un `QR` o reiniciar el intento bajo reglas claras de expiracion.
7. El catalogo de metodos no debe ocultar la diferencia entre rail interoperable y rail bancario privado.

## 6. Riesgos de producto

### Riesgo 1 - Confundir "QR bancario" con "Bre-B"

Si modelamos ambos como el mismo metodo:

- la UI sera enganosa
- el fallback sera incorrecto
- la trazabilidad regulatoria sera pobre

### Riesgo 2 - Asumir fallback automatico

En `Bre-B`, el usuario participa activamente en el flujo. Por eso:

- no se puede duplicar el intento silenciosamente despues de emitir un `QR`
- el fallback automatico debe limitarse a etapas previas a la exposicion del medio al usuario

### Riesgo 3 - Ignorar activacion comercial

Algunos proveedores no exponen todos los metodos por defecto.

Por tanto:

- el dominio necesita una diferencia clara entre `soportado por proveedor` y `habilitado para el comercio`

## 7. Backlog de investigacion especifico

1. Confirmar si algun proveedor adicional a `PayU` ya expone `Bre-B` de manera oficial y publica.
2. Investigar estados, reversos y conciliacion especifica de `Bre-B QR`.
3. Definir si la capa futura de payouts debe modelar `Bre-B` como rail de dispersion inmediata o como fase posterior.
4. Investigar si existen diferencias regulatorias u operativas entre `QR` para comercio y `QR` para persona natural dentro del producto.

## 8. Conclusiones operativas

- `Bre-B` ya no puede quedar fuera del nucleo del producto.
- `PayU` hoy es la referencia oficial mas clara para integrarlo de forma documentada.
- `Wompi` no debe descartarse, pero tampoco debemos adjudicarle soporte `Bre-B` sin evidencia oficial actual.
- la arquitectura debe separar `metodo`, `rail`, `proveedor` y `UX de consentimiento`.

## 9. Fuentes

- Banco de la Republica - Bre-B:
  [https://www.banrep.gov.co/es/bre-b](https://www.banrep.gov.co/es/bre-b)
- Banco de la Republica - Que es Bre-B / FAQ:
  [https://www.banrep.gov.co/es/bre-b/que-es](https://www.banrep.gov.co/es/bre-b/que-es)
- Banco de la Republica - Seis meses de operacion:
  [https://www.banrep.gov.co/es/noticias/seis-meses-bre-b-acumula-34-millones-usuarios](https://www.banrep.gov.co/es/noticias/seis-meses-bre-b-acumula-34-millones-usuarios)
- Banco de la Republica - Nuevas medidas regulatorias en Bre-B:
  [https://www.banrep.gov.co/es/noticias/breb-b-novedades-regulatorias](https://www.banrep.gov.co/es/noticias/breb-b-novedades-regulatorias)
- PayU Payments API - Colombia:
  [https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-colombia.html](https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-colombia.html)
- PayU Payment Methods by Country:
  [https://developers.payulatam.com/latam/en/docs/getting-started/select-your-payment-method.html](https://developers.payulatam.com/latam/en/docs/getting-started/select-your-payment-method.html)
- Wompi metodos de pago:
  [https://docs.wompi.co/docs/colombia/metodos-de-pago/](https://docs.wompi.co/docs/colombia/metodos-de-pago/)



