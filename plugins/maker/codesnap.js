import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  await m.react('✨')

  if (!text) return

  let url = `${global.APIs.faa}/faa/codesnap?text=${encodeURIComponent(text)}`
  let res = await fetch(url)

  if (!res.ok) return

  let buffer = Buffer.from(await res.arrayBuffer())

  await conn.sendFile(m.chat, buffer, 'codesnap.png', '', m)
}

handler.help = ['codesnap <code>']
handler.tags = ['maker']
handler.command = /^codesnap$/i
handler.limit = true

export default handler
