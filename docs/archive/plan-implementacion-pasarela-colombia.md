---
status: archived
updated: 2026-05-09
superseded_by: docs/plan-implementacion-pasarela-colombia.md
---

# Plan Maestro de Implementacion

Fecha de actualizacion: 2026-04-29

## 1. Naturaleza real del proyecto

`PasarelaDePago` no se tratara como un MVP rapido. Se tratara como una **plataforma personal de payment orchestration para Colombia**, pensada para:

- demostrar dominio FullStack real
- servir como base reusable para futuros clientes
- soportar multiples proveedores y multiples flujos
- crecer con documentacion, arquitectura y skills propias

La tesis central del proyecto es:

- no reinventar adquirencia o procesamiento regulado de bajo nivel
- si construir una capa propia de alto valor sobre proveedores ya existentes

## 2. Que vamos a construir

Una plataforma propia de:

- `checkout orchestration`
- `multi-provider routing`
- `fallback y smart retry`
- `webhook normalization`
- `payout orchestration`
- `reconciliation`
- `merchant operations`
- `observability`
- `documentacion y skills del proyecto`

## 3. Que NO vamos a construir de entrada

- adquirencia propia
- almacenamiento de PAN o CVV
- infraestructura regulada de bajo nivel del proveedor
- un ledger custodial completo desde la primera version

## 4. Estrategia de proveedores

### Pagos entrantes

- `Wompi` como primer proveedor fuerte para pagos locales y salida rapida a produccion futura.
- `PayU` como proveedor clave para `Bre-B`, `PSE`, `Nequi`, `Boton Bancolombia` y redundancia.
- `ePayco` como proveedor complementario para cobertura amplia, split y recurrentes.
- `Mercado Pago` como referencia tecnica y opcion futura de expansion regional.

### Pagos salientes

- `Wompi Pagos a terceros` como primera linea para payouts.
- `PayU Payouts` como segunda linea fuerte para dispersiones.

## 5. Decisiones tecnicas maestras

### 5.1 Modelo de dominio

Separaremos como entidades distintas:

- `payment_order`
- `payment_attempt`
- `provider_transaction`
- `payout_batch`
- `payout_item`
- `webhook_event`
- `reconciliation_item`

### 5.2 Regla de verdad del estado

El estado final de una operacion debe provenir de:

- webhook validado
- o consulta servidor a servidor

Nunca de una simple redireccion del navegador.

### 5.3 Regla de resiliencia

El sistema debe distinguir entre:

- `fallback`
- `smart retry`
- `business decline`
- `provider outage`

No todo error permite retry silencioso.

### 5.4 Regla de seguridad

- credenciales solo del lado servidor
- idempotencia en operaciones criticas
- auditoria de eventos
- minimizacion de PII
- verificacion criptografica de webhooks cuando el proveedor lo permita

## 6. Stack objetivo

- `Next.js` sobre `Vercel` para panel, backoffice y endpoints de integracion
- `Supabase` para Postgres, autenticacion, storage y politicas
- `TypeScript` end-to-end
- jobs asincronos para webhooks, polling, conciliacion y payouts

## 7. Fases del proyecto

### Fase 0 - Fundamentos de producto

- investigacion de proveedores
- investigacion regulatoria
- requerimientos
- casos de uso
- historias de usuario
- glosario del dominio
- skills del proyecto

### Fase 1 - Foundation tecnica

- inicializar repo
- scaffolding del stack
- estructura de carpetas
- esquema base de datos
- manejo de secretos
- observabilidad base

### Fase 2 - Primer flujo de cobro

- ordenes de pago
- intentos de pago
- integracion con `Wompi`
- webhooks validados
- estado final consolidado
- dashboard operativo inicial

### Fase 3 - Multiproveedor

- integracion con `PayU`
- matriz de capacidades
- ruteo por metodo
- fallback controlado
- alertas de degradacion
- Bre-B como flujo real

### Fase 4 - Operacion y conciliacion

- reportes
- conciliacion
- auditoria
- exploracion de errores
- metricas por proveedor

### Fase 5 - Payouts

- beneficiarios
- cuentas origen
- lotes
- aprobacion dual
- payouts via `Wompi`
- payouts via `PayU`

### Fase 6 - Ampliacion de producto

- `ePayco`
- recurrentes
- split payments
- UX self-service para comercios
- optimizacion de tasas de exito

## 8. Orden recomendado de construccion

1. documentacion base
2. skillset del proyecto
3. contexto del dominio
4. foundation tecnica
5. pagos one-time con Wompi
6. webhooks y reconciliacion basica
7. PayU y Bre-B
8. ruteo y fallback
9. payouts
10. ePayco y modulos complementarios

## 9. Riesgos principales

- asumir soporte de un metodo sin documentacion oficial vigente
- acoplar el dominio al proveedor
- confiar en redirects para estados finales
- implementar fallback sin clasificacion de errores
- no modelar payouts como dominio propio
- posponer conciliacion y observabilidad

## 10. Mapa documental del repo

Este plan maestro se apoya en:

- [CONTEXT.md](/C:/Users/juand/source/repos/PasarelaDePago/CONTEXT.md)
- [proveedores-colombia-y-open-source.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/investigacion/proveedores-colombia-y-open-source.md)
- [requisitos-y-casos-de-uso.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/requisitos-y-casos-de-uso.md)
- [historias-de-usuario.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/historias-de-usuario.md)
- [orquestacion-failover-y-bre-b.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/arquitectura/orquestacion-failover-y-bre-b.md)
- [catalogo-de-skills-del-proyecto.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/skills/catalogo-de-skills-del-proyecto.md)

## 11. Siguiente decision practica

El siguiente paso mas valioso sigue siendo:

1. continuar profundizando investigacion donde haya incertidumbre
2. consolidar PRD y backlog inicial
3. recien despues scaffold del proyecto tecnico





