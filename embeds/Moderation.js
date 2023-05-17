const { EmbedBuilder } = require("discord.js");

class ModerationEmbed {
    static successCommand(title, description) {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor("Green")
            .setTimestamp();
    }
    static errorCommand(title, description) {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor("Red")
            .setTimestamp();
    }
}

module.exports = ModerationEmbed;