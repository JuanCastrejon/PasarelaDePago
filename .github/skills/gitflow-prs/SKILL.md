---
name: gitflow-prs
description: "Define flujo de ramas, commits y PRs para PasarelaDePago. Usar cuando se vaya a crear una rama, preparar un commit, abrir un PR o revisar si un cambio puede ir a develop o main."
---

# GitFlow y PRs

## Reglas

1. `main` es estable y publica.
2. `develop` es integracion.
3. Toda rama de trabajo nace desde `develop`.
4. Solo se mergea por PR.
5. Los commits deben ser atomicos y en espanol.

## Checklist previo

- revisar `git status`
- revisar `git diff --staged`
- excluir archivos locales o privados
- ejecutar validaciones minimas

## Convenciones

- `feature/<accion-kebab-case>`
- `fix/<accion-kebab-case>`
- `docs/<accion-kebab-case>`
