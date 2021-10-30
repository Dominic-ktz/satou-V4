module.exports = (satou, message) => {
    // Ignore all bots
    if (message.author.bot) return;

if (message.content.startsWith("s-")) {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile =
        satou.commands.get(cmd.slice(satou.config.settings.prefix.length)) ||
        satou.commands.get(satou.aliases.get(cmd.slice(satou.config.settings.prefix.length)));

    try {
        commandfile.run(satou, message);
    } catch (error) {
        return message.channel.send({content: "Error while execute command" + error});
    }
}

};