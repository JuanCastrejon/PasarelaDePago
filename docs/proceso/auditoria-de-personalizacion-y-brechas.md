---
status: active
updated: 2026-05-09
supersedes:
  - docs/proceso/auditoria-de-personalizacion-y-brechas1.md
---

# Auditoria de Personalizacion y Brechas v1

Fecha de actualizacion: 2026-04-30

## 1. Objetivo

Comparar la personalizacion actual del repositorio contra las referencias internas de otros proyectos y detectar que faltaba para que `PasarelaDePago` tuviera un flujo de trabajo comparable o superior.

## 2. Fuentes comparadas

- `copia_.github_otro_proyecto_de_referencia/.github_otro_proyecto`
- `copia_.github_otro_proyecto_de_referencia/copia_.github_proyecto_referencia`
- skills externas y autodeteccion del stack

## 3. Brechas detectadas

### Gobernanza insuficiente de skills

Antes:

- skills internas demasiado cortas
- sin `references/`
- sin allowlist curada por stack

Ahora:

- skills internas con `references/`
- skill nueva de auditoria backend
- skill nueva de UI/UX operativa
- allowlist de autoskills y skills externas documentada

### Instrucciones por stack incompletas

Antes:

- reglas generales de dominio y gitflow

Ahora:

- instrucciones especificas para `Next.js`
- instrucciones para `SQL/Supabase`
- instrucciones para `workflows/asincronia`
- instrucciones de testing/calidad

### Esqueleto tecnico insuficiente

Antes:

- solo una slice en `src/`

Ahora:

- monorepo con `apps/`, `packages/`, `supabase/` y `tests/contract/`
- `autoskills` ya detecta `Next.js`, `Supabase`, `Playwright`, `Vitest`, `Turborepo` y mas

### Operacion local poco endurecida

Antes:

- sin hooks locales documentados
- `MCP.md` muy superficial

Ahora:

- hooks base de guardrails
- documentacion CLI/MCP mas aterrizada
- bootstrap inicial para Azure DevOps

## 4. Conclusiones

El gap principal no era solo documental: era de densidad operativa. El repo necesitaba que el stack se viera, que las skills cargaran contexto progresivo y que el gobierno del proyecto dejara de depender de memoria oral.

