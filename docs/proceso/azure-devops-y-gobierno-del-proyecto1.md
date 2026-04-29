# Azure DevOps y Gobierno del Proyecto v1

Fecha de actualizacion: 2026-04-29

## 1. Objetivo

Definir cómo usar Azure DevOps más adelante para manejar el proyecto de forma profesional, sin mezclarlo todavía con la fase de investigación.

## 2. Decisión de proceso

Por ahora:

- la investigación vive en el repositorio
- el repo es la fuente primaria de conocimiento

Más adelante:

- Azure DevOps será la capa de `gobierno, backlog, trazabilidad y colaboración`

## 3. Qué sí aporta Azure DevOps a este proyecto

### Azure Boards

Nos sirve para:

- epics
- features
- user stories
- tasks
- bugs
- dependencias
- queries
- dashboards

Microsoft documenta que:

- `Features` agrupan historias
- `Epics` agrupan features

Eso encaja bien con nuestro proyecto porque podemos reflejar:

- Epic: Payments Core
- Feature: Wompi Pay-in
- Story: Crear order + attempt + webhook validation

### Azure Wiki

Nos sirve para:

- publicar documentación operativa
- tener una navegación ordenada
- exponer ADRs, glosario y runbooks

La documentación oficial indica que el wiki usa una estructura Git y un archivo `.order` para definir la secuencia de páginas.

### Azure Repos y PR traceability

Nos sirve para:

- ligar PRs con work items
- construir trazabilidad entre investigación, requisito y código

Microsoft documenta que se puede crear un PR enlazando work items directamente con:

`az repos pr create --work-items <Id1> <Id2>`

### Queries y dashboards

Azure Boards soporta tres tipos de consulta:

- flat list
- direct links
- tree

Eso sirve para:

- ver backlog plano
- ver dependencias
- ver jerarquías tipo Epic > Feature > Story

## 4. Qué no debemos hacer todavía

- no migrar toda la investigación de inmediato a Azure Boards
- no crear cientos de work items antes de estabilizar requisitos
- no usar Azure DevOps como sustituto del pensamiento de producto

Primero debemos tener:

- glosario
- requisitos
- historias
- decisiones de arquitectura
- investigación por proveedor

## 5. Propuesta de estructura futura en Azure Boards

## 5.1 Epics sugeridos

- `Research and Compliance`
- `Payments Core`
- `Provider Integrations`
- `Payouts`
- `Observability and Reconciliation`
- `Merchant Platform`
- `Security and Governance`
- `Portfolio Readiness`

## 5.2 Features sugeridas

Ejemplos:

- `Wompi pay-in integration`
- `PayU Bre-B integration`
- `Webhook normalization`
- `Provider capability matrix`
- `Payout batch processing`
- `Merchant onboarding`
- `Audit and reporting`

## 5.3 User Stories

Las historias que ya estamos documentando en el repo se migrarán después como:

- `User Story` si entregan valor de usuario
- `Task` si son trabajo técnico interno
- `Bug` cuando ya exista producto operativo

## 6. Propuesta de uso del Wiki

Publicar luego:

- glosario
- arquitectura
- ADRs
- runbooks
- guías de integración
- documentación operativa

Recomendación:

- mantener la navegación con `.order`
- replicar una estructura parecida a `docs/` para evitar pérdida de contexto

## 7. Propuesta de queries

### Query plana

Para:

- backlog priorizado
- bugs abiertos
- tareas activas

### Query de links directos

Para:

- dependencias
- items bloqueados
- work items vinculados a bugs o bugs sin parent

### Query de árbol

Para:

- épicas, features e historias
- visión de avance por dominio

## 8. Trazabilidad recomendada

Cuando ya estemos implementando:

1. Cada investigación relevante produce o actualiza un documento.
2. Cada documento relevante alimenta una feature o user story.
3. Cada branch y PR debe vincularse a uno o más work items.
4. Cada PR debe dejar rastro a requisito, historia y decisión.

## 9. Cómo usar el crédito de estudiante con criterio

El crédito de `100 USD` de `Azure for Students` debe reservarse más para infraestructura del producto que para la capa de Boards/Wiki.

Usos potenciales más valiosos después:

- ambiente de staging alterno o laboratorio
- servicios de observabilidad
- pruebas con funciones o colas
- almacenamiento de evidencias o archivos
- secretos y configuración

La documentación oficial de Microsoft indica que `Azure for Students` entrega `100 USD` por `12 meses`, renovables mientras sigas siendo estudiante elegible.

## 10. Free tier útil de Azure DevOps

La documentación de Azure DevOps indica, entre otras cosas:

- `Azure Boards` incluido
- `Azure Repos` privados ilimitados
- primeros `5 usuarios Basic` gratis
- free tier de pipelines con límites de paralelismo y minutos

Implicacion:

- para esta etapa podemos usar Azure DevOps de forma profesional sin quemar el crédito de Azure en lo documental

## 11. Momento recomendado de entrada

Entraremos fuerte a Azure DevOps cuando estén listos:

1. el glosario del dominio
2. el paquete inicial de requisitos
3. el backlog de investigación priorizado
4. la primera versión de epics/features

## 12. Fuentes oficiales

- Azure Boards - epics y features:
  [learn.microsoft.com/en-us/azure/devops/boards/backlogs/define-features-epics](https://learn.microsoft.com/en-us/azure/devops/boards/backlogs/define-features-epics?tabs=agile-process&view=azure-devops)
- Azure Boards - queries:
  [learn.microsoft.com/en-us/azure/devops/boards/queries/about-managed-queries](https://learn.microsoft.com/en-us/azure/devops/boards/queries/about-managed-queries?view=azure-devops)
- Azure Repos - PRs y work items:
  [learn.microsoft.com/en-us/azure/devops/repos/git/pull-requests](https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-requests?view=azure-devops)
- Azure Wiki - estructura y `.order`:
  [learn.microsoft.com/en-us/azure/devops/project/wiki/wiki-file-structure](https://learn.microsoft.com/en-us/azure/devops/project/wiki/wiki-file-structure?view=azure-devops)
- Azure Wiki - Markdown:
  [learn.microsoft.com/en-us/azure/devops/project/wiki/markdown-guidance](https://learn.microsoft.com/en-us/azure/devops/project/wiki/markdown-guidance?view=azure-devops)
- Azure for Students:
  [learn.microsoft.com/en-us/azure/education-hub/about-azure-for-students](https://learn.microsoft.com/en-us/azure/education-hub/about-azure-for-students)
- Azure DevOps billing overview:
  [learn.microsoft.com/en-us/azure/devops/organizations/billing/overview](https://learn.microsoft.com/en-us/azure/devops/organizations/billing/overview?view=azure-devops)
