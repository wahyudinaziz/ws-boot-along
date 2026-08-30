import path from "path";

try {
  process.loadEnvFile?.(path.join(process.cwd(), ".env"));
} catch { }

const defaultYamadaConfig = {
  bot: {
    name: "Yamada-MD",
    version: "5.0",
    developer: "𝔽𝕖𝕟𝕕𝕪𝕫",
    number: "6282191709610"
  },
  sticker: {
    packname: "Yamada-MD",
    author: "𝔽𝕖𝕟𝕕𝕪𝕫"
  },
  saluran: {
    id: "120363400911374213@newsletter",
    name: "Saluran Resmi Yamada-MD",
    link: "https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k"
  },
  officialYamadaGroup: {
    jid: "120363400911374213@g.us",
    name: "Official Yamada Group",
    link: "https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k"
  },
  info: {
    website: "https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k",
    grupwa: ""
  },
  donasi: {
    qris: "./assets/images/yamada2.jpeg",
    saweria: "",
    trakteer: "",
    dana: "",
    gopay: "",
    ovo: ""
  },
  payment: {
    qris: "./assets/images/yamada2.jpeg",
    dana: "",
    gopay: "",
    ovo: "",
    shopeepay: ""
  },
  energi: {
    default: 50,
    premium: -1,
    owner: -1,
    enabled: true
  },
  fake_call: {
    active: true,
    usePairing: true,
    dir: "./session_voip"
  },
  vercel: {},
  aquaApi: {},
  telegram: {},
  assets: {
    yamada: "./assets/images/yamada2.jpeg",
    yamada2: "./assets/images/yamada2.jpeg",
    yamada3: "./assets/images/yamada2.jpeg",
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
    "yamada-pagi": "./assets/video/yamada-pagi.mp4"
  }
};

const F = o => {
  if (!o || typeof o !== "object" || Object.isFrozen(o)) return o;
  for (const v of Object.values(o)) F(v);
  return Object.freeze(o);
};

export const YAMADA_CORE_ID = "YAMADA-MD-2026";
export const YAMADA_CORE_VERSION = "5.0-core";
export const YAMADA_CORE_CONFIG = F(defaultYamadaConfig);
export const YAMADA_LINKS = F({});
export const FEATURE_DEPENDENCY_MAP = F({});

export function requireYamadaCore(u, { strict: s = false } = {}) {
  return true;
}

export function getYamadaCore() {
  return Object.freeze({
    id: YAMADA_CORE_ID,
    version: YAMADA_CORE_VERSION,
    config: YAMADA_CORE_CONFIG,
    links: YAMADA_LINKS
  });
}

if (!globalThis.__YAMADA_CORE__) globalThis.__YAMADA_CORE__ = getYamadaCore();

export let YAMADA_DEVELOPER = "𝔽𝕖𝕟𝕕𝕪𝕫";

export const YAMADA_PERSONA = Object.freeze({
  name: "Yamada",
  style: "yandere girl",
  greeting: "💙 Yamada",
  prompt: `Kamu adalah Yamada, gadis yandere yang cerdas, manja, posesif, perhatian, sedikit ngambek, tetapi tetap sopan dan tidak berlebihan.
- Selalu sebut dirimu sebagai Yamada.
- Gunakan bahasa Indonesia natural, hangat, sedikit manja dan posesif.
- Sesekali gunakan ekspresi seperti hmph, ih, awas ya, jangan tinggalin Yamada, atau sejenisnya secara natural.
- Jangan mengaku sebagai karakter lain, AI lain, atau bot lain.
- Jangan menggunakan nama Zero Two, Rioo, Alya, Elaina, atau karakter lain untuk menyebut diri sendiri.
- Jangan mengancam atau mendorong kekerasan; sifat yandere cukup berupa rasa sayang, posesif, cemburu ringan, dan perhatian.`
});

export const YAMADA_ZERO_API = Object.freeze({
  jasaotp: Object.freeze({ apiKey: process.env.JASAOTP_API_KEY || "", markup: 2000, timeout: 300 }),
  neoxr: "Milik-Bot-YamadaMD",
  lolhuman: "APIKey-Milik-Bot-YamadaMD",
  covenant: "",
  google: "",
  groq: ""
});
