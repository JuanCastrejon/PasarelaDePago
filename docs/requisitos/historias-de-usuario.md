# Historias de Usuario

Fecha de actualizacion: 2026-04-29

## Epic 1 - Onboarding y configuracion

1. Como `Platform Owner`, quiero registrar comercios dentro de la plataforma, para operar varios clientes sin mezclar sus credenciales ni sus transacciones.
2. Como `Merchant Admin`, quiero asociar mis credenciales de Wompi, PayU o ePayco, para cobrar y dispersar pagos desde mi propia configuracion.
3. Como `Merchant Admin`, quiero habilitar o deshabilitar metodos de pago por comercio, para alinear el checkout con mi operacion real.
4. Como `Ops Analyst`, quiero ver que proveedor y metodos estan activos por comercio, para diagnosticar rapidamente por que una ruta de pago no esta disponible.

## Epic 2 - Checkout y cobros

5. Como `Payer`, quiero pagar con tarjeta, para completar compras de forma inmediata.
6. Como `Payer`, quiero pagar por `PSE`, para transferir desde mi cuenta bancaria.
7. Como `Payer`, quiero pagar con `Nequi`, para usar una billetera que ya conozco.
8. Como `Payer`, quiero pagar con `Boton Bancolombia` o QR cuando aplique, para usar metodos locales confiables.
9. Como `Payer`, quiero pagar con `Bre-B` cuando este disponible por proveedor, para hacer pagos inmediatos interoperables.
10. Como `Merchant`, quiero ofrecer varios metodos colombianos desde un mismo checkout, para reducir friccion y mejorar conversion.

## Epic 3 - Routing y resiliencia

11. Como `Platform Owner`, quiero definir un proveedor primario y uno o mas secundarios por metodo, para mantener continuidad operativa.
12. Como `System`, quiero identificar cuando una falla es tecnica y recuperable, para intentar retry o fallback sin duplicar cobros.
13. Como `Ops Analyst`, quiero ver si un intento fue primario, retry o fallback, para entender exactamente como se proceso una orden.
14. Como `Merchant`, quiero que una caida parcial de un proveedor no derribe toda mi capacidad de cobrar, para no perder ventas.
15. Como `System`, quiero evitar retries silenciosos en flujos que requieren nueva accion del usuario, para no crear experiencias inconsistentes o riesgosas.

## Epic 4 - Webhooks y estado final

16. Como `System`, quiero recibir webhooks de los proveedores, para consolidar estados finales de forma confiable.
17. Como `Security Analyst`, quiero validar firma o checksum en cada webhook, para asegurar autenticidad.
18. Como `Ops Analyst`, quiero almacenar el payload original y el resultado de validacion, para auditar incidentes.
19. Como `Merchant`, quiero que el estado visible de una orden refleje la verdad del backend y no solo la redireccion del navegador, para evitar confusiones con pagos pendientes o fallidos.
20. Como `System`, quiero consultar activamente una transaccion cuando el webhook no llega, para reducir ordenes huerfanas.

## Epic 5 - Refunds y reversos

21. Como `Merchant`, quiero solicitar devoluciones totales o parciales, para resolver devoluciones o ajustes.
22. Como `Finance Analyst`, quiero conocer que intento y proveedor origino un refund, para conciliar correctamente.

## Epic 6 - Payouts y dispersiones

23. Como `Merchant`, quiero registrar beneficiarios, para poder pagar a terceros desde la plataforma.
24. Como `Merchant`, quiero crear payouts individuales o por lote, para atender pagos masivos o puntuales.
25. Como `Approver`, quiero revisar y aprobar payouts sensibles, para mantener control dual.
26. Como `Beneficiary`, quiero recibir notificacion del estado de mi payout, para saber si el pago fue exitoso o esta en proceso.
27. Como `Ops Analyst`, quiero ver limites, cuentas origen y estados bancarios, para operar dispersiones con menos friccion.
28. Como `Merchant`, quiero pagar a cuentas bancarias o billeteras soportadas, para cubrir distintos tipos de destinatario.

## Epic 7 - Recurrentes y tokenizacion

29. Como `Merchant`, quiero tokenizar medios de pago a traves del proveedor, para habilitar cobros futuros sin exponer datos sensibles.
30. Como `Merchant`, quiero crear planes o cargos recurrentes, para vender suscripciones o cobros periodicos.
31. Como `Customer`, quiero poder cancelar o actualizar un esquema recurrente segun las reglas del proveedor, para tener control sobre mis cobros.

## Epic 8 - Observabilidad y conciliacion

32. Como `Ops Analyst`, quiero ver dashboards por proveedor, metodo y estado, para detectar incidentes rapidamente.
33. Como `Finance Analyst`, quiero conciliar ordenes internas con transacciones externas, para detectar diferencias de monto, estado o tiempo.
34. Como `Finance Analyst`, quiero generar reportes de payouts y cobros, para cierres operativos y financieros.
35. Como `Platform Owner`, quiero medir tasas de exito y error por proveedor, para mejorar reglas de ruteo.

## Epic 9 - Seguridad y gobierno

36. Como `Platform Owner`, quiero separar roles y permisos, para controlar acceso a credenciales, payouts y reportes.
37. Como `Compliance Analyst`, quiero una pista de auditoria completa, para soportar revisiones y eventos sensibles.
38. Como `Developer Integrator`, quiero ambientes de sandbox y produccion aislados, para probar sin contaminar operaciones reales.

## Epic 10 - Portafolio y mantenibilidad

39. Como `Recruiter` o `Tech Lead` que revise el repositorio, quiero ver una arquitectura clara, para entender que el proyecto no es una demo improvisada.
40. Como `Future Client`, quiero ver documentacion, requisitos y decisiones bien estructuradas, para confiar en la seriedad tecnica del producto.
41. Como `Maintainer`, quiero skills propias del proyecto, para convertir la investigacion y el dominio en un proceso reusable y disciplinado.
