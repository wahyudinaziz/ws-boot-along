import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
  try {
    const res = await fetch('https://api.siputzx.my.id/api/r/blue-archive')
    const buffer = await res.buffer()

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `Waifu Random Blue Archive\n\nKlik tombol di bawah untuk waifu baru`,
      footer: 'Ryo Yamada MD',

      nativeFlow: [
        {
          text: 'Next Waifu',
          id: `.${command}`
        }
      ]

    }, { quoted: m })
    
  } catch (err) {
    console.error(err)
    m.reply('Gagal memuat waifu')
  }
}

handler.help = ['bluearchive']
handler.tags = ['anime', 'random']
handler.command = /^bluearchive$/i
handler.limit = true

export default handler
