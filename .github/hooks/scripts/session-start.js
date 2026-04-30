const output = {
  continue: true,
  systemMessage:
    "Contexto operativo: respeta .github/copilot-instructions.md, usa .github/AGENTS.md como mapa del repo, y consulta la skill contexto-proyecto antes de cambios relevantes."
};

process.stdout.write(JSON.stringify(output));
