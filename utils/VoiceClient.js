const { VoiceClient } = require('../djs-voice');
const { client } = require('../main');
require('dotenv').config();
const DBCONECTION = process.env.DBCONECTION;

const voiceClient = new VoiceClient({
    allowBots: false,
    client: client,
    debug: true,
    mongooseConnectionString: DBCONECTION
})

module.exports = voiceClient;