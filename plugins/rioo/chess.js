import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
import { config } from "../../src/lib/yamada-rioo-bridge.js";
import { Chess } from "chess.js";

const games = new Map();

const pluginConfig = {
  name: "yamada-chess",
  alias: ["chess", "catur"],
  category: "game",
  description: "Permainan catur 2 pemain dari Yamada",
  usage: ".chess create|join|start|delete|<dari> <ke>",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: false,
  cooldown: 2,
  energi: 0,
  isEnabled: true,
};

function boardUrl(fen, black) {
  const encoded = encodeURIComponent(fen);
  const flip = black ? "" : "&flip=true";
  return `${config.riooApi.chess.boardUrl}?fen=${encoded}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flip}`;
}

async function sendBoard(m, game, sock) {
  const current = game.currentTurn === game.white ? "Putih" : "Hitam";
  const url = boardUrl(game.chess.fen(), game.currentTurn === game.black);
  try {
    await sock.sendMessage(m.chat, {
      image: { url },
      caption: `♟️ *Giliran:* ${current} @${game.currentTurn.split("@")[0]}`,
      mentions: [game.currentTurn],
    }, { quoted: m });
  } catch {
    const encoded = encodeURIComponent(game.chess.fen());
    const fallback = `${config.riooApi.chess.fallbackBoardUrl}/${encoded}${game.currentTurn === game.black ? "" : "-flip"}.png`;
    await sock.sendMessage(m.chat, {
      image: { url: fallback },
      caption: `♟️ *Giliran:* ${current} @${game.currentTurn.split("@")[0]}`,
      mentions: [game.currentTurn],
    }, { quoted: m });
  }
}

async function handler(m, { sock }) {
  const key = m.chat;
  const feature = (m.args[0] || "help").toLowerCase();
  let game = games.get(key);

  if (feature === "help") return m.reply(`♟️ *CHESS / CATUR*\n\n${m.prefix}chess create — buat game\n${m.prefix}chess join — bergabung\n${m.prefix}chess start — mulai\n${m.prefix}chess e2 e4 — gerakkan bidak\n${m.prefix}chess delete — hentikan game`);
  if (feature === "delete") { games.delete(key); return m.reply("🏳️ Permainan catur dihentikan."); }
  if (feature === "create") {
    if (game) return m.reply("⚠️ Permainan sudah ada di grup ini.");
    game = { chess: new Chess(), players: [], white: null, black: null, currentTurn: null };
    games.set(key, game);
    return m.reply("🎮 Permainan catur dibuat. Ketik *chess join* untuk bergabung.");
  }
  if (!game) return m.reply(`Belum ada game. Ketik *${m.prefix}chess create* terlebih dahulu.`);

  if (feature === "join") {
    if (game.players.includes(m.sender)) return m.reply("Kamu sudah bergabung.");
    if (game.players.length >= 2) return m.reply("Pemain sudah penuh.");
    game.players.push(m.sender);
    if (game.players.length === 1) return m.reply("🙋 Kamu bergabung. Menunggu pemain kedua.");
    [game.white, game.black] = Math.random() < 0.5 ? game.players : [game.players[1], game.players[0]];
    game.currentTurn = game.white;
    return m.reply(`🙌 Dua pemain siap!\nPutih: @${game.white.split("@")[0]}\nHitam: @${game.black.split("@")[0]}\n\nKetik *${m.prefix}chess start*`, { mentions: game.players });
  }

  if (feature === "start") {
    if (game.players.length !== 2 || !game.white || !game.black) return m.reply("⚠️ Butuh 2 pemain.");
    return sendBoard(m, game, sock);
  }

  if (m.args.length >= 2) {
    if (game.players.length !== 2) return m.reply("⚠️ Butuh 2 pemain.");
    if (game.currentTurn !== m.sender) return m.reply(`⏳ Sekarang giliran @${game.currentTurn.split("@")[0]}.`, { mentions: [game.currentTurn] });
    try { game.chess.move({ from: feature, to: m.args[1], promotion: "q" }); }
    catch { return m.reply("❌ Langkah tidak valid."); }
    if (game.chess.isCheckmate()) {
      const winner = m.sender;
      games.delete(key);
      return m.reply(`🏆 *CHECKMATE!*\nPemenang: @${winner.split("@")[0]}`, { mentions: [winner] });
    }
    if (game.chess.isDraw()) { games.delete(key); return m.reply("🤝 Game berakhir draw."); }
    game.currentTurn = game.currentTurn === game.white ? game.black : game.white;
    return sendBoard(m, game, sock);
  }

  return m.reply(`❓ Perintah tidak dikenal. Ketik *${m.prefix}chess help*.`);
}

export { pluginConfig as config, handler };
