import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


let handler = async (m, { text }) => {

  if (!text) throw `Contoh penggunaan:
.setprefix .
.setprefix !
.setprefix . / #

Gunakan spasi untuk multi prefix`

  let prefixes = text.split(' ').map(p => p.trim()).filter(p => p)

  global.prefix = new RegExp(
    '^(' + prefixes.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')'
  )

  await m.reply(`✅ Prefix berhasil diubah menjadi: *${prefixes.join(' , ')}*`)
}

handler.tags = ['owner']
handler.help = ['setprefix']
handler.command = /^(setprefix|setpref)$/i
handler.rowner = true

export default handler
