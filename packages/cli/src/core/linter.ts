import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ConflictEdge } from "../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadConflictMatrix(): ConflictEdge[] {
  const candidatePaths = [
    path.resolve(__dirname, "../registry/matrix.json"),
    path.resolve(__dirname, "../../src/registry/matrix.json"),
    path.resolve(__dirname, "../../registry/matrix.json"),
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      try {
        const raw = JSON.parse(fs.readFileSync(p, "utf-8"));
        return raw.conflicts || [];
      } catch {}
    }
  }

  return [];
}

export const KNOWN_CONFLICT_MATRIX: ConflictEdge[] = loadConflictMatrix();

export function lintActiveSkills(installedSkills: string[]): {
  conflicts: ConflictEdge[];
  suggestedHubs: string[];
} {
  const activeNormalized = new Set(
    installedSkills.map((s) => s.toLowerCase().replace(/^(pack-|hub-)/, ""))
  );

  const detectedConflicts: ConflictEdge[] = [];
  const suggestedHubs = new Set<string>();

  for (const edge of KNOWN_CONFLICT_MATRIX) {
    const a = edge.skillA.toLowerCase().replace(/^(pack-|hub-)/, "");
    const b = edge.skillB.toLowerCase().replace(/^(pack-|hub-)/, "");

    if (activeNormalized.has(a) && activeNormalized.has(b)) {
      // Check if the reconciling master hub is already active
      const hubActive = Boolean(
        edge.autoResolveHub &&
        (activeNormalized.has(edge.autoResolveHub.toLowerCase().replace(/^(pack-|hub-)/, "")) ||
         installedSkills.some((s) => s.toLowerCase() === edge.autoResolveHub?.toLowerCase()))
      );

      // If the hub is active, the conflict is reconciled and suppressed
      if (!hubActive) {
        detectedConflicts.push(edge);
        if (edge.autoResolveHub) {
          suggestedHubs.add(edge.autoResolveHub);
        }
      }
    }
  }

  return {
    conflicts: detectedConflicts,
    suggestedHubs: Array.from(suggestedHubs),
  };
}
