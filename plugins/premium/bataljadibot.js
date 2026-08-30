import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: 𝔸𝕀\nFitur SC Bot 𝕐𝕒𝕞𝕒𝕕𝕒 𝕄𝔻 👑\nTiktok: https://tiktok.com/@pndyzzz\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


const cancelJadibot = new Set()

const pluginConfig = {
  name: "bataljadibot",
  alias: ["canceljadibot", "stopjadibotstart"],
  category: "premium",
  description: "Batalkan proses jadibot yang sedang dimulai",
  usage: ".bataljadibot",
  example: ".bataljadibot",
  isOwner: false,
  isPremium: true,
  isGroup: false,
  cooldown: 5,
  isEnabled: true,
}

async function handler(m) {

  const userJid = m.sender

  cancelJadibot.add(userJid)

  await m.reply(
`🌸 *𝕐𝕒𝕞𝕒𝕕𝕒 NOTICE*

Baik sayang~

Proses *jadibot* sudah
Yamada batalkan ya 💕

Kalau ingin mencoba lagi
silakan ketik *.jadibot* ✨`
  )

}

export { pluginConfig as config, handler, cancelJadibot };
