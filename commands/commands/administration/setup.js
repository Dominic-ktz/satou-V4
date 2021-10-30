const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
module.exports.config = {
    name: "setup",
    aliases: [],
    description: "Run the setup for the bot",
    usage: "setup",
    category: "administration"
};

module.exports.run = async (satou, message) => {
    const homepage = () => {
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
                .setStyle('SECONDARY'),
            new MessageButton()
                .setEmoji('❗')
                .setCustomId('updateprefix')
                .setLabel('Update prefix')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('close')
                .setLabel('Exit Setup')
                .setStyle('PRIMARY')
        );

        message.channel.send({
            embeds: [firstembed],
            components: [firstrow]
        }).then((msg) => {
            const filter = (interaction) => {
                if (interaction.user.id === message.author.id) return true;
                return interaction.reply({content: "You are not allowed to do this"})
            }

            const collectorone = message.channel.createMessageComponentCollector({filter, max: 1, time: 300000})

            collectorone.on('end', (Btninteraction) => {
                if (Btninteraction.first().customId == "undefinded"){msg.delete();}
                if (Btninteraction.first().customId == "updatelanguage") {languagePage(satou, message); msg.delete();}
                if (Btninteraction.first().customId == "close") {msg.delete();}
            });
        });
    }
    homepage();

    const languagePage = () => {
        const langembed = new MessageEmbed()
            .setTitle("Setup - Language")
            .setDescription("Choose your language below")
            .setColor(satou.color.PINK)
            .setTimestamp();
        const langrow = new MessageActionRow().addComponents(
            new MessageButton()
                .setEmoji('🇺🇸')
                .setCustomId('langENG')
                .setLabel('English')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setEmoji('🇩🇪')
                .setCustomId('langDE')
                .setLabel('Deutsch')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('back')
                .setLabel('Back')
                .setStyle('PRIMARY')
        )

        message.channel.send({
            embeds: [langembed],
            components: [langrow]
        }).then((msg) => {
            const filter = (interaction) => {
                if (interaction.user.id === message.author.id) return true;
                return interaction.reply({content: "You are not allowed to do this"})
            }

            const collectorlang = message.channel.createMessageComponentCollector({filter, max: 1, time: 300000})

            collectorlang.on('end', (Btninteraction) => {
                if (Btninteraction.first().customId == "undefinded"){msg.delete();}
                if (Btninteraction.first().customId == "langENG") {satou.database.updateGuild(message.guild.id, {language: "en"}).then((res) => {succesPage(); msg.delete();})}
                if (Btninteraction.first().customId == "langDE") {satou.database.updateGuild(message.guild.id, {language: "de_DE"}).then((res) => {succesPage(); msg.delete();})}
                if (Btninteraction.first().customId == "back") {homepage(); msg.delete();}
            });
        });
        return
    }// LangEnd


    const succesPage = () =>{
        const successEmbed = new MessageEmbed()
            .setTitle(satou.emoji.success +  " | Success")
            .setDescription('Settings updated successfully. Redirect in 5 seconds.')
            .setColor(satou.color.GREEN)
            .setTimestamp();
         message.channel.send({embeds: [successEmbed]}).then((msg) => {
             setTimeout(() => {
                 homepage();
                 msg.delete();
             }, 5000)
         })
    }
};


