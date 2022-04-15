const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    type: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "info"
    },
    message: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    time: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

module.exports = mongoose.model('log', logSchema);