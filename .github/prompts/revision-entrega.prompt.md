---
agent: ask
description: "Revision final de una rama o slice antes de PR, merge o despliegue."
---

# Revision de Entrega

Validar antes de cerrar una slice:

1. `git status` limpio o esperado
2. `typecheck` y `build` en verde
3. documentacion alineada
4. sin archivos privados o locales
5. PR listo o backlog actualizado

## Salida

- estado global: apto o no apto
- hallazgos criticos
- acciones inmediatas
