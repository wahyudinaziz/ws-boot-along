import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


const CHANNEL_ID = "120363402057133599@newsletter"

const pluginConfig = {
name: "uppreset",
alias: ["uploadpreset","sendpreset"],
category: "owner",
description: "Upload preset ke channel",
usage: ".uppreset link5mb | linkxml | caption",
example: ".uppreset https://5mb.link | https://xml.link | preset jj anime",
isOwner: true,
cooldown: 5,
isEnabled: true
}

async function handler(m,{ sock }){

if(!m.text) return

const text = m.text.split("|").map(v => v.trim())

const link5mb = text[0]
const linkxml = text[1]
const captionUser = text[2] || "Preset baru"

if(!link5mb || !linkxml){
return m.reply(
`╭━━〔 *❤️ YAMADA PRESET UPLOADER* 〕━━⬣
┃
┃ *Format :*
┃
┃ .uppreset link5mb | xml | caption
┃
┃ *Contoh :*
┃ .uppreset https://5mb.link | https://xml.link | preset jj anime
┃
╰━━━━━━━━━━━━━━━━⬣`
)
}

m.react("⏳")

try{

const time = new Date().toLocaleTimeString()

const caption =
`╭━━〔 *❤️ YAMADA PRESET STORE* 〕━━⬣
┃
┃ ✨ *${captionUser}*
┃
┃ 📦 *Link 5MB*
┃ ${link5mb}
┃
┃ 📂 *Link XML*
┃ ${linkxml}
┃
┃ 👑 *Uploader*
┃ ${m.pushName}
┃
┃ ⏰ *Waktu*
┃ ${time}
┃
┃ 💌 *Ara Ara Darling~*
┃ *Preset baru sudah rilis ❤️*
┃
╰━━━━━━━━━━━━━━━━⬣`

await sock.sendMessage(
CHANNEL_ID,
{ text: caption }
)

m.react("✅")

return m.reply(
`╭━━〔 *❤️ YAMADA SYSTEM* 〕━━⬣
┃
┃ ✅ *Preset berhasil dikirim*
┃
┃ 📡 *Sudah masuk ke channel*
┃
┃ 👑 *Uploader*
┃ ${m.pushName}
┃
╰━━━━━━━━━━━━━━━━⬣`
)

}catch(e){

console.log(e)

m.react("❌")

return m.reply(
`╭━━〔 *❌ ERROR SYSTEM* 〕━━⬣
┃
┃ ${e.message}
┃
╰━━━━━━━━━━━━━━━━⬣`
)

}

}

export { pluginConfig as config, handler };
