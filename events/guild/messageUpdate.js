const { channels } = require("../../config");
const { LogEmbed } = require("../../embeds/Logs");

module.exports = {
    name: "messageUpdate",
    once: false,
    async execute(client, oldMess, newMessage) {
        const logChannel = await newMessage.guild.channels.fetch(channels.logs);
        if (newMessage.author.bot || oldMess.content === newMessage.content) return;

        if (newMessage.content !== oldMess.content) {
            return await logChannel.send({
                embeds: [
                    LogEmbed(
                        newMessage.guild,
                        "Un message a été modifié",
                        "Message modifié",
                        `**Ancien message**: ${oldMess.content}\n**Nouveau message**: ${newMessage.content}`,
                        "Yellow",
                        newMessage.author
                    ),
                ],
            });
        } else if (oldMess.attachments !== newMessage.attachments) {
            return await logChannel.send({
                embeds: [
                    LogEmbed(
                        newMessage.guild,
                        "Un message a été modifié",
                        "Message modifié",
                        `**Ancien message**: ${oldMess.attachments}\n**Nouveau message**: ${newMessage.attachments}`,
                        "Yellow",
                        newMessage.author
                    ),
                ],
            });
        } else if (oldMess.embeds !== newMessage.embeds) {
            return await logChannel.send({
                embeds: [
                    LogEmbed(
                        newMessage.guild,
                        "Un message a été modifié",
                        "Message modifié",
                        `**Ancien message**: ${oldMess.embeds}\n**Nouveau message**: ${newMessage.embeds}`,
                        "Yellow",
                        newMessage.author
                    ),
                ],
            });
        } else if (oldMess.mentions !== newMessage.mentions) {
            return await logChannel.send({
                embeds: [
                    LogEmbed(
                        newMessage.guild,
                        "Un message a été modifié",
                        "Message modifié",
                        `**Ancien message**: ${oldMess.mentions}\n**Nouveau message**: ${newMessage.mentions}`,
                        "Yellow",
                        newMessage.author
                    ),
                ],
            });
        } else if (oldMess.pinned !== newMessage.pinned) {
            return await logChannel.send({
                embeds: [
                    LogEmbed(
                        newMessage.guild,
                        "Un message a été modifié",
                        "Message modifié",
                        `**Ancien message**: ${oldMess.pinned}\n**Nouveau message**: ${newMessage.pinned}`,
                        "Yellow",
                        newMessage.author
                    ),
                ],
            });
        }
    },
};
