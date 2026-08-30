import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


let handler = async (m, { conn }) => {
  try {
    let url = 'https://api.siputzx.my.id/api/r/cecan/japan'
    let caption = `🇯🇵 *Random Cecan Jepang*\nManisnya bikin pengen liburan ke Tokyo 😳`

    await conn.sendFile(m.chat, url, 'cecan-japan.jpg', caption, m)
  } catch (e) {
    console.error(e)
    m.reply(`❌ Gagal ambil gambar cecan Jepang.\n${e}`)
  }
}

handler.help = ['cecanjapan']
handler.tags = ['random']
handler.command = /^cecanjapan$/i
handler.limit = true

export default handler
