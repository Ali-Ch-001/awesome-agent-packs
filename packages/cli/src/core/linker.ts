import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import picocolors from "picocolors";
import type { LinkResult } from "../types.js";

export async function linkSkillToPlatform(
  skillId: string,
  sourceSkillDir: string,
  targetSkillsDir: string,
  platformId: string,
  platformName: string
): Promise<LinkResult> {
  const destPath = path.join(targetSkillsDir, skillId);

  try {
    if (!fs.existsSync(targetSkillsDir)) {
      fs.mkdirSync(targetSkillsDir, { recursive: true });
    }

    if (fs.existsSync(destPath)) {
      const lstat = fs.lstatSync(destPath);
      if (lstat.isSymbolicLink()) {
        try {
          const currentTarget = fs.readlinkSync(destPath);
          if (currentTarget === sourceSkillDir) {
            return { platformId, platformName, targetPath: destPath, status: "already_linked" };
          }
          fs.unlinkSync(destPath);
        } catch {
          fs.unlinkSync(destPath);
        }
      } else {
        const backupPath = `${destPath}.backup-${Date.now()}`;
        fs.renameSync(destPath, backupPath);
        console.log(picocolors.yellow(`  [Notice] Backed up existing skill to ${backupPath}`));
      }
    }

    const symlinkType = os.platform() === "win32" ? "junction" : "dir";
    fs.symlinkSync(sourceSkillDir, destPath, symlinkType);

    return {
      platformId,
      platformName,
      targetPath: destPath,
      status: "created",
    };
  } catch (err: any) {
    return {
      platformId,
      platformName,
      targetPath: destPath,
      status: "failed",
      error: err.message,
    };
  }
}
