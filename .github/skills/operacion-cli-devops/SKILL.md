---
name: operacion-cli-devops
description: "Operacion profesional con GitHub CLI, Supabase CLI, Vercel CLI y Azure CLI para PasarelaDePago. Usar cuando se prepare un PR, se validen checks, se enlace infraestructura o se gobiernen skills externas."
---

# Operacion CLI y DevOps

## Regla de oro

No abrir PR listo para merge si las validaciones o checks obligatorios estan fallando.

## Herramientas clave

- `gh` para PRs, checks y issues
- `supabase` para base de datos y tipos
- `vercel` para despliegues
- `az` y `az devops` para gobierno posterior

## Flujo recomendado

1. desarrollar en rama de trabajo
2. validar localmente
3. abrir PR draft
4. corregir CI
5. pasar PR a ready
