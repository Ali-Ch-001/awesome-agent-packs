import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { detectInstalledPlatforms } from "../core/detector.js";
import { getLocalStoreDir } from "../core/installer.js";

export async function removeCommand(skillName: string, options: { global?: boolean }) {
  p.intro(picocolors.bgRed(picocolors.white(" AgentPacks Remove ")));

  const normalized = skillName.toLowerCase().replace(/^\//, "");
  const platforms = detectInstalledPlatforms();
  let removedCount = 0;

  for (const pl of platforms) {
    if (!pl.isDetected) continue;
    const targetDir = options.global !== false ? pl.globalSkillsDir : (pl.projectRulesDir || pl.globalSkillsDir);
    const skillPath = path.join(targetDir, normalized);

    if (fs.existsSync(skillPath)) {
      try {
        const lstat = fs.lstatSync(skillPath);
        if (lstat.isSymbolicLink()) {
          fs.unlinkSync(skillPath);
        } else {
          fs.rmSync(skillPath, { recursive: true, force: true });
        }
        p.log.success(`Removed from ${picocolors.bold(pl.name)}: ${picocolors.dim(skillPath)}`);
        removedCount++;
      } catch (err: any) {
        p.log.error(`Failed to remove from ${pl.name}: ${err.message}`);
      }
    }
  }

  // Remove from local cache
  const localCache = path.join(getLocalStoreDir(), normalized);
  if (fs.existsSync(localCache)) {
    try {
      fs.rmSync(localCache, { recursive: true, force: true });
    } catch {}
  }

  if (removedCount > 0) {
    p.outro(picocolors.green(`Successfully removed ${picocolors.bold(normalized)} across ${removedCount} location(s).`));
  } else {
    p.outro(picocolors.yellow(`No active installations found for "${normalized}".`));
  }
}
