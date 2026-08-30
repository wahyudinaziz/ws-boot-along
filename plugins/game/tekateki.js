import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import { games } from '../../src/lib/yamada-games.js'

games.register('tekateki', {
    alias: ['teka'],
    emoji: '🧩',
    title: 'TEKA-TEKI',
    description: 'Game teka-teki tradisional'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tekateki')
export { pluginConfig as config, handler, answerHandler }
