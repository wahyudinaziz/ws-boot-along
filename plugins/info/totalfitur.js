import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import { getAllPlugins, getCommandsByCategory } from "../../src/lib/yamada-plugins.js"
import { getCaseCount } from "../../case/yamada.js"

const pluginConfig = {
  name: "totalfitur",
  alias: ["totalfeature", "totalcmd", "countplugin", "distribusi"],
  category: "info",
  description: "Lihat total fitur/command bot secara otomatis",
  usage: ".totalfitur",
  example: ".totalfitur",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 0,
  isEnabled: true,
}

async function handler(m) {
  try {
    const plugins = getAllPlugins().filter(p => p?.config?.isEnabled !== false)
    const commandsByCategory = getCommandsByCategory()
    const totalCommand = Object.values(commandsByCategory)
      .reduce((sum, commands) => sum + commands.length, 0)
    const totalCase = getCaseCount()
    const totalFitur = totalCommand + totalCase
    const totalKategori = Object.values(commandsByCategory)
      .filter(commands => commands.length > 0).length

    await m.reply(
      `📊 *TOTAL FITUR BOT*\n\n` +
      `🔌 Total Plugin Aktif : *${plugins.length}*\n` +
      `⚡ Total Command      : *${totalCommand}*\n` +
      `🧩 Total Case         : *${totalCase}*\n` +
      `✨ Total Fitur        : *${totalFitur}*\n` +
      `📁 Total Kategori     : *${totalKategori}*`
    )
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : String(error ?? "Unknown error")
    console.error("[TotalFitur]", error)
    return m.reply(`❌ Gagal menghitung total fitur.\n> ${errorMessage}`)
  }
}

export { pluginConfig as config, handler }
