import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { RegistryItem } from "../registry/index.js";

export interface LockfileEntry {
  type: "hub" | "pack" | "skill";
  version: string;
  checksum: string;
  tokens: {
    cl100k_base: number;
    o200k_base: number;
  };
  projectedPlatforms: string[];
  installedAt: string;
}

export interface AgentPackLockfile {
  $schema: string;
  lockfileVersion: number;
  engineVersion: string;
  updatedAt: string;
  installed: Record<string, LockfileEntry>;
}

export function computeSha256(content: string): string {
  return crypto.createHash("sha256").update(content, "utf8").digest("hex");
}

export function getLockfilePath(projectRoot: string = process.cwd()): string {
  return path.join(projectRoot, "agentpack.lock.json");
}

export function readLockfile(projectRoot: string = process.cwd()): AgentPackLockfile {
  const filePath = getLockfilePath(projectRoot);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (err: any) {
      console.warn(`[AgentPacks] Warning: Failed to parse ${filePath} (${err.message}). Using fresh lockfile schema.`);
    }
  }

  return {
    $schema: "https://agentpacks.dev/schema/v2/lock.json",
    lockfileVersion: 1,
    engineVersion: "1.0.0",
    updatedAt: new Date().toISOString(),
    installed: {},
  };
}

export function updateLockfile(
  projectRoot: string,
  item: RegistryItem,
  projectedPlatforms: string[]
): AgentPackLockfile {
  const lockfile = readLockfile(projectRoot);

  lockfile.updatedAt = new Date().toISOString();
  lockfile.installed[item.id] = {
    type: item.tier,
    version: item.version,
    checksum: computeSha256(item.content),
    tokens: item.tokenEstimate,
    projectedPlatforms,
    installedAt: new Date().toISOString(),
  };

  const filePath = getLockfilePath(projectRoot);
  fs.writeFileSync(filePath, JSON.stringify(lockfile, null, 2) + "\n", "utf-8");
  return lockfile;
}

export function removeLockfileEntry(
  projectRoot: string,
  skillId: string
): boolean {
  const lockfile = readLockfile(projectRoot);
  const normalized = skillId.replace(/^(\/|pack-|hub-)/, "");
  const candidates = [skillId, normalized, `hub-${normalized}`, `pack-${normalized}`];

  let found = false;
  for (const id of candidates) {
    if (lockfile.installed[id]) {
      delete lockfile.installed[id];
      found = true;
    }
  }

  if (found) {
    lockfile.updatedAt = new Date().toISOString();
    const filePath = getLockfilePath(projectRoot);
    if (Object.keys(lockfile.installed).length === 0) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } else {
      fs.writeFileSync(filePath, JSON.stringify(lockfile, null, 2) + "\n", "utf-8");
    }
  }

  return found;
}
