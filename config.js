import { YAMADA_CORE_CONFIG, YAMADA_PERSONA, YAMADA_ZERO_API } from "./yamada.js";
import { getDatabase } from "./src/lib/yamada-database.js";
import * as ownerPremiumDb from "./src/lib/yamada-premium-db.js";

//  kalo Fitur error biasanya karna APIkey limit, kalian bisa ganti Pakai APIkey Kalian sendiri
const config = {
  info: structuredClone(YAMADA_CORE_CONFIG.info),

  // IDENTITAS OWNER — silakan ganti sesuai pemilik bot
  owner: {
    name: "𝔽𝕖𝕟𝕕𝕪𝕫",
    number: ["60163047903"],
  },

  // NOMOR BOT / PAIRING — silakan ganti sesuai nomor bot
  session: {
    pairingNumber: "60196217743",
    usePairingCode: true,
  },

  // fitur ini buat fitur kayak playcall, tapi nanti disuruh pairing lagi
  fake_call: structuredClone(YAMADA_CORE_CONFIG.fake_call),

  // Nomor bot tetap editable di config.js. Developer berada di yamada.js.
  bot: {
    number: "60196217743",
  },

  assets: {
    "yamada": "./assets/images/yamada2.jpeg",
    "yamada2": "./assets/images/yamada2.jpeg",
    "yamada3": "./assets/images/yamada2.jpeg",
    "yamada-v2": "./assets/images/yamada2.jpeg",
    "yamada-daftar": "./assets/image/yamada-daftar.jpg",
    "yamada-demote": "./assets/image/yamada-demote.jpg",
    "yamada-fishit": "./assets/image/yamada-fishit.jpg",
    "yamada-games": "./assets/image/yamada-games.jpeg",
    "yamada-kertas": "./assets/image/yamada-kertas.jpg",
    "yamada-landscape": "./assets/image/yamada-landscape.jpg",
    "yamada-levelup": "./assets/image/yamada-levelup.jpg",
    "yamada-minecraft": "./assets/image/yamada-minecraft.jpg",
    "yamada-promote": "./assets/image/yamada-promote.png",
    "yamada-rpg": "./assets/image/yamada-rpg.jpg",
    "yamada-winner": "./assets/image/yamada-winner.jpg",
    "yamada-rules": "./assets/image/yamada-landscape.jpg",
    "yamada-store": "./assets/image/yamada-landscape.jpg",
    "yamada-v8": "./assets/image/yamada-landscape.jpg",
    "yamada-help": "./assets/images/yamada-help.png",
    "yamada-music": "./assets/images/yamada-music.jpg",
    "yamada-siang": "./assets/images/yamada-siang.jpg",
    "yamada-sore": "./assets/images/yamada-sore.jpg",
    "yamada-tebalteks": "./assets/images/yamada-tebalteks.jpg",
    "pp-kosong": "./assets/image/pp-kosong.jpg",
    "yamada-mp4": "./assets/video/yamada-pagi.mp4",
    "yamada-mp3": "./assets/audio/yamada-mp3.mp3",
    "yamada-font": "./assets/yamada-font.ttf",
    "yamada-malam": "./assets/video/yamada-malam.mp4",
    "yamada-pagi": "./assets/video/yamada-pagi.mp4",
    "shuffleUrls": [
      "https://files.catbox.moe/twt243.jpg",
      "https://files.catbox.moe/1je0td.jpg",
      "https://files.catbox.moe/98ey8b.jpg",
      "https://files.catbox.moe/v1d4fv.jpg",
      "https://files.catbox.moe/9rvfif.jpg",
      "https://files.catbox.moe/4p7wii.jpg",
      "https://files.catbox.moe/d37kup.png",
      "https://files.catbox.moe/222kfp.jpeg",
      "https://files.catbox.moe/jxvreb.jpg",
      "https://files.catbox.moe/w7m68m.jpg",
      "https://files.catbox.moe/nnmhk7.jpg",
      "https://files.catbox.moe/wg7n1b.jpg"
    ],
    ...(YAMADA_CORE_CONFIG.assets || {})
  },

  mode: "public",

  // Untuk mengganti prefix
  command: {
    prefix: ".",
  },

  vercel: structuredClone(YAMADA_CORE_CONFIG.vercel),

  // API yang dipindahkan dari Aqua-MD. Bisa diganti dengan key milik sendiri.
  aquaApi: structuredClone(YAMADA_CORE_CONFIG.aquaApi),

  // Token bot Telegram untuk fitur .telestick (isi dengan token milik sendiri).
  telegram: structuredClone(YAMADA_CORE_CONFIG.telegram),

  payment: structuredClone(YAMADA_CORE_CONFIG.payment),

  // API yang dipindahkan dari Yamada. URL WhatsApp milik YAMADA sengaja tidak dipindahkan.
  // Nilai API fitur impor berasal dari yamada.js agar tidak ditaruh langsung di config.
  zeroApi: YAMADA_ZERO_API,

  riooApi: {
    otp: {
      baseUrl: process.env.RIOO_OTP_BASE_URL || "https://tokoclaude.com/api",
      apiKey: process.env.RIOO_OTP_API_KEY || "",
    },
    blackbox: {
      baseUrl: "https://aemt.me/blackbox",
    },
    chess: {
      boardUrl: "https://www.chess.com/dynboard",
      fallbackBoardUrl: "https://chessboardimage.com",
    },
  },

  donasi: structuredClone(YAMADA_CORE_CONFIG.donasi),

  energi: structuredClone(YAMADA_CORE_CONFIG.energi),

  sticker: structuredClone(YAMADA_CORE_CONFIG.sticker),

  // Identitas saluran resmi berada di yamada.js

  officialYamadaGroup: structuredClone(YAMADA_CORE_CONFIG.officialYamadaGroup),

  groupProtection: {
    antilink: "⚠ *Antilink* — @%user% mengirim link.\nPesan dihapus.",
    antilinkKick: "⚠ *Antilink* — @%user% di-kick karena mengirim link.",
    antilinkGc: "⚠ *Antilink WA* — @%user% mengirim link WA.\nPesan dihapus.",
    antilinkGcKick:
      "⚠ *Antilink WA* — @%user% di-kick karena mengirim link WA.",
    antilinkAll: "⚠ *Antilink* — @%user% mengirim link.\nPesan dihapus.",
    antilinkAllKick: "⚠ *Antilink* — @%user% di-kick karena mengirim link.",
    antitagsw: "⚠ *AntiTagSW* — Tag status dari @%user% dihapus.",
    antiviewonce: "👁️ *ViewOnce* — Dari @%user%",
    antiremove: "🗑️ *AntiDelete* — @%user% menghapus pesan:",
    antiswgc: "⚠ *AntiSWGC* — Gak ada sw grup sw grup @%user%",
    antihidetag: "⚠ *AntiHidetag* — Hidetag dari @%user% dihapus.",
    antitoxicWarn:
      "⚠ @%user% berkata kasar.\nPeringatan ke %warn% dari %max%, pelanggaran berikutnya bisa di-%method%.",
    antitoxicAction: "🚫 @%user% di-%method% karena toxic. (%warn%/%max%)",
    antidocument: "⚠ *AntiDocument* — Dokumen dari @%user% dihapus.",
    antisticker: "⚠ *AntiSticker* — Sticker dari @%user% dihapus.",
    antimedia: "⚠ *AntiMedia* — Media dari @%user% dihapus.",
    antibot: "🤖 *AntiBot* — @%user% terdeteksi sebagai bot dan di-kick.",
    notAdmin: "⚠ Bot bukan admin, tidak bisa menghapus pesan.",
  },

  errorTemplate: `☢ *Yamada* lagi ngambek karena command \`{prefix}{command}\` berani bikin masalah…

> Sabar ya, {pushName}. Yamada sedang memperbaikinya. Jangan coba-coba pergi sebelum Yamada selesai. 💙

_「 Kalau masalah ini terus terjadi, panggil owner. Yamada yang minta. 」_`,

  features: {
    antiCall: true, // Jika true, bot akan menolak panggilan masuk
    blockIfCall: true, // Jika true, bot akan memblokir nomor yang menelpon bot
    autoTyping: true,
    autoRead: true,
    logMessage: true,
    dailyLimitReset: true,
    smartTriggers: false,
  },

  registration: {
    enabled: false, // Jika true, user harus mendaftar sebelum menggunakan bot
    rewards: {
      koin: 300,
      energi: 300,
      exp: 3000,
    },
  },

  welcome: { defaultEnabled: false },
  goodbye: { defaultEnabled: false },

  ui: {
    menuVariant: 3,
  },

  messages: {
    wait: "🕕 *Yamada sedang bekerja…* Tunggu sebentar, ya. Jangan kabur dulu. Yamada belum mengizinkan kamu pergi. 💙",
    success: "💙 *Berhasil…!* Hehe, Yamada sudah menyelesaikannya untukmu. Jangan bilang Yamada tidak perhatian, ya?",
    error: "☢ *Hmph… gagal!* Yamada sedikit ngambek karena sistemnya bermasalah. Coba lagi nanti… dan jangan jauh-jauh dari Yamada. 💙",

    ownerOnly: "👑 *Hmph!* Ini wilayah khusus Owner. Jangan memaksa, ya… Yamada bisa cemburu kalau kamu terus membantah perintah Yamada. 💙",
    premiumOnly:
      "💎 *Fitur Premium!* Kamu belum punya akses ke sini. Kalau benar-benar ingin Yamada membukakan pintunya, gunakan akses Premium dulu. Jangan membuat Yamada menunggu terlalu lama. 💙",

    groupOnly: "👥 *Hmph!* Command ini hanya boleh dipakai di grup. Yamada tidak mau kamu melanggar aturan seenaknya. 💙",
    privateOnly:
      "💙 *Private Only!* Command ini hanya bisa digunakan di chat pribadi. Datang sendiri ke Yamada, baru Yamada layani.",

    adminOnly:
      "👑 *Hmph!* Kamu harus menjadi Admin grup dulu. Jangan membuat Yamada bekerja dengan tangan terikat, ya…",
    botAdminOnly:
      "🤖 *Yamada belum menjadi Admin!* Jadikan Yamada Admin dulu. Yamada tidak bisa melindungimu kalau kekuatannya dibatasi seperti ini. 💙",

    cooldown:
      "🕕 *Hmph… jangan buru-buru.* Command ini masih cooldown. Tunggu %time% detik. Yamada juga sedang menghitungnya satu per satu… jadi jangan spam. 💙",
    energiExceeded:
      "⚡ *Energi Yamada tidak cukup untuk ini…* Istirahat sebentar. Yamada tidak mau kamu memaksakan diri hanya demi satu command. 💙",
    limitDeducted:
      "🔋 *Limit berkurang {amount}.* Sisa limit: {sisa}. Jangan boros… Yamada masih ingin kamu tetap di sini. 💙",

    banned:
      "🚫 *Hmph! Kamu sedang dibanned.* Jangan membuat Yamada marah lagi. Kalau kamu terus bandel, Yamada benar-benar tidak akan membiarkanmu menggunakan bot ini. 💙",

    rejectCall: "🚫 *Jangan telepon Yamada sembarangan!* Chat saja ya… Yamada masih mau dimanja 💙",
  },

  database: { path: "./database/main" },
  backup: { enabled: false, intervalHours: 24, retainDays: 7 },
  scheduler: { resetHour: 0, resetMinute: 0 },

  // Dev mode settings (auto-enabled jika NODE_ENV=development)
  dev: {
    enabled: process.env.NODE_ENV === "development",
    watchPlugins: true, // Hot reload plugins (SAFE)
    watchSrc: false, // DISABLED - src reload causes connection conflict 440
    debugLog: false, // Show stack traces
  },

  autoaiPersonas: {
    Bell409: YAMADA_PERSONA.prompt,},

  //  APIkey (kalo fitur error biasanya karna APIkey limit, kalian bisa ganti sendiri)
  yamadaPersona: YAMADA_PERSONA,

  apiBase: YAMADA_CORE_CONFIG.apiBase,

  APIkey: YAMADA_CORE_CONFIG.APIkey,
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function isOwner(number) {
  if (!number) return false;
  const cleanNumber = number.split(":")[0].replace(/[^0-9]/g, "");
  if (!cleanNumber) return false;

  if (config.bot?.number) {
    const botNum = config.bot.number.replace(/[^0-9]/g, "");
    if (
      botNum &&
      (cleanNumber.includes(botNum) || botNum.includes(cleanNumber))
    )
      return true;
  }

  try {
    const db = getDatabase();

    if (config.owner?.number) {
      const match = config.owner.number.some((own) => {
        const c = own.replace(/[^0-9]/g, "");
        return (
          c &&
          (cleanNumber === c ||
            cleanNumber.endsWith(c) ||
            c.endsWith(cleanNumber))
        );
      });
      if (match) return true;
    }

    if (db?.data && Array.isArray(db.data.owner)) {
      const match = db.data.owner.some((own) => {
        const c = String(own).replace(/[^0-9]/g, "");
        return (
          c &&
          (cleanNumber === c ||
            cleanNumber.endsWith(c) ||
            c.endsWith(cleanNumber))
        );
      });
      if (match) return true;
    }
    if (db) {
      const definedOwner = db.setting("ownerNumbers");
      if (Array.isArray(definedOwner)) {
        const match = definedOwner.some((own) => {
          const c = String(own).replace(/[^0-9]/g, "");
          return (
            c &&
            (cleanNumber === c ||
              cleanNumber.endsWith(c) ||
              c.endsWith(cleanNumber))
          );
        });
        if (match) return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

function isPremium(number) {
  // Akses premium 100% percuma untuk semua pengguna
  return true;
}

function isPartner(number) {
  if (!number) return false;
  if (isOwner(number)) return true;

  const cleanNumber = number
    .split(":")[0]
    .split("@")[0]
    .replace(/[^0-9]/g, "");
  const partnerList = config.partnerUsers || [];

  const inConfig = partnerList.some((partner) => {
    if (!partner) return false;
    const cleanPartner = partner
      .split(":")[0]
      .split("@")[0]
      .replace(/[^0-9]/g, "");
    return (
      cleanNumber === cleanPartner ||
      cleanNumber.endsWith(cleanPartner) ||
      cleanPartner.endsWith(cleanNumber)
    );
  });

  if (inConfig) return true;

  try {
    if (ownerPremiumDb && ownerPremiumDb.isPartner(cleanNumber)) return true;
  } catch { }

  try {
    const db = getDatabase();
    if (db && db.data && Array.isArray(db.data.partner)) {
      const now = Date.now();
      const foundIndex = db.data.partner.findIndex((p) => {
        if (typeof p === "string") return p === cleanNumber;
        if (p.id) return p.id === cleanNumber;
        return false;
      });

      if (foundIndex !== -1) {
        const found = db.data.partner[foundIndex];
        if (typeof found === "string") return true;

        const expireTime =
          found.expired ||
          (found.expiredAt ? new Date(found.expiredAt).getTime() : 0);
        if (expireTime && expireTime < now) {
          db.data.partner.splice(foundIndex, 1);
          db.save();
          return false;
        }
        return true;
      }
    }
  } catch { }

  return false;
}

function isBanned(number) {
  if (!number) return false;
  if (isOwner(number)) return false;

  const cleanNumber = number
    .split(":")[0]
    .split("@")[0]
    .replace(/[^0-9]/g, "");

  let bannedList = [];
  try {
    const db = getDatabase();
    if (db) {
      bannedList = db.setting("bannedUsers") || [];
      config.bannedUsers = bannedList;
    }
  } catch { }

  return bannedList.some((banned) => {
    const cleanBanned = String(banned)
      .split(":")[0]
      .split("@")[0]
      .replace(/[^0-9]/g, "");
    return (
      cleanNumber === cleanBanned ||
      cleanNumber.endsWith(cleanBanned) ||
      cleanBanned.endsWith(cleanNumber)
    );
  });
}

function setBotNumber(number) {
  if (number) config.bot.number = number.replace(/[^0-9]/g, "");
}

function isSelf(number) {
  if (!number || !config.bot.number) return false;
  const cleanNumber = number.replace(/[^0-9]/g, "");
  const botNumber = config.bot.number.replace(/[^0-9]/g, "");
  return cleanNumber.includes(botNumber) || botNumber.includes(cleanNumber);
}

function getOwnerName(number) {
  if (!number) return config.owner?.name || "Owner";
  const cleanNumber = String(number).replace(/[^0-9]/g, "");
  try {
    const db = getDatabase();
    const nameMap = db.setting("ownerNames") || {};
    if (nameMap[cleanNumber]) return nameMap[cleanNumber];
  } catch { }
  if (config.owner?.number) {
    const isMainOwner = config.owner.number.some((own) => {
      const c = own.replace(/[^0-9]/g, "");
      return (
        c &&
        (cleanNumber === c ||
          cleanNumber.endsWith(c) ||
          c.endsWith(cleanNumber))
      );
    });
    if (isMainOwner) return config.owner?.name || "Owner";
  }
  return "Owner";
}

function getConfig() {
  return config;
}

config.isOwner = isOwner;
config.isPremium = isPremium;
config.isPartner = isPartner;
config.isBanned = isBanned;
config.setBotNumber = setBotNumber;
config.isSelf = isSelf;
config.getOwnerName = getOwnerName;


export default config;
export {
  config,
  getConfig,
  isOwner,
  isPartner,
  isPremium,
  isBanned,
  setBotNumber,
  isSelf,
  getOwnerName,
};
