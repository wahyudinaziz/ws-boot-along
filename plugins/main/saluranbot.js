import fs from 'fs';
import path from 'path';
import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";
const pluginConfig = {
    name: 'saluran',
    alias: ['channel','ch','joinch'],
    category: 'main',
    description: 'Join saluran resmi Yamada 😈',
    usage: '.saluran',
    cooldown: 5,
    isEnabled: true
}

async function handler(m, { sock }) {

    const chBot = 'https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k'
    const chOwner = 'https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k'
    const chSticker = 'https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k'

    // 🖼️ ambil gambar
    const imgPath = path.join(process.cwd(), 'assets', 'images', 'zerotwo2.jpg')
    let imageBuffer = null

    if (fs.existsSync(imgPath)) {
        imageBuffer = fs.readFileSync(imgPath)
    } else {
        return m.reply('❌ Gambar zerotwo2.jpg gak ditemukan di assets/images/')
    }

    const caption = 
`╭━━━〔 💗 YAMADA CHANNEL 💗 〕━━━⬣
┃
┃ Ara ara~ 😏
┃ Kamu mau tetap dekat denganku kan, darling?
┃
┃ Jangan sampai ketinggalan info penting ya…
┃ Aku gak suka kalau kamu telat tau sesuatu 😌
┃
┣━━━〔 📢 WAJIB DI IKUTI 〕━━━⬣
┃ 💗 Saluran Bot (WAJIB)
┃ Tempat update, info, dan fitur baru!
┃
┃ ⚠️ Tidak join?
┃ ➜ Fitur bisa dibatasi 😈
┃
┣━━━〔 🌸 OPTIONAL 〕━━━⬣
┃ 👑 Saluran Owner
┃ Liat update & behind the scene~
┃
┃ 🎭 Saluran Sticker Yamada
┃ Biar chat kamu makin hidup 💕
┃
╰━━━⬣
“Kalau kamu mengabaikanku…
aku bisa saja mengabaikanmu juga, darling 😌💔”
`

    try {

        await sock.sendMessage(m.chat, {
            image: imageBuffer,
            caption: caption,
            footer: 'Yamada 💗',
            interactiveButtons: [
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '💗 Join Saluran Bot',
                        url: chBot
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '👑 Saluran Owner',
                        url: chOwner
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '🎭 Sticker Yamada',
                        url: chSticker
                    })
                }
            ]
        }, { quoted: m })

    } catch (err) {
        console.log(err)
        m.reply('❌ Gagal kirim saluran 😢')
    }

}

export { pluginConfig as config, handler };
