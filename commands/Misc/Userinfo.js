const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Voir les info d'un compte")
    .addUserOption(option => option.setName("utilisateur").setRequired(true).setDescription("Information de cette utilisateur"))

module.exports = {
    admin: false,
    description: "Voir les info d'un compte",
    data: data,
    runSlash: async (client, interaction) => {
        const data = []
        interaction.options._hoistedOptions.forEach((x) => {
            if (x.type === "USER") {
                return data.push({ member: x.member, user: x.user });
            } else {
                return data.push(x.value);
            }
        })

        const user = data[0].user;
        const member = data[0].member;

        if (!member && !user) return interaction.reply(`${user.username}, cette utilisateur n'est pas dans ce serveur.`);

        const embed = new MessageEmbed()
            .setTitle(`Informations sur ${user.tag} (${user.id})`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: "Statut", value: member.presence ? member.presence.status : "Hors ligne", inline: true },
                { name: "Joue à", value: `${member.presence ? member.presence.activities[0] ? member.presence.activities[0].name : "Aucun jeu" : "Aucun jeu"}`, inline: true },
                { name: "Créé le", value: `${user.createdAt.toLocaleString()}`, inline: true },
                { name: "Kickable", value: member.kickable ? "Oui" : "Non", inline: true },
                { name: "Roles", value: `${member.roles.cache.map(x => "<@&" + x.id + ">").join(", ")}`, inline: true }
            )

        interaction.reply({ embeds: [embed] })
    }
}