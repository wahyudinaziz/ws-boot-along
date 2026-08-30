import { YAMADA_CORE_CONFIG } from "../../yamada.js";
import fs from "fs";
import path from "path";
import config from "../../config.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import axios from "axios";
import { getAssetBuffer } from "./yamada-asset-manager.js";

let gameThumbBuffer = null;
let rpgThumbBuffer = null;
let winnerThumbBuffer = null;

const keys = [
  ["yamada-games", (buf) => { gameThumbBuffer = buf; }],
  ["yamada-rpg", (buf) => { rpgThumbBuffer = buf; }],
  ["yamada-winner", (buf) => { winnerThumbBuffer = buf; }],
];
for (const [key, setter] of keys) {
  const buf = getAssetBuffer(key);
  if (buf) setter(buf);
}

const FAST_ANSWER_PRAISES = [
  "⚡ Kilat banget! Kamu jenius!",
  "🚀 Super cepat! Otak encer!",
  "🔥 Wuih monster! Jawab secepat kilat!",
  "💫 Luar biasa! Kamu the flash!",
  "🎯 Precision tinggi! Langsung tepat!",
  "⭐ Bintang! Refleks dewa!",
  "🏆 Legend! Kecepatan maximal!",
  "💎 Premium player! Gak ada lawan!",
  "🦅 Tajam seperti elang!",
  "🧠 Big brain! IQ tinggi detected!",
];

const FAST_ANSWER_THRESHOLD = 4000;
const FAST_ANSWER_BONUS = {
  exp: 50,
  balance: 500,
  limit: 1,
};

function getRandomPraise() {
  return FAST_ANSWER_PRAISES[
    Math.floor(Math.random() * FAST_ANSWER_PRAISES.length)
  ];
}

function _saluranCtx() {
  const saluranId = YAMADA_CORE_CONFIG.saluran?.id || "120363400911374213@newsletter";
  const saluranName = YAMADA_CORE_CONFIG.saluran?.name || YAMADA_CORE_CONFIG.bot?.name || "yamada-ai";
  return {
    forwardingScore: 9,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: saluranId,
      newsletterName: saluranName,
      serverMessageId: 127,
    },
  };
}

function getGameContextInfo() {
  return _saluranCtx();
}

function getWinnerContextInfo() {
  return _saluranCtx();
}

function getRpgContextInfo(title, body) {
  const base = _saluranCtx();
  if (title || body) {
    base.externalAdReply = {
      title: title || YAMADA_CORE_CONFIG.bot?.name || "Yamada RPG",
      body: body || "",
      sourceUrl: YAMADA_CORE_CONFIG.saluran?.link || "",
      mediaType: 1,
      renderLargerThumbnail: false,
      thumbnail: rpgThumbBuffer || getAssetBuffer("yamada-rpg") || getAssetBuffer("yamada"),
    };
  }
  return base;
}

async function sendGamePreview(sock, jid, text, title, body, options) {
  const thumb = gameThumbBuffer || getAssetBuffer("yamada-games") || getAssetBuffer("yamada");
  const website = config.info?.website || YAMADA_CORE_CONFIG.info?.website || "https://whatsapp.com";
  const msgId = await sock.sendPreview(
    jid,
    {
      caption: `${website} ${text}`,
      url: `${website}`,
      title: title || "🎮 Yamada GAMES",
      description: body || "Have fun playing!",
      jpegThumbnail: thumb,
      previewType: 0,
    },
    { contextInfo: _saluranCtx(), ...options },
  );
  return { key: { id: msgId, remoteJid: jid, fromMe: true } };
}

async function sendWinnerPreview(sock, jid, text, title, body, options) {
  const thumb = winnerThumbBuffer || gameThumbBuffer || getAssetBuffer("yamada-winner") || getAssetBuffer("yamada");
  const website = config.info?.website || YAMADA_CORE_CONFIG.info?.website || "https://whatsapp.com";
  const msgId = await sock.sendPreview(
    jid,
    {
      caption: `${website} ${text}`,
      url: `${website}`,
      title: title || "🏆 WINNER!",
      description: body || "Selamat kamu menang!",
      jpegThumbnail: thumb,
      previewType: 0,
    },
    { contextInfo: _saluranCtx(), ...options },
  );
  return { key: { id: msgId, remoteJid: jid, fromMe: true } };
}

async function sendRpgPreview(sock, jid, text, title, body, options) {
  const thumb = rpgThumbBuffer || getAssetBuffer("yamada-rpg") || getAssetBuffer("yamada");
  const website = config.info?.website || YAMADA_CORE_CONFIG.info?.website || "https://whatsapp.com";
  const msgId = await sock.sendPreview(
    jid,
    {
      caption: `${website} ${text}`,
      url: `${website}`,
      title: title || "⚔️ Yamada RPG",
      description: body || "Adventure awaits!",
      jpegThumbnail: thumb,
      previewType: 0,
    },
    { contextInfo: _saluranCtx(), ...options },
  );
  return { key: { id: msgId, remoteJid: jid, fromMe: true } };
}

async function sendToolsPreview(sock, jid, text, title, body, options) {
  const thumb = gameThumbBuffer || getAssetBuffer("yamada-games") || getAssetBuffer("yamada");
  const website = config.info?.website || YAMADA_CORE_CONFIG.info?.website || "https://whatsapp.com";
  const msgId = await sock.sendPreview(
    jid,
    {
      caption: `${website} ${text}`,
      url: `${website}`,
      title: title || "🛠️ Yamada TOOLS",
      description: body || "Utility & tools",
      jpegThumbnail: thumb,
      previewType: 0,
    },
    { contextInfo: _saluranCtx(), ...options },
  );
  return { key: { id: msgId, remoteJid: jid, fromMe: true } };
}

function saluranCtx() {
  return _saluranCtx();
}

function checkFastAnswer(session) {
  if (!session?.startTime) return { isFast: false };

  const elapsed = Date.now() - session.startTime;

  if (elapsed <= FAST_ANSWER_THRESHOLD) {
    return {
      isFast: true,
      elapsed: elapsed,
      praise: getRandomPraise(),
      bonus: FAST_ANSWER_BONUS,
    };
  }

  return { isFast: false, elapsed: elapsed };
}

function createFakeQuoted(botName = "yamada-ai", verified = true) {
  return {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
    },
    message: {
      contactMessage: {
        displayName: verified ? `✅ ${botName}` : botName,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${botName}\nORG:${verified ? "Verified Bot" : "Bot"}\nEND:VCARD`,
      },
    },
  };
}

export {
  getGameContextInfo,
  getWinnerContextInfo,
  getRpgContextInfo,
  sendGamePreview,
  sendWinnerPreview,
  sendRpgPreview,
  sendToolsPreview,
  saluranCtx,
  createFakeQuoted,
  checkFastAnswer,
  getRandomPraise,
  gameThumbBuffer,
  rpgThumbBuffer,
  winnerThumbBuffer,
  FAST_ANSWER_THRESHOLD,
  FAST_ANSWER_BONUS,
  FAST_ANSWER_PRAISES,
};
