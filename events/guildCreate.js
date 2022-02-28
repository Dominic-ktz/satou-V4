const guildSchema = require('../configuration/database/guildSchema');
module.exports = async(satou, guild) => {
    console.log(`Joined Guild ${guild.name}`)
    satou.log.create({
        message: `Joined Guild ${guild.name}`,
        time: new Date()
    });
    const createGuild = await guildSchema.create({
        guildId: guild.id,
    });
}