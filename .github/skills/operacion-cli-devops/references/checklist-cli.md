# Checklist Operativo CLI

## Antes de abrir PR

- [ ] Rama correcta desde `develop`
- [ ] `git status` limpio de archivos no intencionales
- [ ] `git diff --staged` revisado
- [ ] `npm run typecheck`
- [ ] `npm run build`

## PR Draft

- [ ] Crear PR draft
- [ ] Usar body por archivo UTF-8
- [ ] Verificar `gh pr checks <numero_pr>`

## Infraestructura

- [ ] `vercel whoami`
- [ ] `supabase --version` o `supabase status` segun el caso
- [ ] `az account show` si se toca Azure/Azure DevOps
