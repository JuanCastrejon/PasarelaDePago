# Umbrales de Ceremonia

Fecha: 2026-05-09

Este documento define cuanta ceremonia SDD aplicar segun el tipo de cambio en
`{{PROJECT_NAME}}`.

## Nivel 1 - Flujo completo

Usar cuando el cambio introduce o modifica una capacidad canónica,
reglas de negocio, modelo de datos, integraciones nuevas o multiples
superficies.

Flujo:

```text
/enrich-us -> [validation] -> /opsx:ff -> research -> proposal -> specs -> design -> tasks -> /opsx:apply -> /opsx:verify -> /opsx:archive
```

Criterios tipicos:

- capacidad nueva o cambio contractual en `openspec/specs/`
- cambio de reglas de negocio o de estados canonicos
- impacto en mas de una superficie principal del repositorio
- esfuerzo estimado `L` o `XL`
- riesgo funcional medio o alto

## Nivel 2 - Flujo ligero

Usar cuando el cambio modifica comportamiento observable pero sigue acotado a
una sola superficie o a un ajuste puntual.

Flujo:

```text
research.md breve -> tasks.md -> implementacion -> /opsx:verify
```

Criterios tipicos:

- no introduce capacidad nueva
- afecta una superficie principal
- esfuerzo `M`
- no cambia el modelo de datos de forma estructural

## Nivel 3 - Flujo minimo

Usar para typos, formato, configuracion menor, limpieza documental o cambios
sin impacto funcional.

Flujo:

```text
/commit
```

## Regla de desempate

Si hay duda entre dos niveles, escalar al superior.

## Excepciones

- Un hotfix puede salir con ceremonia minima, pero debe generar `research`
  retroactivo si tocó comportamiento funcional.
- Los cambios de control plane, agentes, skills, ownership o gobernanza nunca
  son Nivel 3.
