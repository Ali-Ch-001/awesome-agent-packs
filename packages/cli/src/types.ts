export interface AgentPlatform {
  id: string;
  name: string;
  globalSkillsDir: string;
  projectRulesDir?: string;
  configPath?: string;
  isDetected: boolean;
}

export interface LinkResult {
  platformId: string;
  platformName: string;
  targetPath: string;
  status: "created" | "already_linked" | "failed";
  error?: string;
}

export interface ConflictEdge {
  skillA: string;
  skillB: string;
  topic: string;
  reason: string;
  recommendation: string;
  autoResolveHub?: string;
}

export interface SkillTokenProfile {
  skillId: string;
  tokenCount: number;
  percentageOfContext: number;
  tierCategory: "hub" | "pack" | "skill";
}

export interface ContextBudgetReport {
  totalTokens: number;
  totalPercentage: number;
  breakdown: SkillTokenProfile[];
  status: "optimal" | "warning" | "critical";
}
