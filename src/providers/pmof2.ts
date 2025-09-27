import fs from "fs";
import FormData from "form-data";
import { UploadResult } from "../types";

export async function pomfUpload(filePath: string): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("files[]", fs.createReadStream(filePath));

    form.submit("https://pomf2.lain.la/upload.php", (err, res) => {
      if (err) return resolve({ success: false, error: err.message });

      let body = "";
      res.setEncoding("utf8");
      res.on("data", chunk => (body += chunk));
      res.on("end", () => {
        try {
          const data = JSON.parse(body);
          if (Array.isArray(data.files)) {
            resolve({ success: true, url: data.files[0].url });
          } else {
            resolve({ success: false, error: "Unexpected response" });
          }
        } catch (e: any) {
          resolve({ success: false, error: e.message });
        }
      });
    });
  });
}
