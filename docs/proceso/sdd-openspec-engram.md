---
status: active
updated: 2026-05-09
supersedes:
  - docs/proceso/sdd-openspec-engram1.md
---

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

- `openspec/specs/`
- `openspec/changes/`

Y se alimenta desde:

- `docs/requisitos/`
- `docs/backlog/`
- `docs/adr/`
- `docs/dominio/`
- `docs/domain/`

Su funcion es convertir investigacion y decisiones en capacidades canonicas y changes trazables antes de tocar codigo.

## 4. `Engram`

`Engram` es la memoria persistente del proyecto.

Aqui incluye:

- `CONTEXT.md`
- `docs/indice-maestro.md`
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
2. `OpenSpec` para capacidades canonicas, changes y backlog trazable
3. `Engram` para contexto estable

## 7. Conclusion

Estas tres capas convierten al repositorio en algo mas que un folder de codigo: lo vuelven una memoria operativa versionada y util para trabajo humano y multiagente.

## 8. Continuidad operativa

La siguiente iteracion de este marco dentro de `PasarelaDePago` vive en:

- [Template SDLC y bootstrap de analisis v1](/C:/Users/juand/source/repos/PasarelaDePago/docs/proceso/template-sdlc-y-bootstrap-de-analisis.md)

Ese documento define como usar este repo como piloto controlado para introducir la capa reusable de `OpenSpec`, skills de analisis y gobierno documental antes de extraer una plantilla independiente.



