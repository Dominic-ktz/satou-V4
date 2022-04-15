module.exports = async(satou, interaction) => {
    if (!interaction.isCommand()) return;
    const command = satou.slashCommands.get(interaction.commandName);
    if (!command) return;
    interaction.language = await satou.guildmanager.getTranslation(satou, interaction);

    try {
        await command.execute(satou, interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}