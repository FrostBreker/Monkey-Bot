const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
    name: "guildBanAdd",
    once: false,
    async execute(client, ban) {
        const logChannel = await ban.guild.channels.fetch(channels.logs);
        const user = ban.user;
        return await logChannel.send({
            embeds: [
                LogEmbed(
                    ban.guild,
                    "Un membre a été banni",
                    "Membre banni",
                    `**User**: <@${user.id}>\n**Reason**: \`\`\`${ban.reason}\`\`\``,
                    "Red",
                    user
                ),
            ],
        });
    },
};
