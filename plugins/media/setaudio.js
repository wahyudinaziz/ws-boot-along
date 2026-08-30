import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const quoted = m.quoted || m
    const mime = quoted?.mimetype || ''

    if (!mime.startsWith('audio/')) return m.reply(`Kirim/reply audio dulu!\nContoh: reply audio lalu ketik *${usedPrefix}${command}*`)

    const filePath = '../../media/tes.mp3'
    const buffer = await quoted.download()

    fs.writeFileSync(filePath, buffer)
    m.reply('✅ Audio menu berhasil diupdate!')

  } catch (e) {
    console.error(e)
    m.reply('Error: ' + e.message)
  }
}

handler.command = /^setaudio$/i
handler.tags = ['owner']
handler.help = ['setaudio']
handler.owner = true

export default handler
