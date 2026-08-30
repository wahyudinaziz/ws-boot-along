import { createCanvas, loadImage } from '@napi-rs/canvas';
import axios from 'axios';
import config from '../../config.js';

const pluginConfig = {
    name: 'fakeijazah',
    alias: ['ijazahfake', 'fakediploma'],
    category: 'canvas',
    description: 'Bikin fake ijazah (buat konten/gaguan doang)',
    usage: '.fakeijazah <nama> | <gelar> | <universitas>',
    example: '.fakeijazah Yamada | S.Kom | Universitas Zero',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 8,
    energi: 1,
    isEnabled: true
}

const TEMPLATE_URL = 'https://i.imgur.com/ijazah-template.png'

async function downloadImage(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    return Buffer.from(response.data)
}

async function generateFakeIjazah(nama, gelar, universitas) {
    const templateBuffer = await downloadImage(TEMPLATE_URL)
    const template = await loadImage(templateBuffer)
    
    const canvas = createCanvas(template.width, template.height)
    const ctx = canvas.getContext('2d')
    
    ctx.drawImage(template, 0, 0)
    
    // Nama
    ctx.font = 'bold 24px "Times New Roman"'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.fillText(nama.toUpperCase(), canvas.width / 2, 280)
    
    // Gelar
    ctx.font = 'bold 20px "Times New Roman"'
    ctx.fillText(gelar.toUpperCase(), canvas.width / 2, 350)
    
    // Universitas
    ctx.font = '18px "Times New Roman"'
    ctx.fillText(universitas.toUpperCase(), canvas.width / 2, 420)
    
    // Nomor ijazah random
    const ijazahNo = 'IZH-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    ctx.font = '14px "Times New Roman"'
    ctx.fillText(`No. Ijazah: ${ijazahNo}`, canvas.width / 2, 500)
    
    // Tahun lulus
    const tahun = new Date().getFullYear()
    ctx.fillText(`Tahun Lulus: ${tahun}`, canvas.width / 2, 540)
    
    return canvas.toBuffer('image/png')
}

async function handler(m, { sock }) {
    const text = m.args.join(' ') || m.text?.trim() || ''
    
    if (!text) {
        return m.reply(
            `💕 *ғᴀᴋᴇ ɪᴊᴀᴢᴀʜ* 💕\n\n` +
            `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `┃ ✦ *Cara Pakai*\n` +
            `┃\n` +
            `┃   ${m.prefix}fakeijazah <nama> | <gelar> | <universitas>\n` +
            `┃\n` +
            `┃ ✦ *Contoh*\n` +
            `┃\n` +
            `┃   ${m.prefix}fakeijazah Yamada | S.Kom | Universitas Zero\n` +
            `┃\n` +
            `┃ 💗 *Yamada:* Mau lulusan mana darling~?\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        )
    }
    
    const parts = text.split('|').map(p => p.trim())
    const nama = parts[0] || 'Darling'
    const gelar = parts[1] || 'S.Kom'
    const universitas = parts[2] || 'Universitas Zero'
    
    m.react('💕')
    await m.reply(`⏳ *ᴘʀᴏᴄᴇꜱꜱɪɴɢ...*\n\n💗 *Yamada:* Lagi bikin fake ijazah darling~`)
    
    try {
        const imageBuffer = await generateFakeIjazah(nama, gelar, universitas)
        
        await sock.sendMessage(m.chat, {
            image: imageBuffer,
            caption: `💕 *ғᴀᴋᴇ ɪᴊᴀᴢᴀʜ* 💕\n\n` +
                    `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
                    `┃ ✅ *ʙᴇʀʜᴀꜱɪʟ*\n` +
                    `┃ 👨‍🎓 *ɴᴀᴍᴀ*: ${nama}\n` +
                    `┃ 🎓 *ɢᴇʟᴀʀ*: ${gelar}\n` +
                    `┃ 🏛️ *ᴜɴɪᴠᴇʀꜱɪᴛᴀꜱ*: ${universitas}\n` +
                    `┃\n` +
                    `┃ 💗 *Yamada:* Selamat ya darling! 🗿\n` +
                    `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        }, { quoted: m })
        
        m.react('✅')
        
    } catch (err) {
        console.error('[FakeIjazah] Error:', err)
        m.react('💔')
        return m.reply(`💔 *ᴇʀʀᴏʀ*\n\n> ${err.message}`)
    }
}
export { pluginConfig as config, handler };