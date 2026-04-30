---
description: "Gobernanza de personalizaciones del agente para PasarelaDePago. Usar cuando: se creen o actualicen skills, prompts, instrucciones, AGENTS, workflows o reglas del flujo operativo."
---

# Gobernanza de Personalizacion del Agente

## Reglas

1. `.github/` es la fuente primaria del flujo operativo del repo.
2. `project-skills/` contiene skills especializadas del dominio de pagos.
3. `.agents/workflows/` contiene guias de ejecucion y coordinacion.
4. Las skills internas del repo pueden tener `references/` y `prompts/` si agregan valor real; no deben quedarse en un `SKILL.md` superficial.
5. La documentacion publica debe quedar en espanol.
6. Toda nueva personalizacion debe reflejarse en `.github/AGENTS.md`.
7. Si una personalizacion impacta stack, rutas o estructura del monorepo, actualizar tambien `README.md` y el indice maestro mas reciente.

## Checklist

- actualizar `.github/AGENTS.md`
- revisar si cambia `README.md` o el indice maestro vigente
- evitar duplicar reglas ya presentes en `copilot-instructions.md`
- validar naming y descripciones de skills
- validar si la nueva personalizacion requiere `references/`
- validar si la nueva personalizacion debe reflejarse en un workflow local o en hooks
