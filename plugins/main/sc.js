import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import { getAssetBuffer } from "../../src/lib/yamada-asset-manager.js";
import config from "../../config.js"

const pluginConfig = {
    name: "sc",
    alias: ["script"],
    category: "main",
    description: "Script bot wa yang sudah di optimalkan",
    usage: ".sc",
    example: ".sc",
    isPremium: false,
    isOwner: false,
    isBanned: false,
    isAdmin: false,
    cooldown: 10,
    energi: 0,
    isBotAdmin: false,
    isEnabled: true
}

async function handler(m, { sock }) {
    return await sock.sendMessage(m.chat, {
        image: getAssetBuffer("yamada"),
        caption: `😄 Halo kak *${m.pushName}*
        
Untuk Script bot gratis?, kamu bisa dapatkan melalui link ini`,
        footer: "🎯 Link ini nanti akan mengarahkan kamu ke Saluran Resmi*Anita-SC*",
        interactiveButtons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Anita SC",
                    url: "https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k",
                    merchant_url: "https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k"
                })
            }
        ]

    }, { quoted: m })
}

export { pluginConfig as config, handler }
