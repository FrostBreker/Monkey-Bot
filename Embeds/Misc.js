const { MessageEmbed } = require("discord.js");

module.exports = {
    newUsers: (user, rules) => {
        const embed = new MessageEmbed()
            .setColor(15856113)
            .setDescription(`**👋 Tient, <@${user.id}> vient d'arriver !**\n\nJe te souhaite la bienvenue sur ce discord.\n→ N'oublie pas d'aller lire le <#${rules}>.`)
            .setTimestamp()

        return embed
    },
    userGoToGoulag: (type, user, member, time) => {
        if (type) {
            const embed = new MessageEmbed()
                .setAuthor({ name: `${user.username} (${user.id})`, iconURL: user.avatarURL() })
                .setColor(15856113)
                .setDescription(`**Action**: Goulag\n**Temps**: <t:${parseInt((Date.now() + time) / 1000)}:R>`)
                .setTimestamp()
                .setThumbnail(user.avatarURL())
                .setFooter({ text: member.username, iconURL: member.avatarURL() });
            return embed;
        } else {
            const embed = new MessageEmbed()
                .setAuthor({ name: `${user.username} (${user.id})`, iconURL: user.avatarURL() })
                .setColor(15856113)
                .setDescription(`**Action**: Retirer du Goulag`)
                .setTimestamp()
                .setThumbnail(user.avatarURL())
                .setFooter({ text: member.username, iconURL: member.avatarURL() });
            return embed;
        }

    },
    muteUser: (type, user, member, time) => {
        if (type) {
            const embed = new MessageEmbed()
                .setAuthor({ name: `${user.username} (${user.id})`, iconURL: user.avatarURL() })
                .setColor(15856113)
                .setDescription(`**Action**: Mute\n**Temps**: <t:${parseInt((Date.now() + time) / 1000)}:R>`)
                .setTimestamp()
                .setThumbnail(user.avatarURL())
                .setFooter({ text: member.username, iconURL: member.avatarURL() });
            return embed;
        } else {
            const embed = new MessageEmbed()
                .setAuthor({ name: `${user.username} (${user.id})`, iconURL: user.avatarURL() })
                .setColor(15856113)
                .setDescription(`**Action**: Unmute`)
                .setTimestamp()
                .setThumbnail(user.avatarURL())
                .setFooter({ text: member.username, iconURL: member.avatarURL() });
            return embed;
        }
    },
    clearMessages: (member, number) => {
        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.username} (${member.id})`, iconURL: member.avatarURL() })
            .setColor(15856113)
            .setDescription(`**Action**: Clear\n**Nombres**: ${number} messages`)
            .setTimestamp()
            .setThumbnail(member.avatarURL())
            .setFooter({ text: member.username, iconURL: member.avatarURL() });
        return embed;
    }
}