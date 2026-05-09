---
name: commit
description: Crear commits enfocados y PRs alineados al flujo feature/* -> develop -> main del proyecto.
author: PasarelaDePago
version: 1.0.0-ppago
---

# commit - PasarelaDePago

Cierra el flujo del repo despues de analisis, implementacion y verificacion.
Produce un commit alineado a Conventional Commits y deja listo el PR contra
`develop`.

## Cuando usar

- al terminar una slice verificable
- cuando el usuario pide preparar commit o PR
- cuando hay que aislar cambios del feature actual dentro de un working tree mixto

## Reglas del proyecto

- idioma del commit y del PR: espanol
- formato: `tipo(scope): asunto`
- base del PR: `develop`
- nunca hacer push directo a `develop` o `main`
- no commitear secretos, caches ni artefactos temporales
- si el cambio cierra un change OpenSpec, mencionarlo en el cuerpo

## Proceso

1. Inspeccionar estado:
   - `git status`
   - `git diff`
   - `git diff --staged`
   - `git log --oneline -10`

2. Resolver scope:
   - si no hay argumentos, stagear todo lo relevante del feature actual
   - si hay argumentos, stagear solo lo asociado al issue, slice o change indicado

3. Construir mensaje:

```text
tipo(scope): asunto

- que cambio
- por que
- change OpenSpec o issue relacionado
```

4. Ejecutar:
   - `git add ...`
   - `git commit`
   - `git push -u origin <branch>` si hace falta

5. Crear o actualizar PR con `gh`:
   - titulo alineado al commit
   - base `develop`
   - incluir resumen, OpenSpec, test plan y riesgos

## Scopes sugeridos

- `web`
- `payment-core`
- `supabase`
- `openspec`
- `docs`
- `governance`
- `template`
