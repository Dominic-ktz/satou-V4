const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { replaceone, replacetwo } = require('../../../functions/replace.js');

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
    const user = message.mentions.members.first();
    if (!user) return satou.embed.error(message, message.language.marry.divorce.noUser);
    const count1 = await satou.marrydatabase.countDocuments({ user1: message.author.id });
    const count2 = await satou.marrydatabase.countDocuments({ user2: message.author.id });
    console.log(count1, count2);
    if (count1 == 0 && count2 == 0) return satou.embed.error(message, message.language.marry.divorce.notMarried);

    const embed = new MessageEmbed()
        .setTitle(message.language.marry.divorce.title)
        .setDescription(replaceone(message.language.marry.divorce.message, "-usertwo-", user.displayName))
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
        if (interaction.customId === "yes") {
            if (count1 > 0) {
                await satou.marrydatabase.deleteOne({ user1: message.author.id });
            } else if (count2 > 0) {
                await satou.marrydatabase.deleteOne({ user2: message.author.id });
            }
            const embed = new MessageEmbed()
                .setTitle(message.language.marry.divorce.title)
                .setDescription(replacetwo(message.language.marry.divorce.success, "-userone-", message.member.displayName, "-usertwo-", user.displayName))
                .setColor(satou.color.RED);
            interaction.reply({ embeds: [embed] }).then((await msg).delete());
        } else {
            const embed = new MessageEmbed()
                .setTitle(message.language.marry.divorce.title)
                .setDescription(replacetwo(message.language.marry.divorce.canceled, "-userone-", message.member.displayName, "-usertwo-", user.displayName))
                .setColor(satou.color.RED);
            interaction.reply({ embeds: [embed] }).then((await msg).delete());
        }
    });
}