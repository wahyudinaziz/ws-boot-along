import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  await m.react('✨')

  let url = `${global.APIs.faa}/faa/papayang`
  let res = await fetch(url)

  if (!res.ok) return

  let buffer = Buffer.from(await res.arrayBuffer())

  await conn.sendFile(m.chat, buffer, 'papayang.jpg', '', m)
}

handler.help = ['papayang']
handler.tags = ['random']
handler.command = /^papayang$/i
handler.limit = true

export default handler
