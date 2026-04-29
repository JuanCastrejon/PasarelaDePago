# PasarelaDePago

`PasarelaDePago` es una plataforma personal de `payment orchestration` para Colombia. El proyecto se enfoca en cobros multiproveedor, rieles bancarios como `PSE` y `Bre-B`, payouts, resiliencia operativa, conciliacion y backoffice.

## Estado actual

La base fundacional del proyecto ya esta creada en dos capas:

- `documentacion`: investigacion, dominio, requisitos, backlog y ADRs
- `codigo`: primera slice del nucleo de dominio y orquestacion en TypeScript

## Navegacion recomendada

- [Indice maestro de documentacion](/C:/Users/juand/source/repos/PasarelaDePago/docs/indice-maestro1.md)
- [Glosario del dominio](/C:/Users/juand/source/repos/PasarelaDePago/docs/dominio/glosario-del-dominio1.md)
- [Vision y alcance](/C:/Users/juand/source/repos/PasarelaDePago/docs/requisitos/vision-y-alcance-del-producto1.md)
- [Modelo de dominio canonico](/C:/Users/juand/source/repos/PasarelaDePago/docs/dominio/modelo-de-dominio-canonico1.md)
- [Matriz de capacidades por proveedor](/C:/Users/juand/source/repos/PasarelaDePago/docs/matriz/matriz-de-capacidades-por-proveedor1.md)
- [Matriz canonica de estados por proveedor](/C:/Users/juand/source/repos/PasarelaDePago/docs/matriz/matriz-canonica-de-estados-por-proveedor1.md)
- [Roadmap por fases](/C:/Users/juand/source/repos/PasarelaDePago/docs/backlog/roadmap-por-fases1.md)

## Slice tecnica inicial

La primera base de implementacion se encuentra en `src/` e incluye:

- tipos de dominio para `payment_order`, `payment_attempt` y proveedores
- taxonomia canonica de estados
- matriz de capacidades en codigo
- normalizacion de estados crudos por proveedor
- politica inicial de retry y fallback

## Comandos

```bash
npm install
npm run typecheck
npm run build
```

## Nota sobre evidencia real

Los PDFs descargados desde correos y otros artefactos con datos personales reales se mantienen solo como evidencia local y estan excluidos del primer commit publico.
