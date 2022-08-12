const config = require("../../config");
const { clearMessages } = require("../../Embeds/Misc");
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear des messages")
    .addNumberOption(option => option.setMaxValue(100).setMinValue(2).setName("nombres").setRequired(true).setDescription("Nombres de messages"))

module.exports = {
    admin: true,
    description: "Clear des messages",
    data,
    runSlash: async (client, interaction) => {
        const data = [];
        interaction.options._hoistedOptions.forEach((x) => {
            return data.push(x.value);
        })
        const user = interaction.member.user;
        const guild = interaction.member.guild;
        const logChannel = guild.channels.cache.find(c => c.id === config.channels.log);
        const number = data[0];
        const channel = interaction.channel;

        channel.bulkDelete(number).then(() => {
            logChannel.send({ embeds: [clearMessages(user, number)], ephemeral: true });
            interaction.reply({ embeds: [clearMessages(user, number)], ephemeral: true });
        }).catch(() => {
            interaction.reply({ content: "Je ne peux pas supprimer les messages", ephemeral: true });
        })
    }
}