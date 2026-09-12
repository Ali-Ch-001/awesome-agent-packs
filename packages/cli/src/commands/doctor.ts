import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { detectInstalledPlatforms } from "../core/detector.js";
import { getLocalStoreDir } from "../core/installer.js";

export async function doctorCommand(options: { fix?: boolean } = {}) {
  p.intro(picocolors.bgMagenta(picocolors.white(" AgentPacks System Diagnostics ")));

  console.log(`\n${picocolors.bold("1. Local AgentPacks Cache Store:")}`);
  const store = getLocalStoreDir();
  console.log(`  Path: ${picocolors.cyan(store)}`);
  try {
    fs.accessSync(store, fs.constants.W_OK);
    console.log(`  Status: ${picocolors.green("✔ Readable and Writable")}`);
  } catch {
    console.log(`  Status: ${picocolors.red("✖ Write Permission Denied")}`);
  }

  console.log(`\n${picocolors.bold("2. Agent Developer Environments:")}`);
  const platforms = detectInstalledPlatforms();

  for (const pl of platforms) {
    const isDetected = pl.isDetected;
    const badge = isDetected ? picocolors.green("✔ Active") : picocolors.gray("○ Missing");
    console.log(`\n  ${badge} ${picocolors.bold(pl.name)} (${pl.id})`);
    console.log(`     Skills Dir: ${picocolors.dim(pl.globalSkillsDir)}`);

    if (isDetected && fs.existsSync(pl.globalSkillsDir)) {
      try {
        const entries = fs.readdirSync(pl.globalSkillsDir);
        let validSymlinks = 0;
        let brokenSymlinks = 0;
        const brokenNames: string[] = [];

        for (const e of entries) {
          const full = path.join(pl.globalSkillsDir, e);
          try {
            const stat = fs.lstatSync(full);
            if (stat.isSymbolicLink()) {
              if (fs.existsSync(full)) {
                validSymlinks++;
              } else {
                brokenSymlinks++;
                brokenNames.push(e);
              }
            }
          } catch {}
        }

        console.log(`     Installed:  ${entries.length} items (${validSymlinks} symlinks, ${brokenSymlinks} broken)`);
        if (brokenSymlinks > 0) {
          console.log(`     ${picocolors.yellow("⚠ Broken symlinks: " + brokenNames.join(", "))}`);
          if (options.fix) {
            for (const name of brokenNames) {
              try {
                fs.unlinkSync(path.join(pl.globalSkillsDir, name));
                console.log(`     ${picocolors.green("✔ Pruned broken symlink: " + name)}`);
              } catch {}
            }
          } else {
            console.log(`     ${picocolors.dim("Tip: Run `agentpacks doctor --fix` to prune broken symlinks")}`);
          }
        }
      } catch (err: any) {
        console.log(`     ${picocolors.red("Error reading directory: " + err.message)}`);
      }
    }
  }

  p.outro(picocolors.green("Diagnostic health check finished."));
}
