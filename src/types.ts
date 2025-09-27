export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface Uploader {
  name: string;
  upload(filePath: string): Promise<UploadResult>;
}
