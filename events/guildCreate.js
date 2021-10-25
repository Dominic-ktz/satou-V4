const guildSchema = require('../configuration/database/guildSchema');
module.exports = async (satou, guild) => {
    console.log(`Joined Guild ${guild.name}`)
    const createGuild = await guildSchema.create({
        guildId: guild.id,
    })
}