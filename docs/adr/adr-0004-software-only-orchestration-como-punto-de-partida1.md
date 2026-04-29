# ADR-0004 - Software-only orchestration como punto de partida

Fecha: 2026-04-29
Estado: aceptado

## Contexto

La investigacion de onboarding, compliance y operacion para terceros mostro que intentar comenzar como agregador financiero o custodio de fondos elevaria de forma fuerte la complejidad operativa, contractual y regulatoria del proyecto.

## Decision

El proyecto comenzara bajo un modelo `software-only orchestration`:

- los comercios usaran sus propias cuentas o habilitaciones con proveedores
- la plataforma construira la capa de routing, observabilidad, payouts, soporte y conciliacion
- no se asumira desde el inicio la operacion centralizada de fondos de terceros

## Consecuencias

### Positivas

- menor friccion inicial
- mas claridad de alcance
- arquitectura reusable y defendible

### Costos

- onboarding comercial menos instantaneo
- menos control centralizado del settlement

## Implicaciones directas

- deben modelarse `merchant_provider_accounts`
- el producto debe soportar activaciones por comercio
- el backlog no debe suponer cuentas maestras como punto de partida

## Documentos relacionados

- [modelos-operativos-y-onboarding-para-terceros1.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/investigacion/modelos-operativos-y-onboarding-para-terceros1.md)
- [vision-y-alcance-del-producto1.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/vision-y-alcance-del-producto1.md)
