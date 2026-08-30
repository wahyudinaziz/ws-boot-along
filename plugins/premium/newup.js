import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: 𝔸𝕀\nFitur SC Bot 𝕐𝕒𝕞𝕒𝕕𝕒 𝕄𝔻 👑\nTiktok: https://tiktok.com/@pndyzzz\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


async function newup(m, { conn }) {
  const text = `╭━━━〔 ✦ 𝕐𝔸𝕄𝔸𝔻𝔸 𝕌ℙ𝔻𝔸𝕋𝔼 ✦ 〕━━━╮
┃
┃  📢 UPDATE TERBARU
┃
┃  ✦ Gojo Merge
┃  • Fitur Gojo yang benar-benar belum
┃    ada di Yamada telah ditambahkan.
┃  • Command dibuat pendek dan disesuaikan
┃    dengan struktur Yamada-MD.
┃  • Fitur yang sudah ada tidak diduplikasi.
┃
┃  ✦ NIVID
┃  • Command: .nivid
┃  • Mengirim direct video URL sebagai MP4.
┃  • Sumber URL:
┃    src/data/Nita/anita.json
┃  • Jika satu URL gagal, sistem mencoba
┃    URL berikutnya.
┃
┃  ✦ Kompatibilitas
┃  • Handler mengikuti struktur Yamada-MD.
┃  • Error ditangani agar kegagalan command
┃    tidak membuat bot crash.
┃
┃  🔧 COMMAND BARU
┃  • .nivid
┃  • .newup
┃
┃  📌 Catatan
┃  • Isi anita.json dengan direct URL video
┃    milik kamu sendiri.
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  try {
    await conn.sendMessage(
      m.chat,
      { text },
      { quoted: m }
    )
  } catch (err) {
    console.error('[NEWUP]', err)
  }
}

newup.help = ['newup']
newup.tags = ['info']
newup.command = ['newup']

export default newup
