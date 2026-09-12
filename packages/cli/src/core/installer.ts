import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import type { RegistryItem } from "../registry/index.js";
import { detectInstalledPlatforms } from "./detector.js";
import { projectSkillToPlatform } from "./transpiler.js";
import type { LinkResult } from "../types.js";

export interface InstallResult {
  item: RegistryItem;
  sourceDir: string;
  links: LinkResult[];
}

export function getLocalStoreDir(): string {
  const home = os.homedir();
  const base = path.join(home, ".agentpacks", "skills");
  if (!fs.existsSync(base)) {
    fs.mkdirSync(base, { recursive: true });
  }
  return base;
}

export async function installRegistryItem(
  item: RegistryItem,
  options: { global?: boolean; targetPlatforms?: string[] } = {}
): Promise<InstallResult> {
  const storeBase = getLocalStoreDir();
  const itemDir = path.join(storeBase, item.id);

  if (!fs.existsSync(itemDir)) {
    fs.mkdirSync(itemDir, { recursive: true });
  }

  // Write the SKILL.md file
  const skillFilePath = path.join(itemDir, "SKILL.md");
  fs.writeFileSync(skillFilePath, item.content, "utf-8");

  // Write manifest metadata
  const metaFilePath = path.join(itemDir, "manifest.json");
  fs.writeFileSync(metaFilePath, JSON.stringify(item, null, 2), "utf-8");

  // Project across platforms using the platform transpiler
  const allPlatforms = detectInstalledPlatforms();
  let selectedPlatforms = allPlatforms.filter((p) => p.isDetected);

  if (options.targetPlatforms && options.targetPlatforms.length > 0) {
    const targetSet = new Set(options.targetPlatforms.map((t) => t.toLowerCase()));
    selectedPlatforms = allPlatforms.filter((p) => targetSet.has(p.id.toLowerCase()));
  }

  // If no platforms detected, ensure at least ~/.agents/skills is initialized
  if (selectedPlatforms.length === 0) {
    const fallback = allPlatforms.find((p) => p.id === "agents-shared") || {
      id: "agents-shared",
      name: "Agent Skills Standard",
      globalSkillsDir: path.join(os.homedir(), ".agents", "skills"),
      isDetected: true
    };
    selectedPlatforms = [fallback];
  }

  const linkResults: LinkResult[] = [];

  for (const plat of selectedPlatforms) {
    const res = await projectSkillToPlatform(
      item,
      itemDir,
      plat,
      options.global !== false,
      process.cwd()
    );
    linkResults.push(res);
  }

  return {
    item,
    sourceDir: itemDir,
    links: linkResults,
  };
}
