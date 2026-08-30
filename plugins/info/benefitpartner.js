import { YAMADA_CORE_CONFIG } from "../../yamada.js";
import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import config from '../../config.js'
const pluginConfig = {
    name: 'benefitpartner',
    alias: ['partnerbenefits', 'keuntunganpartner'],
    category: 'info',
    description: 'Lihat keuntungan menjadi partner bot',
    usage: '.benefitpartner',
    example: '.benefitpartner',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m) {

    const prefix = m.prefix || '.'

    let txt = `🤝 *BENEFIT PARTNER*\n\n`
    txt += `Keuntungan menjadi partner ${YAMADA_CORE_CONFIG.bot?.name || 'Bot'}:\n\n`

    txt += `🔓 *Akses Fitur*\n`
    txt += `├ Semua fitur premium terbuka\n`
    txt += `├ Energi & koin unlimited\n`
    txt += `├ Akses command owner tertentu\n`
    txt += `└ Prioritas support\n\n`

    txt += `💎 *Bonus*\n`
    txt += `├ +200.000 EXP saat aktivasi\n`
    txt += `├ +20.000 Koin saat aktivasi\n`
    txt += `├ Badge partner di profil\n`
    txt += `└ Akses early feature\n\n`

    txt += `💰 *Cara Jadi Partner*\n`
    txt += `├ Hubungi owner: ${config.owner?.name || 'Owner'}\n`
    txt += `├ Durasi: 30/60/90 hari\n`
    txt += `└ Command: \`${prefix}addpartner\` (owner only)\n\n`

    txt += `📋 *Command Partner*\n`
    txt += `├ \`${prefix}cekpartner\` — Cek status partner\n`
    txt += `├ \`${prefix}cekprem\` — Cek status premium\n`
    txt += `├ \`${prefix}cekowner\` — Cek role user\n`
    txt += `└ \`${prefix}listpartner\` — Daftar partner\n\n`

    txt += `> _Hubungi owner untuk info lebih lanjut_`

    await m.reply(txt)
}

export { pluginConfig as config, handler }
