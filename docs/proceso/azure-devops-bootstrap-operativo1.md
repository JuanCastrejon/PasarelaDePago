# Azure DevOps Bootstrap Operativo v1

Fecha de actualizacion: 2026-04-30

## 1. Objetivo

Dejar preparado el salto desde GitHub como tracker primario hacia Azure DevOps como capa complementaria de gobierno, boards y wiki.

## 2. Hallazgo operativo

La organizacion accesible desde la cuenta autenticada es:

- `https://dev.azure.com/juancastrejondb/`

La deteccion se hizo usando token de Entra ID y la API de cuentas de Azure DevOps.

## 3. Bootstrap minimo recomendado

1. Crear proyecto `PasarelaDePago`.
2. Usar proceso `Agile`.
3. Mantener visibilidad `private`.
4. Crear `project wiki`.
5. Definir `Area Paths` por dominio.
6. Definir `Iteration Paths` por fases.

## 4. Domains sugeridos para Areas

- `Research`
- `Payment Core`
- `Provider Integrations`
- `Payouts`
- `Operations`
- `Platform`
- `Portfolio`

## 5. Fases sugeridas para Iterations

- `Fase 0 - Fundacion documental`
- `Fase 1 - Foundation tecnica`
- `Fase 2 - Primer flujo de cobro`
- `Fase 3 - Multiproveedor`
- `Fase 4 - Operacion y conciliacion`
- `Fase 5 - Payouts y Bre-B`

## 6. Estado

Bootstrap ejecutado.

### Proyecto creado

- Nombre: `PasarelaDePago`
- Proceso: `Agile`
- Visibilidad: `private`
- URL: `https://dev.azure.com/juancastrejondb/PasarelaDePago`

### Wiki creado

- Nombre: `PasarelaDePagoWiki`
- Paginas iniciales:
  - `Home`
  - `Stack`
  - `Proceso`

### Areas creadas

- `Research`
- `Payment Core`
- `Provider Integrations`
- `Payouts`
- `Operations`
- `Platform`
- `Portfolio`

### Iterations creadas

- `Fase 0 - Fundacion documental`
- `Fase 1 - Foundation tecnica`
- `Fase 2 - Primer flujo de cobro`
- `Fase 3 - Multiproveedor`
- `Fase 4 - Operacion y conciliacion`
- `Fase 5 - Payouts y Bre-B`
