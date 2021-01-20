const mongoose = require('mongoose');

const MSchema = mongoose.Schema;

// name: String,
// detail: String,
// date: String,
// location: String,
// completion: Boolean,
// reward: String

const questSchema = new MSchema({
    name: String,
    detail: String,
    date: String,
    location: String,
    completion: Boolean,
    reward: String
})

module.exports = mongoose.model('Quest', questSchema);