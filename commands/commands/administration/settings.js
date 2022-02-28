const { MessageEmbed } = require('discord.js')
module.exports.config = {
    name: "setting",
    description: "Update things like prefix, language, etc.",
    aliases: [],
    cooldown: 5000,
    usage: "setting <setting> <value>",
    category: "administration"
};

module.exports.run = async(satou, message) => {
    const embed = new MessageEmbed()
        .setTitle('Settings')
        .setColor("GREEN")
        .setDescription(`Choose between the following settings: \n >prefix \n >language \n >disabledcommands`);
    message.channel.send({ embeds: [embed] });
};