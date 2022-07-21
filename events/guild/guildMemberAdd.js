const config = require("../../config");
const { newUsers } = require("../../Embeds/Misc");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        if (member.guild.id !== config.guildID) return;
        const guild = client.guilds.cache.find((g) => g.id === config.guildID); //Get the guild
        const findChannel = guild.channels.cache.find(c => c.id === config.channels.newUsers); //Check if channel exist
        const rulesChannel = guild.channels.cache.find(c => c.id === config.channels.rules); //Check if channel exist

        if (findChannel) {
            findChannel.send({ embeds: [newUsers(member, rulesChannel.id)] }).then((msg) => {
                msg.react("👋")
            })
        };
    }
}