import { Uploader } from "./types";
import { CatboxUploader, LitterboxUploader } from "./providers";

export { Uploader } from "./types";
export { CatboxUploader, LitterboxUploader } from "./providers";

export function getUploader(service: string): Uploader | null {
  switch (service.toLowerCase()) {
    case "catbox":
      return new CatboxUploader();
    case "litterbox":
      return new LitterboxUploader();
    default:
      return null;
  }
}
