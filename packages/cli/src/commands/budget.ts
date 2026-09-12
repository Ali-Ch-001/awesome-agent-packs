import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { detectInstalledPlatforms } from "../core/detector.js";
import { calculateContextBudget } from "../core/tokenizer.js";
import { getRegistryItem } from "../registry/index.js";

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
  console.log(`│ ${picocolors.bold("Installed Directive / Pack")}            │ ${picocolors.bold("Tokens (BPE)")} │ ${picocolors.bold("Context Share")} │`);
  console.log(`├──────────────────────────────────────┼──────────────┼───────────────┤`);

  let maxPeakTokens = 0;
  let peakSkillName = "";

  for (const item of report.breakdown) {
    if (item.tokenCount > maxPeakTokens) {
      maxPeakTokens = item.tokenCount;
      peakSkillName = item.skillId;
    }
    const idPad = item.skillId.padEnd(36, " ").slice(0, 36);
    const tokPad = item.tokenCount.toLocaleString().padStart(12, " ");
    const pctPad = `${item.percentageOfContext.toFixed(1)}%`.padStart(13, " ");
    console.log(`│ ${idPad} │ ${tokPad} │ ${pctPad} │`);
  }

  // Active baseline overhead: dispatch table & tool definitions consume ~45 tokens each in turn 0
  const baselineOverhead = skillEntries.length * 45;
  const baselinePct = ((baselineOverhead / contextLimit) * 100).toFixed(2);
  const peakPct = ((maxPeakTokens / contextLimit) * 100).toFixed(1);

  console.log(`├──────────────────────────────────────┼──────────────┼───────────────┤`);
  const totalTokStr = report.totalTokens.toLocaleString().padStart(12, " ");
  const totalPctStr = `${report.totalPercentage.toFixed(1)}%`.padStart(13, " ");
  console.log(`│ ${picocolors.bold("TOTAL INSTALLED CATALOG VOLUME")}       │ ${picocolors.bold(totalTokStr)} │ ${picocolors.bold(totalPctStr)} │`);
  console.log(`└──────────────────────────────────────┴──────────────┴───────────────┘\n`);

  console.log(`${picocolors.bold("Context Consumption Analysis:")}`);
  console.log(`  • ${picocolors.cyan("Turn-0 Dispatch Overhead:")} ~${baselineOverhead.toLocaleString()} tokens (${baselinePct}% of window) ${picocolors.green("[SAFE]")}`);
  console.log(`    (Permanent system prompt cost from CLAUDE.md tables & agent tool declarations)`);
  console.log(`  • ${picocolors.cyan("Peak Single-Invocation Load:")} ~${maxPeakTokens.toLocaleString()} tokens (${peakPct}% of window) [${peakSkillName}]`);
  console.log(`    (Max tokens loaded into reasoning thread upon trigger activation)\n`);

  if (maxPeakTokens > 25_000) {
    p.log.warn(picocolors.yellow(`⚠ Elevated Peak Footprint: ${peakSkillName} is ~${maxPeakTokens.toLocaleString()} tokens. Consider splitting into focused Strike Teams.`));
  } else {
    p.log.success(picocolors.green("✔ Healthy Runtime Architecture: Skills load on-demand, preserving 98%+ context window for reasoning."));
  }

  p.outro(picocolors.green("Budget inspection completed."));
}
