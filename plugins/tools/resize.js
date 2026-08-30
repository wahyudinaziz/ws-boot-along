import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import { getImageProcessingLibrary } from '@itsliaaa/baileys'

let handler = async (m, { conn }) => {
  let q = m.quoted || m
  let mime = q.mimetype || ''

  if (!mime.startsWith('image/')) return m.reply('Reply gambar!')

  let buffer = await q.download()

  const lib = await getImageProcessingLibrary()

  let output = buffer
  if (lib.sharp?.default) {
    output = await lib.sharp.default(buffer)
      .resize(512)
      .png()
      .toBuffer()
  }

  await conn.sendMessage(m.chat, { image: output }, { quoted: m })
}

handler.command = ['resize']
export default handler
