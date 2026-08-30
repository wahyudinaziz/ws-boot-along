import { requireYamadaCore, YAMADA_DEVELOPER } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import fs from 'fs'
import path from 'path'
import te from '../../src/lib/yamada-error.js'
const pluginConfig = {
    name: 'ganti-namadev',
    alias: ['setnamadev', 'setnamedev', 'gantideveloper'],
    category: 'owner',
    description: 'Ganti nama developer di yamada.js',
    usage: '.ganti-namadev <nama baru>',
    example: '.ganti-namadev Lucky Archz',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock, config }) {
    const newName = m.args.join(' ')
    
    if (!newName) {
        return m.reply(`👨‍💻 *ɢᴀɴᴛɪ ɴᴀᴍᴀ ᴅᴇᴠᴇʟᴏᴘᴇʀ*\n\n> Nama saat ini: *${YAMADA_DEVELOPER || '-'}*\n\n*Penggunaan:*\n\`${m.prefix}ganti-namadev <nama baru>\``)
    }
    
    try {
        const configPath = path.join(process.cwd(), 'yamada.js')
        let configContent = fs.readFileSync(configPath, 'utf8')
        
        configContent = configContent.replace(
            /export let YAMADA_DEVELOPER = \"[^\"]*\";/,
            `export let YAMADA_DEVELOPER = ${JSON.stringify(newName)};`
        )
        
        fs.writeFileSync(configPath, configContent)
        
        // Developer source lives in yamada.js; restart bot after changing it.
        await m.reply(`✅ *ʙᴇʀʜᴀsɪʟ*

> Nama developer diganti ke: *${newName}*`)
        await m.reply('💙 Restart bot agar nama developer baru dipakai di semua modul.')
        
    } catch (error) {
        await m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }
