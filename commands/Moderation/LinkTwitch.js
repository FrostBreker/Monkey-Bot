const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const { User } = require("../../schemas");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Supprimer un nombre de messages spécifié.")
        .setDefaultMemberPermissions(8)
        .addNumberOption(option => option.setName("user").setDescription("ID de l'utilisateur à lier.").setRequired(true)),
    runSlash: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const user = await User.findOne({ id: interaction.user.id });
        if (user) return await interaction.editReply({ content: "Vous avez déjà lié votre compte Twitch avec votre compte Discord." });
        else await User.create({
            userId: interaction.user.id,
            username: interaction.user.username,
            profile_picture: interaction.user.avatarURL()
        });
        await interaction.editReply({
            conetnt: null,
            embeds: [
                new EmbedBuilder()
                    .setTitle("Lien Twitch")
                    .setDescription("Pour lier votre compte Twitch avec votre compte Discord, rendez-vous sur [cette page](https://twitch.tv/activate) et entrez le code suivant :")
                    .addFields([{ name: "Code", value: "```" + interaction.user.id + "```" }])
                    .setColor("Random")
                    .setTimestamp()
            ]
        });
    }
}