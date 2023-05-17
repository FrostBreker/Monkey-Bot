const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
  name: "inviteDelete",
  once: false,
  async execute(client, invite) {
    const logChannel = await invite.guild.channels.fetch(channels.logs);
    const user = invite.inviter;
    return await logChannel.send({
      embeds: [
        LogEmbed(
          invite.guild,
          "Une invitation a été supprimée",
          "Invitation supprimée",
          `**Invite**: \`\`\`${invite.code}\`\`\``,
          "Red",
          user
        ),
      ],
    });
  },
};
