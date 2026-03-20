#!/usr/bin/env node
// Usage: node scripts/finalize-source.js <source-id>
//
// Scans sources/<id>/ for downloaded files, computes SHA256 hashes,
// updates the entry in index.json with the files array and status: "done".

import { createHash } from "crypto";
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

const REPO_ROOT = new URL("..", import.meta.url).pathname;

const FILETYPES = {
  ".pdf": "pdf",
  ".html": "html",
  ".md": "md",
  ".txt": "txt",
};

function sha256(filePath) {
  const data = readFileSync(filePath);
  return createHash("sha256").update(data).digest("hex");
}

function main() {
  const id = process.argv[2];
  if (!id) {
    console.error("Usage: node scripts/finalize-source.js <source-id>");
    process.exit(1);
  }

  const sourceDir = join(REPO_ROOT, "sources", id);
  const indexPath = join(REPO_ROOT, "index.json");

  // Read index.json
  const index = JSON.parse(readFileSync(indexPath, "utf8"));
  const entry = index.sources.find((s) => s.id === id);
  if (!entry) {
    console.error(`No entry found in index.json for id: ${id}`);
    process.exit(1);
  }

  // Scan source directory for files
  let dirEntries;
  try {
    dirEntries = readdirSync(sourceDir);
  } catch {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const files = [];
  for (const filename of dirEntries.sort()) {
    const filePath = join(sourceDir, filename);
    if (!statSync(filePath).isFile()) continue;
    const ext = extname(filename).toLowerCase();
    const filetype = FILETYPES[ext];
    if (!filetype) continue; // skip unknown extensions

    const relativePath = `sources/${id}/${filename}`;
    const hash = sha256(filePath);
    files.push({ path: relativePath, filetype, sha256: hash });
    console.log(`  ${relativePath} (${filetype}) ${hash}`);
  }

  if (files.length === 0) {
    console.error(`No recognized files found in ${sourceDir}`);
    process.exit(1);
  }

  // Update entry
  entry.files = files;
  entry.status = "done";

  // Write index.json
  writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n", "utf8");
  console.log(`Updated index.json: ${id} → done (${files.length} file(s))`);
}

main();
