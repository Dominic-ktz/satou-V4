const { MessageEmbed } = require('discord.js')
module.exports.config = {
    name: "setting",
    description: "Update things like prefix, language, etc.",
    aliases: [],
    cooldown: 5000,
    usage: "setting <setting> <value>",
    category: "administration"
};

const translations = ['deutsch', 'english'];

module.exports.run = async(satou, message) => {

    const guildconfig = await satou.guilddatabase.findOne({ guildId: message.guild.id });
    if (message.args.length < 1) {
        const embed = new MessageEmbed()
            .setTitle(message.language.settings.title)
            .setColor("GREEN")
            .setDescription(message.language.settings.description)
            .addField("❗" + message.language.settings.prefix.title, `${guildconfig.prefix}prefix <prefix>`)
            .addField("🌍" + message.language.settings.language.title, `${guildconfig.prefix}language <language>`);
        message.channel.send({ embeds: [embed] });
    } else {

        switch (message.args[0]) {
            case "prefix":
                if (!message.args[1]) {
                    const embed = new MessageEmbed()
                        .setTitle(message.language.settings.title)
                        .setColor(satou.color.BLUE)
                        .setDescription(`Prefix: ${guildconfig.prefix}`);
                    message.channel.send({ embeds: [embed] });
                } else {
                    if (message.args[1].length > 5) {
                        return satou.embed.error(message, message.language.settings.prefix.toolong);
                    }
                    guildconfig.prefix = message.args[1];
                    await satou.guilddatabase.updateOne({ guildId: message.guild.id }, guildconfig);
                    return satou.embed.success(message, message.language.settings.prefix.success);
                }
                break;
            case "language":
                if (!message.args[1]) {
                    const embed = new MessageEmbed()
                        .setTitle(message.language.settings.title)
                        .setColor(satou.color.BLUE)
                        .setDescription(`Language: ${guildconfig.language}`);
                    message.channel.send({ embeds: [embed] });
                } else {
                    if (translations.includes(message.args[1])) {
                        guildconfig.language = message.args[1];
                        await satou.guilddatabase.updateOne({ guildId: message.guild.id }, guildconfig);
                        return satou.embed.success(message, message.language.settings.language.success);
                    } else {
                        return satou.embed.error(message, message.language.settings.language.invalid);
                    }
                }
                break;
            case "disabledcommands":

                break;

            default:
                return satou.embed.error(message, message.language.settings.invalid);
        }
    }
};