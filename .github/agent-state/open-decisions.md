# Open Decisions

## Decision 1

- tema: memoria operativa compartida
- estado: abierta
- owner sugerido: `Lead`
- contexto: la v1 separa memoria normativa del repo y memoria operativa en `.github/agent-state/`
- siguiente paso: decidir si basta con archivos versionados o si se adopta una herramienta externa como capa complementaria

## Decision 2

- tema: cobertura del agente de aseguramiento
- estado: abierta
- owner sugerido: `Lead`
- contexto: `qa-security-review` cubre QA adversarial, seguridad y reporte tecnico, pero la aprobacion final sigue siendo humana
- siguiente paso: decidir si en una v2 se separa `qa` y `security-review` en dos agentes especializados

## Decision 3

- tema: drift entre OpenSpec, ADRs y codigo
- estado: abierta
- owner sugerido: `Lead`
- contexto: ya existe un gate ligero en `npm run validate:drift`, pero todavia no detecta drift semantico profundo entre specs, ADRs y codigo
- siguiente paso: decidir si el siguiente nivel sera una verificacion mas rica inspirada en `spec-gen`

## Decision 4

- tema: granularidad de la matriz por superficie
- estado: abierta
- owner sugerido: `Lead`
- contexto: ya existe una matriz machine-readable por superficie real del repo, pero aun puede crecer hacia submodulos mas finos o coverage de configuracion
- siguiente paso: decidir cuando conviene bajar de `surface` a `subsurface` o `module contract`

## Decision 5

- tema: profundidad de los guardrails semanticos
- estado: abierta
- owner sugerido: `Lead`
- contexto: la primera version valida invariantes fundacionales del dominio, pero todavia no modela contradicciones semanticas mas complejas entre features futuras y codigo
- siguiente paso: decidir si una siguiente iteracion incorpora reglas por bounded context o por capability
