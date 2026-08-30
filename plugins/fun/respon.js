const pluginConfig = {
    name: "autoyamada",
    alias: [],
    category: "fun",
    description: "Auto respon jika ada yang menyebut Yamada",
    usage: ".autoyamada on/off",
    example: ".autoyamada on",
    cooldown: 3
}

// global agar tidak reset saat hot reload
if (!global.autoYamada) global.autoYamada = false

async function handler(m) {

    const text = (m.text || "").toLowerCase()
    const args = text.split(" ")[1]

    if (!args) {
        return m.reply(
`╭─〔 ❤️ YAMADA AUTO RESPON 〕
│
│ 📌 Perintah:
│ • .autoyamada on
│ • .autoyamada off
│
│ Yamada akan otomatis
│ merespon jika namanya disebut.
│
╰────────────`
        )
    }

    if (args === "on") {
        global.autoYamada = true

        return m.reply(
`╭─〔 ❤️ YAMADA 〕
│
│ Ara ara~
│ Auto respon sekarang *AKTIF*
│
│ Panggil aku kapan saja
│ Darling~
│
╰────────────`
        )
    }

    if (args === "off") {
        global.autoYamada = false

        return m.reply(
`╭─〔 YAMADA 〕
│
│ Hmph!
│ Auto respon dimatikan.
│
│ Sampai jumpa Darling~
│
╰────────────`
        )
    }

}

async function before(m, { sock }) {

    if (!global.autoYamada) return

    const text = (m.text || "").toLowerCase()

    const trigger = [

        "Yamada",
        "yamada",
        "02",
        "yamada",
        "zero2",
        "Yamada ai",
        "yamada ai",
        "bot Yamada",
        "Yamada bot",
        "02 ai",
        "darling Yamada",
        "yamadaoo",
        "Yamadaoo",
        "02 darling",
        "yamada chan",
        "yamada-chan"

    ]

    if (!trigger.some(v => text.includes(v))) return

    const name = m.pushName || "Darling"

    const respon = [

`╭─〔 ❤️ YAMADA 〕
│
│ Ara ara~
│ ${name} memanggilku?
│
│ Ada yang bisa
│ Yamada bantu?
│
╰────────────`,

`╭─〔 YAMADA 〕
│
│ Fufu~
│ Aku mendengar
│ namaku disebut.
│
│ Halo ${name}.
│
╰────────────`,

`╭─〔 YAMADA 〕
│
│ Eh?
│ ${name} kangen aku ya?
│
│ Darling lucu~
│
╰────────────`,

`╭─〔 YAMADA 〕
│
│ Ara ara~
│ Jangan panggil aku
│ sembarangan.
│
│ ...tapi kalau kamu
│ boleh ${name}.
│
╰────────────`,

`╭─〔 YAMADA 〕
│
│ Hmph!
│ Siapa yang memanggil
│ Yamada?
│
│ Oh ternyata kamu~
│
╰────────────`,

`╭─〔 YAMADA 〕
│
│ Darling ${name}~
│ Kamu memanggilku?
│
│ Aku datang ❤️
│
╰────────────`,

`╭─〔 YAMADA 〕
│
│ Fufu~
│ Aku merasa
│ seseorang menyebutku.
│
│ Hai ${name}.
│
╰────────────`,

`╭─〔 YAMADA 〕
│
│ Eh ${name}!
│ Kamu memanggil
│ Yamada?
│
│ Aku disini~
│
╰────────────`

]

    const random = respon[Math.floor(Math.random() * respon.length)]

    await sock.sendMessage(m.chat, { text: random }, { quoted: m })

}
export { pluginConfig as config, handler, before };