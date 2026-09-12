import test from "node:test";
import assert from "node:assert/strict";
import { lintActiveSkills, KNOWN_CONFLICT_MATRIX } from "./linter.js";

test("KNOWN_CONFLICT_MATRIX has non-empty rules", () => {
  assert.ok(KNOWN_CONFLICT_MATRIX.length >= 4);
  for (const edge of KNOWN_CONFLICT_MATRIX) {
    assert.ok(edge.skillA);
    assert.ok(edge.skillB);
    assert.ok(edge.topic);
    assert.ok(edge.reason);
    assert.ok(edge.recommendation);
  }
});

test("lintActiveSkills detects known conflict pairs", () => {
  const result = lintActiveSkills(["minimalist-ui", "high-end-visual-design"]);
  assert.equal(result.conflicts.length, 1);
  assert.equal(result.conflicts[0].skillA, "minimalist-ui");
  assert.equal(result.conflicts[0].skillB, "high-end-visual-design");
  assert.ok(result.suggestedHubs.includes("hub-design"));
});

test("lintActiveSkills returns zero conflicts for compatible skills", () => {
  const result = lintActiveSkills(["hub-design", "hub-motion", "hub-cloud"]);
  assert.equal(result.conflicts.length, 0);
  assert.equal(result.suggestedHubs.length, 0);
});

test("lintActiveSkills handles prefixed names cleanly", () => {
  const result = lintActiveSkills(["pack-minimalist-ui", "pack-high-end-visual-design"]);
  assert.equal(result.conflicts.length, 1);
});
