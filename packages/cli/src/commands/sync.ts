import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { getRegistryItem } from "../registry/index.js";
import { installRegistryItem } from "../core/installer.js";

export async function syncCommand(options: { team?: string }) {
  p.intro(picocolors.bgBlue(picocolors.white(" Team & Workspace Sync ")));

  const configFile = path.join(process.cwd(), "agentpack.config.json");
  let teamName = options.team;
  let enforcedHubs: string[] = ["hub-design", "hub-web", "hub-cloud"];
  let prohibitedSkills: string[] = [];
  let tokenBudgetCap = 25000;

  if (fs.existsSync(configFile)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(configFile, "utf-8"));
      if (parsed.team) teamName = parsed.team;
      if (Array.isArray(parsed.enforcedHubs)) enforcedHubs = parsed.enforcedHubs;
      if (Array.isArray(parsed.prohibitedSkills)) prohibitedSkills = parsed.prohibitedSkills;
      if (typeof parsed.tokenBudgetCap === "number") tokenBudgetCap = parsed.tokenBudgetCap;
      p.log.info(`Loaded workspace policy from ${picocolors.cyan("agentpack.config.json")}`);
    } catch (err: any) {
      p.log.warn(`Warning parsing agentpack.config.json: ${err.message}. Using default policy.`);
    }
  } else {
    // Scaffold default agentpack.config.json
    const sampleConfig = {
      $schema: "https://agentpacks.dev/schema/v2/config.json",
      team: teamName || "local-workspace",
      enforcedHubs,
      tokenBudgetCap,
      prohibitedSkills: ["minimalist-ui"]
    };
    try {
      fs.writeFileSync(configFile, JSON.stringify(sampleConfig, null, 2), "utf-8");
      p.log.success(`Scaffolded workspace policy template: ${picocolors.cyan("agentpack.config.json")}`);
    } catch {}
  }

  console.log(`\nEnforcing ${enforcedHubs.length} required team Master Hubs:\n`);
  let totalEnforcedTokens = 0;

  for (const hub of enforcedHubs) {
    const item = getRegistryItem(hub);
    if (!item) {
      p.log.warn(`Hub "${hub}" not found in verified registry. Skipping.`);
      continue;
    }
    const res = await installRegistryItem(item, { global: true });
    totalEnforcedTokens += item.tokenEstimate.cl100k_base;
    const successLinks = res.links.filter((l) => l.status === "created" || l.status === "already_linked");
    p.log.success(
      `${picocolors.green("✔ Enforced")} ${picocolors.bold(item.name)} (${successLinks.length} platform(s) linked)`
    );
  }

  if (totalEnforcedTokens > tokenBudgetCap) {
    p.log.warn(
      picocolors.yellow(
        `⚠ Warning: Enforced hubs total ~${totalEnforcedTokens.toLocaleString()} tokens, exceeding policy cap of ${tokenBudgetCap.toLocaleString()} tokens.`
      )
    );
  }

  p.outro(picocolors.green(`Sync completed successfully for ${teamName || "current workspace"}.`));
}
