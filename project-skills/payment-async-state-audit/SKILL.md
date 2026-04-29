# payment-async-state-audit

Analiza el ciclo de vida asincrono de pagos y recaudos con foco en estados `PENDIENTE`, `FALLIDA`, reintentos, polling, webhooks y retorno al comercio.

## Usar esta skill cuando

- Se investigan PSPs o rieles con confirmacion asincrona.
- Se quiere definir reglas de retry por proveedor.
- Se necesita distinguir `response URL` de `webhook` como fuente de verdad.
- Se esta construyendo una taxonomia canonica de estados para un orquestador.

## Flujo de trabajo

1. Identificar estado inicial, estados intermedios y estados terminales del proveedor.
2. Verificar si el proveedor documenta `polling`, consultas o tiempos recomendados de espera.
3. Verificar si el webhook cubre estados finales o tambien estados intermedios.
4. Identificar si la pagina de retorno sirve solo para UX o tambien para validacion.
5. Determinar si el retry debe crear un nuevo intento o si el proveedor permite continuar el mismo flujo.
6. Derivar reglas de soporte, idempotencia, conciliacion y recuperacion.

## Reglas

- No sobrescribir documentacion existente; crear archivos incrementales.
- No asumir que `PENDIENTE` es fallo.
- No asumir que `FALLIDA` y `RECHAZADA` significan lo mismo.
- Diferenciar siempre:
  - estado visible al usuario
  - estado crudo del proveedor
  - estado canonico interno
  - evidencia recibida por webhook, polling o retorno

## Salida esperada

- Documento incremental de investigacion.
- Matriz comparativa de resiliencia operativa por proveedor.
- Reglas concretas para taxonomia de estados y estrategia de retry.
