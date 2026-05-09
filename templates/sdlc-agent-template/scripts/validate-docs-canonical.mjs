import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const docsRoot = path.join(repoRoot, "docs");
const errors = [];

const allowedNumberedBasenames = [
  /^plan-uat-F\d+\.md$/i
];

function walk(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      results.push(...walk(absolutePath));
      continue;
    }

    results.push(absolutePath);
  }

  return results;
}

function toRepoRelative(absolutePath) {
  return path.relative(repoRoot, absolutePath).replace(/\\/g, "/");
}

function isAllowedNumberedName(fileName) {
  return allowedNumberedBasenames.some((pattern) => pattern.test(fileName));
}

function hasLegacyNumericSuffix(fileName) {
  return /[A-Za-z][0-9]+\.md$/i.test(fileName) && !isAllowedNumberedName(fileName);
}

function collectTextFiles(rootPath) {
  return walk(rootPath).filter((absolutePath) =>
    /\.(md|mdx|json|ya?ml|mjs|js)$/i.test(absolutePath) &&
    !absolutePath.includes(`${path.sep}node_modules${path.sep}`) &&
    !absolutePath.includes(`${path.sep}.git${path.sep}`) &&
    !absolutePath.includes(`${path.sep}.next${path.sep}`) &&
    !absolutePath.includes(`${path.sep}.turbo${path.sep}`) &&
    !absolutePath.includes(`${path.sep}dist${path.sep}`) &&
    !absolutePath.includes(`${path.sep}coverage${path.sep}`) &&
    !absolutePath.includes(`${path.sep}graphify-out${path.sep}`)
  );
}

for (const absolutePath of walk(docsRoot)) {
  const relativePath = toRepoRelative(absolutePath);

  if (!relativePath.endsWith(".md")) {
    continue;
  }

  if (relativePath.startsWith("docs/archive/")) {
    continue;
  }

  const fileName = path.basename(relativePath);
  if (hasLegacyNumericSuffix(fileName)) {
    errors.push(`Documento activo con sufijo numerico legacy: ${relativePath}`);
  }
}

for (const absolutePath of collectTextFiles(repoRoot)) {
  const relativePath = toRepoRelative(absolutePath);

  if (relativePath.startsWith("docs/archive/")) {
    continue;
  }

  let content = fs.readFileSync(absolutePath, "utf8");

  if (relativePath.endsWith(".md")) {
    content = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  }

  const references = content.match(/docs\/[^)\s"'`]+\.md/g) || [];

  for (const reference of references) {
    if (reference.startsWith("docs/archive/")) {
      continue;
    }

    const fileName = path.basename(reference);
    if (hasLegacyNumericSuffix(fileName)) {
      errors.push(`Referencia activa a documento legacy numerado en ${relativePath}: ${reference}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Docs canonical validation: FAIL");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Docs canonical validation: PASS");
