const { channels, guildId } = require("../../config");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "presenceUpdate",
    once: false,
    async execute(client, oldPresence, newPresence) {
        const guild = await client.guilds.fetch(guildId);
        const logChannel = await guild.channels.fetch(channels.logs);
        if (newPresence.user.bot) return;
        if (newPresence.equals(oldPresence)) return;

        const userIsInPresenceChecker = presenceChecker.find(x => x.id === newPresence.user.id);
        if (!userIsInPresenceChecker) {
            return presenceChecker.push({
                id: newPresence.user.id,
                presencePass: 1
            });
        }
        userIsInPresenceChecker.presencePass++;
        if (userIsInPresenceChecker.presencePass < 3) return;
        // Check if the presence has changed
        if (newPresence.equals(oldPresence)) return;
        if (oldPresence.status !== newPresence.status || oldPresence.activities.length !== newPresence.activities.length) {
            // Create a new embedded message for the new presence
            const newEmbed = new EmbedBuilder()
                .setColor('Green')
                .setTitle('Presence Changed (New)')
                .setDescription(`User: <@${newPresence.user.id}> (${newPresence.user.id})`)
                .setTimestamp();

            // Compare the status
            if (oldPresence.status !== newPresence.status) {
                newEmbed.addFields({
                    name: 'Status',
                    value: `${oldPresence.status} -> ${newPresence.status}`
                });
            }

            // Compare the activities
            if (oldPresence.activities.length !== newPresence.activities.length) {
                newEmbed.addFields({
                    name: 'Activities',
                    value: `${oldPresence.activities.length} -> ${newPresence.activities.length}`
                });

                // Add the details of each activity
                for (let i = 0; i < newPresence.activities.length; i++) {
                    const activity = newPresence.activities[i];
                    const details = activity.details || 'No details provided';
                    const state = activity.state || 'No state provided';

                    newEmbed.addFields({
                        name: `Activity ${i + 1}`,
                        value: `Name: ${activity.name}\nDetails: ${details}\nState: ${state}`
                    });
                }
            }

            // // Create a new embedded message for the old presence
            // const oldEmbed = new EmbedBuilder()
            //     .setColor('Yellow')
            //     .setTitle('Presence Changed (Old)')
            //     .setDescription(`User: <@${newPresence.user.id}> (${newPresence.user.id})`);

            // // Compare the status
            // if (oldPresence.status !== newPresence.status) {
            //     oldEmbed.addFields({
            //         name: 'Status',
            //         value: `${oldPresence.status} -> ${newPresence.status}`
            //     });
            // }

            // // Compare the activities
            // if (oldPresence.activities.length !== newPresence.activities.length) {
            //     oldEmbed.addFields({
            //         name: 'Activities',
            //         value: `${oldPresence.activities.length}`
            //     });

            //     // Add the details of each activity
            //     for (let i = 0; i < oldPresence.activities.length; i++) {
            //         const activity = oldPresence.activities[i];
            //         const details = activity.details || 'No details provided';
            //         const state = activity.state || 'No state provided';

            //         oldEmbed.addFields({
            //             name: `Activity ${i + 1}`,
            //             value: `Name: ${activity.name}\nDetails: ${details}\nState: ${state}`
            //         });
            //     }
            // }

            // Send both embedded messages to the log channel
            logChannel.send({
                content: null,
                embeds: [newEmbed]
            });
        }
        userIsInPresenceChecker.presencePass = 0;
    },
};
