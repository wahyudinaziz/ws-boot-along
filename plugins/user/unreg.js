import { YAMADA_CORE_CONFIG } from "../../yamada.js";
import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import { getDatabase } from "../../src/lib/yamada-database.js";
import config from "../../config.js";
const pluginConfig = {
  name: "unreg",
  alias: ["unregister", "hapusdaftar"],
  category: "user",
  description: "Hapus data pendaftaran kamu dari bot",
  usage: ".unreg",
  example: ".unreg",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 30,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user?.isRegistered) {
    return m.reply(
      `❌ Kamu belum terdaftar!\n\n` + `> Daftar dengan \`${m.prefix}daftar\``,
    );
  }

  const saluranId = YAMADA_CORE_CONFIG.saluran?.id || "120363400911374213@newsletter";
  const saluranName = YAMADA_CORE_CONFIG.saluran?.name || YAMADA_CORE_CONFIG.bot?.name || "yamada-ai";
  const unregisteredAt = new Date().toISOString();

  db.setUser(m.sender, {
    isRegistered: false,
    regName: null,
    regAge: null,
    regGender: null,
    unregisteredAt,
  });

  await db.save();

  await sock.sendMessage(
    m.chat,
    {
      text:
        `✅ *ᴜɴʀᴇɢɪsᴛᴇʀ ʙᴇʀʜᴀsɪʟ!*\n\n` +
        `Data pendaftaran kamu sudah dihapus.\n\n` +
        `> Untuk daftar ulang: \`${m.prefix}daftar\``,
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

  m.react("✅");
}

export { pluginConfig as config, handler };
