---
status: active
updated: 2026-05-09
supersedes:
  - docs/proceso/consolidacion-documental-para-inicio-del-proyecto1.md
---

# Consolidacion Documental para Inicio del Proyecto v1

Fecha de actualizacion: 2026-04-29

## 1. Objetivo

Definir como convertir la investigacion ya realizada en un paquete documental coherente dentro del repositorio, sin mover todavia el trabajo a Azure DevOps.

La meta ya no es seguir acumulando notas sueltas, sino preparar el repositorio para:

- levantamiento formal de requerimientos
- epics
- features
- user stories
- tasks
- ADRs
- backlog inicial

## 2. Conclusion de etapa

Con la investigacion actual, ya tenemos suficiente entendimiento del dominio para pasar de:

- `exploracion`

a:

- `consolidacion`
- `levantamiento estructurado`
- `diseno del backlog`

Esto no significa que todo este resuelto para produccion. Significa que ya entendemos la base operativa del problema lo bastante bien como para redactar documentacion de inicio de proyecto con criterio.

## 3. Lo que ya esta suficientemente entendido

### Negocio y dominio

- El producto no debe modelarse como un simple checkout.
- `PSE` es un riel central del producto.
- `Bre-B` es requerimiento de primera clase.
- El producto debe soportar multiproveedor, payouts, soporte y conciliacion.

### Arquitectura y operacion

- La verdad transaccional es asincrona.
- El `retorno al comercio` no es fuente de verdad final.
- `webhook + polling + consulta posterior + artefactos visibles` forman la verdad operativa completa.
- El `fallback silencioso` no aplica igual para todos los rieles.
- `retry` significa nuevo intento, no reciclaje del anterior.

### Compliance y onboarding

- Para operar con terceros hay requisitos reales de KYC/KYB, riesgo y datos.
- Es mas sano arrancar reutilizando cuentas y habilitaciones reguladas de los proveedores cuando aplique.

## 4. Lo que sigue abierto, pero ya no bloquea el inicio documental

- validacion legal exacta del modelo societario final
- activacion comercial real con cada PSP
- costos definitivos, tarifas y contratos
- flujos exactos de certificacion en produccion
- decisiones finas de stack tecnico

Estas preguntas siguen abiertas, pero ya no impiden redactar:

- vision del producto
- glosario
- requisitos funcionales
- requisitos no funcionales
- epics
- features
- historias
- backlog de arranque

## 5. Propuesta de paquete documental canonico dentro del repo

## 5.1 Documentos que deben consolidarse o crearse a continuacion

1. `glosario del dominio`
2. `vision y alcance del producto`
3. `matriz de capacidades por proveedor`
4. `modelo de dominio canonico`
5. `requisitos funcionales v2`
6. `requisitos no funcionales v2`
7. `catalogo de casos de uso v2`
8. `epics y features`
9. `user stories priorizadas`
10. `tasks tecnicas iniciales`
11. `ADRs base`
12. `roadmap por fases`

## 5.2 Documentos ya existentes que sirven de base

- [CONTEXT.md](/C:/Users/juand/source/repos/PasarelaDePago/CONTEXT.md)
- [plan-implementacion-pasarela-colombia.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/plan-implementacion-pasarela-colombia.md)
- [orquestacion-failover-y-bre-b.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/arquitectura/orquestacion-failover-y-bre-b.md)
- [requisitos-y-casos-de-uso.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/requisitos-y-casos-de-uso.md)
- [requisitos-operativos-y-no-funcionales.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/requisitos-operativos-y-no-funcionales.md)
- [historias-de-usuario.md](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/historias-de-usuario.md)

## 6. Estructura sugerida para la siguiente fase

## 6.1 `docs/dominio/`

Para:

- glosario
- entidades del dominio
- taxonomia de estados
- referencias e identificadores

## 6.2 `docs/requisitos/`

Para:

- alcance
- requisitos funcionales
- requisitos no funcionales
- casos de uso
- restricciones

## 6.3 `docs/backlog/`

Para:

- epics
- features
- user stories
- tasks
- dependencias

## 6.4 `docs/adr/`

Para:

- decisiones de arquitectura
- decisiones de modelo operativo
- decisiones de stack

## 6.5 `docs/matriz/`

Para:

- matriz por proveedor
- matriz de estados
- matriz de medios de pago
- matriz de riesgos y mitigaciones

## 7. Orden recomendado de redaccion

1. `glosario del dominio`
2. `taxonomia canonica de estados`
3. `matriz de capacidades por proveedor`
4. `requisitos funcionales consolidados`
5. `requisitos no funcionales consolidados`
6. `epics y features`
7. `historias y tasks`
8. `ADRs base`

## 8. Regla editorial para seguir trabajando

Mientras sigamos en fase de consolidacion:

- no sobrescribir documentos anteriores
- crear versiones incrementales
- distinguir claramente entre:
  - evidencia observada
  - conclusion inferida
  - decision propuesta
  - requisito derivado

## 9. Propuesta de criterio de suficiencia para pasar a backlog

Podemos empezar backlog formal cuando esten listos estos minimos:

- glosario del dominio
- taxonomia canonica de estados
- mapa de actores
- requisitos funcionales consolidados
- requisitos no funcionales consolidados
- epics y features iniciales

## 10. Conclusion

La investigacion ya no esta en una etapa inmadura. Ya produjo suficiente conocimiento estructural para convertir este repositorio en la fuente formal del arranque del proyecto.

El siguiente paso correcto no es abrir Azure DevOps todavia, sino consolidar dentro del repo un `paquete de documentacion fundacional` que luego se pueda migrar con claridad a Boards, Wiki y backlog.



