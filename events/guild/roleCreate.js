const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
  name: "roleCreate",
  once: false,
  async execute(client, role) {
    const logChannel = await role.guild.channels.fetch(channels.logs);
    return await logChannel.send({
      embeds: [
        LogEmbed(
          role.guild,
          "Un role a été ajouté",
          "Role ajouté",
          `**Role**: <@&${role.id}>`,
          "Green",
          undefined
        ),
      ],
    });
  },
};
