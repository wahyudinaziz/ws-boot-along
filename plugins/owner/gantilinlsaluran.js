import fs from 'fs';
import path from 'path';
import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";
const pluginConfig = {
    name: 'gantilinksaluran',
    alias: ['setlinksaluran'],
    category: 'owner',
    description: 'Mengganti semua link saluran di SC',
    usage: '.gantilinksaluran|link',
    example: '.gantilinksaluran|https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k',
    isOwner: true,
    cooldown: 3,
    isEnabled: true
}

async function handler(m) {

    let msg = m.text || ""
    let input = msg.split("|")[1]

    if (!input) {
        return m.reply(`Contoh:
.gantilinksaluran|https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k`)
    }

    const newLink = input.trim()

    function scan(dir){
        const files = fs.readdirSync(dir)

        for (let file of files){
            const full = path.join(dir, file)
            const stat = fs.statSync(full)

            if (stat.isDirectory()){
                scan(full)
            } else if (file.endsWith(".js")){
                let data = fs.readFileSync(full, "utf8")

                // regex ganti semua link channel WA
                let replaced = data.replace(/https:\/\/whatsapp\.com\/channel\/[a-zA-Z0-9]+/g, newLink)

                fs.writeFileSync(full, replaced)
            }
        }
    }

    scan("./")

    await m.reply(`╭━━〔 💗 YAMADA SYSTEM 💗 〕━━⬣
┃ ✅ Link saluran berhasil diganti
┃
┃ 🔗 Link Baru :
┃ ${newLink}
┃
┃ 🔄 Bot akan restart dalam 5 detik...
╰━━━━━━━━━━━━━━━━⬣`)

    setTimeout(() => {
        process.exit()
    }, 5000)
}

export { pluginConfig as config, handler };
