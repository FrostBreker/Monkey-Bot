const voiceClient = require('../../utils/VoiceClient');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "voice-leaderboard",
    admin: false,
    description: "Voire le leaderboard des membres en vocal.",
    category: "Voix",
    runSlash: async (client, interaction) => {
        await interaction.deferReply({ emphemeral: true });
        const embed = await voiceClient.generateLeaderboard({
            message: interaction,
            top: 10,
            guild: interaction.guild
        });

        const embedPrincipal = new MessageEmbed()
            .setColor(embed.color)
            .setTimestamp()
            .setTitle(embed.title)
            .setDescription(embed.description)

        interaction.followUp({ embeds: [embedPrincipal], emphemeral: false });
    }
}