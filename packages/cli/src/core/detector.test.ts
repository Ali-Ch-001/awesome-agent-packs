import test from "node:test";
import assert from "node:assert/strict";
import { detectInstalledPlatforms } from "./detector.js";

test("detectInstalledPlatforms returns known agent platform targets", () => {
  const platforms = detectInstalledPlatforms();
  assert.ok(platforms.length >= 5);

  const ids = platforms.map((p) => p.id);
  assert.ok(ids.includes("claude"));
  assert.ok(ids.includes("opencode"));
  assert.ok(ids.includes("agents-shared"));
  assert.ok(ids.includes("cursor"));
  assert.ok(ids.includes("windsurf"));

  for (const pl of platforms) {
    assert.ok(pl.name);
    assert.ok(pl.globalSkillsDir);
    assert.equal(typeof pl.isDetected, "boolean");
  }
});
