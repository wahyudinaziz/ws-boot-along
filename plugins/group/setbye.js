import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


let handler = async (m, {
    conn, text, isROwner, isOwner, isAdmin, usedPrefix, command
}) => {
    if (text) {
        global.db.data.chats[m.chat].sBye = text
        m.reply('Bye Berhasil Diatur...\n@user [mention]')
    } else return m.reply(`Teksnya Mana..\nContoh:\nSelamat Tinggal Beban @user`)
}
handler.help = ['setbye']
handler.tags = ['group']
handler.command = /^(setbye)$/i
handler.group = true
handler.admin = true

export default handler
