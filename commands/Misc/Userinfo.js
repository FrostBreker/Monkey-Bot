const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Voir les informations d'un utilisateur.")
        .setDescriptionLocalization("en-US", "See an user's informations.")
        .addUserOption(option => option.setName("utilisateur").setDescription("Utilisateur").setNameLocalization("en-US", "user").setDescriptionLocalization("en-US", "User")),
    runSlash: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        const targetUser = await interaction.options.getUser("utilisateur") ? await interaction.options.getUser("utilisateur") : interaction.user;
        if (!targetUser) return await interaction.editReply({ content: "Utilisateur introuvable.", ephemeral: true });
        const member = await interaction.guild.members.fetch(targetUser.id);
        await interaction.editReply({
            content: null,
            embeds: [
                new EmbedBuilder()
                    .setTitle("Informations de l'utilisateur")
                    .setDescription(`Informations de ${targetUser.tag}:`)
                    .addFields(
                        { name: "ID", value: targetUser.id, inline: true },
                        { name: "Bot", value: targetUser.bot ? "Oui" : "Non", inline: true },
                        { name: "Création du compte", value: targetUser.createdAt.toLocaleString("fr-FR"), inline: true },
                        { name: "Avatar", value: `[Lien](${targetUser.displayAvatarURL({ dynamic: true })})`, inline: true },
                        { name: "Statut", value: member.presence ? member.presence.status : "Hors ligne", inline: true },
                        { name: "Joue à", value: `${member.presence ? member.presence.activities[0] ? member.presence.activities[0].name : "Aucun jeu" : "Aucun jeu"}`, inline: true },
                        { name: "Kickable", value: member.kickable ? "Oui" : "Non", inline: true },
                        { name: "Roles", value: `${member.roles.cache.map(x => "<@&" + x.id + ">").join(", ")}`, inline: true }
                    )
                    .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                    .setColor(null)
                    .setTimestamp()
            ]
        });
    }
}