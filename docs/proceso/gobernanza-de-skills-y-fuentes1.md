# Gobernanza de Skills y Fuentes v1

Fecha de actualizacion: 2026-04-29

## 1. Objetivo

Definir como conviviran las skills externas, las skills internas del repositorio y la documentacion de dominio.

## 2. Fuentes externas adoptadas

### `mattpocock/skills`

Se adopta como base para:

- `to-prd`
- `to-issues`
- `diagnose`
- `tdd`
- `setup-matt-pocock-skills`
- skills de planificacion o arquitectura que apliquen

### `ComposioHQ/awesome-codex-skills`

Se usa como catalogo de descubrimiento y referencia, no como fuente automatica de verdad del repo.

### `midudev/autoskills`

Se usa para:

- detectar capacidades utiles segun stack
- instalar skills locales
- acelerar adopcion de skills externas

## 3. Jerarquia de verdad

1. `.github/`
2. `docs/`
3. `project-skills/`
4. `.agents/workflows/`
5. skills externas instaladas localmente

## 4. Politica de adopcion

Una skill externa entra al flujo estable del repo solo si:

- aporta valor directo al stack o al dominio
- no contradice el flujo interno
- puede auditarse
- queda documentada en `.github/AGENTS.md`

## 5. Estructura interna recomendada

### `.github/skills/`

Skills internas de operacion del repositorio.

### `project-skills/`

Skills propias del dominio de pagos, investigacion, auditoria y arquitectura.

### `.agents/workflows/`

Workflows reutilizables para fases, gitflow, QA y gobernanza.

## 6. Regla editorial

Si una skill externa se vuelve critica y recurrente, se debe crear una capa interna que la contextualice para `PasarelaDePago` en vez de depender de memoria implicita.

## 7. Conclusion

Las skills externas aceleran, pero la disciplina del repo se fija internamente. Esa separacion es clave para mantener autonomia sin perder consistencia.
