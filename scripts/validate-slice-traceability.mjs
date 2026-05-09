import fs from "node:fs";
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

function readFile(relativePath) {
  return fs.readFileSync(relativePath, "utf8");
}

function sectionBody(markdown, sectionTitle) {
  const escaped = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`#{2,3} ${escaped}\\s+([\\s\\S]*?)(?=\\n#{2,3} |$)`);
  const match = markdown.match(regex);
  return match ? match[1].trim() : "";
}

function bulletValues(markdown, sectionTitle) {
  const body = sectionBody(markdown, sectionTitle);
  return body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);
}

function backtickedIds(values) {
  return values
    .map((value) => {
      const match = value.match(/`([^`]+)`/);
      return match ? match[1] : value;
    })
    .filter(Boolean)
    .filter((value) => !/^N\/A$/i.test(value));
}

const currentSlicePath = ".github/agent-state/current-slice.md";
const currentSliceText = readFile(currentSlicePath);
const baseRef = resolveBaseRef();
const changedFiles = collectChangedFiles(baseRef);
const errors = [];
const infos = [];

const sliceTypeValues = bulletValues(currentSliceText, "Slice Type");
const ownerPlaneValues = bulletValues(currentSliceText, "Owner Plane");
const ownedSurfaces = bulletValues(currentSliceText, "Owned Surfaces");
const validations = bulletValues(currentSliceText, "Validaciones");

const traceabilitySections = {
  requisitos: backtickedIds(bulletValues(currentSliceText, "Requisitos")),
  userStories: backtickedIds(bulletValues(currentSliceText, "User Stories")),
  epicsOrFeatures: backtickedIds(bulletValues(currentSliceText, "Epics o Features")),
  tasksTecnicas: backtickedIds(bulletValues(currentSliceText, "Tasks Tecnicas")),
  adrs: backtickedIds(bulletValues(currentSliceText, "ADRs")),
  governance: bulletValues(currentSliceText, "Fuentes de gobernanza")
};

if (sliceTypeValues.length === 0) {
  errors.push("current-slice.md no declara Slice Type");
}

if (ownerPlaneValues.length === 0) {
  errors.push("current-slice.md no declara Owner Plane");
}

if (ownedSurfaces.length === 0) {
  errors.push("current-slice.md no declara Owned Surfaces");
}

for (const requiredValidation of [
  "`npm run validate:control-plane`",
  "`npm run validate:drift`",
  "`npm run validate:slice-traceability`",
  "`npm run validate:surface-traceability`",
  "`npm run validate:semantic-guardrails`"
]) {
  if (!validations.includes(requiredValidation)) {
    errors.push(`current-slice.md no incluye la validacion ${requiredValidation}`);
  }
}

const requirementsDoc = readFile("docs/requisitos/requisitos-funcionales-consolidados.md");
const storiesDoc = readFile("docs/backlog/user-stories-priorizadas.md");
const epicsDoc = readFile("docs/backlog/epics-y-features.md");
const tasksDoc = readFile("docs/backlog/tasks-tecnicas-iniciales.md");
const adrIndexDoc = readFile("docs/adr/adrs-base.md");
const adrFiles = fs.readdirSync("docs/adr");

for (const requirementId of traceabilitySections.requisitos) {
  if (!requirementsDoc.includes(`\`${requirementId}\``)) {
    errors.push(`El requisito ${requirementId} no existe en docs/requisitos/requisitos-funcionales-consolidados.md`);
  }
}

for (const storyId of traceabilitySections.userStories) {
  if (!storiesDoc.includes(`\`${storyId}\``)) {
    errors.push(`La user story ${storyId} no existe en docs/backlog/user-stories-priorizadas.md`);
  }
}

for (const epicOrFeatureId of traceabilitySections.epicsOrFeatures) {
  if (!epicsDoc.includes(`\`${epicOrFeatureId}\``)) {
    errors.push(`El epic o feature ${epicOrFeatureId} no existe en docs/backlog/epics-y-features.md`);
  }
}

for (const taskId of traceabilitySections.tasksTecnicas) {
  if (!tasksDoc.includes(`\`${taskId}\``)) {
    errors.push(`La task tecnica ${taskId} no existe en docs/backlog/tasks-tecnicas-iniciales.md`);
  }
}

for (const adrId of traceabilitySections.adrs) {
  const expectedPrefix = adrId.toLowerCase().replace("adr-", "adr-");
  const existsInFiles = adrFiles.some((fileName) => fileName.toLowerCase().startsWith(expectedPrefix));
  const existsInIndex = adrIndexDoc.includes(adrId);

  if (!existsInFiles || !existsInIndex) {
    errors.push(`El ADR ${adrId} no existe o no esta indexado en docs/adr`);
  }
}

const changedCategories = {
  product: changedFiles.some((filePath) =>
    /^(apps\/web\/|packages\/payment-core\/|supabase\/)/.test(filePath)
  ),
  governance: changedFiles.some((filePath) =>
    /^(\.github\/|docs\/proceso\/|docs\/agents\/|scripts\/)/.test(filePath)
  )
};

if (changedCategories.product) {
  if (!sliceTypeValues.includes("`product`") && !sliceTypeValues.includes("`hybrid`")) {
    errors.push("Hay cambios de producto pero current-slice.md no esta marcado como product o hybrid");
  }

  const hasProductTraceability =
    traceabilitySections.requisitos.length > 0 ||
    traceabilitySections.userStories.length > 0 ||
    traceabilitySections.epicsOrFeatures.length > 0 ||
    traceabilitySections.tasksTecnicas.length > 0 ||
    traceabilitySections.adrs.length > 0;

  if (!hasProductTraceability) {
    errors.push("Hay cambios de producto pero current-slice.md no referencia requisitos, stories, features, tasks o ADRs");
  }

  for (const requiredSurface of ["`apps/web`", "`packages/payment-core`", "`supabase`"]) {
    if (
      changedFiles.some((filePath) => filePath.startsWith(requiredSurface.replace(/`/g, "") + "/")) &&
      !ownedSurfaces.includes(requiredSurface)
    ) {
      errors.push(`Hay cambios en ${requiredSurface} pero Owned Surfaces no lo declara`);
    }
  }
}

if (changedCategories.governance) {
  if (!sliceTypeValues.includes("`governance`") && !sliceTypeValues.includes("`hybrid`")) {
    errors.push("Hay cambios de gobernanza pero current-slice.md no esta marcado como governance o hybrid");
  }

  if (traceabilitySections.governance.length === 0) {
    errors.push("Hay cambios de gobernanza pero current-slice.md no declara Fuentes de gobernanza");
  }

  const governanceTouched = [".github", "docs", "scripts"].filter((surface) =>
    changedFiles.some((filePath) => filePath.startsWith(`${surface}/`) || filePath.startsWith(`${surface}\\`))
  );

  for (const surface of governanceTouched) {
    const backtickedSurface = `\`${surface}\``;

    if (!ownedSurfaces.includes(backtickedSurface)) {
      errors.push(`Hay cambios en ${surface} pero Owned Surfaces no lo declara`);
    }
  }
}

infos.push(`Base ref evaluada: ${baseRef || "sin referencia disponible"}`);
infos.push(`Slice type: ${sliceTypeValues.join(", ") || "no declarado"}`);
infos.push(`Archivos cambiados: ${changedFiles.length}`);

if (errors.length > 0) {
  console.error("Slice traceability validation: FAIL");

  for (const info of infos) {
    console.error(`- ${info}`);
  }

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("Slice traceability validation: PASS");

for (const info of infos) {
  console.log(`- ${info}`);
}


