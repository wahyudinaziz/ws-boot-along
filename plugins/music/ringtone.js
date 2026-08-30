import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


// plugins/ringtone.js
// Ringtone Downloader
// API : https://anabot.my.id
// Author : Hilman

import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix + command} Iphone`

  await m.reply('✨cihuy otw cari ringtone...')

  try {
    let url = `https://anabot.my.id/api/download/ringtone?query=${encodeURIComponent(text)}&apikey=freeApikey`
    let res = await fetch(url)
    let json = await res.json()

    if (!json.success || !json.data?.result?.length) 
      throw '❌ Ringtone tidak ditemukan.'

    let result = json.data.result

    for (let audio of result) {
      // kirim audio biasa 
      await conn.sendFile(
        m.chat,
        audio.audio,
        `${audio.title}.mpeg`,
        `🎵 *${audio.title}*`,
        m,
        false, 
        {
          mimetype: 'audio/mpeg'
        }
      )
      await new Promise(resolve => setTimeout(resolve, 1500)) // delay 1.5s biar ga spam
    }

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error: ' + e.message)
  }
}

handler.help = ['ringtone <judul>']
handler.tags = ['internet']
handler.command = /^ringtone$/i
handler.limit = true

export default handler
