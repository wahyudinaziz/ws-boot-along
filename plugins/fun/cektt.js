import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


let handler = async (m, { conn, command, text }) => {
	
    if (!text) return conn.reply(m.chat, '• *Example :* .cektt elaina', m)
	
  conn.reply(m.chat, `
╭━━━━°「 *TT nya ${text}* 」°
┃
┊• Nama : ${text}
┃• TT : ${pickRandom(['Putih','Hitam','Putih mulus','Hytam banget','Karatan ☠️'])}
┊• Pentil : ${pickRandom(['Hytam','Pink','kecil','Perfect'])}
┃• Ukuran : ${pickRandom(['Tepos','Spek Nasi KFC','Tobrut','32','34','36'])}
╰═┅═━––––––๑
`.trim(), m)
}
handler.help = ['cektt *<name>*']
handler.tags = ['fun']
handler.command = /^cekpentil|cektt/i

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
