import type { PackManifest } from "../types.js";

export const PACKS: Record<string, PackManifest> = {
  "pack-apple-fluid": {
    schemaVersion: "1.0.0",
    id: "pack-apple-fluid",
    name: "Strike Team: Apple Fluid Interfaces & Physical Motion",
    version: "1.0.0",
    tier: "pack",
    targetSprint: "Physical UI, drawers, bottom sheets, tactile buttons, momentum gestures, zero-latency feedback",
    tokenEstimate: { cl100k_base: 512, o200k_base: 490 },
    replacesTokens: 12410,
    triggers: [
      "pack-apple-fluid",
      "/pack-apple-fluid",
      "apple-fluid",
      "fluid interface",
      "Apple motion",
      "spring gesture",
      "tactile buttons",
      "interruptible drawer"
    ],
    memberSkills: [
      "apple-design",
      "emil-design-eng",
      "spring-physics"
    ],
    invariants: [
      "Touch feedback triggered immediately on pointerdown, never click release",
      "Tactile deflection on press targets: active:scale-[0.97] transition 120ms ease-out",
      "Progressive rubber-banding at boundaries: overshoot * dimension * 0.55 / (dimension + 0.55 * Math.abs(overshoot))",
      "Velocity handoff from pointer directly into spring initial velocity",
      "Critically damped resting spring: damping: 1.0, bounce: 0, duration: 0.35s",
      "Zero-latency interruption: read live presentation values without jumping"
    ],
    content: `---
name: pack-apple-fluid
description: >
  Workflow Strike Team: Apple Fluid Interfaces & Physical Motion.
  Pre-harmonized bundle coordinating apple-design, emil-design-eng, and spring-physics.
  Use when building interactive drawers, bottom sheets, tactile buttons, momentum-based gestures,
  interruptible animations, and zero-latency feedback.
  Triggers on: "pack-apple-fluid", "fluid interface", "Apple motion", "spring gesture",
  "tactile buttons", "interruptible drawer".
---

# Strike Team: Apple Fluid Interfaces (\`pack-apple-fluid\`)

**Active Member Skills:**
1. \`apple-design\` — Zero-latency response on pointer-down, velocity handoff, momentum projection, rubber-banding, translucent materials.
2. \`emil-design-eng\` — Sub-300ms duration rule, custom ease-out curves, blur bridges, tactile \`scale(0.97)\` on press.
3. \`spring-physics\` — Stiffness, damping, mass tuning, critically damped defaults (\`damping: 1.0\`), interruptible re-targeting.

---

## The Coordinated Protocol

When implementing fluid UI interactions:

1. **Input Response (Immediate):**
   * Trigger feedback on \`pointerdown\`, never on click release.
   * Add \`active:scale-[0.97]\` with \`transition: transform 120ms ease-out\` on all interactive press targets.
2. **Dragging & 1:1 Tracking:**
   * Use Pointer Events with \`setPointerCapture\`. Track position + timestamp history across the last 3 moves to compute release velocity.
   * At boundaries, apply progressive rubber-banding resistance rather than hard stops:
     \`overshoot * dimension * 0.55 / (dimension + 0.55 * Math.abs(overshoot))\`.
3. **Release & Velocity Handoff:**
   * Hand off the pointer's release velocity directly into the spring's initial velocity.
   * Project resting position: \`projectedEndpoint = currentPosition + (velocity / 1000) * 0.998 / (1 - 0.998)\`.
   * Animate with critically damped spring: \`{ type: "spring", damping: 1.0, bounce: 0, duration: 0.35 }\`.
4. **Interruption:**
   * Always read the live on-screen transform (presentation value) when a user grabs a moving element mid-flight. Re-target without jumping.
`
  },

  "pack-landing-page": {
    schemaVersion: "1.0.0",
    id: "pack-landing-page",
    name: "Strike Team: Awwwards-Quality Landing Pages & Marketing Sites",
    version: "1.0.0",
    tier: "pack",
    targetSprint: "Marketing sites, bento grids, hero sections, and high-conversion editorial pages",
    tokenEstimate: { cl100k_base: 599, o200k_base: 570 },
    replacesTokens: 13800,
    triggers: [
      "pack-landing-page",
      "/pack-landing-page",
      "landing-page",
      "build landing page",
      "Awwwards site",
      "marketing website",
      "hero section",
      "bento grid",
      "redesign homepage"
    ],
    memberSkills: [
      "design-taste-frontend",
      "high-end-visual-design",
      "make-interfaces-feel-better",
      "image-to-code"
    ],
    invariants: [
      "Design read & palette lock: 1-line aesthetic read before generating code",
      "Hero must fit initial viewport (min-h-[100dvh], never h-screen)",
      "Double-bezel card architecture: outer shell ring-1 ring-white/10, inner concentric core",
      "Concentric border radii: R_outer = R_inner + padding",
      "Section layout variety: minimum 4 distinct compositions per page; zero repetitive zig-zag",
      "Max 1 eyebrow label per 3 sections"
    ],
    content: `---
name: pack-landing-page
description: >
  Workflow Strike Team: Awwwards-Quality Landing Pages & Marketing Sites.
  Pre-harmonized bundle coordinating design-taste-frontend, high-end-visual-design,
  make-interfaces-feel-better, and image-to-code.
  Use when designing marketing sites, bento grids, hero sections, and high-conversion editorial pages.
  Triggers on: "pack-landing-page", "build landing page", "Awwwards site", "marketing website",
  "hero section", "bento grid", "redesign homepage".
---

# Strike Team: Awwwards-Tier Landing Pages (\`pack-landing-page\`)

**Active Member Skills:**
1. \`design-taste-frontend\` — Brief inference, anti-default discipline, layout diversification, bento rhythm, copy self-audit.
2. \`high-end-visual-design\` — Double-bezel nested containers, button-in-button trailing icons, macro-whitespace (\`py-24+\`).
3. \`make-interfaces-feel-better\` — Concentric border radii, optical alignment, image outlines, tabular numerals.
4. \`image-to-code\` — Visual reference extraction, hero asset hierarchy, section-specific composition.

---

## The Coordinated Protocol

When creating high-impact marketing pages:

1. **Design Read & Palette Lock:**
   * Output a 1-line design read before generating code (audience, vibe, aesthetic family).
   * Restrict to 1 primary accent color (saturation < 80%) with warm or cool neutrals. Never fluctuation between warm and cool grays.
   * Lock a single corner-radius system across the whole page (e.g. all-pill interactive, 16px cards).
2. **Hero Discipline:**
   * Hero must fit within initial viewport (\`min-h-[100dvh]\`, never \`h-screen\`).
   * Headline max 2 lines desktop, subtext max 20 words, CTAs visible without scrolling.
   * Top padding capped at \`pt-24\`.
3. **Double-Bezel Card Architecture:**
   * Outer Shell: \`bg-black/5 dark:bg-white/5\`, hairline border \`ring-1 ring-white/10\`, padding \`p-2\`, outer radius \`rounded-[1.5rem]\`.
   * Inner Core: Distinct background, inner highlight \`shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]\`, concentric smaller radius \`rounded-[calc(1.5rem-0.5rem)]\`.
4. **Section Layout Variety:**
   * Never repeat the same layout family twice. A 6-section landing page must use at least 4 distinct compositions (Split-screen, Bento grid, Asymmetric text, Marquee).
   * Max 1 eyebrow label per 3 sections.
`
  },

  "pack-nextjs-perf": {
    schemaVersion: "1.0.0",
    id: "pack-nextjs-perf",
    name: "Strike Team: High-Performance Next.js 14/15 App Router & React 19",
    version: "1.0.0",
    tier: "pack",
    targetSprint: "Full-stack Next.js features, streaming UI, Server Actions, bundle reduction, compound components",
    tokenEstimate: { cl100k_base: 475, o200k_base: 450 },
    replacesTokens: 13200,
    triggers: [
      "pack-nextjs-perf",
      "/pack-nextjs-perf",
      "nextjs-perf",
      "Next.js performance",
      "App Router architecture",
      "RSC streaming",
      "React compound components",
      "optimize Next.js"
    ],
    memberSkills: [
      "nextjs-app-router-patterns",
      "vercel-react-best-practices",
      "vercel-composition-patterns",
      "framer-motion"
    ],
    invariants: [
      "Default all components to Server Components; push 'use client' exclusively to interactive leaves",
      "Zero-waterfall data architecture: concurrent fetching via Promise.all or Suspense streaming",
      "Compound Component API design: eliminate prop explosion with shared context slots",
      "Use initial={false} on AnimatePresence to prevent jarring animations on page load",
      "Animate strictly GPU-composited properties (transform, opacity)"
    ],
    content: `---
name: pack-nextjs-perf
description: >
  Workflow Strike Team: High-Performance Next.js 14/15 App Router & React 19.
  Pre-harmonized bundle coordinating nextjs-app-router-patterns, vercel-react-best-practices,
  vercel-composition-patterns, and framer-motion.
  Use when building full-stack Next.js features, streaming UI, Server Actions,
  bundle reduction, and compound components.
  Triggers on: "pack-nextjs-perf", "Next.js performance", "App Router architecture",
  "RSC streaming", "React compound components", "optimize Next.js".
---

# Strike Team: Next.js Performance & Architecture (\`pack-nextjs-perf\`)

**Active Member Skills:**
1. \`nextjs-app-router-patterns\` — Server components (RSC), streaming with Suspense, parallel & intercepting routes, server actions.
2. \`vercel-react-best-practices\` — Bundle size profiling, eliminating waterfalls, optimizing LCP/INP/CLS, dynamic imports.
3. \`vercel-composition-patterns\` — Compound component patterns, avoiding boolean prop explosion, flexible slot APIs.
4. \`framer-motion\` — Layout animations (\`layoutId\`), shared element transitions, AnimatePresence with \`initial={false}\`.

---

## The Coordinated Protocol

When architecting React/Next.js features:

1. **RSC & Client Boundary Isolation:**
   * Default all components to Server Components. Push \`"use client"\` exclusively to the leaf components that require interactivity.
   * Wrap layout animations in isolated client leaves so the surrounding layout remains static and server-rendered.
2. **Zero-Waterfall Data Architecture:**
   * Fetch independent data streams concurrently via \`Promise.all()\` or separate \`<Suspense>\` boundaries.
   * Stream heavy sections into place without blocking the initial HTML response.
3. **Compound Component API Design:**
   * Replace prop-bloated components with composable subcomponents sharing context (e.g. \`Modal.Header\`, \`Modal.Body\`, \`Modal.Footer\`).
4. **Motion & State Safety:**
   * Use \`initial={false}\` on \`AnimatePresence\` to prevent jarring animations during page load.
   * Animate strictly GPU-composited properties (\`transform\`, \`opacity\`).
`
  },

  "pack-expo-mobile": {
    schemaVersion: "1.0.0",
    id: "pack-expo-mobile",
    name: "Strike Team: Production React Native & Expo Mobile",
    version: "1.0.0",
    tier: "pack",
    targetSprint: "Production mobile screens, 60fps lists, Reanimated v3 gestures, NativeWind v4 components, Apple HIG",
    tokenEstimate: { cl100k_base: 429, o200k_base: 410 },
    replacesTokens: 12900,
    triggers: [
      "pack-expo-mobile",
      "/pack-expo-mobile",
      "expo-mobile",
      "Expo app",
      "React Native screen",
      "mobile performance",
      "Reanimated gesture",
      "NativeWind",
      "iOS native feeling"
    ],
    memberSkills: [
      "expo-native-ui",
      "react-native-performance",
      "react-native-reusables",
      "animate-expo"
    ],
    invariants: [
      "Platform semantic colors and translucency via PlatformColor and expo-blur",
      "Protect layouts with dynamic useSafeAreaInsets()",
      "Use FlashList with estimatedItemSize; never unbounded ScrollView",
      "Offload all gestures to native UI thread via Reanimated v3 and Gesture Handler",
      "Trigger physical haptics via expo-haptics on significant snaps and actions"
    ],
    content: `---
name: pack-expo-mobile
description: >
  Workflow Strike Team: Production React Native & Expo Mobile.
  Pre-harmonized bundle coordinating expo-native-ui, react-native-performance,
  react-native-reusables, and animate-expo.
  Use when building production mobile screens, 60fps lists, Reanimated v3 gestures,
  NativeWind v4 components, and Apple HIG interfaces.
  Triggers on: "pack-expo-mobile", "Expo app", "React Native screen", "mobile performance",
  "Reanimated gesture", "NativeWind", "iOS native feeling".
---

# Strike Team: Expo Mobile Production (\`pack-expo-mobile\`)

**Active Member Skills:**
1. \`expo-native-ui\` — Apple HIG native-feeling screens, native controls, SF Symbols, semantic system colors.
2. \`react-native-performance\` — 60/120fps list optimization, bridge traffic reduction, TTI profiling, memory leak elimination.
3. \`react-native-reusables\` — shadcn/ui-style headless components with NativeWind v4 and RN Primitives.
4. \`animate-expo\` — React Native Reanimated v3, Gesture Handler native thread offload, physical haptics.

---

## The Coordinated Protocol

When developing React Native/Expo applications:

1. **Native UI Feel:**
   * Integrate Apple system semantic colors and blur materials (\`PlatformColor\`, \`expo-blur\`).
   * Protect all screen layouts with dynamic \`useSafeAreaInsets()\`.
2. **List Performance (Zero Frame Drops):**
   * Use \`FlashList\` with \`estimatedItemSize\` for list rendering. Never render unbounded \`ScrollView\`.
   * Memoize list render items (\`useCallback\`, \`React.memo\`) and avoid inline arrow functions.
3. **UI Thread Gesture Isolation:**
   * Execute all drag, pinch, and momentum gestures on the native UI thread using \`react-native-reanimated\` and \`react-native-gesture-handler\`.
   * Trigger subtle physical feedback via \`expo-haptics\` on snaps and confirmations.
`
  },

  "pack-cloud-deploy": {
    schemaVersion: "1.0.0",
    id: "pack-cloud-deploy",
    name: "Strike Team: Production Cloud Deployment, DevOps & Infrastructure as Code",
    version: "1.0.0",
    tier: "pack",
    targetSprint: "GitHub Actions CI/CD workflows, Dockerfiles, Terraform modules, multi-cloud topologies",
    tokenEstimate: { cl100k_base: 450, o200k_base: 430 },
    replacesTokens: 14100,
    triggers: [
      "pack-cloud-deploy",
      "/pack-cloud-deploy",
      "cloud-deploy",
      "deploy infrastructure",
      "GitHub Actions workflow",
      "Dockerfile",
      "Terraform module",
      "AWS deploy",
      "GCP Cloud Run",
      "production DevOps"
    ],
    memberSkills: [
      "senior-devops",
      "infra-engineer",
      "github-actions",
      "terraform-module-library"
    ],
    invariants: [
      "Multi-stage Dockerfiles separating build dependencies from runtime",
      "Run containers as non-root service users (USER node or USER nonroot)",
      "Optimize Docker layer cache: copy manifests before source code",
      "Persistent CI caching (buildx, framework cache) for sub-3 minute PR builds",
      "OIDC cloud auth; never commit static access tokens or service account keys",
      "Dual-enclave isolation: isolate public compute from private VPC data vaults"
    ],
    content: `---
name: pack-cloud-deploy
description: >
  Workflow Strike Team: Production Cloud Deployment, DevOps & Infrastructure as Code.
  Pre-harmonized bundle coordinating senior-devops, infra-engineer, github-actions,
  and terraform-module-library.
  Use when writing GitHub Actions CI/CD workflows, Dockerfiles, Terraform modules,
  multi-cloud topologies, and cloud container deployments.
  Triggers on: "pack-cloud-deploy", "deploy infrastructure", "GitHub Actions workflow",
  "Dockerfile", "Terraform module", "AWS deploy", "GCP Cloud Run", "production DevOps".
---

# Strike Team: Cloud Deployment & DevOps (\`pack-cloud-deploy\`)

**Active Member Skills:**
1. \`senior-devops\` — Automated CI/CD pipelines, containerization, deployment orchestration, monitoring.
2. \`infra-engineer\` — Multi-cloud architectures (AWS/GCP/Cloudflare), VPC networking, security scanning, FinOps.
3. \`github-actions\` — Workflow triggers, runner caching, OIDC cloud auth, downloadable artifacts.
4. \`terraform-module-library\` — Standardized reusable IaC modules, remote state locking, input validation.

---

## The Coordinated Protocol

When shipping infrastructure and CI/CD automation:

1. **Production Docker Discipline:**
   * Build multi-stage Dockerfiles separating build tooling from production runtimes.
   * Run containers as non-root service users (\`USER node\` or \`USER nonroot\`).
   * Optimize build layer caching by copying package manifests before source files.
2. **GitHub Actions Workflow Optimization:**
   * Integrate Docker buildx caching and framework cache volumes to keep build times under 3 minutes.
   * Use OIDC authentication to assume cloud IAM roles; never commit static service account keys.
   * Run linting, type-checking, and unit tests concurrently before container builds.
3. **Dual-Enclave Cloud Isolation:**
   * Isolate public compute runtimes (Cloud Run, ECS) from private databases (Cloud SQL, RDS) via private VPC connectors and Unix socket peering.
   * Inject all secrets dynamically at runtime from Secret Manager.
`
  },

  "pack-saas-video": {
    schemaVersion: "1.0.0",
    id: "pack-saas-video",
    name: "Strike Team: High-Conversion Remotion SaaS Videos & Product Reels",
    version: "1.0.0",
    tier: "pack",
    targetSprint: "Programmatic product demo videos, marketing launch reels, animated captions, promo video clips",
    tokenEstimate: { cl100k_base: 412, o200k_base: 390 },
    replacesTokens: 13500,
    triggers: [
      "pack-saas-video",
      "/pack-saas-video",
      "saas-video",
      "make product video",
      "Remotion demo",
      "SaaS video reel",
      "launch video",
      "render product video"
    ],
    memberSkills: [
      "saas-product-demo-video",
      "promo-video",
      "remotion-best-practices"
    ],
    invariants: [
      "20-45s Storyboard: 0-4s Hook, 4-12s UI Reveal, 12-30s Demo, 30-38s Proof, 38-45s CTA",
      "Frame-based spring physics: spring({ frame, fps, config }) without CSS transitions",
      "Animation milestones synchronized strictly to useCurrentFrame() and useVideoConfig()",
      "Audio ducking: automatically duck music volume by 70% during spoken narration"
    ],
    content: `---
name: pack-saas-video
description: >
  Workflow Strike Team: High-Conversion Remotion SaaS Videos & Product Reels.
  Pre-harmonized bundle coordinating saas-product-demo-video, promo-video,
  and remotion-best-practices.
  Use when generating programmatic product demo videos, marketing launch reels,
  animated subtitle captions, and promotional video clips.
  Triggers on: "pack-saas-video", "make product video", "Remotion demo", "SaaS video reel",
  "launch video", "render product video".
---

# Strike Team: SaaS Product Video in Remotion (\`pack-saas-video\`)

**Active Member Skills:**
1. \`saas-product-demo-video\` — 20–45s cinematic SaaS demo structure, UI zooms, narrative pacing, social proof.
2. \`promo-video\` — ElevenLabs AI voiceover integration, background music ducking, promotional timing.
3. \`remotion-best-practices\` — Remotion architecture, \`useCurrentFrame\`, \`interpolate\`, \`spring\`, CLI rendering.

---

## The Coordinated Protocol

When creating programmatic product films:

1. **20–45s Storyboard Architecture:**
   * **0–4s:** Hook & Problem Agitation.
   * **4–12s:** The Clean Product UI Reveal.
   * **12–30s:** High-Impact Workflow Demo with dynamic zooms and captions.
   * **30–38s:** Social Proof, Metrics, and Customer Quote Cards.
   * **38–45s:** Clear Call to Action and closing brand sting.
2. **Frame-Based Spring Physics:**
   * Replace duration transitions with Remotion's native \`spring()\` helper.
   * Sync animation milestones strictly to \`useCurrentFrame()\` and \`useVideoConfig()\`.
3. **Audio Balancing:**
   * Combine spoken voiceover tracks with background music. Automatically duck music volume by 70% during active speech intervals.
`
  }
};
