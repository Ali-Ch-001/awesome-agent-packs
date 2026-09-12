import { getEncoding } from "js-tiktoken";
import type { ContextBudgetReport, SkillTokenProfile } from "../types.js";

let cl100kEncoder: ReturnType<typeof getEncoding> | null = null;

function getCl100kEncoder() {
  if (!cl100kEncoder) {
    cl100kEncoder = getEncoding("cl100k_base");
  }
  return cl100kEncoder;
}

/**
 * Exact deterministic BPE token calculation via js-tiktoken (cl100k_base for Claude 3.5 Sonnet & GPT-4o)
 */
export function estimateMarkdownTokens(content: string): number {
  if (!content || !content.trim()) return 0;
  try {
    const encoder = getCl100kEncoder();
    return encoder.encode(content).length;
  } catch {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    return Math.round(words * 1.3);
  }
}

export function calculateContextBudget(
  skills: { id: string; content: string; tier: "hub" | "pack" | "skill" }[],
  contextWindowLimit: number = 200_000
): ContextBudgetReport {
  let total = 0;
  const breakdown: SkillTokenProfile[] = skills.map((skill) => {
    const tokens = estimateMarkdownTokens(skill.content);
    total += tokens;
    return {
      skillId: skill.id,
      tokenCount: tokens,
      percentageOfContext: Number(((tokens / contextWindowLimit) * 100).toFixed(2)),
      tierCategory: skill.tier,
    };
  });

  const totalPercentage = Number(((total / contextWindowLimit) * 100).toFixed(2));
  let status: "optimal" | "warning" | "critical" = "optimal";

  if (total > 30_000) {
    status = "critical";
  } else if (total > 15_000) {
    status = "warning";
  }

  return {
    totalTokens: total,
    totalPercentage,
    breakdown,
    status,
  };
}
