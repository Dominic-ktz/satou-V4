const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
module.exports.config = {
    name: "setup",
    aliases: [],
    description: "Run the setup for the bot",
    usage: "setup",
    category: "administration"
};

module.exports.run = async (satou, message) => {
const firstembed = new MessageEmbed()
    .setTitle("Setup")
    .setDescription("Welcome to the setup. At the moment you can only change the language and prefix. More is coming soon.")
    .setColor(satou.color.PINK)
    .setTimestamp();
const firstrow = new MessageActionRow().addComponents(
    new MessageButton()
        .setEmoji('🌏')
        .setCustomId('updatelanguage')
        .setLabel('Change language')
        .setStyle('PRIMARY'),
    new MessageButton()
        .setEmoji('❗')
        .setCustomId('updateprefix')
        .setLabel('Update prefix')
        .setStyle('PRIMARY')
);

message.channel.send({
    embeds: [firstembed],
    components: [firstrow]
});

const filter = (interaction) => {
    if (interaction.user.id === message.author.id) return true;
    return interaction.reply({content: "You are not allowed to do this"})
}

const collectorone = message.channel.createMessageComponentCollector({filter, max: 1})

    collectorone.on('end', (Btninteraction) => {
        console.log(Btninteraction.first().customId);
    });
};