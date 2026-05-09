## 1. Analisis y contrato

- [ ] 1.1 Confirmar payload minimo de entrada para `payment_order`
- [ ] 1.2 Confirmar shape inicial de la respuesta canonica
- [ ] 1.3 Mantener catalogo de reglas sincronizado con `research.md`

## 2. Implementacion futura

- [ ] 2.1 Crear helper o caso de uso canonico para `payment_order`
- [ ] 2.2 Exponer `POST /api/payment-orders` con validacion minima
- [ ] 2.3 Mantener fuera de alcance `payment_attempt`, routing y persistencia real

## 3. Validacion y cierre

- [ ] 3.1 Ejecutar `npm run validate:enhanced-research -- payment-order-bootstrap`
- [ ] 3.2 Ejecutar `npm run validate:openspec`
- [ ] 3.3 Solicitar validacion humana del bloque `## [validation]` del issue #4
