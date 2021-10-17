module.exports = (satou, message) => {
    console.log("Ready")
    satou.database.createDocument(satou.config.API.appwrite.collections.log, {"type": "info", "message": "Bot started"} );
}