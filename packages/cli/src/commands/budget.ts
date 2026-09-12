import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { detectInstalledPlatforms } from "../core/detector.js";
import { calculateContextBudget } from "../core/tokenizer.js";
import { getRegistryItem } from "@agentpacks/registry";

const MODEL_LIMITS: Record<string, number> = {
  "claude-3-5-sonnet": 200_000,
  "claude-3-opus": 200_000,
  "gpt-4o": 128_000,
  "gpt-4o-mini": 128_000,
  "gemini-1-5-pro": 1_000_000,
};

export async function budgetCommand(options: { model?: string }) {
  const model = (options.model || "claude-3-5-sonnet").toLowerCase();
  const contextLimit = MODEL_LIMITS[model] || 200_000;

  p.intro(picocolors.bgCyan(picocolors.black(` Agent Context Budget (${model}: ${contextLimit.toLocaleString()} tokens) `)));

  const platforms = detectInstalledPlatforms();
  const detected = platforms.filter((p) => p.isDetected);

  const skillEntries: { id: string; content: string; tier: "hub" | "pack" | "skill" }[] = [];
  const seen = new Set<string>();

  for (const pl of detected) {
    if (!fs.existsSync(pl.globalSkillsDir)) continue;

    try {
      const items = fs.readdirSync(pl.globalSkillsDir);
      for (const item of items) {
        if (
          item.startsWith(".") ||
          item.includes(".backup-") ||
          item.endsWith(".md") ||
          item.endsWith(".json") ||
          seen.has(item)
        ) {
          continue;
        }

        const skillPath = path.join(pl.globalSkillsDir, item);
        try {
          const stat = fs.statSync(skillPath);
          if (!stat.isDirectory()) continue;
        } catch {
          // Skip broken symlinks
          continue;
        }

        seen.add(item);
        const skillMdPath = path.join(skillPath, "SKILL.md");
        let content = "";
        if (fs.existsSync(skillMdPath)) {
          content = fs.readFileSync(skillMdPath, "utf-8");
        }

        let tier: "hub" | "pack" | "skill" = "skill";
        const reg = getRegistryItem(item);
        if (reg) {
          tier = reg.tier;
          if (!content) content = reg.content;
        } else if (item.startsWith("hub-")) {
          tier = "hub";
        } else if (item.startsWith("pack-")) {
          tier = "pack";
        }

        skillEntries.push({ id: item, content, tier });
      }
    } catch {}
  }

  const report = calculateContextBudget(skillEntries, contextLimit);

  console.log(`\n┌──────────────────────────────────────┬──────────────┬───────────────┐`);
  console.log(`│ ${picocolors.bold("Active Skill / Hub")}                  │ ${picocolors.bold("Tokens (Est)")} │ ${picocolors.bold("Context Share")} │`);
  console.log(`├──────────────────────────────────────┼──────────────┼───────────────┤`);

  for (const item of report.breakdown) {
    const idPad = item.skillId.padEnd(36, " ").slice(0, 36);
    const tokPad = item.tokenCount.toLocaleString().padStart(12, " ");
    const pctPad = `${item.percentageOfContext.toFixed(1)}%`.padStart(13, " ");
    console.log(`│ ${idPad} │ ${tokPad} │ ${pctPad} │`);
  }

  console.log(`├──────────────────────────────────────┼──────────────┼───────────────┤`);
  const totalTokStr = report.totalTokens.toLocaleString().padStart(12, " ");
  const totalPctStr = `${report.totalPercentage.toFixed(1)}%`.padStart(13, " ");
  console.log(`│ ${picocolors.bold("TOTAL SYSTEM PROMPT FOOTPRINT")}        │ ${picocolors.bold(totalTokStr)} │ ${picocolors.bold(totalPctStr)} │`);
  console.log(`└──────────────────────────────────────┴──────────────┴───────────────┘\n`);

  if (report.status === "optimal") {
    p.log.success(picocolors.green("✔ Healthy Context Budget: Less than 10% of window consumed by system instructions."));
  } else if (report.status === "warning") {
    p.log.warn(picocolors.yellow("⚠ Elevated Footprint: Consider swapping raw specialist skills with lightweight Master Hubs (/hub-*)."));
  } else {
    p.log.error(picocolors.red("✖ Critical Budget: Prompt context footprint exceeds 30k tokens. High risk of instruction degradation."));
  }

  p.outro(picocolors.green("Budget inspection completed."));
}
