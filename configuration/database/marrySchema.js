const mongoose = require('mongoose');

const marrySchema = new mongoose.Schema({
    user1: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    user2: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

module.exports = mongoose.model('marry', marrySchema);