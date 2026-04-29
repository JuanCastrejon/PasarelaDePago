# payment-approval-lifecycle-audit

Analiza aprobaciones de pago reales a partir de correos, vouchers, PDFs, capturas, paneles o webhooks para entender que confirma el riel, que confirma el proveedor y que termina viendo el comprador.

## Usar esta skill cuando

- Se revisan comprobantes de pagos aprobados.
- Se quiere mapear `CUS`, autorizacion, referencia, ticketid, recibo o trazabilidad.
- Se necesita comparar la vista del comprador con la vista tecnica del proveedor.
- Se estan definiendo requisitos de conciliacion, soporte y observabilidad para pagos exitosos.

## Flujo de trabajo

1. Extraer los campos visibles por artefacto sin duplicar PII innecesaria.
2. Separar la informacion por capa:
   - riel
   - proveedor / checkout
   - comercio
   - backend / API
3. Detectar si existen llaves de correlacion visibles al comprador.
4. Contrastar lo visible con la documentacion tecnica oficial.
5. Derivar estados operativos adicionales al simple `approved`.
6. Documentar requisitos de soporte, conciliacion y auditoria post-pago.

## Reglas

- No sobrescribir documentacion existente; crear archivos incrementales.
- No asumir que el comprobante visible contiene toda la verdad tecnica.
- Distinguir `estado aprobado`, `voucher emitido`, `retorno completado` y `notificacion entregada`.
- Registrar que identificadores son visibles al comprador y cuales quedan solo para backend o soporte.

## Salida esperada

- Documento incremental en `docs/investigacion/`.
- Hallazgos sobre correlacion de identificadores y modelo de estados post-pago.
- Requisitos para trazabilidad, soporte y conciliacion de pagos aprobados.
