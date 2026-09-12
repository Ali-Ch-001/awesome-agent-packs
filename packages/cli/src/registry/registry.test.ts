import test from "node:test";
import assert from "node:assert/strict";
import {
  HUBS,
  PACKS,
  SKILLS,
  getRegistryItem,
  searchRegistry,
  CATALOG,
} from "./index.js";

test("Registry Catalog has expected counts", () => {
  assert.equal(Object.keys(HUBS).length, 8, "Expected exactly 8 Master Hubs");
  assert.equal(Object.keys(PACKS).length, 6, "Expected exactly 6 Strike Team Packs");
  assert.equal(Object.keys(SKILLS).length, 29, "Expected exactly 29 Specialist Skills");
  assert.equal(CATALOG.version, "1.0.0");
});

test("getRegistryItem resolves various identifier formats", () => {
  // Direct id
  const hubDesign = getRegistryItem("hub-design");
  assert.ok(hubDesign);
  assert.equal(hubDesign.id, "hub-design");
  assert.equal(hubDesign.tier, "hub");

  // Stripped name
  const design = getRegistryItem("design");
  assert.ok(design);
  assert.equal(design.id, "hub-design");

  // Slash trigger format
  const slashDesign = getRegistryItem("/hub-design");
  assert.ok(slashDesign);
  assert.equal(slashDesign.id, "hub-design");

  // Pack with prefix
  const packFluid = getRegistryItem("pack-apple-fluid");
  assert.ok(packFluid);
  assert.equal(packFluid.id, "pack-apple-fluid");
  assert.equal(packFluid.tier, "pack");

  // Pack without prefix
  const fluid = getRegistryItem("apple-fluid");
  assert.ok(fluid);
  assert.equal(fluid.id, "pack-apple-fluid");

  // Pack with slash
  const slashFluid = getRegistryItem("/apple-fluid");
  assert.ok(slashFluid);
  assert.equal(slashFluid.id, "pack-apple-fluid");

  // Skill
  const appleDesign = getRegistryItem("apple-design");
  assert.ok(appleDesign);
  assert.equal(appleDesign.tier, "skill");

  // Non-existent item returns null
  assert.equal(getRegistryItem("non-existent-pack-xyz"), null);
});

test("searchRegistry finds relevant items", () => {
  const emptyQueryResults = searchRegistry("");
  assert.equal(emptyQueryResults.length, 43, "Empty query should return all 43 catalog items");

  const motionResults = searchRegistry("motion");
  assert.ok(motionResults.length > 0);
  assert.ok(motionResults.some((item) => item.id.includes("motion")));

  const notFound = searchRegistry("completely-bogus-random-query-12345");
  assert.equal(notFound.length, 0);
});

test("Master Hubs conform to schema invariants", () => {
  for (const [id, hub] of Object.entries(HUBS)) {
    assert.equal(hub.tier, "hub", `${id} must be tier 'hub'`);
    assert.ok(hub.tokenEstimate.cl100k_base > 0, `${id} must have positive token estimate`);
    assert.ok(hub.tokenEstimate.cl100k_base <= 3500, `${id} must stay within ~3,500 token ceiling`);
    assert.ok(hub.invariants.length > 0, `${id} must have non-empty invariants`);
    assert.ok(hub.synthesizes.length > 0, `${id} must synthesize specialist skills`);
    assert.ok(hub.content.length > 50, `${id} must have meaningful prompt content`);
  }
});

test("Strike Team Packs conform to schema invariants", () => {
  for (const [id, pack] of Object.entries(PACKS)) {
    assert.equal(pack.tier, "pack", `${id} must be tier 'pack'`);
    assert.ok(pack.memberSkills.length >= 2, `${id} must unite at least 2 specialist skills`);
    assert.ok(pack.tokenEstimate.cl100k_base <= 15000, `${id} must stay within 15k token ceiling`);
    assert.ok(pack.content.length > 100, `${id} must have substantial prompt directive content`);
  }
});

test("Specialist Skills have real substantive content", () => {
  for (const [id, skill] of Object.entries(SKILLS)) {
    assert.equal(skill.tier, "skill", `${id} must be tier 'skill'`);
    assert.ok(skill.content.length > 500, `${id} must contain real comprehensive directives (>500 chars)`);
  }
});
