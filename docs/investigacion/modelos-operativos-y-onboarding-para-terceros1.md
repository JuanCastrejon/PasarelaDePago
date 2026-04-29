# Modelos Operativos y Onboarding para Terceros v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Este documento aterriza una pregunta estructural del proyecto:

- bajo que modelo de negocio y operacion deberia construirse `PasarelaDePago`
- que onboarding necesita un comercio
- que onboarding necesita un beneficiario
- que no deberiamos intentar resolver desde cero

No constituye asesoria legal. Funciona como base de producto, arquitectura y backlog.

Complementa:

- [compliance-y-riesgo-para-terceros1.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/investigacion/compliance-y-riesgo-para-terceros1.md)
- [requisitos-y-casos-de-uso.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/requisitos-y-casos-de-uso.md)
- [requisitos-operativos-y-no-funcionales1.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/requisitos-operativos-y-no-funcionales1.md)

## 2. Hallazgo principal

Para este proyecto existen, al menos, tres modelos operativos distintos:

1. `Software-only orchestration`
2. `Managed platform with master accounts`
3. `Hybrid model`

La investigacion actual sugiere que el camino mas sano para construir el producto y mostrar madurez tecnica es comenzar por el `modelo 1`.

Esto es una inferencia de arquitectura y riesgo basada en fuentes oficiales y documentacion de proveedores, no una instruccion legal.

## 3. Modelos operativos posibles

## 3.1 Modelo 1 - Software-only orchestration

Descripcion:

- cada comercio usa sus propias cuentas o credenciales de proveedores
- la plataforma enruta, observa, normaliza y reconcilia
- la plataforma evita tocar mas fondos de los necesarios

Ventajas:

- menor friccion regulatoria inicial
- onboarding mas entendible
- mejor trazabilidad por comercio
- mas defendible para portafolio y para primeros clientes

Desventajas:

- onboarding comercial mas lento
- el cliente debe tener o activar cuentas con proveedores
- hay menos control centralizado sobre settlement

Conclusiones:

- este debe ser el modelo base del producto
- encaja con `Wompi`, `PayU` y `ePayco` como conectores por comercio

## 3.2 Modelo 2 - Managed platform with master accounts

Descripcion:

- la plataforma concentra una o varias cuentas maestras
- los terceros operan "a traves" de nuestra capa
- la plataforma administra mas flujo operativo, riesgo y conciliacion

Ventajas:

- experiencia mas simple para el cliente final
- mas control del flujo
- potencial para producto mas vertical

Desventajas:

- mas sensibilidad contractual, financiera y de cumplimiento
- mayor complejidad en settlement, payouts, reversos y responsabilidad
- mas riesgo si la propuesta se acerca a operar fondos de terceros

Conclusiones:

- no debe ser el punto de partida tecnico del proyecto
- debe quedar como fase posterior, sujeta a validacion legal y comercial

## 3.3 Modelo 3 - Hibrido

Descripcion:

- algunos comercios conectan cuentas propias
- otros usan servicios operados a traves de acuerdos mas profundos

Conclusiones:

- es plausible a futuro
- requiere que el dominio soporte ambas modalidades sin reescritura

## 4. Hallazgos oficiales que cambian el diseno

## 4.1 Superfinanciera no mete automaticamente a toda "pasarela" en la misma bolsa

La Superfinanciera ha indicado que las normas de `SPBV` no contemplan por si mismas a las `pasarelas de pago`, por lo que hay que determinar el alcance de la actividad que realmente se presta.

Implicacion:

- no podemos usar la etiqueta "pasarela" como si definiera por si sola el modelo regulatorio
- el diseno del producto debe separar `software`, `routing`, `custodia operativa`, `settlement` y `dispersion`

## 4.2 Cuando te vinculas con entidades vigiladas, aparecen obligaciones concretas

Las FAQ publicas de la Superfinanciera sobre pasarelas y comercios exigen, al menos en ese marco contractual:

