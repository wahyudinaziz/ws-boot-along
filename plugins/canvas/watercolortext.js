import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import te from "../../src/lib/yamada-error.js";
import config from "../../config.js";
import axios from "axios";

const pluginConfig = {
  name: "watercolortext",
  alias: ["watercolor", "wctext"],
  category: "canvas",
  description: "Buat gambar teks dengan efek watercolor",
  usage: ".watercolortext <teks>",
  example: ".watercolortext yamada",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.args.join(" ");

  if (!text) {
    return m.reply(
      `🎨 *ᴡᴀᴛᴇʀᴄᴏʟᴏʀ ᴛᴇxᴛ*\n\n> Masukkan teks yang ingin dijadikan gambar\n\n\`Contoh: ${m.prefix}watercolortext yamada\``,
    );
  }

  m.react("🕕");

  try {
    const url = `https://api.cuki.biz.id/api/ephoto/watercolortext?apikey=${config.APIkey.cuki}&query=${encodeURIComponent(text)}`;
    
    // Mengunduh gambar langsung (response type image)
    const { data } = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000
    });

    const imageBuffer = Buffer.from(data, 'binary');

    m.react("✅");
    await sock.sendMessage(m.chat, { 
      image: imageBuffer, 
      caption: `🎨 *Water Color Text*\n\nTeks: ${text}` 
    }, { quoted: m });
  } catch (error) {
    console.log(error);
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
