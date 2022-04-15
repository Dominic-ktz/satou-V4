const { MessageEmbed } = require('discord.js');

const error = (message, description) => {
    const embed = new MessageEmbed()
        .setTitle('❌' + message.language.error.title)
        .setDescription(description)
        .setColor('#f00050')
        .setTimestamp()
        .setFooter(message.language.info.messagedeletetwentysecs);

    message.channel.send({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
            msg.delete();
        }, 20000);
    });
}

const success = (message, description) => {
    const embed = new MessageEmbed()
        .setTitle('✅' + message.language.success.title)
        .setDescription(description)
        .setColor('#40ff00')
        .setTimestamp()
        .setFooter(message.language.info.messagedeletetwentysecs);
    message.channel.send({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
            msg.delete();
        }, 20000);
    });
}

exports.success = success;
exports.error = error;