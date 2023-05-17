const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
  name: "roleUpdate",
  once: false,
  async execute(client, oldRole, newRole) {
    const logChannel = await newRole.guild.channels.fetch(channels.logs);

    if (oldRole.name !== newRole.name) {
      return await logChannel.send({
        embeds: [
          LogEmbed(
            newRole.guild,
            "Un role a été modifié",
            "Role modifié",
            `**Ancien nom**: ${oldRole.name}\n**Nouveau nom**: ${newRole.name}`,
            "Yellow",
            undefined
          ),
        ],
      });
    } else if (oldRole.color !== newRole.color) {
      return await logChannel.send({
        embeds: [
          LogEmbed(
            newRole.guild,
            "Un role a été modifié",
            "Role modifié",
            `**Ancienne couleur**: ${oldRole.color}\n**Nouvelle couleur**: ${newRole.color}`,
            "Yellow",
            undefined
          ),
        ],
      });
    } else if (oldRole.permissions !== newRole.permissions) {
      return await logChannel.send({
        embeds: [
          LogEmbed(
            newRole.guild,
            "Un role a été modifié",
            "Role modifié",
            `**Anciennes permissions**: ${oldRole.permissions}\n**Nouvelles permissions**: ${newRole.permissions}`,
            "Yellow",
            undefined
          ),
        ],
      });
    } else if (oldRole.hoist !== newRole.hoist) {
      return await logChannel.send({
        embeds: [
          LogEmbed(
            newRole.guild,
            "Un role a été modifié",
            "Role modifié",
            `**Ancien hoist**: ${oldRole.hoist}\n**Nouveau hoist**: ${newRole.hoist}`,
            "Yellow",
            undefined
          ),
        ],
      });
    } else if (oldRole.mentionable !== newRole.mentionable) {
      return await logChannel.send({
        embeds: [
          LogEmbed(
            newRole.guild,
            "Un role a été modifié",
            "Role modifié",
            `**Ancien mentionable**: ${oldRole.mentionable}\n**Nouveau mentionable**: ${newRole.mentionable}`,
            "Yellow",
            undefined
          ),
        ],
      });
    } else if (oldRole.rawPosition !== newRole.rawPosition) {
      return await logChannel.send({
        embeds: [
          LogEmbed(
            newRole.guild,
            "Un role a été modifié",
            "Role modifié",
            `**Ancienne position**: ${oldRole.rawPosition}\n**Nouvelle position**: ${newRole.rawPosition}`,
            "Yellow",
            undefined
          ),
        ],
      });
    } else if (oldRole.managed !== newRole.managed) {
      return await logChannel.send({
        embeds: [
          LogEmbed(
            newRole.guild,
            "Un role a été modifié",
            "Role modifié",
            `**Ancien managed**: ${oldRole.managed}\n**Nouveau managed**: ${newRole.managed}`,
            "Yellow",
            undefined
          ),
        ],
      });
    }
  },
};
