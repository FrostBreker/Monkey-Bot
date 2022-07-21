const config = require("../../config");
const { muteUser } = require("../../Embeds/Misc");

module.exports = {
    name: "unmute",
    admin: true,
    description: "Unmute un utilisateur.",
    category: "Moderations",
    options: [
        {
            name: "utilisateur",
            description: "Utilisateur à unmute.",
            type: "USER",
            required: true
        }
    ],
    runSlash: async (client, interaction) => {
        const data = []
        interaction.options._hoistedOptions.forEach((x) => {
            if (x.type === "USER") {
                return data.push({ member: x.member, user: x.user });
            }
        })
        const user = interaction.member.user;
        const guild = interaction.member.guild;
        const logChannel = guild.channels.cache.find(c => c.id === config.channels.log);

        const muteRole = guild.roles.cache.find(r => r.name === config.roles.muted);
        if (muteRole) data[0].member.roles.remove(muteRole.id);

        logChannel.send({ embeds: [muteUser(false, data[0].user, user)] });
        data[0].user.send({ embeds: [muteUser(false, data[0].user, user)] });
        return await interaction.reply({ content: `<@${data[0].user.id}> est unmute`, ephemeral: true })
    }
}