module.exports = (satou, guild) => {
    console.log(`Joined Guild ${guild.name}`)
    satou.database.createDocument(satou.config.API.appwrite.collections.guild, {"guildID": `${guild.id}`});
}