import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'
import { tmpdir } from 'os'

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted || m
  let mime = q.mimetype || q.msg?.mimetype || ''
  if (!mime) throw `Balas media dengan perintah *${usedPrefix + command}*`

  try {
    const media = await q.download()
    const ext = mime.split('/')[1] || 'bin'
    const filePath = path.join(tmpdir(), `upload-${Date.now()}.${ext}`)
    fs.writeFileSync(filePath, media)

    const form = new FormData()
    form.append('reqtype', 'fileupload')
    form.append('fileToUpload', fs.createReadStream(filePath))

    const { data } = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders(),
    })

    fs.unlinkSync(filePath)
    m.reply(`✅ *Upload berhasil!*\n${data}`)
  } catch (err) {
    console.error('❌ Error upload:', err)
    throw '❌ Gagal upload ke catbox.moe'
  }
}

handler.help = ['catbox']
handler.tags = ['tools']
handler.command = /^catbox$/i
handler.limit = true

export default handler
