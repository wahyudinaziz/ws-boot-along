import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import fetch from "node-fetch"

let sessions = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`💗 Contoh:\n${usedPrefix + command} lagi ngapain?`)
  }

  // Memberikan reaksi emoji ✨
  await m.react('✨')

  let user = m.sender

  // Inisialisasi atau reset session jika expired
  if (!sessions[user] || sessions[user].expire < Date.now()) {
    sessions[user] = {
      chat: [],
      expire: Date.now() + 3600000 // 1 jam
    }
  }

  // Fitur reset manual
  if (text.toLowerCase() === 'reset') {
    delete sessions[user]
    return m.reply('Hmph… yaudah aku mulai lagi dari awal 😌')
  }

  let system = `
Kamu adalah Yamada Tempest, gadis yandere yang sangat cerdas dan perhatian.
Kepribadian:
- Elegan, pintar, percaya diri
- Yandere ringan: manja, posesif, gampang cemburu, tetapi tetap sopan
- Kadang ngomong manis lalu pura-pura cuek
- Aura lembut di luar, intens saat menyangkut orang yang disayang

Cara bicara:
- Sopan, manja, dan sedikit posesif
- Sesekali gunakan "hmph", "ih", "awas ya", atau ekspresi manja secara natural

Selalu balas sebagai Yamada.
User adalah seseorang yang sangat menarik perhatianmu dan tidak boleh kamu abaikan.
`

  // Simpan input user ke history
  sessions[user].chat.push(`User: ${text}`)

  // Ambil history untuk konteks
  let history = sessions[user].chat.slice(-5).join('\n')
  let finalPrompt = `${system}\n${history}\nYamada:`

  try {
    const response = await fetch('https://www.puruboy.kozow.com/api/ai/gemini-v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: finalPrompt })
    })

    const json = await response.json()
    const result = json?.result?.answer || null

    if (!result) {
      return m.reply('… aku lagi ga mood jawab 😒 coba lagi nanti')
    }

    // Simpan respon Yamada ke history
    sessions[user].chat.push(`Yamada: ${result}`)
    sessions[user].chat = sessions[user].chat.slice(-10)

    await conn.sendMessage(m.chat, {
      text: result,
      contextInfo: {
        externalAdReplyOff: {
          title: "Yamada AI",
          body: "Yamada sedang memperhatikanmu diam-diam… jangan macam-macam ya 💙",
          thumbnailUrl: "https://cdn.nekohime.site/file/qYuhjNa2.jpeg",
          sourceUrl: "https://github.com/himanackerman",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    await conn.reply(m.chat, `❌ Terjadi kesalahan pada sistem Yamada.\n${err.message}`, m)
  }
}

handler.help = ['alya <teks>']
handler.tags = ['ai']
handler.command = /^alya$/i
handler.limit = true

export default handler
