const voiceClient = require('../../utils/VoiceClient');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("voice-leaderboard")
    .setDescription("Voire le leaderboard des membres en vocal.")
    .addNumberOption(option =>
        option.setName("jours")
            .setDescription("Nombre de jours")
            .setRequired(false)
            .addChoices(
                {
                    name: "1 jour",
                    value: 1440
                },
                {
                    name: "7 jours",
                    value: 10080
                },
                {
                    name: "14 jours",
                    value: 20160
                },
                {
                    name: "30 jours",
                    value: 43200
                }
            )
    )

module.exports = {
    admin: false,
    data,
    description: "Voire le leaderboard des membres en vocal.",
    runSlash: async (client, interaction) => {
        await interaction.deferReply({ emphemeral: true });
        const days = interaction.options.getNumber("jours");
        const embed = await voiceClient.generateLeaderboard({
            message: interaction,
            top: 10,
            guild: interaction.guild,
            time: days
        });

        const embedPrincipal = new MessageEmbed()
            .setColor(embed.color)
            .setTimestamp()
            .setTitle(embed.title)
            .setDescription(embed.description)

        interaction.followUp({ embeds: [embedPrincipal], emphemeral: false });
    }
}