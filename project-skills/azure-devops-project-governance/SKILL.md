---
name: azure-devops-project-governance
description: Use when the PasarelaDePago project is ready to translate research, requirements, user stories, epics, features, backlog items, wiki structure, PR traceability, and documentation governance into Azure DevOps Boards, Wiki, Repos, queries, and dashboards.
---

# Azure DevOps Project Governance

Use this skill when the project is ready to move from repo-first research to Azure DevOps governance.

## Workflow

1. Read:
   - `CONTEXT.md`
   - `docs/plan-implementacion-pasarela-colombia.md`
   - `docs/plan-implementacion-pasarela-colombia1.md`
   - `docs/requisitos/requisitos-y-casos-de-uso.md`
   - `docs/requisitos/historias-de-usuario.md`
   - `docs/proceso/azure-devops-y-gobierno-del-proyecto1.md`
2. Do not create work items blindly. First confirm:
   - glossary is stable enough
   - epics are clear
   - features are sliceable
   - stories are actionable
3. Map work using this hierarchy:
   - Epic
   - Feature
   - User Story
   - Task
4. Keep documentation and delivery traceable:
   - docs -> work items
   - branches -> work items
   - PRs -> work items
5. For Azure Wiki, mirror the repo structure where possible and plan page order explicitly.
6. Prefer queries and dashboards that answer:
   - what is blocked
   - what is in research
   - what is ready for implementation
   - what is in validation

## Output shape

- proposed Azure DevOps project structure
- epics/features/story mapping
- wiki structure
- queries and dashboards to create
- traceability rules for branches and PRs
