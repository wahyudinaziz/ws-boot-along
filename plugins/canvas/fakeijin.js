import { createCanvas, loadImage } from '@napi-rs/canvas';
import axios from 'axios';
import config from '../../config.js';

const pluginConfig = {
    name: 'fakeijin',
    alias: ['ijinfake', 'suratijin', 'fakeizin'],
    category: 'canvas',
    description: 'Bikin fake surat ijin (buat konten/gaguan doang)',
    usage: '.fakeijin <nama> | <alasan>',
    example: '.fakeijin Yamada | Sakit',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
}

const TEMPLATE_URL = 'https://i.imgur.com/ijin-template.png'

async function downloadImage(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    return Buffer.from(response.data)
}

async function generateFakeIjin(nama, alasan) {
    const templateBuffer = await downloadImage(TEMPLATE_URL)
    const template = await loadImage(templateBuffer)
    
    const canvas = createCanvas(template.width, template.height)
    const ctx = canvas.getContext('2d')
    
    ctx.drawImage(template, 0, 0)
    
    ctx.font = 'bold 16px "Times New Roman"'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    
    ctx.fillText(nama.toUpperCase(), canvas.width / 2, 220)
    ctx.fillText(alasan.toUpperCase(), canvas.width / 2, 290)
    
    const now = new Date()
    ctx.font = '14px "Times New Roman"'
    ctx.fillText(now.toLocaleDateString('id-ID'), canvas.width / 2, 370)
    ctx.fillText('Kepala Sekolah', canvas.width / 2, 480)
    ctx.fillText('Dr. Yamada, M.Pd', canvas.width / 2, 520)
    
    return canvas.toBuffer('image/png')
}

async function handler(m, { sock }) {
    const text = m.args.join(' ') || m.text?.trim() || ''
    if (!text) return m.reply(`*Cara pakai:*\n${m.prefix}fakeijin <nama> | <alasan>\nContoh: .fakeijin Yamada | Sakit`)
    
    const parts = text.split('|').map(p => p.trim())
    const nama = parts[0] || 'Darling'
    const alasan = parts[1] || 'Sakit'
    
    m.react('💕')
    await m.reply(`⏳ *Processing...*`)
    
    try {
        const imageBuffer = await generateFakeIjin(nama, alasan)
        await sock.sendMessage(m.chat, { image: imageBuffer, caption: `💕 *FAKE SURAT IJIN* 💕\n\n✅ Nama: ${nama}\n📌 Alasan: ${alasan}\n\n💗 *Yamada:* Izin nya udah jadi darling~` }, { quoted: m })
        m.react('✅')
    } catch (err) {
        m.react('💔')
        m.reply(`Error: ${err.message}`)
    }
}
export { pluginConfig as config, handler };