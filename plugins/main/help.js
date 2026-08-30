import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


let handler = async (m, { usedPrefix }) => {
  return m.reply(
    `📚 *HELP*\n\n` +
    `Gunakan ${usedPrefix}menu untuk melihat semua kategori fitur.\n\n` +
    `Contoh:\n` +
    `• ${usedPrefix}totalfitur\n` +
    `• ${usedPrefix}status\n` +
    `• ${usedPrefix}gp menu\n\n` +
    `✨ Ketik ${usedPrefix}menu untuk daftar lengkap.`
  )
}

handler.help = ['help']
handler.tags = ['main']
handler.command = /^help$/i

export default handler