- `PCI-DSS`
- politica de tratamiento de datos
- politicas y procedimientos de prevencion de `LA/FT`
- campanas informativas de seguridad
- explicacion al consumidor sobre el procedimiento de pago
- verificacion anual de la vigencia de `PCI-DSS`

Implicacion:

- el producto debe disenar el menor contacto posible con datos de tarjeta
- hosted checkout, tokenizacion y provider widget no son un atajo; son decision de riesgo

## 4.3 Los proveedores ya operan onboarding serio

`Wompi` ya documenta para `Pagos a Terceros`:

- activacion por representante legal
- validacion de identidad
- fotos del documento
- verificacion biometrica por video
- firma digital
- `OTP`
- plazos de `2 a 5 dias habiles`

`PayU`, con `Smart Check`, ya documenta:

- razon social
- direccion y contacto
- certificado de existencia y representacion legal con vigencia no mayor a `3 meses`
- descripcion del negocio
- controles sobre proveedores y politicas de cumplimiento
- estados financieros de los ultimos `2 anos fiscales`
- beneficiarios finales y directores
- declaracion de origen de fondos
- cruces `AML/KYC`, `OCR` y analisis de riesgo
- ventana de hasta `80 dias` para completar reverificacion

Implicacion:

- no deberiamos inventar un onboarding "ligero" si queremos operar con seriedad
- el sistema debe modelar y versionar evidencia, estados y restricciones de onboarding

## 5. Recomendacion de producto

## 5.1 Primera propuesta formal del proyecto

Construir `PasarelaDePago` primero como:

- `payment orchestration platform`
- con `merchant-owned provider accounts`
- con `failover`, `observabilidad`, `payout orchestration`, `reconciliacion` y `backoffice`

No construir primero como:

- agregador financiero completo
- custodio operativo de fondos
- onboarding regulatorio universal propio para reemplazar el de cada proveedor

## 5.2 Lo que si debemos controlar nosotros

- onboarding interno del comercio en nuestra plataforma
- configuracion de credenciales por proveedor
- verificacion operativa de dominios, webhooks y entornos
- evaluacion basica de riesgo de uso del producto
- onboarding y administracion de beneficiarios para payouts
- trazabilidad contractual y tecnica

## 6. Onboarding recomendado de comercios

## 6.1 Bloques de informacion

1. `Identidad del comercio`
2. `Representante legal`
3. `Estructura societaria y beneficiarios finales`
4. `Actividad economica y modelo de negocio`
5. `Proveedores de pago habilitados`
6. `Cuenta de settlement o cuentas operativas`
7. `Configuracion tecnica`
8. `Riesgo y cumplimiento`
9. `Roles y aprobaciones`

## 6.2 Datos minimos sugeridos

- tipo de persona: natural o juridica
- razon social o nombre
- NIT o documento
- representante legal
- correo y telefono
- actividad economica
- descripcion del caso de uso
- sitio web o canales de cobro
- volumen estimado
- ticket promedio
- metodos solicitados
- uso de payouts: si o no
- pais y moneda

## 6.3 Evidencia documental sugerida

- certificado de existencia y representacion legal
- certificacion bancaria
- documento del representante legal
- contrato o terminos
- comprobantes adicionales segun proveedor o nivel de riesgo

## 6.4 Estados internos propuestos

- `DRAFT`
- `PENDING_INFO`
- `UNDER_REVIEW`
- `PENDING_PROVIDER_ACTIVATION`
- `PARTIALLY_ACTIVE`
- `ACTIVE`
- `RESTRICTED`
- `SUSPENDED`
- `OFFBOARDED`

## 7. Onboarding recomendado de beneficiarios

## 7.1 Objetivo

En payouts, el beneficiario no es un simple campo del formulario. Debe tratarse como una entidad propia.

## 7.2 Datos minimos sugeridos

- tipo de beneficiario: persona o empresa
- nombre o razon social
- tipo y numero de documento
- banco o billetera
- tipo y numero de cuenta
- correo
- telefono
- relacion con el comercio
- pais
- estado de validacion

## 7.3 Controles recomendados

