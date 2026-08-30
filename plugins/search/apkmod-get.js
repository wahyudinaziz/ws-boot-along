import { YAMADA_CORE_CONFIG } from "../../yamada.js";
import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import axios from "axios";
import config from "../../config.js";
import te from "../../src/lib/yamada-error.js";
const pluginConfig = {
  name: "apkmod-get",
  alias: ["apkmodget", "getapkmod"],
  category: "search",
  description: "Download APK MOD dari hasil pencarian",
  usage: ".apkmod-get <no> <query>",
  example: ".apkmod-get 1 vpn",
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
  const args = m.args || [];
  const no = parseInt(args[0]);
  const query = args.slice(1).join(" ");

  if (!no || !query) {
    return m.reply(`❌ Format: \`${m.prefix}apkmod-get <no> <query>\``);
  }

  m.react("🕕");

  try {
    const { data } = await axios.get(
      `https://api.neoxr.eu/api/apkmod?q=${encodeURIComponent(query)}&no=${no}&apikey=${NEOXR_APIKEY}`,
      {
        timeout: 60000,
      },
    );

    if (!data?.status || !data?.data) {
      throw new Error("Gagal mengambil detail APK");
    }

    const app = data.data;
    const file = data.file;

    const saluranId = YAMADA_CORE_CONFIG.saluran?.id || "120363400911374213@newsletter";
    const saluranName = YAMADA_CORE_CONFIG.saluran?.name || YAMADA_CORE_CONFIG.bot?.name || "yamada-ai";

    if (file?.url) {
      await sock.sendMessage(
        m.chat,
        {
          document: { url: file.url?.trim() },
          fileName: file.filename || `${app.name}.apk`,
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
        },
        { quoted: m },
      );

      m.react("⚠️");
    }
  } catch (err) {
    m.react("☢");
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
