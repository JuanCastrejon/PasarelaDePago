import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const requiredFiles = [
  ".github/AGENTS.md",
  ".github/agents/README.md",
  ".github/agents/ownership-matrix.md",
  ".github/agents/surface-traceability.json",
  ".github/agents/semantic-guardrails.json",
  ".github/agent-state/README.md",
  ".github/agent-state/phase-status.yaml",
  ".github/agent-state/current-slice.md",
  ".github/agent-state/open-decisions.md",
  ".github/agent-state/open-risks.md",
  ".github/agent-state/handoffs/TEMPLATE.md",
  ".github/agent-state/templates/current-slice-template.md",
  ".github/agent-state/templates/phase-gate.md",
  "docs/agents/mapa-de-agentes-y-handoffs1.md",
  "docs/agents/matriz-de-trazabilidad-por-superficie1.md",
  "docs/agents/guardrails-semanticos-del-dominio1.md"
];

const managedAgentIds = [
  "planificador-opus",
  "orquestador-opus",
  "analista-openspec",
  "arquitecto-dominio-pagos",
  "payment-core",
  "web-operaciones",
  "integraciones-datos",
  "qa-security-review"
];

const humanPlaceholders = new Set(["lead-testing-qa-review", "lead-deploy"]);

const requiredManifestSections = [
  "## Proposito",
  "## Entradas obligatorias",
  "## Salidas obligatorias",
  "## Skills obligatorias",
  "## Handoffs",
  "## No debe"
];

const requiredHandoffSections = [
  "## Objetivo",
  "## Fase",
  "## Agente origen",
  "## Agente destino",
  "## Artefactos de entrada",
  "## Skills a cargar",
  "## Salida esperada",
  "## Criterio de cierre",
  "## Riesgos abiertos",
  "## Gate humano"
];

const requiredCurrentSliceSections = [
  "## ID",
  "## Slice Type",
  "## Owner Plane",
  "## SDLC Phase",
  "## Objetivo",
  "## Source Traceability",
  "## Owned Surfaces",
  "## Validaciones",
  "## Gate humano"
];

const errors = [];
const warnings = [];

function readFile(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return fs.readFileSync(absolutePath, "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function parseBlockMap(yamlText, blockName) {
  const lines = yamlText.split(/\r?\n/);
  const startIndex = lines.findIndex((line) => line.trim() === `${blockName}:`);

  if (startIndex === -1) {
    return null;
  }

  const result = {};

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line.trim()) {
      break;
    }

    const match = line.match(/^ {2}([a-zA-Z0-9_]+):\s*"?(.*?)"?\s*$/);

    if (!match) {
      break;
    }

    result[match[1]] = match[2];
  }

  return result;
}