- verificacion de formato bancario
- evidencia de consentimiento o relacion comercial cuando aplique
- validacion contra duplicados
- screening de listas si el modelo lo requiere
- aprobacion dual para altas sensibles

## 7.4 Estados internos propuestos

- `DRAFT`
- `PENDING_VALIDATION`
- `VALIDATED`
- `REJECTED`
- `BLOCKED`
- `ARCHIVED`

## 8. Controles de riesgo que nacen de esta investigacion

1. No habilitar payouts sin workflow de aprobacion.
2. No habilitar metodos de pago solo porque el proveedor los soporte; deben estar activados para el comercio.
3. Mantener `provider activation state` separado de `platform account state`.
4. Tratar biometria y datos sensibles como categoria especial desde diseno.
5. Evitar almacenar datos de tarjeta cuando un widget, checkout o token del proveedor lo resuelva.

## 9. Backlog derivado

1. Disenar `merchant_onboarding_case`.
2. Disenar `merchant_provider_account`.
3. Disenar `beneficiary_profile`.
4. Disenar `document_evidence`.
5. Disenar `provider_activation_state`.
6. Disenar `kyc_kyb_review` y `risk_flags`.
7. Disenar reglas de suspension y reactivacion.

## 10. Conclusion

El proyecto ya tiene una direccion mucho mas clara:

- primero debemos ser una `plataforma de orquestacion y operacion`
- no un pseudo-banco improvisado
- reutilizando el onboarding regulado de los proveedores cuando exista
- y construyendo nosotros la capa de control, trazabilidad, riesgo operativo y experiencia multiproveedor

## 11. Fuentes

- Superfinanciera - Boletin Juridico No. 106:
  [https://www.superfinanciera.gov.co/publicaciones/10114606/normativanormativa-generalboletin-juridico-superintendencia-financieraboletin-juridico-no-boletin-juridico-no-10114606/](https://www.superfinanciera.gov.co/publicaciones/10114606/normativanormativa-generalboletin-juridico-superintendencia-financieraboletin-juridico-no-boletin-juridico-no-10114606/)
- Superfinanciera - FAQ Prestacion del Servicio:
  [https://www.superfinanciera.gov.co/preguntas-frecuentes/15/15-prestacion-del-servicio-y-atencion-al-publico/](https://www.superfinanciera.gov.co/preguntas-frecuentes/15/15-prestacion-del-servicio-y-atencion-al-publico/)
- Wompi - Solicitud activacion Pagos a Terceros:
  [https://docs.wompi.co/docs/colombia/activacion-pagos-a-terceros/](https://docs.wompi.co/docs/colombia/activacion-pagos-a-terceros/)
- Wompi - Configuracion inicial Pagos a Terceros:
  [https://docs.wompi.co/docs/colombia/configuracion-inicial-pagos-a-terceros/](https://docs.wompi.co/docs/colombia/configuracion-inicial-pagos-a-terceros/)
- Wompi - Limites transacciones:
  [https://docs.wompi.co/docs/colombia/limites-trx-pagos-a-terceros/](https://docs.wompi.co/docs/colombia/limites-trx-pagos-a-terceros/)
- PayU - Smart Check:
  [https://developers.payulatam.com/latam/es/docs/services/smartcheck.html](https://developers.payulatam.com/latam/es/docs/services/smartcheck.html)
- SIC - instrucciones para datos personales en fintech:
  [https://sedeelectronica.sic.gov.co/noticias/la-superintendencia-de-industria-y-comercio-emite-instrucciones-sobre-el-tratamiento-de-datos-personales-en-el-sector-fintech](https://sedeelectronica.sic.gov.co/noticias/la-superintendencia-de-industria-y-comercio-emite-instrucciones-sobre-el-tratamiento-de-datos-personales-en-el-sector-fintech)
- Supersociedades - SAGRILAFT y Regimen de Medidas Minimas:
  [https://www.supersociedades.gov.co/web/asuntos-economicos-societarios/sagrilaft](https://www.supersociedades.gov.co/web/asuntos-economicos-societarios/sagrilaft)
