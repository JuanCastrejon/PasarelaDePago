# Slice Packs

Fecha de actualizacion: 2026-05-02

## 1. Objetivo

Guardar slices ejecutables del proyecto como artefactos versionados, no solo como ideas sueltas en conversacion.

## 2. Que contiene un slice pack

Cada slice pack debe dejar claro:

- por que existe
- que trazabilidad lo sustenta
- que superficies del repo toca
- que queda fuera de alcance
- que agentes participan
- que handoffs y gates humanos aplican
- que validaciones minimas debe pasar

## 3. Convencion

- un archivo principal por slice en `docs/backlog/slices/`
- ejemplos de handoff en `.github/agent-state/handoffs/examples/` cuando una slice merezca demostracion completa
- usar numeracion incremental por version semantica del slice

## 4. Estado actual

Slice pack disponible:

- `slice-payment-order-bootstrap1.md`
