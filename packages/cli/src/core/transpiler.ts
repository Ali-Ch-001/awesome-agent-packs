import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import picocolors from "picocolors";
import type { AgentPlatform, LinkResult } from "../types.js";
import type { RegistryItem } from "../registry/index.js";

const CLAUDE_BLOCK_START = "<!-- AGENTPACKS:START -->";
const CLAUDE_BLOCK_END = "<!-- AGENTPACKS:END -->";

export async function projectSkillToPlatform(
  item: RegistryItem,
  sourceSkillDir: string,
  platform: AgentPlatform,
  isGlobal: boolean,
  projectRoot: string = process.cwd()
): Promise<LinkResult> {
  const skillId = item.id;
  const platformId = platform.id;
  const platformName = platform.name;

  try {
    if (platformId === "claude") {
      // 1. Link skill folder in global or project skills dir
      const targetSkillsDir = isGlobal ? platform.globalSkillsDir : (platform.projectRulesDir || platform.globalSkillsDir);
      if (!fs.existsSync(targetSkillsDir)) {
        fs.mkdirSync(targetSkillsDir, { recursive: true });
      }
      const destPath = path.join(targetSkillsDir, skillId);
      setupDirectorySymlink(sourceSkillDir, destPath, skillId);

      // 2. Reconcile CLAUDE.md table
      const claudeMdPath = isGlobal
        ? path.join(os.homedir(), ".claude", "CLAUDE.md")
        : path.join(projectRoot, "CLAUDE.md");

      updateClaudeMd(claudeMdPath, item, isGlobal);

      return {
        platformId,
        platformName,
        targetPath: destPath,
        status: "created",
      };
    }

    if (platformId === "cursor") {
      // Cursor AI only parses .cursor/rules/*.mdc in the project root
      const cursorRulesDir = path.join(projectRoot, ".cursor", "rules");
      if (!fs.existsSync(cursorRulesDir)) {
        fs.mkdirSync(cursorRulesDir, { recursive: true });
      }

      const mdcPath = path.join(cursorRulesDir, `${skillId}.mdc`);
      // Strip any existing YAML frontmatter from item.content to prevent corrupting Cursor's parser
      const cleanContent = item.content.replace(/^---[\s\S]*?---\s*/, "").trim();

      const frontmatter = [
        "---",
        `description: "${item.name.replace(/"/g, '\\"')}"`,
        "globs: **/*.{ts,tsx,js,jsx,swift,py,css,html,json,md}",
        "alwaysApply: false",
        "---",
        "",
        `# ${item.name}`,
        "",
        cleanContent,
      ].join("\n");

      fs.writeFileSync(mdcPath, frontmatter, "utf-8");

      return {
        platformId,
        platformName,
        targetPath: mdcPath,
        status: "created",
      };
    }

    if (platformId === "windsurf") {
      // Windsurf uses a single .windsurfrules file in project root
      const windsurfRulesPath = path.join(projectRoot, ".windsurfrules");
      updateWindsurfrules(windsurfRulesPath, item);

      return {
        platformId,
        platformName,
        targetPath: windsurfRulesPath,
        status: "created",
      };
    }

    // Standard directory symlink platforms (opencode, agents-shared)
    const targetDir = isGlobal ? platform.globalSkillsDir : (platform.projectRulesDir || platform.globalSkillsDir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const destPath = path.join(targetDir, skillId);
    const linkStatus = setupDirectorySymlink(sourceSkillDir, destPath, skillId);

    return {
      platformId,
      platformName,
      targetPath: destPath,
      status: linkStatus,
    };
  } catch (err: any) {
    return {
      platformId,
      platformName,
      targetPath: platform.globalSkillsDir,
      status: "failed",
      error: err.message,
    };
  }
}

export async function unprojectSkillFromPlatform(
  skillId: string,
  platform: AgentPlatform,
  isGlobal: boolean,
  projectRoot: string = process.cwd()
): Promise<{ removed: boolean; path?: string }> {
  try {
    if (platform.id === "claude") {
      const targetDir = isGlobal ? platform.globalSkillsDir : (platform.projectRulesDir || platform.globalSkillsDir);
      const skillPath = path.join(targetDir, skillId);
      let removedDir = false;

      if (fs.existsSync(skillPath)) {
        removeSymlinkOrDir(skillPath);
        removedDir = true;
      }

      const claudeMdPath = isGlobal
        ? path.join(os.homedir(), ".claude", "CLAUDE.md")
        : path.join(projectRoot, "CLAUDE.md");

      const removedTable = removeClaudeMdEntry(claudeMdPath, skillId);
      if (removedDir || removedTable) {
        return { removed: true, path: skillPath };
      }
      return { removed: false };
    }

    if (platform.id === "cursor") {
      const mdcPath = path.join(projectRoot, ".cursor", "rules", `${skillId}.mdc`);
      if (fs.existsSync(mdcPath)) {
        fs.unlinkSync(mdcPath);
        return { removed: true, path: mdcPath };
      }
      return { removed: false };
    }

    if (platform.id === "windsurf") {
      const windsurfRulesPath = path.join(projectRoot, ".windsurfrules");
      if (fs.existsSync(windsurfRulesPath)) {
        const didRemove = removeWindsurfEntry(windsurfRulesPath, skillId);
        if (didRemove) {
          return { removed: true, path: windsurfRulesPath };
        }
      }
      return { removed: false };
    }

    const targetDir = isGlobal ? platform.globalSkillsDir : (platform.projectRulesDir || platform.globalSkillsDir);
    const skillPath = path.join(targetDir, skillId);
    if (fs.existsSync(skillPath)) {
      removeSymlinkOrDir(skillPath);
      return { removed: true, path: skillPath };
    }

    return { removed: false };
  } catch {
    return { removed: false };
  }
}

function setupDirectorySymlink(sourceDir: string, destPath: string, skillId: string): "created" | "already_linked" {
  if (fs.existsSync(destPath)) {
    const lstat = fs.lstatSync(destPath);
    if (lstat.isSymbolicLink()) {
      try {
        const currentTarget = fs.readlinkSync(destPath);
        if (currentTarget === sourceDir) {
          return "already_linked";
        }
        fs.unlinkSync(destPath);
      } catch {
        fs.unlinkSync(destPath);
      }
    } else {
      const backupDir = path.join(os.homedir(), ".agentpacks", "backups");
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      const backupPath = path.join(backupDir, `${skillId}.backup-${Date.now()}`);
      fs.renameSync(destPath, backupPath);
      console.log(picocolors.yellow(`  [Notice] Backed up existing non-symlink skill to ${backupPath}`));
    }
  }

  const symlinkType = os.platform() === "win32" ? "junction" : "dir";
  fs.symlinkSync(sourceDir, destPath, symlinkType);
  return "created";
}

function removeSymlinkOrDir(targetPath: string) {
  const lstat = fs.lstatSync(targetPath);
  if (lstat.isSymbolicLink()) {
    fs.unlinkSync(targetPath);
  } else {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

export function updateClaudeMd(claudeMdPath: string, item: RegistryItem, isGlobal: boolean = true) {
  let content = "";
  if (fs.existsSync(claudeMdPath)) {
    content = fs.readFileSync(claudeMdPath, "utf-8");
  } else {
    const parent = path.dirname(claudeMdPath);
    if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
  }

  // Format triggers with short and full names (e.g. `/pack-apple-fluid`, `/apple-fluid`)
  const shortId = item.id.replace(/^(pack-|hub-)/, "");
  const triggerList = shortId !== item.id
    ? [`/${item.id}`, `/${shortId}`]
    : [`/${item.id}`];
  const triggersCol = triggerList.map((t) => `\`${t}\``).join(", ");

  const row = `| ${triggersCol} | ${item.tier.toUpperCase()} | **${item.name}** | ${item.invariants.slice(0, 2).join("; ")} |`;
  const skillsPathRef = isGlobal ? "~/.claude/skills/<id>/SKILL.md" : ".claude/skills/<id>/SKILL.md";

  const headerLines = [
    "## Active AgentPacks Directives",
    `When the user invokes triggers below or works on related tasks, adhere strictly to the rules in \`${skillsPathRef}\`:`,
    "",
    "| Trigger | Tier | Skill / Pack | Key Invariants |",
    "| :--- | :--- | :--- | :--- |",
  ];

  if (!content.includes(CLAUDE_BLOCK_START)) {
    const block = [
      "",
      CLAUDE_BLOCK_START,
      ...headerLines,
      row,
      CLAUDE_BLOCK_END,
      "",
    ].join("\n");
    fs.writeFileSync(claudeMdPath, (content.trim() + "\n" + block).trim() + "\n", "utf-8");
  } else {
    const startIndex = content.indexOf(CLAUDE_BLOCK_START);
    const endIndex = content.indexOf(CLAUDE_BLOCK_END);
    if (startIndex !== -1 && endIndex !== -1) {
      const before = content.slice(0, startIndex);
      const blockContent = content.slice(startIndex + CLAUDE_BLOCK_START.length, endIndex);
      const after = content.slice(endIndex + CLAUDE_BLOCK_END.length);

      const lines = blockContent
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.startsWith("| `") && !l.includes(`\`/${item.id}\``) && !l.includes(`\`/${shortId}\``));

      const allRows = [...lines, row];

      const updatedBlock = [
        CLAUDE_BLOCK_START,
        ...headerLines,
        ...allRows,
        CLAUDE_BLOCK_END,
      ].join("\n");

      fs.writeFileSync(claudeMdPath, (before.trimEnd() + "\n\n" + updatedBlock + "\n\n" + after.trimStart()).trim() + "\n", "utf-8");
    }
  }
}

export function removeClaudeMdEntry(claudeMdPath: string, skillId: string): boolean {
  if (!fs.existsSync(claudeMdPath)) return false;
  const content = fs.readFileSync(claudeMdPath, "utf-8");
  if (!content.includes(CLAUDE_BLOCK_START)) return false;

  const startIndex = content.indexOf(CLAUDE_BLOCK_START);
  const endIndex = content.indexOf(CLAUDE_BLOCK_END);
  if (startIndex === -1 || endIndex === -1) return false;

  const before = content.slice(0, startIndex);
  const blockContent = content.slice(startIndex + CLAUDE_BLOCK_START.length, endIndex);
  const after = content.slice(endIndex + CLAUDE_BLOCK_END.length);

  const lines = blockContent.split("\n");
  const shortId = skillId.replace(/^(pack-|hub-)/, "");
  const hadEntry = lines.some((l) => l.includes(`\`/${skillId}\``) || l.includes(`\`/${shortId}\``));
  if (!hadEntry) return false;

  const filteredLines = lines.filter((l) => !l.includes(`\`/${skillId}\``) && !l.includes(`\`/${shortId}\``));
  const remainingRows = filteredLines.filter((l) => l.startsWith("| `"));

  if (remainingRows.length === 0) {
    // No more skills in CLAUDE.md block, clean up block completely
    const remainingContent = (before.trimEnd() + "\n\n" + after.trimStart()).trim();
    fs.writeFileSync(claudeMdPath, remainingContent ? remainingContent + "\n" : "", "utf-8");
  } else {
    const skillsPathRef = claudeMdPath.includes(os.homedir()) ? "~/.claude/skills/<id>/SKILL.md" : ".claude/skills/<id>/SKILL.md";
    const headerLines = [
      "## Active AgentPacks Directives",
      `When the user invokes triggers below or works on related tasks, adhere strictly to the rules in \`${skillsPathRef}\`:`,
      "",
      "| Trigger | Tier | Skill / Pack | Key Invariants |",
      "| :--- | :--- | :--- | :--- |",
    ];

    const updatedBlock = [
      CLAUDE_BLOCK_START,
      ...headerLines,
      ...remainingRows,
      CLAUDE_BLOCK_END,
    ].join("\n");
    fs.writeFileSync(claudeMdPath, (before.trimEnd() + "\n\n" + updatedBlock + "\n\n" + after.trimStart()).trim() + "\n", "utf-8");
  }
  return true;
}

export function updateWindsurfrules(rulesPath: string, item: RegistryItem) {
  let content = "";
  if (fs.existsSync(rulesPath)) {
    content = fs.readFileSync(rulesPath, "utf-8");
  }

  const startMarker = `# --- AGENTPACKS:${item.id}:START ---`;
  const endMarker = `# --- AGENTPACKS:${item.id}:END ---`;

  const ruleBody = [
    startMarker,
    `# Directive: ${item.name} (${item.tier.toUpperCase()})`,
    ...item.invariants.map((inv) => `- ${inv}`),
    endMarker,
  ].join("\n");

  if (content.includes(startMarker)) {
    const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, "g");
    content = content.replace(regex, ruleBody);
  } else {
    content = (content.trim() + "\n\n" + ruleBody).trim() + "\n";
  }

  fs.writeFileSync(rulesPath, content, "utf-8");
}

export function removeWindsurfEntry(rulesPath: string, skillId: string): boolean {
  if (!fs.existsSync(rulesPath)) return false;
  let content = fs.readFileSync(rulesPath, "utf-8");
  const startMarker = `# --- AGENTPACKS:${skillId}:START ---`;
  const endMarker = `# --- AGENTPACKS:${skillId}:END ---`;

  if (content.includes(startMarker)) {
    const regex = new RegExp(`\\n?${startMarker}[\\s\\S]*?${endMarker}\\n?`, "g");
    content = content.replace(regex, "\n").trim();
    fs.writeFileSync(rulesPath, content ? content + "\n" : "", "utf-8");
    return true;
  }
  return false;
}
