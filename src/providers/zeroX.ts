import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { UploadResult } from "../types";

const MAX_SIZE = 512 * 1024 * 1024;
const MIN_EXPIRE_HOURS = 24 * 30;
const MAX_EXPIRE_HOURS = 24 * 365;

export async function zeroXUpload(
  filePath: string,
  opts?: { expires?: number; secret?: boolean }
): Promise<UploadResult> {
  try {
    const stats = fs.statSync(filePath);
    if (stats.size > MAX_SIZE) {
      return { success: false, error: "File too large (max 512 MiB)" };
    }
    if (opts?.expires) {
      if (opts.expires < MIN_EXPIRE_HOURS || opts.expires > MAX_EXPIRE_HOURS) {
        return { success: false, error: "Expires must be between 720h (30 days) and 8760h (1 year)" };
      }
    }

    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    if (opts?.expires) form.append("expires", String(opts.expires));
    if (opts?.secret) form.append("secret", "");

    const res = await axios.post("https://0x0.st", form, {
      headers: {
        ...form.getHeaders(),
        "User-Agent": "User Agent: Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1"
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      validateStatus: () => true,
    });

    const body = (res.data || "").trim();
    if (res.status === 200 && body.startsWith("http")) {
      return { success: true, url: body };
    } else {
      return { success: false, error: `HTTP ${res.status}: ${body}` };
    }
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
