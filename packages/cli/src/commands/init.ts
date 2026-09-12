import fs from "node:fs";
import path from "node:path";
import * as p from "@clack/prompts";
import picocolors from "picocolors";
import { readLockfile } from "../core/lockfile.js";

export async function initCommand() {
  p.intro(picocolors.bgCyan(picocolors.black(" AgentPacks Workspace Init ")));

  const projectRoot = process.cwd();
  const configFile = path.join(projectRoot, "agentpack.config.json");

  if (fs.existsSync(configFile)) {
    p.log.warn(`Configuration already exists at ${picocolors.cyan("agentpack.config.json")}`);
    p.outro(picocolors.yellow("Workspace already initialized."));
    return;
  }

  const baseConfig = {
    $schema: "https://agentpacks.dev/schema/v2/config.json",
    team: path.basename(projectRoot),
    enforcedHubs: [
      "hub-design",
      "hub-web",
      "hub-cloud"
    ],
    tokenBudgetCap: 20000,
    prohibitedSkills: [
      "minimalist-ui"
    ]
  };

  fs.writeFileSync(configFile, JSON.stringify(baseConfig, null, 2) + "\n", "utf-8");
  p.log.success(`Created ${picocolors.bold(picocolors.green("agentpack.config.json"))}`);

  // Initialize empty lockfile
  const initialLockfile = readLockfile(projectRoot);
  const lockfilePath = path.join(projectRoot, "agentpack.lock.json");
  fs.writeFileSync(lockfilePath, JSON.stringify(initialLockfile, null, 2) + "\n", "utf-8");
  p.log.success(`Initialized ${picocolors.bold(picocolors.green("agentpack.lock.json"))}`);

  console.log(`\nNext steps:`);
  console.log(`  1. Run ${picocolors.cyan("npx awesome-agent-packs sync")} to enforce baseline hubs`);
  console.log(`  2. Run ${picocolors.cyan("npx awesome-agent-packs add apple-fluid")} to install your first workflow pack\n`);

  p.outro(picocolors.green("AgentPacks workspace successfully initialized!"));
}
