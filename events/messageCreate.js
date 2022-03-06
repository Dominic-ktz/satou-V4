const logSchema = require("../configuration/database/logSchema");
const moment = require('moment');
const humanizeDuration = require('humanize-duration');

module.exports = async(satou, message) => {
    // Ignore all bots
    if (message.author.bot) return;
    // Get prefix from database
    const guildconfig = await satou.guilddatabase.findOne({ guildId: message.guild.id });
    if (message.content.startsWith(guildconfig.prefix)) {
        const language = await satou.guildmanager.getTranslation(satou, message);
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
        message.args = args;
        message.language = language;
        let commandfile =
            satou.commands.get(cmd.slice(guildconfig.prefix.length)) ||
            satou.commands.get(satou.aliases.get(cmd.slice(guildconfig.prefix.length)));

        if (commandfile) {

            //Check for cooldown
            if (commandfile.config.cooldown) {
                const key = `${message.author.id}-${commandfile.config.name}`;
                if (satou.cooldown.has(key)) {
                    const currcooldown = satou.cooldown.get(key);
                    const remaining = humanizeDuration(currcooldown - Date.now(), {
                        round: true
                    });
                    return message.channel.send({ content: `${message.language.error.cooldown}| ${remaining}` });
                }
                const currentDate = new Date();
                const timestamp = currentDate.getTime();
                satou.cooldown.set(key, timestamp + commandfile.config.cooldown);
                setTimeout(() => {
                    satou.cooldown.delete(key);
                }, commandfile.config.cooldown);
            }

            //Check if user have permissions
            if (!message.member.permissions.has(commandfile.config.permissions)) {
                return message.channel.send({
                    content: message.language.error.nopermsuser
                });
            }

            //Check if bot have permissions
            if (!message.guild.me.permissions.has(commandfile.config.botpermissions)) {
                return message.channel.send({
                    content: message.language.error.nopermsbot
                });
            }

            //Check if command is enabled
            if (commandfile.config.disabled) {
                return message.channel.send({
                    content: message.language.error.commanddisabled
                });
            }

            //Execute command
            try {
                commandfile.run(satou, message);
            } catch (error) {
                satou.log.create({
                    message: error,
                    time: new Date()
                });
                return message.channel.send({ content: message.language.error.commandexecutionerror });
            }
        } else {
            satou.embed.error(message, message.language.error.commandnotfound);
        }
    }

};