# Planes UAT

Este directorio contiene los planes de User Acceptance Testing (UAT) del
proyecto. El objetivo es conectar capacidades canonicas con validacion humana
repetible antes de cerrar una fase o un release relevante.

## Convencion de nombres

```text
plan-uat-F{n}.md
```

Ejemplo: `plan-uat-F1.md`.

## Cuando crear un plan UAT

- al iniciar una fase funcional importante
- cuando una capacidad canonica ya requiere validacion de negocio u operacion
- antes de declarar una fase lista para gate humano

## Relacion con OpenSpec

- cada escenario debe referenciar una spec canonica o un change activo
- el plan UAT no reemplaza los escenarios `Given/When/Then`; agrega
  datos de prueba, operador, evidencia esperada y criterio de aprobacion

## Plantilla

Usar [TEMPLATE.md](./TEMPLATE.md)
como base.
