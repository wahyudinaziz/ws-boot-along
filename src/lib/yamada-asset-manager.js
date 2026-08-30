import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { logger } from './yamada-logger.js';
import config from '../../config.js';

// Memory cache for both local and remote assets.
const assetCache = Object.create(null);
const remoteCache = new Map();

function isRemoteUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value);
}

async function fetchRemoteBuffer(url, timeout = 30000) {
  if (!isRemoteUrl(url)) return null;
  if (remoteCache.has(url)) return remoteCache.get(url);

  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout,
    maxContentLength: 50 * 1024 * 1024,
    maxBodyLength: 50 * 1024 * 1024,
    headers: { 'User-Agent': 'Mozilla/5.0 Yamada-MD AssetLoader' },
  });

  const buffer = Buffer.from(response.data);
  remoteCache.set(url, buffer);
  return buffer;
}

function resolveFilePath(targetPath) {
  if (!targetPath || typeof targetPath !== 'string') return null;
  const fullPath = path.resolve(process.cwd(), targetPath);
  if (fs.existsSync(fullPath)) return fullPath;

  const parsed = path.parse(fullPath);
  const extensions = ['.jpeg', '.jpg', '.png', '.webp', '.mp4', '.mp3', '.ttf'];
  for (const ext of extensions) {
    if (ext === parsed.ext.toLowerCase()) continue;
    const testPath = path.join(parsed.dir, parsed.name + ext);
    if (fs.existsSync(testPath)) return testPath;
  }
  return null;
}

function getPrimaryImageFallback() {
  const candidates = [
    './assets/images/yamada2.jpeg',
    './assets/image/yamada-landscape.jpg',
    './assets/image/yamada-games.jpeg',
    './assets/image/pp-kosong.jpg',
  ];
  for (const c of candidates) {
    const full = resolveFilePath(c);
    if (full) {
      try {
        return fs.readFileSync(full);
      } catch {}
    }
  }
  return null;
}

/**
 * Preload all configured single-file assets into memory. Remote URLs are fetched
 * once at startup so existing synchronous consumers can keep receiving Buffers.
 */
export async function preloadAssets(configAssets) {
  if (!configAssets) return;

  const entries = Object.entries(configAssets);
  for (const [key, value] of entries) {
    try {
      if (typeof value === 'string' && isRemoteUrl(value)) {
        const buffer = await fetchRemoteBuffer(value);
        if (buffer) {
          assetCache[key] = buffer;
          logger.system('CACHE', `Loaded remote: ${key}`);
        }
        continue;
      }

      if (typeof value === 'string') {
        const resolved = resolveFilePath(value);
        if (resolved) {
          assetCache[key] = fs.readFileSync(resolved);
          logger.system('CACHE', `Loaded: ${key}`);
        } else {
          logger.warn('CACHE', `File not found: ${value}`);
        }
      }
    } catch (e) {
      logger.error('CACHE', `Failed to load ${key}: ${e.message}`);
    }
  }
}

/**
 * Get the cached asset buffer by key. Local assets are loaded synchronously;
 * remote assets are expected to have been preloaded by preloadAssets().
 */
export function getAssetBuffer(key, configAssets = null) {
  if (!key) return getPrimaryImageFallback();
  if (assetCache[key]) return assetCache[key];

  const assets = configAssets || config?.assets;
  const value = assets?.[key];
  if (isRemoteUrl(value)) {
    // A remote asset must be preloaded because this API is synchronous.
    return assetCache[key] || null;
  }

  if (typeof value === 'string') {
    try {
      const resolved = resolveFilePath(value);
      if (resolved) {
        const buf = fs.readFileSync(resolved);
        assetCache[key] = buf;
        return buf;
      }
    } catch (e) {
      console.error(`  ✖  ERR   Failed to read ${key} from disk:`, e.message);
    }
  }

  // If key is a direct path
  if (typeof key === 'string' && (key.startsWith('.') || key.startsWith('/') || key.includes('/') || key.includes('\\'))) {
    try {
      const resolved = resolveFilePath(key);
      if (resolved) {
        const buf = fs.readFileSync(resolved);
        assetCache[key] = buf;
        return buf;
      }
    } catch {}
  }

  // Fallback for image keys if specific asset not found
  if (typeof key === 'string' && (key.startsWith('yamada') || key.includes('image') || key.includes('thumb'))) {
    const fallbackBuf = getPrimaryImageFallback();
    if (fallbackBuf) {
      assetCache[key] = fallbackBuf;
      return fallbackBuf;
    }
  }

  return null;
}

/** Fetch an arbitrary asset URL with an in-memory cache. */
export async function getRemoteAssetBuffer(url) {
  return fetchRemoteBuffer(url);
}

/** Return a random shuffle image as a Buffer. */
export async function getRandomShuffleAssetBuffer(urls = config?.assets?.shuffleUrls) {
  if (!Array.isArray(urls) || urls.length === 0) return null;
  const url = urls[Math.floor(Math.random() * urls.length)];
  try {
    return await fetchRemoteBuffer(url);
  } catch (e) {
    logger.warn('SHUFFLE', `Failed to fetch remote shuffle image: ${e.message}`);
    return null;
  }
}

/**
 * Update an asset buffer in memory and optionally save it to disk.
 */
export function updateAssetAndSave(key, buffer, filepath) {
  assetCache[key] = buffer;
  if (filepath && !isRemoteUrl(filepath)) {
    try {
      const fullPath = path.resolve(process.cwd(), filepath);
      fs.writeFileSync(fullPath, buffer);
    } catch (e) {
      console.error(`  ✖  ERR   Failed to write updated asset ${key} to disk:`, e.message);
    }
  }
}
