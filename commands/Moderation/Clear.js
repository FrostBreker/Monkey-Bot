const config = require("../../config");
const { clearMessages } = require("../../Embeds/Misc");

module.exports = {
    name: "clear",
    admin: true,
    description: "Clear des messages",
    category: "Moderations",
    options: [
        {
            name: "nombres",
            description: "Nombres de messages",
            type: "NUMBER",
            required: true,
            minValue: 2,
            maxValue: 100
        }
    ],
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
        })
    }
}