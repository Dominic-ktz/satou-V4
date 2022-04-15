const { MessageEmbed, MessageActionRow, MessageButton, Interaction, Message, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { replaceone, replacetwo } = require('../../../functions/replace.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('propose')
        .setDescription('Propose to a user')
        .addUserOption(option => option.setName('user').setRequired(true).setDescription('The user to propose to')),
    async execute(satou, interaction) {
        const usertwo = interaction.options.getMember('user');
        if (!usertwo) return satou.embed.error(interaction, interaction.language.marry.propose.noUser);
        if (usertwo.id === interaction.user.id) return satou.embed.error(interaction, interaction.language.marry.propose.self);
        if (usertwo.bot) return satou.embed.error(interaction, interaction.language.marry.propose.bot);
        if (usertwo.id === satou.user.id) return satou.embed.error(interaction, interaction.language.marry.propose.satou);
        const count = await satou.marrydatabase.countDocuments({ user1: interaction.user.id, user2: usertwo.user.id });
        const count2 = await satou.marrydatabase.countDocuments({ user1: usertwo.user.id, user2: interaction.user.id });
        if (count > 0 || count2 > 0) return satou.embed.error(interaction, interaction.language.marry.propose.alreadyMarried);

        const embed = new MessageEmbed()
            .setTitle(interaction.language.marry.propose.title)
            .setDescription(replacetwo(interaction.language.marry.propose.message, "-userone-", interaction.user.username, "-usertwo-", usertwo.displayName))
            .setColor(satou.color.PINK)
            .setTimestamp();
        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel(interaction.language.marry.propose.yes)
            .setStyle('SUCCESS')
            .setCustomId('yes'),
            new MessageButton()
            .setLabel(interaction.language.marry.propose.no)
            .setStyle('DANGER')
            .setCustomId('no')

        );
        const msg = interaction.reply({ embeds: [embed], components: [row] });

        const filter = (interaction) => {
            if (interaction.user.id === usertwo.user.id) return true;
            return satou.embed.error(interaction, interaction.language.marry.propose.notYouClick);
        }

        const collection = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 300000 });

        collection.on('collect', async(inter) => {
            if (inter.customId == "no") {
                const embed = new MessageEmbed()
                    .setTitle(interaction.language.marry.propose.title)
                    .setDescription(replaceone(interaction.language.marry.propose.noClicked, "-userone-", interaction.member.username))
                    .setColor(satou.color.BLUE)
                    .setTimestamp();
                return inter.reply({ embeds: [embed] });
            }
            if (inter.customId == "yes") {
                try {
                    const marryAdd = await satou.marrydatabase.create({
                        user1: interaction.user.id,
                        user2: usertwo.user.id,
                    });
                    const embed = new MessageEmbed()
                        .setTitle(interaction.language.marry.propose.title)
                        .setDescription(replacetwo(interaction.language.marry.propose.yesClicked, "-userone-", interaction.member.displayName, "-usertwo-", usertwo.displayName))
                        .setColor(satou.color.PINK)
                        .setTimestamp();
                    return inter.reply({ embeds: [embed] })
                } catch (error) {
                    satou.log.create({
                        message: error,
                        time: new Date(),
                        type: "error",
                    });
                }
            }
        });
    },
};