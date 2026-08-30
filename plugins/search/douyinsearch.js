import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    await m.react('✨')

    if (!text) {
        return m.reply(`Contoh penggunaan:
${usedPrefix + command} beautiful dance`)
    }

    try {
        const url = `${global.APIs.deline}/search/douyin?q=${encodeURIComponent(text)}`
        const { data } = await axios.get(url)

        if (!data.status) throw 'API error'

        await conn.sendFile(
            m.chat,
            data.video,
            'douyin.mp4',
            data.caption,
            m
        )

    } catch (e) {
        console.error(e)
        m.reply('Gagal mencari video Douyin.')
    }
}

handler.help = ['douyinsearch <query>']
handler.tags = ['search']
handler.command = /^douyinsearch$/i
handler.limit = true

export default handler
