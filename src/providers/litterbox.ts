import axios from "axios";
import * as fs from "fs";
import FormData from "form-data";
import { Uploader, UploadResult } from "../types";

export class LitterboxUploader implements Uploader {
  name = "litterbox";

  async upload(filePath: string): Promise<UploadResult> {
    try {
      const form = new FormData();
      form.append("reqtype", "fileupload");
      form.append("time", "72h"); // default expiry
      form.append("fileToUpload", fs.createReadStream(filePath));

      const res = await axios.post("https://litterbox.catbox.moe/resources/internals/api.php", form, {
        headers: form.getHeaders(),
      });

      if (res.status === 200 && typeof res.data === "string") {
        return { success: true, url: res.data.trim() };
      }
      return { success: false, error: "Unexpected response" };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
}
