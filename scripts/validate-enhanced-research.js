#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const changesDir = path.join(repoRoot, "openspec", "changes");
const catalogPath = path.join(repoRoot, "docs", "domain", "reglas-negocio-catalogo.md");

const requiredSections = [
  "Problem Statement",
  "Stakeholders afectados",
  "Objetivo del cambio",
  "Fuentes revisadas",
  "Estado actual observado",
  "Drift / restricciones",
  "Alcance propuesto",
  "Capacidades candidatas",
  "Preguntas abiertas"
];

const conditionalSections = [
  "Proceso AS-IS",
  "Proceso TO-BE",
  "Diagrama de estados"
];

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function findSections(content, sectionNames) {
  const missing = [];

  for (const name of sectionNames) {
    const regex = new RegExp(`^##\\s+${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "mi");
    if (!regex.test(content)) {
      missing.push(name);
    }
  }

  return missing;
}

function extractRuleIds(content) {
  return [...new Set(content.match(/\bRN-[A-Z]+-\d+\b/g) || [])];
}

function hasMermaidDiagram(sectionContent) {
  return /```mermaid/i.test(sectionContent);
}

function getSectionContent(content, sectionName) {
  const escaped = sectionName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^##\\s+${escaped}\\s*\\r?\\n([\\s\\S]*?)(?=\\r?\\n##\\s+|$)`, "im");
  const match = content.match(regex);

  if (!match) {
    return "";
  }

  return match[1]
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
}

function isEffectivelyEmpty(sectionContent) {
  return sectionContent
    .replace(/```[\s\S]*?```/g, "")
    .trim().length < 10;
}

function validate(changeName) {
  const researchPath = path.join(changesDir, changeName, "research.md");
  const research = readFile(researchPath);

  if (!research) {
    console.error(`research.md no encontrado: ${researchPath}`);
    process.exit(1);
  }

  const catalog = readFile(catalogPath) || "";
  const errors = [];
  const warnings = [];

  const missingRequired = findSections(research, requiredSections);
  for (const section of missingRequired) {
    errors.push(`Seccion obligatoria faltante: "${section}"`);
  }

  const missingConditional = findSections(research, conditionalSections);
  for (const section of missingConditional) {
    warnings.push(`Seccion condicional no encontrada: "${section}" - verificar si aplica`);
  }

  if (!missingRequired.includes("Problem Statement")) {
    const content = getSectionContent(research, "Problem Statement");
    if (isEffectivelyEmpty(content)) {
      errors.push('La seccion "Problem Statement" esta vacia o solo tiene placeholders');
    }
  }

  if (!missingRequired.includes("Stakeholders afectados")) {
    const content = getSectionContent(research, "Stakeholders afectados");
    const hasRows = (content.match(/^\|.*\|$/gm) || []).length >= 3;
    if (!hasRows && isEffectivelyEmpty(content)) {
      errors.push('La seccion "Stakeholders afectados" esta vacia o solo tiene placeholders');
    }
  }

  const ruleIds = extractRuleIds(research);
  if (ruleIds.length === 0) {
    warnings.push("No se detectaron IDs de reglas de negocio (RN-XXX-NNN) en el research");
  } else {
    for (const ruleId of ruleIds) {
      if (!catalog.includes(ruleId)) {
        warnings.push(`Regla ${ruleId} aparece en research pero no esta catalogada en docs/domain/reglas-negocio-catalogo.md`);
      }
    }
  }

  for (const sectionName of ["Proceso AS-IS", "Proceso TO-BE"]) {
    if (!missingConditional.includes(sectionName)) {
      const sectionContent = getSectionContent(research, sectionName);
      if (sectionContent && !hasMermaidDiagram(sectionContent) && !sectionContent.includes("N/A")) {
        warnings.push(`La seccion "${sectionName}" existe pero no contiene diagrama Mermaid`);
      }
    }
  }

  console.log(`Validacion de research para change: ${changeName}`);
  console.log(`- Secciones obligatorias cubiertas: ${requiredSections.length - missingRequired.length}/${requiredSections.length}`);
  console.log(`- Secciones condicionales cubiertas: ${conditionalSections.length - missingConditional.length}/${conditionalSections.length}`);
  console.log(`- Reglas detectadas: ${ruleIds.length}`);

  if (errors.length > 0) {
    console.error("Enhanced research validation: FAIL");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    if (warnings.length > 0) {
      console.error("Warnings:");
      for (const warning of warnings) {
        console.error(`- ${warning}`);
      }
    }
    process.exit(1);
  }

  console.log("Enhanced research validation: PASS");
  if (warnings.length > 0) {
    console.log("Warnings:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
  }
}

const changeName = process.argv[2];

if (!changeName) {
  console.error("Uso: node scripts/validate-enhanced-research.js <change-name>");
  process.exit(1);
}

validate(changeName);
