import { Platform, OS, userAgents } from '../types';

export function getUserAgent(platform: Platform, os: OS): string {
  const list = userAgents[platform]?.[os];
  if (!list || list.length === 0) {
    throw new Error(`User-agent untuk ${platform} ${os} tidak ditemukan`);
  }
  return list[Math.floor(Math.random() * list.length)];
}