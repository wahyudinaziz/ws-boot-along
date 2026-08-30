import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


const pluginConfig = {
    name: "gachanasip",
    category: "fun",
    description: "Random nasip / hoki / keberuntungan buat user",
    usage: ".gachanasip",
    isEnabled: true
}

// List nasip / hoki / sial lucu
const nasipList = [
"Hari ini hoki banget, rezeki nyangkut di jalan 😎",
"Sedikit sial, hati-hati dengan benda tajam 🗡️",
"Nasip biasa aja, tapi senyummu manis ❤️",
"Rejeki datang tak terduga, siap-siap senyum 😏",
"Hari ini banyak godaan, tapi kamu kuat 💪",
"Nasip baik, kemungkinan dapat hadiah kecil 🎁",
"Sedikit sial, jangan lupa bawa payung ☂️",
"Nasip gokil! Orang jatuh cinta sama kamu hari ini 🥰",
"Peruntungan naik, tapi jangan sombong ya 😉",
"Nasip netral, santai aja dan nikmati hari 😎"
]

async function handler(m){
    const name = m.pushName || "Darling"
    const nasip = nasipList[Math.floor(Math.random()*nasipList.length)]

    const responses = [
`╭─〔 💖 YAMADA GACHA NASIP 💖 〕─╮
│ Darling, nih nasipmu hari ini 😋
│
│ 👤 Player : *${name}*
│ 🍀 Nasip : *${nasip}*
│
│ Ara ara~ semoga harimu menyenangkan ❤️
╰────────────`,

`╔═══『 💞 NASIP GACHA 』═══╗
┃ Darling, yuk cek nasipmu!
┃
┃ 👤 Player : *${name}*
┃ 🌟 Nasip : *${nasip}*
┃
┃ Ara ara~ semoga hoki terus 😏
╚════════════════════╝`,

`┏━━━〔 💫 NASIPMU 〕━━━┓
┃
┃ 👤 Player : *${name}*
┃ 🎲 Nasip : *${nasip}*
┃
┃ Ara ara~ semoga rezeki & hoki selalu menyertaimu 🗿
┗━━━━━━━━━━━━━━━━━━┛`
    ]

    const reply = responses[Math.floor(Math.random()*responses.length)]
    await m.reply(reply)
}

export { pluginConfig as config, handler };
