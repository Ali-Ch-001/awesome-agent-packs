import test from "node:test";
import assert from "node:assert/strict";
import { estimateMarkdownTokens, calculateContextBudget } from "./tokenizer.js";

test("estimateMarkdownTokens handles empty and whitespace content", () => {
  assert.equal(estimateMarkdownTokens(""), 0);
  assert.equal(estimateMarkdownTokens("   \n\n  "), 0);
});

test("estimateMarkdownTokens computes reasonable estimates", () => {
  const sample = "This is a simple sentence with exactly eight words.";
  const tokens = estimateMarkdownTokens(sample);
  assert.ok(tokens > 0, "Tokens should be positive");
  assert.ok(tokens < 20, "Tokens should be reasonable for 8 words");
});

test("calculateContextBudget reports optimal status for small sets", () => {
  const skills = [
    { id: "skill-a", content: "Brief instructions for skill A.", tier: "skill" as const },
    { id: "hub-b", content: "Lightweight governance for hub B.", tier: "hub" as const },
  ];

  const report = calculateContextBudget(skills, 200_000);
  assert.equal(report.status, "optimal");
  assert.ok(report.totalTokens > 0);
  assert.equal(report.breakdown.length, 2);
});

test("calculateContextBudget triggers warning and critical levels appropriately", () => {
  const largeContent = "word ".repeat(25_000); // ~20k tokens
  const warningReport = calculateContextBudget(
    [{ id: "large-skill", content: largeContent, tier: "pack" as const }],
    200_000
  );
  assert.equal(warningReport.status, "warning");

  const massiveContent = "word ".repeat(45_000); // ~35k+ tokens
  const criticalReport = calculateContextBudget(
    [{ id: "massive-skill", content: massiveContent, tier: "pack" as const }],
    200_000
  );
  assert.equal(criticalReport.status, "critical");
});
