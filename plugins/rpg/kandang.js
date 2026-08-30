import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


let handler = async (m) => {
  let user = global.db.data.users[m.sender]
  if (!user) return

  const animals = [
    'banteng','harimau','gajah','kambing','panda','buaya',
    'kerbau','sapi','monyet','ayam','babi','babihutan'
  ]

  let isi = animals
    .map(v => {
      user[v] = user[v] || 0
      return user[v] > 0
        ? `• ${global.rpg.emoticon(v)} ${v}: ${user[v]}`
        : null
    })
    .filter(Boolean)
    .join('\n')

  let caption = isi
    ? `📮 *KANDANG KAMU*\n\n${isi}`
    : '📮 Kandang kamu masih kosong!'

  m.reply(caption)
}

handler.help = ['kandang']
handler.tags = ['rpg']
handler.command = /^(kandang)$/i
handler.register = true
handler.group = true
handler.rpg = true

export default handler
