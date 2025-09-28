import { v4 as uuidv4 } from 'uuid';
import { getUserAgent } from './getUserAgent';
import { Platform, OS, ApiHeaderOptions } from '../types';

export function createApiHeaders(options: ApiHeaderOptions = {}) {
  const {
    platform = 'desktop',
    os = 'windows',
    authToken,
    customClientName = "up-clouds"
  } = options;

  const headers: Record<string, string> = {
    'User-Agent': getUserAgent(platform, os),
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Request-ID': uuidv4()
  };

  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
  if (customClientName) headers['X-Custom-Client'] = customClientName;

  return headers;
}