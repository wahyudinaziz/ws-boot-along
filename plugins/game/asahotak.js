import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import { games } from '../../src/lib/yamada-games.js'

games.register('asahotak', {
    alias: ['asah', 'quiz'],
    emoji: '🧠',
    title: 'ASAH OTAK',
    description: 'Game asah otak - tebak jawaban'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('asahotak')
export { pluginConfig as config, handler, answerHandler }
