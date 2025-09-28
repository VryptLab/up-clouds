import axios from "axios";
import * as fs from "fs";
import FormData from "form-data";
import { UploadResult } from "../types";
import { createApiHeaders } from "../utils/headers";
import { Platform, OS } from "../types";

export async function catboxUpload(
  filePath: string,
  platform: Platform = "desktop",
  os: OS = "windows"
): Promise<UploadResult> {
  try {
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", fs.createReadStream(filePath));

    const headers = {
      ...createApiHeaders({ platform, os, customClientName: "CatboxUploader" }),
      ...form.getHeaders(),
    };

    const res = await axios.post("https://catbox.moe/user/api.php", form, {
      headers,
    });

    if (res.status === 200 && typeof res.data === "string") {
      return { success: true, url: res.data.trim() };
    }

    return { success: false, error: "Unexpected response" };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}