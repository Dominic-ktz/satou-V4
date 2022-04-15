const { Client, Message, MessageEmbed } = require('discord.js');
const { replaceone } = require('../../../functions/replace.js');


module.exports.config = {
    name: "happy",
    description: "Get a random happy anime gif",
    aliases: [],
    cooldown: 10000,
    example: "happy",
    usage: "happy",
    category: "anime"
};

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports.run = async(satou, message) => {
    const msg = replaceone(message.language.anime.happy.message, "-username-", message.member.displayName);
    const picture = await satou.rga.getGif('happy');
    const embed = new MessageEmbed()
        .setTitle(msg)
        .setImage(picture)
        .setColor(satou.color.YELLOW)
        .setTimestamp();
    if (message.args[0]) {
        embed.setDescription(`> ${message.args.slice(0).join(" ")}`);
    }

    message.channel.send({ embeds: [embed] });
};