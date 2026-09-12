import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import {
  updateClaudeMd,
  removeClaudeMdEntry,
  updateWindsurfrules,
  removeWindsurfEntry,
  projectSkillToPlatform,
  unprojectSkillFromPlatform,
} from "./transpiler.js";
import { getRegistryItem } from "../registry/index.js";

const tmpDir = path.join(os.tmpdir(), "agentpacks-transpiler-test-" + Date.now());

test.before(() => {
  fs.mkdirSync(tmpDir, { recursive: true });
});

test.after(() => {
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
});

test("updateClaudeMd writes accurate global tilde path and dual triggers", () => {
  const claudeMdPath = path.join(tmpDir, "GLOBAL_CLAUDE.md");
  const item = getRegistryItem("apple-fluid");
  assert.ok(item);

  updateClaudeMd(claudeMdPath, item, true);

  const content = fs.readFileSync(claudeMdPath, "utf-8");
  assert.ok(content.includes("~/.claude/skills/<id>/SKILL.md"), "Global CLAUDE.md must reference ~/.claude/skills path");
  assert.ok(content.includes("`/pack-apple-fluid`"), "Should contain full pack trigger");
  assert.ok(content.includes("`/apple-fluid`"), "Should contain short alias trigger");
});

test("updateClaudeMd writes project relative path when not global", () => {
  const claudeMdPath = path.join(tmpDir, "LOCAL_CLAUDE.md");
  const item = getRegistryItem("hub-design");
  assert.ok(item);

  updateClaudeMd(claudeMdPath, item, false);

  const content = fs.readFileSync(claudeMdPath, "utf-8");
  assert.ok(content.includes(".claude/skills/<id>/SKILL.md"), "Project CLAUDE.md should reference local .claude path");
  assert.ok(content.includes("`/hub-design`"), "Should contain hub trigger");
  assert.ok(content.includes("`/design`"), "Should contain short trigger");
});

test("removeClaudeMdEntry cleanly prunes table row and block", () => {
  const claudeMdPath = path.join(tmpDir, "PRUNE_CLAUDE.md");
  const item = getRegistryItem("apple-fluid");
  assert.ok(item);

  updateClaudeMd(claudeMdPath, item, true);
  assert.ok(fs.readFileSync(claudeMdPath, "utf-8").includes("pack-apple-fluid"));

  const removed = removeClaudeMdEntry(claudeMdPath, "apple-fluid");
  assert.equal(removed, true);

  const afterPrune = fs.readFileSync(claudeMdPath, "utf-8");
  assert.ok(!afterPrune.includes("pack-apple-fluid"));
  assert.ok(!afterPrune.includes("<!-- AGENTPACKS:START -->"));
});

test("Cursor projection strips existing frontmatter to avoid double frontmatter", async () => {
  const projectRoot = path.join(tmpDir, "cursor-project");
  fs.mkdirSync(projectRoot, { recursive: true });

  const item = getRegistryItem("apple-design");
  assert.ok(item);
  assert.ok(item.content.startsWith("---"), "Item content starts with its own frontmatter");

  const platform = {
    id: "cursor",
    name: "Cursor AI",
    globalSkillsDir: path.join(tmpDir, "cursor-global"),
    projectRulesDir: path.join(projectRoot, ".cursor", "rules"),
    isDetected: true,
  };

  const result = await projectSkillToPlatform(item, tmpDir, platform, false, projectRoot);
  assert.equal(result.status, "created");

  const mdcContent = fs.readFileSync(result.targetPath, "utf-8");
  // Count how many '---' delimiters exist (should be exactly 2 for 1 frontmatter block)
  const dashesMatches = mdcContent.match(/^---$/gm);
  assert.equal(dashesMatches?.length, 2, "Must contain exactly 1 YAML frontmatter block (2 delimiters)");

  // Clean up
  const unproject = await unprojectSkillFromPlatform("apple-design", platform, false, projectRoot);
  assert.equal(unproject.removed, true);
  assert.ok(!fs.existsSync(result.targetPath));
});

test("Windsurf rule projection inserts and strips delimited blocks", () => {
  const rulesPath = path.join(tmpDir, ".windsurfrules");
  const item = getRegistryItem("hub-motion");
  assert.ok(item);

  updateWindsurfrules(rulesPath, item);
  const content = fs.readFileSync(rulesPath, "utf-8");
  assert.ok(content.includes("# --- AGENTPACKS:hub-motion:START ---"));
  assert.ok(content.includes("# --- AGENTPACKS:hub-motion:END ---"));

  const removed = removeWindsurfEntry(rulesPath, "hub-motion");
  assert.equal(removed, true);
  assert.equal(fs.readFileSync(rulesPath, "utf-8").trim(), "");
});
