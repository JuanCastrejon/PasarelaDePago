const output = {
  continue: true,
  systemMessage:
    "Contexto operativo: respeta .github/copilot-instructions.md, usa .github/AGENTS.md como mapa del repo, consulta la skill contexto-proyecto antes de cambios relevantes, y si la tarea cruza fases revisa .github/agents/ownership-matrix.md y .github/agent-state/phase-status.yaml."
};

process.stdout.write(JSON.stringify(output));
