module.exports.config = {
    name: "divorce",
    description: "",
    aliases: [],
    cooldown: 10000,
    example: "divorce",
    usage: "propose",
    category: "marry"
};
/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(satou, message) => {
    const count1 = await satou.marrydatabase.countDocuments({ user1: message.author.id });
    const count2 = await satou.marrydatabase.countDocuments({ user2: message.author.id });
    if (count1 < 1 || count2 < 1) return satou.embed.error(message, message.language.marry.divorce.notMarried);
    const embed = new MessageEmbed()
        .setTitle(message.language.marry.divorce.title)
        .setDescription(message.language.marry.divorce.message)
        .setColor(satou.color.PINK)
        .setTimestamp();
    const row = new MessageActionRow().addComponents(
        new MessageButton()
        .setLabel(message.language.marry.divorce.yes)
        .setStyle('SUCCESS')
        .setCustomId('yes'),
        new MessageButton()
        .setLabel(message.language.marry.divorce.no)
        .setStyle('DANGER')
        .setCustomId('no')
    );
    const msg = message.channel.send({ embeds: [embed], components: [row] });

    const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return satou.embed.error(message, message.language.marry.divorce.notYouClick);
    }

    const collection = message.channel.createMessageComponentCollector({ filter, max: 1, time: 300000 });

    collection.on('collect', async(interaction) => {

    });
}