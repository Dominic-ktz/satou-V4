const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const gradient = require('gradient-string');
const config = require('./configuration/config.json');
const commands = [];
const commandFiles = fs.readdirSync('./commands/slashcommands').filter(file => file.endsWith('.js'));


console.log(gradient.instagram("Loading commands..."));
const slashCommands = [];
const slashFolders = fs.readdirSync('./commands/slashcommands');
for (const folder of slashFolders) {
    const slashFiles = fs.readdirSync(`./commands/slashcommands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of slashFiles) {
        const command = require(`./commands/slashcommands/${folder}/${file}`);
        slashCommands.push(command.data.toJSON());
    }
}
const guild = "886736508097298493";

console.log(gradient.instagram("Connect to API..."));
const rest = new REST({ version: '9' }).setToken(config.API.token);
(async() => {
    try {
        console.log(gradient.instagram('Started refreshing application (/) commands.'));

        await rest.put(
            Routes.applicationGuildCommands(config.API.clientID, guild), { body: slashCommands }
        );

        console.log(gradient.instagram('Successfully reloaded application (/) commands.'));
    } catch (error) {
        console.error(error);
    }
})();