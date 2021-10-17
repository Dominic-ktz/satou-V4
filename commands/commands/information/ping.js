const {MessageEmbed} = require('discord.js')
module.exports.config = {
    name: "ping",
    aliases: [],
    description: "Ping the Bot and the API",
    usage: "ping",
    category: "information"
};

module.exports.run = async (satou, message) => {
    const embed = new MessageEmbed()
        .setDescription('Pinging...');
    const secembed = new MessageEmbed()
        .setTitle('Pong')
        .setColor("GREEN")
        .setDescription(`🏓 \n >The Bot latency is ${Date.now() - message.createdTimestamp}ms. \n >API Latency is ${Math.round(satou.ws.ping)}ms`);
    message.channel.send({embeds: [embed]}).then((msg) => {
        msg.edit({embeds: [secembed]});
    });
};