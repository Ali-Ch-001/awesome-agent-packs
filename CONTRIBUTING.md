# Contributing to AgentPacks

Thank you for contributing to AgentPacks! We are building the universal standard for AI agent intelligence distribution and conflict-free prompt engineering.

---

## Architecture Principles

Every submission to AgentPacks must adhere to our **Tiered Hybrid Architecture**:

1. **Master Hubs (`/hub-*`):**
   - Must stay under **3,200 tokens**.
   - Provide broad governance and decision trees across a domain.
   - Reconcile contradictory rules among sub-skills.
   - Include an explicit **Specialist Escalation Router**.

2. **Workflow Strike Teams (`/pack-*`):**
   - Must stay under **15,000 tokens**.
   - Coordinate 3–4 specialist skills into a cohesive, non-repetitive sprint protocol.
   - Solve a concrete developer deliverable (e.g. Awwwards landing page, fluid drawer, production CI/CD).

3. **Specialist Skills:**
   - Deep, focused directives with concrete code patterns and explicit invariants.

---

## Submitting a New Skill or Pack

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feature/pack-awesome-workflow
   ```

2. Add your manifest and content:
   - For Hubs: `packages/cli/src/registry/data/hubs.ts`
   - For Packs: `packages/cli/src/registry/data/packs.ts`
   - For Skills: `packages/cli/src/registry/data/skills.ts`

3. Verify type-checking and build:
   ```bash
   pnpm install
   pnpm build
   ```

4. Test locally using the CLI:
   ```bash
   node packages/cli/bin/run.js search <your-pack-name>
   node packages/cli/bin/run.js add --dry-run <your-pack-name>
   ```

5. Submit a Pull Request with:
   - Motivation and target use cases
   - Estimated token footprint
   - List of reconciled or potential rule conflicts

---

## Code of Conduct

Be welcoming, constructive, and respectful. We are here to make AI development faster, cleaner, and more reliable for everyone.
