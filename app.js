const { Client, Intents, Collection } = require('discord.js')
const fs = require('fs');
const mongoose = require('mongoose')
const satou = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const Table = require('cli-table');


//Require functions
satou.config = require('./configuration/config.json');
satou.commands = new Collection();
satou.aliases = new Collection();
satou.cooldown = new Collection();
satou.color = require('./configuration/color.json');
satou.emoji = require('./configuration/emojis.json')
satou.log = require('./configuration/database/logSchema');
satou.guilddatabase = require('./configuration/database/guildSchema');
satou.userdatabase = require('./configuration/database/logSchema');
satou.marrydatabase = require('./configuration/database/marrySchema');
satou.guildmanager = require('./functions/guild.js');
satou.embed = require('./functions/embed.js');
satou.rga = require('random-gif-api');

mongoose.connect(satou.config.API.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//Register commands
var table = new Table({
    head: ['State', 'Name', "File"],
    colWidths: [15, 20, 60]
});
const commandFolders = fs.readdirSync('./commands/commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        let pullcmd = require(`./commands/commands/${folder}/${file}`);
        satou.commands.set(pullcmd.config.name, pullcmd);
        pullcmd.config.aliases.forEach((alias) => {
            satou.aliases.set(alias, pullcmd.config.name);
        });
        table.push(['Loaded', pullcmd.config.name, `/commands/commands/${folder}/${file}`]);
    }
}
console.log(table.toString());

//Register Events
const files = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
// Loop over each file
for (const file of files) {
    // Split the file at its extension and get the event name
    const eventName = file.split(".")[0];
    // Require the file
    const event = require(`./events/${file}`);
    satou.on(eventName, event.bind(null, satou));
}

satou.login(satou.config.API.token);