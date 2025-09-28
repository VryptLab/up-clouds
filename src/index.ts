import { UploadResult } from "./types";
import { catboxUpload, litterboxUpload, pomfUpload, zeroXUpload, xeomsUpload } from "./providers";

export { UploadResult } from "./types";
export { catboxUpload, litterboxUpload, pomfUpload, zeroXUpload, xeomsUpload} from "./providers";

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
    case "xeoms":
      return xeomsUpload;
    default:
      return null;
  }
}

export function getAllProviders(): Record<string, (filePath: string, opts?: any) => Promise<UploadResult>> {
  return {
    catbox: catboxUpload,
    litterbox: litterboxUpload,
    pomf: pomfUpload,
    pomf2: pomfUpload,
    zerox: zeroXUpload,
    xeoms: xeomsUpload,
  };
}
