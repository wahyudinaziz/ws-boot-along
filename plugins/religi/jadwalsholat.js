import { YAMADA_CORE_CONFIG } from "../../yamada.js";
import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import axios from "axios";
import moment from "moment-timezone";
import config from "../../config.js";
import {
  searchKota,
  getTodaySchedule,
  extractPrayerTimes,
} from "../../src/lib/yamada-sholat-api.js";
import te from "../../src/lib/yamada-error.js";
import { saluranCtx } from "../../src/lib/yamada-context.js";
const pluginConfig = {
  name: "jadwalsholat",
  alias: ["sholat", "prayertime", "jadwalsolat", "waktusolat", "waktusholat"],
  category: "religi",
  description: "Menampilkan jadwal sholat real-time dari myquran.com",
  usage: ".jadwalsholat <kota>",
  example: ".jadwalsholat Jakarta",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};
async function handler(m, { sock }) {
  const city = m.args.join(" ").trim() || "Jakarta";
  m.react("🕌");
  try {
    const kota = await searchKota(city);
    if (!kota) {
      m.react("❌");
      return m.reply(
        `❌ *ɢᴀɢᴀʟ*\n\n> Kota "${city}" tidak ditemukan\n> Coba nama kabupaten/kota lain`,
      );
    }
    const jadwalData = await getTodaySchedule(kota.id);
    const times = extractPrayerTimes(jadwalData);
    const lokasi = jadwalData.lokasi || kota.lokasi;
    const daerah = jadwalData.daerah || "";
    const today = moment.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
    const saluranId = YAMADA_CORE_CONFIG.saluran?.id || "120363400911374213@newsletter";
    const saluranName = YAMADA_CORE_CONFIG.saluran?.name || YAMADA_CORE_CONFIG.bot?.name || "yamada-ai";

    const caption = `🕌 *ᴊᴀᴅᴡᴀʟ sʜᴏʟᴀᴛ*
╭┈┈⬡「 📍 *${lokasi}* 」
┃ 📅 ${today}
┃ 🗺️ ${daerah}
╰┈┈⬡
╭┈┈⬡「 ⏰ *ᴡᴀᴋᴛᴜ sʜᴏʟᴀᴛ* 」
┃ 🌙 ɪᴍsᴀᴋ: \`${times.imsak}\`
┃ 🌅 sᴜʙᴜʜ: \`${times.subuh}\`
┃ ☀️ ᴛᴇʀʙɪᴛ: \`${times.terbit}\`
┃ 🌤️ ᴅʜᴜʜᴀ: \`${times.dhuha}\`
┃ 🌞 ᴅᴢᴜʜᴜʀ: \`${times.dzuhur}\`
┃ 🌇 ᴀsʜᴀʀ: \`${times.ashar}\`
┃ 🌆 ᴍᴀɢʜʀɪʙ: \`${times.maghrib}\`
┃ 🌃 ɪsʏᴀ: \`${times.isya}\`
╰┈┈⬡
> _Sumber: myquran.com | Jangan lupa sholat ya! 🤲_`;
    const adzanUrl = "https://files.catbox.moe/z2bj5s.mp3";
    let adzanBuffer;
    try {
      const res = await axios.get(adzanUrl, {
        responseType: "arraybuffer",
        timeout: 30000,
      });
      adzanBuffer = Buffer.from(res.data);
    } catch {
      adzanBuffer = null;
    }
    const contextInfo = saluranCtx();
    if (adzanBuffer) {
      await sock.sendMessage(
        m.chat,
        {
          audio: adzanBuffer,
          mimetype: "audio/mpeg",
          ptt: false,
          contextInfo,
        },
        { quoted: m },
      );
      await sock.sendMessage(m.chat, { text: caption }, { quoted: m });
    } else {
      await sock.sendMessage(
        m.chat,
        { text: caption, contextInfo },
        { quoted: m },
      );
    }
    m.react("✅");
  } catch (error) {
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}
export { pluginConfig as config, handler };
