import { execFileSync } from "node:child_process";

function runGit(args, { allowFailure = false } = {}) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    }).trim();
  } catch (error) {
    if (allowFailure) {
      return "";
    }

    const stderr = error.stderr?.toString().trim();
    throw new Error(stderr || error.message);
  }
}

function splitLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function resolveBaseRef() {
  const candidates = [
    process.env.VALIDATE_BASE_REF,
    process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : "",
    process.env.GITHUB_BASE_REF || "",
    "origin/develop",
    "develop",
    "origin/main",
    "main",
    "HEAD~1"
  ].filter(Boolean);

  for (const candidate of candidates) {
    const resolved = runGit(["rev-parse", "--verify", candidate], {
      allowFailure: true
    });

    if (resolved) {
      return candidate;
    }
  }

  return null;
}

function collectChangedFiles(baseRef) {
  const files = new Set();

  if (baseRef) {
    const mergeBase = runGit(["merge-base", "HEAD", baseRef], {
      allowFailure: true
    });

    if (mergeBase) {
      for (const file of splitLines(
        runGit(["diff", "--name-only", `${mergeBase}...HEAD`], {
          allowFailure: true
        })
      )) {
        files.add(file);
      }
    }
  }

  for (const file of splitLines(runGit(["diff", "--name-only"], { allowFailure: true }))) {
    files.add(file);
  }

  for (const file of splitLines(
    runGit(["diff", "--name-only", "--cached"], { allowFailure: true })
  )) {
    files.add(file);
  }

  return [...files].sort();
}

function matchesAny(filePath, matchers) {
  return matchers.some((matcher) => matcher.test(filePath));
}

const rules = [
  {
    name: "payment-core",
    triggers: [/^packages\/payment-core\//],
    requiresAny: [
      /^docs\/dominio\//,
      /^docs\/adr\//,
      /^docs\/matriz\//,
      /^docs\/backlog\//,
      /^\.github\/agent-state\//,
      /^docs\/agents\//
    ],
    message:
      "Cambios en packages/payment-core deben acompanarse de dominio, ADR, matrices, backlog o estado operativo."
  },
  {
    name: "web-operaciones",
    triggers: [/^apps\/web\//],
    requiresAny: [
      /^docs\/requisitos\//,
      /^docs\/arquitectura\//,
      /^docs\/backlog\//,
      /^docs\/proceso\//,
      /^\.github\/agent-state\//,
      /^docs\/agents\//
    ],
    message:
      "Cambios en apps/web deben acompanarse de requisitos, arquitectura, proceso o estado operativo."
  },
  {
    name: "integraciones-datos",
    triggers: [/^supabase\//],
    requiresAny: [
      /^docs\/dominio\//,
      /^docs\/requisitos\//,
      /^docs\/adr\//,
      /^docs\/backlog\//,
      /^\.github\/agent-state\//,
      /^docs\/agents\//
    ],
    message:
      "Cambios en supabase deben acompanarse de dominio, requisitos, ADRs o estado operativo."
  },
  {
    name: "skills-y-gobernanza",
    triggers: [/^\.github\/skills\//, /^project-skills\//],
    requiresAny: [/^\.github\/AGENTS\.md$/, /^docs\/skills\//, /^docs\/proceso\//],
    message:
      "Cambios en skills deben acompanarse de actualizacion en AGENTS, docs/skills o docs/proceso."
  },
  {
    name: "agentes-y-control-plane",
    triggers: [/^\.github\/agents\//, /^\.github\/agent-state\//],
    requiresAny: [/^\.github\/AGENTS\.md$/, /^docs\/agents\//, /^docs\/proceso\//],
    message:
      "Cambios en agentes o agent-state deben acompanarse de AGENTS, docs/agents o docs/proceso."
  }
];

const baseRef = resolveBaseRef();
const changedFiles = collectChangedFiles(baseRef);
const errors = [];
const infos = [];

if (changedFiles.length === 0) {
  console.log("Drift validation: PASS");
  console.log("- No hay archivos cambiados para evaluar.");
  process.exit(0);
}

for (const rule of rules) {
  const triggeredFiles = changedFiles.filter((filePath) =>
    matchesAny(filePath, rule.triggers)
  );

  if (triggeredFiles.length === 0) {
    continue;
  }

  const supportingFiles = changedFiles.filter((filePath) =>
    matchesAny(filePath, rule.requiresAny)
  );

  if (supportingFiles.length === 0) {
    errors.push({
      name: rule.name,
      message: rule.message,
      triggeredFiles
    });
    continue;
  }

  infos.push({
    name: rule.name,
    triggeredFiles,
    supportingFiles
  });
}

if (errors.length > 0) {
  console.error("Drift validation: FAIL");
  console.error(`- Base ref evaluada: ${baseRef || "sin referencia disponible"}`);

  for (const error of errors) {
    console.error(`- Regla: ${error.name}`);
    console.error(`  ${error.message}`);
    console.error(`  Disparo: ${error.triggeredFiles.join(", ")}`);
  }

  if (infos.length > 0) {
    console.error("Reglas satisfechas:");

    for (const info of infos) {
      console.error(
        `- ${info.name}: ${info.supportingFiles.join(", ")} respaldan ${info.triggeredFiles.join(", ")}`
      );
    }
  }

  process.exit(1);
}

console.log("Drift validation: PASS");
console.log(`- Base ref evaluada: ${baseRef || "sin referencia disponible"}`);

for (const info of infos) {
  console.log(
    `- ${info.name}: ${info.supportingFiles.join(", ")} respaldan ${info.triggeredFiles.join(", ")}`
  );
}
