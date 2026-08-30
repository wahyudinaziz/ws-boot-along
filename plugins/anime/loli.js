import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import safeJson from "../../src/lib/yamada-safe-json.js";
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  let res = await fetch('https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/anime_loli.json')
  if (!res.ok) throw await `${res.status} ${res.statusText}`;
  let json = await safeJson(res, []);
  let url = json[Math.floor(Math.random() * json.length)]
  await conn.sendFile(m.chat, url, null, 'Nih Kak', '', m)
}

handler.command = /^(loli)$/i
handler.tags = ['anime']
handler.help = ['loli']

handler.register = true

export default handler
