const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
    name: "guildIntegrationsUpdate",
    once: false,
    async execute(client, guild) {
        const logChannel = await guild.channels.fetch(channels.logs);
        console.log(guild.name);
        return await logChannel.send({
            content: null,
            embeds: [
                LogEmbed(
                    guild,
                    "Une intégration a été mise à jour",
                    "Intégration mise à jour",
                    `**Nom**: ${guild.name}\n**ID**: ${guild.id}`,
                    "Yellow",
                    undefined
                ),
            ],
        });
    },
};
