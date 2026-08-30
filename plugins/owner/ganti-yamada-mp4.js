import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import fs from 'fs'
import path from 'path'
import te from '../../src/lib/yamada-error.js'
import { updateAssetUrl } from '../../src/lib/yamada-uploader.js'
const pluginConfig = {
    name: 'ganti-yamada.mp4',
    alias: ['gantiyamadavideo', 'setyamadavideo'],
    category: 'owner',
    description: 'Ganti video yamada.mp4',
    usage: '.ganti-yamada.mp4 (reply/kirim video)',
    example: '.ganti-yamada.mp4',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const isVideo = m.type === 'videoMessage' || (m.quoted && m.quoted.type === 'videoMessage')
    
    if (!isVideo) {
        return m.reply(`🎬 *ɢᴀɴᴛɪ ᴏᴜʀɪɴ.ᴍᴘ4*\n\n> Kirim/reply video untuk mengganti\n> File: assets/video/yamada.mp4`)
    }
    
    try {
        let buffer
        if (m.quoted && m.quoted.isMedia) {
            buffer = await m.quoted.download()
        } else if (m.isMedia) {
            buffer = await m.download()
        }
        
        if (!buffer) {
            return m.reply(`❌ Gagal mendownload video`)
        }
        
        await m.reply(`⏳ Sedang mengupload gambar...`)
        try {
            const newUrl = await updateAssetUrl('yamada-mp4', buffer, 'yamada.mp4')
            m.reply(`✅ *ʙᴇʀʜᴀsɪʟ*\n\n> File yamada.mp4 telah diganti ke URL baru:\n> ${newUrl}\n> Config telah diupdate secara realtime!`)
        } catch (e) {
            m.reply(`❌ Gagal mengupload file: ${e.message}`)
        }
    } catch (error) {
        await m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }
