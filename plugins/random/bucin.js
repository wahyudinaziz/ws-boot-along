import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import safeJson from "../../src/lib/yamada-safe-json.js";
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  await m.react('✨')

  let url = `${global.APIs.faa}/faa/quote-bucin`
  let res = await fetch(url)
  let json = await safeJson(res, { status: false })

  if (!json.status) return

  conn.reply(m.chat, json.quote.trim(), m)
}

handler.help = ['quotebucin']
handler.tags = ['quotes']
handler.command = /^quotebucin$/i
handler.limit = true

export default handler
