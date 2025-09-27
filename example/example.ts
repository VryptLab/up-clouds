import * as fs from "fs";
import { catboxUpload, litterboxUpload, pomfUpload, zeroXUpload, getUploader } from "../src";

const DUMMY_FILE = "./dummy.txt";

function ensureDummyFile() {
  if (!fs.existsSync(DUMMY_FILE)) {
    fs.writeFileSync(DUMMY_FILE, "Hello from up-clouds dummy file!\n", "utf8");
    console.log("Dummy file created:", DUMMY_FILE);
  } else {
    console.log("Using existing dummy file:", DUMMY_FILE);
  }
}

async function directUsage() {
  console.log("=== Direct Upload Usage ===");
  const catboxResult = await catboxUpload(DUMMY_FILE);
  console.log("Catbox:", catboxResult);

  const litterboxResult = await litterboxUpload(DUMMY_FILE, "24h");
  console.log("Litterbox:", litterboxResult);
  
  const pmofResult = await pomfUpload(DUMMY_FILE);
  console.log("Pmof:", pmofResult);
  
  const zeroXResult = await zeroXUpload(DUMMY_FILE);
  console.log("ZeroX:", zeroXResult);
}

async function viaGetUploader() {
  console.log("=== Using getUploader ===");
  const uploader = getUploader("litterbox");
  if (!uploader) {
    console.error("Uploader service not found!");
    return;
  }
  const result = await uploader(DUMMY_FILE, "72h");
  console.log("Uploader Result:", result);
}

async function main() {
  ensureDummyFile();
  await directUsage();
  await viaGetUploader();

  if (fs.existsSync(DUMMY_FILE)) {
    fs.unlinkSync(DUMMY_FILE);
    console.log("Dummy file deleted:", DUMMY_FILE);
  }
}

main().catch((err) => {
  console.error("Error in example:", err);
});