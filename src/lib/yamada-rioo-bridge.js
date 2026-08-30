import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url, { strict: false });

// Compatibility bridge: fitur port Yamada wajib berjalan di atas core Yamada.
import { getDatabase } from "./yamada-database.js";
import { f as httpRequest } from "./yamada-http.js";
import { fetchJson, randomInt, md5 } from "./yamada-utils.js";
import { sendText } from "./yamada-message.js";
import { yamadaApiManager } from "./yamada-apimanager.js";
import config from "../../config.js";

export { getDatabase, httpRequest, fetchJson, randomInt, md5, sendText, yamadaApiManager, config };

export async function riooJson(url, options = {}) {
  const { method = "GET", headers = {}, body = null, timeout } = options;
  if (timeout) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: controller.signal,
      });
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }
  return fetchJson(url, options.fetchOptions || {});
}
