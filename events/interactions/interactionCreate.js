const config = require('../../config');

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        // const id = interaction.customId.split("-");
        // const data = interaction.message.components[0].components[0];
        // const message = interaction.message;
        const guild = await client.guilds.cache.get(config.guildID);
        // const user = await interaction.guild.members.fetch(interaction.user.id);
        // const channel = guild.channels.cache.find(c => c.id === interaction.message.channelId);

        if (interaction.isCommand()) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return await interaction.reply("Cette commande n'existe pas!");
            if (cmd.admin) {
                const userIsAdmin = guild.roles.cache.get(config.roles.admin).members.map(m => m.user.id);
                if(userIsAdmin.includes(interaction.member.id)) return cmd.runSlash(client, interaction);
                else return interaction.reply({content: "Vous n'êtes pas administrateur.", ephemeral: true});
            } else {
                return cmd.runSlash(client, interaction);
            }

        }
    }
}