module.exports = (satou, message) => {
    console.log("Ready")
    satou.log.create({
        message: "Bot has started",
        time: new Date()
    })
}