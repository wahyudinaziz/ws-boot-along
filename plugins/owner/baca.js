import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


const pluginConfig = {
  name: ["baca", "read", "markread"],
  alias: [],
  category: "owner",
  description: "Tandai pesan sebagai sudah dibaca",
  usage: ".baca",
  example: ".baca",
  isOwner: true,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  try {
    await sock.readMessages([m.key]);
    await m.react("✅");
    return m.reply("📖 *Pesan ditandai sudah dibaca*");
  } catch (err) {
    return m.reply(`❌ Gagal: ${err.message}`);
  }
}

export { pluginConfig as config, handler };
