const logSchema = require("../configuration/database/logSchema");
const moment = require('moment');
const humanizeDuration = require('humanize-duration');

module.exports = async(satou, message) => {
    // Ignore all bots
    if (message.author.bot) return;
    // Get prefix from database
    const guildconfig = await satou.guilddatabase.findOne({ guildId: message.guild.id });
    if (message.content.startsWith(guildconfig.prefix)) {
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
        message.args = args;
        let commandfile =
            satou.commands.get(cmd.slice(guildconfig.prefix.length)) ||
            satou.commands.get(satou.aliases.get(cmd.slice(satou.config.settings.prefix.length)));

        //Check for cooldown
        if (commandfile.config.cooldown) {
            const key = `${message.author.id}-${commandfile.config.name}`;
            if (satou.cooldown.has(key)) {
                const currcooldown = satou.cooldown.get(key);
                const remaining = humanizeDuration(currcooldown - Date.now(), {
                    round: true
                });
                return message.channel.send({ content: `| ${remaining}` });
            }
            const currentDate = new Date();
            const timestamp = currentDate.getTime();
            satou.cooldown.set(key, timestamp + commandfile.config.cooldown);
            setTimeout(() => {
                satou.cooldown.delete(key);
            }, commandfile.config.cooldown);
        }

        try {
            commandfile.run(satou, message);
        } catch (error) {
            return message.channel.send({ content: "Error while execute command" + error });
        }
    }

};