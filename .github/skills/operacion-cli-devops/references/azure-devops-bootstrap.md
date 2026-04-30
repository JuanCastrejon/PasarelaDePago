# Azure DevOps Bootstrap

## Organizacion detectada

- `https://dev.azure.com/juancastrejondb/`

## Bootstrap minimo recomendado

1. crear proyecto `PasarelaDePago` con proceso `Agile`
2. dejarlo privado
3. crear project wiki
4. definir areas por dominio y iterations por fases
5. documentar el resultado en `docs/proceso/`

## Comandos de referencia

```powershell
az devops configure --defaults organization=https://dev.azure.com/juancastrejondb/
az devops project create --name PasarelaDePago --source-control git --process Agile --visibility private
az devops wiki create --name PasarelaDePago --type projectwiki --project PasarelaDePago
```
