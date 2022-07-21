const config = require("../../config");
const { userGoToGoulag } = require("../../Embeds/Misc");

module.exports = {
    name: "ungoulag",
    admin: true,
    description: "Retire un utilisateur du goulag!",
    category: "Goulag",
    options: [
        {
            name: "utilisateur",
            description: "Utilisateur à retirer du goulag",
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
        const member = interaction.member.user;
        const guild = interaction.member.guild;
        const logChannel = guild.channels.cache.find(c => c.id === config.channels.log);

        let memberRoles = guild.roles.cache.find(r => r.name === config.roles.goulag);
        if (memberRoles) data[0].member.roles.remove(memberRoles.id);

        logChannel.send({ embeds: [userGoToGoulag(false, data[0].user, member)] })
        data[0].user.send({ embeds: [userGoToGoulag(false, data[0].user, member)] });
        return await interaction.reply({ content: `<@${data[0].user.id}> à bien été retirer du goulag!`, ephemeral: true })
    }
}