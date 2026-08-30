import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import util from 'util'
import te from '../../src/lib/yamada-error.js'
const pluginConfig = {
    name: 'q',
    alias: ['quoted', 'inspect'],
    category: 'tools',
    description: 'Ambil JSON message dari pesan yang direply',
    usage: '.q (reply pesan)',
    isOwner: true,
    cooldown: 3,
    isEnabled: true
}

async function handler(m) {
    if (!m.quoted) {
        return m.reply('❌ *Reply pesan yang ingin di-inspect*')
    }

    try {
        const quoted = m.quoted || {}

        await m.reply(JSON.stringify(quoted, null, 2))
    } catch (err) {
        await m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }
