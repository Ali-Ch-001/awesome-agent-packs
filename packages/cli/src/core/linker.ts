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
    // Prevent attempting to mkdir if targetSkillsDir is a file (e.g. .windsurfrules)
    if (fs.existsSync(targetSkillsDir)) {
      const dirStat = fs.statSync(targetSkillsDir);
      if (!dirStat.isDirectory()) {
        return {
          platformId,
          platformName,
          targetPath: targetSkillsDir,
          status: "failed",
          error: `Target path is a file, not a skills directory: ${targetSkillsDir}`,
        };
      }
    } else {
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
        const backupBase = path.join(os.homedir(), ".agentpacks", "backups");
        if (!fs.existsSync(backupBase)) {
          fs.mkdirSync(backupBase, { recursive: true });
        }
        const backupPath = path.join(backupBase, `${skillId}.backup-${Date.now()}`);
        fs.renameSync(destPath, backupPath);
        console.log(picocolors.yellow(`  [Notice] Backed up existing non-symlink skill to ${backupPath}`));
      }
    }

    const symlinkType = os.platform() === "win32" ? "junction" : "dir";
    fs.symlinkSync(sourceSkillDir, destPath, symlinkType);

    // If Cursor platform, also ensure a .mdc rule pointer exists for Cursor's rule parser
    if (platformId === "cursor") {
      const mdcPath = path.join(targetSkillsDir, `${skillId}.mdc`);
      const skillMd = path.join(sourceSkillDir, "SKILL.md");
      if (fs.existsSync(skillMd) && !fs.existsSync(mdcPath)) {
        try {
          fs.symlinkSync(skillMd, mdcPath, "file");
        } catch {}
      }
    }

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
