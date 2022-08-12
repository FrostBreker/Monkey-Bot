const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("pp")
    .setDescription("Affichier la pp de la personne mentionnée")
    .addUserOption(option => option.setName("utilisateur").setRequired(true).setDescription("Afficher la pp de cette utilisateur"))

module.exports = {
    admin: false,
    data,
    description: "Affichier la pp de la personne mentionnée",
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

        if (!user) return interaction.reply(`${user.username}, cette utilisateur n'est pas dans ce serveur.`);

        const embed = new MessageEmbed()
            .setTitle("Photo de profil de " + user.username)
            .setImage(user.avatarURL())

        interaction.reply({ embeds: [embed] })
    }
}