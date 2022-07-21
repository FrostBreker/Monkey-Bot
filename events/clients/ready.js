const PREFIX = process.env.PREFIX;
const config = require("../../config");
const { app } = require("../../main");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} est ready sur le prefix ${PREFIX}`);
        const guild = await client.guilds.cache.get(config.guildID);
        guild.commands.set(client.commands.map(cmd => cmd));

        app.use("/presence/:id", async (req, res) => {
            const id = req.params.id;
            await guild.members.fetch(id).then((data) => {
                const presence = data.presence;
                const activities = presence.activities;
                res.render('pages/presence.ejs', {
                    pp: data.user.displayAvatarURL(),
                    username: data.user.username,
                    discriminator: data.user.discriminator,
                    activities: activities,
                });
            }).catch(() => res.status(404).send("User not found"));
        })
    }
}