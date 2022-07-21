const voiceClient = require("../../utils/VoiceClient");

module.exports = {
    name: "voiceStateUpdate",
    once: false,
    async execute(client, oldSate, newState) {
        voiceClient.startListener(oldSate, newState);
    }
}