---
status: active
updated: 2026-05-09
supersedes:
  - docs/proceso/gobernanza-de-skills-y-fuentes1.md
  - docs/proceso/gobernanza-de-skills-y-fuentes2.md
---

# Gobernanza de Skills y Fuentes v2

Fecha de actualizacion: 2026-04-30

## 1. Objetivo

Definir como conviven las skills internas del repo, las skills locales de Codex y la autodeteccion del stack, sin perder control sobre dominio, arquitectura ni flujo operativo.

## 2. Orden de prioridad

1. `.github/copilot-instructions.md`
2. `.github/instructions/*.instructions.md`
3. `.github/skills/*/SKILL.md`
4. `project-skills/*/SKILL.md`
5. `.agents/workflows/*.md`
6. skills externas instaladas localmente

## 3. Fuentes actuales

### Internas del repo

- contexto
- documentacion viva
- gitflow y PRs
- operacion CLI/DevOps
- orquestacion multiagente
- arquitectura de pagos
- backend audit pagos
- UI/UX operaciones pagos

### Externas ya integradas o aprobadas

- `mattpocock/skills`
- `ComposioHQ/awesome-codex-skills`
- `midudev/autoskills`

## 4. Regla de adopcion

Una skill externa entra al flujo si:

- aporta al stack real detectado
- no contradice reglas internas
- mejora productividad o calidad de forma auditable
- puede explicarse dentro del repo

## 5. Regla de versionado

- `.github/skills/` y `project-skills/` si son fuente primaria
- `.agents/skills/` y `skills-lock.json` si son generados por `autoskills`: soporte local, no versionados

## 6. Resultado actual

Con el esqueleto tecnico nuevo, `autoskills` ya detecta:

- `TypeScript`
- `Turborepo`
- `Node.js`
- `React`
- `Next.js`
- `Tailwind CSS`
- `Zod`
- `Supabase`
- `Playwright`
- `Vitest`

## 7. Implicacion

La gobernanza ya no depende solo de "tener buenas ideas"; ahora depende de:

- stack visible
- skills versionadas
- allowlist documentada
- proceso reproducible

