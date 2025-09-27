export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  expires?: number;
  secret?: boolean;
}

export interface Uploader {
  name: string;
  upload(filePath: string): Promise<UploadResult>;
}
