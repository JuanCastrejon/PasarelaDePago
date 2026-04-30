---
description: "Gobernanza de personalizaciones del agente para PasarelaDePago. Usar cuando: se creen o actualicen skills, prompts, instrucciones, AGENTS, workflows o reglas del flujo operativo."
---

# Gobernanza de Personalizacion del Agente

## Reglas

1. `.github/` es la fuente primaria del flujo operativo del repo.
2. `project-skills/` contiene skills especializadas del dominio de pagos.
3. `.agents/workflows/` contiene guias de ejecucion y coordinacion.
4. La documentacion publica debe quedar en espanol.
5. Toda nueva personalizacion debe reflejarse en `.github/AGENTS.md`.

## Checklist

- actualizar `.github/AGENTS.md`
- revisar si cambia `README.md` o `docs/indice-maestro1.md`
- evitar duplicar reglas ya presentes en `copilot-instructions.md`
- validar naming y descripciones de skills
