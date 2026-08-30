import { YAMADA_CORE_CONFIG } from "../../yamada.js";
import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import moment from "moment-timezone";
import config from "../../config.js";
const pluginConfig = {
  name: "cekabsen",
  alias: ["listabsen", "daftarabsen", "lihathadir"],
  category: "group",
  description: "Lihat daftar peserta yang sudah absen",
  usage: ".cekabsen",
  example: ".cekabsen",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};
if (!global.absensi) global.absensi = {};
async function handler(m, { sock }) {
  const chatId = m.chat;
  if (!global.absensi[chatId]) {
    return m.reply(
      `❌ *ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴀʙsᴇɴ*\n\n` +
        `> Belum ada sesi absen di grup ini!\n\n` +
        `> Admin dapat memulai dengan\n` +
        `> *.mulaiabsen [keterangan]*`,
    );
  }
  const absen = global.absensi[chatId];
  const now = moment().tz("Asia/Jakarta");
  const dateStr = now.format("D MMMM YYYY");
  const createdDate = moment(absen.createdAt).tz("Asia/Jakarta");
  const timeStr = createdDate.format("HH:mm");
  let list = "┃ _Belum ada yang absen_";
  if (absen.peserta.length > 0) {
    list = absen.peserta
      .map((jid, i) => `┃ ${i + 1}. @${jid.split("@")[0]}`)
      .join("\n");
  }
  const saluranId = YAMADA_CORE_CONFIG.saluran?.id || "120363400911374213@newsletter";
  const saluranName = YAMADA_CORE_CONFIG.saluran?.name || YAMADA_CORE_CONFIG.bot?.name || "yamada-ai";
  await m.reply(
    `📋 *DAFTAR YANG UDAH ABSEN*\n\n` +
      `╭┈┈⬡「 📋 *INFO* 」\n` +
      `┃ 📝 ${absen.keterangan}\n` +
      `┃ 📅 ${dateStr}\n` +
      `┃ ⏰ Dimulai: ${timeStr}\n` +
      `┃ 👑 Dibuat: @${absen.createdBy.split("@")[0]}\n` +
      `├┈┈⬡「 👥 *PESERTA (${absen.peserta.length})* 」\n` +
      `${list}\n` +
      `╰┈┈┈┈┈┈┈┈⬡\n\n` +
      `Ketik *${m.prefix}absen* untuk hadir`,
    { mentions: [...absen.peserta, absen.createdBy] },
  );
}
export { pluginConfig as config, handler };
