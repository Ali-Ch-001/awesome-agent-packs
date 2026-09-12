import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import {
  readLockfile,
  updateLockfile,
  removeLockfileEntry,
  computeSha256,
} from "./lockfile.js";
import { getRegistryItem } from "../registry/index.js";

const tmpDir = path.join(os.tmpdir(), "agentpacks-lockfile-test-" + Date.now());

test.before(() => {
  fs.mkdirSync(tmpDir, { recursive: true });
});

test.after(() => {
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
});

test("computeSha256 produces deterministic hex hash", () => {
  const hash1 = computeSha256("hello world");
  const hash2 = computeSha256("hello world");
  assert.equal(hash1, hash2);
  assert.equal(hash1.length, 64);
});

test("updateLockfile writes and updates lockfile entries", () => {
  const item = getRegistryItem("apple-fluid");
  assert.ok(item);

  const lockfile = updateLockfile(tmpDir, item, ["claude", "cursor"]);
  assert.equal(lockfile.lockfileVersion, 1);
  assert.ok(lockfile.installed["pack-apple-fluid"]);
  assert.equal(lockfile.installed["pack-apple-fluid"].type, "pack");
  assert.deepEqual(lockfile.installed["pack-apple-fluid"].projectedPlatforms, ["claude", "cursor"]);

  const onDisk = readLockfile(tmpDir);
  assert.ok(onDisk.installed["pack-apple-fluid"]);
});

test("removeLockfileEntry cleanly prunes lockfile entries", () => {
  const removed = removeLockfileEntry(tmpDir, "apple-fluid");
  assert.equal(removed, true);

  const lockfilePath = path.join(tmpDir, "agentpack.lock.json");
  assert.ok(!fs.existsSync(lockfilePath), "Lockfile should be unlinked when no packages remain");
});
