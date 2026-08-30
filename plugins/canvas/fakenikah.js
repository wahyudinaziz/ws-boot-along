import { createCanvas, loadImage } from '@napi-rs/canvas';
import axios from 'axios';
import config from '../../config.js';

const pluginConfig = {
    name: 'fakenikah',
    alias: ['nikahfake', 'fakemarriage'],
    category: 'canvas',
    description: 'Bikin fake sertifikat nikah (buat konten/gaguan doang)',
    usage: '.fakenikah <nama1> | <nama2>',
    example: '.fakenikah Yamada | Darling',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 8,
    energi: 1,
    isEnabled: true
}

const TEMPLATE_URL = 'https://i.imgur.com/nikah-template.png'

async function downloadImage(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    return Buffer.from(response.data)
}

async function generateFakeNikah(nama1, nama2) {
    const templateBuffer = await downloadImage(TEMPLATE_URL)
    const template = await loadImage(templateBuffer)
    
    const canvas = createCanvas(template.width, template.height)
    const ctx = canvas.getContext('2d')
    
    ctx.drawImage(template, 0, 0)
    
    ctx.font = 'bold 20px "Times New Roman"'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    
    // Nama pengantin pria
    ctx.fillText(nama1.toUpperCase(), canvas.width / 2, 280)
    
    // Nama pengantin wanita
    ctx.fillText(nama2.toUpperCase(), canvas.width / 2, 360)
    
    // Tanggal nikah
    const now = new Date()
    ctx.font = '16px "Times New Roman"'
    ctx.fillText(now.toLocaleDateString('id-ID'), canvas.width / 2, 450)
    
    // Tempat nikah
    const tempat = ['Masjid Al-Aqsa', 'Gedung Serbaguna', 'Hotel Bintang 5', 'Balai Desa'][Math.floor(Math.random() * 4)]
    ctx.fillText(tempat, canvas.width / 2, 500)
    
    // Nomor akta random
    const aktaNo = '474/KUA/' + Math.floor(Math.random() * 1000) + '/' + new Date().getFullYear()
    ctx.font = '12px "Times New Roman"'
    ctx.fillText(`No. Akta: ${aktaNo}`, canvas.width / 2, 560)
    
    return canvas.toBuffer('image/png')
}

async function handler(m, { sock }) {
    const text = m.args.join(' ') || m.text?.trim() || ''
    
    if (!text) {
        return m.reply(
            `💕 *ғᴀᴋᴇ ꜱᴇʀᴛɪꜰɪᴋᴀᴛ ɴɪᴋᴀʜ* 💕\n\n` +
            `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `┃ ✦ *Cara Pakai*\n` +
            `┃\n` +
            `┃   ${m.prefix}fakenikah <nama1> | <nama2>\n` +
            `┃\n` +
            `┃ ✦ *Contoh*\n` +
            `┃\n` +
            `┃   ${m.prefix}fakenikah Yamada | Darling\n` +
            `┃\n` +
            `┃ 💗 *Yamada:* Mau nikah sama siapa darling~?\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        )
    }
    
    const parts = text.split('|').map(p => p.trim())
    const nama1 = parts[0] || 'Yamada'
    const nama2 = parts[1] || 'Darling'
    
    m.react('💕')
    await m.reply(`⏳ *ᴘʀᴏᴄᴇꜱꜱɪɴɢ...*\n\n💗 *Yamada:* Lagi bikin sertifikat nikah darling~`)
    
    try {
        const imageBuffer = await generateFakeNikah(nama1, nama2)
        
        await sock.sendMessage(m.chat, {
            image: imageBuffer,
            caption: `💕 *ғᴀᴋᴇ ꜱᴇʀᴛɪꜰɪᴋᴀᴛ ɴɪᴋᴀʜ* 💕\n\n` +
                    `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
                    `┃ ✅ *ʙᴇʀʜᴀꜱɪʟ*\n` +
                    `┃ 💑 *ᴘᴀꜱᴀɴɢᴀɴ*: ${nama1} & ${nama2}\n` +
                    `┃\n` +
                    `┃ 💗 *Yamada:* Selamat ya darling! Semoga langgeng~ 🗿\n` +
                    `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        }, { quoted: m })
        
        m.react('✅')
        
    } catch (err) {
        console.error('[FakeNikah] Error:', err)
        m.react('💔')
        return m.reply(`💔 *ᴇʀʀᴏʀ*\n\n> ${err.message}`)
    }
}
export { pluginConfig as config, handler };