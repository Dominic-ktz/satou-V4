const logSchema = require("../configuration/database/logSchema");

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

        try {
            commandfile.run(satou, message);
        } catch (error) {
            return message.channel.send({ content: "Error while execute command" + error });
        }
    }

};