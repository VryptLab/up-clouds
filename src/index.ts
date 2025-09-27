import { UploadResult } from "./types";
import { catboxUpload, litterboxUpload, pomfUpload, zeroXUpload } from "./providers";

export { UploadResult } from "./types";
export { catboxUpload, litterboxUpload, pomfUpload, zeroXUpload } from "./providers";

export function getUploader(
  service: string
): ((filePath: string, opts?: any) => Promise<UploadResult>) | null {
  switch (service.toLowerCase()) {
    case "catbox":
      return catboxUpload;
    case "litterbox":
      return litterboxUpload;
    case "pomf":
    case "pomf2":
      return pomfUpload;
    case "zerox":
      return zeroXUpload;
    default:
      return null;
  }
}