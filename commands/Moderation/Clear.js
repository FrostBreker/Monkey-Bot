const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorCommand, successCommand } = require("../../embeds/Moderation");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Supprimer un nombre de messages spécifié.")
        .setDescriptionLocalization("en-US", "Delete a specified number of messages.")
        .setDefaultMemberPermissions(8)
        .addNumberOption(option => option.setName("nombre").setDescription("Nombre de messages à supprimer.").setRequired(true).setNameLocalization("en-US", "number").setDescriptionLocalization("en-US", "Number of messages to delete.").setMinValue(1).setMaxValue(50)),
    runSlash: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        const number = interaction.options.getNumber("nombre");
        const channel = interaction.channel;
        const messages = await channel.messages.fetch({ limit: number });
        await channel.bulkDelete(messages).then(async () => {
            await interaction.editReply({
                content: null, embeds: [
                    successCommand("Clear", `✅ J'ai supprimé **${number}** messages. ✅`)
                ]
            });
        }).catch(async (err) => {
            await interaction.editReply({
                content: null, embeds: [
                    errorCommand("Clear", `⚠️ **Une erreur est survenue lors de la suppression des messages.** ⚠️\n\n\`\`\`${err.rawError.message}\`\`\`\n**Code d'erreur:** \`\`\`${err.rawError.code}\`\`\``)
                ]
            });
        });
    }
}