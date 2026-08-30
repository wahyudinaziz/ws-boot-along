import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import safeJson from "../../src/lib/yamada-safe-json.js";
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('✨')

  if (!text) {
    return conn.reply(
      m.chat,
      `*Example :* ${usedPrefix + command} Saya sedang belajar membuat bot whatsapp`,
      m
    )
  }

  let url = `${global.APIs.faa}/faa/quillbot?text=${encodeURIComponent(text)}`
  let res = await fetch(url)
  let json = await safeJson(res, { status: false })

  if (!json.status) return

  conn.reply(m.chat, json.result.trim(), m)
}

handler.help = ['quillbot']
handler.tags = ['ai']
handler.command = /^quillbot$/i
handler.limit = true

export default handler
