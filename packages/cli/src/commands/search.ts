import * as p from "@clack/prompts";
import picocolors from "picocolors";
import { searchRegistry } from "@agentpacks/registry";

export async function searchCommand(query?: string) {
  p.intro(picocolors.bgCyan(picocolors.black(" AgentPacks Registry Search ")));

  const q = query || "";
  const results = searchRegistry(q);

  if (results.length === 0) {
    p.note(`No skills or hubs matching "${q}".`);
    p.outro(picocolors.yellow("Search completed."));
    return;
  }

  console.log(`\nFound ${results.length} item(s) in verified registry:\n`);

  for (const item of results) {
    const badge =
      item.tier === "hub"
        ? picocolors.bgBlue(picocolors.black(" MASTER HUB "))
        : item.tier === "pack"
        ? picocolors.bgGreen(picocolors.black(" STRIKE TEAM "))
        : picocolors.bgWhite(picocolors.black(" SPECIALIST "));

    console.log(`  ${badge} ${picocolors.bold(picocolors.cyan(item.id))}`);
    console.log(`    ${item.name} (${picocolors.yellow("~" + item.tokenEstimate.cl100k_base.toLocaleString() + " tokens")})`);
    console.log(`    Trigger: ${picocolors.dim("/" + item.id)}\n`);
  }

  p.outro(picocolors.green(`Run ${picocolors.bold("npx agentpacks add <name>")} to install.`));
}
