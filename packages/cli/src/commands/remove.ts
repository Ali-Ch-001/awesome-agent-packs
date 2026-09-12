import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { detectInstalledPlatforms } from "../core/detector.js";
import { getLocalStoreDir } from "../core/installer.js";
import { unprojectSkillFromPlatform } from "../core/transpiler.js";
import { removeLockfileEntry } from "../core/lockfile.js";

export async function removeCommand(skillName: string, options: { global?: boolean }) {
  p.intro(picocolors.bgRed(picocolors.white(" AgentPacks Remove ")));

  const normalized = skillName.toLowerCase().replace(/^(\/|pack-|hub-)/, "");
  const platforms = detectInstalledPlatforms();
  let removedCount = 0;

  // Potential names to check (with and without prefixes)
  const candidateIds = [
    normalized,
    `hub-${normalized}`,
    `pack-${normalized}`,
    skillName.toLowerCase().replace(/^\//, ""),
  ];

  for (const pl of platforms) {
    if (!pl.isDetected) continue;

    const res = await unprojectSkillFromPlatform(
      skillName,
      pl,
      options.global !== false,
      process.cwd()
    );
    if (res.removed) {
      p.log.success(`Removed from ${picocolors.bold(pl.name)}: ${picocolors.dim(res.path || skillName)}`);
      removedCount++;
    }
  }

  // Ensure workspace-scoped Cursor rules are pruned even if Cursor wasn't detected globally
  const projectRoot = process.cwd();
  for (const id of candidateIds) {
    const cursorMdc = path.join(projectRoot, ".cursor", "rules", `${id}.mdc`);
    if (fs.existsSync(cursorMdc)) {
      try {
        fs.unlinkSync(cursorMdc);
        p.log.success(`Removed from ${picocolors.bold("Cursor AI")}: ${picocolors.dim(cursorMdc)}`);
        removedCount++;
      } catch (err: any) {
        p.log.warn(`Warning removing Cursor rule ${cursorMdc}: ${err.message}`);
      }
    }
  }

  // Only remove from shared local cache if removing globally
  if (options.global !== false) {
    for (const id of candidateIds) {
      const localCache = path.join(getLocalStoreDir(), id);
      if (fs.existsSync(localCache)) {
        try {
          fs.rmSync(localCache, { recursive: true, force: true });
        } catch (err: any) {
          p.log.warn(`Warning clearing local cache for ${id}: ${err.message}`);
        }
      }
    }
  }

  // Update lockfile
  removeLockfileEntry(process.cwd(), skillName);

  if (removedCount > 0) {
    p.outro(picocolors.green(`Successfully removed ${picocolors.bold(skillName)} across ${removedCount} location(s).`));
  } else {
    p.outro(picocolors.yellow(`No active installations found for "${skillName}".`));
  }
}
