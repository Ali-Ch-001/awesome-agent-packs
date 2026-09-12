import type { ConflictEdge } from "../types.js";

export const KNOWN_CONFLICT_MATRIX: ConflictEdge[] = [
  {
    skillA: "minimalist-ui",
    skillB: "high-end-visual-design",
    topic: "Surfaces & Shadows",
    reason: "minimalist-ui bans ambient shadows and nested gradients, whereas high-end-visual-design enforces double-bezel ambient glow and button-in-button halos.",
    recommendation: "Load '/hub-design' to dynamically pick surface styles per product context instead of overloading conflicting directives.",
    autoResolveHub: "hub-design",
  },
  {
    skillA: "css-animations",
    skillB: "framer-motion",
    topic: "Animation Engine Authority",
    reason: "Direct CSS keyframe transitions conflict with Framer Motion layoutId and imperative controls, producing conflicting inline transform style tags.",
    recommendation: "Load '/hub-motion' to enforce Framer Motion for React layout changes and hardware CSS for micro-interactions.",
    autoResolveHub: "hub-motion",
  },
  {
    skillA: "cobejs",
    skillB: "threejs",
    topic: "3D Viewport Clashes",
    reason: "Loading full Three.js WebGL scenes alongside autonomous Cobe canvas listeners risks WebGL context budget exhaustion (>16 contexts).",
    recommendation: "Load '/hub-3d' which assigns Cobe for lightweight pseudo-spheres and Three.js for interactive models with strict context disposal.",
    autoResolveHub: "hub-3d",
  },
  {
    skillA: "nextjs-app-router-patterns",
    skillB: "react-native-core",
    topic: "Platform Target Contradiction",
    reason: "Next.js Server Component directives ('use server', cookies()) break when mixed into React Native / Metro bundler skill sessions.",
    recommendation: "Separate web tasks into '/pack-nextjs-perf' and mobile tasks into '/pack-expo-mobile'.",
  },
];

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
      detectedConflicts.push(edge);
      if (edge.autoResolveHub) {
        suggestedHubs.add(edge.autoResolveHub);
      }
    }
  }

  return {
    conflicts: detectedConflicts,
    suggestedHubs: Array.from(suggestedHubs),
  };
}
