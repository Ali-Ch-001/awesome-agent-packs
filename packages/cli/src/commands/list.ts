import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { detectInstalledPlatforms } from "../core/detector.js";
import { getRegistryItem } from "../registry/index.js";
import { estimateMarkdownTokens } from "../core/tokenizer.js";

export async function listCommand(options: { verbose?: boolean }) {
  p.intro(picocolors.bgCyan(picocolors.black(" Installed Agent Skills & Hubs ")));

  const platforms = detectInstalledPlatforms();
  const detected = platforms.filter((p) => p.isDetected);

  if (detected.length === 0) {
    p.note("No supported agent environments currently detected.");
    p.outro(picocolors.yellow("Run `npx agent-packs doctor` to check your environment."));
    return;
  }

  const seenSkills = new Map<string, { path: string; platforms: string[]; tokens: number; tier: string }>();

  for (const pl of detected) {
    if (!fs.existsSync(pl.globalSkillsDir)) continue;

    try {
      const entries = fs.readdirSync(pl.globalSkillsDir);
      for (const entry of entries) {
        if (entry.startsWith(".") || entry.includes(".backup-") || entry.endsWith(".md") || entry.endsWith(".json")) {
          continue;
        }

        const entryPath = path.join(pl.globalSkillsDir, entry);
        try {
          const stat = fs.statSync(entryPath);
          if (!stat.isDirectory()) continue;
        } catch {
          // Skip broken symlinks from active valid listing
          continue;
        }

        const skillMd = path.join(entryPath, "SKILL.md");

        let tokens = 0;
        let tier = "skill";

        if (fs.existsSync(skillMd)) {
          try {
            const content = fs.readFileSync(skillMd, "utf-8");
            tokens = estimateMarkdownTokens(content);
          } catch {}
        }

        const regItem = getRegistryItem(entry);
        if (regItem) {
          tokens = regItem.tokenEstimate.cl100k_base;
          tier = regItem.tier;
        } else if (entry.startsWith("hub-")) {
          tier = "hub";
        } else if (entry.startsWith("pack-")) {
          tier = "pack";
        }

        if (!seenSkills.has(entry)) {
          seenSkills.set(entry, {
            path: entryPath,
            platforms: [pl.name],
            tokens,
            tier,
          });
        } else {
          seenSkills.get(entry)!.platforms.push(pl.name);
        }
      }
    } catch {}
  }

  if (seenSkills.size === 0) {
    p.note("No skills currently installed.\nInstall your first pack via `npx agent-packs add apple-fluid`.");
    p.outro(picocolors.cyan("AgentPacks ready."));
    return;
  }

  console.log(`\n${picocolors.bold("Active Skills Inventory (" + seenSkills.size + " total):")}\n`);

  let totalTokens = 0;

  for (const [id, meta] of seenSkills.entries()) {
    totalTokens += meta.tokens;
    const tierBadge =
      meta.tier === "hub"
        ? picocolors.bgBlue(picocolors.black(" MASTER HUB "))
        : meta.tier === "pack"
        ? picocolors.bgGreen(picocolors.black(" STRIKE TEAM "))
        : picocolors.bgWhite(picocolors.black(" SPECIALIST "));

    const tokenFmt = picocolors.yellow(`~${meta.tokens.toLocaleString()} tok`);
    const platformsFmt = picocolors.dim(`[${meta.platforms.join(", ")}]`);

    console.log(`  ${tierBadge} ${picocolors.bold(id)}  ${tokenFmt}  ${platformsFmt}`);
    if (options.verbose) {
      console.log(`    Location: ${picocolors.dim(meta.path)}`);
    }
  }

  console.log(`\n${picocolors.bold("Cumulative Context Cost:")} ${picocolors.yellow("~" + totalTokens.toLocaleString() + " tokens")} (${((totalTokens / 200000) * 100).toFixed(1)}% of 200k window)\n`);

  p.outro(picocolors.green("List completed."));
}
