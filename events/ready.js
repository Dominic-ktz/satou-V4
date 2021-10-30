const logSchema = require('../configuration/database/logSchema');

module.exports = (satou, message) => {
    satou.user.setPresence({status: "invisible"})
    console.log("Ready")
    logSchema.create({
        message: "Bot has started",
        time: new Date()
    })
}