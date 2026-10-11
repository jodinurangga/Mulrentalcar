import { execSync } from "node:child_process";
import fs from "node:fs";

console.log("=== COMPREHENSIVE SECRET SCAN (TRACKED + UNTRACKED) ===");

try {
  // Use ripgrep or git grep safely
  const output = execSync('git grep --untracked -i "bearer" || true', { encoding: "utf8" });
  const lines = output.split("\n").filter(Boolean);
  const matchedFiles = new Set();
  
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const file = line.substring(0, colonIdx);
    const content = line.substring(colonIdx + 1);
    if (/bearer\s+[A-Za-z0-9_\-\.]+/i.test(content) || /ctx7_sec_/i.test(content)) {
      matchedFiles.add(file);
    }
  }

  console.log("Files containing actual bearer / Context7 tokens:");
  for (const f of matchedFiles) {
    console.log(" - " + f);
  }
} catch (err) {
  console.error("Scan error:", err.message);
}
