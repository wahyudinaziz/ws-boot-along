import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


const pluginConfig = {
  name: 'stopbcpc',
  alias: ['stopbroadcastpc'],
  category: 'owner',
  description: 'Hentikan broadcast private yang sedang berjalan',
  usage: '.stopbcpc',
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true
}

async function handler(m) {
  if (!global.statusBcpc) {
    return m.reply('❌ Tidak ada broadcast private yang sedang berjalan.')
  }
  global.stopBcpc = true
  return m.reply('⏹️ Menghentikan broadcast private...')
}

export { pluginConfig as config, handler }
