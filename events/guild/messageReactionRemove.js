const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
  name: "messageReactionRemove",
  once: false,
  async execute(client, messageReaction, user) {
    const logChannel = await messageReaction.message.guild.channels.fetch(channels.logs);
    return await logChannel.send({
      embeds: [
        LogEmbed(
          messageReaction.message.guild,
          "Une réaction a été supprimée",
          "Réaction supprimée",
          `**Message**: \`\`\`${messageReaction.message.content}\`\`\`\n**Channel**: <#${messageReaction.message.channel.id}>\n**Author**: <@${user.id}>\n**Reaction**: ${messageReaction.emoji}`,
          "Red",
          user
        ),
      ],
    });
  },
};
