import { spawn } from "node:child_process";

process.env.PLAYWRIGHT_USE_STATIC = "1";
process.env.PORT = "3005";

const child = spawn("npx playwright test", {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
