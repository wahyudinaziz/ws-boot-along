import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import te from "../../src/lib/yamada-error.js";
import yamadaApi from "../../src/lib/yamada-apimanager.js";
const pluginConfig = {
  name: "tts",
  alias: ["say"],
  category: "tts",
  description: "Google Text To Speech",
  usage: ".tts <text>",
  example: ".tts halo semua",
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.text?.trim();

  if (!text) {
    return m.reply(`🎤 *Google TTS*\n\nGunakan:\n${m.prefix}tts halo dunia`);
  }

  m.react("🎤");

  async function textToSpeech2(text) {
    try {
      const response = await yamadaApi.nexray.geminiTts(text);
      return response;
    } catch (error) {
      return error;
    }
  }

  try {
    const t = await textToSpeech2(text);
    await sock.sendMessage(
      m.chat,
      {
        audio: { url: t.result },
        mimetype: "audio/mpeg",
      },
      { quoted: m },
    );
    m.react("✅");
  } catch (err) {
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
