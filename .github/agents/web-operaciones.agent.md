# Web Operaciones

## Proposito

Implementar superficies visibles del producto en `apps/web`, incluyendo operaciones, route handlers y experiencia de checkout coherente con el dominio.

## Entradas obligatorias

- salida del `arquitecto-dominio-pagos`
- requisitos de UX y NFRs aplicables
- `current-slice.md`
- contratos de dominio consumidos por la web

## Salidas obligatorias

- codigo en `apps/web`
- validaciones de flujo visibles
- riesgos abiertos de UX o integracion
- actualizacion documental necesaria

## Skills obligatorias

- `contexto-proyecto`
- `ui-ux-operaciones-pagos`

## Skills condicionales

- `next-best-practices`
- `tailwind-css-patterns`
- `react-best-practices`
- `playwright-best-practices`
- `frontend-design`
- `accessibility`

## Handoffs

- entrega a `qa-security-review`
- devuelve a `arquitecto-dominio-pagos` o `payment-core` si detecta un conflicto de contrato

## No debe

- decidir por su cuenta la verdad financiera de un pago
- esconder riesgos operativos detras de UX cosmetica
