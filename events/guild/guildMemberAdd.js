const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(client, member) {
    const logChannel = await member.guild.channels.fetch(channels.logs);
    return await logChannel.send({
      embeds: [
        LogEmbed(
          member.guild,
          "Un utilisateur a rejoint le serveur",
          "Membre rejoint",
          `**Membre**: <@${member.id}>\n**Compte créé le**: ${member.user.createdAt}\n**Rejoint le**: ${member.joinedAt}\n**Compte bot**: ${member.user.bot ? "Oui" : "Non"}\n**Nombre de membres**: ${member.guild.memberCount}\n**ID**: ${member.id}`,
          "Green",
          member.user
        ),
      ],
    });
  },
};
