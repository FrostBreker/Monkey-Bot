const config = require("../../config");
const ms = require("ms");
const { userGoToGoulag } = require("../../Embeds/Misc");
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("goulag")
    .setDescription("Envoie un utilisateur au goulag!")
    .addStringOption(option =>
        option.setName("temps")
            .setDescription("Temps au goulag")
            .setRequired(true)
            .addChoices(
                { name: "1s", value: "1s" },
                { name: "1m", value: "1m" },
                { name: "1h", value: "1h" },
                { name: "1d", value: "1d" }
            )
    )
    .addUserOption(option => option.setName("utilisateur").setRequired(true).setDescription("Utilisateur à mettre au goulag"))

module.exports = {
    admin: true,
    data: data,
    description: "Envoie un utilisateur au goulag!",
    runSlash: async (client, interaction) => {
        const data = []
        interaction.options._hoistedOptions.forEach((x) => {
            if (x.type === "USER") {
                return data.push({ member: x.member, user: x.user });
            } else {
                return data.push(x.value);
            }
        })
        const member = interaction.member.user;
        const guild = interaction.member.guild;
        const logChannel = guild.channels.cache.find(c => c.id === config.channels.log);
        if (data[0].member.voice.channelId !== null) {
            const channel = guild.channels.cache.find((c) => {
                if (c.type === "GUILD_VOICE") {
                    if (c.id === config.channels.goulag) {
                        return c
                    }
                }
            })
            data[0].member.voice.disconnect().catch(() => { });
            data[0].member.voice.setChannel(channel);
            setTimeout(() => {
                data[0].member.voice.disconnect().catch(() => { })
            }, ms(data[1]))
        }
        let memberRoles = guild.roles.cache.find(r => r.name === config.roles.goulag);
        if (!memberRoles) {
            memberRoles = await guild.roles.create({
                name: config.roles.goulag,
                color: '#000',
                reason: 'Goulag role',
            })

            guild.channels.cache.forEach(async (channel, id) => {
                if (channel.type === "GUILD_VOICE") {
                    if (channel.id === config.channels.goulag) {
                        await channel.permissionOverwrites.edit(memberRoles, {
                            CONNECT: true
                        })
                    } else {
                        await channel.permissionOverwrites.edit(memberRoles, {
                            CONNECT: false
                        })
                    }
                }
            });
        }

        await data[0].member.roles.add(memberRoles.id).catch(() => {
            console.log("User trop eleve pour avoir le roles");
        });

        setTimeout(() => {
            data[0].member.roles.remove(memberRoles.id);
            logChannel.send({ embeds: [userGoToGoulag(false, data[0].user, member, ms(data[1]))] });
            data[0].user.send({ embeds: [userGoToGoulag(false, data[0].user, member, ms(data[1]))] });
        }, ms(data[1]));

        logChannel.send({ embeds: [userGoToGoulag(true, data[0].user, member, ms(data[1]))] })
        data[0].user.send({ embeds: [userGoToGoulag(true, data[0].user, member, ms(data[1]))] });
        return await interaction.reply({ content: `<@${data[0].user.id}> est au goulag pour ${data[1]}`, ephemeral: true })
    }
}