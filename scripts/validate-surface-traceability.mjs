import fs from "node:fs";
import { execFileSync } from "node:child_process";

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

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

function gitLsFiles(paths) {
  return splitLines(runGit(["ls-files", "--", ...paths], { allowFailure: true }));
}

function unique(values) {
  return [...new Set(values)];
}

const matrix = JSON.parse(readFile(".github/agents/surface-traceability.json"));
const currentSlice = readFile(".github/agent-state/current-slice.md");
const baseRef = resolveBaseRef();
const changedFiles = collectChangedFiles(baseRef);
const errors = [];
const warnings = [];

const requirementsDoc = readFile("docs/requisitos/requisitos-funcionales-consolidados1.md");
const storiesDoc = readFile("docs/backlog/user-stories-priorizadas1.md");
const epicsDoc = readFile("docs/backlog/epics-y-features1.md");
const tasksDoc = readFile("docs/backlog/tasks-tecnicas-iniciales1.md");
const adrIndexDoc = readFile("docs/adr/adrs-base1.md");
const docMatrix = readFile("docs/agents/matriz-de-trazabilidad-por-superficie1.md");
const adrFiles = fs.readdirSync("docs/adr");

const ownedSurfaceMatch = currentSlice.match(/## Owned Surfaces\s+([\s\S]*?)(?=\n## |$)/);
const declaredOwnedSurfaces = ownedSurfaceMatch
  ? ownedSurfaceMatch[1]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2).trim())
      .filter(Boolean)
  : [];

if (!Array.isArray(matrix.roots) || matrix.roots.length === 0) {
  errors.push("surface-traceability.json no define roots");
}

if (!Array.isArray(matrix.surfaces) || matrix.surfaces.length === 0) {
  errors.push("surface-traceability.json no define surfaces");
}

const requiredOwners = new Set([
  "web-operaciones",
  "payment-core",
  "integraciones-datos",
  "qa-security-review"
]);

const sourceFiles = gitLsFiles(matrix.roots).filter(
  (filePath) =>
    !filePath.endsWith("package.json") &&
    !filePath.endsWith("tsconfig.json") &&
    !filePath.endsWith("next.config.ts") &&
    !filePath.endsWith("postcss.config.mjs") &&
    !filePath.endsWith("next-env.d.ts") &&
    !filePath.endsWith("config.toml")
);

function findMatchingSurfaces(filePath) {
  return matrix.surfaces.filter((surface) =>
    surface.pathPrefixes.some((prefix) => filePath.startsWith(prefix))
  );
}

for (const surface of matrix.surfaces) {
  if (!surface.id || !surface.owner || !surface.repoSurface) {
    errors.push(`Una surface carece de id, owner o repoSurface: ${JSON.stringify(surface)}`);
    continue;
  }

  if (!requiredOwners.has(surface.owner)) {
    errors.push(`La surface ${surface.id} apunta a un owner no permitido: ${surface.owner}`);
  }

  if (!Array.isArray(surface.pathPrefixes) || surface.pathPrefixes.length === 0) {
    errors.push(`La surface ${surface.id} no tiene pathPrefixes`);
  }

  if (!surface.references) {
    errors.push(`La surface ${surface.id} no tiene bloque references`);
    continue;
  }

  const { requirements = [], userStories = [], epicsOrFeatures = [], tasksTecnicas = [], adrs = [] } =
    surface.references;

  for (const requirementId of requirements) {
    if (!requirementsDoc.includes(`\`${requirementId}\``)) {
      errors.push(`La surface ${surface.id} referencia el requisito inexistente ${requirementId}`);
    }
  }

  for (const storyId of userStories) {
    if (!storiesDoc.includes(`\`${storyId}\``)) {
      errors.push(`La surface ${surface.id} referencia la user story inexistente ${storyId}`);
    }
  }

  for (const epicOrFeatureId of epicsOrFeatures) {
    if (!epicsDoc.includes(`\`${epicOrFeatureId}\``)) {
      errors.push(`La surface ${surface.id} referencia el feature inexistente ${epicOrFeatureId}`);
    }
  }

  for (const taskId of tasksTecnicas) {
    if (!tasksDoc.includes(`\`${taskId}\``)) {
      errors.push(`La surface ${surface.id} referencia la task inexistente ${taskId}`);
    }
  }

  for (const adrId of adrs) {
    const expectedPrefix = adrId.toLowerCase().replace("adr-", "adr-");
    const existsInFiles = adrFiles.some((fileName) => fileName.toLowerCase().startsWith(expectedPrefix));
    const existsInIndex = adrIndexDoc.includes(adrId);

    if (!existsInFiles || !existsInIndex) {
      errors.push(`La surface ${surface.id} referencia el ADR inexistente o no indexado ${adrId}`);
    }
  }

  if (!docMatrix.includes(surface.id) && !docMatrix.includes(`\`${surface.repoSurface}\``)) {
    warnings.push(`La surface ${surface.id} podria no estar claramente reflejada en la matriz markdown`);
  }
}

for (const filePath of sourceFiles) {
  const matches = findMatchingSurfaces(filePath);

  if (matches.length === 0) {
    errors.push(`El archivo fuente ${filePath} no esta cubierto por ninguna surface de trazabilidad`);
  }
}

const changedSourceFiles = changedFiles.filter((filePath) => sourceFiles.includes(filePath));

for (const filePath of changedSourceFiles) {
  const matches = findMatchingSurfaces(filePath);

  if (matches.length === 0) {
    errors.push(`El archivo cambiado ${filePath} no tiene surface trazable`);
    continue;
  }

  for (const surface of matches) {
    const declaredSurface = `\`${surface.repoSurface}\``;

    if (!declaredOwnedSurfaces.includes(declaredSurface)) {
      warnings.push(
        `El archivo cambiado ${filePath} cae en ${surface.repoSurface}, pero current-slice.md no declara esa superficie en Owned Surfaces`
      );
    }
  }
}

if (errors.length > 0) {
  console.error("Surface traceability validation: FAIL");
  console.error(`- Base ref evaluada: ${baseRef || "sin referencia disponible"}`);

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  if (warnings.length > 0) {
    console.error("Warnings:");

    for (const warning of unique(warnings)) {
      console.error(`- ${warning}`);
    }
  }

  process.exit(1);
}

console.log("Surface traceability validation: PASS");
console.log(`- Base ref evaluada: ${baseRef || "sin referencia disponible"}`);
console.log(`- Archivos fuente cubiertos: ${sourceFiles.length}`);
console.log(`- Archivos fuente cambiados: ${changedSourceFiles.length}`);

if (warnings.length > 0) {
  console.log("Warnings:");

  for (const warning of unique(warnings)) {
    console.log(`- ${warning}`);
  }
}
