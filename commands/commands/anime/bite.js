const { Client, Message, MessageEmbed } = require('discord.js');
const { replacetwo } = require('../../../functions/replace.js');


module.exports.config = {
    name: "bite",
    description: "Get a random bite anime gif",
    aliases: [],
    cooldown: 10000,
    example: "bite @someone",
    usage: "bite <@username>",
    category: "anime"
};

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports.run = async(satou, message) => {
    const user = message.mentions.users.first();
    if (!user) {
        return satou.embed.error(message, message.language.anime.noUser);
    }
    const msg = replacetwo(message.language.anime.bite.message, "-username-", message.member.displayName);
    const picture = await satou.rga.getGif('bite');
    const embed = new MessageEmbed()
        .setTitle(msg)
        .setImage(picture)
        .setColor(satou.color.DARK_RED)
        .setTimestamp();
    if (message.args[0]) {
        embed.setDescription(`> ${message.args.slice(0).join(" ")}`);
    }

    message.channel.send({ embeds: [embed] });
};