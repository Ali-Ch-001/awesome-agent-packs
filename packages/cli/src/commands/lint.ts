import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { detectInstalledPlatforms } from "../core/detector.js";
import { lintActiveSkills } from "../core/linter.js";
import { addCommand } from "./add.js";

export async function lintCommand(options: { fix?: boolean }) {
  p.intro(picocolors.bgYellow(picocolors.black(" AgentPacks Prompt & Conflict Linter ")));

  const platforms = detectInstalledPlatforms();
  const detected = platforms.filter((p) => p.isDetected);

  const installedSkillNames = new Set<string>();

  for (const pl of detected) {
    if (fs.existsSync(pl.globalSkillsDir)) {
      try {
        const entries = fs.readdirSync(pl.globalSkillsDir);
        for (const e of entries) {
          if (
            e.startsWith(".") ||
            e.includes(".backup-") ||
            e.endsWith(".md") ||
            e.endsWith(".json")
          ) {
            continue;
          }

          const fullPath = path.join(pl.globalSkillsDir, e);
          try {
            const stat = fs.statSync(fullPath);
            if (!stat.isDirectory()) continue;
          } catch {
            continue;
          }

          installedSkillNames.add(e);
        }
      } catch {}
    }
  }

  const s = p.spinner();
  s.start(`Analyzing ${installedSkillNames.size} active skills for rule collisions...`);

  const audit = lintActiveSkills(Array.from(installedSkillNames));
  s.stop(`Analysis complete.`);

  if (audit.conflicts.length === 0) {
    p.log.success(picocolors.green("✔ No conflicting directives detected! Your agent skills are harmonized."));
    p.outro(picocolors.green("Clean bill of health."));
    return;
  }

  p.log.warn(picocolors.yellow(`\nFound ${audit.conflicts.length} Active Directive Conflict(s):`));

  for (const c of audit.conflicts) {
    console.log(`\n  • ${picocolors.red(picocolors.bold(c.skillA))} ⚡ ${picocolors.red(picocolors.bold(c.skillB))}`);
    console.log(`    Domain: ${picocolors.bold(c.topic)}`);
    console.log(`    Issue:  ${picocolors.dim(c.reason)}`);
    console.log(`    Fix:    ${picocolors.green(c.recommendation)}`);
  }

  if (options.fix && audit.suggestedHubs.length > 0) {
    console.log(`\n${picocolors.bold("Auto-Fixing via Master Hubs:")}`);
    for (const hub of audit.suggestedHubs) {
      await addCommand(hub, { global: true });
    }
  } else if (audit.suggestedHubs.length > 0) {
    console.log(`\n💡 Tip: Run ${picocolors.cyan("npx agentpacks lint --fix")} to automatically install harmonizing hubs.\n`);
  }

  p.outro(picocolors.yellow("Lint completed with recommendations."));
}
