# External tools matrix

Inventario base de herramientas externas, bundles de skills y CLIs que el
template reconoce.

| Tool | Estado | Entra al template base | Comentario |
|---|---|---|---|
| OpenSpec | `base` | si | perfil `analysis-first-sdd` por defecto |
| enrich-us / commit | `base` | si | skills oficiales del flujo |
| autoskills | `opcional` | solo gobernanza | util segun stack |
| Graphify | `opcional` | solo documentacion | util en corpus grandes |
| mattpocock/skills | `opcional` | solo documentacion | complementarias a OpenSpec |

## Regla de mantenimiento

1. Si cambia una herramienta instalada, actualizar esta matriz.
2. Si una herramienta pasa de opcional a base, registrarlo aqui.
3. Si una herramienta externa contradice una regla interna del repo, prevalece `.github/`.
