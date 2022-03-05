const { MessageEmbed } = require('discord.js')
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

module.exports.run = async(satou, message) => {
    const msg = replaceone(message.language.anime.happy.message, "-username-", message.member.username);
    //Get random string from array
    const randommsg = message.language.anime.happy.randommessages[Math.floor(Math.random() * message.language.anime.happy.randommessages.length)];
    const picture = await satou.rga.getGif('happy');
    const embed = new MessageEmbed()
        .setTitle(randommsg)
        .setDescription(msg)
        .setImage(picture)
        .setColor(satou.color.YELLOW)
        .setTimestamp();
    message.channel.send({ embeds: [embed] });
};