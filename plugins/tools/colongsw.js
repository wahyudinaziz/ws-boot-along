import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


const pluginConfig = {
    name: 'colongsw',
    alias: ['ambilsw'],
    category: 'tools',
    description: 'Ambil SW khusus yang mention grup',
    usage: '.colongsw (reply sw mention)',
    example: '.colongsw',
    cooldown: 5,
    isEnabled: true
}

async function handler(m, { sock }) {

    if (!m.quoted) {
        return m.reply(
`╭━━〔 💖 YAMADA SW STEALER 〕━━⬣
┃
┃ Ehh darling 😳
┃ reply status yang mention grup dulu yaa~
╰━━━━━━━━━━━━━━━━⬣`)
    }

    try {

        let q = m.quoted

        // 🔥 UNWRAP
        let msg = q.message || {}

        if (msg?.ephemeralMessage) msg = msg.ephemeralMessage.message
        if (msg?.viewOnceMessage) msg = msg.viewOnceMessage.message
        if (msg?.viewOnceMessageV2) msg = msg.viewOnceMessageV2.message

        // 🔥 CONTEXT FIX
        const context =
            msg?.extendedTextMessage?.contextInfo ||
            msg?.imageMessage?.contextInfo ||
            msg?.videoMessage?.contextInfo ||
            {}

        const mentioned = context?.mentionedJid || []

        const isStatus = q.key?.remoteJid === 'status@broadcast'
        const isMentionGroup = mentioned.includes(m.chat)

        if (!isStatus || !isMentionGroup) {
            return m.reply(
`╭━━〔 ❌ YAMADA NOTICE 〕━━⬣
┃
┃ Ihh ini bukan SW yang mention grup 😤
┃ jangan asal colong yaa darling 😳
╰━━━━━━━━━━━━━━━━⬣`)
        }

        m.react('💖')

        const type = Object.keys(msg)[0]

        // ===== IMAGE =====
        if (type === 'imageMessage') {

            const media = await q.download()

            await sock.sendMessage(m.chat, {
                image: media,
                caption:
`╭━━〔 💖 YAMADA RESULT 〕━━⬣
┃
┃ 🖼️ SW berhasil aku ambil 🤭
┃ khusus buat kamu darling 😳
╰━━━━━━━━━━━━━━━━⬣`
            }, { quoted: m })

            return
        }

        // ===== VIDEO =====
        if (type === 'videoMessage') {

            const media = await q.download()

            await sock.sendMessage(m.chat, {
                video: media,
                caption:
`╭━━〔 💖 YAMADA RESULT 〕━━⬣
┃
┃ 🎬 Nih SW nya darling 😋
┃ jangan disebar yaa 🤫
╰━━━━━━━━━━━━━━━━⬣`
            }, { quoted: m })

            return
        }

        // ===== TEXT =====
        const text =
            q.text ||
            msg.conversation ||
            msg.extendedTextMessage?.text ||
            'Tidak ada isi'

        await m.reply(
`╭━━〔 💖 YAMADA TEXT 〕━━⬣
┃
┃ 📄 Isi SW nya nih 😋
┃
┃ "${text}"
┃
┃ Jangan kepo banget yaa 🤭
╰━━━━━━━━━━━━━━━━⬣`)
        
    } catch (e) {

        console.log(e)

        m.reply(
`╭━━〔 ❌ YAMADA ERROR 〕━━⬣
┃
┃ Ihh gagal ambil SW 😭
┃ coba lagi yaa darling 😳
╰━━━━━━━━━━━━━━━━⬣`)
    }
}

export { pluginConfig as config, handler };
