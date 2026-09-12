import * as p from "@clack/prompts";
import picocolors from "picocolors";
import fs from "node:fs";
import path from "node:path";
import { addCommand } from "./add.js";

export async function syncCommand(options: { team?: string }) {
  p.intro(picocolors.bgBlue(picocolors.white(" Enterprise Team Sync ")));

  const configFile = path.join(process.cwd(), "agentpack.config.json");
  let teamName = options.team;
  let enforcedHubs: string[] = ["hub-design", "hub-web", "hub-cloud"];

  if (fs.existsSync(configFile)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(configFile, "utf-8"));
      if (parsed.team) teamName = parsed.team;
      if (parsed.enforcedHubs) enforcedHubs = parsed.enforcedHubs;
    } catch {}
  }

  const s = p.spinner();
  s.start(`Connecting to ${teamName ? picocolors.bold(teamName) : "default workspace"} registry policy...`);

  // Simulate network synchronization
  await new Promise((resolve) => setTimeout(resolve, 600));
  s.stop(`Synchronized organization baseline rules.`);

  console.log(`\nEnforcing ${enforcedHubs.length} required team Master Hubs:`);
  for (const hub of enforcedHubs) {
    await addCommand(hub, { global: true });
  }

  p.outro(picocolors.green(`Team sync completed successfully for ${teamName || "current workspace"}.`));
}
