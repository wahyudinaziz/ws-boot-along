import { requireYamadaCore } from "../../yamada.js";
requireYamadaCore(import.meta.url);
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Yamada MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029VbDeybN7IUYcO1whiK1k";


import { games } from '../../src/lib/yamada-games.js'

games.register('susunkata', {
    alias: ['susun', 'scramble'],
    emoji: '🔠',
    title: 'SUSUN KATA',
    description: 'Susun kata dari huruf'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('susunkata')
export { pluginConfig as config, handler, answerHandler }
