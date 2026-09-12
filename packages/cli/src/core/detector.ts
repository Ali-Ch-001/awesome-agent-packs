import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import type { AgentPlatform } from "../types.js";

export function detectInstalledPlatforms(projectRoot: string = process.cwd()): AgentPlatform[] {
  const home = os.homedir();

  const platforms: AgentPlatform[] = [
    {
      id: "claude",
      name: "Claude Code",
      globalSkillsDir: path.join(home, ".claude", "skills"),
      projectRulesDir: path.join(projectRoot, ".claude", "skills"),
      configPath: path.join(home, ".claude", "CLAUDE.md"),
      isDetected: fs.existsSync(path.join(home, ".claude")),
    },
    {
      id: "opencode",
      name: "OpenCode CLI",
      globalSkillsDir: path.join(home, ".config", "opencode", "skills"),
      projectRulesDir: path.join(projectRoot, ".opencode", "skills"),
      configPath: path.join(home, ".config", "opencode"),
      isDetected: fs.existsSync(path.join(home, ".config", "opencode")),
    },
    {
      id: "agents-shared",
      name: "Agent Skills Standard (~/.agents/skills)",
      globalSkillsDir: path.join(home, ".agents", "skills"),
      projectRulesDir: path.join(projectRoot, ".agents", "skills"),
      isDetected: fs.existsSync(path.join(home, ".agents")),
    },
    {
      id: "cursor",
      name: "Cursor AI",
      globalSkillsDir: path.join(home, ".cursor", "rules"),
      projectRulesDir: path.join(projectRoot, ".cursor", "rules"),
      configPath: path.join(projectRoot, ".cursorrules"),
      isDetected: fs.existsSync(path.join(projectRoot, ".cursor")) || fs.existsSync(path.join(projectRoot, ".cursorrules")),
    },
    {
      id: "windsurf",
      name: "Windsurf",
      globalSkillsDir: path.join(home, ".codeium", "windsurf"),
      projectRulesDir: path.join(projectRoot, ".windsurfrules"),
      isDetected: fs.existsSync(path.join(projectRoot, ".windsurfrules")),
    },
  ];

  return platforms;
}
