import { Command } from "commander";
import picocolors from "picocolors";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { removeCommand } from "./commands/remove.js";
import { listCommand } from "./commands/list.js";
import { lintCommand } from "./commands/lint.js";
import { budgetCommand } from "./commands/budget.js";
import { syncCommand } from "./commands/sync.js";
import { doctorCommand } from "./commands/doctor.js";
import { searchCommand } from "./commands/search.js";

const program = new Command();

program
  .name("awesome-agent-packs")
  .description("Universal AI Agent Skills Package Manager & Distribution Engine")
  .version("1.0.1");

program
  .command("init")
  .description("Initialize agentpack.config.json and lockfile in the current repository")
  .action(initCommand);

program
  .command("add")
  .description("Install curated packs, master hubs, or specialist skills across detected agent platforms")
  .argument("<packName>", "Name of pack, hub, or skill (e.g., apple-fluid, landing-page, hub-design)")
  .option("-t, --target <targets...>", "Explicit targets (claude, opencode, cursor, windsurf)")
  .option("-g, --global", "Install globally across user agent directories (default: true)", true)
  .option("--no-global", "Install locally into current workspace rules directory")
  .option("--dry-run", "Preview file links and token impact without modifying filesystem")
  .action(addCommand);

program
  .command("remove")
  .alias("rm")
  .description("Remove an installed skill or pack from all agent platforms")
  .argument("<skillName>", "Name of skill or pack to remove")
  .option("-g, --global", "Remove from global directories (default: true)", true)
  .option("--no-global", "Remove from local project directory")
  .action(removeCommand);

program
  .command("list")
  .alias("ls")
  .description("List installed agent skills, active hubs, and current token footprint")
  .option("-v, --verbose", "Display full paths and escalation metadata")
  .option("--json", "Output machine-readable JSON for CI integration")
  .action(listCommand);

program
  .command("lint")
  .description("Detect conflicting agent directives, clashing design philosophies, and styling contradictions")
  .option("--fix", "Automatically resolve conflicts by installing harmonizing Master Hubs")
  .action(lintCommand);

program
  .command("budget")
  .description("Profile context window token burn across active LLM context windows")
  .option("-m, --model <modelName>", "Target LLM: claude-3-5-sonnet, gpt-4o, gemini-1-5-pro", "claude-3-5-sonnet")
  .action(budgetCommand);

program
  .command("search")
  .description("Search through verified Master Hubs, Strike Team Packs, and Specialist Skills")
  .argument("[query]", "Search term")
  .action(searchCommand);

program
  .command("sync")
  .description("Sync skills with an enterprise team repository or organization baseline")
  .option("--team <teamSlug>", "Organization slug")
  .action(syncCommand);

program
  .command("doctor")
  .description("Validate agent environment directories, symlinks, and write permissions")
  .option("--fix", "Automatically prune broken symlinks in agent directories")
  .action(doctorCommand);

program.parse(process.argv);
