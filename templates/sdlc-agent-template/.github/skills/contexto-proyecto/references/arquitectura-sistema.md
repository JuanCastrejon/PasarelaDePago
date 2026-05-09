# Arquitectura del Sistema

## Capas

1. `payment-core`
   - entidades
   - contratos
   - errores
   - politicas de orquestacion
2. `apps/web`
   - panel y backoffice
   - route handlers
   - futuras superficies de checkout y operaciones
3. `supabase`
   - persistencia, RLS, tipos y migraciones

## Regla central

La verdad de negocio vive en nuestro dominio canonico, no en los nombres crudos de cada proveedor.
