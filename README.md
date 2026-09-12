# AgentPacks ⚡️
### The Universal Package Manager for Pre-Harmonized AI Agent Skills & MCP Servers

[![npm version](https://img.shields.io/npm/v/agent-packs.svg?style=flat-square&color=black)](https://www.npmjs.com/package/agent-packs)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?style=flat-square)](https://discord.gg/agentpacks)
[![Twitter Follow](https://img.shields.io/twitter/follow/agentpacks?style=social)](https://x.com/agentpacks)

> **"Homebrew / npm, but for Claude Code, OpenCode, Cursor, and Windsurf."**  
> Install battle-tested, conflict-free domain intelligence with a single zero-dependency command.

```bash
npx agent-packs add apple-fluid
```

---

```
       ___                    __     ____             __        
      /   | ____ ____  ____  / /_   / __ \____ ______/ /_______ 
     / /| |/ __ `/ _ \/ __ \/ __/  / /_/ / __ `/ ___/ //_/ ___/ 
    / ___ / /_/ /  __/ / / / /_   / ____/ /_/ / /__/ ,< (__  )  
   /_/  |_\__, /\___/_/ /_/\__/  /_/    \__,_/\___/_/|_/____/   
         /____/                                                 
   The Universal Package Manager for Pre-Harmonized Agent Skills
```

---

## ⚡ The Problem: Skill Fragmentation & Prompt Pollution

Today, managing AI agent skills feels like downloading `.zip` files from forums in 2002:
* 📁 **Manual Folder Wrangling:** You copy-paste unvetted markdown files into `~/.claude/skills`, `~/.config/opencode/skills`, or `.cursor/rules`.
* 💥 **Directive Clashing:** One skill tells the agent *"Use subtle borders and no shadows"*, while another says *"Double-bezel cards with ambient halos"*. The model produces broken, generic CSS.
* 💸 **Context Window Burn:** Loading dozens of raw uncoordinated skills burns **50,000–170,000+ tokens before you even type your first prompt**. Your context window fills up, and the agent hallucinates.

```
Without AgentPacks (177,000+ Tokens / 88% Window Burned on System Prompt):
[██████████████████████████████████████████████░░░░░] 88.8% CONTEXT BURN 💥

With AgentPacks Tiered Hybrid Architecture (2,800 Tokens / 1.4% Window):
[█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]  1.4% CONTEXT COST ⚡️
```

---

## 💎 The Solution: Tiered Hybrid Architecture

AgentPacks organizes intelligence into **8 Master Domain Hubs** and **6 Workflow Strike Teams**:

| Command | Category | Active Capabilities Loaded | Context Cost |
| :--- | :--- | :--- | :--- |
| `npx agent-packs add hub-design` | **Master UI/UX** | Apple HIG + Concentric Radii + Anti-Slop Palette + Tabular Numerals | **~2,800 Tok** |
| `npx agent-packs add hub-motion` | **Physics Motion** | Critically Damped Springs + Sub-300ms Durations + Framer / GSAP | **~2,900 Tok** |
| `npx agent-packs add hub-web` | **Next.js & React** | App Router + RSC Leaf Boundaries + Waterfall-Free Fetching | **~2,750 Tok** |
| `npx agent-packs add hub-mobile` | **React Native & Expo** | FlashList 120fps + Reanimated UI Worklets + Apple HIG Primitives | **~3,050 Tok** |
| `npx agent-packs add apple-fluid` | **Strike Team** | Touch-down feedback (`scale(0.97)`) + Drag Sheets + Spring Physics | **~12,410 Tok**|
| `npx agent-packs add landing-page` | **Strike Team** | Awwwards Bento Grids + Concentric Double-Bezels + Layout Variance | **~13,800 Tok**|
| `npx agent-packs add cloud-deploy` | **Strike Team** | Multi-Stage Rootless Docker + Sub-3m GitHub Actions + Terraform | **~14,100 Tok**|
| `npx agent-packs add nextjs-perf` | **Strike Team** | RSC Streaming + Bundle Optimization + Compound Components | **~13,200 Tok**|

---

## 🚀 30-Second Quickstart

### 1. Install Curated Workflow Strike Teams
```bash
# Add Apple-grade fluid touch interfaces
npx agent-packs add apple-fluid

# Add Awwwards-tier landing page design engineering
npx agent-packs add landing-page

# Add high-performance Next.js 15 & React 19 architecture
npx agent-packs add nextjs-perf

# Add cloud DevOps & CI/CD deployment automation
npx agent-packs add cloud-deploy
```

### 2. Auto-Detect Multi-Platform Setup
AgentPacks automatically inspects your machine and creates atomic symlinks for your tools:
* 🤖 **Claude Code** (`~/.claude/skills/`)
* ⚡ **OpenCode** (`~/.config/opencode/skills/`)
* 🛠 **Agent Standard** (`~/.agents/skills/`)
* 🎯 **Cursor** (`.cursor/rules/`)
* 🌊 **Windsurf** (`.windsurfrules`)
* 💻 **Aider** (`.aider.conf.yml`)

### 3. Check for Prompt Inconsistencies
```bash
npx agent-packs lint
```
```text
✔ Scanned 14 active skills across 3 agent environments.
▲ Found 1 Active Directive Conflict:
  • minimalist-ui ⚡ high-end-visual-design
    Domain: Surfaces & Shadows
    Issue:  minimalist-ui bans ambient shadows, whereas high-end-visual-design enforces double-bezel glow.
    Fix:    Load '/hub-design' to dynamically pick surface styles per product context.

💡 Tip: Run npx agent-packs lint --fix to automatically install harmonizing hubs.
```

### 4. Inspect Token Budget Heatmap
```bash
npx agent-packs budget
```
```text
┌──────────────────────────────────────┬──────────────┬───────────────┐
│ Active Skill / Hub                  │ Tokens (Est) │ Context Share │
├──────────────────────────────────────┼──────────────┼───────────────┤
│ hub-design                           │        2,840 │          1.4% │
│ pack-apple-fluid                     │       12,410 │          6.2% │
├──────────────────────────────────────┼──────────────┼───────────────┤
│ TOTAL SYSTEM PROMPT FOOTPRINT        │       15,250 │   7.6% [SAFE] │
└──────────────────────────────────────┴──────────────┴───────────────┘
✔ Healthy Context Budget: Less than 10% of window consumed by system instructions.
```

---

## 🛠 Catalog: The 8 Master Hubs

<details>
<summary><b>1. /hub-design (UI/UX, Visual Craft & System Design)</b></summary>

Unified design architecture synthesizing the collective craft of Apple Human Interface Guidelines, Emil Kowalski design engineering, and anti-slop frontend principles.
* **Concentric Border Radius:** Outer Radius = Inner Radius + Padding ($R_{outer} = R_{inner} + padding$).
* **Tactile Press Feedback:** Every interactive button deflects on pointer-down: `active:scale-[0.97]` with `transition: transform 120ms ease-out`. Never wait for click-up.
* **Tabular Numbers:** Always apply `tabular-nums` (`font-variant-numeric: tabular-nums`) to counters, financial metrics, and rates.
* **Anti-Slop Color Discipline:** Never use generic AI purple/blue glowing buttons. Restrict accents to 1 primary brand color (saturation < 80%).
* **Escalates to:** `apple-design`, `design-taste-frontend`, `high-end-visual-design`, `redesign-existing-projects`.
</details>

<details>
<summary><b>2. /hub-motion (Physics, Springs & Animation)</b></summary>

Precision animation rules for web and mobile interfaces.
* **Critical Damping:** Damping ratio $\zeta = 1.0$ (`bounce: 0, duration: 0.35s`) for zero jitter UI interactions.
* **Sub-300ms Rule:** Routine UI transitions (menus, buttons, selects) must stay under 250ms.
* **Hardware Acceleration:** Animate strictly `transform` and `opacity`. Never animate layout properties (`width`, `height`, `top`, `left`).
* **Escalates to:** `spring-physics`, `framer-motion`, `gsap`, `ftb-gsap-scrolltrigger`.
</details>

<details>
<summary><b>3. /hub-3d (Three.js, WebGL & Shaders)</b></summary>

Real-time 3D web graphics with strict performance and memory controls.
* **Technology Decision Tree:** Cobe (5KB canvas globe) vs CSS 3D (0KB) vs Three.js (150KB) vs R3F (250KB).
* **Context Disposal:** Mandates recursive geometry, texture, and WebGL buffer disposal on unmount.
* **DPR Clamping:** Clamps Device Pixel Ratio at $1.5–2.0$ to prevent mobile GPU thermal throttling.
* **Escalates to:** `threejs`, `ftb-react-three-fiber`, `cobejs`, `build-threejs-scroll-worlds`.
</details>

<details>
<summary><b>4. /hub-web (Next.js 14/15, React 19 & Vercel)</b></summary>

Zero-waterfall full-stack React architecture.
* **Server Components by Default:** Push `'use client'` down exclusively to interactive leaf nodes.
* **Zero Waterfalls:** Concurrent data streaming via `Promise.all()` and isolated `<Suspense>` boundaries.
* **Compound Component Architecture:** Ban boolean prop explosion (`isModal`, `hasIcon`) in favor of composable subcomponents.
* **Escalates to:** `nextjs-app-router-patterns`, `vercel-composition-patterns`, `vercel-react-best-practices`.
</details>

<details>
<summary><b>5. /hub-mobile (React Native & Expo Ecosystem)</b></summary>

60fps/120fps production mobile engineering.
* **Virtualization:** Mandates Shopify FlashList with `estimatedItemSize` over unbounded `ScrollView`.
* **UI Thread Isolation:** Pure Reanimated v3 worklets without JS bridge crossing.
* **Apple HIG Materials:** Platform semantic colors and translucent blur materials (`PlatformColor`, `expo-blur`).
* **Escalates to:** `expo-native-ui`, `react-native-performance`, `react-native-reusables`.
</details>

<details>
<summary><b>6. /hub-video (Remotion & Programmatic Video)</b></summary>

Automated 20–45s product reels and dynamic marketing video rendering.
* **Frame-Based Timing:** Never use `setTimeout` or CSS transitions. Pacing tied strictly to `useCurrentFrame()`.
* **Remotion Springs:** Native `spring({ frame, fps, config })` synchronization.
* **Audio Ducking:** Automated background music volume ducking (-70%) during active speech intervals.
* **Escalates to:** `saas-product-demo-video`, `promo-video`, `remotion-best-practices`.
</details>

<details>
<summary><b>7. /hub-cloud (DevOps, CI/CD & Multi-Cloud)</b></summary>

Hardened infrastructure and automated pipelines.
* **Container Security:** Multi-stage rootless Docker builds with non-root service users (`USER node`).
* **Sub-3min CI Builds:** Layer caching with Docker buildx and GitHub Actions cache.
* **OIDC Authentication:** Dynamic IAM role assumption without static cloud credentials.
* **Escalates to:** `senior-devops`, `infra-engineer`, `github-actions`, `terraform-module-library`.
</details>

<details>
<summary><b>8. /hub-backend (Databases & Distributed Systems)</b></summary>

PostgreSQL optimization, distributed caching, and transactional safety.
* **Typed Enums:** Replace fragile string columns with native PostgreSQL enums (`Role`, `Status`).
* **Query Latency:** Single-turn CTE query optimization hitting in-memory RAM buffer caches.
* **Transaction Hygiene:** Run speculative operations in nested `SAVEPOINT` sub-transactions.
* **Escalates to:** `system-design`, `supabase`, `supabase-postgres-best-practices`.
</details>

---

## 🏢 Enterprise Team Registries

Keep your engineering team's AI coding rules, internal APIs, and design tokens synchronized across all developer laptops:

```bash
# Sync company design tokens, internal APIs, and coding guidelines
npx agent-packs sync --team=mycompany
```

### Team Configuration (`agentpack.config.json`):
```json
{
  "$schema": "https://agentpacks.dev/schema/v1/config.json",
  "team": "acme-corp",
  "enforcedHubs": [
    "hub-design",
    "hub-web",
    "hub-cloud"
  ],
  "tokenBudgetCap": 16000,
  "prohibitedSkills": [
    "minimalist-ui"
  ]
}
```

---

## 🤝 Contributing

We welcome community skill contributions! See our [Contributing Guide](CONTRIBUTING.md) to submit skills to the verified registry.

```bash
# Clone the repository
git clone https://github.com/Ali-Ch-001/awesome-agent-packs.git

# Install dependencies and build
pnpm install
pnpm build

# Run CLI locally
node packages/cli/bin/run.js --help
```

---

## License

MIT © Ali Mohsin and AgentPacks Contributors.
