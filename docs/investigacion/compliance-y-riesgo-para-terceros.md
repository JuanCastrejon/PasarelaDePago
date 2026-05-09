---
status: active
updated: 2026-05-09
supersedes:
  - docs/investigacion/compliance-y-riesgo-para-terceros1.md
---

# Compliance y Riesgo para Operar con Terceros v1

Fecha de actualizacion: 2026-04-29

## 1. Objetivo

Este documento captura riesgos y obligaciones de alto nivel para el día en que `PasarelaDePago` deje de ser solo laboratorio técnico y empiece a prestar servicio a terceros.

No constituye asesoría legal. Sirve para:

- reducir sorpresas de diseño
- orientar requisitos futuros
- preparar preguntas correctas para abogado, contador y compliance

## 2. Lo que ya es claramente exigible por diseño

## 2.1 Protección de datos personales

La SIC recuerda que la Ley 1581 de 2012 aplica a datos personales registrados en bases de datos susceptibles de tratamiento en territorio colombiano por entidades públicas o privadas.

Implicacion técnica:

- el proyecto debe nacer con inventario de datos personales
- debe haber base legal de tratamiento y política de privacidad
- debe existir separación entre datos personales, datos financieros y credenciales
- debemos poder atender corrección, actualización y supresión cuando aplique

## 2.2 Seguridad en pasarelas y relación con entidades vigiladas

La Superfinanciera, en su publicación del `5 de junio de 2018`, indicó que la Circular Externa 008 de 2018 estableció requerimientos mínimos de seguridad y calidad para operaciones a través de pasarelas de pago.

En sus FAQ, la misma entidad enumera obligaciones relevantes para establecimientos de comercio o administradores de pasarelas de pago cuando operan con entidades vigiladas, incluyendo:

- política de tratamiento y protección de datos personales
- políticas y procedimientos de prevención y control de LA/FT
- campañas informativas de seguridad
- información al consumidor sobre cómo se realiza el procedimiento de pago
- verificación al menos anual de la vigencia de la certificación `PCI-DSS`

Implicacion técnica:

- no almacenar PAN ni CVV
- usar tokenización del proveedor
- mantener documentación de seguridad y de flujo de pago
- prever trazabilidad de incidentes y controles de acceso

## 2.3 Riesgo LA/FT y SAGRILAFT

La Superintendencia de Sociedades señala que el `Capítulo X` de la Circular Externa `100-000016 del 24 de diciembre de 2020` exige implementar `SAGRILAFT` a sus sujetos obligados.

Implicacion prudente:

- no asumir que el proyecto estará obligado desde el día 1
- sí asumir que, al operar pagos o dispersión para terceros, la exposición a riesgo LA/FT existe
- diseñar el dominio para soportar KYC/KYB, listas restrictivas, documentación y trazabilidad

## 3. Qué cambia cuando damos servicio a terceros

## 3.1 Onboarding deja de ser solo técnico

Cuando el producto atiende terceros, el onboarding debe incluir:

- identificación del cliente
- verificación documental
- relación comercial y contractual
- medios de pago habilitados
- cuenta beneficiaria de settlement o payout
- alcance de responsabilidad

## 3.2 Payout exige información más sensible

Si pagamos a beneficiarios:

- aparecen datos de identificación
- aparecen cuentas bancarias o billeteras
- aparecen validaciones de beneficiarios
- aparecen reglas de aprobación y límites

Eso eleva de inmediato:

- sensibilidad de la data
- riesgo reputacional
- necesidad de auditoría

## 3.3 El riesgo ya no es solo “caída técnica”

Cuando operamos terceros, los riesgos pasan a ser:

- técnico
- legal
- reputacional
- operativo
- financiero
- fraude

## 4. Requisitos de arquitectura derivados de compliance

### 4.1 Datos

- clasificar PII por sensibilidad
- cifrar secretos y credenciales
- separar datos de pagos, datos de beneficiarios y datos de auditoría
- definir retención y borrado lógico

### 4.2 Acceso

- RBAC desde el inicio
- separación de funciones
- capacidad de aprobación dual para payouts
- logs de acceso a credenciales y datos sensibles

### 4.3 Operación

- runbooks para incidentes
- revisión periódica de integraciones y secretos
- evidencia de validación anual de seguridad cuando aplique
- trazabilidad de consentimientos, cambios y aprobaciones

### 4.4 Producto

- pantalla o flujo claro de “cómo funciona el pago”
- estados transparentes para usuario y comercio
- mensajes de error no ambiguos
- evidencias de operación para soporte y conciliación

## 5. Open questions que deben resolverse con asesoría especializada

1. En qué momento el modelo de negocio requiere habilitaciones, contratos o figuras regulatorias adicionales.
2. Si el rol del producto será solo orquestador técnico o también operador de fondos/dispersión en nombre de terceros.
3. Qué umbrales de volumen, ingresos o tipo societario activarían obligaciones de cumplimiento adicionales.
4. Cómo se definirá la responsabilidad contractual ante fraudes, reversos o errores de payout.

## 6. Artefactos que deberíamos producir más adelante

- matriz de clasificación de datos
- política de privacidad
- política de seguridad
- matriz de riesgos
- política de onboarding de comercios
- política de onboarding de beneficiarios
- runbook de incidentes
- ADR sobre tokenización y manejo de PII

## 7. Fuentes oficiales

- Superfinanciera - requerimientos de seguridad y calidad para pasarelas:
  [superfinanciera.gov.co/publicaciones/10097769](https://www.superfinanciera.gov.co/publicaciones/10097769/superfinanciera-fortalece-la-proteccion-de-la-informacion-de-los-consumidores-financieros-ante-riesgos-de-ciberseguridad-y-la-realizacion-de-operaciones-en-pasarelas-de-pago-10097769/)
- Superfinanciera - FAQ prestación del servicio:
  [superfinanciera.gov.co/preguntas-frecuentes/15/15-prestacion-del-servicio-y-atencion-al-publico](https://www.superfinanciera.gov.co/preguntas-frecuentes/15/15-prestacion-del-servicio-y-atencion-al-publico/)
- SIC - Ley 1581 de 2012:
  [sedeelectronica.sic.gov.co/transparencia/normativa/ley-1581](https://sedeelectronica.sic.gov.co/transparencia/normativa/ley-1581)
- SIC - FAQ protección de datos:
  [sic.gov.co/preguntas-frecuentes-pdp](https://www.sic.gov.co/preguntas-frecuentes-pdp)
- Supersociedades - Capítulo X SAGRILAFT:
  [supersociedades.gov.co/web/nuestra-entidad/cap-10-autocontrol-y-gestión-del-riesgo-integral](https://www.supersociedades.gov.co/web/nuestra-entidad/cap-10-autocontrol-y-gesti%25C3%25B3n-del-riesgo-integral)
- PCI Security Standards Council:
  [pcisecuritystandards.org](https://www.pcisecuritystandards.org/)

