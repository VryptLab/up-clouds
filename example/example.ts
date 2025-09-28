import * as fs from "fs";
import path from "path";
import {
  catboxUpload,
  litterboxUpload,
  pomfUpload,
  zeroXUpload,
  getUploader,
} from "../src";
import { UploadResult } from "../src/types";

const DUMMY_FILE = path.resolve("./dummy.txt");

function ensureDummyFile() {
  if (!fs.existsSync(DUMMY_FILE)) {
    fs.writeFileSync(DUMMY_FILE, "Hello from up-clouds dummy file!\n", "utf8");
    console.log("Dummy file created:", DUMMY_FILE);
  } else {
    console.log("Using existing dummy file:", DUMMY_FILE);
  }
}

function cleanupDummyFile() {
  if (fs.existsSync(DUMMY_FILE)) {
    fs.unlinkSync(DUMMY_FILE);
    console.log("Dummy file deleted:", DUMMY_FILE);
  }
}

function parseArgs(): { testServices: string[] } {
  const argv = process.argv.slice(2);
  const testServices: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--test" && i + 1 < argv.length) {
      testServices.push(...argv[i + 1].split(",").map((s) => s.trim().toLowerCase()));
      i++;
    } else if (a.startsWith("--test=")) {
      const val = a.split("=")[1] || "";
      testServices.push(...val.split(",").map((s) => s.trim().toLowerCase()));
    } else if (a === "--help" || a === "-h") {
      console.log(`
Usage:
  node example.js
  node example.js --test catbox
  node example.js --test=catbox,litterbox
      `);
      process.exit(0);
    }
  }
  return { testServices };
}

const uploaderMap: Record<string, (filePath: string) => Promise<UploadResult>> = {
  catbox: (file) => catboxUpload(file),
  litterbox: (file) => litterboxUpload(file, "24h"),
  pomf: (file) => pomfUpload(file),
  zerox: (file) => zeroXUpload(file),
};

async function runUploader(name: string, fn: (file: string) => Promise<UploadResult>) {
  console.log(`--- Running uploader: ${name} ---`);
  try {
    const res = await fn(DUMMY_FILE);
    console.log(`${name} result:`, res);
  } catch (err: any) {
    console.error(`${name} error:`, err?.message ?? err);
  }
}

async function directUsage() {
  console.log("=== Direct Upload Usage ===");
  for (const [name, fn] of Object.entries(uploaderMap)) {
    await runUploader(name, fn);
  }
}

async function viaGetUploader() {
  console.log("=== Using getUploader ===");
  const uploaderName = "litterbox";
  const uploader = getUploader(uploaderName);
  if (!uploader) return console.error("Uploader service not found via getUploader!");
  try {
    const result = await (uploader as any)(DUMMY_FILE, "72h");
    console.log(`getUploader(${uploaderName}) result:`, result);
  } catch (err: any) {
    console.error("getUploader error:", err?.message ?? err);
  }
}

async function main() {
  const { testServices } = parseArgs();
  ensureDummyFile();
  if (testServices.length > 0) {
    for (const svc of testServices) {
      const fn = uploaderMap[svc.toLowerCase()];
      if (!fn) console.error(`Unknown uploader: '${svc}'`);
      else await runUploader(svc, fn);
    }
  } else {
    await directUsage();
    await viaGetUploader();
  }
  cleanupDummyFile();
}

main().catch((err) => {
  console.error("Error in example:", err);
  cleanupDummyFile();
  process.exit(1);
});