function parseCurrentSliceId(markdown) {
  const match = markdown.match(/## ID\s+`([^`]+)`/s);
  return match ? match[1] : null;
}

function collectBacktickedValues(markdown) {
  return [...markdown.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
}

for (const requiredFile of requiredFiles) {
  if (!exists(requiredFile)) {
    addError(`Falta archivo obligatorio: ${requiredFile}`);
  }
}

for (const agentId of managedAgentIds) {
  const manifestPath = `.github/agents/${agentId}.agent.md`;

  if (!exists(manifestPath)) {
    addError(`Falta manifiesto de agente: ${manifestPath}`);
    continue;
  }

  const manifestText = readFile(manifestPath);

  for (const section of requiredManifestSections) {
    if (!manifestText.includes(section)) {
      addError(`El manifiesto ${manifestPath} no contiene la seccion ${section}`);
    }
  }
}

if (exists(".github/agent-state/handoffs/TEMPLATE.md")) {
  const handoffTemplate = readFile(".github/agent-state/handoffs/TEMPLATE.md");

  for (const section of requiredHandoffSections) {
    if (!handoffTemplate.includes(section)) {
      addError(`La plantilla de handoff no contiene la seccion ${section}`);
    }
  }
}

if (exists(".github/agent-state/current-slice.md")) {
  const currentSlice = readFile(".github/agent-state/current-slice.md");

  for (const section of requiredCurrentSliceSections) {
    if (!currentSlice.includes(section)) {
      addError(`current-slice.md no contiene la seccion ${section}`);
    }
  }
}

if (exists(".github/agents/ownership-matrix.md")) {
  const ownershipMatrix = readFile(".github/agents/ownership-matrix.md");
  const backtickedValues = new Set(collectBacktickedValues(ownershipMatrix));

  for (const agentId of managedAgentIds) {
    if (!backtickedValues.has(agentId)) {
      addError(`La matriz de ownership no referencia al agente ${agentId}`);
    }
  }
}

if (exists(".github/agent-state/phase-status.yaml")) {
  const phaseStatusText = readFile(".github/agent-state/phase-status.yaml");
  const currentSliceMatch = phaseStatusText.match(/^current_slice:\s*"([^"]+)"\s*$/m);
  const currentPhaseMatch = phaseStatusText.match(/^current_phase:\s*"([^"]+)"\s*$/m);
  const phaseOwners = parseBlockMap(phaseStatusText, "phase_owners");
  const controlPlaneOwners = parseBlockMap(phaseStatusText, "control_plane");

  if (!currentSliceMatch) {
    addError("phase-status.yaml no define current_slice");
  }

  if (!currentPhaseMatch) {
    addError("phase-status.yaml no define current_phase");
  }

  if (!phaseOwners) {
    addError("phase-status.yaml no define phase_owners");
  } else {
    for (const [phaseName, owner] of Object.entries(phaseOwners)) {
      if (humanPlaceholders.has(owner)) {
        continue;
      }

      if (!managedAgentIds.includes(owner)) {
        addError(`phase_owners.${phaseName} apunta a un owner no gestionado: ${owner}`);
      }
    }
  }

  if (!controlPlaneOwners) {
    addError("phase-status.yaml no define control_plane");
  } else {
    for (const [slotName, owner] of Object.entries(controlPlaneOwners)) {
      if (!managedAgentIds.includes(owner)) {
        addError(`control_plane.${slotName} apunta a un owner no gestionado: ${owner}`);
      }
    }
  }

  if (exists(".github/agent-state/current-slice.md")) {
    const currentSliceMarkdown = readFile(".github/agent-state/current-slice.md");
    const currentSliceId = parseCurrentSliceId(currentSliceMarkdown);

    if (!currentSliceId) {
      addError("current-slice.md no contiene un ID parseable");
    } else if (currentSliceMatch && currentSliceId !== currentSliceMatch[1]) {
      addError(
        `Desalineacion de slice actual: phase-status.yaml=${currentSliceMatch[1]} y current-slice.md=${currentSliceId}`
      );
    }
  }
}

if (exists("docs/agents/mapa-de-agentes-y-handoffs1.md")) {
  const agentMap = readFile("docs/agents/mapa-de-agentes-y-handoffs1.md");

  for (const label of [
    "Planificador Opus",
    "Orquestador Opus",
    "Analista OpenSpec",
    "Arquitecto Dominio Pagos",
    "Payment Core",
    "Web Operaciones",
    "Integraciones y Datos",
    "QA Security Review"
  ]) {
    if (!agentMap.includes(label)) {
      addError(`El mapa de agentes no referencia ${label}`);
    }
  }
}

if (exists(".github/agent-state/open-decisions.md")) {
  const openDecisions = readFile(".github/agent-state/open-decisions.md");

  if (!openDecisions.includes("## Decision")) {
    addWarning("open-decisions.md existe pero no contiene decisiones registradas");
  }
}

if (exists(".github/agent-state/open-risks.md")) {
  const openRisks = readFile(".github/agent-state/open-risks.md");

  if (!openRisks.includes("## Riesgo")) {
    addWarning("open-risks.md existe pero no contiene riesgos registrados");
  }
}

if (errors.length > 0) {
  console.error("Control plane validation: FAIL");

  for (const message of errors) {
    console.error(`- ${message}`);
  }

  if (warnings.length > 0) {
    console.error("Warnings:");

    for (const message of warnings) {
      console.error(`- ${message}`);
    }
  }

  process.exit(1);
}

console.log("Control plane validation: PASS");

if (warnings.length > 0) {
  console.log("Warnings:");

  for (const message of warnings) {
    console.log(`- ${message}`);
  }
}
