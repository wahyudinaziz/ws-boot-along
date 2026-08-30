import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import te from "../../src/lib/yamada-error.js";
import yamadaApi from "../../src/lib/yamada-apimanager.js";
const pluginConfig = {
  name: "sendngl",
  alias: [],
  category: "tools",
  description: "Send NGL",
  usage: ".sendngl <url> | <text>",
  example: ".sendngl https://ngl.link/xxxx | hai",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.text?.split("|");
  const [link, kata] = text;
  if (!link)
    return m.reply(
      `*LINK NGL NYA MANA ??*\nContoh: \`${m?.prefix}sendngl https://ngl.link/xxxx | hai`,
    );
  if (!kata)
    return m.reply(
      `*KATA KATA NYA MANA ??*\n\nContoh: \`${m?.prefix}sendngl https://ngl.link/xxxx | hai`,
    );
  m.react("🎴");

  try {
    await yamadaApi.cuki.sendNgl(
      {
        link,
        text: kata,
      },
      {
        timeout: 30000,
      },
    );

    m.react("✅");

    await sock.sendMessage(
      m.chat,
      {
        text: `✅ *DONE*\n\nBerhasil mengirim pesan!\nTarget: ${link}\nPesan: ${kata}`,
      },
      { quoted: m },
    );
  } catch (error) {
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
