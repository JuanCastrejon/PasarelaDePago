const fs = require("node:fs");

function readInput() {
  try {
    const raw = fs.readFileSync(0, "utf8").trim();
    if (!raw) {
      return {};
    }

    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function toText(value) {
  return typeof value === "string" ? value : "";
}

function response(decision, reason) {
  return {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: decision,
      permissionDecisionReason: reason
    }
  };
}

const input = readInput();
const toolName =
  toText(input.tool_name) ||
  toText(input.toolName) ||
  toText(input.tool?.name) ||
  toText(input.name);

const toolInput = input.tool_input || input.toolInput || input.input || {};
const command = toText(toolInput.command).toLowerCase();

const destructivePatterns = [
  /\bgit\s+reset\s+--hard\b/,
  /\bgit\s+clean\s+-fdx\b/,
  /\bgit\s+push\s+--force\b/,
  /\brm\s+-rf\b/,
  /\bdel\s+\/f\s+\/s\s+\/q\b/,
  /\baz\s+devops\s+project\s+delete\b/
];

if (toolName === "shell_command" || toolName === "run_in_terminal") {
  if (destructivePatterns.some((pattern) => pattern.test(command))) {
    process.stdout.write(
      JSON.stringify(
        response(
          "ask",
          "Comando destructivo o de alto impacto detectado. Confirmar antes de continuar."
        )
      )
    );
    process.exit(0);
  }
}

process.stdout.write(
  JSON.stringify(response("allow", "Sin riesgo alto detectado."))
);
