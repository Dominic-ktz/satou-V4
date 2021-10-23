const {Client, Intents, Collection} = require('discord.js')
const fs = require('fs');
const awsdk = require('node-appwrite');
const satou = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] })
//Require functions
const updateDatabase = require('./functions/databaseUpdate');

satou.config = require('./configuration/config.json');
satou.commands = new Collection();
satou.appwrite = new awsdk.Client();
satou.appwrite
    .setEndpoint(satou.config.API.appwrite.url) // Your API Endpoint
    .setProject(satou.config.API.appwrite.projectID) // Your project ID
    .setKey(satou.config.API.appwrite.key);
satou.database = new awsdk.Database(satou.appwrite);
satou.aliases = new Collection();
satou.color = require('./configuration/color.json');
satou.updateDB = require('./functions/databaseUpdate')

satou.updateDB.getGuildDocument(satou, 799616259574464500).then((res) => {
    console.log(res.$id)
})
//Register commands
const commandFolders = fs.readdirSync('./commands/commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        let pullcmd = require(`./commands/commands/${folder}/${file}`);
        satou.commands.set(pullcmd.config.name, pullcmd);
        pullcmd.config.aliases.forEach((alias) => {
            satou.aliases.set(alias, pullcmd.config.name);
        });
    }
}

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
