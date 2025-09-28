import axios from "axios";
import * as fs from "fs";
import FormData from "form-data";
import { UploadResult } from "../types";
import { createApiHeaders } from "../utils/headers";
import { Platform, OS } from "../types";

export async function xeomsUpload(
  filePath: string,
  platform: Platform = "desktop",
  os: OS = "windows"
): Promise<UploadResult> {
  try {
    const form = new FormData();
    form.append("reqtype", "upload");
    form.append("filename", fs.createReadStream(filePath));

    const headers = {
      ...createApiHeaders({ platform, os, customClientName: "XEomsUploader" }),
      ...form.getHeaders(),
    };

    const res = await axios.post("https://cdn.rnzz.site/api", form, { headers });

    if (res.status === 200 && res.data.status) {
      if (res.data.filename) {
        return {
          success: true,
          url: res.data.url,
          filename: res.data.filename,
          size: res.data.size,
        };
      }
      if (res.data.files && Array.isArray(res.data.files)) {
        return {
          success: true,
          files: res.data.files.map((f: any) => ({
            filename: f.filename,
            url: f.url,
            size: f.size,
          })),
        };
      }
    }

    return { success: false, error: "Unexpected response." };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
