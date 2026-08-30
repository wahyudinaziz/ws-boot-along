import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import axios from "axios";
import config from "../../config.js";
import te from "../../src/lib/yamada-error.js";
import { saluranCtx } from "../../src/lib/yamada-context.js";
const NEOXR_APIKEY = config.APIkey?.neoxr || "Milik-Bot-YamadaMD";

const pluginConfig = {
  name: "emojitoimage",
  alias: ["emoji2img", "emojiimg", "e2i"],
  category: "tools",
  description: "Konversi emoji ke gambar HD (style Apple)",
  usage: ".emojitoimage <emoji> [style]",
  example: ".emojitoimage 😳 apple",
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

const STYLES = [
  "apple",
  "google",
  "microsoft",
  "samsung",
  "whatsapp",
  "twitter",
  "facebook",
];

async function handler(m, { sock }) {
  const args = m.args || [];
  const emoji = args[0]?.trim();
  const style = args[1]?.toLowerCase() || "apple";

  if (!emoji) {
    return m.reply(
      `🖼️ *ᴇᴍᴏᴊɪ ᴛᴏ ɪᴍᴀɢᴇ*\n\n` +
        `> Konversi emoji ke gambar HD\n\n` +
        `*Format:*\n` +
        `> \`${m.prefix}emojitoimage <emoji> [style]\`\n\n` +
        `*Contoh:*\n` +
        `> \`${m.prefix}emojitoimage 😳 apple\`\n\n` +
        `*Style tersedia:*\n` +
        `> ${STYLES.join(", ")}`,
    );
  }

  const validStyle = STYLES.includes(style) ? style : "apple";

  m.react("🖼️");

  try {
    const apiUrl = `https://api.neoxr.eu/api/emoimg?q=${encodeURIComponent(emoji)}&style=${validStyle}&apikey=${NEOXR_APIKEY}`;
    const { data } = await axios.get(apiUrl, { timeout: 15000 });

    if (!data?.status || !data?.data?.url) {
      m.react("❌");
      return m.reply("❌ *ɢᴀɢᴀʟ*\n\n> Emoji tidak ditemukan atau API error");
    }

    const imgUrl = data.data.url;

    await sock.sendMedia(
      m.chat,
      imgUrl,
      `🖼️ *ᴇᴍᴏᴊɪ ᴛᴏ ɪᴍᴀɢᴇ*\n\n> Emoji: ${emoji}\n> Style: ${validStyle}\n> Code: ${data.data.code || "-"}`,
      m,
      { type: "image", contextInfo: saluranCtx() },
    );

    m.react("✅");
  } catch (error) {
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
