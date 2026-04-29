# payment-rejection-lifecycle-audit

Analiza rechazos, declinaciones y estados fallidos de pagos reales a partir de correos, PDFs, capturas, webhooks o paneles operativos, con foco en correlacion de identificadores, soporte y conciliacion.

## Usar esta skill cuando

- Se revisan correos o comprobantes de transacciones rechazadas.
- Se quiere mapear `CUS`, autorizacion, referencia, recibo y otros identificadores.
- Se necesita entender que ve el pagador frente a lo que ve el comercio o el proveedor.
- Se estan definiendo requisitos de soporte, observabilidad y reconciliacion para pagos fallidos.

## Flujo de trabajo

1. Extraer los campos visibles en cada artefacto sin duplicar PII innecesaria.
2. Separar la informacion por actor:
   - riel de pago
   - checkout/proveedor
   - comercio
   - entidad financiera
3. Comparar estados visibles al usuario contra estados operativos.
4. Identificar llaves de correlacion:
   - `CUS`
   - `authorization`
   - `receipt`
   - `merchant_reference`
5. Determinar que informacion queda oculta para el usuario pero debe existir en backend.
6. Derivar requisitos de soporte, conciliacion, auditoria y taxonomia de errores.

## Reglas

- No sobrescribir documentacion existente; crear archivos incrementales.
- No repetir nombres, correos, documentos o telefonos del usuario salvo que sea estrictamente necesario.
- Distinguir entre `estado visible al pagador` y `estado tecnico interno`.
- No asumir que dos etiquetas textuales iguales significan lo mismo entre proveedores.
- Guardar evidencia de quien notifico, cuando y con que identificadores.

## Salida esperada

- Documento de investigacion incremental en `docs/investigacion/`.
- Requisitos funcionales y no funcionales derivados para soporte y conciliacion.
- Recomendaciones de modelo de datos y trazabilidad para transacciones rechazadas.
