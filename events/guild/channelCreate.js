const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
  name: "channelCreate",
  once: false,
  async execute(client, channel) {
    const logChannel = await channel.guild.channels.fetch(channels.logs);
    return await logChannel.send({
      embeds: [
        LogEmbed(
          channel.guild,
          "Un channel a été créé",
          "Channel créé",
          `**Channel**: <#${channel.id}>\n**Type**: ${channel.type}\n**Position**: ${channel.position}\n**Parent**: ${channel.parent ? channel.parent.name : "Aucun"}`,
          "Green",
          undefined
        ),
      ],
    });
  },
};
