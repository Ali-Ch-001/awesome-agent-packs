import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { detectInstalledPlatforms } from "../core/detector.js";
import { getRegistryItem } from "../registry/index.js";
import { estimateMarkdownTokens } from "../core/tokenizer.js";

export async function listCommand(options: { verbose?: boolean; json?: boolean }) {
  if (!options.json) {
    p.intro(picocolors.bgCyan(picocolors.black(" Installed Agent Skills & Hubs ")));
  }

  const platforms = detectInstalledPlatforms();
  const detected = platforms.filter((p) => p.isDetected);

  if (detected.length === 0) {
    if (options.json) {
      console.log(JSON.stringify({ error: "No agent platforms detected", skills: [] }, null, 2));
      return;
    }
    p.note("No supported agent environments currently detected.");
    p.outro(picocolors.yellow("Run `npx agent-packs doctor` to check your environment."));
    return;
  }

  const seenSkills = new Map<string, { path: string; platforms: string[]; tokens: number; tier: string; replacesTokens?: number }>();

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
        let replacesTokens: number | undefined;

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
          if ("replacesTokens" in regItem) {
            replacesTokens = (regItem as any).replacesTokens;
          }
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
            replacesTokens,
          });
        } else {
          seenSkills.get(entry)!.platforms.push(pl.name);
        }
      }
    } catch {}
  }

  let totalTokens = 0;
  for (const meta of seenSkills.values()) {
    totalTokens += meta.tokens;
  }

  if (options.json) {
    const listJson = {
      totalSkills: seenSkills.size,
      totalTokens,
      skills: Array.from(seenSkills.entries()).map(([id, meta]) => ({
        id,
        tier: meta.tier,
        tokens: meta.tokens,
        replacesTokens: meta.replacesTokens,
        platforms: meta.platforms,
        path: meta.path,
      })),
    };
    console.log(JSON.stringify(listJson, null, 2));
    return;
  }

  if (seenSkills.size === 0) {
    p.note("No skills currently installed.\nInstall your first pack via `npx agent-packs add apple-fluid`.");
    p.outro(picocolors.cyan("AgentPacks ready."));
    return;
  }

  console.log(`\n${picocolors.bold("Active Skills Inventory (" + seenSkills.size + " total):")}\n`);

  for (const [id, meta] of seenSkills.entries()) {
    const tierBadge =
      meta.tier === "hub"
        ? picocolors.bgBlue(picocolors.black(" MASTER HUB "))
        : meta.tier === "pack"
        ? picocolors.bgGreen(picocolors.black(" STRIKE TEAM "))
        : picocolors.bgWhite(picocolors.black(" SPECIALIST "));

    const tokenFmt = picocolors.yellow(`~${meta.tokens.toLocaleString()} tok`);
    const savingsFmt = meta.replacesTokens
      ? picocolors.green(` [Replaces ~${meta.replacesTokens.toLocaleString()} tok raw stack]`)
      : "";
    const platformsFmt = picocolors.dim(`[${meta.platforms.join(", ")}]`);

    console.log(`  ${tierBadge} ${picocolors.bold(id)}  ${tokenFmt}${savingsFmt}  ${platformsFmt}`);
    if (options.verbose) {
      console.log(`    Location: ${picocolors.dim(meta.path)}`);
    }
  }

  console.log(`\n${picocolors.bold("Cumulative Context Cost:")} ${picocolors.yellow("~" + totalTokens.toLocaleString() + " tokens")} (${((totalTokens / 200000) * 100).toFixed(1)}% of 200k window)\n`);

  p.outro(picocolors.green("List completed."));
}
