import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


let handler = async (m) => {
  return m.reply(
    `🌷 *INFO SCRIPT*\n\n` +
    `Hai kak 👋\n\n` +
    `❏ Sedang mencari script bot WhatsApp?\n` +
    `❏ Script tersedia dan diperbarui melalui Channel WhatsApp.\n\n` +
    `❏ Update fitur terbaru\n` +
    `❏ Informasi script\n` +
    `❏ Perbaikan bug\n` +
    `❏ Pengumuman penting\n\n` +
    `📢 Channel WhatsApp:\nhttps://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k`
  )
}

handler.help = ['sc', 'script']
handler.tags = ['info']
handler.command = /^(sc|script)$/i

export default handler
