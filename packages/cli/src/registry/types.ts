export type RegistryItemTier = "hub" | "pack" | "skill";

export interface SkillTokenProfile {
  cl100k_base: number;
  o200k_base: number;
}

export interface HubManifest {
  schemaVersion: "1.0.0";
  id: string;
  name: string;
  version: string;
  tier: "hub";
  category: "design" | "motion" | "3d" | "web" | "mobile" | "video" | "cloud" | "backend";
  tokenEstimate: SkillTokenProfile;
  triggers: string[];
  synthesizes: string[];
  invariants: string[];
  escalationMatrix: {
    intent: string;
    subSkillId: string;
  }[];
  content: string;
}

export interface PackManifest {
  schemaVersion: "1.0.0";
  id: string;
  name: string;
  version: string;
  tier: "pack";
  targetSprint: string;
  tokenEstimate: SkillTokenProfile;
  memberSkills: string[];
  triggers: string[];
  invariants: string[];
  content: string;
}

export interface SkillManifest {
  schemaVersion: "1.0.0";
  id: string;
  name: string;
  version: string;
  tier: "skill";
  category: string;
  tokenEstimate: SkillTokenProfile;
  triggers: string[];
  invariants: string[];
  conflictsWith?: string[];
  recommendsHub?: string;
  content: string;
}

export type RegistryItem = HubManifest | PackManifest | SkillManifest;

export interface RegistryCatalog {
  version: string;
  updatedAt: string;
  hubs: Record<string, HubManifest>;
  packs: Record<string, PackManifest>;
  skills: Record<string, SkillManifest>;
}
