import { HUBS } from "./data/hubs.js";
import { PACKS } from "./data/packs.js";
import { SKILLS } from "./data/skills.js";
import type { HubManifest, PackManifest, SkillManifest, RegistryItem, RegistryCatalog } from "./types.js";

export * from "./types.js";
export { HUBS } from "./data/hubs.js";
export { PACKS } from "./data/packs.js";
export { SKILLS } from "./data/skills.js";

export const CATALOG: RegistryCatalog = {
  version: "1.0.0",
  updatedAt: "2026-09-13T00:00:00.000Z",
  hubs: HUBS,
  packs: PACKS,
  skills: SKILLS
};

export function getRegistryItem(nameOrId: string): RegistryItem | null {
  const normalized = nameOrId.toLowerCase().trim();
  const noSlash = normalized.replace(/^\/+/, "");
  const stripped = noSlash.replace(/^(pack-|hub-)/, "");

  // Check Hubs
  if (HUBS[normalized]) return HUBS[normalized];
  if (HUBS[noSlash]) return HUBS[noSlash];
  if (HUBS[`hub-${stripped}`]) return HUBS[`hub-${stripped}`];

  // Check Packs
  if (PACKS[normalized]) return PACKS[normalized];
  if (PACKS[noSlash]) return PACKS[noSlash];
  if (PACKS[`pack-${stripped}`]) return PACKS[`pack-${stripped}`];

  // Check direct alias
  for (const pack of Object.values(PACKS)) {
    if (
      pack.triggers.some(
        (t) =>
          t.toLowerCase() === normalized ||
          t.toLowerCase() === noSlash ||
          t.toLowerCase() === `/${noSlash}`
      )
    ) {
      return pack;
    }
  }

  // Check Skills
  if (SKILLS[normalized]) return SKILLS[normalized];
  if (SKILLS[noSlash]) return SKILLS[noSlash];
  if (SKILLS[stripped]) return SKILLS[stripped];

  return null;
}

export function searchRegistry(query: string): RegistryItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [...Object.values(HUBS), ...Object.values(PACKS), ...Object.values(SKILLS)];

  const results: RegistryItem[] = [];

  for (const hub of Object.values(HUBS)) {
    if (
      hub.id.includes(q) ||
      hub.name.toLowerCase().includes(q) ||
      hub.triggers.some(t => t.toLowerCase().includes(q)) ||
      hub.synthesizes.some(s => s.toLowerCase().includes(q))
    ) {
      results.push(hub);
    }
  }

  for (const pack of Object.values(PACKS)) {
    if (
      pack.id.includes(q) ||
      pack.name.toLowerCase().includes(q) ||
      pack.targetSprint.toLowerCase().includes(q) ||
      pack.triggers.some(t => t.toLowerCase().includes(q)) ||
      pack.memberSkills.some(m => m.toLowerCase().includes(q))
    ) {
      results.push(pack);
    }
  }

  for (const skill of Object.values(SKILLS)) {
    if (
      skill.id.includes(q) ||
      skill.name.toLowerCase().includes(q) ||
      skill.triggers.some(t => t.toLowerCase().includes(q))
    ) {
      results.push(skill);
    }
  }

  return results;
}
