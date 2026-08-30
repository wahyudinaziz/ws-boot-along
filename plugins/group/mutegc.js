import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import { getDatabase } from "../../src/lib/yamada-database.js";
import { saluranCtx } from "../../src/lib/yamada-context.js";

const pluginConfig = {
  name: "mutegc",
  alias: ["mutegrup", "mutebot", "blockbot", "lockbot"],
  category: "group",
  description: "Blokir command bot untuk member, hanya admin/owner yang bisa pakai",
  usage: ".mutegc",
  example: ".mutegc",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: false,
  isAdmin: true,
  isBotAdmin: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const groupData = db.getGroup(m.chat) || {};

  if (groupData.mutegc) {
    return m.reply(
      `🔇 *Mute GC Sudah Aktif*\n\n` +
        `> Member tidak bisa menggunakan command bot di grup ini\n` +
        `> Hanya admin grup dan owner bot yang bisa akses\n\n` +
        `_Ketik *${m.prefix}unmutegc* untuk membuka_`
    );
  }

  db.setGroup(m.chat, { mutegc: true });
  const ctx = saluranCtx();
  const groupName = m.groupMetadata?.subject || "grup ini";

  return m.reply(
    `🔇 *Mute GC Aktif*\n\n` +
      `> Grup: *${groupName}*\n` +
      `> Member tidak bisa menggunakan command bot\n` +
      `> Admin grup dan owner bot tetap bisa akses\n\n` +
      `_Ketik *${m.prefix}unmutegc* untuk membuka_`,
    { contextInfo: ctx }
  );
}

function isMutegc(groupJid, db) {
  const group = db.getGroup(groupJid) || {};
  return !!group.mutegc;
}

export { pluginConfig as config, handler, isMutegc };
