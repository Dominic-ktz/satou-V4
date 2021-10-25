const mongoose = require('mongoose');

const guildConfigSchema = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "s-",
    },
    language: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "en",
    },
    globalChat: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "0",
    },
    premium: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false,
    },

    joinmsgchannel: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "0",
    },

    leavemsgchannel: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "0",
    },
    joinmsg: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "Welcome -username- on -guildname-",
    },
    joinimg: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "https://api.satou-chan.xyz/botdata/default-join-bg.png",
    },
    leavemsg: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "Goodbye -username-",
    },
});

module.exports = mongoose.model('Guild', guildConfigSchema);