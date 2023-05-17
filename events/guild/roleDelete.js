const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
  name: "roleDelete",
  once: false,
  async execute(client, role) {
    const logChannel = await role.guild.channels.fetch(channels.logs);
    return await logChannel.send({
      embeds: [
        LogEmbed(
          role.guild,
          "Un role a été supprimé",
          "Role supprimé",
          `**Role**: ${role.name}`,
          "Red",
          undefined
        ),
      ],
    });
  },
};
