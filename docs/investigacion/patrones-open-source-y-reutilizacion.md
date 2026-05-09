---
status: active
updated: 2026-05-09
supersedes:
  - docs/investigacion/patrones-open-source-y-reutilizacion1.md
---

# Patrones Open Source y Reutilizacion v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Este documento resume que si vale la pena reutilizar de repositorios publicos de GitHub y que no.

La idea no es copiar codigo suelto, sino identificar:

- patrones de diseno
- adaptadores utiles
- SDKs validos
- limites claros del open source disponible

## 2. Hallazgo principal

La comunidad publica muestra mucha energia en:

- SDKs
- wrappers
- plugins de eCommerce
- paquetes de integracion por proveedor

Pero muestra bastante menos madurez en:

- payment orchestration real
- payouts multiproveedor
- conciliacion transversal
- compliance operativo
- merchant onboarding serio

Implicacion:

- si reutilizaremos bastante software existente
- pero la capa que vuelve serio al producto seguira siendo propia

## 3. Repos revisados y lecciones

## 3.1 `IGedeon/laravel-wompi`

Valor:

- encapsula `Wompi Web Checkout`
- modela estados finales de transaccion
- incluye webhook con verificacion de firma
- expone utilidades de merchant info e integridad

Lo reusable:

- tratamiento formal de `APPROVED`, `DECLINED`, `VOIDED`, `ERROR`
- separar DTOs, enums y excepciones
- exponer `raw payload` para auditoria

Limite:

- resuelve integracion con un solo proveedor
- no resuelve routing ni reconciliacion multiproveedor

## 3.2 `korozcolt/payments`

Valor:

- propone una interfaz unificada para `Wompi`, `MercadoPago` y `ePayco`
- usa arquitectura por `drivers`
- permite configuracion por base de datos o config
- centraliza webhooks por proveedor

Lo reusable:

- `driver architecture`
- `payment result DTO`
- activacion de proveedores y credenciales por configuracion
- eventos internos como punto de extension

Limite:

- no resuelve failover serio
- no resuelve payout orchestration
- no documenta taxonomia de errores ni puntos de no retorno

## 3.3 `epayco/epayco-node`

Valor:

- evidencia amplitud funcional real del ecosistema `ePayco`
- cubre `customers`, tokenizacion, cobros, `PSE`, efectivo, `Daviplata`, planes, suscripciones y `split`
- deja claro el rol de `url_response` y `url_confirmation`

Lo reusable:

- parametros concretos por metodo
- evidencia de amplitud de `split payments`
- confirmacion de que `ePayco` es fuerte en recurrentes y metodos locales

Limite:

- es un SDK, no una arquitectura de plataforma
- no resuelve idempotencia transversal ni conciliacion comun

## 3.4 `damolaajayi/payments-orchestration-dotnet`

Valor:

- buen ejemplo de `clean architecture`
- usa `outbox / inbox`
- separa `Api`, `Domain`, `Application`, `Infrastructure`, `Providers`, `Worker`
- trata webhooks, retries y reconciliacion como procesos de background

Lo reusable:

- separar `execution` de `worker processing`
- tratar `idempotency` como parte del dominio y no solo de HTTP
- usar observabilidad y eventos de dominio desde el inicio

Limite:

- no esta centrado en Colombia
- no modela rails como `PSE`, `Bre-B`, `Nequi` o `payouts` locales

## 3.5 `juspay/hyperswitch`

Valor:

- referencia mayor para routing, adapters y retries

Lo reusable:

- conectores formales
- motor de ruteo
- reconciliacion desacoplada
- criterio de `smart retries`

Limite:

- su complejidad completa no debe copiarse tal cual
- no reemplaza investigacion local colombiana

## 3.6 `killbill/killbill`

Valor:

- referencia fuerte para extensibilidad a largo plazo

Lo reusable:

- no mezclar billing con payment processing
- pensar en plugins y modulos desde temprano

Limite:

- no esta optimizado para los rails colombianos que queremos priorizar

## 4. Patrones reutilizables recomendados

1. `Provider adapters` separados por paquete o modulo.
2. `Payment order` desacoplada del proveedor.
3. `Payment attempt` como unidad de envio real.
4. `Provider events` almacenados de forma cruda e inmutable.
5. `Internal events` o domain events para desacoplar negocio de integracion.
6. `Background workers` para webhook processing, retries y reconciliacion.
7. `Capability matrix` por proveedor, ambiente y metodo.
8. `Driver registry` o `provider registry` configurable.

## 5. Cosas que NO debemos copiar tal cual

1. SDKs que mezclan UI, logica de negocio y llamadas al proveedor.
2. Ejemplos que actualizan ordenes solo con la redireccion del navegador.
3. Integraciones que no almacenan payload crudo del webhook.
4. Plugins que exponen credenciales o dependen por completo de variables de entorno globales.
5. Wrappers que asumen una sola cuenta, un solo comercio y un solo ambiente.

## 6. Backlog de reutilizacion tecnica

1. Crear una carpeta futura de `providers` con adaptadores por proveedor.
2. Definir interfaces comunes para `charge`, `refund`, `payout`, `query`, `webhook validation`.
3. Disenar `normalized provider errors`.
4. Disenar `provider capabilities`.
5. Disenar `provider account state` por comercio.
6. Disenar reglas de webhook ingestion y worker processing.

## 7. Conclusion

Lo open source disponible ya nos ahorra mucho trabajo en:

- entender payloads
- validar firmas
- integrar SDKs
- reconocer metodos y parametros

Pero no resuelve el verdadero valor del proyecto:

- continuidad operativa
- trazabilidad multiproveedor
- onboarding serio
- payouts confiables
- visibilidad y control de riesgo

## 8. Fuentes

- `IGedeon/laravel-wompi`:
  [https://github.com/IGedeon/laravel-wompi](https://github.com/IGedeon/laravel-wompi)
- `korozcolt/payments`:
  [https://github.com/korozcolt/payments](https://github.com/korozcolt/payments)
- `epayco/epayco-node`:
  [https://github.com/epayco/epayco-node](https://github.com/epayco/epayco-node)
- `damolaajayi/payments-orchestration-dotnet`:
  [https://github.com/damolaajayi/payments-orchestration-dotnet](https://github.com/damolaajayi/payments-orchestration-dotnet)
- `juspay/hyperswitch`:
  [https://github.com/juspay/hyperswitch](https://github.com/juspay/hyperswitch)
- `killbill/killbill`:
  [https://github.com/killbill/killbill](https://github.com/killbill/killbill)

