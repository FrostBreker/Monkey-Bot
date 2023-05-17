const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
  name: "messageDelete",
  once: false,
  async execute(client, message) {
    const logChannel = await message.guild.channels.fetch(channels.logs);
    const user = message.author;
    return await logChannel.send({
      embeds: [
        LogEmbed(
          message.guild,
          "Un message a été supprimé",
          "Message supprimée",
          `**Message**: ${message.content}\n**Channel**: <#${message.channel.id}>${message.author ? `\n**Author**: <@${user.id}>` : ""}`,
          "Red",
          user
        ),
      ],
    });
  },
};
