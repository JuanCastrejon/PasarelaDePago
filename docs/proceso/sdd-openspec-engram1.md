# SDD, OpenSpec y Engram v1

Fecha de actualizacion: 2026-04-29

## 1. Objetivo

Formalizar tres capas de trabajo que ayudan a ordenar el proyecto antes y durante la implementacion.

## 2. `SDD`

`SDD` se usa aqui como disciplina personal de desarrollo:

- entender el problema
- descomponerlo
- ejecutar por slices
- validar
- cerrar con evidencia

No es solo una etiqueta; es la forma de evitar que el agente o el desarrollador salten de idea en idea sin continuidad.

## 3. `OpenSpec`

`OpenSpec` es la capa de especificacion abierta y versionada del proyecto.

En este repositorio vive principalmente en:

- `docs/requisitos/`
- `docs/backlog/`
- `docs/adr/`
- `docs/dominio/`

Su funcion es convertir investigacion y decisiones en artefactos que luego pueden migrarse a GitHub Issues o Azure DevOps.

## 4. `Engram`

`Engram` es la memoria persistente del proyecto.

Aqui incluye:

- `CONTEXT.md`
- `docs/indice-maestro1.md`
- glosario
- matrices
- roadmap
- skills internas

Su objetivo es que cada nueva sesion de trabajo tenga una base coherente de contexto y no dependa de memoria improvisada.

## 5. Relacion entre las tres capas

- `SDD` organiza como pensamos y ejecutamos
- `OpenSpec` organiza lo que especificamos
- `Engram` organiza lo que recordamos y reutilizamos

## 6. Regla de uso

Ninguna implementacion importante debe empezar sin apoyarse en estas tres capas:

1. `SDD` para la disciplina de trabajo
2. `OpenSpec` para el alcance y backlog
3. `Engram` para contexto estable

## 7. Conclusion

Estas tres capas convierten al repositorio en algo mas que un folder de codigo: lo vuelven una memoria operativa versionada y util para trabajo humano y multiagente.
