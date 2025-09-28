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

export interface ApiHeaderOptions {
  platform?: Platform;
  os?: OS;
  authToken?: string;
  customClientName?: string;
}

export type Platform = 'desktop' | 'mobile' | 'tablet';
export type OS = 'windows' | 'macos' | 'linux' | 'android' | 'ios';

export const userAgents: Record<Platform, Partial<Record<OS, string[]>>> = {
  desktop: {
    windows: [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.118 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:119.0) Gecko/20100101 Firefox/119.0",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/118.0.2088.61 Safari/537.36"
    ],
    macos: [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.118 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6; rv:119.0) Gecko/20100101 Firefox/119.0"
    ],
    linux: [
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.118 Safari/537.36",
      "Mozilla/5.0 (X11; Linux x86_64; rv:119.0) Gecko/20100101 Firefox/119.0"
    ]
  },
  mobile: {
    android: [
      "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.118 Mobile Safari/537.36",
      "Mozilla/5.0 (Linux; Android 13; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.118 Mobile Safari/537.36",
      "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/119.0 Mobile"
    ],
    ios: [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/118.0.5993.118 Mobile/15E148 Safari/604.1",
      "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
    ]
  },
  tablet: {
    android: [
      "Mozilla/5.0 (Linux; Android 13; SM-T720) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.118 Safari/537.36",
      "Mozilla/5.0 (Linux; Android 13; Lenovo TB-X606F) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/119.0"
    ],
    ios: [
      "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
    ]
  }
};