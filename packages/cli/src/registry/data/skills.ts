import type { SkillManifest } from "../types.js";

export const SKILLS: Record<string, SkillManifest> = {
  "apple-design": {
    schemaVersion: "1.0.0",
    id: "apple-design",
    name: "Apple Human Interface Guidelines Reviewer",
    version: "1.0.0",
    tier: "skill",
    category: "design",
    tokenEstimate: { cl100k_base: 3200, o200k_base: 3050 },
    triggers: ["apple-design", "HIG compliance", "Apple UI review", "iOS styling"],
    invariants: [
      "Dynamic type scaling",
      "Native platform translucent materials",
      "Concentric corner radii: outer = inner + padding",
      "Minimum 44x44pt interactive hit target"
    ],
    content: "Apple Human Interface Guidelines specialist directives..."
  },
  "minimalist-ui": {
    schemaVersion: "1.0.0",
    id: "minimalist-ui",
    name: "Minimalist Utilitarian UI",
    version: "1.0.0",
    tier: "skill",
    category: "design",
    tokenEstimate: { cl100k_base: 2400, o200k_base: 2280 },
    triggers: ["minimalist-ui", "clean monochrome", "flat bento"],
    invariants: [
      "Warm monochrome palette (#090d14 or #f5f5f7)",
      "Zero glowing neon gradients",
      "Crisp 1px borders without heavy ambient drop shadows"
    ],
    conflictsWith: ["high-end-visual-design"],
    recommendsHub: "hub-design",
    content: "Minimalist utilitarian UI directives..."
  },
  "high-end-visual-design": {
    schemaVersion: "1.0.0",
    id: "high-end-visual-design",
    name: "High-End Agency Visual Design",
    version: "1.0.0",
    tier: "skill",
    category: "design",
    tokenEstimate: { cl100k_base: 3600, o200k_base: 3420 },
    triggers: ["high-end-visual-design", "expensive website", "agency tier UI"],
    invariants: [
      "Double-bezel nested container cards",
      "Diffused ambient shadows with inset rim highlights",
      "Macro-whitespace (py-24+)"
    ],
    conflictsWith: ["minimalist-ui"],
    recommendsHub: "hub-design",
    content: "High-end visual design directives..."
  },
  "spring-physics": {
    schemaVersion: "1.0.0",
    id: "spring-physics",
    name: "Spring Physics Engine",
    version: "1.0.0",
    tier: "skill",
    category: "motion",
    tokenEstimate: { cl100k_base: 2800, o200k_base: 2650 },
    triggers: ["spring-physics", "critically damped", "natural spring"],
    invariants: [
      "Critically damped default (damping: 1.0)",
      "Velocity handoff from drag gestures",
      "Sub-300ms duration rule for UI components"
    ],
    content: "Spring physics animation directives..."
  },
  "framer-motion": {
    schemaVersion: "1.0.0",
    id: "framer-motion",
    name: "Framer Motion React Orchestration",
    version: "1.0.0",
    tier: "skill",
    category: "motion",
    tokenEstimate: { cl100k_base: 3100, o200k_base: 2950 },
    triggers: ["framer-motion", "motion/react", "layoutId", "AnimatePresence"],
    invariants: [
      "Shared layout animations using layoutId",
      "Use initial={false} on AnimatePresence during mount",
      "Animate strictly transform and opacity"
    ],
    conflictsWith: ["css-animations"],
    recommendsHub: "hub-motion",
    content: "Framer Motion directives..."
  },
  "css-animations": {
    schemaVersion: "1.0.0",
    id: "css-animations",
    name: "Pure Hardware CSS Animations",
    version: "1.0.0",
    tier: "skill",
    category: "motion",
    tokenEstimate: { cl100k_base: 2300, o200k_base: 2190 },
    triggers: ["css-animations", "pure css transitions", "hardware transforms"],
    invariants: [
      "Composited layer transforms off main thread",
      "Custom cubic-bezier ease-out curves",
      "Zero JavaScript animation overhead"
    ],
    conflictsWith: ["framer-motion"],
    recommendsHub: "hub-motion",
    content: "Pure CSS animations directives..."
  },
  "threejs": {
    schemaVersion: "1.0.0",
    id: "threejs",
    name: "Three.js WebGL Engine",
    version: "1.0.0",
    tier: "skill",
    category: "3d",
    tokenEstimate: { cl100k_base: 3400, o200k_base: 3250 },
    triggers: ["threejs", "WebGL scene", "Three.js render"],
    invariants: [
      "Explicit resource disposal on unmount",
      "Clamp DPR to 2.0 max",
      "Client component isolation ('use client')"
    ],
    content: "Three.js WebGL directives..."
  },
  "cobejs": {
    schemaVersion: "1.0.0",
    id: "cobejs",
    name: "Cobe Interactive 5KB Globe",
    version: "1.0.0",
    tier: "skill",
    category: "3d",
    tokenEstimate: { cl100k_base: 2100, o200k_base: 2000 },
    triggers: ["cobejs", "interactive globe", "lightweight globe"],
    invariants: [
      "Ultra-low 5KB bundle footprint",
      "Canvas marker pointer interactivity",
      "Dispose WebGL context on page navigation"
    ],
    content: "Cobe globe directives..."
  }
};
