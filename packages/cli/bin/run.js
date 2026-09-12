#!/usr/bin/env node

import("../dist/index.js").catch((err) => {
  console.error("AgentPacks Error:", err);
  process.exit(1);
});
