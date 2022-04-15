const { MessageEmbed, MessageActionRow, MessageButton, Interaction, Message, Client } = require('discord.js');
const { replaceone, replacetwo } = require('../../../functions/replace.js');


module.exports.config = {
    name: "propose",
    description: "Propose to a user",
    aliases: [],
    cooldown: 10000,
    example: "propose @someone",
    usage: "propose <@username>",
    category: "marry"
};
/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(satou, message) => {
    const usertwo = message.mentions.members.first();
    if (!usertwo) return satou.embed.error(message, message.language.marry.propose.noUser);
    if (usertwo.id === message.author.id) return satou.embed.error(message, message.language.marry.propose.self);
    if (usertwo.bot) return satou.embed.error(message, message.language.marry.propose.bot);
    if (usertwo.id === satou.user.id) return satou.embed.error(message, message.language.marry.propose.satou);
    const count = await satou.marrydatabase.countDocuments({ user1: message.author.id, user2: usertwo.user.id });
    const count2 = await satou.marrydatabase.countDocuments({ user1: usertwo.user.id, user2: message.author.id });
    if (count > 0 || count2 > 0) return satou.embed.error(message, message.language.marry.propose.alreadyMarried);

    const embed = new MessageEmbed()
        .setTitle(message.language.marry.propose.title)
        .setDescription(replacetwo(message.language.marry.propose.message, "-userone-", message.author.username, "-usertwo-", usertwo.displayName))
        .setColor(satou.color.PINK)
        .setTimestamp();
    const row = new MessageActionRow().addComponents(
        new MessageButton()
        .setLabel(message.language.marry.propose.yes)
        .setStyle('SUCCESS')
        .setCustomId('yes'),
        new MessageButton()
        .setLabel(message.language.marry.propose.no)
        .setStyle('DANGER')
        .setCustomId('no')

    );
    const msg = message.channel.send({ embeds: [embed], components: [row] });

    const filter = (interaction) => {
        if (interaction.user.id === usertwo.user.id) return true;
        return satou.embed.error(message, message.language.marry.propose.notYouClick);
    }

    const collection = message.channel.createMessageComponentCollector({ filter, max: 1, time: 300000 });

    collection.on('collect', async(interaction) => {
        if (interaction.customId == "no") {
            const embed = new MessageEmbed()
                .setTitle(message.language.marry.propose.title)
                .setDescription(replaceone(message.language.marry.propose.noClicked, "-userone-", message.member.username))
                .setColor(satou.color.BLUE)
                .setTimestamp();
            return interaction.reply({ embeds: [embed] }).then((await msg).delete());
        }
        if (interaction.customId == "yes") {
            try {
                const marryAdd = await satou.marrydatabase.create({
                    user1: message.author.id,
                    user2: usertwo.user.id,
                });
                const embed = new MessageEmbed()
                    .setTitle(message.language.marry.propose.title)
                    .setDescription(replacetwo(message.language.marry.propose.yesClicked, "-userone-", message.member.displayName, "-usertwo-", usertwo.displayName))
                    .setColor(satou.color.PINK)
                    .setTimestamp();
                return interaction.reply({ embeds: [embed] }).then((await msg).delete());
            } catch (error) {
                satou.log.create({
                    message: error,
                    time: new Date(),
                    type: "error",
                });
            }
        }
    });

};