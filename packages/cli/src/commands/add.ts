import * as p from "@clack/prompts";
import picocolors from "picocolors";
import { getRegistryItem } from "../registry/index.js";
import { installRegistryItem } from "../core/installer.js";
import { lintActiveSkills } from "../core/linter.js";
import { detectInstalledPlatforms } from "../core/detector.js";
import { scanPromptSecurity } from "../core/security.js";
import { updateLockfile } from "../core/lockfile.js";
import fs from "node:fs";

export async function addCommand(
  packName: string,
  options: { target?: string[]; global?: boolean; dryRun?: boolean }
) {
  p.intro(picocolors.bgCyan(picocolors.black(" AgentPacks ")));

  const item = getRegistryItem(packName);

  if (!item) {
    p.cancel(`Skill or Pack "${packName}" not found in verified registry.`);
    console.log(`\nRun ${picocolors.cyan("npx awesome-agent-packs search")} to view available packs.\n`);
    process.exit(1);
  }

  // Static prompt security taint scan
  const securityReport = scanPromptSecurity(item.content);
  if (!securityReport.passed) {
    p.cancel(picocolors.red("Security check failed! Blocked unsafe prompt instructions:"));
    for (const issue of securityReport.issues) {
      console.log(`  • [${issue.severity.toUpperCase()}] ${issue.reason} (${picocolors.dim(issue.matchedPattern)})`);
    }
    process.exit(1);
  }

  const s = p.spinner();
  s.start(`Resolving dependencies for ${picocolors.bold(item.name)}...`);

  if (options.dryRun) {
    s.stop(`Dry run simulation for ${picocolors.cyan(item.id)}`);
    console.log(`\n  Tier: ${picocolors.bold(item.tier.toUpperCase())}`);
    console.log(`  Name: ${item.name}`);
    console.log(`  Tokens: ~${item.tokenEstimate.cl100k_base.toLocaleString()} tokens`);
    console.log(`  Triggers: ${item.triggers.slice(0, 4).join(", ")}`);
    p.outro(picocolors.yellow("Dry run completed. No files modified."));
    return;
  }

  const installResult = await installRegistryItem(item, {
    global: options.global !== false,
    targetPlatforms: options.target,
  });

  s.stop(`Prepared ${picocolors.bold(item.name)} in local store.`);

  for (const link of installResult.links) {
    if (link.status === "created") {
      p.log.success(`${picocolors.green("✔ Linked")} ${picocolors.bold(link.platformName)}: ${picocolors.dim(link.targetPath)}`);
    } else if (link.status === "already_linked") {
      p.log.info(`${picocolors.blue("● Active")} ${picocolors.bold(link.platformName)}: ${picocolors.dim(link.targetPath)}`);
    } else {
      p.log.error(`${picocolors.red("✖ Failed")} ${picocolors.bold(link.platformName)}: ${link.error}`);
    }
  }

  // Record into deterministic project lockfile
  const activePlatforms = installResult.links
    .filter((l) => l.status === "created" || l.status === "already_linked")
    .map((l) => l.platformId);
  updateLockfile(process.cwd(), item, activePlatforms);

  // Scan for conflicts across installed platforms
  const platforms = detectInstalledPlatforms();
  const installedSkillNames: string[] = [];

  for (const pl of platforms) {
    if (pl.isDetected && fs.existsSync(pl.globalSkillsDir)) {
      try {
        const entries = fs.readdirSync(pl.globalSkillsDir);
        installedSkillNames.push(...entries);
      } catch {}
    }
  }

  const audit = lintActiveSkills(installedSkillNames);
  if (audit.conflicts.length > 0) {
    p.log.warn(picocolors.yellow(`\n⚠ Detected ${audit.conflicts.length} Potential Directive Conflict(s):`));
    for (const c of audit.conflicts) {
      console.log(`  • ${picocolors.red(c.skillA)} vs ${picocolors.red(c.skillB)}: ${c.reason}`);
      console.log(`    ${picocolors.green("Recommendation:")} ${c.recommendation}\n`);
    }
  }

  const triggerCmd = `/${item.id}`;
  p.outro(picocolors.green(`Installed successfully! Invoke in your agent with: ${picocolors.bold(triggerCmd)}`));
}
