const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
  name: "channelDelete",
  once: false,
  async execute(client, channel) {
    if (channel.type === "DM" || !channel.guild) return;
    const logChannel = await channel.guild.channels.fetch(channels.logs);
    return await logChannel.send({
      embeds: [
        LogEmbed(
          channel.guild,
          "Un channel a été supprimé",
          "Channel supprimé",
          `**Channel**: ${channel.name}\n**Type**: ${channel.type}\n**Position**: ${channel.position}\n**Parent**: ${channel.parent ? channel.parent.name : "Aucun"}`,
          "Red",
          undefined
        ),
      ],
    });
  },
};
