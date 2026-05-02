import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function walkFiles(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  const stats = fs.statSync(absolutePath);

  if (stats.isFile()) {
    return [relativePath.replace(/\\/g, "/")];
  }

  const results = [];

  for (const entry of fs.readdirSync(absolutePath, { withFileTypes: true })) {
    const childRelative = path.join(relativePath, entry.name).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      results.push(...walkFiles(childRelative));
    } else {
      results.push(childRelative);
    }
  }

  return results;
}

function assert(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function includesAll(text, expectedSnippets) {
  return expectedSnippets.every((snippet) => text.includes(snippet));
}

const errors = [];
const warnings = [];

const guardrailsPath = ".github/agents/semantic-guardrails.json";
assert(exists(guardrailsPath), `Falta ${guardrailsPath}`, errors);
assert(
  exists("docs/agents/guardrails-semanticos-del-dominio1.md"),
  "Falta docs/agents/guardrails-semanticos-del-dominio1.md",
  errors
);

if (errors.length === 0) {
  const guardrails = JSON.parse(read(guardrailsPath));
  const ruleIds = new Set((guardrails.rules || []).map((rule) => rule.id));

  for (const requiredRule of [
    "async-truth-is-final",
    "order-and-attempt-are-separate",
    "no-card-secrets-stored",
    "no-silent-retry-after-handoff",
    "adapters-and-routing-are-decoupled"
  ]) {
    assert(ruleIds.has(requiredRule), `Falta la regla ${requiredRule} en semantic-guardrails.json`, errors);
  }

  const adr1 = read("docs/adr/adr-0001-verdad-asincrona-como-fuente-final1.md");
  const copilotInstructions = read(".github/copilot-instructions.md");
  const paymentArchitecture = read(".github/instructions/pagos-arquitectura.instructions.md");
  const paymentProviderAdapter = read("packages/payment-core/src/contracts/payment-provider-adapter.ts");
  const webhookRoute = read("apps/web/src/app/api/webhooks/[provider]/route.ts");

  assert(
    includesAll(adr1, ["response URL", "artefacto de experiencia de usuario"]),
    "ADR-0001 no deja clara la regla de response URL como artefacto UX.",
    errors
  );
  assert(
    includesAll(copilotInstructions, ["response URL", "webhook + polling + consulta server-to-server + reconciliacion"]),
    "copilot-instructions no refleja claramente la verdad asincrona.",
    errors
  );
  assert(
    includesAll(paymentArchitecture, ["response URL", "UX, no settlement"]),
    "La instruccion de arquitectura no refleja claramente el guardrail de response URL.",
    errors
  );
  assert(
    includesAll(paymentProviderAdapter, ["queryAttemptStatus", "normalizeWebhook", "createAttempt"]),
    "El contrato PaymentProviderAdapter no expone createAttempt/queryAttemptStatus/normalizeWebhook.",
    errors
  );
  assert(
    includesAll(webhookRoute, ["deduplicacion", "firma"]),
    "La ruta de webhooks no menciona deduplicacion y validacion de firma.",
    errors
  );

  const paymentOrder = read("packages/payment-core/src/domain/payment-order.ts");
  const paymentAttempt = read("packages/payment-core/src/domain/payment-attempt.ts");
  assert(paymentOrder.includes("export interface PaymentOrder"), "payment-order.ts no define PaymentOrder.", errors);
  assert(paymentAttempt.includes("export interface PaymentAttempt"), "payment-attempt.ts no define PaymentAttempt.", errors);
  assert(paymentAttempt.includes("createPaymentAttempt"), "payment-attempt.ts no expone createPaymentAttempt.", errors);

  for (const forbiddenField of ["providerCode", "methodFamily", "attemptNumber", "rawProviderStatus", "origin"]) {
    assert(
      !paymentOrder.includes(forbiddenField),
      `payment-order.ts no deberia contener el campo tecnico ${forbiddenField}.`,
      errors
    );
  }

  for (const requiredField of [
    "paymentOrderId",
    "providerCode",
    "methodFamily",
    "attemptNumber",
    "origin",
    "canonicalStatus",
    "rawProviderStatus"
  ]) {
    assert(
      paymentAttempt.includes(requiredField),
      `payment-attempt.ts no contiene el campo requerido ${requiredField}.`,
      errors
    );
  }

  const codeAndDataFiles = [
    ...walkFiles("apps"),
    ...walkFiles("packages"),
    ...walkFiles("supabase"),
    ...walkFiles("tests/contract")
  ].filter(
    (filePath) =>
      !filePath.endsWith(".md") &&
      !filePath.includes("/.next/") &&
      !filePath.includes("/dist/") &&
      !filePath.includes("/node_modules/") &&
      !filePath.includes("/coverage/")
  );

  const secretPatterns = [/\bpan\b/i, /\bcvv\b/i, /card_number/i, /security_code/i];

  for (const filePath of codeAndDataFiles) {
    const text = read(filePath);

    for (const pattern of secretPatterns) {
      if (pattern.test(text)) {
        errors.push(`Se detecto un patron sensible ${pattern} en ${filePath}`);
      }
    }
  }

  const retryPolicy = read("packages/payment-core/src/orchestration/retry-policy.ts");
  const capabilityMatrix = read("packages/payment-core/src/providers/capability-matrix.ts");

  assert(
    retryPolicy.includes("strongConsentMethod && (input.hasUserBeenRedirected || input.hasRemoteReference)"),
    "retry-policy.ts no protege explicitamente el caso de consentimiento fuerte + redirect/referencia remota.",
    errors
  );
  assert(
    retryPolicy.includes('strategy: "USER_GUIDED_RETRY"'),
    "retry-policy.ts no redirige a USER_GUIDED_RETRY cuando aplica.",
    errors
  );
  assert(
    capabilityMatrix.includes('methodFamily: "PSE"') &&
      capabilityMatrix.includes('methodFamily: "BRE_B_QR"') &&
      capabilityMatrix.includes("supportsSilentRetry: false") &&
      capabilityMatrix.includes("requiresStrongUserConsent: true"),
    "capability-matrix.ts no refleja correctamente el guardrail de consentimiento fuerte.",
    errors
  );

  const adr3 = read("docs/adr/adr-0003-adapters-de-proveedor-y-routing-desacoplado1.md");
  const providerStatusMap = read("packages/payment-core/src/orchestration/provider-status-map.ts");
  assert(
    includesAll(adr3, ["provider adapters", "routing/orchestration engine"]),
    "ADR-0003 no deja explicita la separacion adapters/routing.",
    errors
  );
  assert(
    exists("packages/payment-core/src/contracts/payment-provider-adapter.ts") &&
      exists("packages/payment-core/src/providers/capability-matrix.ts") &&
      exists("packages/payment-core/src/orchestration/retry-policy.ts") &&
      exists("packages/payment-core/src/orchestration/provider-status-map.ts"),
    "Faltan piezas esperadas para mantener desacoplados adapters, capacidades y routing.",
    errors
  );
  assert(
    !paymentProviderAdapter.includes("apps/web"),
    "payment-provider-adapter.ts no deberia depender de apps/web.",
    errors
  );
  assert(
    !providerStatusMap.includes("apps/web"),
    "provider-status-map.ts no deberia depender de apps/web.",
    errors
  );

  const semanticDocs = read("docs/agents/guardrails-semanticos-del-dominio1.md");
  for (const label of [
    "La verdad final es asincrona",
    "`payment_order` y `payment_attempt` son entidades separadas",
    "No almacenar `PAN` ni `CVV`",
    "No `silent retry` despues de handoff o consentimiento fuerte",
    "Adapters y routing desacoplados"
  ]) {
    if (!semanticDocs.includes(label)) {
      warnings.push(`La documentacion de guardrails podria no reflejar claramente: ${label}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Semantic guardrails validation: FAIL");

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

console.log("Semantic guardrails validation: PASS");

if (warnings.length > 0) {
  console.log("Warnings:");

  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}
