const { EmbedBuilder } = require("discord.js");

class LogsEmbed {
    // static successLog(user, title, action, body) {
    //     console.log(guild, title, action, body, user);
    //     return new EmbedBuilder(user, title, action, body)
    //         .setTitle(title)
    //         .setDescription(`**Action**: ${action}\n${body}`)
    //         .setColor("Green")
    //         .setTimestamp()
    //         .setFooter({ text: `^^'s logs ${user ? `- ${user.id}` : null}`, iconURL: user ? user.displayAvatarURL({ dynamic: true }) : guild.iconURL({ dynamic: true }) })
    // }
    // static warningLog(guild, title, action, body, user) {
    //     return new EmbedBuilder(user, title, action, body)
    //         .setTitle(title)
    //         .setDescription(`**Action**: ${action}\n${body}`)
    //         .setColor("Orange")
    //         .setTimestamp()
    //         .setFooter({ text: `^^'s logs ${user ? `- ${user.id}` : null}`, iconURL: user ? user.displayAvatarURL({ dynamic: true }) : guild.iconURL({ dynamic: true }) })
    // }
    static LogEmbed(guild, title, action, body, color, user) {
        // const embed = new MessageEmbed()
        //     .setTitle("Un role a été ajouté")
        //     .setDescription(`**Action**: Role ajouté\n**Role**: <@&${role.id}>`)
        //     .setColor(SUCCESS)
        //     .setTimestamp()
        //     .setFooter({
        //         text: "NiXCity Community - Log",
        //     });

        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(`**Action**: ${action}\n${body}`)
            .setColor(color)
            .setTimestamp()
            .setFooter({ text: `^^'s logs ${user ? `- ${user.id}` : ""}`, iconURL: user ? user.displayAvatarURL({ dynamic: true }) : guild.iconURL({ dynamic: true }) })
    }
}

module.exports = LogsEmbed;