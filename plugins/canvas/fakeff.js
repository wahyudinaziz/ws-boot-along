import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import axios from "axios";
import config from "../../config.js";
import { uploadTo0x0 } from "../../src/lib/yamada-tmpfiles.js";
import te from "../../src/lib/yamada-error.js";
const pluginConfig = {
  name: "fakeff",
  alias: ["fakefreefire"],
  category: "canvas",
  description: "Membuat gambar ff",
  usage: ".fakeff <text>",
  example: ".fakeff Hai cantik",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const nama = m.text;
  if (!nama) {
    return m.reply(`*FAKE FF*\n\n> Contoh: ${m.prefix}fakeff nama1`);
  }
  m.react("🕕");

  try {
    await sock.sendMedia(
      m.chat,
      `https://api.nexray.web.id/maker/fakelobyff?nickname=${encodeURIComponent(nama)}`,
      null,
      m,
      {
        type: "image",
      },
    );

    m.react("✅");
  } catch (error) {
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
