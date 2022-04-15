const fs = require('fs');

const getTranslation = async(satou, message) => {
    //Get language
    const guildconfig = await satou.guilddatabase.findOne({ guildId: message.guild.id });
    const guildlanguage = guildconfig.language;
    //Get translation
    const translation = JSON.parse(fs.readFileSync(`./utils/translations/${guildlanguage}.json`));
    return translation;
}

exports.getTranslation = getTranslation;