const config = require("../../config");
const ms = require("ms");
const { muteUser } = require("../../Embeds/Misc");
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute un utilisateur.")
    .addStringOption(option =>
        option.setName("temps")
            .setDescription("Temps de mute")
            .setRequired(true)
            .addChoices(
                { name: "1s", value: "1s" },
                { name: "1m", value: "1m" },
                { name: "1h", value: "1h" },
                { name: "1d", value: "1d" }
            )
    )
    .addUserOption(option => option.setName("utilisateur").setRequired(true).setDescription("Utilisateur à mute"))


module.exports = {
    admin: true,
    description: "Mute un utilisateur.",
    data,
    runSlash: async (client, interaction) => {
        const data = []
        interaction.options._hoistedOptions.forEach((x) => {
            if (x.type === "USER") {
                return data.push({ member: x.member, user: x.user });
            } else {
                return data.push(x.value);
            }
        })
        const user = interaction.member.user;
        const guild = interaction.member.guild;
        const logChannel = guild.channels.cache.find(c => c.id === config.channels.log);

        let muteRole = guild.roles.cache.find(r => r.name === config.roles.muted);

        if (!muteRole) {
            muteRole = await guild.roles.create({
                name: config.roles.muted,
                color: "#000",
                permissions: []
            })

            guild.channels.cache.forEach(async (channel, id) => {
                await channel.permissionOverwrites.edit(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    CONNECT: false
                })
            });
        }

        await data[0].member.roles.add(muteRole.id);

        setTimeout(() => {
            data[0].member.roles.remove(muteRole.id);
            logChannel.send({ embeds: [muteUser(false, data[0].user, user, ms(data[1]))] });
            data[0].user.send({ embeds: [muteUser(false, data[0].user, user, ms(data[1]))] });
        }, ms(data[1]));

        logChannel.send({ embeds: [muteUser(true, data[0].user, user, ms(data[1]))] });
        data[0].user.send({ embeds: [muteUser(true, data[0].user, user, ms(data[1]))] });
        return await interaction.reply({ content: `<@${data[0].user.id}> est au mute jusque <t:${parseInt((Date.now() + ms(data[1])) / 1000)}:R>`, ephemeral: true })
    }
}