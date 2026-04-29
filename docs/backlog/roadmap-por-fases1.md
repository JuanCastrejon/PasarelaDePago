# Roadmap por Fases v1

Fecha de actualizacion: 2026-04-29

## 1. Proposito

Ordenar el proyecto en fases realistas que respeten la complejidad del dominio y la prioridad del aprendizaje visible en el repositorio.

## 2. Fase 0 - Fundacion documental

Objetivo:

- cerrar el paquete de dominio, requisitos, ADRs y backlog

Entregables:

- glosario
- vision y alcance
- matriz de capacidades
- modelo canonico
- requisitos v2
- backlog inicial
- ADRs base

Criterio de salida:

- el proyecto puede pasar de investigacion a ejecucion sin ambiguedad mayor

## 3. Fase 1 - Pay-in Core con riel principal

Objetivo:

- implementar el nucleo de cobro con foco en `PSE` y un proveedor prioritario

Entregables:

- `payment_order`
- `payment_attempt`
- `checkout_session`
- timeline basica
- webhook inbox
- polling de respaldo
- primer adapter (`Wompi` o `PayU`)

Criterio de salida:

- existe un flujo de cobro trazable de extremo a extremo

## 4. Fase 2 - Multiproveedor y resiliencia

Objetivo:

- incorporar reglas reales de routing, retry y fallback

Entregables:

- segundo adapter prioritario
- health model por proveedor
- fallback controlado
- clasificacion de errores
- reintento guiado por el usuario

Criterio de salida:

- la plataforma puede decidir entre al menos dos proveedores sin perder trazabilidad

## 5. Fase 3 - Operacion y conciliacion

Objetivo:

- construir el backoffice minimo defendible

Entregables:

- busqueda por referencias
- linea de tiempo detallada
- conciliacion inicial
- manejo de excepciones
- reportes operativos

Criterio de salida:

- un operador puede explicar y seguir una operacion sin mirar directamente la base de datos

## 6. Fase 4 - Payouts y beneficiarios

Objetivo:

- agregar dispersiones y control de aprobacion

Entregables:

- beneficiarios
- payout individual
- payout batch
- aprobacion dual
- seguimiento de estados

Criterio de salida:

- la plataforma soporta dinero saliente con evidencia suficiente

## 7. Fase 5 - Bre-B y expansion de rieles

Objetivo:

- tratar `Bre-B` y otros rieles inmediatos como parte nativa del dominio

Entregables:

- modelo `BRE_B_QR`
- recursos QR o alias
- expiraciones y estados propios
- soporte operativo de confirmacion

Criterio de salida:

- el dominio soporta `PSE` y `Bre-B` como rieles distintos pero equivalentes en importancia

## 8. Fase 6 - Endurecimiento comercial y portafolio

Objetivo:

- preparar el proyecto para mostrarse como producto serio y para clientes futuros

Entregables:

- documentacion navegable
- demo funcional
- ADRs ampliados
- narrativa de arquitectura visible
- backlog listo para Azure DevOps

Criterio de salida:

- el proyecto comunica madurez fullstack, operativa y arquitectonica

## 9. Notas de enfoque

- no todas las fases requieren codigo antes de cerrar sus decisiones de dominio
- el avance debe priorizar claridad y trazabilidad sobre velocidad cosmetica
- cada fase debe producir tanto artefactos tecnicos como evidencia visible en el repositorio

## 10. Conclusion

El roadmap permite avanzar sin improvisar: primero dominio y verdad asincrona, luego resiliencia, despues operacion, y finalmente expansion y presentacion comercial.
