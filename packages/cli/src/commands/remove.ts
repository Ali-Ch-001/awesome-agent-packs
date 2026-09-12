import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { detectInstalledPlatforms } from "../core/detector.js";
import { getLocalStoreDir } from "../core/installer.js";
import { unprojectSkillFromPlatform } from "../core/transpiler.js";

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

    for (const id of candidateIds) {
      const res = await unprojectSkillFromPlatform(
        id,
        pl,
        options.global !== false,
        process.cwd()
      );
      if (res.removed) {
        p.log.success(`Removed from ${picocolors.bold(pl.name)}: ${picocolors.dim(res.path || id)}`);
        removedCount++;
        break;
      }
    }
  }

  // Remove from local cache
  for (const id of candidateIds) {
    const localCache = path.join(getLocalStoreDir(), id);
    if (fs.existsSync(localCache)) {
      try {
        fs.rmSync(localCache, { recursive: true, force: true });
      } catch {}
    }
  }

  if (removedCount > 0) {
    p.outro(picocolors.green(`Successfully removed ${picocolors.bold(skillName)} across ${removedCount} location(s).`));
  } else {
    p.outro(picocolors.yellow(`No active installations found for "${skillName}".`));
  }
}
