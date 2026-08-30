import { YAMADA_CORE_CONFIG } from "../../yamada.js";
import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import axios from "axios";
import config from "../../config.js";
import te from "../../src/lib/yamada-error.js";
const pluginConfig = {
  name: "android1-get",
  alias: ["an1get", "an1dl"],
  category: "search",
  description: "Download APK dari Android1",
  usage: ".android1-get <url>",
  example: ".android1-get https://an1.com/xxx",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 15,
  energi: 1,
  isEnabled: true,
};

const NEOXR_APIKEY = config.APIkey?.neoxr || "Milik-Bot-YamadaMD";

async function handler(m, { sock }) {
  const url = m.text?.trim();

  if (!url || !url.includes("an1.com")) {
    return m.reply(`❌ URL tidak valid! Harus URL dari an1.com`);
  }

  m.react("🕕");

  try {
    const { data } = await axios.get(
      `https://api.neoxr.eu/api/an1-get?url=${encodeURIComponent(url)}&apikey=${NEOXR_APIKEY}`,
      {
        timeout: 60000,
      },
    );

    if (!data?.status || !data?.data) {
      throw new Error("Gagal mengambil detail APK");
    }

    const app = data.data;
    const saluranId = YAMADA_CORE_CONFIG.saluran?.id || "120363400911374213@newsletter";
    const saluranName = YAMADA_CORE_CONFIG.saluran?.name || YAMADA_CORE_CONFIG.bot?.name || "yamada-ai";
    if (app.url) {
      await sock.sendMessage(
        m.chat,
        {
          document: { url: app.url },
          fileName: app.name,
          mimetype: "application/vnd.android.package-archive",
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
          },
        },
        { quoted: m },
      );

      m.react("✅");
    } else {
      let caption = `> ⚠️ Download URL tidak tersedia`;

      await sock.sendMessage(
        m.chat,
        {
          text: caption,
          contextInfo: {
            forwardingScore: 9999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: saluranId,
              newsletterName: saluranName,
              serverMessageId: 127,
            },
          },
          interactiveButtons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 Buka di Browser",
                url: url,
              }),
            },
          ],
        },
        { quoted: m },
      );

      m.react("⚠️");
    }
  } catch (err) {
    console.log(err);
    m.react("☢");
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
