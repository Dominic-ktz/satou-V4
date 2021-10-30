const guildSchema = require('../configuration/database/guildSchema');

const updateGuild = async (guildID, data) => {
    var promise = new Promise(async function(resolve, reject) {
        const guildUpdate = await guildSchema.findOneAndUpdate({guildId: guildID}, data);
        resolve(guildUpdate);
        return promise;
    });
}

exports.updateGuild = updateGuild;