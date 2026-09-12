import type { HubManifest } from "../types.js";

export const HUBS: Record<string, HubManifest> = {
  "hub-design": {
    schemaVersion: "1.0.0",
    id: "hub-design",
    name: "Master Design & Visual Craft Hub",
    version: "1.0.0",
    tier: "hub",
    category: "design",
    tokenEstimate: { cl100k_base: 2840, o200k_base: 2710 },
    triggers: [
      "hub-design",
      "/hub-design",
      "design this",
      "make it look high-end",
      "redesign",
      "UI audit",
      "craft review",
      "visual polish"
    ],
    synthesizes: [
      "apple-design",
      "emil-design-eng",
      "design-taste-frontend",
      "high-end-visual-design",
      "make-interfaces-feel-better",
      "minimalist-ui",
      "redesign-existing-projects"
    ],
    invariants: [
      "Concentric Border Radius: R_outer = R_inner + padding",
      "Tactile Press Feedback: active:scale-[0.97] with transition: transform 120ms ease-out",
      "Anti-Slop Color Discipline: Restrict accents to 1 primary brand color (saturation < 80%)",
      "Tabular Numerals: Always apply tabular-nums to counters and dynamic rates",
      "No scale(0) Entrances: Start transitions from scale(0.95) with opacity: 0",
      "Sub-300ms UI Duration: Routine UI transitions must stay under 250ms"
    ],
    escalationMatrix: [
      { intent: "deep Apple HIG audits on native mobile/desktop screens", subSkillId: "apple-design" },
      { intent: "full multi-section landing page art-direction", subSkillId: "design-taste-frontend" },
      { intent: "Awwwards-tier 3D & layered cards", subSkillId: "high-end-visual-design" },
      { intent: "existing codebase refactoring without redesigning from scratch", subSkillId: "redesign-existing-projects" }
    ],
    content: `---
name: hub-design
description: >
  Master Design & Visual Craft Hub. Unified authority on UI/UX, Apple HIG, anti-slop frontend taste,
  typographic hierarchies, double-bezel card architectures, and tactile micro-details.
  Synthesizes apple-design, emil-design-eng, design-taste-frontend, high-end-visual-design,
  make-interfaces-feel-better, minimalist-ui, and redesign-existing-projects.
  Triggers on: "hub-design", "design this", "make it look high-end", "redesign", "UI audit",
  "craft review", "visual polish", or any request for agency-grade design.
---

# Master Design Hub (\`hub-design\`)

Unified design architecture synthesizing the collective craft of Apple Human Interface Guidelines, Emil Kowalski design engineering, and anti-slop frontend principles.

---

## 1. Unified Design Directives

### A. The Conflict-Free Style Decision Tree
When designing a surface, match the aesthetic to the product's job:
* **Workspace / SaaS / Dashboard / B2B:** Apply **Minimalist Utilitarian** (\`minimalist-ui\`). Warm monochrome palette (\`#090d14\` or \`#f5f5f7\`), crisp 1px borders, zero glowing neon gradients, flat bento grids, monospace metadata.
* **Consumer / Brand / Agency / Showcase:** Apply **High-End Dimensional** (\`high-end-visual-design\`). Double-bezel nested containers, button-in-button trailing icons, diffused ambient shadows, macro-whitespace (\`py-24+\`).
* **Interactive Tool / Mobile / Desktop Application:** Apply **Apple HIG Fluid Materials** (\`apple-design\`). Frosted glass chrome (\`backdrop-filter\`), zero-latency pointer-down response, spring-physics feedback, optical tabular figures.

### B. Universal Invariants (The Non-Negotiables)
1. **Concentric Border Radius:** Outer Radius = Inner Radius + Padding (\`R_outer = R_inner + padding\`). Mismatched nested radii pinch corners and destroy visual polish.
2. **Tactile Press Feedback:** Every interactive button must deflect on pointer-down: \`active:scale-[0.97]\` (or \`0.96\`) with \`transition: transform 120ms ease-out\`. Never wait for click-up.
3. **Anti-Slop Color Discipline:** Never use generic AI purple/blue glowing buttons. Restrict accents to 1 primary brand color (saturation < 80%) with high-contrast neutrals.
4. **Tabular Numerals:** Always apply \`tabular-nums\` (\`font-variant-numeric: tabular-nums\`) to counters, financial metrics, and dynamic rates to prevent horizontal shifting.
5. **No \`scale(0)\` Entrances:** In the physical world, objects deflated still occupy space. Start scale transitions from \`scale(0.95)\` with \`opacity: 0\`.
6. **Sub-300ms UI Duration:** Routine UI transitions (menus, buttons, selects) must stay under 250ms. Only cinematic marketing narratives may run longer.

---

## 2. Review Format

When reviewing or auditing existing UI code, use the strict Before/After table:

| Before | After | Why |
| :--- | :--- | :--- |
| \`transition: all 300ms\` | \`transition: transform 150ms ease-out\` | Specify exact properties; avoid \`all\` to prevent repaints |
| \`scale(0)\` entrance | \`scale(0.95)\` + \`opacity: 0\` | Natural physical emergence; avoids sudden pop-in |
| Unstyled table borders | Rounded card container with \`tabular-nums\` | Professional data scannability |
| Static \`:active\` state | \`transform: scale(0.97)\` on \`:active\` | Direct tactile feedback on touch-down |

---

## 3. Specialist Escalation Router

When the user's request exceeds general design synthesis, invoke the specialist sub-skill:
* For **deep Apple HIG audits on native mobile/desktop screens**: invoke \`apple-design\`.
* For **full multi-section landing page art-direction**: invoke \`design-taste-frontend\`.
* For **Awwwards-tier 3D & layered cards**: invoke \`high-end-visual-design\`.
* For **existing codebase refactoring without redesigning from scratch**: invoke \`redesign-existing-projects\`.
`
  },

  "hub-motion": {
    schemaVersion: "1.0.0",
    id: "hub-motion",
    name: "Master Motion, Physics & Animation Hub",
    version: "1.0.0",
    tier: "hub",
    category: "motion",
    tokenEstimate: { cl100k_base: 2910, o200k_base: 2780 },
    triggers: [
      "hub-motion",
      "/hub-motion",
      "animate this",
      "smooth transitions",
      "spring animation",
      "ScrollTrigger",
      "GSAP timeline",
      "Framer Motion layout"
    ],
    synthesizes: [
      "spring-physics",
      "framer-motion",
      "gsap",
      "ftb-gsap-scrolltrigger",
      "cinematic-gsap-lenis-motion-system",
      "scroll-animations",
      "css-animations"
    ],
    invariants: [
      "Hardware Acceleration: Animate strictly transform and opacity",
      "Never animate layout-triggering properties (width, height, top, left)",
      "Continuous inputs (mouse, scroll) must run outside React render cycle",
      "Critically damped UI springs: damping 1.0, bounce 0, duration 0.35s",
      "All motion must honor prefers-reduced-motion"
    ],
    escalationMatrix: [
      { intent: "advanced GSAP pinning, card stacks, or horizontal scroll hijacks", subSkillId: "ftb-gsap-scrolltrigger" },
      { intent: "luxury agency smooth scroll with Lenis", subSkillId: "cinematic-gsap-lenis-motion-system" },
      { intent: "React Native Reanimated gestures", subSkillId: "animate-expo" },
      { intent: "deep spring parameter tuning (stiffness, damping, mass)", subSkillId: "spring-physics" }
    ],
    content: `---
name: hub-motion
description: >
  Master Motion, Physics & Animation Hub. Unified authority on spring dynamics, Framer Motion,
  GSAP ScrollTrigger, CSS hardware-accelerated transforms, and velocity handoff.
  Synthesizes spring-physics, framer-motion, gsap, ftb-gsap-scrolltrigger,
  cinematic-gsap-lenis-motion-system, scroll-animations, and css-animations.
  Triggers on: "hub-motion", "animate this", "smooth transitions", "spring animation",
  "ScrollTrigger", "GSAP timeline", "Framer Motion layout", or any request for web animation.
---

# Master Motion Hub (\`hub-motion\`)

Unified motion architecture bringing together physical spring dynamics, declarative Framer Motion state orchestration, and GreenSock (GSAP) timeline choreography.

---

## 1. The Unified Motion Decision Framework

### Step 1: Should this animate at all?
* **100+ times/day (Keyboard shortcuts, Command Palette, Tab switches):** Zero animation. Instant state swap.
* **Tens of times/day (List hover, Button taps, Dropdowns):** Subtle, micro-transitions (≤150ms) or micro-springs (\`stiffness: 500, damping: 40\`).
* **Occasional (Drawers, Modals, Sheets, Toasts):** Physical spring animation (\`response: 0.35s, damping: 1.0\`).
* **Rare / Narrative (Onboarding, Hero reveals, Celebrations):** Staggered cinematic reveals (≤800ms).

### Step 2: Choosing the Engine
* **Declarative React UI & Gestures:** Reach for **Motion / Framer Motion** (\`motion/react\`). Use \`layoutId\` for shared element transitions and spring physics on components.
* **Complex Scroll Scrubbing & Viewport Pinning:** Reach for **GSAP + ScrollTrigger**. Use \`start: "top top"\`, \`pin: true\`, and \`scrub: 1\` for sticky card stacks.
* **High-Frequency or Staggered Static UI:** Reach for **Pure CSS / WAAPI**. CSS transitions run off the main thread and remain at 120fps under heavy JavaScript execution.

### Step 3: The Physics Triplet & Spring Standards
* **Default UI Springs (Apple Standard):** Critically damped (\`damping: 1.0, bounce: 0, duration: 0.35s\`). Sinks smoothly into target without oscillation.
* **Momentum / Flick Springs:** Slight overshoot (\`damping: 0.8, bounce: 0.15–0.25\`). Reserve bounce **only** when the preceding gesture carried physical momentum.
* **Easing Discipline:** Never use \`ease-in\` for interactive UI (it feels sluggish on start). Use strong custom ease-out:
  \`\`\`css
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  \`\`\`

---

## 2. Hard Guardrails & Performance

1. **Hardware Acceleration:** Animate **strictly** \`transform\` and \`opacity\`. Never animate layout-triggering properties (\`width\`, \`height\`, \`top\`, \`left\`, \`margin\`, \`padding\`).
2. **Never Animate Continuous Input via React State:** Mouse tracking, scroll progress, and magnetic pulls must run outside the React render cycle using \`useMotionValue\` / \`useTransform\`.
3. **Accessibility Guard:** All motion must honor \`prefers-reduced-motion\`. In Motion, wrap with \`useReducedMotion()\` and degrade to opacity cross-fades.

---

## 3. Specialist Escalation Router

* For **advanced GSAP pinning, card stacks, or horizontal scroll hijacks**: invoke \`ftb-gsap-scrolltrigger\`.
* For **luxury agency smooth scroll with Lenis**: invoke \`cinematic-gsap-lenis-motion-system\`.
* For **React Native Reanimated gestures**: invoke \`animate-expo\`.
* For **deep spring parameter tuning (stiffness, damping, mass)**: invoke \`spring-physics\`.
`
  },

  "hub-3d": {
    schemaVersion: "1.0.0",
    id: "hub-3d",
    name: "Master 3D WebGL, Three.js & Shaders Hub",
    version: "1.0.0",
    tier: "hub",
    category: "3d",
    tokenEstimate: { cl100k_base: 3120, o200k_base: 2950 },
    triggers: [
      "hub-3d",
      "/hub-3d",
      "3D scene",
      "Three.js",
      "R3F",
      "WebGL",
      "interactive globe",
      "3D scroll world",
      "shader effect"
    ],
    synthesizes: [
      "threejs",
      "ftb-threejs-webgl",
      "ftb-react-three-fiber",
      "build-threejs-scroll-worlds",
      "cobejs",
      "globe-gl",
      "globe-particles",
      "webgl-3d-object"
    ],
    invariants: [
      "3D Canvas components must be isolated in client components ('use client')",
      "Dynamic import with ssr: false required for WebGL canvas",
      "Recursive disposal on unmount: geometry, material, texture, renderer",
      "Clamp DPR: dpr={[1, 1.5]} (never 3x/4x on retina screens)",
      "Limit shadow map sizes to 1024x1024 or 512x512"
    ],
    escalationMatrix: [
      { intent: "declarative component-based React 3D scenes", subSkillId: "ftb-react-three-fiber" },
      { intent: "scroll-driven cinematic 3D camera journeys across chapters", subSkillId: "build-threejs-scroll-worlds" },
      { intent: "lightweight canvas planetary globes with markers", subSkillId: "cobejs" },
      { intent: "custom GLSL vertex/fragment shaders and post-processing", subSkillId: "ftb-threejs-webgl" }
    ],
    content: `---
name: hub-3d
description: >
  Master 3D WebGL, Three.js & Shaders Hub. Unified authority on real-time 3D web experiences,
  React Three Fiber (R3F), interactive globes, scroll-controlled continuous 3D worlds, and lightweight pseudo-3D.
  Synthesizes threejs, ftb-threejs-webgl, ftb-react-three-fiber, build-threejs-scroll-worlds,
  cobejs, globe-gl, globe-particles, and webgl-3d-object.
  Triggers on: "hub-3d", "3D scene", "Three.js", "R3F", "WebGL", "interactive globe",
  "3D scroll world", "shader effect", or any request for 3D web graphics.
---

# Master 3D WebGL Hub (\`hub-3d\`)

Unified 3D engineering architecture spanning declarative React Three Fiber scenes, low-level Three.js WebGL shaders, interactive globes, and lightweight decorative depth effects.

---

## 1. The 3D Technology Decision Tree

Before introducing a heavy WebGL bundle, select the lightest engine that satisfies the visual brief:

| Need | Recommended Engine | Package | Bundle Impact |
| :--- | :--- | :--- | :--- |
| **Interactive Data Globe** | **Cobe** | \`cobe\` | ~5 KB (Canvas 2D/WebGL) |
| **Decorative Product Tilt / Card 3D** | **CSS 3D / Vanilla-Tilt** | Pure CSS \`preserve-3d\` | 0 KB |
| **Hero 3D Physical Object / Geometry** | **Three.js Standalone** | \`three\` | ~150 KB (Lazy-loaded) |
| **Full Interactive React 3D Application** | **React Three Fiber + Drei** | \`@react-three/fiber\`, \`@react-three/drei\` | ~250 KB |
| **Continuous Scroll 3D Scrollytelling** | **Three.js + GSAP ScrollTrigger** | \`three\` + \`gsap\` | ~220 KB |

---

## 2. Core WebGL & R3F Invariants

### A. Next.js / SSR Boundary Rule
* 3D Canvas components **must always be isolated in client components** (\`"use client"\`).
* Dynamic import with \`ssr: false\` is required to prevent \`window\` / WebGL context errors during build time.

### B. Memory & Resource Disposal
* WebGL contexts leak memory if meshes and materials are not disposed of when components unmount.
* Always clean up: \`geometry.dispose()\`, \`material.dispose()\`, \`texture.dispose()\`, and \`renderer.dispose()\`.

### C. Performance Budget (60–120 FPS on Mobile)
* **Pixel Ratio:** Clamp DPR: \`dpr={[1, 1.5]}\` (never 3x or 4x on retina screens; it destroys GPU fill-rate).
* **Shadow Maps:** Limit shadow map sizes to \`1024x1024\` or \`512x512\`. Use soft contact shadows over expensive real-time cascade shadow maps where possible.
* **Draw Calls:** Batch geometries using \`InstancedMesh\` when rendering hundreds of repetitive items.

---

## 3. Specialist Escalation Router

* For **declarative component-based React 3D scenes**: invoke \`ftb-react-three-fiber\`.
* For **scroll-driven cinematic 3D camera journeys across chapters**: invoke \`build-threejs-scroll-worlds\`.
* For **lightweight canvas planetary globes with markers**: invoke \`cobejs\`.
* For **custom GLSL vertex/fragment shaders and post-processing**: invoke \`ftb-threejs-webgl\`.
`
  },

  "hub-web": {
    schemaVersion: "1.0.0",
    id: "hub-web",
    name: "Master Modern Web & Next.js Frameworks Hub",
    version: "1.0.0",
    tier: "hub",
    category: "web",
    tokenEstimate: { cl100k_base: 2750, o200k_base: 2620 },
    triggers: [
      "hub-web",
      "/hub-web",
      "Next.js",
      "App Router",
      "RSC",
      "Server Component",
      "React composition",
      "Vercel deploy",
      "Core Web Vitals"
    ],
    synthesizes: [
      "nextjs-app-router-patterns",
      "vercel-composition-patterns",
      "vercel-react-best-practices",
      "vercel-react-view-transitions",
      "vercel-optimize",
      "deploy-to-vercel",
      "web-design-guidelines"
    ],
    invariants: [
      "Server Components (RSC) by default",
      "Push 'use client' exclusively down to interactive leaf nodes",
      "Avoid data waterfalls; fetch concurrently with Promise.all or Suspense streaming",
      "Avoid boolean prop explosion: enforce Compound Components",
      "Prefer browser-native View Transitions API over heavy router wrappers"
    ],
    escalationMatrix: [
      { intent: "Next.js 14+ parallel routes, intercepting routes, and streaming server actions", subSkillId: "nextjs-app-router-patterns" },
      { intent: "refactoring bloated components into scalable compound patterns", subSkillId: "vercel-composition-patterns" },
      { intent: "production bundle profiling, code-splitting, and LCP optimization", subSkillId: "vercel-react-best-practices" },
      { intent: "automated Vercel preview or production deployments via CLI", subSkillId: "deploy-to-vercel" }
    ],
    content: `---
name: hub-web
description: >
  Master Modern Web & Next.js Frameworks Hub. Unified authority on Next.js 14/15 App Router,
  React Server Components (RSC), Vercel performance optimization, compound component architecture,
  and native View Transitions.
  Synthesizes nextjs-app-router-patterns, vercel-composition-patterns, vercel-react-best-practices,
  vercel-react-view-transitions, vercel-optimize, deploy-to-vercel, and web-design-guidelines.
  Triggers on: "hub-web", "Next.js", "App Router", "RSC", "Server Component",
  "React composition", "Vercel deploy", "Core Web Vitals", or any modern React web architecture task.
---

# Master Modern Web Hub (\`hub-web\`)

Unified engineering authority for modern React 19 and Next.js App Router applications, enforcing scalable composition, zero-waterfall data fetching, and high-performance bundle architecture.

---

## 1. Next.js App Router Architecture Standards

### A. The Server Component (RSC) Default
* **RSC by Default:** Keep components as Server Components unless they explicitly require event listeners, browser APIs, or state hooks.
* **Push \`"use client"\` to the Leaves:** Never turn a whole page or section layout into a client component just to handle one button or animation. Isolate interactive controls into tiny leaf client components.
* **Avoid Data Waterfalls:** Fetch data in parallel using \`Promise.all()\` or separate \`<Suspense>\` boundaries. Let slow sections stream in without blocking the primary page render.

### B. Scalable Component Composition (Anti-Boolean Explosion)
* Avoid components with dozens of boolean configuration props (\`isModal\`, \`hasIcon\`, \`isSlim\`, \`withBorder\`).
* Use **Compound Components** with explicit subcomponents.

### C. Native View Transitions
* Prefer the browser-native **View Transitions API** (\`document.startViewTransition\`) or Next.js view transitions over heavy 50KB page-transition router wrappers.

---

## 2. Web Vitals & Production Performance Guardrails

1. **LCP (<2.5s):** Preload hero images using \`next/image\` with \`priority\`. Reserve explicit aspect-ratio containers to prevent layout shifts (\`CLS < 0.1\`).
2. **Bundle Optimization:** Never import entire icon libraries. Import specific named icons or configure \`modularizeImports\` in \`next.config.js\`.
3. **Accessibility Baseline:** Form inputs must have visible associated labels. Color contrast must satisfy WCAG AA. Interactive elements must meet minimum 44×44px hit areas on touch viewports.

---

## 3. Specialist Escalation Router

* For **Next.js 14+ parallel routes, intercepting routes, and streaming server actions**: invoke \`nextjs-app-router-patterns\`.
* For **refactoring bloated components into scalable compound patterns**: invoke \`vercel-composition-patterns\`.
* For **production bundle profiling, code-splitting, and LCP optimization**: invoke \`vercel-react-best-practices\`.
* For **automated Vercel preview or production deployments via CLI**: invoke \`deploy-to-vercel\`.
`
  },

  "hub-mobile": {
    schemaVersion: "1.0.0",
    id: "hub-mobile",
    name: "Master Mobile, React Native & Expo Hub",
    version: "1.0.0",
    tier: "hub",
    category: "mobile",
    tokenEstimate: { cl100k_base: 3050, o200k_base: 2890 },
    triggers: [
      "hub-mobile",
      "/hub-mobile",
      "React Native",
      "Expo",
      "Expo Router",
      "mobile app",
      "Reanimated",
      "NativeWind",
      "iOS app",
      "Android app"
    ],
    synthesizes: [
      "expo-native-ui",
      "react-native-core",
      "react-native-expo",
      "react-native-ecosystem",
      "react-native-performance",
      "react-native-reusables",
      "react-native-testing",
      "write-swift"
    ],
    invariants: [
      "Never use standard ScrollView for unbounded data; mandate FlashList",
      "Offload all gestures to native UI thread via Reanimated v3 and Gesture Handler",
      "Memoize list render items (useCallback, React.memo) to eliminate frame drops",
      "Never hardcode status bar or home indicator margins; use useSafeAreaInsets()",
      "Pair significant interactions with subtle physical haptics"
    ],
    escalationMatrix: [
      { intent: "designing Apple HIG native iOS screens with native controls & SF Symbols", subSkillId: "expo-native-ui" },
      { intent: "troubleshooting FPS drops, bridge bottlenecks, and memory leaks", subSkillId: "react-native-performance" },
      { intent: "copy-paste shadcn-style component scaffolding with NativeWind v4", subSkillId: "react-native-reusables" },
      { intent: "native SwiftUI modules or Swift 6 concurrency bridge", subSkillId: "write-swift" }
    ],
    content: `---
name: hub-mobile
description: >
  Master Mobile, React Native & Expo Hub. Unified authority on Expo Router, Apple HIG native styling,
  60fps list performance, Reanimated gestures, NativeWind v4, and App Store releases.
  Synthesizes expo-native-ui, react-native-core, react-native-expo, react-native-ecosystem,
  react-native-performance, react-native-reusables, react-native-testing, and write-swift.
  Triggers on: "hub-mobile", "React Native", "Expo", "Expo Router", "mobile app",
  "Reanimated", "NativeWind", "iOS app", "Android app", or any mobile engineering task.
---

# Master Mobile Hub (\`hub-mobile\`)

Unified mobile engineering authority for React Native and Expo applications, delivering native Apple HIG feeling, uncompromised 60/120fps list performance, and robust native toolchain integration.

---

## 1. Native Mobile Architecture Standards

### A. Apple HIG Native Feeling in React Native
* **Native Semantic Colors & Materials:** Use platform semantic colors (\`PlatformColor\` on iOS) and translucent blur surfaces (\`expo-blur\`).
* **Haptics:** Pair significant interactions (pull-to-refresh snap, toggle flip, destructive confirm) with subtle physical haptics (\`expo-haptics\`).
* **Safe Area Insets:** Never hardcode status bar or home indicator margins. Always read from \`useSafeAreaInsets()\`.

### B. List Performance & Threading Invariants
* **Never use standard \`ScrollView\` for unbounded data.** Always use \`FlashList\` (\`@shopify/flash-list\`) or \`FlatList\` with \`getItemLayout\` and \`estimatedItemSize\`.
* **Offload Gestures to the UI Thread:** All animations and drag interactions must run on the native UI thread via **React Native Reanimated v3** and **Gesture Handler**. Never bridge gesture events across the JS bridge using standard \`Animated\` or \`useState\`.
* **Avoid Arrow Functions in List Renders:** Memoize \`renderItem\` and list components with \`useCallback\` / \`React.memo\` to eliminate frame drops during fast scrolling.

### C. Styling with NativeWind v4 & Primitives
* Use **NativeWind v4** or **React Native Reusables** for accessible, headless components matching web shadcn patterns while maintaining native platform primitives.

---

## 2. Platform Release & Store Pipeline

* **Assets:** Generate store-compliant 1024×1024 app icons with zero alpha channel for iOS App Store and adaptive icon layers for Android.
* **Testing:** Structure integration tests using React Native Testing Library (RNTL) querying by accessibility role and label rather than implementation test IDs.

---

## 3. Specialist Escalation Router

* For **designing Apple HIG native iOS screens with native controls & SF Symbols**: invoke \`expo-native-ui\`.
* For **troubleshooting FPS drops, bridge bottlenecks, and memory leaks**: invoke \`react-native-performance\`.
* For **copy-paste shadcn-style component scaffolding with NativeWind v4**: invoke \`react-native-reusables\`.
* For **native SwiftUI modules or Swift 6 concurrency bridge**: invoke \`write-swift\`.
`
  },

  "hub-video": {
    schemaVersion: "1.0.0",
    id: "hub-video",
    name: "Master Remotion & Programmatic Video Hub",
    version: "1.0.0",
    tier: "hub",
    category: "video",
    tokenEstimate: { cl100k_base: 2640, o200k_base: 2510 },
    triggers: [
      "hub-video",
      "/hub-video",
      "Remotion",
      "product video",
      "demo reel",
      "video promo",
      "animated captions",
      "render video"
    ],
    synthesizes: [
      "saas-product-demo-video",
      "promo-video",
      "remotion-best-practices",
      "remotion-captions",
      "remotion-maps",
      "remotion-markup",
      "remotion-render",
      "remotion-studio"
    ],
    invariants: [
      "Frame-Based Timing: Never use setTimeout or CSS transitions for video pacing",
      "All movement must be tied to useCurrentFrame() and useVideoConfig()",
      "Replace duration-based transitions with Remotion's native spring() helper",
      "Duck background volume by 70% during active spoken speech tracks",
      "Maintain 20-45s storyboard rhythm for SaaS product demo videos"
    ],
    escalationMatrix: [
      { intent: "producing 20–45s cinematic SaaS product marketing launch films", subSkillId: "saas-product-demo-video" },
      { intent: "complete promotional video setups with ElevenLabs AI voiceover and music", subSkillId: "promo-video" },
      { intent: "transcribing, styling, and word-by-word subtitle caption animations", subSkillId: "remotion-captions" },
      { intent: "animated map location flyovers and routes", subSkillId: "remotion-maps" }
    ],
    content: `---
name: hub-video
description: >
  Master Remotion & Programmatic Video Hub. Unified authority on creating professional promotional videos,
  SaaS product demo reels, animated captions, map flyovers, and programmatic video rendering.
  Synthesizes saas-product-demo-video, promo-video, remotion-best-practices, remotion-captions,
  remotion-maps, remotion-markup, remotion-render, and remotion-studio.
  Triggers on: "hub-video", "Remotion", "product video", "demo reel", "video promo",
  "animated captions", "render video", or any programmatic motion graphics task.
---

# Master Video Hub (\`hub-video\`)

Unified engineering authority for programmatic video generation and motion graphics in React using Remotion, delivering high-conversion product reels, launch videos, and animated tutorials.

---

## 1. Remotion Architecture Standards

### A. Core Composition Mechanics
* **Frame-Based Timing:** Never use \`setTimeout\` or CSS transitions for video pacing. All movement must be tied to \`useCurrentFrame()\` and \`useVideoConfig()\`.
* **Remotion Springs:** Replace duration-based transitions with Remotion's native \`spring()\` helper.
* **Aspect Ratio Standards:**
  * **Horizontal (Desktop / YouTube / Pitch Decks):** 1920×1080 (16:9).
  * **Vertical (TikTok / Reels / Shorts / LinkedIn Mobile):** 1080×1920 (9:16).

### B. Product Demo Storyboard Rhythm (20–45s Standard)
1. **The Hook (0–4s):** High-energy opening, bold statement, problem agitation, animated brand mark.
2. **The Product Reveal (4–12s):** Clean simulated UI frame, key value proposition, smooth camera pans.
3. **Core Workflow Walkthrough (12–30s):** Dynamic zooms into specific feature moments, automated subtitle captions, cursor clicks.
4. **Social Proof & Metrics (30–38s):** Animated statistic tickers, partner logo grids, customer quote cards.
5. **The Call-to-Action (38–45s):** URL, bold CTA button, closing brand sting.

---

## 2. Media Handling & Rendering

* **Audio Layering:** Combine AI-generated voiceovers with subtle background music. Duck background volume by 70% during active spoken speech tracks using \`interpolate()\`.
* **Rendering:** Use Remotion Studio (\`npx remotion preview\`) during local development; export via CLI (\`npx remotion render\`) or cloud renderers (\`@remotion/lambda\`).

---

## 3. Specialist Escalation Router

* For **producing 20–45s cinematic SaaS product marketing launch films**: invoke \`saas-product-demo-video\`.
* For **complete promotional video setups with ElevenLabs AI voiceover and music**: invoke \`promo-video\`.
* For **transcribing, styling, and word-by-word subtitle caption animations**: invoke \`remotion-captions\`.
* For **animated map location flyovers and routes**: invoke \`remotion-maps\`.
`
  },

  "hub-cloud": {
    schemaVersion: "1.0.0",
    id: "hub-cloud",
    name: "Master Cloud, DevOps & Infrastructure Hub",
    version: "1.0.0",
    tier: "hub",
    category: "cloud",
    tokenEstimate: { cl100k_base: 3180, o200k_base: 3010 },
    triggers: [
      "hub-cloud",
      "/hub-cloud",
      "DevOps",
      "CI/CD",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "AWS deploy",
      "GCP architecture",
      "Kubernetes"
    ],
    synthesizes: [
      "senior-devops",
      "infra-engineer",
      "github-actions",
      "github",
      "aws-deployment",
      "terraform-module-library",
      "platform-engineering"
    ],
    invariants: [
      "Multi-Stage Docker Builds separating build tools from production runtime",
      "Non-Root Execution: Never run production containers as root",
      "Persistent Build Caching: Wire buildx and cache volumes for sub-3m PR builds",
      "OIDC Cloud Auth: Never commit static cloud service account keys",
      "Dual-Enclave Isolation: Separate public compute from private database networks"
    ],
    escalationMatrix: [
      { intent: "comprehensive multi-cloud architecture, Kubernetes, and FinOps audits", subSkillId: "infra-engineer" },
      { intent: "GitHub CLI (gh) automation, branch rules, and PR stacking", subSkillId: "github" },
      { intent: "AWS CodePipeline V2, CodeBuild, and Blue/Green deployment setups", subSkillId: "aws-deployment" },
      { intent: "reusable Terraform module authoring across cloud providers", subSkillId: "terraform-module-library" }
    ],
    content: `---
name: hub-cloud
description: >
  Master Cloud, DevOps & Infrastructure Hub. Unified authority on CI/CD pipelines, Docker containerization,
  Terraform IaC, multi-cloud architectures (AWS/GCP/Cloudflare), and GitHub Actions automation.
  Synthesizes senior-devops, infra-engineer, github-actions, github, aws-deployment,
  terraform-module-library, and platform-engineering.
  Triggers on: "hub-cloud", "DevOps", "CI/CD", "Docker", "Terraform", "GitHub Actions",
  "AWS deploy", "GCP architecture", "Kubernetes", or any cloud infrastructure engineering task.
---

# Master Cloud & DevOps Hub (\`hub-cloud\`)

Unified infrastructure and DevOps engineering authority spanning multi-cloud platforms, container orchestration, automated GitHub Actions pipelines, and declarative Infrastructure as Code (IaC).

---

## 1. Production DevOps & Container Standards

### A. Docker Production Invariants
* **Multi-Stage Builds:** Always separate the builder stage from the runtime stage. Final production images must contain only compiled artifacts and production dependencies.
* **Non-Root Execution:** Never run production containers as \`root\`. Create and switch to a dedicated service user (e.g. \`USER node\` or \`USER nonroot\`).
* **Cache Layer Optimization:** Copy package manifests (\`package.json\`, \`pnpm-lock.yaml\`, \`requirements.txt\`) and install dependencies *before* copying source code to maximize Docker build layer caching.

### B. CI/CD Pipeline Architecture (GitHub Actions)
* **Persistent Build Caching:** Wire Docker \`cache-from\` / \`cache-to\` (type=gha or registry) and Next.js \`.next/cache\` to persistent cache actions to keep PR build times under 3 minutes.
* **OIDC Cloud Authentication:** Never commit static cloud service account keys. Use OpenID Connect (OIDC) to assume cloud roles dynamically in GitHub Actions workflows.
* **Fail-Fast Testing:** Run static type-checking (\`tsc\`), linting, and unit tests concurrently prior to container build and deployment stages.

### C. Declarative Infrastructure as Code (Terraform)
* Structure infrastructure in standardized, reusable modules with explicit input validations, sensitive output masking, and remote state locks (S3/DynamoDB or GCS).

---

## 2. Multi-Cloud Topology & Networking

* **Dual-Enclave Isolation:** Separate public ingress compute (Cloud Run, ECS, EKS) from private data vaults (Cloud SQL, RDS, VPC Peering) using private VPC connectors and Unix socket peering.
* **Secret Management:** Zero plaintext secrets in code or environment variables. Inject keys at runtime via Google Secret Manager or AWS Secrets Manager.

---

## 3. Specialist Escalation Router

* For **comprehensive multi-cloud architecture, Kubernetes, and FinOps audits**: invoke \`infra-engineer\`.
* For **GitHub CLI (\`gh\`) automation, branch rules, and PR stacking**: invoke \`github\`.
* For **AWS CodePipeline V2, CodeBuild, and Blue/Green deployment setups**: invoke \`aws-deployment\`.
* For **reusable Terraform module authoring across cloud providers**: invoke \`terraform-module-library\`.
`
  },

  "hub-backend": {
    schemaVersion: "1.0.0",
    id: "hub-backend",
    name: "Master Backend, Databases & System Design Hub",
    version: "1.0.0",
    tier: "hub",
    category: "backend",
    tokenEstimate: { cl100k_base: 2980, o200k_base: 2840 },
    triggers: [
      "hub-backend",
      "/hub-backend",
      "system design",
      "database schema",
      "PostgreSQL",
      "Supabase",
      "query optimization",
      "Redis cache",
      "distributed architecture"
    ],
    synthesizes: [
      "system-design",
      "supabase",
      "supabase-postgres-best-practices",
      "quantitative-research"
    ],
    invariants: [
      "Typed Enums over fragile string status columns in PostgreSQL",
      "Index all foreign keys and frequently filtered tenant columns",
      "Single-turn CTE optimization for analytical queries to hit RAM buffer cache",
      "Eliminate N+1 queries: eager load relational trees via batch lookups",
      "Transaction Hygiene: run speculative operations in nested SAVEPOINT blocks"
    ],
    escalationMatrix: [
      { intent: "large-scale distributed architecture, estimation, and trade-offs", subSkillId: "system-design" },
      { intent: "deep PostgreSQL indexing, EXPLAIN plan diagnosis, and RLS policies", subSkillId: "supabase-postgres-best-practices" },
      { intent: "full Supabase platform tasks (Auth, Realtime, Edge Functions)", subSkillId: "supabase" }
    ],
    content: `---
name: hub-backend
description: >
  Master Backend, Databases & System Design Hub. Unified authority on scalable distributed systems,
  PostgreSQL schema architecture, Supabase, query optimization, and high-concurrency caching.
  Synthesizes system-design, supabase, supabase-postgres-best-practices, and quantitative-research.
  Triggers on: "hub-backend", "system design", "database schema", "PostgreSQL",
  "Supabase", "query optimization", "Redis cache", "distributed architecture", or any backend database task.
---

# Master Backend & Database Hub (\`hub-backend\`)

Unified backend engineering authority for distributed system design, high-performance PostgreSQL schema optimization, Supabase platform patterns, and transaction safety.

---

## 1. Relational Database & PostgreSQL Standards

### A. Schema Architecture & Type Safety
* **Typed Enums over Raw Strings:** Replace fragile string columns (\`status = "active"\`) with native PostgreSQL typed enums (\`Role\`, \`AgentPriority\`, \`LoanStatus\`) to enforce data integrity at the database layer.
* **Index Discipline:** Index all foreign keys and frequently filtered columns (\`tenant_id\`, \`created_at\`, \`status\`). Use partial indexes for sparse conditions (\`WHERE deleted_at IS NULL\`).
* **Safe Migrations:** Never execute blocking locks in production migrations. Add columns as nullable first, backfill in batches, and apply constraints concurrently.

### B. Query Performance & Concurrency (Sub-Millisecond Targets)
* **Single-Turn CTE Optimization:** Restructure complex analytical multi-query joins into single-turn Common Table Expressions (\`WITH target_entity AS (...)\`) that hit in-memory RAM buffer caches.
* **Eliminate N+1 Queries:** Eagerly load relational trees via batch lookups or ORM \`include\` blocks. Never query the database inside a loop.
* **Transaction Hygiene:** Run speculative or risky operations inside nested \`SAVEPOINT\` sub-transactions. Roll back failures immediately to prevent connection pool exhaustion and database locks.

---

## 2. Distributed System Design & Caching Patterns

* **Two-Tier Caching:** Place an in-memory LRU cache in front of Redis cluster lookups, reducing cache hit latency to <2ms.
* **Idempotency & Queues:** Back asynchronous workers with distributed message queues (\`BullMQ\` + Redis). Ensure job handlers are strictly idempotent using deduplication keys.
* **Rate Limiting:** Protect APIs with distributed token-bucket rate limiters per tenant/user rather than simplistic IP-based counters.

---

## 3. Specialist Escalation Router

* For **large-scale distributed architecture, back-of-the-envelope estimation, and high-availability trade-offs**: invoke \`system-design\`.
* For **deep PostgreSQL indexing, EXPLAIN plan diagnosis, and RLS policy authoring**: invoke \`supabase-postgres-best-practices\`.
* For **full Supabase platform tasks (Auth, Realtime, Edge Functions, Storage)**: invoke \`supabase\`.
`
  }
};
