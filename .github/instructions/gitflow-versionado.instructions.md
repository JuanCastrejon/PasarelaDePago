---
description: "Reglas de ramas, commits, PRs y versionado para PasarelaDePago. Usar cuando: se cree una rama, se prepare un commit, se abra un PR o se revise que archivos van al repo."
---

# GitFlow y Versionado

## Flujo

- crear ramas desde `develop`
- usar `feature/*`, `fix/*` o `docs/*`
- abrir PR a `develop`
- promover a `main` solo por PR

## Commits

- convencionales y en espanol
- atomicos
- un objetivo por commit

## Antes de commitear

- revisar `git status`
- revisar `git diff --staged`
- confirmar que `.gitignore` cubra artefactos privados o locales
- confirmar que no se agrego `.copilot/`, `supabase/.temp/`, PDFs con PII o carpetas locales de referencia

## Prohibiciones

- no push directo a `main`
- no push directo a `develop`
- no commitear evidencia con PII
- no commitear carpetas de referencia local
